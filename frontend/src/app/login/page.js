export default function Login() {
  return (
    <section className="container mx-auto px-6 py-12 max-w-md">
      <h1 className="text-3xl font-semibold text-center mb-6">Login</h1>
      <form className="bg-white shadow rounded-lg p-6 space-y-4">
        <div>
          <label className="block text-sm mb-2">Email</label>
          <input
            type="email"
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-pink-500"
          />
        </div>
        <div>
          <label className="block text-sm mb-2">Password</label>
          <input
            type="password"
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-pink-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700"
        >
          Login
        </button>
      </form>
    </section>
  );
}
