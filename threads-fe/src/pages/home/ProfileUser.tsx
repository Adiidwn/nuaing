import ProfileUser from "@/components/ProfileUser";
import ProfileCards from "@/features/thread/components/ProfileCards";
import Sidebars from "@/features/thread/components/Sidebars";
import CardList from "@/features/thread/components/SuggestProfile";
import { Footer } from "@/features/thread/components/footer";
import { Box, Grid, GridItem } from "@chakra-ui/react";

function PUser() {
  return (
    <>
      <Grid templateColumns="repeat(12, 1fr)" gap={4}>
        <GridItem colSpan={2} h="10">
          <Box>
            <Sidebars />
          </Box>
        </GridItem>

        <GridItem colSpan={7} h="10">
          <Box>
            <br></br>
            <ProfileUser />
          </Box>
        </GridItem>

        <GridItem colSpan={3} h="10">
          <Box>
            <ProfileCards />
            <CardList />
            <Footer />
          </Box>
        </GridItem>
      </Grid>
    </>
  );
}

export default PUser;
