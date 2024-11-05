// src/app/landing/page.js
import localFont from "next/font/local";
import "../globals.css";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-500">
      <h1 className="text-5xl font-bold text-white mb-8">Welcome to Our App</h1>
      <div className="space-x-4">
        <Link href="/auth/signin">
          <button className="bg-white text-blue-500 font-bold py-2 px-4 rounded">
            Sign In
          </button>
        </Link>
        <Link href="/auth/register">
          <button className="bg-white text-blue-500 font-bold py-2 px-4 rounded">
            Register
          </button>
        </Link>
      </div>
    </div>
  );
}
