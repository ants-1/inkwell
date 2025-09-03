"use client";

import { Box, Button, Field, HStack, Input, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";

interface SignUpFormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>();

  const onSubmit: SubmitHandler<SignUpFormValues> = async (data) => {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const err = await res.json();
      console.error("Signup failed:", err);
      return;
    }

    console.log("Signup successful");
  }

  return (
    <Box
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      maxW="sm"
      w="full"
      p="6"
      backgroundColor="gray.700"
      color="white"
      rounded="xl"
    >
      <Stack gap="4">
        <Text fontWeight="bold" textAlign="center">Inkwell - Sign Up</Text>
        <Field.Root invalid={!!errors.username}>
          <Field.Label>Username</Field.Label>
          <Input {...register("username", { required: "Username is required" })} />
          <Field.ErrorText>{errors.username?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.email}>
          <Field.Label>Email</Field.Label>
          <Input {...register("email", { required: "Email is required" })} />
          <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.password}>
          <Field.Label>Password</Field.Label>
          <Input type="password" {...register("password", { required: "Password is required" })} />
          <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.confirmPassword}>
          <Field.Label>Confirm Password</Field.Label>
          <Input type="password" {...register("confirmPassword", { required: "Confirm Password is required" })} />
          <Field.ErrorText>{errors.confirmPassword?.message}</Field.ErrorText>
        </Field.Root>

        <Button type="submit" mt="4">Sign Up</Button>
        <HStack justifyContent="center">
          <Text fontSize="sm">
            Already have an account? {" "}
          </Text>
          <Text fontSize="sm" color="blue.300" textDecoration="underline">
            <Link href="/login">Login</Link>
          </Text>
        </HStack>
      </Stack>
    </Box>
  )
}