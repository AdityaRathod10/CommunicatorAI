"use client";

import { motion } from 'framer-motion';
import { MessageSquare, Brain, RefreshCw, LineChart } from 'lucide-react';

const features = [
  {
    icon: <MessageSquare className="w-8 h-8 text-blue-400" />,
    title: "Real-time Language Translation",
    description: "Break language barriers with instant, accurate translations across Indian languages."
  },
  {
    icon: <Brain className="w-8 h-8 text-purple-400" />,
    title: "AI-Powered Conversation Summaries",
    description: "Get smart summaries of client interactions in your preferred language."
  },
  {
    icon: <RefreshCw className="w-8 h-8 text-blue-400" />,
    title: "Automated Follow-ups",
    description: "Never miss a lead with smart, multilingual follow-up automation."
  },
  {
    icon: <LineChart className="w-8 h-8 text-purple-400" />,
    title: "Actionable Insights",
    description: "Make data-driven decisions with AI-powered communication analytics."
  }
];

export function Features() {
  return (
    <section id="features" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/20" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Powerful Features for Modern Real Estate
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Transform your communication with cutting-edge AI technology
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-lg p-6 rounded-xl transition-transform duration-300 hover:-translate-y-2 group"
            >
              <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
              <p className="text-gray-300 mb-6">{feature.description}</p>
              <div className="absolute bottom-6 left-6 right-6">
                <button className="text-blue-400 hover:text-blue-300 transition-colors flex items-center">
                  Learn more
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}