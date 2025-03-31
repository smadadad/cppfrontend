"use client";

import { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { getStudentResults } from "@/utils/api";
import { useRouter } from "next/navigation";

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

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      router.push("/student/login");
      return;
    }
    fetchResults();
  }, [router]);

  const fetchResults = async () => {
    try {
      const response = await getStudentResults();
      setResults(response.data.results);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to fetch results",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return <div>{/* Render results */}</div>;
}
