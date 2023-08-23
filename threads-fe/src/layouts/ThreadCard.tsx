import { apiAxios } from "@/library/api";
import { CloseIcon } from "@chakra-ui/icons";
import { Avatar, Box, Icon, IconButton, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { LiaCommentDotsSolid } from "react-icons/lia";
import { TiPlane } from "react-icons/ti";
import { Link } from "react-router-dom";

export interface User {
  id  :number ,
  picture? : string,
  fullname? : string,
  username? : string,
  email : string
}
export interface IThreadPost {
  id? :number ,
  content? : string,
  image? : string | Blob,
 
}

export interface ThreadCard {
  id?:number,
  user?: User;
  postedAt?: string,
  content? : string,
  image? : string,
  likes? : number,
  reply? : number,
}

export function ThreadCard (props:ThreadCard){
  const [likesCount,setLikeCount]=useState(props.likes||0);
  const[isLiked,SetisLike]=useState(props.likes||false);
  const handlerLikeClick = ()=>{
    if(isLiked){
      setLikeCount(likesCount + 1);
    } else{
      setLikeCount(likesCount -1)
    }
    SetisLike(!isLiked)
    
  } 
  const handlerReply = ()=>{
  const [replyCount,setReplyCount]=useState(props.reply||0);
  const[isReply,SetisReply]=useState(props.reply||false);
  if(isReply){
    setReplyCount(replyCount - 1);
  } else{
    setReplyCount(replyCount +1)
  }
  SetisReply(!isReply)
  }
  const [showImage,setShowImage]=useState<boolean>(true)
  const handleDelete = () => {
    try {
      apiAxios.delete(`/thread/${props.id}`);
      // Perform any necessary cleanup or UI updates after successful deletion
    } catch (error) {
      // Handle any errors that occur during the deletion process
      console.error(error);
    }
  };
  const [profile, setProfile] = useState <ThreadCard>();
 
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
    <>
   
    <Box display={'flex'} marginTop={"15px"} margin={"0 auto"} justifyContent={'flex-start'} alignItems={"stretch"} width={'600px'} gap={'10px'} marginBottom={'20px'}>
    
        <Avatar width= {"  50px"} height= {"50px"} borderRadius= {"50%"} objectFit= {"cover"}  src={props.user?.picture} />
       
        <Box width={'100%'}>
          <Box display= {"flex"} >
          <Link to={"/profile/" + props.user?.id}>
            <Text fontWeight= {"bold"}marginRight={'7px'}>{props.user?.fullname}</Text>
            </Link>
            <Text color= {"grey"} marginRight={'7px'}>@{props.user?.username}</Text>
            <Text color= {"grey"} >  {props.postedAt}</Text>
            {props.user?.id === profile?.user?.id /* replace with the actual user ID */ && (
              <IconButton
                right="-220px"
                aria-label="Delete"
                icon={<Icon as={CloseIcon} />}
                onClick={handleDelete}
              />
            )}
          </Box>

          <Box marginBottom= {"5px"} >
            <Text marginLeft={'20px'} marginBottom={'5px'}>{props.content}</Text>
            <Link to={"/" + props.id}>
            {showImage && (<Image onError={()=> setShowImage(false)}  maxW={"550px"} maxH={"400px"}  borderRadius= {"5%"} objectFit= {"contain"}  src={props.image} />
            )}
            </Link>
           
          </Box>
          <Box width= {"100%"} display= {"flex"} gap={'10px'} alignItems={'center'} ml={"20px"} >
            
          <Link to={""}>
          <Icon 
          onClick={handlerLikeClick}
          color={isLiked?"black" :"red"} fontSize={'20px'}  as={AiFillHeart}/>
          </Link>
            <Text width= {"30%"} >{likesCount} Like</Text>
           <Link to={"/"+props.id}>
            <Icon
             onClick={handlerReply} 
             fontSize={'20px'} as={LiaCommentDotsSolid}/>
           </Link>
            <Text width= {"30%"} > {props?.reply} Reply</Text>
            <Link to={"/"+props.id}>
            <Icon
             onClick={handlerReply} 
             fontSize={'20px'} as={TiPlane}/>
           </Link>
            <Text width= {"30%"} > {props?.reply} Share</Text>
          </Box>
        </Box>
      </Box>
      
     </>
  )


  }
