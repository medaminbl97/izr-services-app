import { SimpleGrid, GridItem } from "@chakra-ui/react";
import React from "react";
import router from "../router";
import IBOX from "./SchulJahr";

function JahreUebersicht() {
  const schulJahre = ["2021", "2022", "2023", "2024"];
  return (
    <SimpleGrid
      columns={{
        lg: 3,
        base: 1,
      }}
      spacing={10}
    >
      {schulJahre.map((jahr) => (
        <GridItem key={jahr}>
          <IBOX text={jahr} onClick={(jahr) => router.navigate(`../${jahr}`)} />
        </GridItem>
      ))}
    </SimpleGrid>
  );
}

export default JahreUebersicht;
