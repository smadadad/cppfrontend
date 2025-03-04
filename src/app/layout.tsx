import type { Metadata } from "next";
import { Provider } from "@/components/ui/provider"; // Import the new wrapper
import "@/app/globals.css";

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
    <html lang="en">
      <body>
        <ChakraProviderWrapper>
          <header>
            <h1>Result Portal</h1>
            <nav>
              <a href="/login">Login</a> | <a href="/admin/login">Admin Login</a>
            </nav>
          </header>
          <main>{children}</main>
          <footer>
            <p>© 2025 Result Portal</p>
          </footer>
        </ChakraProviderWrapper>
      </body>
    </html>
  );
}