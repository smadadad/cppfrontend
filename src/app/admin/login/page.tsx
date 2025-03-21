"use client";

import { Box, Heading, Flex, Button } from "@chakra-ui/react";
import Link from "next/link";
import LoginForm from "@/components/LoginForm";

export default function AdminLogin() {
  return (
    <Box p={4}>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg">Admin Login</Heading>
        <Flex gap={4}>
          <Link href="/login">
            <Button colorScheme="blue" size="sm">Student</Button>
          </Link>
          <Link href="/staff/login">
            <Button colorScheme="blue" size="sm">Staff</Button>
          </Link>
        </Flex>
      </Flex>
      <LoginForm userType="ADMIN" redirectPath="/admin/dashboard" />
    </Box>
  );
}