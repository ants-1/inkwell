import { Box, Stack, Input, Button, Text, HStack, VStack } from "@chakra-ui/react";
import { Field, FieldLabel } from "@chakra-ui/react/field";
import { Avatar } from "@chakra-ui/react/avatar";
import Sidebar from "@/components/Sidebar";

export default function ProfilePage() {
  return (
    <VStack ml={{ base: "16", md: "20" }} color="white" minH="dvh">
      <Sidebar />
      <VStack align="center" my="7">
        <Avatar.Root size="2xl">
          <Avatar.Fallback name="JohnDoe" />
          <Avatar.Image src="https://bit.ly/sage-adebayo" />
        </Avatar.Root>
        <Text fontSize="2xl">JohnDoe</Text>
        <Text>JohnDoe@email.com</Text>
      </VStack>

      <Box mt="5" maxWidth="xl" w="full">
        <Field.Root>
          <FieldLabel>Username</FieldLabel>
          <Input placeholder="Enter username" />
        </Field.Root>

        <Field.Root mt={6}>
          <FieldLabel>Email</FieldLabel>
          <Input type="email" placeholder="Enter email" />
        </Field.Root>

        <Button mt={6} colorScheme="blue">Save</Button>
      </Box>
    </VStack>
  )
}
