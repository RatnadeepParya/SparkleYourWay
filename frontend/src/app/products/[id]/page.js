"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ref, get } from "firebase/database";
import { db } from "../../../lib/firebase";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const snap = await get(ref(db, `products/${id}`));
        if (snap.exists()) {
          setProduct(snap.val());
        } else {
          setProduct(null);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-10">Loading product...</p>;
  }

  if (!product) {
    return (
      <p className="text-center mt-10 text-gray-600">Product not found.</p>
    );
  }

  return (
    <section className="container mx-auto px-6 py-12 grid md:grid-cols-2 gap-8">
      {/* Product Image */}
      {product.imageURL ? (
        <img
          src={product.imageURL}
          alt={product.name}
          className="rounded-lg shadow h-96 w-full object-cover"
        />
      ) : (
        <div className="bg-gray-200 h-96 rounded"></div>
      )}

      {/* Product Details */}
      <div>
        <h1 className="text-3xl font-semibold">{product.name}</h1>
        <p className="text-pink-600 text-xl font-bold mt-2">₹{product.price}</p>
        <p className="text-gray-600 mt-4">{product.description}</p>
        <p className="mt-2 text-gray-500">Stock: {product.stock}</p>

        <button className="mt-6 px-6 py-3 bg-pink-600 text-white rounded hover:bg-pink-700">
          Add to Cart
        </button>
      </div>
    </section>
  );
}
