"use client";
import { createPostAtom } from "@/src/atoms/createPost";
import { db } from "@/src/firebase/clientApp";
import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    Icon,
    Image,
    Text,
} from "@chakra-ui/react";
import {
    collection,
    doc,
    getDocs,
    updateDoc
} from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BiArrowFromTop, BiArrowToTop } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { GoShare } from "react-icons/go";
import { LiaCommentsSolid } from "react-icons/lia";
import { RiFileCopy2Fill } from "react-icons/ri";
import { useRecoilState } from "recoil";
import Loader from "../posts/Loader";

const SortText = () => {
  let reference = collection(db, "posts");
  let [createPost, setCreatePost] = useRecoilState(createPostAtom);
  const [copiedModal, setCopiedModal] = useState(false);
  const { asPath } = useRouter();

  const router = useRouter();
  let sortText = "";
  const [posts, setPosts] = useState([]);

  if (router.query.sorttext !== undefined) {
    sortText = router.query.sorttext.toLowerCase();
  }

  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(reference);
      const data = snapshot.docs.map((doc) => doc.data());
      setPosts(data);
    };

    fetchData();
  }, []);

  let sortedPosts = [];

  const putToPost = (id) => {
    router.push(`/posts/${id}`);
  };

  const increase = (post) => {
    const docRef = doc(db, "posts", post.id);
    let newPost = post;
    newPost.rating = post.rating + 1;

    updateDoc(docRef, newPost).then(() => {
      setCreatePost([...createPost, 0]);
    });
  };
  const decrease = (post) => {
    if (post.rating > 0) {
      const docRef = doc(db, "posts", post.id);
      let newPost = post;
      newPost.rating = post.rating - 1;

      updateDoc(docRef, newPost).then(() => {
        setCreatePost([...createPost, 0]);
      });
    }
  };

  const openCopiedModal = () => {
    setTimeout(() => {
      setCopiedModal(false);
    }, 2000);
  };

  const copyToClipboard = async (id) => {
    try {
      await navigator.clipboard.writeText(
        `${origin}/posts/${id}`
      );
      setCopiedModal(true);
      await openCopiedModal();
    } catch (err) {
      console.error("Unable to copy to clipboard", err);
      setCopiedModal(false);
    }
  };

  return (
    <>
      <Box w={"100%"} maxW={"container.xl"} m={"0 auto"}>
        {posts
          .filter(
            (item) =>
              item.title.toLowerCase().includes(sortText.toLowerCase()) ||
              item.body.toLowerCase().includes(sortText.toLowerCase())
          )
          .map((post) => {
            sortedPosts.push(post);
          })}
        {sortedPosts.length ? (
          sortedPosts.map((post) => {
            return (
              <Container maxWidth={"container.xl"} mt={"30px"}>
                <Box
                  w={"100%"}
                  p={"20px"}
                  borderRadius={"10px"}
                  transition={"all 0.1s"}
                  bg="gray.300"
                >
                  <Flex justifyContent={"space-between"}>
                    <Flex align={"center"}>
                      <Image
                        w={"20px"}
                        h={"20px"}
                        borderRadius={"100%"}
                        src={post?.userImg}
                        onClick={() => putToPost(post.id)}
                      />
                      <Text
                        fontSize={{
                          base: "12px",
                          sm: "14px",
                          md: "15px",
                          lg: "16px",
                          xl: "17px",
                        }}
                        ml={"4px"}
                        onClick={() => putToPost(post.id)}
                      >
                        {post?.userName}
                      </Text>
                      <Text
                        fontSize={{
                          base: "13px",
                          sm: "14px",
                          md: "15px",
                          lg: "16px",
                          xl: "17px",
                        }}
                        ml={"4px"}
                        onClick={() => putToPost(post.id)}
                      >
                        • {post?.date}
                      </Text>
                    </Flex>
                    <Flex
                      align={"center"}
                      gap={"10px"}
                      display={{ base: "none", sm: "flex" }}
                    >
                      <Button h={"25px"} colorScheme="facebook" bg={"blue.700"}>
                        Join
                      </Button>
                      <Icon
                        as={BsThreeDots}
                        cursor={"pointer"}
                        fontSize={"20px"}
                      />
                    </Flex>
                  </Flex>
                  <Heading fontSize={"20px"} onClick={() => putToPost(post.id)}>
                    {post.title}
                  </Heading>
                  <Text
                    fontSize={{
                      base: "13px",
                      sm: "14px",
                      md: "15px",
                      lg: "16px",
                      xl: "17px",
                    }}
                    onClick={() => putToPost(post.id)}
                  >
                    {post.body}
                  </Text>
                  <Image
                    borderRadius={"10px"}
                    src={post.thumbnail}
                    w={"100%"}
                    h={"400px"}
                    objectFit={"cover"}
                    onClick={() => putToPost(post.id)}
                  />
                  <Flex mt={"7px"}>
                    <Flex
                      p={"4px"}
                      h={"35px"}
                      border={"1px solid gray"}
                      alignItems={"center"}
                      gap={"5px"}
                      borderRadius={"12px"}
                    >
                      <Icon
                        as={BiArrowToTop}
                        _hover={{ bg: "gray.300" }}
                        borderRadius={"100%"}
                        fontSize={{
                          base: "13px",
                          sm: "15px",
                          lg: "17px",
                          xl: "20px",
                        }}
                        onClick={() => increase(post)}
                      />
                      <Text
                        fontSize={{
                          base: "13px",
                          sm: "14px",
                          md: "15px",
                          lg: "16px",
                          xl: "18px",
                        }}
                      >
                        {post.rating | 0}
                      </Text>
                      <Icon
                        as={BiArrowFromTop}
                        _hover={{ bg: "gray.300" }}
                        borderRadius={"100%"}
                        fontSize={{
                          base: "13px",
                          sm: "15px",
                          lg: "17px",
                          xl: "20px",
                        }}
                        onClick={() => decrease(post)}
                      />
                    </Flex>
                    <Flex
                      ml={"16px"}
                      p={"4px"}
                      h={"35px"}
                      border={"1px solid gray"}
                      alignItems={"center"}
                      gap={"10px"}
                      borderRadius={"12px"}
                    >
                      <LiaCommentsSolid
                        fontSize={{
                          base: "13px",
                          sm: "15px",
                          lg: "17px",
                          xl: "20px",
                        }}
                      />
                      <Text
                        fontSize={{
                          base: "13px",
                          sm: "14px",
                          md: "15px",
                          lg: "16px",
                          xl: "18px",
                        }}
                      >
                        {post.comments.length}
                      </Text>
                    </Flex>
                    <Flex
                      borderRadius={"5px"}
                      onClick={() => setCopiedModal(false)}
                      display={copiedModal ? "flex" : "none"}
                      position={"fixed"}
                      bg={"rgba(0, 153, 51, 10%)"}
                      w={"120px"}
                      align={"center"}
                      justifyContent={"space-evenly"}
                      border={"1px solid green"}
                      top={"50px"}
                      right={"20px"}
                    >
                      <Flex align={"center"} bg={"tranparent"}>
                        <RiFileCopy2Fill color={"green"} />
                        <Text color={"green"}>copied</Text>
                      </Flex>
                      <Text>x</Text>
                    </Flex>

                    <Flex
                      ml={"16px"}
                      p={"4px"}
                      h={"35px"}
                      border={"1px solid gray"}
                      alignItems={"center"}
                      gap={"5px"}
                      borderRadius={"12px"}
                      onClick={() => copyToClipboard(post.id)}
                      cursor={'pointer'}
                    >
                      <GoShare
                        fontSize={{
                          base: "13px",
                          sm: "15px",
                          lg: "17px",
                          xl: "20px",
                        }}
                      />
                      <Text
                        fontSize={{
                          base: "13px",
                          sm: "14px",
                          md: "15px",
                          lg: "16px",
                          xl: "18px",
                        }}
                        fontWeight={500}
                      >
                        Share
                      </Text>
                    </Flex>
                  </Flex>
                </Box>
              </Container>
            );
          })
        ):<></>}
        {!sortedPosts.length && (
            <Loader />
        )}
      </Box>
    </>
  );
};
export default SortText;
