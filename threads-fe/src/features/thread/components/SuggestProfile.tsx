import { Box, Button, Card, CardHeader, Heading, Image, Stack,Text } from "@chakra-ui/react"
import FollowButtonWithShadow from "./buttonFollow"

export default function CardList(){

return(
<>
<Card
  direction={{ base: 'column', sm: 'row' }}
  overflow='hidden'
  variant='outline'
  flexDirection={'column'}
  alignItems={"stretch"}
 width={'100%'}
>
  
  <Text fontWeight={'bold'} padding={'10px'}>Suggestions </Text>
  <Stack height={'90px'}>
    
    <CardHeader display={"flex"} alignItems={"center"}>
    <Image
    mr={'10px'}
    mt={'5px'}
    objectFit='cover'
    maxW={{ base: '100%', sm: '100px' }}
    h="50px" w="50px"
    borderRadius={'50%'}
    src='https://www.hindustantimes.com/ht-img/img/2023/07/31/1600x900/IShowSpeed_has_been_discharged_from_hospital_1690773846573_1690773886505.jpeg'
    alt='Caffe Latte'
  />
    <Box display={"flex"} flexDirection={"column"} gap={'4px'} marginRight={'30px'} w={'110px'}>
    <Heading size='xs' mr={'30px'}> IShowSpeed </Heading>
    <Heading size='xs' color="grey"   > @IShowSpeed</Heading>
    </Box>
   <FollowButtonWithShadow/>
    </CardHeader>
  </Stack>

  <Stack height={'100px'}>
    
    <CardHeader display={"flex"} alignItems={"center"}>
    <Image
    mr={'10px'}
    mt={'10px'}
    objectFit='cover'
    maxW={{ base: '100%', sm: '100px' }}
    h="50px" w="50px"
    borderRadius={'50%'}
    src='https://pbs.twimg.com/profile_images/1589659852271280128/KhrL02UB_400x400.jpg'
    alt='Caffe Latte'
  />
    <Box display={"flex"} flexDirection={"column"} gap={'4px'} marginRight={'30px'} w={'110px'}>
    <Heading size='xs' mr={'30px'}> Kim Kardashian </Heading>
    <Heading size='xs' color="grey"   > @Kardashian</Heading>
    </Box>
    <FollowButtonWithShadow/>
    </CardHeader>
  </Stack>

  <Stack height={'100px'}>
    
    <CardHeader display={"flex"} alignItems={"center"}>
    <Image
    mr={'10px'}
    mt={'10px'}
    objectFit='cover'
    maxW={{ base: '100%', sm: '100px' }}
    h="50px" w="50px"
    borderRadius={'50%'}
    src='https://preview.redd.it/gabbie-sul-v0-uocib1uhhs5a1.jpg?auto=webp&s=69aca8208d930ad082714efd9c84a508bb7f8b72'
    alt='Caffe Latte'
  />
    <Box display={"flex"} flexDirection={"column"} gap={'4px'} marginRight={'30px'}w={'110px'}>
    <Heading size='xs' mr={'30px'}> Gabbie Sul </Heading>
    <Heading size='xs' color="grey"   > @Gabbiesul</Heading>
    </Box>
    <FollowButtonWithShadow/>
    </CardHeader>
  </Stack>

  <Stack height={'100px'}>
    
    <CardHeader display={"flex"} alignItems={"center"}>
    <Image
    mr={'10px'}
    mt={'10px'}
    objectFit='cover'
    maxW={{ base: '100%', sm: '100px' }}
    h="50px" w="50px"
    borderRadius={'50%'}
    src='https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/f0139d79-8c6d-4826-04a9-32af6b771700/width=450/00026-1970435715.jpeg'
    alt='Caffe Latte'
  />
    <Box display={"flex"} flexDirection={"column"} gap={'4px'} marginRight={'30px'}w={'110px'}>
    <Heading size='xs' mr={'30px'}> Alexandra Daddario </Heading>
    <Heading size='xs' color="grey"   > @AlexaD</Heading>
    </Box>
    <FollowButtonWithShadow/>
    </CardHeader>
  </Stack>

  
  
</Card>
</>
)
}

