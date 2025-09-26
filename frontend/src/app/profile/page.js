export default function Profile() {
  const orders = [
    { id: 1, item: "Diamond Ring", status: "Delivered" },
    { id: 2, item: "Gold Necklace", status: "Shipped" },
  ];

  return (
    <section className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold mb-6">My Profile</h1>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">My Orders</h2>
        <ul className="space-y-2">
          {orders.map((o) => (
            <li key={o.id} className="flex justify-between border-b py-2">
              <span>{o.item}</span>
              <span className="text-sm text-gray-500">{o.status}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
