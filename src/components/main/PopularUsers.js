import { Box, Text, Flex, Image,  } from '@chakra-ui/react';

const PopularUser = ({ img, name, members })  => {
	return (
		<Flex p={"4px"} mt={name === 'AskMen' ? '30px' : '10px'} gap={"5p"} width={'100%'} height={"60px"} _hover={{bg: 'gray.300'}} borderRadius={'7px'} align={"center"} justifyContent={'space-evenly'}>
                <Image
                    src={img}
                    width={"35px"} 
                    height={"35px"} 
                    borderRadius={"100%"}
                    alt='community img'
                />
                <Box>
                    <Text color={"black"}>{name}</Text>
                    <Text color={"gray.500"}>{members}</Text>
                </Box>
            </Flex>
	)
}

export default PopularUser