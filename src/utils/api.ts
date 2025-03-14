// Mock API_URL since no real backend yet
const API_URL = "https://mock-api.example.com/api";

// Mock axios-like response structure
const mockResponse = <T>(data: T) => ({ data });

// Mock token interceptor
const getAuthHeaders = () => {
  const token = localStorage.getItem("access_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Student Results
export const getStudentResults = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockResponse({
    results: [
      { student_id: "S001", subject: "Math", score: 85, grade: "B+" },
      { student_id: "S002", subject: "Science", score: 92, grade: "A" },
    ],
  });
};

// Upload Results
export const uploadResults = async (file: File) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockResponse({ message: "Results uploaded successfully" });
};

// Get All Results
export const getAllResults = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockResponse({
    results: [
      { student_id: "S001", subject: "Math", score: 85, grade: "B+" },
      { student_id: "S002", subject: "Science", score: 92, grade: "A" },
    ],
  });
};

// Submit Complaint
export const submitComplaint = async (subject: string, content: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockResponse({ message: "Complaint submitted successfully" });
};

// Get Complaints
export const getComplaints = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockResponse([
    { id: 1, student: "S001", subject: "Math", content: "Score seems off", created_at: "2025-03-05T10:00:00Z", resolved: false },
    { id: 2, student: "S002", subject: "Science", content: "Missing grade", created_at: "2025-03-05T11:00:00Z", resolved: true },
  ]);
};

// Resolve Complaint
export const resolveComplaint = async (complaintId: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockResponse({ message: "Complaint resolved" });
};

// Upload Staff
export const uploadStaff = async (file: File) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockResponse({ message: "Staff uploaded successfully" });
};

// Upload Students
export const uploadStudents = async (file: File) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockResponse({ message: "Students uploaded successfully" });
};