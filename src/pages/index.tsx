import { Container } from "@chakra-ui/react";
import LeftContent from "../components/main/left/index";
import Posts from "../components/main/posts/posts";
import RightContent from "../components/main/RightContent";

export default function Home() {
  return (
    <Container
          padding={"6px 12px"}
          justifyContent={'space-between'}
          maxW={'1342px'}
          display={'flex'}
          gap={'10px'}
    >
          <LeftContent />
          <Posts />
          <RightContent />
    </Container>
  )
}