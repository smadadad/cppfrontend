"use client";

import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext"; // Updated

interface LoginFormProps {
  userType: "STUDENT" | "STAFF" | "ADMIN";
  redirectPath: string;
}

export default function LoginForm({ userType, redirectPath }: LoginFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();
  const { login } = useAuth(); // Use context login

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(username, password, userType); // Call context login
      toast({
        title: "Login successful",
        description: `Logged in as ${userType.toLowerCase()}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      router.push(redirectPath);
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Invalid credentials",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box maxW="400px" mx="auto" mt={8}>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button
            type="submit"
            colorScheme="blue"
            w="full"
            isLoading={isLoading}
          >
            Login
          </Button>
        </VStack>
      </form>
    </Box>
  );
}