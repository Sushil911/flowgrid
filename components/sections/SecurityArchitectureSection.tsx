import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Shield, Container, FileKey } from 'lucide-react';

const layers = [
  {
    id: 'encryption',
    title: 'Zero-Knowledge Encryption',
    icon: Lock,
    description: 'All data is encrypted at rest using AES-256 and in transit via TLS 1.3. We manage keys via HSMs.',
    text: 'text-brand-red',
    bg: 'bg-brand-red',
    border: 'border-brand-red',
    shadow: 'shadow-brand-red'
  },
  {
    id: 'isolation',
    title: 'Runtime Isolation',
    icon: Container,
    description: 'Each workflow execution runs in an ephemeral Firecracker microVM, ensuring complete tenant isolation.',
    text: 'text-blue-400',
    bg: 'bg-blue-400',
    border: 'border-blue-400',
    shadow: 'shadow-blue-400'
  },
  {
    id: 'compliance',
    title: 'Compliance & Audit',
    icon: Shield,
    description: 'SOC2 Type II certified. Comprehensive audit logs for every action, access, and configuration change.',
    text: 'text-green-400',
    bg: 'bg-green-400',
    border: 'border-green-400',
    shadow: 'shadow-green-400'
  }
];

const ThreeDIcon = ({ icon, colorClass, bgClass, delay = 0 }: { icon: React.ReactNode, colorClass: string, bgClass: string, delay?: number }) => {
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
        {/* Realistic Drop Shadow */}
        <div className="absolute inset-0 bg-black/80 blur-md translate-z-[-40px] scale-110 rounded-xl opacity-70" />
        <div className={`absolute inset-0 ${bgClass} blur-[20px] translate-z-[-30px] scale-120 opacity-20`} />

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
            <div className={`absolute inset-0 opacity-10 ${bgClass}`} />
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-50" />
            
            <div className={`relative z-10 ${colorClass} drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] transform -rotate-[0deg]`}>
               {React.cloneElement(icon as React.ReactElement, { size: 22, strokeWidth: 2.5 } as any)}
            </div>
        </div>
      </motion.div>
    </div>
  );
};

const SecurityFeatureBlock = ({ layer, isActive, onHover, onLeave }: any) => {
    // Correctly assign the component to a capitalized variable for JSX rendering
    const Icon = layer.icon;

    return (
      <div 
          onMouseEnter={onHover}
          onMouseLeave={onLeave}
          className={`group relative p-[1px] rounded-2xl transition-all duration-500 ${
              isActive 
              ? 'bg-gradient-to-b from-white/20 to-transparent' 
              : 'bg-gradient-to-b from-white/5 to-transparent hover:from-white/10'
          }`}
      >
          <div className="relative h-full bg-[#080808] rounded-2xl p-6 flex items-start gap-6 overflow-hidden">
              {/* Inner Glow */}
              <div className={`absolute -top-20 -right-20 w-40 h-40 ${layer.bg} opacity-[0.03] blur-[50px] ${isActive ? 'opacity-10' : 'group-hover:opacity-5'} transition-opacity duration-500`} />
              
              <div className="flex-shrink-0 pt-2">
                  <ThreeDIcon 
                      icon={<Icon />} 
                      colorClass={layer.text} 
                      bgClass={layer.bg} 
                  />
              </div>
              <div className="relative z-10">
                  <h3 className={`text-xl font-serif mb-2 transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                      {layer.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                      {layer.description}
                  </p>
              </div>
          </div>
      </div>
    );
};

const SecurityArchitectureSection: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<string | null>(null);

  return (
    <section className="w-full py-32 bg-[#050505] relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            
            {/* Left: Interactive Content */}
            <div className="order-2 lg:order-1">
               <div className="flex items-center gap-2 mb-6">
                  <Shield className="w-5 h-5 text-brand-red" />
                  <span className="text-sm font-mono text-brand-red uppercase tracking-widest">Enterprise Security</span>
               </div>
               <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
                  Fort Knox for <br/>
                  <span className="text-gray-500">your functions.</span>
               </h2>
               <p className="text-gray-400 text-lg mb-12">
                  Built on a zero-trust architecture. We prioritize security so you can satisfy your most demanding enterprise requirements.
               </p>

               <div className="space-y-6">
                  {layers.map((layer) => (
                     <SecurityFeatureBlock 
                        key={layer.id} 
                        layer={layer} 
                        isActive={activeLayer === layer.id}
                        onHover={() => setActiveLayer(layer.id)}
                        onLeave={() => setActiveLayer(null)}
                     />
                  ))}
               </div>
            </div>

            {/* Right: 3D Visualization */}
            <div className="order-1 lg:order-2 relative h-[600px] flex items-center justify-center">
               
               {/* Center Core */}
               <motion.div 
                  className="relative z-20 w-32 h-32 rounded-full bg-brand-red/10 border border-brand-red/50 flex items-center justify-center backdrop-blur-sm"
                  animate={{ 
                     boxShadow: ["0 0 50px rgba(255,59,48,0.2)", "0 0 80px rgba(255,59,48,0.5)", "0 0 50px rgba(255,59,48,0.2)"]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
               >
                  <FileKey className="w-12 h-12 text-brand-red" />
               </motion.div>

               {/* Rotating Rings */}
               <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                   {layers.map((layer, idx) => {
                      const size = 300 + (idx * 140);
                      const isActive = activeLayer === layer.id;
                      
                      return (
                         <motion.div
                            key={layer.id}
                            className={`absolute rounded-full border border-dashed flex items-center justify-center transition-all duration-700 ${
                               isActive 
                                  ? `${layer.border} border-opacity-50 bg-white/[0.02] shadow-[0_0_50px_rgba(255,255,255,0.05)]` 
                                  : 'border-white/5'
                            }`}
                            style={{ width: size, height: size }}
                            animate={{ 
                               rotate: idx % 2 === 0 ? 360 : -360,
                               scale: isActive ? 1.05 : 1,
                            }}
                            transition={{ 
                               rotate: { duration: 40 + (idx * 15), repeat: Infinity, ease: "linear" },
                               scale: { duration: 0.5 }
                            }}
                         >
                            {/* Orbital Marker */}
                            <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#050505] border ${isActive ? layer.border : 'border-white/20'} flex items-center justify-center z-10 shadow-lg`}>
                               <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white' : 'bg-gray-600'}`} />
                            </div>

                            {/* Active Ring Highlight */}
                            {isActive && (
                               <motion.div 
                                  className={`absolute inset-0 rounded-full border-2 ${layer.border} opacity-20`}
                                  initial={{ scale: 0.95, opacity: 0 }}
                                  animate={{ scale: 1.05, opacity: 0.2 }}
                                  transition={{ duration: 2, repeat: Infinity }}
                               />
                            )}
                         </motion.div>
                      );
                   })}
                   
                   {/* Radar Scan Effect */}
                   <div className="absolute w-[800px] h-[800px] rounded-full overflow-hidden opacity-20">
                        <motion.div 
                            className="absolute inset-0"
                            style={{ 
                                background: 'conic-gradient(from 0deg, transparent 0deg, transparent 280deg, rgba(255, 59, 48, 0.3) 360deg)'
                            }}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        />
                   </div>
                   
                   {/* Crosshairs */}
                   <div className="absolute w-[800px] h-px bg-white/5" />
                   <div className="absolute h-[800px] w-px bg-white/5" />
               </div>
            </div>
         </div>
      </div>
    </section>
  );
};

export default SecurityArchitectureSection;