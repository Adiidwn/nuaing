import { Request, Response } from "express";
import ReplyService from "../service/ReplyService";


class ReplyController {
  find(req:Request,res:Response){
    ReplyService.find(req)
  }
  // findOne(req:Request,res:Response){
  //   ReplyService.findOne(req,res)
  // }
  async create(req: Request, res: Response) {
    try {
      const loginSession = res.locals.loginSession;
      const response = await ReplyService.create(req.body, loginSession);
      return res.status(200).json(response);

    } catch (err) {
      return res
        .status(500)
        .json({ error: err.message });
    }
  }
}
  // delete(req:Request,res:Response){
  //   ThreadService.delete(req,res)
  // }
  // update(req:Request,res:Response){
  //   ThreadService.update(req,res)
  // }
  
  // DetailList(req:Request,res:Response){
  //   ThreadService.DetailList(req,res)
  // }
  


export default new ReplyController()