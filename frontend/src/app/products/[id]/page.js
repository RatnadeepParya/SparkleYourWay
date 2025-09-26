"use client";

import { useParams } from "next/navigation";

export default function ProductDetails() {
  const { id } = useParams();

  // Example data (later we’ll fetch from backend)
  const products = {
    1: {
      name: "Diamond Ring",
      price: "₹5000",
      desc: "Elegant diamond ring with premium cut.",
    },
    2: {
      name: "Gold Necklace",
      price: "₹10000",
      desc: "Pure 22k gold necklace.",
    },
    3: {
      name: "Silver Earrings",
      price: "₹15000",
      desc: "Stylish silver earrings with intricate design.",
    },
    4: {
      name: "Platinum Bracelet",
      price: "₹20000",
      desc: "Luxury platinum bracelet for special occasions.",
    },
  };

  const product = products[id] || {
    name: "Product Not Found",
    price: "-",
    desc: "-",
  };

  return (
    <section className="container mx-auto px-6 py-12 grid md:grid-cols-2 gap-8">
      {/* Product Image */}
      <div className="bg-gray-200 h-96 rounded"></div>

      {/* Product Details */}
      <div>
        <h1 className="text-3xl font-semibold">{product.name}</h1>
        <p className="text-pink-600 text-xl font-bold mt-2">{product.price}</p>
        <p className="text-gray-600 mt-4">{product.desc}</p>

        <button className="mt-6 px-6 py-3 bg-pink-600 text-white rounded hover:bg-pink-700">
          Add to Cart
        </button>
      </div>
    </section>
  );
}
