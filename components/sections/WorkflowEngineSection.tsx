import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Filter, Database, Mail, Clock, ShieldCheck } from 'lucide-react';

// Enhanced 3D Icon with deeper shadows and better lighting
const ThreeDIcon = ({ icon, color, delay = 0 }: { icon: React.ReactNode, color: string, delay?: number }) => {
  const glowColor = color.replace('text-', 'bg-');
  
  return (
    <div className="w-16 h-16 relative flex items-center justify-center" style={{ perspective: '1000px' }}>
      <motion.div
        className="relative w-12 h-12 preserve-3d"
        style={{ rotateX: 55, rotateZ: -45 }}
        initial={{ rotateX: 55, rotateZ: -45, z: 0 }}
        animate={{ 
           y: [0, -6, 0],
        }}
        transition={{ 
           y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay },
        }}
      >
        {/* Realistic Drop Shadow - Multi-layer for depth */}
        <div className="absolute inset-0 bg-black/80 blur-md translate-z-[-40px] scale-110 rounded-xl opacity-70" />
        <div className="absolute inset-0 bg-black/40 blur-xl translate-z-[-50px] scale-150 rounded-full opacity-50" />
        <div className={`absolute inset-0 ${glowColor} blur-[20px] translate-z-[-30px] scale-120 opacity-20`} />

        {/* Extrusion Layers */}
        {[1, 2, 3, 4].map((i) => (
           <div 
             key={i}
             className="absolute inset-0 rounded-lg bg-[#141414] border-[0.5px] border-white/5"
             style={{ transform: `translateZ(-${i * 1.5}px)` }}
           />
        ))}

        {/* Top Face */}
        <div className="absolute inset-0 bg-[#1E1E1E] rounded-lg border border-white/10 overflow-hidden flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_-1px_0_rgba(0,0,0,0.5)]">
            <div className={`absolute inset-0 opacity-10 ${glowColor}`} />
            {/* Metallic shine gradient */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-50" />
            
            <div className={`relative z-10 ${color} drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] transform -rotate-[0deg]`}>
               {React.cloneElement(icon as React.ReactElement, { size: 22, strokeWidth: 2.5 } as any)}
            </div>
        </div>
      </motion.div>
    </div>
  );
};

// Premium Border Container for Features
const FeatureBlock = ({ icon, title, description, color, delay }: any) => (
    <div className="group relative p-[1px] rounded-2xl bg-gradient-to-b from-white/10 to-transparent hover:from-white/20 transition-all duration-500">
        <div className="relative h-full bg-[#080808] rounded-2xl p-6 flex items-start gap-6 overflow-hidden">
            {/* Inner Glow */}
            <div className={`absolute -top-20 -right-20 w-40 h-40 ${color.replace('text-', 'bg-')} opacity-[0.03] blur-[50px] group-hover:opacity-10 transition-opacity duration-500`} />
            
            <div className="flex-shrink-0 pt-2">
                <ThreeDIcon icon={icon} color={color} delay={delay} />
            </div>
            <div className="relative z-10">
                <h3 className="text-xl font-serif text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                    {title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
    </div>
);

