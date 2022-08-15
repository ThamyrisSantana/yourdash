import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../styles/theme";
import { SideBarDrawerProvider } from "../context/SideBarDrawerContext";
import { AuthGoogleProvider } from "../context/AuthGoogle";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <SideBarDrawerProvider>
        <AuthGoogleProvider>
          <Component {...pageProps} />
        </AuthGoogleProvider>
      </SideBarDrawerProvider>
    </ChakraProvider>
  );
}

export default MyApp;
