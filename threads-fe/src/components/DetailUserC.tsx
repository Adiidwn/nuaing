import { ThreadCard } from "@/features/thread";
import Post from "@/hooks/post";
import { apiAxios } from "@/library/api";
import { Avatar, Box, Button, Icon, Image, Input, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { LiaCommentDotsSolid } from "react-icons/lia";
import { TiAttachmentOutline } from "react-icons/ti";
import { Link, useParams } from "react-router-dom";


function DetailUser (){
const {submitComment,handleContentChange,handleImageChange}= Post()
const [showImage,setShowImage]=useState<boolean>(true)
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

const e = Threads.find((el)=> el.id === Number(id))
return e ? (
  <>
 <Box display={'flex'} marginTop={"15px"} margin={"0 auto"} justifyContent={'flex-start'} alignItems={"stretch"} width={'600px'} gap={'10px'} marginBottom={'20px'}>
 <Link to={"/profile/" + e.user?.id}>
        <Avatar width= {"  50px"} height= {"50px"} borderRadius= {"50%"} objectFit= {"cover"}  src={e.user?.picture} />
        </Link>
        <Box width={'100%'}>
          <Box display= {"flex"} >
            <Link to={"/profile/" + e.user?.id}>
            <Text fontWeight= {"bold"}marginRight={'7px'}>{e.user?.fullname}</Text>
            </Link>
            <Text color= {"grey"} marginRight={'7px'}>@{e.user?.username}</Text>
            <Text color= {"grey"} >  {e.postedAt}</Text>
          </Box>

          <Box marginBottom= {"15px"} >
            <Text marginBottom={'10px'}>{e.content}</Text>
           
            {showImage && (<Image onError={()=> setShowImage(false)}  maxW={"550px"} maxH={"500px"} borderRadius= {"5%"} objectFit= {"cover"}  src={e.image} />
            )}
          </Box>
          <Box width= {"100%"} display= {"flex"} gap={'10px'} alignItems={'flex-start'}height={'30px'}  >
          <Link to={""}>
          <Icon 
        
          color={e.likes?"red" :"black"} fontSize={'18px'}  as={AiFillHeart}/>
          </Link>
            <Text width= {"20%"} >{} Like</Text>
           <Link to={"/"+e.user?.id}>
            <Icon
             
             fontSize={'18px'} as={LiaCommentDotsSolid}/>
           </Link>
            <Text width= {"20%"} > {e?.reply} Reply</Text>
          </Box>
          <Box className="Post" display={"flex"} flexDirection={"column"} h={"200px"} w={"400px"} ml={"10px"} >
    <form>
      <Input
        type="text"
        placeholder="Comment here..."
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

      <Button type="submit" onClick={submitComment}>Post</Button>
    </form>
  </Box>
        </Box>
      </Box>

  </>
) :
("SALAH Masdsadas")
}

export default DetailUser