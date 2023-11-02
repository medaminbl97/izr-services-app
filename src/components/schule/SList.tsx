import React from "react";
import ListHeading from "./ListHeading";
import { student } from "./SchuelerListe";
import SListItem, { lehrer } from "./SListItem";
import { Box, Slide, VStack } from "@chakra-ui/react";

interface props {
  data_type: string;
  data: student[] | lehrer[] | undefined;
  heading_data: string[] | undefined;
}

function SList({ data_type, data, heading_data }: props) {
  return (
    <VStack width={"80vw"} justifyContent={"center"}>
      <ListHeading data={heading_data} />
      <Box width={"100%"} height={"70vh"} overflow={"scroll"}>
        <SListItem
          data={data}
          data_type={data_type}
          len={heading_data?.length!}
        />
      </Box>
    </VStack>
  );
}

export default SList;
