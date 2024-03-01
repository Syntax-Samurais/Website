import { Inter } from "next/font/google";
import { UserProvider } from "./_components/_modals/LoginModal.jsx";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FitFusion",
  description: "Elevate your fitness",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={inter.className}>{children}</body>
      </UserProvider>
    </html>
  );
}
