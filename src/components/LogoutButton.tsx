"use client";

import { Button, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LogoutButton() {
  const { isLoggedIn, logout } = useAuth(); // Use context
  const router = useRouter();
  const toast = useToast();

  if (!isLoggedIn) return null; // Hide if not logged in

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    router.push("/login");
  };

  return (
    <Button colorScheme="red" size="sm" onClick={handleLogout}>
      Logout
    </Button>
  );
}