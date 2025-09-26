import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-pink-100 py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-800">
          Sparkle Your Way ✨
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Luxury Jewellery for Every Occasion
        </p>
        <Link
          href="/products"
          className="mt-6 inline-block px-6 py-3 bg-pink-600 text-white rounded-lg shadow hover:bg-pink-700"
        >
          Shop Now
        </Link>
      </section>

      {/* Featured Collections */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-semibold text-center mb-10">
          Featured Collections
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          {["Rings", "Necklaces", "Earrings", "Bracelets"].map((cat) => (
            <div
              key={cat}
              className="bg-gray-100 rounded-lg p-6 text-center hover:shadow-lg transition"
            >
              <div className="h-40 bg-gray-300 rounded mb-4"></div>
              <h3 className="text-xl font-semibold">{cat}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center mb-10">
            Best Sellers
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: "Diamond Ring", price: "₹5000" },
              { name: "Gold Necklace", price: "₹10000" },
              { name: "Silver Earrings", price: "₹15000" },
              { name: "Platinum Bracelet", price: "₹20000" },
            ].map((p, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow hover:shadow-lg p-6 text-center"
              >
                <div className="h-40 bg-gray-200 rounded mb-4"></div>
                <h3 className="text-lg font-semibold">{p.name}</h3>
                <p className="text-pink-600 font-bold mt-2">{p.price}</p>
                <Link
                  href={`/products/${i + 1}`}
                  className="mt-4 inline-block px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-semibold text-center mb-10">
          Why Choose Us?
        </h2>
        <div className="grid md:grid-cols-4 gap-6 text-center">
          {[
            { title: "Free Shipping", desc: "On all orders above ₹5000" },
            {
              title: "Certified Jewellery",
              desc: "100% Hallmarked & Certified",
            },
            { title: "24/7 Support", desc: "Always here to help you" },
            { title: "Secure Payments", desc: "Trusted & Encrypted" },
          ].map((f, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-pink-50 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center mb-10">
            What Our Customers Say
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Priya",
                feedback:
                  "Absolutely loved my diamond ring! The quality is amazing.",
              },
              {
                name: "Rahul",
                feedback:
                  "Fast delivery and beautiful packaging. Highly recommend!",
              },
              {
                name: "Neha",
                feedback: "The gold necklace I bought is just stunning!",
              },
            ].map((t, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
              >
                <p className="text-gray-600 italic">“{t.feedback}”</p>
                <h4 className="mt-4 font-semibold">- {t.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="container mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-semibold mb-4">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-gray-600 mb-6">
          Get exclusive offers & updates directly to your inbox.
        </p>
        <div className="flex justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 border rounded-l-lg focus:ring-2 focus:ring-pink-500"
          />
          <button className="px-6 py-2 bg-pink-600 text-white rounded-r-lg hover:bg-pink-700">
            Subscribe
          </button>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-pink-600 text-white text-center py-16">
        <h2 className="text-3xl font-bold">Discover Your Sparkle Today ✨</h2>
        <Link
          href="/products"
          className="mt-6 inline-block px-6 py-3 bg-white text-pink-600 font-semibold rounded-lg shadow hover:bg-gray-100"
        >
          Start Shopping
        </Link>
      </section>
    </div>
  );
}
