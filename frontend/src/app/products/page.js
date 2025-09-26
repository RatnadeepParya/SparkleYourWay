export default function Products() {
  const products = [
    { id: 1, name: "Diamond Ring", price: "₹5000" },
    { id: 2, name: "Gold Necklace", price: "₹10000" },
    { id: 3, name: "Silver Earrings", price: "₹15000" },
    { id: 4, name: "Platinum Bracelet", price: "₹20000" },
  ];

  return (
    <section className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold text-center mb-8">All Products</h1>
      <div className="grid md:grid-cols-3 gap-8">
        {products.map((p) => (
          <div key={p.id} className="border rounded-lg p-6 text-center shadow">
            <div className="h-40 bg-gray-200 mb-4 rounded"></div>
            <h3 className="text-xl font-semibold">{p.name}</h3>
            <p className="text-pink-600 font-bold mt-2">{p.price}</p>
            <button className="mt-4 px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
