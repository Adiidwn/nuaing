import { Repository } from "typeorm";

import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { Thread } from "../entity/Thread";
import { User } from "../entity/User";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { creatThreadSchema, loginThreadSchema } from "../utils/validators/joi";

class AuthService {
  private readonly authRepository: Repository<User> =
    AppDataSource.getRepository(User);

  async find(req: Request, res: Response) {
    try {
      const users = await this.authRepository.find({
        // take: 4,
      });

      return res.status(200).json(users);
    } catch (err) {
      return res.status(500).json("something error");
    }
  }

  async register(req: Request, res: Response) {
    try {
      const data = req.body;
      const { error, value } = creatThreadSchema.validate(data);

      if (error) {
        return res.status(500).json({
          error: error.details[0].message,
        });
      }

      const checkEmail = await this.authRepository.findOne({
        where: {
          email: value.email,
        },
        // select: ["id", "password", "email", "username", "fullname"],
      });

      // console.log("checkemail", checkEmail);
      if (checkEmail) {
        return res.status(400).json({
          error: "error email is already registered",
        });
      }

      // const password = await bcrypt.compare(
      //   data.password,
      //   checkEmail.password
      // );

      const password = await bcrypt.hash(value.password, 10);

      const user = this.authRepository.create({
        fullname: value.fullname,
        username: value.username,
        email: value.email,
        password: password,
      });

      // const token = jwt.sign(user, "lalala");

      // const token = jwt.sign(user,"lalala",{
      //   expiresIn:"1h"
      // })

      // console.log("data ini apa ya", data);

      // console.log("user ini apa ya", user);
      // console.log("passwor ini apa ya", password);

      const createdUser = await this.authRepository.save(user);
      console.log("createdUser ini apa ya", createdUser);
      return res.status(200).json(createdUser);
    } catch (err) {
      return res.status(500).json(err);
    }

    // const threads = await this.authRepository.find({
    //   relations:["user"]
    // });
    // return res.status(200).json(threads);
  }

  async login(req: Request, res: Response) {
    try {
      const data = req.body;

      const { error, value } = loginThreadSchema.validate(data);
      if (error) {
        return res.status(400).json({ error: error });
      }

      const checkEmail = await this.authRepository.findOne({
        where: {
          email: value.email,
        },
        select: ["id", "fullname", "username", "email", "password", "picture"],
      });

      if (!checkEmail) {
        return res.status(400).json("Error Email / password is wrong");
      }

      const password = await bcrypt.compare(
        value.password,
        checkEmail.password
      );
      if (!password) {
        return res.status(400).json({
          error: "Email/passwrod is wrong!",
        });
      }

      const user = {
        id: checkEmail.id,
        fullname: checkEmail.fullname,
        username: checkEmail.username,
        email: checkEmail.email,
        picture: checkEmail.picture,
      };

      const token = jwt.sign(user, "lalala", {
        expiresIn: "100000h",
      });

      return res.status(200).json({
        user,
        token,
      });
    } catch (error) {
      return res.status(500).json("Theres an error ");
    }
  }

  async check(req: Request, res: Response) {
    try {
      const loginSession = res.locals.loginSession;

      const user = await this.authRepository.findOne({
        where: {
          id: loginSession.id,
        },
        select: ["id", "fullname", "username", "email", "password", "picture"],
      });

      return res.status(200).json({
        user,
        message: "Token is valid",
      });
    } catch (error) {
      return res.status(500).json("Terjadi kesalahan pada server");
    }
  }

  async editProfile(req: Request, loginSession: any) {
    try {
      const data = req.body;
      const checkEmail = await this.authRepository.findOne({
        where: {
          email: loginSession.locals.loginSession.email,
        },
        select: ["id", "fullname", "username", "email", "password", "picture"],
      });
      if (!checkEmail) {
        throw new Error("Error Email / password is wrong");
      }

      const user = this.authRepository.create({
        id: checkEmail.id,
        fullname: data.fullname,
        username: data.username,
        picture: data.picture,
      });

      // console.log("id nih service",loginSession.loginSession)
      const editProfile = await this.authRepository.save(user);
      return {
        message: "update profile Succes",
        editProfile,
      };
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

export default new AuthService();
