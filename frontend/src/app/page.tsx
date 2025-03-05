import {Hero} from "@/components/Hero"
import {Features} from "@/components/Features"
import {CTA} from "@/components/CTA"
import {Footer} from "@/components/Footer"
import ElevenLabsAgent from "@/components/ElevenLabsAgent.tsx"

export default function Home() {
  return (
    <div className="relative w-full min-h-screen flex flex-col">
      {/* Background gradients */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        <div className="absolute right-0 top-0 h-[500px] w-[500px] bg-blue-500/10 blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] bg-purple-500/10 blur-[100px]" />
      </div>

      <div className="relative z-10 flex-grow flex flex-col">
        <div className="container mx-auto px-4 max-w-7xl w-full flex-grow flex flex-col">
          <Hero />
          <Features />
          <CTA />
          <ElevenLabsAgent />
        </div>
        <Footer />
      </div>
    </div>
  )
}