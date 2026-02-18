import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Database, Cpu, Zap, Box, Layers, Globe } from 'lucide-react';

const IsometricScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate distance from center normalized
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);
    
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Smooth springs for rotation
  const rotateX = useSpring(useTransform(mouseY, [-1, 1], [55, 65]), { stiffness: 100, damping: 20 });
  const rotateZ = useSpring(useTransform(mouseX, [-1, 1], [-40, -50]), { stiffness: 100, damping: 20 });
  const scale = useSpring(useTransform(mouseY, [-1, 1], [0.95, 1.05]), { stiffness: 50, damping: 20 });

  // Floating elements parallax
  const floatX = useSpring(useTransform(mouseX, [-1, 1], [-10, 10]), { stiffness: 40, damping: 10 });
  const floatY = useSpring(useTransform(mouseY, [-1, 1], [-10, 10]), { stiffness: 40, damping: 10 });

  return (
    <div 
      className="relative w-full h-[350px] md:h-[600px] flex items-center justify-center perspective-1000 overflow-visible"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={containerRef}
    >
      <motion.div
        style={{ rotateX, rotateZ, scale }}
        className="relative w-[280px] h-[280px] md:w-[400px] md:h-[400px] preserve-3d"
      >
        {/* === BASE LAYER (Bottom Grid) === */}
        <div 
          className="absolute inset-0 border border-white/10 bg-brand-panel/20 backdrop-blur-sm shadow-2xl"
          style={{ transform: 'translateZ(-60px)' }}
        >
           {/* Grid Lines on Base */}
           <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 divide-x divide-y divide-white/5 border-white/5">
             {Array.from({length: 16}).map((_, i) => <div key={i} />)}
           </div>
        </div>

        {/* === MIDDLE LAYER (Main Platform) === */}
        <div 
          className="absolute inset-0 bg-[#0A0A0A] border border-white/10 shadow-2xl"
          style={{ transform: 'translateZ(0px)' }}
        >
           {/* Inner Grid */}
           <div className="absolute inset-0 grid grid-cols-4 grid-rows-4">
              {/* Render grid cells */}
              {Array.from({length: 16}).map((_, i) => (
                <div key={i} className="border border-white/5 relative">
                   {/* Decorative marks on grid intersections */}
                   <div className="absolute -bottom-0.5 -right-0.5 w-1 h-1 bg-white/20 rounded-full" />
                </div>
              ))}
           </div>

           {/* Central Glow Area */}
           <div className="absolute top-1/4 left-1/4 w-2/4 h-2/4 bg-brand-red/5 blur-xl rounded-full" />
        </div>

        {/* === TOP LAYER (Floating Elements) === */}
        
        {/* Central Core Block */}
        <motion.div 
          className="absolute top-[37.5%] left-[37.5%] w-[25%] h-[25%] preserve-3d"
          style={{ 
             z: 60, // Lifted up
          }}
        >
          {/* Cube Faces */}
          <div className="absolute inset-0 bg-brand-red/10 border border-brand-red/50 shadow-[0_0_30px_rgba(255,59,48,0.3)] flex items-center justify-center">
            <Zap className="w-8 h-8 text-brand-red drop-shadow-[0_0_10px_rgba(255,59,48,0.8)]" />
          </div>
          {/* Side Panels for 3D thickness illusion (simple extrude) */}
          <div className="absolute inset-x-0 bottom-0 h-4 bg-brand-red/20 origin-bottom rotate-x-90 translate-y-4 border border-brand-red/30" />
          <div className="absolute inset-y-0 right-0 w-4 bg-brand-red/20 origin-right rotate-y-90 translate-x-4 border border-brand-red/30" />
        </motion.div>


        {/* Satellite Blocks */}
        
        {/* Top Left - AI Chip */}
        <FloatingBlock x="-20%" y="-20%" icon={<Cpu className="text-blue-400 w-5 h-5 md:w-6 md:h-6" />} delay={0} />
        {/* Top Right - Database */}
        <FloatingBlock x="120%" y="-20%" icon={<Database className="text-purple-400 w-5 h-5 md:w-6 md:h-6" />} delay={0.1} />
        {/* Bottom Right - Box */}
        <FloatingBlock x="120%" y="120%" icon={<Box className="text-yellow-400 w-5 h-5 md:w-6 md:h-6" />} delay={0.2} />
        {/* Bottom Left - Layers */}
        <FloatingBlock x="-20%" y="120%" icon={<Layers className="text-green-400 w-5 h-5 md:w-6 md:h-6" />} delay={0.3} />


        {/* Connection Lines (SVGs overlaid on the plane) */}
        <svg className="absolute inset-[-50%] w-[200%] h-[200%] pointer-events-none" style={{ transform: 'translateZ(20px)' }}>
           {/* Lines connecting satellites to center */}
           <motion.path 
             d="M 170,170 L 280,280" 
             stroke="url(#gradient-line)" 
             strokeWidth="1" 
             strokeDasharray="4 4"
             initial={{ pathLength: 0, opacity: 0 }}
             animate={{ pathLength: 1, opacity: 0.4 }}
             transition={{ duration: 1.5, delay: 0.5 }}
           />
           <motion.path 
             d="M 630,170 L 520,280" 
             stroke="url(#gradient-line)" 
             strokeWidth="1" 
             strokeDasharray="4 4"
             initial={{ pathLength: 0, opacity: 0 }}
             animate={{ pathLength: 1, opacity: 0.4 }}
             transition={{ duration: 1.5, delay: 0.7 }}
           />
           <motion.path 
             d="M 630,630 L 520,520" 
             stroke="url(#gradient-line)" 
             strokeWidth="1" 
             strokeDasharray="4 4"
             initial={{ pathLength: 0, opacity: 0 }}
             animate={{ pathLength: 1, opacity: 0.4 }}
             transition={{ duration: 1.5, delay: 0.9 }}
           />
           <motion.path 
             d="M 170,630 L 280,520" 
             stroke="url(#gradient-line)" 
             strokeWidth="1" 
             strokeDasharray="4 4"
             initial={{ pathLength: 0, opacity: 0 }}
             animate={{ pathLength: 1, opacity: 0.4 }}
             transition={{ duration: 1.5, delay: 1.1 }}
           />
           
           <defs>
             <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
               <stop offset="0%" stopColor="transparent" />
               <stop offset="50%" stopColor="white" />
               <stop offset="100%" stopColor="transparent" />
             </linearGradient>
           </defs>
        </svg>

      </motion.div>
    </div>
  );
};

