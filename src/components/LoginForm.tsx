"use client";

import { Box, Button, Field, HStack, Input, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => console.log(data);

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)} maxW="sm" w="full" p="6" backgroundColor="gray.700" color="white" rounded="xl">
      <Stack gap="4">
        <Text fontWeight="bold" textAlign="center">Inkwell - Login</Text>

        <Field.Root invalid={!!errors.email}>
          <Field.Label>Email</Field.Label>
          <Input {...register("email", { required: "Email is required" })} />
          <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.password}>
          <Field.Label>Password</Field.Label>
          <Input {...register("password", { required: "Password is required" })} />
          <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
        </Field.Root>

        <Button type="submit" mt="4">Login</Button>
        <HStack justifyContent="center">
          <Text fontSize="sm">
            Don't have an account? {" "}
          </Text>
          <Text fontSize="sm" color="blue.300" textDecoration="underline">
            <Link href="/sign-up">Sign Up</Link>
          </Text>
        </HStack>
      </Stack>
    </Box>
  )
}