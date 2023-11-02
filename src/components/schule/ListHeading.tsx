import { Grid, GridItem, HStack, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";

interface props {
  data: string[] | undefined;
}

function ListHeading({ data }: props) {
  return (
    <SimpleGrid
      borderTop={"1px solid gray"}
      borderBottom={"1px solid gray"}
      paddingY={2}
      columns={data?.length!+ 1}
      width={"100%"}
      dir="column"
      
    >
      <GridItem color={"gray.500"} fontWeight={"bold"}>
        Nummer
      </GridItem>
      {data &&
        data.map((item) => (
          <GridItem color={"gray.500"} fontWeight={"bold"}>
            {item.toUpperCase()}
          </GridItem>
        ))}
    </SimpleGrid>
  );
}

export default ListHeading;
