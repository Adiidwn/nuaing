
import { ParsedQs } from "qs"
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';
import { ParamsDictionary } from "express-serve-static-core"
import { Thread } from './Thread';
import { Request,Response } from 'express';

@Entity({name:"replies"})
export class Reply {
  static find(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) {
    throw new Error("Method not implemented.")
  }
  @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @ManyToOne(()=> Thread, (thread) => thread.replies)
  
    thread: Thread;

    @ManyToOne(()=> User, (user)=> user.replies)
    
    user: User;
    
}



