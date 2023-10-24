'use client'

import Post from '@/hooks/post';
import {
  Box,
  Button,
  Icon,
  Input
} from '@chakra-ui/react';
import { TiAttachmentOutline } from "react-icons/ti";




export default function PostContent() {
 
  const {submitHandle, handleContentChange, handleImageChange}= Post()
  return (
    <Box className="Post" display={"flex"} flexDirection={"column"} h={"120px"} w={"400px"} ml={"280px"} >
    <form>
      <Input
        type="text"
        placeholder="What's on your mind?"
        onChange={handleContentChange}
       name="content"
      />
   <Box>
     <label htmlFor="img">
      <Icon float={'right'} fontSize={'30px'} as={TiAttachmentOutline} cursor="pointer">
      
      </Icon>
     </label>
     <Input
          onChange={handleImageChange}
          name="file"
          type="file"
          id="img"
          hidden
        />
     </Box>
      <Box> 
      <Button  type="submit" onClick={submitHandle}>Post</Button>
      </Box>
    </form>
  </Box>
);
}
  
  
