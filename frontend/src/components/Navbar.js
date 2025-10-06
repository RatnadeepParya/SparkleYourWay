"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, User } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  if (pathname && pathname.startsWith("/admin")) return null;

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-pink-600">
          ✨ Sparkle Your Way
        </Link>
        <div className="flex gap-6 items-center">
          <Link href="/products" className="hover:text-pink-600">
            Products
          </Link>
          <Link href="/about" className="hover:text-pink-600">
            About
          </Link>
          <Link href="/contact" className="hover:text-pink-600">
            Contact
          </Link>
          <Link
            href="/cart"
            className="flex items-center gap-1 hover:text-pink-600"
          >
            <ShoppingCart size={20} /> Cart
          </Link>
          <Link
            href="/profile"
            className="flex items-center gap-1 hover:text-pink-600"
          >
            <User size={20} /> Profile
          </Link>
        </div>
      </div>
    </header>
  );
}
