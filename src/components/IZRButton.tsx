import { Button } from "@chakra-ui/react";
import React from "react";
import colors from "./styles/colors";

interface props {
  title: string;
  onClick: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  size?: string;
}

function IZRButton({
  title,
  onClick,
  isDisabled = false,
  isLoading = false,
  size,
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
      size={size}
      transition={"ease .2s"}
    >
      {title}
    </Button>
  );
}

export default IZRButton;
