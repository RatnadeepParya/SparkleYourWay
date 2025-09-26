export default function Checkout() {
  return (
    <section className="container mx-auto px-6 py-12 max-w-2xl">
      <h1 className="text-3xl font-semibold mb-6">Checkout</h1>
      <form className="bg-white shadow rounded-lg p-6 space-y-4">
        <div>
          <label className="block text-sm mb-2">Full Name</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-pink-500"
          />
        </div>
        <div>
          <label className="block text-sm mb-2">Address</label>
          <textarea className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-pink-500"></textarea>
        </div>
        <div>
          <label className="block text-sm mb-2">Payment Method</label>
          <select className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-pink-500">
            <option>Credit / Debit Card</option>
            <option>UPI</option>
            <option>Cash on Delivery</option>
          </select>
        </div>
        <button className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700">
          Place Order
        </button>
      </form>
    </section>
  );
}
