import { Box, Text, Flex, Image, Button,  } from '@chakra-ui/react';
import React, { useState } from 'react';
import PopularUser from './PopularUsers';
const RightContent:React.FC = () => {    
    const [scrollY, setScrollY] = useState(0)
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () => {
        setScrollY(window.scrollY);
      });
    }
    return (
        <Box 
            w={'350px'} 
            maxW={"400px"}
            position={scrollY >= 40 ? "sticky" : "static"}
            left={"6%"} 
            top={"-30px"}
            flexDirection="column"
            justifyContent="space-between"
            height="200px"
            display={{ base: "none", xl: "flex" }}
        >
            <Text fontSize={"16px"} color={"gray.500"} mt={"60px"}>Popular communites</Text>
            <PopularUser img={'https://styles.redditmedia.com/t5_2s30g/styles/communityIcon_wpxjh8fuvcw51.png'} name={'r/ AskMen'} members='5,890,427 members,' />
            <PopularUser img={'https://styles.redditmedia.com/t5_2rrlp/styles/communityIcon_06pablpo0le21.png'} name={'r/ PS4'} members='5,590,814 members,' />
            <PopularUser img={'https://styles.redditmedia.com/t5_2qh1f/styles/communityIcon_26udmxwqbrwb1.png'} name={'r/ apple'} members='4,618,488 members,' />
            <PopularUser img={'https://styles.redditmedia.com/t5_2s84e/styles/communityIcon_g8xlzjxvilbb1.jpg?format=pjpg&s=904e57327bdb1e8dad5b23a60fbe9344e48719a6'} name={'r/ NBA2k'} members='531,694 members,' />
            <PopularUser img={'https://styles.redditmedia.com/t5_2xbci/styles/communityIcon_32btum6062v91.png'} name={'r/ xboxone'} members='4,008,711 members,' />
            <Button variant={'ghost'} justifyContent={'start'} mt={'10px'}>see more</Button>
        </Box>
    )
}
export default RightContent;
