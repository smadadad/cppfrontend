"use client";

import { Box, Heading, Flex, Button } from "@chakra-ui/react";
import Link from "next/link";
import LoginForm from "@/components/LoginForm";

export default function StudentLogin() {
  return (
    <Box p={4}>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg">Student Login</Heading>
        <Flex gap={4}>
          <Link href="/staff/login">
            <Button colorScheme="blue" size="sm">Staff</Button>
          </Link>
          {/* Removed Admin button */}
        </Flex>
      </Flex>
      <LoginForm userType="STUDENT" redirectPath="/student/dashboard" />
    </Box>
  );
}