"use client";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { ref, onValue } from "firebase/database";
import { db } from "../../lib/firebase";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    const prodRef = ref(db, "products");
    const unsub = onValue(prodRef, (snap) => {
      const val = snap.val() || {};
      const arr = Object.entries(val).map(([id, p]) => ({ id, ...p }));
      setProducts(arr);
    });
    return () => unsub();
  }, []);

  // Unique categories for dropdown
  const categories = useMemo(() => {
    const cats = Array.from(
      new Set(products.map((p) => p.category?.trim()).filter(Boolean))
    );
    return ["All", ...cats];
  }, [products]);

  // Filter + Sort Logic
  const filtered = useMemo(() => {
    let list = products
      .filter((p) => p.name.toLowerCase().includes(search.toLowerCase().trim()))
      .filter((p) =>
        category === "All"
          ? true
          : p.category?.toLowerCase() === category.toLowerCase()
      );

    switch (sort) {
      case "newest":
        list = list.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
        break;
      case "oldest":
        list = list.sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
        break;
      case "low":
        list = list.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case "high":
        list = list.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case "featured":
        list = list.filter((p) => p.featured);
        break;
      default:
        break;
    }

    return list;
  }, [products, search, category, sort]);

  return (
    <section className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold text-center mb-8">
        Explore Our Jewellery
      </h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-10 items-center">
        {/* Search */}
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded-lg w-full md:w-1/3 focus:ring-2 focus:ring-pink-500"
        />

        {/* Category Filter */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 border rounded-lg w-full md:w-1/4 focus:ring-2 focus:ring-pink-500"
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="px-4 py-2 border rounded-lg w-full md:w-1/4 focus:ring-2 focus:ring-pink-500"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="low">Price: Low → High</option>
          <option value="high">Price: High → Low</option>
          <option value="featured">Featured Only</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filtered.length > 0 ? (
          filtered.map((p) => (
            <div
              key={p.id}
              className="border rounded-lg p-6 text-center shadow hover:shadow-xl transition transform hover:-translate-y-1"
            >
              {p.imageURL ? (
                <img
                  src={p.imageURL}
                  alt={p.name}
                  className="h-48 w-full object-cover rounded mb-4"
                />
              ) : (
                <div className="h-48 bg-gray-200 rounded mb-4" />
              )}
              <h3 className="text-lg font-semibold flex items-center justify-center">
                {p.name}{" "}
                {p.featured && <span className="ml-1 text-yellow-500">⭐</span>}
              </h3>

              {p.category && (
                <p className="text-sm text-gray-500 mt-1">{p.category}</p>
              )}
              <p className="text-pink-600 font-bold mt-2">₹{p.price}</p>

              <Link
                href={`/products/${p.id}`}
                className="mt-4 inline-block px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
              >
                View Details
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No products found.
          </p>
        )}
      </div>
    </section>
  );
}
