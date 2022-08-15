import { Box, Flex, SimpleGrid, Text, theme } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { SideBar } from "../components/SideBar";
import Header from "../components/Header";
import { AuthGoogleContext } from "../context/AuthGoogle";
import { useRouter } from "next/router";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function Dashboard() {
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      foreColor: theme.colors.gray[500],
    },
    grid: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: false,
    },
    xaxis: {
      type: "datetime",
      axisBorder: {
        color: theme.colors.gray[600],
      },
      axisTicks: {
        color: theme.colors.gray[600],
      },
      categories: [
        "2021-03-18T00:00:00.000Z",
        "2021-03-19T00:00:00.000Z",
        "2021-03-20T00:00:00.000Z",
        "2021-03-21T00:00:00.000Z",
        "2021-03-22T00:00:00.000Z",
        "2021-03-23T00:00:00.000Z",
        "2021-03-24T00:00:00.000Z",
      ],
    },
    fill: {
      opacity: 0.3,
      type: "gradient",
      gradient: {
        shade: "dark",
        opacityFrom: 0.7,
        opacityTo: 0.3,
      },
    },
  };
  const series = [{ name: "sere1", data: [12, 120, 60, 49, 200, 17, 35] }];

  const { signed } = useContext(AuthGoogleContext);
  const [hasPage, setHasPage] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setHasPage(true);
  }, [signed]);

  if (hasPage) {
    if (signed) {
      return (
        <Flex direction="column" height="100vh">
          <Header />

          <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
            <SideBar />

            <SimpleGrid
              flex="1"
              gap="4"
              minChildWidth="320px"
              alignItems="flex-start"
            >
              <Box p={["6", "8"]} bgColor="gray.800" borderRadius={8} h="100%">
                <Text fontSize="lg" mb="4">
                  Incritos da semana
                </Text>

                <Chart
                  options={options as any}
                  series={series}
                  type="area"
                  height={160}
                />
              </Box>

              <Box p="8" bgColor="gray.800" borderRadius={8} h="100%">
                <Text fontSize="lg" mb="4">
                  Taxa de abertura
                </Text>
                <Chart
                  options={options as any}
                  series={series}
                  type="area"
                  height={160}
                />
              </Box>
            </SimpleGrid>
          </Flex>
        </Flex>
      );
    } else {
      router.replace("/");
    }
  }
}
