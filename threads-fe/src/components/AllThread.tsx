import { ThreadCard } from "@/features/thread";
import { threadCard } from "@/hooks/details/threadCard";
import { Box, Button, Icon, Input } from "@chakra-ui/react";
import { TiAttachmentOutline } from "react-icons/ti";

const Threads = () => {
  const { handleChange, handlePost, threads } = threadCard();
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
          padding={"20px"}>
          <Box
            className="Post"
            display={"flex"}
            flexDirection={"column"}
            h={"120px"}
            w={"70%"}
            ml={"20px"}>
            <form>
              <Input
                type="text"
                placeholder="What's on your mind?"
                onChange={handleChange}
                name="content"
              />
              <Box>
                <label htmlFor="img">
                  <Icon
                    float={"right"}
                    fontSize={"30px"}
                    as={TiAttachmentOutline}
                    cursor="pointer"></Icon>
                </label>
                <Input
                  onChange={handleChange}
                  name="file"
                  type="file"
                  id="img"
                  hidden
                />
              </Box>
              <Box>
                <Button type="submit" onClick={handlePost}>
                  Post
                </Button>
              </Box>
            </form>
          </Box>
          {threads?.map((item) => {
            return (
              <ThreadCard
                key={item.id}
                id={item.id}
                user={item?.user}
                content={item.content}
                // likes={item.likes}
                postedAt={item.postedAt}
                // replies_count={item.replies_count}
                image={item.image}
                // isLiked={item.isLiked}
              />
            );
          })}
        </Box>
      </Box>
    </>
  );
};

export default Threads;
