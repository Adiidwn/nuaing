'use client'

import { useState } from 'react';
import { TiAttachmentOutline } from "react-icons/ti";
import Post from "@/hooks/post";
import {
  Box,
  Button,
  Icon,
  Input,
  InputGroup,
  InputLeftElement
} from '@chakra-ui/react';



export default function PostContent() {
 
  // const [state, setState] = useState<'initial' | 'submitting' | 'success'>('initial')
  // const [_, setError] = useState(false)
  const {submitHandle,handleContentChange,handleImageChange}= Post()
  const [name, setName] = useState("");
  // const [selectedFile, setSelectedFile] = useState();
  return (
    <Box className="Post" display={"flex"} flexDirection={"column"} h={"200px"} w={"390px"} ml={"200px"} >
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
  
  
