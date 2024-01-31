import { HiOutlineHome } from "react-icons/hi2";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
import { IoGameController } from "react-icons/io5";
import Chakraaccardion from "./chakraaccardion";
import { useRouter } from "next/router";

const index: React.FC = () => {
  const router = useRouter();
  const [scrollY, setScrollY] = useState(0);

  const putToSort = (text: string | undefined) => {
    router.push(`sort/${text}`);
  };

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      setScrollY(window.scrollY);
    });
  }

  return (
    <Box
      borderRight={"1px solid gray"}
      w={"320px"}
      display={{ base: "none", xl: "block" }}
      p={"10px"}
    >
      <Box
        maxW={"400px"}
        position={scrollY >= 40 ? "sticky" : "static"}
        right={"6%"}
        width={"80%"}
        top={"0px"}
        flexDirection="column"
        justifyContent="space-between"
        height="200px"
        display={{ base: "none", xl: "flex" }}
      >
        <Box w={"100%"}>
          <Flex
            w={"100%"}
            pl={"20px"}
            p={"7px"}
            borderRadius={"12px"}
            _hover={{ bg: "gray.300" }}
            align={"center"}
            gap={"10px"}
          >
            <HiOutlineHome fontSize={"20px"} />
            <Text>Home</Text>
          </Flex>
          <Flex
            w={"100%"}
            pl={"20px"}
            p={"7px"}
            borderRadius={"12px"}
            _hover={{ bg: "gray.300" }}
            align={"center"}
            gap={"10px"}
          >
            <BsFillArrowUpRightCircleFill fontSize={"20px"} />
            <Text>Popular</Text>
          </Flex>
          <Box mt={"10px"} w={"100%"} h={"1px"} bg={"gray"} />
        </Box>
        {/* FIRST ACCARDION */}
        <Accordion defaultIndex={[0]} allowMultiple>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box borderRadius={"10px"} flex="1" textAlign="left">
                  TOPICS
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              {/* gaming */}
              <Accordion defaultIndex={[0]} allowMultiple>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Flex
                        gap={"10px"}
                        align={"center"}
                        borderRadius={"10px"}
                        flex="1"
                        textAlign="left"
                      >
                        <IoGameController />
                        Gaming
                      </Flex>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <Flex
                      cursor={"pointer"}
                      onClick={() => putToSort("Valheim")}
                      w={"100%"}
                      borderLeft={"2px solid gray"}
                      padding={"5px"}
                      _hover={{ bg: "gray.300", borderLeft: "2px solid black" }}
                    >
                      <Text ml={"10px"}>Valheim</Text>
                    </Flex>
                    <Flex
                      cursor={"pointer"}
                      onClick={() => putToSort("Genshin")}
                      w={"100%"}
                      borderLeft={"2px solid gray"}
                      padding={"5px"}
                      _hover={{ bg: "gray.300", borderLeft: "2px solid black" }}
                    >
                      <Text ml={"10px"}>Genshin</Text>
                    </Flex>
                    <Flex
                      cursor={"pointer"}
                      onClick={() => putToSort("Minecraft")}
                      w={"100%"}
                      borderLeft={"2px solid gray"}
                      padding={"5px"}
                      _hover={{ bg: "gray.300", borderLeft: "2px solid black" }}
                    >
                      <Text ml={"10px"}>Minecraft</Text>
                    </Flex>
                    <Flex
                      cursor={"pointer"}
                      onClick={() => putToSort("Pokimane")}
                      w={"100%"}
                      borderLeft={"2px solid gray"}
                      padding={"5px"}
                      _hover={{ bg: "gray.300", borderLeft: "2px solid black" }}
                    >
                      <Text ml={"10px"}>Pokimane</Text>
                    </Flex>
                    <Flex
                      cursor={"pointer"}
                      onClick={() => putToSort("Halo")}
                      w={"100%"}
                      borderLeft={"2px solid gray"}
                      padding={"5px"}
                      _hover={{ bg: "gray.300", borderLeft: "2px solid black" }}
                    >
                      <Text ml={"10px"}>Halo</Text>
                    </Flex>
                    <Flex
                      cursor={"pointer"}
                      onClick={() => putToSort("Call")}
                      w={"100%"}
                      borderLeft={"2px solid gray"}
                      padding={"5px"}
                      _hover={{ bg: "gray.300", borderLeft: "2px solid black" }}
                    >
                      <Text ml={"10px"}>Call</Text>
                    </Flex>
                    <Flex
                      cursor={"pointer"}
                      onClick={() => putToSort("Path")}
                      w={"100%"}
                      borderLeft={"2px solid gray"}
                      padding={"5px"}
                      _hover={{ bg: "gray.300", borderLeft: "2px solid black" }}
                    >
                      <Text ml={"10px"}>Path</Text>
                    </Flex>
                    <Flex
                      cursor={"pointer"}
                      onClick={() => putToSort("Hallow")}
                      w={"100%"}
                      borderLeft={"2px solid gray"}
                      padding={"5px"}
                      _hover={{ bg: "gray.300", borderLeft: "2px solid black" }}
                    >
                      <Text ml={"10px"}>Hallow</Text>
                    </Flex>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
              <Chakraaccardion title={"SPORT"} first="NFL" second="NBA" third="Megan" fourth="Atlanta"fifth="Los" sixth="Boston"seventh="Arsenal"/><Chakraaccardion title={"Business"} first="NFL" second="NBA" third="Megan" fourth="Atlanta"fifth="Los" sixth="Boston"seventh="Arsenal"/><Chakraaccardion title={"Crypto"} first="NFL" second="NBA" third="Megan" fourth="Atlanta"fifth="Los" sixth="Boston"seventh="Arsenal"/><Chakraaccardion title={"Television"} first="NFL" second="NBA" third="Megan" fourth="Atlanta"fifth="Los" sixth="Boston"seventh="Arsenal"/><Chakraaccardion title={"Celebrity"} first="NFL" second="NBA" third="Megan" fourth="Atlanta"fifth="Los" sixth="Boston"seventh="Arsenal"/></AccordionPanel>
          </AccordionItem>
          <Box mt={"10px"} w={"100%"} h={"1px"} bg={"gray"} />
        </Accordion>
        <Chakraaccardion title={"SPORT"} first="NFL" second="NBA" third="Megan" fourth="Atlanta"fifth="Los" sixth="Boston"seventh="Arsenal"eightth="nothing"/>
        <Box mt={"10px"} w={"100%"} h={"1px"} bg={"gray"} />
        <Chakraaccardion title={"SPORT"} first="NFL" second="NBA" third="Megan" fourth="Atlanta"fifth="Los" sixth="Boston"seventh="Arsenal"eightth="nothing"/>
      </Box>
    </Box>
  );
};
export default index;
