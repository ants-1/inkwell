"use client"

import Sidebar from "@/components/Sidebar";
import { Box, Button, Heading, HStack, Link, VStack, Text, Stack } from "@chakra-ui/react";
import { Folder, NotebookPen, Pen } from "lucide-react";

export default function Home() {
  return (
    <Stack display="flex" alignItems="center" justifyContent="center" minH="dvh" h="full" ml={{ base: "16", md: "20" }}>
      <Sidebar />
      <VStack spaceY="8" textAlign="center" maxW="lg">
        <Heading size="3xl" color="white">
          Welcome to Inkwell
        </Heading>
        <Text fontSize="lg" color="gray.300">
          Capture your thoughts, collaborate with your team, and stay organized —
          all in one place.
        </Text>

        <HStack spaceX="4">
          <Link href="/sign-up">
            <Button size="lg">
              Get Started
            </Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="surface">
              Log In
            </Button>
          </Link>
        </HStack>

        <Box mt="12" spaceY="6" color="gray.400">
          <Box display="flex" gap="4">
            <Pen color="white" />
            <Text>Collaborate with your team in shared folders</Text>
          </Box>
          <Box display="flex" gap="4">
            <NotebookPen color="white" />
            <Text>Create notes effortlessly</Text>
          </Box>
          <Box display="flex" gap="4">
            <Folder color="white" />
            <Text>Stay organized with projects and tags</Text>
          </Box>
        </Box>
      </VStack>
    </Stack>
  );
}
