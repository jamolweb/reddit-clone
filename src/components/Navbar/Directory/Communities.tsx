import React, { useState } from 'react';
import CreateCommunityModal from '../../Modal/CreateCommunity/CreateCommunityModal';
import { Flex, Icon, MenuItem } from '@chakra-ui/react';
import { GrAdd } from 'react-icons/gr';

type CommunitiesProps = {};

const Communities:React.FC<CommunitiesProps> = () => {
    const [open, setOpen] = useState(false)

    return (
        <>
            <CreateCommunityModal open={open} handleClose={() => setOpen(false)} />
            <MenuItem
              w={"100%"}
              fontSize={'10pt'}
              _hover={{ bg: 'gray.100'}}
              onClick={() => setOpen(true)}
            >
                <Flex alignItems={'center'}>
                    <Icon mr={3} fontSize={20} as={GrAdd} />
                    Create Post
                </Flex>
            </MenuItem>
        </>
    )
    
}
export default Communities;