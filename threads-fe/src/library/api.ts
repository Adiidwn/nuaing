import axios from 'axios'

export const  apiAxios = axios.create({
  baseURL :"http://localhost:5000/api/v1"
  
})



export function setAuthToken(token : string){
  if (token) {
      apiAxios.defaults.headers.common["Authorization"] = `Bearer ${token}`
  }else{
      delete apiAxios.defaults.headers.common["Authorization"]
   }
}