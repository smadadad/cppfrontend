// Temporarily mock API responses without Axios
export const login = async (username: string, password: string, userType: string) => {
  // Simulate a delay like a real API call
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Mock response based on dummy credentials
  if (username === "test" && password === "pass") {
    const mockResponse = {
      access: "fake-access-token",
      refresh: "fake-refresh-token",
      user_type: userType.toUpperCase(),
    };
    localStorage.setItem("access_token", mockResponse.access);
    localStorage.setItem("refresh_token", mockResponse.refresh);
    return mockResponse;
  } else {
    throw new Error("Invalid credentials");
  }
};

// Mock other functions
export const getStudentResults = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    data: [
      { subject: "Math", score: 85 },
      { subject: "Science", score: 90 },
    ],
  };
};

export const uploadResults = async (file: File) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return { data: { message: "Results uploaded successfully" } };
};

export const getAllResults = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    data: [
      { student: "John", subject: "Math", score: 85 },
      { student: "Jane", subject: "Science", score: 88 },
    ],
  };
};

export const submitComplaint = async (subject: string, content: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return { data: { message: "Complaint submitted" } };
};

export const getComplaints = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    data: [
      { id: "1", subject: "Issue 1", content: "Details", resolved: false },
    ],
  };
};

export const resolveComplaint = async (complaintId: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return { data: { message: `Complaint ${complaintId} resolved` } };
};

export const uploadStaff = async (file: File) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return { data: { message: "Staff uploaded successfully" } };
};

export const uploadStudents = async (file: File) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return { data: { message: "Students uploaded successfully" } };
};