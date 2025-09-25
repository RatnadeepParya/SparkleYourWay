import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center bg-gradient-to-r from-pink-100 via-white to-pink-50">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Sparkle Your Way ✨
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Discover timeless jewellery pieces that define elegance.
          </p>
          <Link
            href="/products"
            className="px-6 py-3 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Featured Collection
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {["Diamond Ring", "Gold Necklace", "Silver Earrings"].map(
            (item, i) => (
              <div
                key={i}
                className="border rounded-2xl shadow-sm p-6 text-center hover:shadow-md transition"
              >
                <div className="h-40 bg-gray-200 rounded-xl mb-4"></div>
                <h3 className="text-lg font-medium">{item}</h3>
                <p className="text-pink-600 mt-2 font-semibold">
                  ₹{(i + 1) * 5000}
                </p>
                <button className="mt-4 px-4 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700">
                  Add to Cart
                </button>
              </div>
            )
          )}
        </div>
      </section>
    </div>
  );
}
