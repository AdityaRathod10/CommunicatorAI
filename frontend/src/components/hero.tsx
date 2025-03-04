"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(26,35,126,0.5),rgba(74,20,140,0.5))]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Breaking Language Barriers in{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Real Estate</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-lg">
              Seamlessly manage multilingual conversations with AI-powered assistance.
              Transform your real estate communication today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="#features" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg 
         hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg flex items-center justify-center">
                <MessageCircle className="w-5 h-5 mr-2" />
                Get Early Access
              </Link>
              <Link href="#demo" className="bg-white/10 backdrop-blur-lg text-white font-semibold py-3 px-6 rounded-lg hover:bg-white/20 transition-all duration-300 flex items-center justify-center">
                See How It Works
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl glass-effect p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
              <div className="relative z-10">
                {/* Mock Chat Interface */}

                {/* Agent Message */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="bg-white/10 rounded-lg p-4 mb-4"
                >
                  <p className="text-blue-200">Agent</p>
                  <p className="text-white">Hello! How can I help you today?</p>
                </motion.div>

                {/* Client Message */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  className="bg-white/10 rounded-lg p-4 mb-4 ml-8"
                >
                  <p className="text-purple-200">Client</p>
                  <p className="text-white">नमस्ते! मैं 3BHK फ्लैट खोज रहा हूं</p>
                </motion.div>

                {/* AI Translation */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.5 }}
                  className="bg-white/10 rounded-lg p-4 mb-4"
                >
                  <p className="text-blue-200">AI Translation</p>
                  <p className="text-white">Hello! I am looking for a 3BHK flat</p>
                </motion.div>

                {/* Agent Message 2 */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 2 }}
                  className="bg-white/10 rounded-lg p-4 mb-4"
                >
                  <p className="text-blue-200">Agent</p>
                  <p className="text-white">Sure! Which location are you looking for?</p>
                </motion.div>

                {/* Client Message 2 */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 2.5 }}
                  className="bg-white/10 rounded-lg p-4 mb-4 ml-8"
                >
                  <p className="text-purple-200">Client</p>
                  <p className="text-white">Andheri या Bandra में कुछ अच्छा हो तो बताइए।</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}