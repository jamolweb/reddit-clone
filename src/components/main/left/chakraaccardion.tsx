import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Flex,
  Text,
} from "@chakra-ui/react";
import { MdSportsBaseball } from "react-icons/md";
import { FaBusinessTime } from "react-icons/fa";
import { TbBusinessplan } from "react-icons/tb";
import { PiTelevisionDuotone } from "react-icons/pi";
import { FaRegStar } from "react-icons/fa";
import { useRouter } from "next/router";

type chakraaccardionProps = {
  title: string;
  first: string;
  second: string;
  third?: string;
  fourth?: string;
  fifth?: string;
  sixth?: string;
  seventh?: string;
  eightth?: string;
};

const Chakraaccardion: React.FC<chakraaccardionProps> = ({
  title,
  first,
  second,
  third,
  fourth,
  fifth,
  sixth,
  seventh,
  eightth,
}) => {
  const router = useRouter();

  const putToSort = (text: string | undefined) => {
    router.push(`sort/${text}`);
  };

  return (
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
              {title === "SPORT" && <MdSportsBaseball />}
              {title === "Business" && <FaBusinessTime />}
              {title === "Crypto" && <TbBusinessplan />}
              {title === "Television" && <PiTelevisionDuotone />}
              {title === "Celebrity" && <FaRegStar />}
              <Text>{title}</Text>
            </Flex>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <Flex
            cursor={"pointer"}
            onClick={() => putToSort(first)}
            w={"100%"}
            borderLeft={"2px solid gray"}
            padding={"5px"}
            _hover={{ bg: "gray.300", borderLeft: "2px solid black" }}
          >
            <Text ml={"10px"}>{first}</Text>
          </Flex>
          <Flex
            cursor={"pointer"}
            onClick={() => putToSort(second)}
            w={"100%"}
            borderLeft={"2px solid gray"}
            padding={"5px"}
            _hover={{ bg: "gray.300", borderLeft: "2px solid black" }}
          >
            <Text ml={"10px"}>{second}</Text>
          </Flex>
          <Flex
            cursor={"pointer"}
            onClick={() => putToSort(third)}
            w={"100%"}
            borderLeft={"2px solid gray"}
            padding={"5px"}
            _hover={{ bg: "gray.300", borderLeft: "2px solid black" }}
          >
            <Text ml={"10px"}>{third}</Text>
          </Flex>
          <Flex
            cursor={"pointer"}
            onClick={() => putToSort(fourth)}
            w={"100%"}
            borderLeft={"2px solid gray"}
            padding={"5px"}
            _hover={{ bg: "gray.300", borderLeft: "2px solid black" }}
          >
            <Text ml={"10px"}>{fourth}</Text>
          </Flex>
          <Flex
            cursor={"pointer"}
            onClick={() => putToSort(fifth)}
            w={"100%"}
            borderLeft={"2px solid gray"}
            padding={"5px"}
            _hover={{ bg: "gray.300", borderLeft: "2px solid black" }}
          >
            <Text ml={"10px"}>{fifth}</Text>
          </Flex>
          <Flex
            cursor={"pointer"}
            onClick={() => putToSort(sixth)}
            w={"100%"}
            borderLeft={"2px solid gray"}
            padding={"5px"}
            _hover={{ bg: "gray.300", borderLeft: "2px solid black" }}
          >
            <Text ml={"10px"}>{sixth}</Text>
          </Flex>
          <Flex
            cursor={"pointer"}
            onClick={() => putToSort(seventh)}
            w={"100%"}
            borderLeft={"2px solid gray"}
            padding={"5px"}
            _hover={{ bg: "gray.300", borderLeft: "2px solid black" }}
          >
            <Text ml={"10px"}>{seventh}</Text>
          </Flex>
          <Flex
            cursor={"pointer"}
            onClick={() => putToSort(eightth)}
            w={"100%"}
            borderLeft={"2px solid gray"}
            padding={"5px"}
            _hover={{ bg: "gray.300", borderLeft: "2px solid black" }}
          >
            <Text ml={"10px"}>{eightth}</Text>
          </Flex>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
export default Chakraaccardion;