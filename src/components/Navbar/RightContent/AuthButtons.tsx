import { authModalState } from '@/src/atoms/authModalAtom';
import { Button } from '@chakra-ui/react';
import React from 'react';
import { useSetRecoilState } from 'recoil';

const AuthButtons:React.FC = () => {
    const setAuthModalState = useSetRecoilState(authModalState)  

    return ( 
        <>
            <Button 
              variant="outline" 
              h='28px' 
              display={{base: 'none', sm: 'flex'}}
              w={{ base: '70px', md: '110px'}}
              mr={2}
              onClick={()=>setAuthModalState({ open: true, view: "login" })}
            >
              Log in
            </Button>
            <Button
              h='28px'
              display={{base: 'none', sm: 'flex'}}
              w={{ base: '70px', md: '110px'}}
              mr={2}
              onClick={()=>setAuthModalState({ open: true, view: "singup" })}
            >
              Sing Up
            </Button>
        </> 
    )
}
export default AuthButtons;