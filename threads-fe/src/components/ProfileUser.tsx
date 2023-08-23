import { ThreadCard } from "@/features/thread";
import {apiAxios} from "@/library/api";
import { Avatar, Button, Center, Box, Flex, Stack, Heading,Text,Image,useColorModeValue} from '@chakra-ui/react';


import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


function ProfileUser (){

  const {id} = useParams();
  const [Threads, setThread] = useState<ThreadCard[]>([]);
  const fetchData = async () => {
    try {
      const response = await apiAxios.get("/thread");
      setThread(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);
  
  const e = Threads.find((el)=> el.user?.id === Number(id))
 

return e ? (
  <>
  <Center py={6}>
      <Box

        
        w={'350px'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}>
        <Image
          h={'120px'}
          w={'full'}
          src={
            e.image
          }
          objectFit="cover"
          alt="#"
        />
        <Flex justify={'center'} mt={-12}>
          <Avatar
            size={'xl'}
            src={
              e.user?.picture
            }
            css={{
              border: '2px solid white',
            }}
          />
        </Flex>

        <Box p={6}>
          <Stack spacing={0} align={'center'} mb={5}>
            <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
            {e.user?.fullname}
            </Heading>
            <Text color={'gray.500'}>Influencer</Text>
          </Stack>

          <Stack direction={'row'} justify={'center'} spacing={6}>
            <Stack spacing={0} align={'center'}>
              <Text fontWeight={600}>23k</Text>
              <Text fontSize={'sm'} color={'gray.500'}>
                Following
              </Text>
            </Stack>
            <Stack spacing={0} align={'center'}>
              <Text fontWeight={600}>23k</Text>
              <Text fontSize={'sm'} color={'gray.500'}>
                Followers
              </Text>
            </Stack>
          </Stack>

          <Button
            w={'full'}
            mt={8}
            
            bg={useColorModeValue('#151f21', 'gray.900')}
            color={'white'}
            rounded={'md'}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
            }}>
            Edit Profile
          </Button>
        </Box>
      </Box>
    </Center>

  </>
) :
("SALAH profile")
}

export default ProfileUser