"use client";
import { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { auth, db, storage } from "../../../lib/firebase";

export default function Dashboard() {
  const [stats, setStats] = useState({ products: 0, featured: 0 });

  useEffect(() => {
    const productsRef = ref(db, "products");
    onValue(productsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const allProducts = Object.values(data);
        setStats({
          products: allProducts.length,
          featured: allProducts.filter((p) => p.featured).length,
        });
      }
    });
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold">Total Products</h2>
          <p className="text-3xl font-bold text-amber-700">{stats.products}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold">Featured</h2>
          <p className="text-3xl font-bold text-amber-700">{stats.featured}</p>
        </div>
      </div>
    </div>
  );
}
