import { NextFunction, Request, Response } from "express";
import * as multer from "multer";

export const upload = (fieldName: string) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads/");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, file.fieldname + "-" + uniqueSuffix + ".png");
    },
  });

  const uploadFile = multer({ storage });

  return (req: Request, res: Response, next: NextFunction) => {
    uploadFile.single(fieldName)(req, res, function (error: any) {
      if (error) {
        return res.status(400).json({ error });
      }

      res.locals.filename = req.file.filename;
      console.log('====================================');
      console.log("res.locals.filename midleware:",res.locals.filename);
      console.log("req.file.filename midleware:",req.file.filename);
      console.log('====================================');
      next();
    });
  };
};