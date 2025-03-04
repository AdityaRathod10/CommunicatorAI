"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
            >
              huly
            </Link>
            {/* Navigation Links */}
            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-6">
                {["Pricing", "Resources", "Community", "Download"].map((item) => (
                  <Link
                    key={item}
                    href="#"
                    className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Authentication Buttons */}
          <div className="flex items-center space-x-4">
            <SignedOut>
              {pathname === "/" ? (
                <>
                  <SignInButton>
                    <Button
                      variant="ghost"
                      className="text-sm text-gray-300 hover:text-white transition-all"
                    >
                      Sign In
                    </Button>
                  </SignInButton>
                  <SignUpButton>
                    <Button className="text-sm px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-md hover:opacity-90 transition-all">
                      Get Started
                    </Button>
                  </SignUpButton>
                </>
              ) : null}
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  );
}
