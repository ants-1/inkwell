import LoginForm from "@/components/LoginForm";
import { Box } from "@chakra-ui/react";

export default function LoginPage() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" h="dvh" w="full">
      <LoginForm />
    </Box>
  )
}