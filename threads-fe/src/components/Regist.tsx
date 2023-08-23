'use client'

import { IUserRegister } from '@/interfaces/User'
import { apiAxios } from '@/library/api';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from '@chakra-ui/react'
import { useState, ChangeEvent } from 'react';
import {useNavigate} from "react-router-dom"

export default function SignupCard() {

  const [form,setForm] = useState<IUserRegister>({
    email:"",
    username:"",
    fullname:"",
    password:""
  })
  
  function handleChange(event:ChangeEvent<HTMLInputElement>){
    setForm({
        ...form,
        [event.target.name] : event.target.value
    })
}

 async function handleRegister (){
    try{
      const response = await apiAxios.post('/auth/register',form)
      console.log("register berhasil",response)
    } catch (err){
      console.log(err)
    }
  }
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="fullname" isRequired>
                  <FormLabel>Fullname</FormLabel>
                  <Input type="text" name='fullname' onChange={handleChange}/>
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Username</FormLabel>  
                  <Input type="text" name='username'onChange={handleChange}/>
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" name='email'onChange={handleChange}/>
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'}name='password' onChange={handleChange}/>
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() => setShowPassword((showPassword) => !showPassword)}>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
               onClick={handleRegister}
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'} onClick={()=> navigate("/auth/signin")}>
                Already a user? <Link color={'blue.400'}>Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}