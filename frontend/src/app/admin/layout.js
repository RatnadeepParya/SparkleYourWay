"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const path = usePathname();

  // Don't apply sidebar for login page
  if (path === "/admin") return <>{children}</>;

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) router.push("/admin");
  }, [router]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-amber-700 text-white p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
          <nav className="flex flex-col gap-4">
            <a href="/admin/dashboard" className="hover:text-amber-200">
              Dashboard
            </a>
            <a href="/admin/products" className="hover:text-amber-200">
              Manage Products
            </a>
          </nav>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem("isAdmin");
            router.push("/admin");
          }}
          className="bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-lg"
        >
          Logout
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
