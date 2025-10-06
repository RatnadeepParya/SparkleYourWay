"use client";
import { useEffect, useState } from "react";
import { ref as dbRef, onValue, push, remove, update } from "firebase/database";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { db, storage } from "../../../lib/firebase";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    featured: false,
  });
  const [imageFile, setImageFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

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
        name: form.name,
        category: form.category,
        price: Number(form.price || 0),
        stock: Number(form.stock || 0),
        description: form.description,
        imageURL: imageUrl,
        featured: Boolean(form.featured),
        createdAt: Date.now(),
      };

      if (editingId) {
        await update(dbRef(db, `products/${editingId}`), payload);
      } else {
        await push(dbRef(db, "products"), payload);
      }

      resetForm();
    } catch (err) {
      console.error(err);
      alert("Error saving product: " + err.message);
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    try {
      await remove(dbRef(db, `products/${id}`));
    } catch (err) {
      console.error(err);
      alert("Delete failed: " + err.message);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        {editingId ? "Edit Product" : "Add Product"}
      </h1>

      <form
        onSubmit={handleAddOrUpdate}
        className="bg-white p-6 rounded-lg shadow mb-8 grid gap-3"
      >
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

        <div className="flex gap-4 items-center">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          />
          {form.imageURL && !imageFile && (
            <img src={form.imageURL} alt="preview" className="h-16 rounded" />
          )}
        </div>

        <div className="flex gap-4">
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

      <h2 className="text-2xl font-semibold mb-4">All Products</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p.id} className="bg-white p-4 rounded-lg shadow">
            {p.imageURL ? (
              <img
                src={p.imageURL}
                alt={p.name}
                className="h-40 w-full object-cover rounded mb-3"
              />
            ) : (
              <div className="h-40 bg-gray-200 rounded mb-3" />
            )}
            <h3 className="font-semibold">{p.name}</h3>
            <p className="text-pink-600 font-bold">₹{p.price}</p>
            <p className="text-sm text-gray-500">Stock: {p.stock}</p>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => handleEdit(p)}
                className="px-3 py-1 border rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(p.id)}
                className="px-3 py-1 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
