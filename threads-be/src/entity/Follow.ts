import { Request, Response } from "express"
import { ParamsDictionary } from "express-serve-static-core"
import { ParsedQs } from "qs"
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { User } from "./User"
import { Thread } from "./Thread"

@Entity( {name: "follows"})
export class Follow {

    @PrimaryGeneratedColumn()
    id: number

  

    @ManyToOne(()=> User, (user)=> user.followings,{
      onDelete:"CASCADE",
      onUpdate:"CASCADE"
    })
  follower:User;

  @ManyToOne(()=> User, (user)=> user.followers,{
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
  })
  followed:User;




}
