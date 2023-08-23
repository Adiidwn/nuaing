'use client'

import { IUserLogin } from '@/interfaces/User'
import { apiAxios, setAuthToken } from '@/library/api'
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { RootState } from '@/stores/slice/rootstate'
import { AUTH_LOGIN } from '@/stores/rootReducer'
export default function SignIn() {
  const auth = useSelector((state:RootState)=> state.auth)
  console.log('ini auth',auth)
  const [form,setForm] = useState<IUserLogin>({
    email:"",
    password:""
  })
 
 
  function handleChange(event:ChangeEvent<HTMLInputElement>){
    setForm({
        ...form,
        [event.target.name] : event.target.value
       
    })
} console.log(form)

 async function handleLogin (){
    try{
      const response = await apiAxios.post("/auth/signin",form)
      dispatch(AUTH_LOGIN(response.data))
      // console.log("login berhasil",response)
      localStorage.setItem("token" , response.data.token)
      setAuthToken(localStorage.token);
      navigate('/')
      console.log('response data',response.data)
    } catch (err){
      console.log("ini error ",err)
    }
  }
  const navigate = useNavigate()
  const dispatch = useDispatch()

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
        
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
        </Stack>
   
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" name='email'onChange={handleChange}/>
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" name='password'onChange={handleChange}/>
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Text color={'blue.400'}>Forgot password?</Text>
              </Stack>
              <Text align={'center'} onClick={()=> navigate("/auth/register")}>
                Dont have an account? <Link color={'blue.400'}>Register</Link>
              </Text>
              <Button
              onClick={handleLogin}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}