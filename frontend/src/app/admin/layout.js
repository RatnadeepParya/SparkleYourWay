"use client";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { ref, get } from "firebase/database";
import { auth, db } from "../../lib/firebase";
import { useRouter, usePathname } from "next/navigation";

export default function AdminLayout({ children }) {
  // hooks called in stable order every render
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // subscribe to auth changes
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setIsAdmin(false);
        setLoading(false);
        // if on admin sub-route other than /admin, go to login
        if (pathname !== "/admin") router.push("/admin");
        return;
      }
      try {
        const snap = await get(ref(db, `admins/${user.uid}`));
        const adminFlag = snap.exists() && snap.val() === true;
        setIsAdmin(adminFlag);
        if (!adminFlag) {
          // not an admin -> sign out and redirect
          await signOut(auth);
          router.push("/admin");
        } else {
          // authorized admin
          if (pathname === "/admin") {
            router.push("/admin/dashboard");
          }
        }
      } catch (err) {
        console.error("Error checking admin flag:", err);
      } finally {
        setLoading(false);
      }
    });
    return () => unsub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, pathname]); // router and pathname stable

  // while we check auth/admin
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading admin...
      </div>
    );
  }

  // If this is the login route (/admin) we show children (login page) without sidebar
  if (pathname === "/admin") {
    return <>{children}</>;
  }

  // Protect routes: if not admin, show message (should be redirected already)
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Unauthorized — redirecting...
      </div>
    );
  }

  // Admin layout with sidebar
  return (
    <div className="flex min-h-screen bg-gray-50">
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
        <div>
          <button
            onClick={async () => {
              await signOut(auth);
              router.push("/admin");
            }}
            className="bg-red-600 hover:bg-red-700 py-2 px-3 rounded-lg"
          >
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
