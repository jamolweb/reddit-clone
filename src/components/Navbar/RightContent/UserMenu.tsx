import { ChevronDownIcon } from '@chakra-ui/icons';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Icon,
    Flex,
    MenuDivider,
    Text,
    Image,
  } from '@chakra-ui/react';
import { User, signOut } from 'firebase/auth';
import { VscAccount } from 'react-icons/vsc';
import { IoSparkles } from 'react-icons/io5';
import { CgProfile } from 'react-icons/cg';
import { MdOutlineLogin } from 'react-icons/md';
import { auth } from '@/src/firebase/clientApp';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '@/src/atoms/authModalAtom';

type UserMenuProps = {
    user?: User  | null;
};

const UserMenu:React.FC<UserMenuProps> = ({user}) => {
    return (
        <Menu>
          <MenuButton 
            cursor={'pointer'}
            padding={'0px 6px'} 
            borderRadius={4} 
           _hover={{ outline: '1px solid gray.200'}}
          >
            <Flex alignItems={'center'}>
            <Flex alignItems={'center'}>
                {user ? (
                            <>
                              <Image w={'30px'} borderRadius={'100%'} h={'30px'} src={`${user?.photoURL}`} mr={'10px'} />
                              <Flex
                                direction={'column'}
                                display={{ base: 'none', lg: 'flex' }}
                                fontSize={'8pt'}
                                mr={8}
                              >
                                <Text fontWeight={700}>
                                    {user?.displayName || user.email?.split(('@')[0])}
                                </Text>
                                <Flex>
                                  <Icon as={IoSparkles} color={'brand.100'} mr={1} />
                                  <Text color={'gray.400'}>1 karma</Text>
                                </Flex>
                              </Flex>
                            </>
                ) : (
                    <Icon fontSize={24} color={'gray.400'} mr={1} as={VscAccount} />
                )}
                        <ChevronDownIcon />
                  </Flex>
                </Flex>
          </MenuButton>
          <MenuList>
            {user ? (
              <>
            <MenuItem 
              fontSize={'10pt'} 
              fontWeight={700} 
              _hover={{ bg: 'blue.500',color: 'white' }}
            >
              <Flex align={'center'} >
                <Icon fontSize={20} mr={2} as={CgProfile} />
                Profile
              </Flex>
            </MenuItem>
            <MenuDivider />
            <MenuItem 
              fontSize={'10pt'} 
              fontWeight={700} 
              _hover={{ bg: 'blue.500',color: 'white' }}
              onClick={() => signOut(auth)}
            >
              <Flex align={'center'} >
                <Icon fontSize={20} mr={2} as={MdOutlineLogin} />
                Log out
              </Flex>
            </MenuItem>
              </>
            ) : (
              <>
                <MenuItem 
                  fontSize={'10pt'} 
                  fontWeight={700} 
                  _hover={{ bg: 'blue.500',color: 'white' }}
                  onClick={() => signOut(auth)}
                >
                  <Flex align={'center'} >
                    <Icon fontSize={20} mr={2} as={MdOutlineLogin} />
                    Log In / Sign Up
                  </Flex>
                </MenuItem>
              </>
            )}
          </MenuList>
        </Menu>
    )
}

export default UserMenu; 