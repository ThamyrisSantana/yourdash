import { Text } from "@chakra-ui/react";
import React from "react";

export function Logo() {
  return (
    <Text
      fontSize={["2xl", "3xl"]}
      fontWeight="bold"
      letterSpacing="tight"
      w="64"
    >
      YourDash
      <Text as="span" ml="1" fontSize="4xl" color="pink.500">
        !
      </Text>
    </Text>
  );
}
