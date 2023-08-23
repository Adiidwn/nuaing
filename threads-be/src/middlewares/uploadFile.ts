import { NextFunction, Request, Response } from 'express'
import * as multer from 'multer'

export const upload = (fieldname: string)=>{

const storage = multer.diskStorage({
  destination : function (req,file,callback){
    callback(null,"./uploads/")

  },
  filename: function(req,file,callback){
    const suffix = Date.now()
    callback(null,file.fieldname + "_" + suffix + ".png")
  },
})
const uploadFile = multer ({storage : storage})

return (req:Request, res:Response,next :NextFunction)=>{
  uploadFile.single(fieldname)(req,res,function (err:any) {
    if (err){
      return res.status(400).json ({error: 'File upload failed.'})
    }
    res.locals.filename= req.file.filename
   
    next()
  })
}

}
