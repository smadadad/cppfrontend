"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  userType: string | null;
  login: (username: string, password: string, userType: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);

  // Check initial login state on mount
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const storedUserType = localStorage.getItem("user_type");
    if (token) {
      setIsLoggedIn(true);
      setUserType(storedUserType);
    }
  }, []);

  const login = async (username: string, password: string, userType: string) => {
    // Mock login logic (replace with real API call later)
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (username === "test" && password === "pass") {
      localStorage.setItem("access_token", "fake-access-token");
      localStorage.setItem("refresh_token", "fake-refresh-token");
      localStorage.setItem("user_type", userType.toUpperCase());
      setIsLoggedIn(true);
      setUserType(userType.toUpperCase());
    } else {
      throw new Error("Invalid credentials");
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_type");
    setIsLoggedIn(false);
    setUserType(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userType, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}