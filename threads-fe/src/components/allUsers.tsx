import { apiAxios } from "@/library/api";
import { useEffect, useState } from "react";
import {IUserList} from "@/interfaces/User"

import UserList from "@/layouts/UserList";



const First = () => {

  const [users, setUsers] = useState<IUserList[]>
  ([]
  );
  

  const fetchData = async () => {
   
      const response = await apiAxios.get("/thread",{
        headers:{
          Authorization:`Bearer ${localStorage.token}`
        }
      });
      setUsers(response.data);
   
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
    {

        users.map((data,index) =>(
        <UserList
            id={data.id}
            fullname={data.fullname}
            username={data.username}
            picture={data.picture}
            key={index} />

      ))
    }
    </>
  )
}

export default First 