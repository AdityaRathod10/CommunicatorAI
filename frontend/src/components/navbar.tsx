"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 backdrop-blur-md border-b border-white/10 ${
        isScrolled ? "glass-effect py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
            CommunicatorAI
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-white hover:text-blue-200 transition-colors">
              Features
            </Link>
            <Link href="#demo" className="text-white hover:text-blue-200 transition-colors">
              Demo
            </Link>
            <Link href="#contact" className="text-white hover:text-blue-200 transition-colors">
              Contact
            </Link>
            <Link href="#features" className="primary-button">
              Get Early Access
            </Link>
          </div>

          {/* Authentication & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <SignedOut>
              {pathname === "/" && (
                <>
                  <SignInButton>
                    <Button variant="ghost" className="text-sm text-gray-300 hover:text-white transition-all">
                      Sign In
                    </Button>
                  </SignInButton>
                  <SignUpButton>
                    <Button className="text-sm px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-md hover:opacity-90 transition-all">
                      Get Started
                    </Button>
                  </SignUpButton>
                </>
              )}
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-2"
            >
              <div className="flex flex-col space-y-4 py-4">
                <Link href="#features" className="text-white hover:text-blue-200 transition-colors" onClick={() => setIsMenuOpen(false)}>
                  Features
                </Link>
                <Link href="#demo" className="text-white hover:text-blue-200 transition-colors" onClick={() => setIsMenuOpen(false)}>
                  Demo
                </Link>
                <Link href="#contact" className="text-white hover:text-blue-200 transition-colors" onClick={() => setIsMenuOpen(false)}>
                  Contact
                </Link>
                <Link href="#features" className="primary-button inline-block text-center" onClick={() => setIsMenuOpen(false)}>
                  Get Early Access
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
