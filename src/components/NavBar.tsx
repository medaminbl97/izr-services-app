import { HStack, Stack, Button, Text, Show } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import React from "react";
import izrLogo from "../images/izr_logo.png";
import colors from "./styles/colors";
import styles from "./styles/common.module.css";
import router from "./router";

interface props {
  page: string;
}

function NavBar({ page }: props) {
  return (
    <HStack width={"100%"} justifyContent={"center"}>
      <HStack
        height={"100px"}
        margin={{ base: 1, lg: 10 }}
        width={"100%"}
        backgroundColor={colors.bg}
        padding={2}
        borderRadius={10}
        shadow={"0px 0px 5px 1px lightgray"}
        justifyContent={"space-between"}
        paddingX={10}
        className={styles["font-formatted"]}
      >
        <Image height={"100%"} objectFit={"contain"} src={izrLogo}></Image>
        <Show above="lg">
          <Text fontSize={{ sm: 20, md: 25, lg: 30 }}>
            Islamishces Zentrum Regensburg : {page}
          </Text>
        </Show>
        <Stack direction={{ base: "column", lg: "row" }}>
          <Button
            _hover={{ backgroundColor: colors.sec, color: "black" }}
            backgroundColor={colors.primary}
            color={"white"}
          >
            Ausloggen
          </Button>
          <Button
            _hover={{ backgroundColor: colors.sec, color: "black" }}
            backgroundColor={colors.primary}
            color={"white"}
            onClick={() => router.navigate("/")}
          >
            Startseite
          </Button>
        </Stack>
      </HStack>
    </HStack>
  );
}

export default NavBar;
