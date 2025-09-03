"use client";

import { Provider as ChakraProvider } from "@/components/ui/provider";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import client from "@/lib/apolloClient"; 
import { ApolloProvider } from "@apollo/client/react";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <ApolloProvider client={client}>
        <ChakraProvider>{children}</ChakraProvider>
      </ApolloProvider>
    </SessionProvider>
  );
}
