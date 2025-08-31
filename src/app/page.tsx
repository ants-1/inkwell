import Sidebar from "@/components/Sidebar";
import { Button, HStack } from "@chakra-ui/react";

export default function Home() {
  return (
    <HStack backgroundColor="gray.800">
      <Sidebar />
      <Button>Click Me</Button>
    </HStack>
  );
}
