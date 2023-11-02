import { Grid, GridItem, SimpleGrid, VStack } from "@chakra-ui/react";
import React from "react";
import IBOX from "./SchulJahr";
import NavBar from "../NavBar";
import router from "../router";
import { Outlet } from "react-router-dom";

function SchuleVerwaltung() {
  return (
    <VStack>
      <NavBar page={"IZR-SCHULE"} />
      <Outlet />
    </VStack>
  );
}

export default SchuleVerwaltung;
