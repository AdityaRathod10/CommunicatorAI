// components/ElevenLabsAgent.tsx
'use client'
import { useEffect } from "react";

const ElevenLabsAgent = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://elevenlabs.io/convai-widget/index.js";
    script.async = true;
    script.type = "text/javascript";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <elevenlabs-convai agent-id="x0jop77uzy1oBxi0IONe"></elevenlabs-convai>
    </div>
  );
};

export default ElevenLabsAgent;
