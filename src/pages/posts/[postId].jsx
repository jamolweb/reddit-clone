import { createPostAtom } from "@/src/atoms/createPost";
import { auth, db } from "@/src/firebase/clientApp";
import {
  Box,
  Button,
  Container,
  Flex,
  Image,
  Input,
  Text
} from "@chakra-ui/react";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import { v4 } from "uuid";
import PostValues from "../../components/main/singlePostValue/PostValues";
import Loader from "./Loader";

const SinglePost = () => {
  const router = useRouter();
  const postId = router.query.postId;
  const [user] = useAuthState(auth);
  const [inputV, setInputV] = useState("");
  const [error, setError] = useState("");
  const [posts, setPosts] = useState([]);
  const [createPost, setCreatePost] = useRecoilState(createPostAtom);
  let reference = collection(db, "posts");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(reference);
      const data = snapshot.docs.map((doc) => doc.data());
      setPosts(data);
    }
    fetchData();
  }, [createPost.length])
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";
  const addComment = async (post) => {
    if (inputV.length !== 0) {
      setError("");
      setLoading(true);
      const dateNow = String(new Date()).slice(3, 15);
      const newComment = {
        id: v4(),
        postId: post.id,
        body: inputV,
        userImg: user?.photoURL,
        userName: user?.displayName,
        date: dateNow,
      };
      const docRef = doc(db, "posts", post.id);
      let newPost = post;
      newPost.comments = [...post.comments, newComment];
      updateDoc(docRef, newPost)
        .then(() => {
          setCreatePost([...createPost, 0]);
          setInputV("");
          setLoading(false);
        })
        .catch((error) => alert(`comment not added. eror: ${error}`));
    } else {
      setError("write something in input!");
    }
  };
  const handleKeyDown = (post, e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addComment(post);
    }
  };

  return posts.length ? (
    posts.map((post) => {
      if (post.id === postId) {
        return (
          <Container maxWidth={"container.xl"} mt={"30px"}>
            <PostValues post={post} />
            <Box bg="gray.300" mt={"10px"} h={"auto"}>
              <Text color={"gray"} px={"30px"} pt={"10px"}>Comments</Text>
              <Box p={"30px"}>
                <Input value={inputV} h={"70px"} bg={"white"} onChange={(e) => setInputV(e.target.value)} borderBottomRadius={"0px"} w={"100%"} onKeyDown={(e) => handleKeyDown(post, e)} />
                <Flex w={"100%"} borderBottomRadius={"10px"} justifyContent={"space-between"} bg={"#BEBEBE"} h={"40px"} >
                  <Text color={"red"} fontWeight={900}> {error} </Text>
                  <Button mt={"5px"} h={"80%"} onClick={() => addComment(post)} isLoading={loading} >
                    add comment
                  </Button>
                </Flex>
              </Box>
              <Box p={"30px"}>
                {post.comments?.map((comment) => {
                  return (
                    <Box p={"5px"}>
                      <Flex gap={"10px"} align={"start"}>
                        <Image borderRadius={"100%"} src={comment.userImg} w={"30px"} h={"30px"} />
                        <Text>{comment.userName}</Text>
                        <Text>{comment.date}</Text>
                      </Flex>
                      <Text bg={"#BEBEBE"} borderLeft={"2px solid black"} ml={"13px"} p={"30px"} > {comment.body} </Text>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Container>
        );
      }
    })
  ) : (
    <Loader />
  );
};

export default SinglePost;