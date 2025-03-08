"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  VStack,
  useToast,
  Text,
} from "@chakra-ui/react";
import { getStudentResults, submitComplaint } from "@/utils/api";
import { useRouter } from "next/navigation"; // Added for protection

export default function StudentDashboard() {
  const [results, setResults] = useState<any[]>([]);
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showComplaintForm, setShowComplaintForm] = useState(false);
  const toast = useToast();
  const router = useRouter(); // Added for protection

  useEffect(() => {
    // Check if logged in
    if (!localStorage.getItem("access_token")) {
      router.push("/login");
      return;
    }
    fetchResults();
  }, [router]);

  const fetchResults = async () => {
    setIsLoading(true);
    try {
      const response = await getStudentResults();
      setResults(response.data.results);
    } catch (error: any) {
      toast({
        title: "Fetch failed",
        description: error.message || "Failed to fetch results.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await submitComplaint(subject, content);
      toast({
        title: "Success",
        description: response.data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setSubject("");
      setContent("");
      setShowComplaintForm(false);
    } catch (error: any) {
      toast({
        title: "Submission failed",
        description: error.message || "Failed to submit complaint.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box p={4}>
      <Heading size="lg" mb={4}>
        Student Dashboard
      </Heading>

      {isLoading && <Text>Loading...</Text>}

      <Box mb={8}>
        <Heading size="md" mb={4}>
          My Results
        </Heading>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Student ID</Th>
              <Th>Subject</Th>
              <Th>Score</Th>
              <Th>Grade</Th>
            </Tr>
          </Thead>
          <Tbody>
            {results.map((result, index) => (
              <Tr key={index}>
                <Td>{result.student_id}</Td>
                <Td>{result.subject}</Td>
                <Td>{result.score}</Td>
                <Td>{result.grade}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <Box>
        <Button
          colorScheme="blue"
          size="md"
          mb={4}
          onClick={() => setShowComplaintForm(!showComplaintForm)}
        >
          {showComplaintForm ? "Cancel" : "Submit Complaint"}
        </Button>

        {showComplaintForm && (
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Subject</FormLabel>
                <Input value={subject} onChange={(e) => setSubject(e.target.value)} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Content</FormLabel>
                <Textarea value={content} onChange={(e) => setContent(e.target.value)} />
              </FormControl>
              <Button type="submit" colorScheme="blue" isLoading={isLoading} w="full">
                Submit
              </Button>
            </VStack>
          </form>
        )}
      </Box>
    </Box>
  );
}