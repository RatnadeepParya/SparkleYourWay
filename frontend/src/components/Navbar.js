"use client";
import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-pink-600">
          ✨ Sparkle Your Way
        </Link>
        <div className="flex gap-6 items-center">
          <Link href="/products" className="hover:text-pink-600">
            Products
          </Link>
          <Link
            href="/cart"
            className="hover:text-pink-600 flex items-center gap-1"
          >
            <ShoppingCart size={20} /> Cart
          </Link>
          <Link
            href="/login"
            className="hover:text-pink-600 flex items-center gap-1"
          >
            <User size={20} /> Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
