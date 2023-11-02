import { Image } from "@chakra-ui/image";
import { Button, Text } from "@chakra-ui/react";
import {
  Box,
  HStack,
  Heading,
  List,
  ListItem,
  Stack,
  VStack,
} from "@chakra-ui/layout";
import React from "react";
import izrLogo from "../images/izr_logo.png";
import styles from "./styles/common.module.css";
import router from "./router";
import { Outlet, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <VStack>
      <Image
        objectFit="contain"
        src={izrLogo}
        boxSize={{ base: "xs", lg: "xs" }}
        margin={{ base: 5, lg: 10 }}
      ></Image>
      <Stack
        width={{ lg: "70%" }}
        direction={{ base: "column", lg: "row" }}
        alignItems={"center"}
        borderRadius={10}
        shadow={"1px 1px 10px 1px grey"}
        padding={{ lg: 10 }}
        margin={{ base: 5 }}
        className={styles["font-formatted"]}
        fontStyle={"italic"}
        paddingY={{ base: 10 }}

        /* Color Theme Swatches in Hex */

        /* Color Theme Swatches in RGBA */
        // .dark-teal-deep-1-rgba { color: rgba(1, 31, 38, 1); }
        // .dark-teal-deep-2-rgba { color: rgba(91, 114, 114, 1); }
        // .dark-teal-deep-3-rgba { color: rgba(2, 114, 103, 1); }
        // .dark-teal-deep-4-rgba { color: rgba(2, 38, 17, 1); }
        // .dark-teal-deep-5-rgba { color: rgba(2, 63, 1, 1); }
      >
        <Heading
          fontSize={{ base: 20 }}
          width={{ lg: "50%" }}
          textAlign={"center"}
        >
          Herzlich Willkommen in der Verwaltungsseite des Islamisches Zentrums
          Regensburg
        </Heading>
        <List width={{ lg: "50%" }}>
          <ListItem>
            <Button
              _hover={{
                color: "white",
                backgroundColor: "#034001",
              }}
              transition={"ease .3s"}
              fontWeight={"normal"}
              width={{ lg: "100%" }}
              margin={2}
              size={"lg"}
              onClick={() => router.navigate("/izrSchule/jahreuebersicht")}
            >
              Zugang zu Schule Portal
            </Button>
          </ListItem>
          <ListItem>
            <Button
              _hover={{
                color: "white",
                backgroundColor: "#034001",
              }}
              transition={"ease .3s"}
              fontWeight={"normal"}
              width={{ lg: "100%" }}
              margin={2}
              size={"lg"}
              onClick={() => router.navigate("izrApp/")}
            >
              Zugang zu IZR-App Verwaltung
            </Button>
          </ListItem>
          <ListItem>
            <Button
              _hover={{
                color: "white",
                backgroundColor: "#034001",
              }}
              transition={"ease .3s"}
              fontWeight={"normal"}
              width={{ lg: "100%" }}
              margin={2}
              size={"lg"}
            >
              Zugang zu IZR-MeetingsVerwaltung
            </Button>
          </ListItem>
          <ListItem>
            <Button
              _hover={{
                color: "white",
                backgroundColor: "#034001",
              }}
              transition={"ease .3s"}
              fontWeight={"normal"}
              width={{ lg: "100%" }}
              margin={2}
              size={"lg"}
              onClick={() => router.navigate("/admins")}
            >
              Zugang zu IZR-Administration
            </Button>
          </ListItem>
          <ListItem>
            <Button
              _hover={{
                color: "white",
                backgroundColor: "#034001",
              }}
              transition={"ease .3s"}
              fontWeight={"normal"}
              width={{ lg: "100%" }}
              margin={2}
              size={"lg"}
              onClick={() => navigate("appPrivacyPolicies")}
            >
              IZR-App Privacy Policies
            </Button>
          </ListItem>
        </List>
      </Stack>
    </VStack>
  );
}

export default Home;
