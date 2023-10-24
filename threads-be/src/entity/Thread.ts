import { Request, Response } from "express"
import { ParamsDictionary } from "express-serve-static-core"
import { ParsedQs } from "qs"
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Like } from "./Likes"
import { Reply } from "./Replies"
import { User } from "./User"

@Entity( {name: "threads"})
export class Thread {
    static find(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) {
      throw new Error("Method not implemented.")
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable:true})
    content: string

    @Column({nullable:true})
    image: string

    @Column({type: "timestamp",default: ()=> "CURRENT_TIMESTAMP" })
    postedAt: Date

    @Column({nullable:true})
    userId: number

    @Column({nullable:true})
    Comment:string

    // @Column()
    // likes: number

    // @Column({nullable:true})
    // replies: number

    @Column({nullable:true})
    isLikes:boolean

    @Column({nullable:true})
    isReply:boolean

    @ManyToOne(()=> User, (user)=> user.thread)
    user:User[];
  
    @OneToMany(()=> Like, (likes)=> likes.thread,{
      onDelete:"CASCADE",
      onUpdate:"CASCADE"
    })
    likes: Like[];

    @OneToMany(()=> Reply, (replies)=> replies.thread,{
      onDelete:"CASCADE",
      onUpdate:"CASCADE"
    })
    replies: Reply[];
  
}
