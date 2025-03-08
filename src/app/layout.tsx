import type { Metadata } from "next";
import { Provider } from "@/components/ui/provider";
import "@/app/globals.css";
import LogoutButton from "@/components/LogoutButton";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { AuthProvider } from "@/context/AuthContext"; // Added

export const metadata: Metadata = {
  title: "Result Portal",
  description: "A portal for students, staff, and admins",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Provider>
          <AuthProvider> {/* Wrap with AuthProvider */}
            <header>
              <Flex align="center" justify="space-between" p={4} bg="gray.100">
                <Box>
                  <Heading as="h1" size="lg">
                    Result Portal
                  </Heading>
                </Box>
                <Box>
                  <LogoutButton />
                </Box>
              </Flex>
            </header>
            <main>{children}</main>
            <footer>
              <Box textAlign="center" p={4} bg="gray.50">
                <p>© 2025 Result Portal</p>
              </Box>
            </footer>
          </AuthProvider>
        </Provider>
      </body>
    </html>
  );
}