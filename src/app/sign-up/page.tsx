import SignUpForm from "@/components/SignUpForm";
import { Box } from "@chakra-ui/react";

export default function SignUpPage() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" h="dvh" w="full" backgroundColor="gray.800" >
      <SignUpForm />
    </Box>
  )
}