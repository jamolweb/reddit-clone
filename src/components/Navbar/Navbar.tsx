import { Flex, Image } from '@chakra-ui/react';
import React from 'react';
import SearchInput from './SearchInput';
import RightContent from './RightContent/RightContent';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/src/firebase/clientApp';
import Directory from './Directory/Directory'
import { useRouter } from 'next/router';
const Navbar:React.FC = () => {
    const [user, loading, error] = useAuthState(auth)
    const router = useRouter()

    return (
        <Flex 
          top={0}
          left={0}
          bg={'white'} 
          height={"44px"} 
          padding={"6px 12px"}
          justifyContent={'space-between'}
          >
            <Flex 
              align={"center"} 
              w={{ base: '70px', md: 'auto'}} 
              mr={{ base: 0, md: 2 }}
              onClick={() => router.push('/')}
              cursor={'pointer'}
            >
                <Image src="/images/redditFace.svg" ml={'6px'} h={'30px'} />
                <Image 
                  src='/images/redditText.svg' 
                  h={'46px'} 
                  display={{base: "none", md: "unset"}} 
                />
            </Flex>
                {user &&  <Directory />}
                <SearchInput user={user} />
                <RightContent user={user} />
        </Flex>
    );
}
export default Navbar; 