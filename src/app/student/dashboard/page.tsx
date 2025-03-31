"use client";

import { useState, useEffect, useCallback } from "react";
import { Box, Heading, Table, Thead, Tr, Th, Tbody, Td, useToast } from "@chakra-ui/react";
import { getStudentResults } from "@/utils/api";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

interface Result {
  student_id: string;
  subject: string;
  score: number;
  grade: string;
}

export default function StudentDashboard() {
  const [results, setResults] = useState<Result[]>([]);
  const toast = useToast();
  const router = useRouter();

  const fetchResults = useCallback(async () => {
    try {
      const response = await getStudentResults();
      setResults(response.data.results);
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast({
        title: "Error",
        description: axiosError.message || "Failed to fetch results",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [toast]);

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      router.push("/student/login");
      return;
    }
    fetchResults();
  }, [router, fetchResults]);

  return (
    <Box maxW="7xl" mx="auto" px={4} py={8}>
      <Heading as="h2" size="xl" mb={6}>
        Student Dashboard
      </Heading>
      <Box bg="white" shadow="md" rounded="lg" overflow="hidden">
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
    </Box>
  );
}
