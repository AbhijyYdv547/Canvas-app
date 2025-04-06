import { Button } from "@repo/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return(
 <main className="min-h-screen bg-black text-white flex flex-col items-center justify-between px-4 py-10">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center flex-grow text-center">
        {/* Logo */}
        <div className="mb-6 text-3xl font-bold tracking-wide">
          ✏️ Canvass<span className="text-blue-500">Draw</span>
        </div>

        {/* Glass Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-10 max-w-xl shadow-xl">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Visualize Ideas Instantly
          </h1>
          <p className="text-lg text-gray-300 mb-10">
            A minimal, real-time whiteboard tool for drawing, sketching, and collaborating visually.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={"/signin"}>
            <Button
              variant="primary" size="lg">
              🔐 Sign In
            </Button>
            </Link>
            <Link href={"/signup"}>
            <Button
              variant="outlined" size="lg"
              >
              📝 Sign Up
            </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-gray-500 text-sm text-center">
        © {new Date().getFullYear()} Excalidraw Clone. Built with ❤️ using Next.js & Tailwind CSS.
      </footer>
    </main>
  );
}
