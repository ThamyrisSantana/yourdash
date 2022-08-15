import { Button, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../components/form/Input";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { AuthGoogleContext } from "../context/AuthGoogle";
import { FcGoogle } from "react-icons/fc";

type SignInFormData = {
  email: string;
  password: string;
};

const signInFormSchema = yup.object().shape({
  email: yup
    .string()
    .required("Campo email é obrigatório")
    .email("Email inválido"),
  password: yup.string().required("Campo senha é obrigatório"),
});

export function SignIn() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema),
  });

  const { signInWithGoogle, signed } = useContext(AuthGoogleContext);

  const { errors } = formState;

  const handleSignIn: SubmitHandler<FieldValues> = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(values);
  };

  if (signed) {
    window.location.replace("/dashboard");
  }

  const googleAuth = async () => {
    await signInWithGoogle();
  };

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
          onSubmit={handleSubmit(handleSignIn)}
        >
          <Stack spacing={4}>
            <Input
              label="E-mail"
              type="email"
              error={errors.email}
              {...register("email")}
            />
            <Input
              label="Senha"
              type="password"
              error={errors.password}
              {...register("password")}
            />
          </Stack>

          <Button
            type="submit"
            mt="6"
            mb="6"
            colorScheme="pink"
            isLoading={formState.isSubmitting}
          >
            Entrar
          </Button>

          <Button
            backgroundColor="#fff"
            onClick={() => googleAuth()}
            color="GrayText"
          >
            <Icon as={FcGoogle} size={60} mr="4" />
            Entrar com Google
          </Button>
        </Flex>
      </Stack>
    </Flex>
  );
}

export default SignIn;
