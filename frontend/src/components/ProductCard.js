export default function ProductCard({ name, price }) {
  return (
    <div className="border rounded-xl shadow-sm p-4 hover:shadow-lg transition">
      <div className="h-40 bg-gray-200 rounded-lg mb-3"></div>
      <h3 className="font-medium">{name}</h3>
      <p className="text-pink-600 font-semibold">₹{price}</p>
      <button className="mt-3 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700">
        Add to Cart
      </button>
    </div>
  );
}
