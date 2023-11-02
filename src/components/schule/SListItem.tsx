import React, { useEffect, useState } from "react";
import { student } from "./SchuelerListe";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  GridItem,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import IZRButton from "../IZRButton";
import { color } from "framer-motion";
import colors from "../styles/colors";

export interface lehrer {
  name: string;
  nachname: string;
}

interface props {
  data: student[] | lehrer[] | undefined;
  data_type: string;
  len: number;
}

function SListItem({ data, data_type, len }: props) {
  const [currentIndex, setIndex] = useState(-1);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  useEffect(() => {});
  const handleMouse = (index: number) => {
    setIndex(index);
  };
  return (
    <>
      {data_type === "schüler" ? (
        data?.map(
          (item, index) =>
            index !== 0 && (
              <SimpleGrid
                key={index}
                borderBottom="1px solid lightgray"
                columns={len + 1}
                width={"100%"}
                onMouseEnter={() => handleMouse(index)}
                onMouseLeave={() => handleMouse(-1)}
                alignItems={"center"}
              >
                <GridItem fontWeight="bold">
                  <HStack flex={"flex"} alignItems={"center"}>
                    <Text paddingX={10}>{index}</Text>
                    {currentIndex === index && (
                      <IZRButton
                        title="Bearbeiten"
                        size="xs"
                        onClick={onOpen}
                      />
                    )}
                  </HStack>
                </GridItem>
                <GridItem fontWeight="bold">
                  {(item as student).first_name}
                </GridItem>
                <GridItem fontWeight="bold">
                  {(item as student).last_name}
                </GridItem>
                <GridItem fontWeight="bold">
                  {(item as student).gender}
                </GridItem>
                <GridItem fontWeight="bold">{(item as student).email}</GridItem>
                <GridItem fontWeight="bold">
                  {(item as student).father}
                </GridItem>
              </SimpleGrid>
            )
        )
      ) : (
        <Text>Leher</Text>
      )}
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>First name</FormLabel>
              <Input ref={initialRef} placeholder="First name" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input placeholder="Last name" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              color={"white"}
              backgroundColor={colors.primary}
              _hover={{ backgroundColor: colors.sec, color: "black" }}
              colorScheme="blue"
              mr={3}
            >
              Save
            </Button>
            <Button
              color={"white"}
              backgroundColor={colors.primary}
              _hover={{ backgroundColor: colors.sec, color: "black" }}
              onClick={onClose}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default SListItem;
