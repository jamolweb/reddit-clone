import React, { useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Flex,
  Text,
  Box,
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { authModalState } from "@/src/atoms/authModalAtom";
import AuthInputs from "./AuthInputs";
import OAuthButtons from "./OAuthButtons";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/src/firebase/clientApp";
import ResetPassword from "./ResetPassword";
const AuthModal: React.FC = () => {
  const [modalState, setModalState] = useRecoilState(authModalState);
  const [user] = useAuthState(auth);
  const handleClose = () => {
    setModalState((prev) => ({
      ...prev,
      open: false,
    }));
  };
  useEffect(() => {
    if (user) handleClose();
  }, [user]);
  return (
    <>
      <Modal isOpen={modalState.open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"}>
            {modalState.view === "login" && "Log in"}
            {modalState.view === "singup" && "Sing up"}
            {modalState.view === "resetPassword" && "Reset Password"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            pb={6}
          >
            <Flex
              flexDirection={"column"}
              align={"center"}
              justifyContent={"center"}
              w={"70%"}
            >
              {modalState.view === "login" || modalState.view === "singup" ? (
                <>
                  <OAuthButtons />
                  <Flex
                    justifyContent={"space-between"}
                    w={"100%"}
                    alignItems={"center"}
                  >
                    <Box h={"1px"} bg={"gray.500"} w={"40%"}></Box>
                    <Text color={"gray.500"} fontWeight={700}>
                      OR
                    </Text>
                    <Box h={"1px"} bg={"gray.500"} w={"40%"}></Box>
                  </Flex>
                  <AuthInputs />
                </>
              ) : (
                <ResetPassword />
              )}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default AuthModal;