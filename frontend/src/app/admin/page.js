"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "sparkle@admin") {
      localStorage.setItem("isAdmin", "true");
      router.push("/admin/dashboard");
    } else {
      alert("Invalid admin password!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-amber-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-amber-700 mb-6">
          Sparkle Admin
        </h1>
        <form onSubmit={handleLogin}>
          <input
            type="password"
            placeholder="Enter Admin Password"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:ring-2 focus:ring-amber-500 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-amber-700 text-white py-2 rounded-lg hover:bg-amber-800 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
