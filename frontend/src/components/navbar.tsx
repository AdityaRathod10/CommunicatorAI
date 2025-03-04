"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  });
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [isSignupDialogOpen, setIsSignupDialogOpen] = useState(false);

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Login successful');
        setIsLoginDialogOpen(false);
        router.push('/dashboard');
      } else {
        toast.error(data.error || 'Login failed');
      }
    } catch (err) {
      toast.error('Network error. Please try again.');
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signupData.password !== signupData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: signupData.name,
          email: signupData.email,
          password: signupData.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Registration successful');
        setIsSignupDialogOpen(false);
        router.push('/login');
      } else {
        toast.error(data.error || 'Registration failed');
      }
    } catch (err) {
      toast.error('Network error. Please try again.');
    }
  };

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
                  {/* Clerk Sign In
                  <SignInButton>
                    <Button
                      variant="ghost"
                      className="text-sm text-gray-300 hover:text-white transition-all"
                    >
                      Clerk Sign In
                    </Button>
                  </SignInButton>

                  */}
                  
                  {/* Custom Login Dialog */}
                  <Dialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        className="text-sm text-gray-300 hover:text-white transition-all"
                      >
                        Custom Sign In
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Sign In to Your Account</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={loginData.email}
                            onChange={handleLoginChange}
                          />
                        </div>
                        <div>
                          <Label htmlFor="password">Password</Label>
                          <Input
                            id="password"
                            name="password"
                            type="password"
                            required
                            value={loginData.password}
                            onChange={handleLoginChange}
                          />
                        </div>
                        <Button type="submit" className="w-full">
                          Sign In
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>

                  {/* Clerk Sign Up
                  <SignUpButton>
                    <Button className="text-sm px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-md hover:opacity-90 transition-all">
                      Clerk Get Started
                    </Button>
                  </SignUpButton> */}
                  

                  {/* Custom Sign Up Dialog */}
                  <Dialog open={isSignupDialogOpen} onOpenChange={setIsSignupDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="text-sm px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-md hover:opacity-90 transition-all">
                        Custom Get Started
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create Your Account</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleSignup} className="space-y-4">
                        <div>
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={signupData.name}
                            onChange={handleSignupChange}
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={signupData.email}
                            onChange={handleSignupChange}
                          />
                        </div>
                        <div>
                          <Label htmlFor="password">Password</Label>
                          <Input
                            id="password"
                            name="password"
                            type="password"
                            required
                            value={signupData.password}
                            onChange={handleSignupChange}
                          />
                        </div>
                        <div>
                          <Label htmlFor="confirmPassword">Confirm Password</Label>
                          <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            required
                            value={signupData.confirmPassword}
                            onChange={handleSignupChange}
                          />
                        </div>
                        <Button type="submit" className="w-full">
                          Sign Up
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
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