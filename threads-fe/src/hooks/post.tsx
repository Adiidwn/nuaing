import { apiAxios } from "@/library/api";
import React, { FormEvent, useState } from 'react';
import { IThreadPost } from '../layouts/ThreadCard';
import { IDeleteThread } from "@/interfaces/User";

export default function Post(){
  const [contentt,setContent] = useState<IThreadPost>({
    content:"",
    image:""
  })
  // const toast = useToast()

  const submitHandle = async (e : FormEvent) => {
   
    try{
       e.preventDefault()
      const formData = new FormData()
      formData.append("content", contentt.content as string)
      formData.append("image", contentt.image as File)
      const response = await apiAxios.post("/thread",formData)
      console.log("ini response post",response)

    } catch(err)
    {console.log("error post",err)}
    
  }
  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setContent((prevContent)=>({
      ...prevContent,
      content : e.target.value
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
   const file = e.target.files?.[0]
 if (file){
  setContent((prevContent)=>({
    ...prevContent,
    image : file,
  }));
 }
 };

 const initialAuthstate: IDeleteThread = {
 image:"",
 content:"",
};
const handleDelete = async (id: number | undefined) => {
  try {
    await apiAxios.delete(`/api/threads/${id}`);
    // Perform any necessary cleanup or UI updates after successful deletion
  } catch (error) {
    // Handle any errors that occur during the deletion process
    console.error(error);
  }
};
const submitComment = async (e : FormEvent) => {
  e.preventDefault()
  try{
    const formData = new FormData()
    formData.append("content", contentt.content as string)
    formData.append("image", contentt.image as File)
    const response = await apiAxios.post("/thread/id",formData)
    console.log("ini response post",response)

  } catch(err)
  {console.log("error post",err)}
  
}
 
return {

  submitHandle,
  handleContentChange,
  handleImageChange,
  handleDelete,
  submitComment,
}
 


 
}