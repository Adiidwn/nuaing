// export function useFetchThreads(){
// const thread set thread 
// }
// set show image false

import { AUTH_LOGOUT } from "@/stores/rootReducer"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"


// tan stack react query (aditional)
function handlerLogout(){
const navigate = useNavigate()
const dispatch =useDispatch()
  
    try{
     dispatch(AUTH_LOGOUT())
     navigate('/auth/signin')
      console.log("ini auth check",dispatch)
    }catch(err){
     navigate('/auth/signin')
    }
  return{handlerLogout}
}

export default handlerLogout