const FloatingBlock = ({ x, y, icon, delay }: { x: string, y: string, icon: React.ReactNode, delay: number }) => {
  return (
    <motion.div 
      className="absolute w-12 h-12 md:w-16 md:h-16 preserve-3d"
      style={{ left: x, top: y, z: 40 }}
      initial={{ opacity: 0, z: 0 }}
      animate={{ opacity: 1, z: 40 }}
      transition={{ duration: 0.8, delay, type: "spring" }}
    >
       <div className="absolute inset-0 bg-brand-panel border border-white/20 flex items-center justify-center shadow-lg hover:border-brand-red/50 transition-colors duration-300">
         <motion.div
           animate={{ y: [0, -5, 0] }}
           transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: delay * 2 }}
         >
           {icon}
         </motion.div>
       </div>
       {/* Shadow on the platform below */}
       <div 
         className="absolute top-0 left-0 w-full h-full bg-black/50 blur-md -z-10" 
         style={{ transform: 'translateZ(-40px) scale(0.8)' }}
       />
       
       {/* Thickness */}
       <div className="absolute inset-x-0 bottom-0 h-2 bg-white/5 origin-bottom rotate-x-90 translate-y-2 border-b border-white/10" />
       <div className="absolute inset-y-0 right-0 w-2 bg-white/5 origin-right rotate-y-90 translate-x-2 border-r border-white/10" />
    </motion.div>
  )
}

export default IsometricScene;