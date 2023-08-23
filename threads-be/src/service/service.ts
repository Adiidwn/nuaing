import { Repository } from "typeorm";

import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { Thread } from "../entity/Thread";
import { Console } from "console";
import { User } from '../entity/User';
import {v2 as cloudinary}from 'cloudinary'
 class ThreadService {
  private readonly threadRepository: Repository<Thread> = AppDataSource.getRepository(Thread);

  async find(req: Request, res: Response) {
    try{
    const threads = await this.threadRepository.find({
      relations:["user","likes"],
      // take: 4,
      
    });
    let responseBaru = []

    threads.forEach((element)=>{
      responseBaru.push({
        ...element,
        likes_count: element.likes.length,
      })
    
      })
    return res.status(200).json(threads);
  }catch(err){
    return res.status(500).json("something error")
  }
  }
  
  async findOne(req: Request, res: Response) {
    const id = parseInt(req.params.id)
    const threads = await this.threadRepository.findOne({
        where : {
            id : id
        },
        
          relations:["user"],
        
    })
   

    // Thread.image = "localhost:5000/uploads/" + Thread.image

    return res.status(200).json(threads);
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

  async create (req: Request, res: Response) {
    const {content} = req.body
    const loginSession = res.locals.loginSession
    console.log("LOGIN SESI NIH BOS",loginSession)  
  
    // console.log("USERLOGIN NIH",loginSession)

    try{ 
    const filename = res.locals.filename 
    console.log("filename",filename)
    const data =this.threadRepository.create ({
      content:content,
      image:filename,
      user:loginSession
    })
    console.log("ini data boss",data)

    const cloudinaryID = cloudinary.config({
      cloud_name:"dk0jtenod",
      api_key:"179758344782873",
      api_secret:"5U9WfOhBlle6Khly9EmNQ9rBzu0"
      
    })
    
    const cloudinaryResponse = await  cloudinary.uploader.upload("./uploads/" + filename) 

    console.log("cloudinary apaan nih",cloudinaryResponse) 

    const thread = this.threadRepository.create({
     
        content :data.content,  
        image : cloudinaryResponse.secure_url,
        user:data.user
    })
  

 
    const createdThread = await this.threadRepository.save(thread)
   
    return res.status(200).json("Posted");
  }
  catch (err){
    return res.status(500).json(err)
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
    const id = parseInt(req.params.id)

    const threadz = await this.threadRepository.findOne({
        where : {
            id : id
        }
    })
    const data = req.body;
    // console.log(id , threadz)
    // console.log(req.body)

    if (data.content != "") {
        threadz.content = data.content
    }

    if (data.content != "") {
        threadz.image = data.image
    }

// console.log(threadz.content , threadz.image)

 const updatedThread = this.threadRepository.save(threadz)

    return res.status(200).json(updatedThread);
  }

}

export default new ThreadService();

