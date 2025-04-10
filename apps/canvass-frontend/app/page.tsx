"use client";

import { Button } from "@repo/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center overflow-hidden px-4 py-10">
      {/* Background Glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/2 w-[60vw] h-[60vw] -translate-x-1/2 bg-blue-500 opacity-30 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 right-1/2 w-[50vw] h-[50vw] translate-x-1/3 bg-purple-500 opacity-20 blur-[120px] rounded-full" />
      </div>

      {/* Logo */}
      <motion.div
        className="text-4xl font-extrabold text-center mb-10 tracking-wide z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        ✏️ Canvass<span className="text-blue-500">Draw</span>
      </motion.div>

      {/* Hero Card */}
      <motion.div
        className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl px-10 py-12 max-w-2xl text-center z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Typewriter Heading */}
        <h1 className="text-3xl sm:text-5xl font-bold mb-4 leading-tight">
          <Typewriter
            words={["Visualize Ideas Instantly", "Collaborate in Real Time", "Draw. Sketch. Create."]}
            loop={true}
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1500}
          />
        </h1>

        <p className="text-gray-300 text-lg mb-10">
          A minimal, real-time whiteboard tool for drawing, sketching, and collaborating visually with ease.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/signin">
              <Button
                variant="primary"
                size="lg"
                className="w-40 text-base font-semibold"
              >
                🔐 Sign In
              </Button>
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/signup">
              <Button
                variant="outlined"
                size="lg"
                className="w-40 text-base font-semibold border-white/50 hover:border-white"
              >
                📝 Sign Up
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.footer
        className="mt-16 text-gray-500 text-sm text-center z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        © {new Date().getFullYear()} CanvassDraw. Built with ❤️ using Next.js & Tailwind CSS.
      </motion.footer>
    </main>
  );
}
