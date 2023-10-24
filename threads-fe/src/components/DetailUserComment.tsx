import { ThreadCard } from "@/features/thread";
import { Box, Button, FormControl, Image, Input, Text } from "@chakra-ui/react";
import { useThread } from '@/hooks/details/thread';


function DetailComment (){
  const { thread, handlePost, handleChange, replies } = useThread();

  return (
    <>
      <Box display={"flex"} justifyContent={"center"}>
        <Box
          display={"flex"}
          alignItems={"center"}
          flexDirection={"column"}
          width="600px"
          borderRight={"1px solid"}
          borderLeft={"1px solid"}
          borderColor={"brand.grey"}
          padding={"20px"}
        >
          <ThreadCard
            id={thread?.id}
            user={thread?.user}
            content={thread?.content}
            postedAt={thread?.postedAt}
            image={thread?.image}
            likes={thread?.likes}
            reply={thread?.reply}
            isLiked={thread?.isLiked}
          />
          <Box marginTop={"20px"}>
            <form onSubmit={handlePost} >
              <FormControl display={"flex"} flexDirection={"column"} gap={2}>
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  gap={2}
                >
                  <Input
                    placeholder="What is happening?!"
                    name="content"
                    onChange={handleChange}
                  />
                  <Button
                    type="submit"
                    backgroundColor={"brand.green"}
                    color={"white"}
                    colorScheme="green"
                    fontSize={"12px"}
                    width={"70px"}
                  >Post</Button>
                </Box>
              </FormControl>
            </form>
          </Box>
          <Box>
            {replies?.map((reply) => {
              return (
                <Box
                  key={reply.id}
                  display={"flex"}
                  alignItems={"flex-start"}
                  width={"600px"}
                  padding={"20px"}
                  
                >
                  <Image
                    src={
                      reply.user?.picture
                        ? reply.user?.picture
                        : "/user-placeholder.png"
                    }
                    width={"50px"}
                    height={"50px"}
                    objectFit={"cover"}
                    borderRadius={"50%"}
                    marginRight={"20px"}
                    alt="user_profile_image"
                  />
                  <Box width={"80%"}>
                  <Text color={"grey"} marginRight={"7px"}>@{reply.user?.username}</Text>
                  <Text width={"100%"}>{reply.content} </Text>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default DetailComment