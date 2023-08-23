import { Request, Response } from "express";
import LikeService from "../service/LikeService";
import { log } from "console";

class LikeController {
  async create(req: Request, res: Response) {
    try {
      const loginSession = res.locals.loginSession;
      const response = await LikeService.create(req.body, loginSession);

      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json({ error: err.message });
     
    }
  }

  async delete (req: Request, res: Response) {

    try {
      const loginSession = res.locals.loginSession
      const threadId = parseInt(req.params.threadId)

      const response = await LikeService.delete(loginSession, threadId)
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json({ error: err.message });
     
    }
  }
}

export default new LikeController();