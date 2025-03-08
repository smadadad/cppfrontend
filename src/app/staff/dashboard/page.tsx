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
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Text,
  useToast,
  Link,
} from "@chakra-ui/react";
import { uploadResults, getAllResults, getComplaints, resolveComplaint } from "@/utils/api";
import { useRouter } from "next/navigation"; // Added for protection

interface Result {
  student_id: string;
  subject: string;
  score: number;
  grade: string;
}

interface Complaint {
  id: number;
  student: string;
  subject: string;
  content: string;
  created_at: string;
  resolved: boolean;
}

export default function StaffDashboard() {
  const [results, setResults] = useState<Result[]>([]);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const router = useRouter(); // Added for protection

  useEffect(() => {
    // Check if logged in
    if (!localStorage.getItem("access_token")) {
      router.push("/staff/login");
      return;
    }
    fetchData();
  }, [router]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const resultsResponse = await getAllResults();
      setResults(resultsResponse.data.results);
      const complaintsResponse = await getComplaints();
      setComplaints(complaintsResponse.data);
    } catch (error: any) {
      toast({
        title: "Fetch failed",
        description: error.message || "Failed to fetch data. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please choose a CSV file.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await uploadResults(file);
      toast({
        title: "Success",
        description: response.data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setFile(null);
      fetchData();
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload results.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResolveComplaint = async (complaintId: number) => {
    setIsLoading(true);
    try {
      await resolveComplaint(complaintId.toString());
      toast({
        title: "Success",
        description: "Complaint resolved successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      fetchData();
    } catch (error: any) {
      toast({
        title: "Resolve failed",
        description: error.message || "Failed to resolve complaint.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box maxW="7xl" mx="auto" px={{ base: 4, sm: 6, lg: 8 }} py={8}>
      <Heading as="h2" size="xl" mb={6}>
        Staff Dashboard
      </Heading>

      {isLoading && (
        <Text fontSize="sm" color="gray.500" mb={4}>
          Loading...
        </Text>
      )}

      <VStack spacing={4} mb={8} align="start">
        <Heading as="h3" size="lg" mb={4}>
          Upload Results (CSV)
        </Heading>
        <form onSubmit={handleUpload} style={{ width: "100%" }}>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel fontSize="sm" fontWeight="medium" color="gray.700">
                Select CSV File
              </FormLabel>
              <Link
                as="label"
                color="blue.500"
                textDecoration="underline"
                cursor="pointer"
                fontSize="md"
                isExternal={false}
              >
                {file ? file.name : "Choose Results CSV File"}
                <Input
                  type="file"
                  accept=".csv"
                  onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                  display="none"
                />
              </Link>
            </FormControl>
            <Button
              type="submit"
              colorScheme="blue"
              size="md"
              w="full"
              isLoading={isLoading}
            >
              Upload Results
            </Button>
          </VStack>
        </form>
      </VStack>

      <VStack spacing={4} mb={8} align="start">
        <Heading as="h3" size="lg" mb={4}>
          All Results
        </Heading>
        <Box bg="white" shadow="md" rounded="lg" overflow="hidden" w="full">
          <Table variant="simple">
            <Thead bg="gray.50">
              <Tr>
                <Th textTransform="uppercase" fontSize="xs" color="gray.500">
                  Student ID
                </Th>
                <Th textTransform="uppercase" fontSize="xs" color="gray.500">
                  Subject
                </Th>
                <Th textTransform="uppercase" fontSize="xs" color="gray.500">
                  Score
                </Th>
                <Th textTransform="uppercase" fontSize="xs" color="gray.500">
                  Grade
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {results.map((result, index) => (
                <Tr key={index}>
                  <Td fontSize="sm" fontWeight="medium">
                    {result.student_id}
                  </Td>
                  <Td fontSize="sm">{result.subject}</Td>
                  <Td fontSize="sm">{result.score}</Td>
                  <Td fontSize="sm">{result.grade}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </VStack>

      <VStack spacing={4} align="start">
        <Heading as="h3" size="lg" mb={4}>
          Complaints
        </Heading>
        {complaints.map((complaint) => (
          <Box key={complaint.id} bg="white" shadow="md" rounded="lg" w="full" overflow="hidden">
            <Box px={4} py={5}>
              <Heading as="h3" size="md" mb={1}>
                Complaint from {complaint.student}
              </Heading>
              <Text fontSize="sm" color="gray.500">
                Subject: {complaint.subject}
              </Text>
            </Box>
            <Box borderTopWidth={1} borderColor="gray.200" px={4} py={5}>
              <VStack spacing={4} align="start">
                <Text fontSize="sm" fontWeight="medium" color="gray.500">
                  Content: <Text as="span" color="gray.900">{complaint.content}</Text>
                </Text>
                <Text fontSize="sm" fontWeight="medium" color="gray.500">
                  Created At: <Text as="span" color="gray.900">{new Date(complaint.created_at).toLocaleString()}</Text>
                </Text>
                <Text fontSize="sm" fontWeight="medium" color="gray.500">
                  Status: <Text as="span" color="gray.900">{complaint.resolved ? "Resolved" : "Pending"}</Text>
                </Text>
              </VStack>
            </Box>
            {!complaint.resolved && (
              <Box bg="gray.50" px={4} py={3} textAlign="right">
                <Button
                  colorScheme="green"
                  size="sm"
                  onClick={() => handleResolveComplaint(complaint.id)}
                  isLoading={isLoading}
                >
                  Resolve Complaint
                </Button>
              </Box>
            )}
          </Box>
        ))}
      </VStack>
    </Box>
  );
}