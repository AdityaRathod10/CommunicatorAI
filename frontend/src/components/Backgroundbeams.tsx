import React from "react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

export function BackgroundBeams() {
  return (
    <div className="fixed inset-0 -z-10 w-full h-full">
      <BackgroundBeamsWithCollision>
        <div />
      </BackgroundBeamsWithCollision>
    </div>
  );
}
