"use client";
import { headerInputAtom } from "@/src/atoms/HeaderInout";
import { createPostAtom } from "@/src/atoms/createPost";
import Loader from "@/src/components/main/posts/Loader";
import { db } from "@/src/firebase/clientApp";
import {Box,Button,Flex,Heading,Icon,Image,Tab,TabIndicator,TabList,TabPanel,TabPanels,Tabs, Text} from "@chakra-ui/react";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BiArrowFromTop, BiArrowToTop } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { GoShare } from "react-icons/go";
import { LiaCommentsSolid } from "react-icons/lia";
import { RiFileCopy2Fill } from "react-icons/ri";
import { useRecoilState } from "recoil";
const Posts = () => {
  let router = useRouter();
  let [createPost, setCreatePost] = useRecoilState(createPostAtom);
  let [p, setP] = useState([]);
  const [inputValue] = useRecoilState(headerInputAtom);
  const reference = collection(db, "posts");
  const [copiedModal, setCopiedModal] = useState(false)
  const origin =
      typeof window !== "undefined" && window.location.origin
        ? window.location.origin
        : "";
  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(reference);
      const data = snapshot.docs.map((doc) => doc.data());
      setP(data);
    };

    fetchData();
  }, [createPost.length]);
  // ! single page post
  const putToPost = (id) => {getDocs
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
  }
  const openCopiedModal = () => {
      setTimeout(() => {
        setCopiedModal(false)
      }, 2000);
  }
  const copyToClipboard = async (id) => {
    try {
      await navigator.clipboard.writeText(`${origin}/posts/${id}`);
      setCopiedModal(true)
      await openCopiedModal()
      console.log(router)
    } catch (err) {
      console.error("Unable to copy to clipboard", err);
      setCopiedModal(false)    
    }
  };
  return (
    <Box w={"100%"}>
      <Tabs position="relative" variant="unstyled">
        <TabList>
          <Tab>Public</Tab>
          <Tab>Restricted</Tab>
          <Tab>Provate</Tab>
        </TabList>
        <TabIndicator mt="-1.5px" height="2px" bg="blue.500" borderRadius="1px" />
        <TabPanels>
          <TabPanel>
            {p.length ? p.filter(item => item.title.toLowerCase().includes(inputValue.toLowerCase()) ||item.body.toLowerCase().includes(inputValue.toLowerCase())).map((post) => {
                  if (post.communityType === "public") {
                    return (
                      <Box key={post.id} mt={"5px"}>
                        <Box w={"100%"} p={{ base: "0", lg: "8px" }} borderRadius={"10px"} transition={"all 0.1s"} _hover={{ bg: "gray.100" }} >
                          <Flex justifyContent={"space-between"}>
                            <Flex align={"center"}>
                              <Image w={"20px"} h={"20px"} borderRadius={"100%"} src={post?.userImg} />
                              <Text fontSize={{ base: "12px", sm: "14px", md: "15px", lg: "16px", xl: "17px", }} ml={"4px"} >{post?.userName}</Text>
                              <Text fontSize={{ base: "13px", sm: "14px", md: "15px", lg: "16px", xl: "17px", }} ml={"4px"}>  • {post?.date}</Text>
                            </Flex>
                            <Flex align={"center"} gap={"10px"} display={{ base: "none", sm: "flex" }} >
                              <Button h={"25px"}colorScheme="facebook" bg={"blue.700"}>Join</Button>
                              <Icon as={BsThreeDots} cursor={"pointer"} fontSize={"20px"}/>
                            </Flex>
                          </Flex>
                          <Heading onClick={() => putToPost(post.id)} fontSize={"20px"} >{post.title}</Heading>
                          <Text onClick={() => putToPost(post.id)} fontSize={{ base: "13px", sm: "14px", md: "15px", lg: "16px", xl: "17px", }} >{post.body}</Text>
                          <Image onClick={() => putToPost(post.id)} borderRadius={"10px"} src={post.thumbnail} w={"100%"} h={"400px"}objectFit={"cover"}/>
                          <Flex mt={"7px"}>
                            <Flex p={"4px"} h={"35px"} border={"1px solid gray"} alignItems={"center"} gap={"5px"} borderRadius={"12px"} >
                              <Icon as={BiArrowToTop} _hover={{ bg: "gray.300" }} borderRadius={"100%"} fontSize={{base: "13px",sm: "15px",lg: "17px",xl: "20px",}} onClick={() => increase(post)} />
                              <Text fontSize={{ base: "13px", sm: "14px", md: "15px", lg: "16px", xl: "18px", }} >{post.rating | 0}</Text>
                              <Icon as={BiArrowFromTop} _hover={{ bg: "gray.300" }} borderRadius={"100%"} fontSize={{ base: "13px", sm: "15px", lg: "17px", xl: "20px", }} onClick={() => decrease(post)} />
                            </Flex>
                            <Flex onClick={() => putToPost(post.id)} ml={"16px"} p={"4px"} h={"35px"} border={"1px solid gray"} alignItems={"center"} gap={"10px"} borderRadius={"12px"} >
                              <LiaCommentsSolid fontSize={{ base: "13px", sm: "15px", lg: "17px", xl: "20px", }} />
                              <Text fontSize={{ base: "13px", sm: "14px", md: "15px", lg: "16px", xl: "18px", }} >{post.comments.length}</Text>
                            </Flex>
                            <Flex borderRadius={'5px'} onClick={() => setCopiedModal(false)} display={copiedModal ? 'flex' : 'none'} position={'fixed'} bg={'rgba(0, 153, 51, 10%)'} w={'120px'} align={'center'} justifyContent={'space-evenly'} border={'1px solid green'} top={'50px'} right={'20px'}>
                                <Flex align={'center'} bg={'tranparent'}>
                                  <RiFileCopy2Fill color={'green'}/>
                                  <Text color={'green'}>copied</Text>
                                </Flex>
                              <Text>x</Text>
                            </Flex>
                            <Flex ml={"16px"} p={"4px"} h={"35px"} border={"1px solid gray"} alignItems={"center"} gap={"5px"} borderRadius={"12px"} onClick={() => copyToClipboard(post.id)} cursor={'pointer'} > 
                              <GoShare fontSize={{base: "13px",sm: "15px",lg: "17px",xl: "20px"}}/>
                              <Text fontSize={{base: "13px",sm: "14px",md: "15px",lg: "16px",xl: "18px"}} fontWeight={500}>Share</Text>
                            </Flex>
                          </Flex>
                        </Box>
                        <Box mt={"5px"} w={"100%"} h={"2px"} bg={"gray"} />
                      </Box>
                    );
                  }
                })
                : <Loader />
            }
          </TabPanel>
          <TabPanel>
            {p.length ? p.filter((item) =>item.title.toLowerCase().includes(inputValue.toLowerCase()) ||item.body.toLowerCase().includes(inputValue.toLowerCase())).map((post) => {
                  if (post.communityType === "restricted") {
                    return (
                      <Box key={post.id} mt={"5px"}>
                        <Box w={"100%"} p={{ base: "0", lg: "8px" }} borderRadius={"10px"} transition={"all 0.1s"} _hover={{ bg: "gray.100" }} >
                          <Flex justifyContent={"space-between"}>
                            <Flex align={"center"}>
                              <Image w={"20px"} h={"20px"} borderRadius={"100%"} src={post?.userImg} />
                              <Text fontSize={{ base: "12px", sm: "14px", md: "15px", lg: "16px", xl: "17px", }} ml={"4px"} >{post?.userName}</Text>
                              <Text fontSize={{ base: "13px", sm: "14px", md: "15px", lg: "16px", xl: "17px", }} ml={"4px"}>  • {post?.date}</Text>
                            </Flex>
                            <Flex align={"center"} gap={"10px"} display={{ base: "none", sm: "flex" }} >
                              <Button h={"25px"}colorScheme="facebook" bg={"blue.700"}>Join</Button>
                              <Icon as={BsThreeDots} cursor={"pointer"} fontSize={"20px"}/>
                            </Flex>
                          </Flex>
                          <Heading onClick={() => putToPost(post.id)} fontSize={"20px"} >{post.title}</Heading>
                          <Text onClick={() => putToPost(post.id)} fontSize={{ base: "13px", sm: "14px", md: "15px", lg: "16px", xl: "17px", }} >{post.body}</Text>
                          <Image onClick={() => putToPost(post.id)} borderRadius={"10px"} src={post.thumbnail} w={"100%"} h={"400px"}objectFit={"cover"}/>
                          <Flex mt={"7px"}>
                            <Flex p={"4px"} h={"35px"} border={"1px solid gray"} alignItems={"center"} gap={"5px"} borderRadius={"12px"} >
                              <Icon as={BiArrowToTop} _hover={{ bg: "gray.300" }} borderRadius={"100%"} fontSize={{base: "13px",sm: "15px",lg: "17px",xl: "20px",}} onClick={() => increase(post)} />
                              <Text fontSize={{ base: "13px", sm: "14px", md: "15px", lg: "16px", xl: "18px", }} >{post.rating | 0}</Text>
                              <Icon as={BiArrowFromTop} _hover={{ bg: "gray.300" }} borderRadius={"100%"} fontSize={{ base: "13px", sm: "15px", lg: "17px", xl: "20px", }} onClick={() => decrease(post)} />
                            </Flex>
                            <Flex onClick={() => putToPost(post.id)} ml={"16px"} p={"4px"} h={"35px"} border={"1px solid gray"} alignItems={"center"} gap={"10px"} borderRadius={"12px"} >
                              <LiaCommentsSolid fontSize={{ base: "13px", sm: "15px", lg: "17px", xl: "20px", }} />
                              <Text fontSize={{ base: "13px", sm: "14px", md: "15px", lg: "16px", xl: "18px", }} >{post.comments.length}</Text>
                            </Flex>
                            <Flex borderRadius={'5px'} onClick={() => setCopiedModal(false)} display={copiedModal ? 'flex' : 'none'} position={'fixed'} bg={'rgba(0, 153, 51, 10%)'} w={'120px'} align={'center'} justifyContent={'space-evenly'} border={'1px solid green'} top={'50px'} right={'20px'}>
                                <Flex align={'center'} bg={'tranparent'}>
                                  <RiFileCopy2Fill color={'green'}/>
                                  <Text color={'green'}>copied</Text>
                                </Flex>
                              <Text>x</Text>
                            </Flex>
                            <Flex ml={"16px"} p={"4px"} h={"35px"} border={"1px solid gray"} alignItems={"center"} gap={"5px"} borderRadius={"12px"} onClick={() => copyToClipboard(post.id)} cursor={'pointer'} > 
                              <GoShare fontSize={{base: "13px",sm: "15px",lg: "17px",xl: "20px"}}/>
                              <Text fontSize={{base: "13px",sm: "14px",md: "15px",lg: "16px",xl: "18px"}} fontWeight={500}>Share</Text>
                            </Flex>
                          </Flex>
                        </Box>
                        <Box mt={"5px"} w={"100%"} h={"2px"} bg={"gray"} />
                      </Box>
                    );
                  }
                })
                : <Loader />
            }
          </TabPanel>
          <TabPanel>
            {p.length ? p.filter((item) =>item.title.toLowerCase().includes(inputValue.toLowerCase()) ||item.body.toLowerCase().includes(inputValue.toLowerCase())).map((post) => {
                  if (post.communityType === "private") {
                    return (
                      <Box key={post.id} mt={"5px"}>
                        <Box w={"100%"} p={{ base: "0", lg: "8px" }} borderRadius={"10px"} transition={"all 0.1s"} _hover={{ bg: "gray.100" }} >
                          <Flex justifyContent={"space-between"}>
                            <Flex align={"center"}>
                              <Image w={"20px"} h={"20px"} borderRadius={"100%"} src={post?.userImg} />
                              <Text fontSize={{ base: "12px", sm: "14px", md: "15px", lg: "16px", xl: "17px", }} ml={"4px"} >{post?.userName}</Text>
                              <Text fontSize={{ base: "13px", sm: "14px", md: "15px", lg: "16px", xl: "17px", }} ml={"4px"}>  • {post?.date}</Text>
                            </Flex>
                            <Flex align={"center"} gap={"10px"} display={{ base: "none", sm: "flex" }} >
                              <Button h={"25px"}colorScheme="facebook" bg={"blue.700"}>Join</Button>
                              <Icon as={BsThreeDots} cursor={"pointer"} fontSize={"20px"}/>
                            </Flex>
                          </Flex>
                          <Heading onClick={() => putToPost(post.id)} fontSize={"20px"} >{post.title}</Heading>
                          <Text onClick={() => putToPost(post.id)} fontSize={{ base: "13px", sm: "14px", md: "15px", lg: "16px", xl: "17px", }} >{post.body}</Text>
                          <Image onClick={() => putToPost(post.id)} borderRadius={"10px"} src={post.thumbnail} w={"100%"} h={"400px"}objectFit={"cover"}/>
                          <Flex mt={"7px"}>
                            <Flex p={"4px"} h={"35px"} border={"1px solid gray"} alignItems={"center"} gap={"5px"} borderRadius={"12px"} >
                              <Icon as={BiArrowToTop} _hover={{ bg: "gray.300" }} borderRadius={"100%"} fontSize={{base: "13px",sm: "15px",lg: "17px",xl: "20px",}} onClick={() => increase(post)} />
                              <Text fontSize={{ base: "13px", sm: "14px", md: "15px", lg: "16px", xl: "18px", }} >{post.rating | 0}</Text>
                              <Icon as={BiArrowFromTop} _hover={{ bg: "gray.300" }} borderRadius={"100%"} fontSize={{ base: "13px", sm: "15px", lg: "17px", xl: "20px", }} onClick={() => decrease(post)} />
                            </Flex>
                            <Flex onClick={() => putToPost(post.id)} ml={"16px"} p={"4px"} h={"35px"} border={"1px solid gray"} alignItems={"center"} gap={"10px"} borderRadius={"12px"} >
                              <LiaCommentsSolid fontSize={{ base: "13px", sm: "15px", lg: "17px", xl: "20px", }} />
                              <Text fontSize={{ base: "13px", sm: "14px", md: "15px", lg: "16px", xl: "18px", }} >{post.comments.length}</Text>
                            </Flex>
                            <Flex borderRadius={'5px'} onClick={() => setCopiedModal(false)} display={copiedModal ? 'flex' : 'none'} position={'fixed'} bg={'rgba(0, 153, 51, 10%)'} w={'120px'} align={'center'} justifyContent={'space-evenly'} border={'1px solid green'} top={'50px'} right={'20px'}>
                                <Flex align={'center'} bg={'tranparent'}>
                                  <RiFileCopy2Fill color={'green'}/>
                                  <Text color={'green'}>copied</Text>
                                </Flex>
                              <Text>x</Text>
                            </Flex>
                            <Flex ml={"16px"} p={"4px"} h={"35px"} border={"1px solid gray"} alignItems={"center"} gap={"5px"} borderRadius={"12px"} onClick={() => copyToClipboard(post.id)} cursor={'pointer'} > 
                              <GoShare fontSize={{base: "13px",sm: "15px",lg: "17px",xl: "20px"}}/>
                              <Text fontSize={{base: "13px",sm: "14px",md: "15px",lg: "16px",xl: "18px"}} fontWeight={500}>Share</Text>
                            </Flex>
                          </Flex>
                        </Box>
                        <Box mt={"5px"} w={"100%"} h={"2px"} bg={"gray"} />
                      </Box>
                    );
                  }
                }) : <Loader />
            }
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};
export default Posts;