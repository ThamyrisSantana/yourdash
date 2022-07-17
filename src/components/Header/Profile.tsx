import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

export function Profile() {
  return (
    <Flex align="center">
      <Box mr="4" textAlign="right">
        <Text>Name</Text>
        <Text color="gray.300" fontSize="small">
          name@email.com
        </Text>
      </Box>

      <Avatar
        size="md"
        name="Thamyris Sant Ana"
        src="https://github.com/ThamyrisSantana.png"
      />
    </Flex>
  );
}
