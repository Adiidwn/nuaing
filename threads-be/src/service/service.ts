import { Repository } from "typeorm";

import { v2 as cloudinary } from "cloudinary";
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Thread } from "../entity/Thread";
class ThreadService {
  private readonly threadRepository: Repository<Thread> =
    AppDataSource.getRepository(Thread);

  async find(reqQuery?: any, loginSession?: any) {
    try {
      const threads = await this.threadRepository.find({
        relations: ["user", "likes.user", "replies"],
        take: 10,
        order: {
          id: "DESC",
        },
      });
      console.log("loginseesion service", loginSession);

      return threads.map((element) => ({
        id: element.id,
        content: element.content,
        image: element.image,
        postedAt: element.postedAt,
        user: element.user,
        // repliesCount: element.replies.length,
        // likesCount: element.likes.length,
        // isLiked: element.likes.some((like:any) => like.user.id === loginSession.id),
      }));
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async findOne(id: number, loginSession?: any): Promise<any> {
    try {
      const thread = await this.threadRepository.findOne({
        where: {
          id: id,
        },

        relations: ["user", "likes.user", "replies"],
      });
      console.log("====================================");
      console.log("thread service", thread);
      console.log("====================================");
      return {
        id: thread.id,
        content: thread.content,
        image: thread.image,
        postedAt: thread.postedAt,
        user: thread.user,
        repliesCount: thread.replies.length,
        likesCount: thread.likes.length,
        isLiked: thread.likes.some(
          (like: any) => like.user.id === loginSession.id
        ),
      };
    } catch (err) {
      throw new Error(err.message);
    }

    // Thread.image = "localhost:5000/uploads/" + Thread.image
  }

  // async DetailList(req: Request, res: Response) {
  //   const id = parseInt(req.params.id)
  //   const threads = await this.threadRepository.findOne({
  //       where : {
  //          id
  //       },

  //         relations:["user"]

  //   })
  //   console.log("id ini apa ",id)
  //   console.log("id ini apa ",threads)
  //   return res.status(200).json(threads);
  // }

  async create(req: Request, res: Response) {
    const { content } = req.body;
    const loginSession = res.locals.loginSession;
    console.log("LOGIN SESI CREATE", loginSession);

    // console.log("USERLOGIN NIH",loginSession)

    try {
      const filename = res.locals.filename;
      console.log("filename", filename);
      const data = this.threadRepository.create({
        content: content,
        image: filename,
        user: loginSession,
      });
      console.log("ini data boss", data);

      const cloudinaryID = cloudinary.config({
        cloud_name: "dk0jtenod",
        api_key: "179758344782873",
        api_secret: "5U9WfOhBlle6Khly9EmNQ9rBzu0",
      });

      const cloudinaryResponse = await cloudinary.uploader.upload(
        "./uploads/" + filename
      );

      console.log("cloudinary apaan nih", cloudinaryResponse);

      const thread = this.threadRepository.create({
        content: data.content,
        image: cloudinaryResponse.secure_url,
        user: data.user,
      });

      const createdThread = await this.threadRepository.save(thread);

      return res.status(200).json("Posted");
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  async delete(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const loginSession = res.locals.loginSession;

    try {
      const deletedThread = await this.threadRepository.delete(id);
      return res.status(200).json(deletedThread);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  async update(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    const threadz = await this.threadRepository.findOne({
      where: {
        id: id,
      },
    });
    const data = req.body;
    // console.log(id , threadz)
    // console.log(req.body)

    if (data.content != "") {
      threadz.content = data.content;
    }

    if (data.content != "") {
      threadz.image = data.image;
    }

    // console.log(threadz.content , threadz.image)

    const updatedThread = this.threadRepository.save(threadz);

    return res.status(200).json(updatedThread);
  }
}

export default new ThreadService();
