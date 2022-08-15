import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { AuthGoogleContext } from "../../context/AuthGoogle";

interface ProfileProps {
  showProfileData: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  const { user, signOut } = useContext(AuthGoogleContext);

  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>{user.displayName}</Text>
          <Text color="gray.300" fontSize="small">
            {user.email}
          </Text>
        </Box>
      )}
      <Avatar size="md" name={user.displayName} src={user.photoURL} />
      <Button size="sm" ml="2" colorScheme="pink" onClick={() => signOut()}>
        Sair
      </Button>
    </Flex>
  );
}
