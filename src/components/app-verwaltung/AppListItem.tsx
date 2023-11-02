import {
  Box,
  Button,
  HStack,
  IconButton,
  ListItem,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { TiDelete } from "react-icons/ti";
interface props {
  text: string;
  id: string;
  onDelete: (id: string) => void;
}

function AppListItem({ text, onDelete, id }: props) {
  return (
    <HStack
      margin={1}
      flex={"flex"}
      justifyContent={"space-between"}
      border={"1px solid lightgray"}
      borderRadius={5}
      padding={1}
    >
      <Text>{text}</Text>
      <IconButton
        onClick={() => onDelete(id)}
        icon={<TiDelete size={20} color="red" />}
        aria-label={""}
      />
    </HStack>
  );
}

export default AppListItem;
