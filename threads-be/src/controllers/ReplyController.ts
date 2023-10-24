import { Request, Response } from "express";
import ReplyService from "../service/ReplyService";


class ReplyController {
  async find(req: Request, res: Response) {
    try {
      const response = await ReplyService.find(req.body);

      console.log("req controller",req.body)
      console.log("req query controller",req.query)
      console.log("response controller",response)
      return res.status(200).json(response);
    } catch (error) {
      return res
        .status(500)
        .json({ error: error.message });
    }
  }
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