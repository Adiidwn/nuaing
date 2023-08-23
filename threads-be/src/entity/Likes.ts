import { Request, Response } from "express"
import { ParamsDictionary } from "express-serve-static-core"
import { ParsedQs } from "qs"
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { User } from "./User"
import { Thread } from "./Thread"

@Entity( {name: "likes"})
export class Like {
    static find(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) {
      throw new Error("Method not implemented.")
    }

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(()=> User, (user)=> user.likes,{
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
    })
  user:User;

    @ManyToOne(()=> Thread, (thread)=> thread.likes,{
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
  })
  thread:Thread;

}
