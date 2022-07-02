import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Input } from "../components/form/Input";

export function Home() {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      w="100vw"
      h="100vh"
    >
      <Stack spacing="8">
        <Flex align="center" justify="center">
          <Text fontSize="5xl" fontWeight="bold" letterSpacing="tight" w="64">
            YourDash
            <Text as="span" ml="1" fontSize="6xl" color="pink.500">
              !
            </Text>
          </Text>
        </Flex>
        <Flex
          as="form"
          w="100%"
          maxWidth={360}
          bg="gray.800"
          p="8"
          borderRadius={8}
          flexDir="column"
        >
          <Stack spacing={4}>
            <Input name="email" label="E-mail" type="email" />
            <Input name="password" label="Senha" type="password" />
          </Stack>
          <Button type="submit" mt="6" colorScheme="pink">
            Entrar
          </Button>
        </Flex>
      </Stack>
    </Flex>
  );
}

export default Home;
