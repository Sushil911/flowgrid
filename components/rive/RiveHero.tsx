import React from 'react';
import Rive, { Fit, Layout, Alignment } from '@rive-app/react-canvas';

const RiveHero: React.FC = () => {
  // Using the component directly is often more robust in ESM environments than the hook with class imports
  // If Layout/Fit/Alignment fail to import, we'll rely on default behavior or CSS scaling
  return (
    <div className="relative w-full h-[400px] md:h-[600px] flex items-center justify-center overflow-hidden rounded-2xl border border-white/5 bg-[#080808] shadow-2xl group">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-brand-red/5 opacity-50 blur-3xl group-hover:opacity-70 transition-opacity duration-1000" />
      
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="absolute inset-0 z-10 opacity-90 mix-blend-screen scale-110">
         {/* We simply render the Rive component. The 'bumpy' state machine is standard for the vehicles demo. */}
         <Rive 
            src="https://cdn.rive.app/animations/vehicles.riv"
            stateMachines="bumpy"
            className="w-full h-full object-cover"
         />
      </div>

      {/* Foreground UI Overlay to make it look like a dashboard */}
      <div className="absolute bottom-6 left-6 z-20 flex gap-4 pointer-events-none">
         <div className="px-4 py-2 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-xs font-mono text-gray-400">
            <span className="text-green-400">●</span> ENGINE_RPM: 4200
         </div>
         <div className="hidden md:block px-4 py-2 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-xs font-mono text-gray-400">
            <span className="text-brand-red">▲</span> VELOCITY: 120m/s
         </div>
      </div>
    </div>
  );
};

export default RiveHero;