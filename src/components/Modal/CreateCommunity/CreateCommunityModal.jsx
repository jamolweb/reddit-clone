import { createPostAtom } from '@/src/atoms/createPost';
import { auth, db, storage, } from '@/src/firebase/clientApp';
import { Box, Button, Checkbox, Flex, Icon, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text } from '@chakra-ui/react';
import { doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BsFillEyeFill, BsFillPersonFill } from "react-icons/bs";
import { FaCloudUploadAlt } from 'react-icons/fa';
import { HiLockClosed } from "react-icons/hi";
import { useRecoilState } from 'recoil';
import { v4 } from "uuid";

const CreateCommunityModal = ({ open, handleClose }) => {
    const [user] = useAuthState(auth)
    const [communityType, setCommunityType] = useState('public')
    const [postV, setPostV] = useState({title: '', body: '', thumbnail: '', forWho: ''})
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState(null)
    const [error, setError] = useState('')
    useEffect(() => {
        setIsModalOpen(open)
    }, [open])
    const [createPost, setCreatePost] = useRecoilState(createPostAtom)
    // handle inputs value
    const handleChange = (event) => {
        setPostV((prev)=>({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }
    // set community type
    const onCommunityTypeChange = (event) => {
        setCommunityType(event.target.name)
    }
    const types = ['image/png', 'image/jpeg'];
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file && types.includes(file.type)) {
        const reader = new FileReader();
        reader.onload = (e) => {
            setImage(e.target.result);
            setPostV((prev) => ({
                ...prev,
                thumbnail: file
            }));
            setError('')
        };
        reader.readAsDataURL(file);
        } else {
            setImage(null);
            setPostV((prev) => ({
            ...prev,
            thumbnail: null
            }));
            setError('Please select a valid image type (jpg or png)');
        }
    };
    const handleCreateCommunity = async () => {
        if (postV.title.length !== 0 && postV.body.length && postV.thumbnail !== null && postV.forWho.length !== 0)  {
            setLoading(true)
            let imageRef = ref(storage, `post-images/${postV.thumbnail.name + v4()}`);
            await uploadBytes(imageRef, postV.thumbnail);
            const url = await getDownloadURL(imageRef)
                const dateNow = String(new Date()).slice(3, 15)
                const newPost = {
                    id: v4(),
                    title: postV.title,
                    body: postV.body,
                    thumbnail: url,
                    forWho: postV.forWho,
                    communityType,
                    userImg: user?.photoURL,
                    comments: [],
                    userName: user?.displayName,
                    date: dateNow,
                    rating: 0
                }; 
                try {
                    await setDoc(doc(db, "posts", newPost.id ), newPost).then(() => {
                       setPostV({title: '', body: '', thumbnail: '', forWho: '',rating: 0})
                       setImage(null)
                       setLoading(false)
                       setCommunityType('public')
                       setCreatePost((prev) => ([...prev, 0]))
                      }).catch(err => setError(String(err.message)));
                } catch (error) {
                    alert("Error posts is not added")
                }                
        } else {
            setError('fill all inputs')
        }
    };
    

    return (
       <>
           <Modal isOpen={isModalOpen} onClose={handleClose} size={'lg'}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader 
                    display={'flex'} 
                    flexDirection={'column'} 
                    fontSize={15} 
                    padding={3}
                >
                    Create a post
                </ModalHeader>
                <Box>
                    <ModalCloseButton />
                    <ModalBody 
                        display={'flex'}
                        flexDirection={'column'} 
                        padding={'10px 14px'}
                        
                    >
                        <Text fontWeight={600} fontSize={15}>Name</Text>
                        <Text fontSize={11} color={'gray.400'}>
                            Post name including capitalization cannot be changed
                        </Text>
                        <Text position={'relative'} top={'28px'} left="10px" width={'20px'}>r/</Text>
                        <Input
                            name='title'
                            value={postV.title}
                            onChange={handleChange}
                            position={'relative'}
                            size={'sm'} 
                            pl={'22px'} 
                            placeholder=' post title'
                        />
                        <Input
                            name='body'
                            position={'relative'}
                            value={postV.body} 
                            size={'sm'}
                            mt={'10px'}
                            placeholder='Write your post body'
                            onChange={handleChange}
                        />
                        <label style={{width:'100%', marginTop: '10px'}} htmlFor="thumbnail">
                            <Flex align={'center'} gap={'5px'} w={'100%'} h={'100%'} bg={'gray.100'} _hover={{bg:'gray.300'}} borderRadius={'7px'}>
                                <Icon as={FaCloudUploadAlt} ml={'10px'} />
                                Choose thumbnail
                            </Flex>
                        </label>
                        
                        {image && (
                        <div>
                        <h2>Selected Image:</h2>
                        <img src={image} alt="Selected" style={{ maxWidth: '100px' }} />
                        </div>
                        )}

                        <Input accept="image/*" required type="file" onChange={handleImageChange} id="thumbnail" display={'none'} />
                        <Input
                            name='forWho'
                            position={'relative'}
                            value={postV.forWho} 
                            size={'sm'} 
                            placeholder='For who its post?'
                            mt={'10px'}
                            onChange={handleChange} 
                        />
                        <Text color={'red'}>{error}</Text>
                        <Box mb={4} mt={4}>
                            <Text fontWeight={600} fontSize={15}>
                                Post Type
                            </Text>
                            <Stack spacing={2}>
                                <Checkbox 
                                name='public'
                                isChecked={communityType === 'public'}
                                onChange={onCommunityTypeChange}
                                >
                                    <Flex alignItems={'center'}>
                                        <Icon as={BsFillPersonFill} color={'gray.500'} mr={2} />
                                        <Text fontSize={'10pt'} mr={1}>
                                            Public
                                        </Text>
                                        <Text fontSize={'8pt'} color={'gray.500'} pt={1}>
                                        Anyone can view, post, and comment to this posts
                                        </Text>
                                    </Flex>
                                </Checkbox>
                                <Checkbox 
                                name='restricted'
                                isChecked={communityType === 'restricted'}
                                onChange={onCommunityTypeChange}
                                >
                                    <Flex alignItems={'center'}>
                                        <Icon as={BsFillEyeFill} color={'gray.500'} mr={2} />
                                        <Text fontSize={'10pt'} mr={1}>
                                            Restricted
                                        </Text>
                                        <Text fontSize={'8pt'} color={'gray.500'} pt={1}>
                                        Anyone can view this community, but only approved users can
                                        </Text>
                                    </Flex>
                                </Checkbox>
                                <Checkbox 
                                name='private'
                                isChecked={communityType === 'private'}
                                onChange={onCommunityTypeChange}
                                >
                                    <Flex alignItems={'center'}>
                                        <Icon as={HiLockClosed} color={'gray.500'} mr={2} />
                                        <Text fontSize={'10pt'} mr={1}>
                                        Private 
                                        </Text>
                                        <Text fontSize={'8pt'} color={'gray.500'} pt={1}>
                                        Only approved users can view and submit to this community
                                        </Text>
                                    </Flex>
                                </Checkbox>
                            </Stack>
                        </Box>
                    </ModalBody>
                </Box>

                <ModalFooter bg={'gray.100'} borderRadius={'0 0 10px 10px'}>
                    <Button variant={'outline'} h={'30px'} colorScheme='blue' mr={3} onClick={handleClose}>
                        Cencel
                    </Button>
                    <Button h={'30px'} onClick={handleCreateCommunity} isLoading={loading}>Create Post</Button>
                </ModalFooter>
                </ModalContent>
           </Modal>
       </>
    )
}

export default CreateCommunityModal;
