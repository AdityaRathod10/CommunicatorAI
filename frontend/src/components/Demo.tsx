"use client";

import { motion } from 'framer-motion';
import { MessageCircle, Languages, Bot } from 'lucide-react';

export function Demo() {
  return (
    <section id="demo" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-transparent to-blue-900/20" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Experience the Future of Real Estate Communication
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              See how CommunicatorAI transforms your multilingual client interactions in real-time.
            </p>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-500/20 p-3 rounded-lg">
                  <Languages className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Real-time Translation</h3>
                  <p className="text-gray-300">Instantly translate between multiple Indian languages with high accuracy.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-purple-500/20 p-3 rounded-lg">
                  <Bot className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">AI-Powered Understanding</h3>
                  <p className="text-gray-300">Smart context awareness and natural language processing for better communication.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-blue-500/20 p-3 rounded-lg">
                  <MessageCircle className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Seamless Integration</h3>
                  <p className="text-gray-300">Works with your existing communication channels and CRM systems.</p>
                </div>
              </div>
            </div>
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg 
         hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg mt-8">
              Try Demo
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-2xl glass-effect p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
              <div className="relative z-10 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                </div>
                <div className="flex-1 overflow-hidden">
                  {/* Interactive Demo Content */}
                  <div className="space-y-4">
                    <div className="bg-white/10 rounded-lg p-4">
                      <p className="text-sm text-blue-200 mb-1">Agent (English)</p>
                      <p className="text-white">What type of property are you looking for?</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4 ml-8">
                      <p className="text-sm text-purple-200 mb-1">Client (Hindi)</p>
                      <p className="text-white">मैं एक 3 बेडरूम अपार्टमेंट ढूंढ रहा हूं</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4">
                      <p className="text-sm text-green-200 mb-1">AI Translation</p>
                      <p className="text-white">I am looking for a 3 bedroom apartment</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}