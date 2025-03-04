import { Hero } from "@/components/Hero"
import { Features } from "@/components/Features"
import { Demo } from '@/components/Demo';
import { CTA } from "@/components/CTA"
import { Footer } from "@/components/Footer"
import ElevenLabsAgent from "@/components/ElevenLabsAgent.tsx";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#1a237e] to-[#4a148c]">
      <Hero />
      <Features />
      <Demo />
      <CTA />
      <Footer />
      <ElevenLabsAgent/>
    </main>
  );
}