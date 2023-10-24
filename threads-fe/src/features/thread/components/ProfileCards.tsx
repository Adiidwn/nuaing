'use client'


import { apiAxios } from '@/library/api';
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ThreadCard } from '.';

export default function SocialProfileWithImage() {
  const [profile, setProfile] = useState <ThreadCard>();
  console.log("profile",profile)
  async function UserDetail(){
    try{
      const response = await apiAxios.get("/auth/check")
      setProfile(response.data)
      console.log(response.data)
    }catch(err){
      console.log("error autch check",err) 
    }
    
  }
  useEffect(()=>{
    UserDetail()
  },[])
  
  return (
    <Center py={6}>
      <Box
      
        
        w={'435px'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}>
        <Image
        maxH={"200px"}
        
          h={'full'}
          w={'full'}
          src={
            'https://assets.ayobandung.com/crop/0x0:0x0/750x500/webp/photo/2022/10/28/2941468420.jpg'
          }
          objectFit="cover"
          alt="#"
        />
        <Flex justify={'center'} mt={-12}>
          <Avatar
            size={'xl'}
            src={
              profile?.user?.picture
            }
            css={{
              border: '2px solid white',
            }}
          />
        </Flex>
          <Link to={`/profileEdit/${profile?.user?.id}`}>
        <Button
            w={'32%'}
            mt={8}
            bg={useColorModeValue('#151f21', 'gray.900')}
            color={'white'}
            rounded={'md'}
            float={'right'}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
            }}>
            Edit Profile
          </Button>
          </Link>
        <Box p={6}>
          <Stack spacing={0} align={'center'} mb={5}>
            <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
            {profile?.user?.fullname}
            </Heading>
            <Text color={'gray.500'}>@{profile?.user?.username} </Text>
          </Stack>

          <Stack direction={'row'} justify={'center'} spacing={6}>
            <Stack spacing={0} align={'center'}>
              <Text fontWeight={600}>1m</Text>
              <Text fontSize={'sm'} color={'gray.500'}>
                Followers
              </Text>
            </Stack>
            <Stack spacing={0} align={'center'}>
              <Text fontWeight={600}>1k</Text>
              <Text fontSize={'sm'} color={'gray.500'}>
                Following
              </Text>
            </Stack>
          </Stack>

          
        </Box>
      </Box>
    </Center>
  )
}