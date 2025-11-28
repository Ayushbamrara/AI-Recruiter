"use client"
import { useState, useEffect } from "react";
import Link  from "next/link";
import Image from "next/image";

export default function Home() {
  const words = ["Made Easier", "Made Smarter", "Made Faster"];
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(120);

  useEffect(() => {
    const currentWord = words[wordIndex];
    
    let typingInterval = setTimeout(() => {
      if (!isDeleting) {
        // typing
        setText(currentWord.substring(0, text.length + 1));
        if (text.length + 1 === currentWord.length) {
          setTimeout(() => setIsDeleting(true), 1000); // wait before deleting
        }
      } else {
        // deleting
        setText(currentWord.substring(0, text.length - 1));
        if (text.length - 1 === 0) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, speed);

    return () => clearTimeout(typingInterval);
  }, [text, isDeleting]);

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Navbar */}
      <nav className="flex items-center justify-between px-10 py-6 bg-white shadow-sm">
        <Image
            src="/logo.png"
            width={150}
            height={150}
            alt="AI Recruiter Logo"
            className="object-contain"
          />
        <div className="space-x-6 text-gray-700 font-medium">
          <a href="/features" className="hover:text-blue-600">Features</a>
          <a href="#pricing" className="hover:text-blue-600">Pricing</a>
          <a href="/contactUs" className="hover:text-blue-600">Contact Us</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-10 py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-900 leading-tight">
          AI-Driven Interviews  
          <span className="text-5xl font-bold text-blue-600 ml-3 h-16 inline-block">
          {text}
          <span className="border-r-4 border-blue-600 ml-2 animate-pulse"></span>
        </span>
        </h1>

        <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
          Conduct smart interviews, schedule automatically, analyze responses
          and hire faster with our AI-powered recruitment assistant.
        </p>

        <Link href="/auth">
          <button className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition">
            Get Started
          </button>
        </Link>
      </section>

      {/* Features Section */}
      <section id="features" className="px-10 py-16 bg-white">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Powerful Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          <div className="p-6 bg-gray-100 rounded-xl shadow">
            <h3 className="font-bold text-xl mb-2">AI-based Questions</h3>
            <p className="text-gray-600">Generate dynamic interview questions using AI.</p>
          </div>

          <div className="p-6 bg-gray-100 rounded-xl shadow">
            <h3 className="font-bold text-xl mb-2">Auto Scheduling</h3>
            <p className="text-gray-600">Easily schedule interviews for candidates.</p>
          </div>

          <div className="p-6 bg-gray-100 rounded-xl shadow">
            <h3 className="font-bold text-xl mb-2">Smart Analytics</h3>
            <p className="text-gray-600">Get performance insights from interview data.</p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-600 bg-gray-100 mt-10">
        © {new Date().getFullYear()} AIcruiter — All Rights Reserved.
      </footer>
    </div>
  );
}
