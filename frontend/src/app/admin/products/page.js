"use client";
import { useEffect, useState } from "react";
import { ref as dbRef, onValue, push, remove, update } from "firebase/database";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "../../../lib/firebase";
import toast from "react-hot-toast";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    featured: false,
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🧭 Fetch products
  useEffect(() => {
    const pRef = dbRef(db, "products");
    const unsub = onValue(pRef, (snap) => {
      const val = snap.val() || {};
      const arr = Object.entries(val).map(([key, v]) => ({ id: key, ...v }));
      setProducts(arr);
    });
    return () => unsub();
  }, []);

  const resetForm = () => {
    setForm({
      name: "",
      category: "",
      price: "",
      stock: "",
      description: "",
      featured: false,
    });
    setImageFile(null);
    setImagePreview("");
    setEditingId(null);
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrl = form.imageURL || "";
      if (imageFile) {
        const sRef = storageRef(
          storage,
          `products/${Date.now()}_${imageFile.name}`
        );
        await uploadBytes(sRef, imageFile);
        imageUrl = await getDownloadURL(sRef);
      }

      const payload = {
        name: form.name.trim(),
        category: form.category.trim(),
        price: Number(form.price || 0),
        stock: Number(form.stock || 0),
        description: form.description.trim(),
        imageURL: imageUrl,
        featured: Boolean(form.featured),
        createdAt: Date.now(),
      };

      if (editingId) {
        await update(dbRef(db, `products/${editingId}`), payload);
        toast.success("Product updated successfully!");
      } else {
        await push(dbRef(db, "products"), payload);
        toast.success("Product added successfully!");
      }

      resetForm();
    } catch (err) {
      console.error(err);
      toast.error("Error saving product: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (p) => {
    setEditingId(p.id);
    setForm({
      name: p.name || "",
      category: p.category || "",
      price: p.price || "",
      stock: p.stock || "",
      description: p.description || "",
      featured: !!p.featured,
      imageURL: p.imageURL || "",
    });
    setImagePreview(p.imageURL || "");
    setImageFile(null);
  };

  const handleDelete = async (id, imageURL) => {
    if (!confirm("Delete this product?")) return;
    try {
      await remove(dbRef(db, `products/${id}`));
      if (imageURL) {
        try {
          const imgRef = storageRef(storage, imageURL);
          await deleteObject(imgRef);
        } catch {
          console.warn("Could not delete image from storage");
        }
      }
      toast.success("Product deleted!");
    } catch (err) {
      console.error(err);
      toast.error("Delete failed: " + err.message);
    }
  };

  const filteredProducts = products
    .filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return b.createdAt - a.createdAt;
        case "oldest":
          return a.createdAt - b.createdAt;
        case "priceLow":
          return a.price - b.price;
        case "priceHigh":
          return b.price - a.price;
        case "featured":
          return b.featured - a.featured;
        default:
          return 0;
      }
    });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-9 gap-6 h-[calc(100vh-80px)]">
      {/* 📋 Product List */}
      <div className="lg:col-span-5 flex flex-col bg-white shadow rounded-lg overflow-hidden">
        {/* 🔍 Search + Sort */}
        <div className="sticky top-0 z-10 bg-white border-b px-6 py-4 flex flex-col sm:flex-row justify-between gap-3">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-3 py-2 rounded flex-1"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border px-3 py-2 rounded"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="priceLow">Price: Low → High</option>
            <option value="priceHigh">Price: High → Low</option>
            <option value="featured">Featured First</option>
          </select>
        </div>

        {/* 🧱 Product Grid (scrollable only here) */}
        <div className="overflow-y-auto p-6 flex-1">
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                className="bg-gray-50 border rounded-lg p-4 shadow-sm hover:shadow-md transition"
              >
                {p.imageURL ? (
                  <img
                    src={p.imageURL}
                    alt={p.name}
                    className="h-36 w-full object-cover rounded mb-3"
                  />
                ) : (
                  <div className="h-36 bg-gray-200 rounded mb-3" />
                )}
                <h3 className="font-semibold truncate">
                  {p.name}{" "}
                  {p.featured && (
                    <span className="ml-1 text-yellow-500">⭐</span>
                  )}
                </h3>
                <p className="text-pink-600 font-bold">₹{p.price}</p>
                <p className="text-sm text-gray-500">
                  {p.category || "Uncategorized"} | Stock: {p.stock}
                </p>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleEdit(p)}
                    className="px-3 py-1 border rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id, p.imageURL)}
                    className="px-3 py-1 bg-red-600 text-white rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <p className="text-center text-gray-500 mt-6">No products found.</p>
          )}
        </div>
      </div>

      {/* 🧾 Right Panel (sticky form) */}
      <div className="lg:col-span-4 bg-white p-6 rounded-lg shadow overflow-y-auto sticky top-0 h-[calc(100vh-80px)]">
        <h1 className="text-2xl font-bold mb-6">
          {editingId ? "Edit Product" : "Add Product"}
        </h1>

        <form onSubmit={handleAddOrUpdate} className="grid gap-3">
          <input
            required
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border px-3 py-2 rounded"
          />
          <input
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="border px-3 py-2 rounded"
          />
          <input
            required
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="border px-3 py-2 rounded"
          />
          <input
            type="number"
            placeholder="Stock"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
            className="border px-3 py-2 rounded"
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="border px-3 py-2 rounded"
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
            />
            <span>Featured</span>
          </label>

          <div className="flex flex-col gap-3">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                setImageFile(file || null);
                if (file) setImagePreview(URL.createObjectURL(file));
              }}
            />
            {imagePreview && (
              <div className="relative w-fit">
                <img
                  src={imagePreview}
                  alt="preview"
                  className="h-20 w-20 object-cover rounded border"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImageFile(null);
                    setImagePreview("");
                  }}
                  className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          <div className="flex gap-4 mt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-amber-700 text-white px-4 py-2 rounded"
            >
              {loading
                ? "Saving..."
                : editingId
                ? "Update Product"
                : "Add Product"}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 border rounded"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
