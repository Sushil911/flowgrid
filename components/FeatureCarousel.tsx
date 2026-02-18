import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Activity, RefreshCw, Box, ChevronLeft, ChevronRight, ArrowUpRight, Layers } from 'lucide-react';

// A robust 3D extruded icon component
const ThreeDIcon = ({ icon, color, delay = 0 }: { icon: React.ReactNode, color: string, delay?: number }) => {
  // Color mapping for shadows/highlights
  const glowColor = color.replace('text-', 'bg-');
  
  return (
    <div className="w-16 h-16 relative flex items-center justify-center" style={{ perspective: '1000px' }}>
      <motion.div
        className="relative w-12 h-12 preserve-3d cursor-pointer"
        style={{ rotateX: 55, rotateZ: -45 }}
        initial={{ rotateX: 55, rotateZ: -45, z: 0 }}
        whileHover={{ z: 20, rotateX: 45, rotateZ: -35 }}
        animate={{ 
           y: [0, -8, 0],
        }}
        transition={{ 
           y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay },
           default: { type: "spring", stiffness: 200, damping: 20 }
        }}
      >
        {/* Drop Shadow */}
        <div className="absolute inset-0 bg-black/60 blur-xl translate-z-[-40px] scale-150 rounded-full opacity-60" />

        {/* Extrusion Layers (Thickness) */}
        {[1, 2, 3, 4].map((i) => (
           <div 
             key={i}
             className="absolute inset-0 rounded-lg bg-[#1a1a1a] border-[0.5px] border-white/5"
             style={{ transform: `translateZ(-${i * 2}px)` }}
           />
        ))}

        {/* Top Face */}
        <div className="absolute inset-0 bg-[#222] rounded-lg border border-white/10 overflow-hidden flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
            {/* Inner Gradient */}
            <div className={`absolute inset-0 opacity-10 ${glowColor}`} />
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-black/80" />
            
            {/* Icon Content */}
            <div className={`relative z-10 ${color} drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] transform -rotate-[0deg]`}>
               {/* We counter-rotate the icon slightly if we want it flat, or leave it to match the plane */}
               {React.cloneElement(icon as React.ReactElement, { size: 20, strokeWidth: 2.5 } as any)}
            </div>
        </div>

        {/* Shine Effect */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-tr from-white/20 via-transparent to-transparent pointer-events-none" />
      </motion.div>
    </div>
  );
};

const features = [
  {
    title: "Intelligent Caching",
    description: "Artifacts are cached globally across your infrastructure to prevent redundant computation.",
    icon: <Zap />,
    colorClass: "text-brand-red",
    gradient: "from-brand-red/20 to-transparent"
  },
  {
    title: "Live Debugging",
    description: "Inspect the state of any node in real-time as your workflow executes with zero latency.",
    icon: <Activity />,
    colorClass: "text-blue-400",
    gradient: "from-blue-400/20 to-transparent"
  },
  {
    title: "Smart Retries",
    description: "Define exponential backoff policies and error handling strategies at the node level.",
    icon: <RefreshCw />,
    colorClass: "text-green-400",
    gradient: "from-green-400/20 to-transparent"
  },
  {
    title: "Environment Isolation",
    description: "Each task runs in its own isolated container environment for perfect reproducibility.",
    icon: <Box />,
    colorClass: "text-yellow-400",
    gradient: "from-yellow-400/20 to-transparent"
  },
  {
    title: "Dependency Graph",
    description: "Automatic DAG resolution ensures tasks run in the correct order based on data flow.",
    icon: <Layers />,
    colorClass: "text-purple-400",
    gradient: "from-purple-400/20 to-transparent"
  }
];

const FeatureCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setItemsPerPage(3);
      } else if (window.innerWidth >= 768) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(1);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, features.length - itemsPerPage));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section className="w-full py-32 border-t border-white/5 bg-[#050505] relative overflow-hidden">
        {/* Decor: Background Gradient Mesh */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-red/30 to-transparent" />
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-brand-red/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
                <div className="max-w-2xl">
                    <div className="flex items-center gap-3 mb-4">
                       <div className="h-px w-8 bg-brand-red/50" />
                       <span className="text-brand-red text-sm font-mono uppercase tracking-widest">Platform Features</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-[1.1]">
                        Built for <span className="italic text-gray-500">massive scale</span>
                    </h2>
                    <p className="text-gray-400 text-lg leading-relaxed max-w-lg">
                        Everything you need to orchestrate mission-critical data pipelines without the operational headache.
                    </p>
                </div>
                
                {/* Controls */}
                <div className="flex gap-4">
                    <button 
                        onClick={prevSlide} 
                        disabled={currentIndex === 0}
                        className="w-14 h-14 flex items-center justify-center rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all text-white disabled:opacity-20 disabled:cursor-not-allowed group"
                    >
                        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                    </button>
                    <button 
                        onClick={nextSlide} 
                        disabled={currentIndex >= features.length - itemsPerPage}
                        className="w-14 h-14 flex items-center justify-center rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all text-white disabled:opacity-20 disabled:cursor-not-allowed group"
                    >
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                </div>
            </div>

            {/* Carousel Track */}
            <div className="overflow-visible cursor-grab active:cursor-grabbing">
                <CarouselTrack 
                    currentIndex={currentIndex} 
                    itemsPerPage={itemsPerPage} 
                    features={features} 
                    setCurrentIndex={setCurrentIndex}
                />
            </div>
        </div>
    </section>
  );
};

const CarouselTrack = ({ currentIndex, itemsPerPage, features, setCurrentIndex }: any) => {
    const basis = itemsPerPage === 3 ? '32%' : itemsPerPage === 2 ? '48%' : '100%';
    const gap = '2rem';
    
    return (
        <motion.div 
            className="flex gap-8"
            initial={false}
            animate={{ x: `calc(-${currentIndex} * (${basis} + ${gap}))` }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
            drag="x"
            dragConstraints={{ left: -1000, right: 0 }}
        >
            {features.map((feature: any, idx: number) => (
                <motion.div 
                    key={idx}
                    className="flex-shrink-0 relative group h-[360px]" // Reduced height from 420px
                    style={{ flexBasis: basis }}
                >
                    <div className="relative w-full h-full bg-[#080808] border border-white/10 rounded-[2rem] overflow-hidden transition-all duration-500 group-hover:border-white/20 group-hover:-translate-y-2">
                        
                        {/* Background Patterns */}
                        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-100 mix-blend-overlay pointer-events-none" />
                        
                        {/* Soft Bottom Uplight Glow */}
                        <div className={`absolute bottom-0 inset-x-0 h-2/3 bg-gradient-to-t ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

                        {/* Content */}
                        <div className="relative z-10 p-8 flex flex-col h-full">
                            {/* Top Row: Icon + Arrow */}
                            <div className="flex justify-between items-start">
                                <ThreeDIcon icon={feature.icon} color={feature.colorClass} delay={idx * 0.1} />
                                
                                <div className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center bg-white/5 text-white/40 group-hover:bg-white/10 group-hover:text-white transition-colors">
                                  <ArrowUpRight className="w-5 h-5" />
                                </div>
                            </div>

                            {/* Text Content - Positioned with simpler gap instead of justify-between */}
                            <div className="mt-8 flex flex-col gap-3">
                                <h3 className="text-2xl font-serif text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                                  {feature.title}
                                </h3>
                                <p className="text-gray-500 leading-relaxed text-sm group-hover:text-gray-400 transition-colors">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    )
}

export default FeatureCarousel;