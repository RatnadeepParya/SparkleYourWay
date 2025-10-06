"use client";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  if (pathname && pathname.startsWith("/admin")) return null;

  return (
    <footer className="bg-gray-900 text-white py-6 mt-10">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Sparkle Your Way · All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
