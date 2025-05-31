"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
type CourtZone = {
  id: string;
  name: string;
  description: string;
  x: number;
  y: number;
  width: number;
  height: number;
};
export function InteractiveCourt() {
  const [activeZone, setActiveZone] = useState<string | null>(null);
  const courtZones: CourtZone[] = [{
    id: "kitchen",
    name: "Non-Volley Zone (Kitchen)",
    description: "Players cannot volley the ball while standing in this zone.",
    x: 20,
    y: 20,
    width: 60,
    height: 14
  }, {
    id: "service-court",
    name: "Service Court",
    description: "The area where the ball must land during a serve.",
    x: 20,
    y: 34,
    width: 60,
    height: 32
  }, {
    id: "baseline",
    name: "Baseline",
    description: "The back boundary line of the court.",
    x: 20,
    y: 66,
    width: 60,
    height: 14
  }];
  return <div className="mt-8 relative mx-auto max-w-xl" data-unique-id="009f0736-f6b3-4c18-9546-d5fd6f6989cf" data-file-name="components/interactive-court.tsx" data-dynamic-text="true">
      {/* Court SVG */}
      <svg viewBox="0 0 100 100" className="w-full h-auto rounded-lg shadow-md border border-border bg-court/30" data-unique-id="ac26f619-21cb-4ad5-b8bd-5a022b335993" data-file-name="components/interactive-court.tsx" data-dynamic-text="true">
        {/* Court outline */}
        <rect x="20" y="20" width="60" height="60" stroke="currentColor" strokeWidth="1" fill="transparent" className="text-foreground" />
        
        {/* Net line */}
        <line x1="20" y1="50" x2="80" y2="50" stroke="currentColor" strokeWidth="1.5" className="text-foreground" />
        
        {/* Non-volley zone (kitchen) lines */}
        <line x1="20" y1="34" x2="80" y2="34" stroke="currentColor" strokeWidth="1" strokeDasharray="1,1" className="text-foreground" />
        <line x1="20" y1="66" x2="80" y2="66" stroke="currentColor" strokeWidth="1" strokeDasharray="1,1" className="text-foreground" />
        
        {/* Service court divider */}
        <line x1="50" y1="20" x2="50" y2="80" stroke="currentColor" strokeWidth="1" strokeDasharray="1,1" className="text-foreground" />
        
        {/* Interactive zones */}
        {courtZones.map(zone => <motion.rect key={zone.id} x={zone.x} y={zone.y} width={zone.width} height={zone.height} fill={activeZone === zone.id ? "currentColor" : "transparent"} className={`cursor-pointer ${activeZone === zone.id ? "text-primary/30" : "text-transparent hover:text-primary/10"}`} stroke={activeZone === zone.id ? "currentColor" : "transparent"} strokeWidth="1" onMouseEnter={() => setActiveZone(zone.id)} onMouseLeave={() => setActiveZone(null)} whileHover={{
        scale: 1.02
      }} transition={{
        duration: 0.2
      }} />)}
      </svg>
      
      {/* Information tooltip */}
      <AnimatePresence>
        {activeZone && <motion.div initial={{
        opacity: 0,
        y: 10
      }} animate={{
        opacity: 1,
        y: 0
      }} exit={{
        opacity: 0,
        y: 10
      }} transition={{
        duration: 0.2
      }} className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-full mt-4 p-4 bg-card rounded-lg shadow-lg border border-border max-w-sm z-10" data-unique-id="53480798-d0a9-44a2-9db2-fb4ec44cd46c" data-file-name="components/interactive-court.tsx">
            <h4 className="font-semibold mb-1" data-unique-id="4212c6f8-a688-4a1c-a6e6-ad18b8a7fae1" data-file-name="components/interactive-court.tsx" data-dynamic-text="true">
              {courtZones.find(z => z.id === activeZone)?.name}
            </h4>
            <p className="text-sm text-foreground/80" data-unique-id="c3d395e3-e59d-4ae4-b30c-a7f0f850ffd2" data-file-name="components/interactive-court.tsx" data-dynamic-text="true">
              {courtZones.find(z => z.id === activeZone)?.description}
            </p>
          </motion.div>}
      </AnimatePresence>
    </div>;
}