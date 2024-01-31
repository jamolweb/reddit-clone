import { headerInputAtom } from '@/src/atoms/HeaderInout';
import { Search2Icon } from '@chakra-ui/icons';
import { Flex, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import React from 'react';
import { useRecoilState } from 'recoil';


const SearchInput = ({ user }) => {
    const [inputValue, setInputValue] = useRecoilState(headerInputAtom)

    return (
        <Flex flexGrow={1} mr={2} maxW={'auto'} display={user ? 'flex' : 'none'}>
             <InputGroup>
                <InputLeftElement pointerEvents='none'>
                  <Search2Icon color='gray.400' mb={1} />
                </InputLeftElement>
                <Input 
                    placeholder='Search Reddit' 
                    fontSize={'10pt'} 
                    _placeholder={{ color: "gray.500" }} 
                    _hover={{
                        bg: "white",
                        border: "1px solid blue.500"
                    }}
                    _focus={{
                        outline: "none",
                        border: "1px solid blue.500"
                    }}
                    height="34px"
                    bg="gray.100"
                    onChange={(e) => setInputValue(e.target.value)}
                />
             </InputGroup>
        </Flex>
    )
}
export default SearchInput;