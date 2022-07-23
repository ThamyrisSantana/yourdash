import { Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

export function Logo() {
  return (
    <Link href="/dashboard">
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
    </Link>
  );
}
