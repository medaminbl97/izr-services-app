import { Card, CardBody, Heading, Text } from "@chakra-ui/react";
import React from "react";
import bg from "../images/stars.png";
import { randomInt } from "crypto";
import { Outlet } from "react-router-dom";

interface props {
  text: string;
  onClick: (jahr: string) => void;
}

function IBOX({ text: jahr, onClick }: props) {
  return (
    <Card
      width={"auto"}
      height={300}
      padding={50}
      flex={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      margin={5}
      cursor={"pointer"}
      _hover={{
        transform: "scale(1.2)",
      }}
      transition={"ease .2s"}
      backgroundImage={bg}
      backgroundSize={"auto"}
      backgroundRepeat={"no-repeat"}
      bgSize={Math.random() * 600 + 200}
      shadow={"1px 0px 5px 0px gray"}
      onClick={() => onClick(jahr)}
    >
      <Heading fontSize={80} opacity={1}>
        {jahr}
      </Heading>
    </Card>
  );
}

export default IBOX;
