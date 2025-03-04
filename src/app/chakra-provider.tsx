"use client"; // Mark as Client Component

import { ChakraProvider } from "@chakra-ui/react";

export default function ChakraProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ChakraProvider>{children}</ChakraProvider>;
}