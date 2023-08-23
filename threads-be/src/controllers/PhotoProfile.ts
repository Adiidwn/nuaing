import { Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Thread } from "../entity/Thread";
import {v2 as cloudinary}from 'cloudinary'

class PhotoProfile {
  private readonly threadRepository: Repository<Thread> = AppDataSource.getRepository(Thread);

  async edit (req: Request, res: Response) {
    const loginSession = res.locals.loginSession

  
    // console.log("USERLOGIN NIH",loginSession)

    try{ 
    const filename = res.locals.filename 

    const data =this.threadRepository.create ({
      image:filename,
      user:loginSession
    })


    const cloudinaryID = cloudinary.config({
      cloud_name:"dk0jtenod",
      api_key:"179758344782873",
      api_secret:"5U9WfOhBlle6Khly9EmNQ9rBzu0"
      
    })
    
    const cloudinaryResponse = await  cloudinary.uploader.upload("./uploads/" + filename) 

    console.log("cloudinary apaan nih",cloudinaryResponse) 

    const thread = this.threadRepository.create({
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
}

export default new PhotoProfile();
