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
          <Link
            href="/"
            className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            CommunicatorAI
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {["Features", "Demo", "Contact"].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-white hover:text-blue-200 transition-colors"
              >
                {item}
              </Link>
            ))}
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
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation (Includes Sign In & Sign Up) */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden mt-2 bg-white/10 rounded-lg p-6 space-y-6 flex flex-col items-center"
            >
              {["Features", "Demo", "Contact"].map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-white hover:text-blue-200 transition-colors text-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}

              <SignedOut>
                {pathname === "/" && (
                  <div className="flex flex-col space-y-4 w-full">
                    <SignInButton>
                      <Button variant="ghost" className="w-full text-lg text-gray-300 hover:text-white transition-all">
                        Sign In
                      </Button>
                    </SignInButton>
                    <SignUpButton>
                      <Button className="w-full text-lg px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-md hover:opacity-90 transition-all">
                        Get Started
                      </Button>
                    </SignUpButton>
                  </div>
                )}
              </SignedOut>

              <SignedIn>
                <UserButton />
              </SignedIn>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}