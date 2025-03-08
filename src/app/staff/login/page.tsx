"use client";

import { Box, Heading, Flex, Button } from "@chakra-ui/react";
import Link from "next/link";
import LoginForm from "@/components/LoginForm";

export default function StaffLogin() {
  return (
    <Box p={4}>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg">Staff Login</Heading>
        <Flex gap={4}>
          <Link href="/login">
            <Button colorScheme="blue" size="sm">Student</Button>
          </Link>
          <Link href="/admin/login">
            <Button colorScheme="purple" size="sm">Admin</Button>
          </Link>
        </Flex>
      </Flex>
      <LoginForm userType="STAFF" redirectPath="/staff/dashboard" />
    </Box>
  );
}