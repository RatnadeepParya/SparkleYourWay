import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Sparkle Your Way",
  description: "Luxury Jewellery Store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 relative">
          {children}
          <Toaster position="top-right" toastOptions={{ duration: 2500 }} />
        </main>
        <Footer />
      </body>
    </html>
  );
}
