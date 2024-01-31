import { Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';


const undefinedPage:React.FC = () => {
    const router = useRouter()

    useEffect(() => {
        router.push("/");
      }, []);   

    return <Heading position={'absolute'} top={'50vh'} right={'40vw'}>page not found</Heading>
}
export default undefinedPage;