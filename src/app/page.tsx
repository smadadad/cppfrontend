"use client";

import { useState, useEffect, useCallback } from "react";
import { useToast } from "@chakra-ui/react";
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

  return <div>{/* Render results */}</div>;
}
