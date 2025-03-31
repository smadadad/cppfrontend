"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  Link,
} from "@chakra-ui/react"; // Removed unused Text import
import { uploadStaff, uploadStudents } from "@/utils/api";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios"; // Added for error typing

export default function AdminDashboard() {
  const [staffFile, setStaffFile] = useState<File | null>(null);
  const [studentFile, setStudentFile] = useState<File | null>(null);
  const [isLoadingStaff, setIsLoadingStaff] = useState(false);
  const [isLoadingStudents, setIsLoadingStudents] = useState(false);
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    // Check if logged in
    if (!localStorage.getItem("access_token")) {
      router.push("/admin/login");
    }
  }, [router]);

  const handleStaffUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!staffFile) {
      toast({
        title: "No file selected",
        description: "Please choose a staff CSV file.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoadingStaff(true);
    try {
      const response = await uploadStaff(staffFile);
      toast({
        title: "Success",
        description: response.data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setStaffFile(null);
    } catch (error) {
      // Typed as AxiosError with optional response data
      const axiosError = error as AxiosError<{ message?: string }>;
      toast({
        title: "Upload failed",
        description:
          axiosError.response?.data?.message || axiosError.message || "Failed to upload staff data",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoadingStaff(false);
    }
  };

  const handleStudentUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!studentFile) {
      toast({
        title: "No file selected",
        description: "Please choose a student CSV file.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoadingStudents(true);
    try {
      const response = await uploadStudents(studentFile);
      toast({
        title: "Success",
        description: response.data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setStudentFile(null);
    } catch (error) {
      // Typed as AxiosError with optional response data
      const axiosError = error as AxiosError<{ message?: string }>;
      toast({
        title: "Upload failed",
        description:
          axiosError.response?.data?.message || axiosError.message || "Failed to upload student data",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoadingStudents(false);
    }
  };

  return (
    <Box minH="screen" py={6} bg="gray.100" display="flex" justifyContent="center">
      <VStack spacing={6} maxW="xl" mx="auto" p={6} bg="white" shadow="lg" rounded="xl">
        <Heading size="lg">Admin Dashboard</Heading>

        <VStack spacing={6} w="full">
          <form onSubmit={handleStaffUpload} style={{ width: "100%" }}>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel fontSize="sm" fontWeight="medium" color="gray.700">
                  Upload Staff Data
                </FormLabel>
                <Link
                  as="label"
                  color="blue.500"
                  textDecoration="underline"
                  cursor="pointer"
                  fontSize="md"
                  isExternal={false}
                >
                  {staffFile ? staffFile.name : "Choose Staff CSV File"}
                  <Input
                    type="file"
                    accept=".csv"
                    onChange={(e) => setStaffFile(e.target.files ? e.target.files[0] : null)}
                    display="none"
                  />
                </Link>
              </FormControl>
              <Button
                type="submit"
                colorScheme="blue"
                size="md"
                w="full"
                isLoading={isLoadingStaff}
                mt={2}
              >
                Upload Staff Data
              </Button>
            </VStack>
          </form>

          <form onSubmit={handleStudentUpload} style={{ width: "100%" }}>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel fontSize="sm" fontWeight="medium" color="gray.700">
                  Upload Student Data
                </FormLabel>
                <Link
                  as="label"
                  color="green.500"
                  textDecoration="underline"
                  cursor="pointer"
                  fontSize="md"
                  isExternal={false}
                >
                  {studentFile ? studentFile.name : "Choose Student CSV File"}
                  <Input
                    type="file"
                    accept=".csv"
                    onChange={(e) => setStudentFile(e.target.files ? e.target.files[0] : null)}
                    display="none"
                  />
                </Link>
              </FormControl>
              <Button
                type="submit"
                colorScheme="green"
                size="md"
                w="full"
                isLoading={isLoadingStudents}
                mt={2}
              >
                Upload Student Data
              </Button>
            </VStack>
          </form>
        </VStack>
      </VStack>
    </Box>
  );
}
