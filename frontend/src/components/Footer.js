export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-10">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Sparkle Your Way · All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
