/* eslint-disable react/react-in-jsx-scope */
import { IUserLogin } from "@/interfaces/User";

// import { AUTH_LOGIN } from "@/stores/rrotReducer";
import { Button, FormControl, Input, Text } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { AUTH_LOGIN } from "@/stores/rootReducer";
import { apiAxios, setAuthToken } from "@/library/api";

// import { useSelector } from 'react-redux'

export default function FormLogin() {
    const navigate = useNavigate()
    const dispath = useDispatch()
    // const user = useSelector((state : RootState)=>  state.auth)
    const [form, setForm] = useState<IUserLogin>({
        email: "",
        password: "",
    })

    function handleChange(event:ChangeEvent<HTMLInputElement>){
        setForm({
            ...form,
            [event.target.name] : event.target.value
        })
    }
async function handleLogin (){
    try {
        const response = await apiAxios.post("/auth/signin",form)
        dispath(AUTH_LOGIN(response.data))
        console.log(response.data)
        console.log("Logged in user data:", response.data.user);

        // localStorage.setItem("token" , response.data.token)
        // setAuthToken(localStorage.token);
        navigate('/')
        // navigate(/${response.data.user.id});

    } catch (error) {
        console.log(error)
    }
}


return(
    <FormControl>
        {/* <Button onClick={()=> ("testing" + user)}/> */}
        <Text> INI BAGIAN LOGIN</Text>
    <Input name="email" onChange={handleChange} />
    <Input name="password" onChange={handleChange} />
    <Button type="submit" onClick={handleLogin}> Submit </Button>
    </FormControl>
)

}