const WorkflowEngineSection: React.FC = () => {
  return (
    <section className="w-full py-24 bg-[#050505] relative overflow-hidden border-t border-white/5">
       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-red/5 via-[#050505] to-[#050505] pointer-events-none" />
       
       <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
             
             {/* Text Content */}
             <div className="w-full lg:w-1/3">
                <div className="flex items-center gap-2 mb-6">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-red"></span>
                    </span>
                    <span className="text-xs font-mono text-brand-red uppercase tracking-widest">Live Execution</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
                   Orchestrate logic <br/>
                   <span className="text-gray-500 italic">visually.</span>
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed mb-10">
                   Visualize your entire backend logic as a directed acyclic graph. Monitor execution paths, inspect payloads, and replay failures with a single click.
                </p>
                
                <div className="space-y-6">
                   <FeatureBlock 
                     icon={<ShieldCheck />}
                     title="99.99% Reliability"
                     description="Guaranteed execution semantics with automatic retries and dead-letter queues."
                     color="text-green-400"
                     delay={0}
                   />
                   <FeatureBlock 
                     icon={<Clock />}
                     title="Real-time Insight"
                     description="Live step-by-step tracing, payload inspection, and performance profiling."
                     color="text-blue-400"
                     delay={0.2}
                   />
                </div>
             </div>

             {/* Animation Canvas */}
             <div className="w-full lg:w-2/3 h-[300px] md:h-[500px] relative bg-[#0A0A0A] rounded-2xl border border-white/10 shadow-2xl overflow-hidden group">
                {/* Grid Background */}
                <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
                
                {/* SVG Connections Layer - Using fixed viewbox 0 0 100 100 to map percentages 1:1 */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
                   <defs>
                      <filter id="glow-particle" x="-50%" y="-50%" width="200%" height="200%">
                         <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                         <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                         </feMerge>
                      </filter>
                   </defs>

                   {/* 
                     Timing Cycle (Total 4.5s loop):
                     0.0s: Start
                     0.0s - 1.5s: Webhook -> Filter
                     1.5s: Filter Reached
                     1.5s - 3.0s: Filter -> DB / Email
                     3.0s: End Reached
                     3.0s - 4.5s: Pause/Reset
                   */}

                   {/* Path 1: Trigger -> Filter (0s to 1.5s) */}
                   <ConnectionPath start={{x: 15, y: 50}} end={{x: 40, y: 50}} delay={0} duration={1.5} />
                   
                   {/* Path 2: Filter -> Database (1.5s to 3s) */}
                   <ConnectionPath start={{x: 40, y: 50}} end={{x: 75, y: 30}} delay={1.5} duration={1.5} curved />

                   {/* Path 3: Filter -> Email (1.5s to 3s) */}
                   <ConnectionPath start={{x: 40, y: 50}} end={{x: 75, y: 70}} delay={1.5} duration={1.5} curved invert />

                </svg>

                {/* Nodes Layer - Positioned exactly at percentages matching SVG coordinates */}
                <div className="absolute inset-0 z-10 md:scale-100 scale-75 origin-center md:origin-top-left">
                   
                   {/* Node 1: Webhook (Blinks at start: 0s) */}
                   <NodeItem 
                      x="15%" y="50%" 
                      icon={<Zap className="w-4 h-4 md:w-5 md:h-5" />} 
                      label="Webhook" 
                      color="text-yellow-400" 
                      bg="bg-yellow-400/10"
                      blinkDelay={0}
                   />

                   {/* Node 2: Filter (Blinks on arrival: 1.5s) */}
                   <NodeItem 
                      x="40%" y="50%" 
                      icon={<Filter className="w-4 h-4 md:w-5 md:h-5" />} 
                      label="Filter: IsPro" 
                      color="text-blue-400" 
                      bg="bg-blue-400/10"
                      blinkDelay={1.5}
                   />

                   {/* Node 3: Database (Blinks on arrival: 3.0s) */}
                   <NodeItem 
                      x="75%" y="30%" 
                      icon={<Database className="w-4 h-4 md:w-5 md:h-5" />} 
                      label="Update DB" 
                      color="text-purple-400" 
                      bg="bg-purple-400/10"
                      blinkDelay={3.0}
                   />

                   {/* Node 4: Email (Blinks on arrival: 3.0s) */}
                   <NodeItem 
                      x="75%" y="70%" 
                      icon={<Mail className="w-4 h-4 md:w-5 md:h-5" />} 
                      label="Email User" 
                      color="text-green-400" 
                      bg="bg-green-400/10"
                      blinkDelay={3.0}
                   />

                </div>
             </div>
          </div>
       </div>
    </section>
  );
};

// SVG Path and Moving Particle
const ConnectionPath = ({ start, end, delay, duration, curved = false }: any) => {
   // Calculate control points for smooth bezier
   const cp1x = start.x + (end.x - start.x) / 2;
   const cp1y = start.y;
   const cp2x = start.x + (end.x - start.x) / 2;
   const cp2y = end.y;

   const pathD = curved 
      ? `M ${start.x} ${start.y} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${end.x} ${end.y}`
      : `M ${start.x} ${start.y} L ${end.x} ${end.y}`;

   return (
      <>
        {/* Background Track */}
        <path 
           d={pathD} 
           stroke="rgba(255,255,255,0.05)" 
           strokeWidth="1" 
           vectorEffect="non-scaling-stroke"
           fill="none" 
        />
        
        {/* Moving Particle */}
        <motion.circle 
           r="0.8" 
           fill="white"
           filter="url(#glow-particle)"
        >
           <animateMotion 
              dur={`${duration}s`}
              repeatCount="indefinite"
              path={pathD}
              begin={`${delay}s`}
              keyPoints="0;1"
              keyTimes="0;1"
              calcMode="linear"
              fill="freeze"
           />
           {/* Total cycle is 4.5s. It should be visible only during its travel time */}
           <animate 
              attributeName="opacity"
              values="0;1;1;0;0" 
              keyTimes={`0;0.1;0.9;1;1`} 
              dur={`${duration}s`}
              begin={`${delay}s`}
              repeatCount="indefinite"
           />
        </motion.circle>

        {/* Final Production Particle */}
        <motion.circle r="1" fill="white" filter="url(#glow-particle)">
            <animateMotion
                dur="4.5s"
                repeatCount="indefinite"
                path={pathD}
                // We want movement only during the active window
                keyTimes={`0;${delay/4.5};${(delay+duration)/4.5};1`}
                keyPoints="0;0;1;1"
                calcMode="linear"
            />
            <animate 
                attributeName="opacity"
                values="0;0;1;1;0;0"
                keyTimes={`0;${delay/4.5};${(delay)/4.5 + 0.05};${(delay+duration)/4.5 - 0.05};${(delay+duration)/4.5};1`}
                dur="4.5s"
                repeatCount="indefinite"
            />
        </motion.circle>
      </>
   )
}

const NodeItem = ({ x, y, icon, label, color, bg, blinkDelay }: any) => {
   return (
      <div 
         className="absolute flex flex-col items-center gap-2 md:gap-3 w-24 md:w-32"
         style={{ 
            left: x, 
            top: y, 
            transform: 'translate(-50%, -1.75rem)' 
         }}
      >
         <motion.div 
            animate={{ 
               // Pulse effect
               scale: [1, 1.15, 1],
               boxShadow: [
                  "0 0 0px rgba(0,0,0,0)", 
                  "0 0 25px rgba(255,255,255,0.4)", 
                  "0 0 0px rgba(0,0,0,0)"
               ],
               borderColor: ["rgba(255,255,255,0.1)", "rgba(255,255,255,0.8)", "rgba(255,255,255,0.1)"]
            }}
            // Total cycle 4.5s. The pulse happens exactly at 'blinkDelay'
            transition={{ 
                duration: 0.6, // Quick pulse
                delay: blinkDelay, 
                repeat: Infinity, 
                repeatDelay: 4.5 - 0.6 // Wait for the rest of the cycle
            }} 
            className={`w-10 h-10 md:w-14 md:h-14 rounded-xl border border-white/10 bg-[#0F0F0F] flex items-center justify-center relative z-20 shadow-2xl`}
         >
            <div className={`${color} relative z-10`}>
               {icon}
            </div>
            {/* Inner Glow */}
            <div className={`absolute inset-0 ${bg} blur-xl opacity-20 rounded-full`} />
         </motion.div>
         
         <div className="text-center">
            <div className="text-[10px] md:text-xs font-semibold text-gray-300 mb-1 whitespace-nowrap">{label}</div>
            
            {/* Status Badge - Blinks with the node */}
            <motion.div 
               animate={{ opacity: [0.3, 1, 0.3] }}
               transition={{ 
                   duration: 0.6, 
                   delay: blinkDelay, 
                   repeat: Infinity,
                   repeatDelay: 4.5 - 0.6
               }}
               className="text-[9px] md:text-[10px] px-1.5 md:px-2 py-0.5 rounded-full bg-white/5 text-gray-500 border border-white/5 inline-block"
            >
               Active
            </motion.div>
         </div>
      </div>
   );
}

export default WorkflowEngineSection;