import { ThreadCard } from "@/features/thread";
import  {apiAxios}  from "@/library/api";
import { useEffect, useState } from "react";

const First = () => {

  const [Threads, setThread] = useState<ThreadCard[]>
  ([]
  );
  

  const fetchData = async () => {
   
      const response = await apiAxios.get("/thread",{
        headers:{
          Authorization:`Bearer ${localStorage.token}`
        }
      });
      setThread(response.data);
   
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
    {

      Threads.map((data,index) =>(
        <ThreadCard
            user={data.user}
            id = {data.id}
            postedAt={data.postedAt}
            content={data.content}
            image={data.image}
            likes= {data.likes}
            reply= {data.reply}
            // isLikes = {data.isLikes}
            key={index} />

      ))
    }
    </>
  )
}

export default First 