import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  Text
} from '@chakra-ui/react';
import { TiHome } from 'react-icons/ti'
import Communities from './Communities';
import PopularUser from '../../main/PopularUsers';

const UserMenu:React.FC = () => {

    return (
        <Menu>
          <MenuButton
            display={{ base: 'none', md: 'flex' }}
            cursor={'pointer'}
            padding={'0px 6px'} 
            borderRadius={4}
            mr={2}
            ml={{ base: 0, md: 2 }}
             _hover={{ outline: '1px solid', outlineColor: 'gray.200'}}
          >
            <Flex alignItems={'center'} justifyContent={'space-between'} width={{ base: 'auto', lg: '200px'}}>
              <Flex alignItems={'center'}>
                <Icon fontSize={24} mr={{ base: 1, md: 2}} as={TiHome} />
                <Flex display={{ base: 'none', lg: 'flex'}}>
                  <Text fontWeight={600} fontSize={'10pt'}>
                    Home
                  </Text>
                </Flex>
              </Flex>
              <ChevronDownIcon />
            </Flex>
          </MenuButton>
          <MenuList>
            <PopularUser img={'https://styles.redditmedia.com/t5_2s84e/styles/communityIcon_g8xlzjxvilbb1.jpg?format=pjpg&s=904e57327bdb1e8dad5b23a60fbe9344e48719a6'} name={'r/ NBA2k'} members='531,694 members,' />
            <PopularUser img={'https://styles.redditmedia.com/t5_2s30g/styles/communityIcon_wpxjh8fuvcw51.png'} name={'r/ AskMen'} members='5,890,427 members,' />
            <PopularUser img={'https://styles.redditmedia.com/t5_2xbci/styles/communityIcon_32btum6062v91.png'} name={'r/ xboxone'} members='4,008,711 members,' />
            <PopularUser img={'https://styles.redditmedia.com/t5_2rrlp/styles/communityIcon_06pablpo0le21.png'} name={'r/ PS4'} members='5,590,814 members,' />
            <PopularUser img={'https://styles.redditmedia.com/t5_2qh1f/styles/communityIcon_26udmxwqbrwb1.png'} name={'r/ apple'} members='4,618,488 members,' />
            <Communities />
          </MenuList>
        </Menu>
    )
}

export default UserMenu; 