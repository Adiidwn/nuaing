import { Request, Response } from "express"
import { ParamsDictionary } from "express-serve-static-core"
import { ParsedQs } from "qs"
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { User } from "./User"
import { Thread } from "./Thread"

@Entity( {name: "follows"})
export class Follow {
    static find(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) {
      throw new Error("Method not implemented.")
    }

    @PrimaryGeneratedColumn()
    id: number

  

    @ManyToOne(()=> User, (user)=> user.followings,{
      onDelete:"CASCADE",
      onUpdate:"CASCADE"
    })
  followings:User;

  @ManyToOne(()=> User, (user)=> user.followers,{
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
  })
  followers:User;




}
