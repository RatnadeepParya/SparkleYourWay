export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-12">
      <div className="container mx-auto px-6 py-6 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Sparkle Your Way · All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
