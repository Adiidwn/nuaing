import { apiAxios } from "@/library/api";
import React, { FormEvent, useEffect, useState } from 'react';
import { IThreadPost } from '../layouts/ThreadCard';
import { IDeleteThread } from "@/interfaces/User";
import { useDispatch } from "react-redux";
import { SET_THREAD } from '@/stores/rootReducer';

export default function Post(){
  const [time, setTime] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const dispatch =useDispatch()

  const [contentt,setContent] = useState<IThreadPost>({
    content:"",
    image:""
  })




  
  
  // const toast = useToast()

  const submitHandle = async (e : FormEvent) => {
   
    e.preventDefault()
    postThreads()
  }
  async function postThreads(){
    try{
      const formData = new FormData()
      formData.append("content", contentt.content as string)
      formData.append("image", contentt.image as File)
      const response = await apiAxios.post("/thread",formData)
      dispatch(SET_THREAD(response.data))
      setTime(time)
      console.log("ini response post",response)
      console.log("Post Successed")
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
// useEffect(()=>{
//   postThreads()
// },[time])
 
return {
  time,
  submitHandle,
  handleContentChange,
  handleImageChange,
  handleDelete,
  submitComment,
  postThreads,
  setTime
}
 


 
}