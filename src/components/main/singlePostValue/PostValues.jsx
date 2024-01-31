import { createPostAtom } from "@/src/atoms/createPost";
import { db } from "@/src/firebase/clientApp";
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { doc, updateDoc } from "firebase/firestore";
import { BiArrowFromTop, BiArrowToTop } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { GoShare } from "react-icons/go";
import { LiaCommentsSolid } from "react-icons/lia";
import { RxClipboardCopy } from "react-icons/rx";
import { useRecoilState } from "recoil";

export default function PostValues({ post }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";
  const [createPost, setCreatePost] = useRecoilState(createPostAtom);
  const fontResponsive = {
    base: "13px",
    sm: "15px",
    lg: "17px",
    xl: "20px",
  }

  const increase = (post) => {
    const docRef = doc(db, "posts", post.id);
    let newPost = post;
    newPost.rating = post.rating + 1;
    updateDoc(docRef, newPost).then(() => {
      setCreatePost([...createPost, 0]);
    });
  };
  const dincrease = (post) => {
    if (post.rating > 0) {
      const docRef = doc(db, "posts", post.id);
      let newPost = post;
      newPost.rating = post.rating - 1;
      updateDoc(docRef, newPost).then(() => {
        setCreatePost([...createPost, 0]);
      });
    }
  };
  const copyToClipboard = async (id) => {
    try {
      await navigator.clipboard.writeText(`${origin}/posts/${id}`);
      onClose();
    } catch (err) {
      console.error("Unable to copy to clipboard", err);
    }
  };
  return (
    <div>
      <Box w={"100%"} p={"20px"} borderRadius={"10px"} transition={"all 0.1s"} bg="gray.300">
        <Flex justifyContent={"space-between"}>
          <Flex align={"center"}>
            <Image  w={"20px"}  h={"20px"} borderRadius={"100%"} src={post?.userImg}/>
            <Text fontSize={{base: "12px",sm: "14px",md: "15px",lg: "16px",xl: "17px",}} ml={"4px"}>{post?.userName}</Text>
            <Text fontSize={{base: "13px",sm: "14px",md: "15px",lg: "16px",xl: "17px",}} ml={"4px"} >• {post?.date}</Text>
          </Flex>
          <Flex align={"center"} gap={"10px"}  display={{ base: "none", sm: "flex" }} >
            <Button h={"25px"} colorScheme="facebook" bg={"blue.700"}> Join </Button>
            <Icon as={BsThreeDots} cursor={"pointer"} fontSize={"20px"} />
          </Flex>
        </Flex>
        <Heading fontSize={"20px"}>{post.title}</Heading>
         <Text fontSize={{base: "13px",sm: "14px",md: "15px",lg: "16px",xl: "17px"}}>{post.body}</Text>
        <Image borderRadius={"10px"} src={post.thumbnail} w={"100%"} h={"400px"} objectFit={"cover"}/>
        <Flex mt={"7px"}>
          <Flex p={"4px"} h={"35px"} border={"1px solid gray"} alignItems={"center"} gap={"5px"} borderRadius={"12px"} >
            <Icon as={BiArrowToTop} _hover={{ bg: "gray.300" }}borderRadius={"100%"}fontSize={fontResponsive} onClick={() => increase(post)}/>
            <Text fontSize={{base: "13px",sm: "14px",md: "15px",lg: "16px",xl: "18px"}}>{post.rating | 0}</Text>
            <Icon as={BiArrowFromTop} _hover={{ bg: "gray.300" }} borderRadius={"100%"} fontSize={fontResponsive} onClick={() => dincrease(post)} />
          </Flex>
          <Flex ml={"16px"} p={"4px"} h={"35px"} border={"1px solid gray"} alignItems={"center"} gap={"10px"} borderRadius={"12px"} >
            <LiaCommentsSolid
              fontSize={fontResponsive} />
            <Text fontSize={{ base: "13px", sm: "14px", md: "15px", lg: "16px", xl: "18px", }} >{post.comments.length}</Text>
          </Flex>
          <Flex ml={"16px"} p={"4px"} h={"35px"} border={"1px solid gray"} alignItems={"center"} gap={"5px"} borderRadius={"12px"} onClick={onOpen} >
            <GoShare fontSize={fontResponsive} />
            <Text fontSize={{ base: "13px", sm: "14px", md: "15px", lg: "16px", xl: "18px", }} fontWeight={500} > Share </Text>
          </Flex>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalBody>
                <Input bg={"dark"} border={"1px solid gray"} readOnly defaultValue={`${origin}/posts/${post.id}`} ></Input>
                <Flex cursor={"pointer"} w={"auto"} alignItems={"center"} gap={"10px"} onClick={() => copyToClipboard(post.id)} >
                  <RxClipboardCopy />
                  <Text>copy</Text>
                </Flex>
              </ModalBody>
            </ModalContent>
          </Modal>
        </Flex>
      </Box>
    </div>
  );
}