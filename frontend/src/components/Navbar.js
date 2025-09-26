"use client";
import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";

export default function Navbar() {
  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-pink-600">
          ✨ Sparkle Your Way
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <Link href="/products" className="hover:text-pink-600">
            Products
          </Link>
          <Link href="/about" className="hover:text-pink-600">
            About
          </Link>
          <Link href="/contact" className="hover:text-pink-600">
            Contact
          </Link>

          {/* Cart */}
          <Link href="/cart" className="flex items-center hover:text-pink-600">
            <ShoppingCart className="w-5 h-5 mr-1" /> Cart
          </Link>

          {/* Profile / Login */}
          <Link
            href="/profile"
            className="flex items-center hover:text-pink-600"
          >
            <User className="w-5 h-5 mr-1" /> Profile
          </Link>
        </div>
      </nav>
    </header>
  );
}
