import { Button } from "@chakra-ui/react";
import React from "react";
import colors from "./styles/colors";

interface props {
  title: string;
  onClick: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
}

function IZRButton({
  title,
  onClick,
  isDisabled = false,
  isLoading = false,
}: props) {
  return (
    <Button
      _hover={{ backgroundColor: colors.sec, color: "black" }}
      onClick={onClick}
      color="white"
      backgroundColor={colors.primary}
      isLoading={isLoading}
      loadingText={"Bearbeitung läuft..."}
      isDisabled={isDisabled}
    >
      {title}
    </Button>
  );
}

export default IZRButton;
