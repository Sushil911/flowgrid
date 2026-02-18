import React from 'react';
import { motion } from 'framer-motion';
import { Shield, BarChart3, Globe, Lock, Zap } from 'lucide-react';

const BentoGridSection: React.FC = () => {
  return (
    <section className="w-full py-32 relative bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="mb-20 max-w-2xl">
           <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
             Everything you need to <br />
             <span className="italic text-gray-500">run production workloads.</span>
           </h2>
           <p className="text-gray-400 text-lg">
             Stop stitching together disparate tools. Flowgrid gives you a unified control plane for your entire background job infrastructure.
           </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 grid-auto-rows-[minmax(180px,auto)]">
          
          {/* Card 1: Observability (Large) */}
          <motion.div 
            initial="idle"
            whileHover="active"
            viewport={{ once: true }}
            className="col-span-1 md:col-span-6 lg:col-span-8 row-span-2 relative group overflow-hidden rounded-3xl bg-[#0a0a0a] border border-white/10 hover:border-white/20 transition-all duration-500"
          >
             <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
             
             {/* Content */}
             <div className="p-8 h-full flex flex-col justify-between relative z-10">
                <div className="flex justify-between items-start">
                   <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                      <BarChart3 className="w-6 h-6 text-blue-400" />
                   </div>
                   <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/20 bg-green-500/10 text-xs text-green-400 font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      LIVE
                   </div>
                </div>
                
                {/* Live Chart Visualization */}
                <div className="flex-grow flex items-end gap-1 py-8 px-2 relative h-48">
                    {/* Scan Line - Only visible on hover */}
                    <motion.div 
                      className="absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-blue-400/50 to-transparent z-20"
                      variants={{
                        idle: { opacity: 0, left: '0%' },
                        active: { opacity: 1, left: '100%', transition: { duration: 1.2, ease: "easeInOut" } }
                      }}
                    />
                    
                    {[35, 55, 40, 70, 50, 80, 60, 90, 75, 50, 65, 85, 95, 80, 70, 60, 45, 65, 55, 75].map((h, i) => (
                      <motion.div 
                        key={i}
                        custom={h}
                        variants={{
                            idle: { height: `${h}%`, opacity: 0.3 },
                            active: { 
                                height: `${Math.min(100, h * 1.3)}%`,
                                opacity: 0.8,
                                transition: { 
                                    type: "spring",
                                    stiffness: 200,
                                    damping: 20,
                                    delay: i * 0.015 // Smooth wave effect
                                }
                            }
                        }}
                        className="w-full bg-blue-500 rounded-t-sm relative overflow-hidden origin-bottom"
                      >
                         <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-b from-white/20 to-transparent" />
                      </motion.div>
                    ))}
                </div>

                <div>
                   <h3 className="text-2xl font-serif text-white mb-2 group-hover:text-blue-200 transition-colors">Real-time Observability</h3>
                   <p className="text-gray-500">Trace every function call, database query, and API request across your distributed system with zero overhead instrumentation.</p>
                </div>
             </div>
          </motion.div>

          {/* Card 2: Security (Small) */}
          <motion.div 
            initial="idle"
            whileHover="active"
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="col-span-1 md:col-span-3 lg:col-span-4 row-span-1 relative group overflow-hidden rounded-3xl bg-[#0a0a0a] border border-white/10 hover:border-white/20 transition-all duration-500"
          >
             {/* Scanning Effect */}
             <motion.div 
               className="absolute inset-x-0 h-[200%] bg-gradient-to-b from-transparent via-red-500/5 to-transparent pointer-events-none"
               variants={{
                 idle: { top: '-100%', opacity: 0 },
                 active: { top: '100%', opacity: 1, transition: { duration: 1.5, ease: "easeInOut" } }
               }}
             />

             <div className="p-8 h-full flex flex-col justify-between relative z-10">
                <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center border border-red-500/20 mb-4">
                    <motion.div
                      variants={{
                        idle: { opacity: 0.5, scale: 1 },
                        active: { opacity: 1, scale: 1.1, transition: { duration: 0.4 } }
                      }}
                    >
                       <Shield className="w-5 h-5 text-red-400" />
                    </motion.div>
                </div>
                <div>
                   <h3 className="text-xl font-serif text-white mb-2">Enterprise SOC2</h3>
                   <p className="text-sm text-gray-500">Bank-grade encryption and strict access controls built-in.</p>
                </div>
             </div>
             {/* Background Decor */}
             <div className="absolute top-4 right-4 text-white/5">
                <Lock className="w-24 h-24 rotate-12" />
             </div>
          </motion.div>

          {/* Card 3: Global Scale (Small) */}
          <motion.div 
            initial="idle"
            whileHover="active"
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="col-span-1 md:col-span-3 lg:col-span-4 row-span-1 relative group overflow-hidden rounded-3xl bg-[#0a0a0a] border border-white/10 hover:border-white/20 transition-all duration-500"
          >
             <div className="p-8 h-full flex flex-col justify-between">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center border border-purple-500/20 mb-4 relative">
                    <motion.div 
                       variants={{
                           idle: { rotate: 0 },
                           active: { rotate: 45, transition: { type: "spring", stiffness: 100 } }
                       }}
                    >
                       <Globe className="w-5 h-5 text-purple-400" />
                    </motion.div>
                    {/* Radar Ping */}
                    <motion.div 
                       className="absolute inset-0 rounded-full border border-purple-500/30"
                       variants={{
                           idle: { scale: 1, opacity: 0 },
                           active: { scale: 1.5, opacity: 1, transition: { duration: 0.5 } }
                       }}
                    />
                </div>
                <div>
                   <h3 className="text-xl font-serif text-white mb-2">Global Edge</h3>
                   <p className="text-sm text-gray-500">Deploy your functions to 140+ regions automatically.</p>
                </div>
             </div>
          </motion.div>

          {/* Card 4: Latency / Trace Visualization (Wide) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="col-span-1 md:col-span-6 lg:col-span-12 row-span-1 relative group overflow-hidden rounded-3xl bg-[#0a0a0a] border border-white/10 hover:border-white/20 transition-all duration-500 flex flex-col lg:flex-row"
          >
             {/* Left: Text Content */}
             <div className="p-8 flex-1 flex flex-col justify-center relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20">
                      <Zap className="w-5 h-5 text-yellow-400" />
                  </div>
                  <h3 className="text-xl font-serif text-white">Sub-millisecond Cold Starts</h3>
                </div>
                <p className="text-gray-500 max-w-sm">
                  Our custom V8 runtime uses memory snapshotting to boot functions instantly, eliminating the "cold start" tax.
                </p>
             </div>
             
             {/* Right: Waterfall Trace Visual */}
             <div className="flex-1 w-full bg-white/[0.02] border-t lg:border-t-0 lg:border-l border-white/5 p-8 flex flex-col justify-center relative overflow-hidden">
                 {/* Background Grid Lines */}
                 <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px)] bg-[size:40px_100%]" />
                 
                 <div className="relative z-10 space-y-3 font-mono text-xs">
                    {/* Header Scale */}
                    <div className="flex justify-between text-gray-600 mb-2 px-1">
                       <span>0ms</span>
                       <span>10ms</span>
                       <span>20ms</span>
                       <span>30ms</span>
                    </div>

                    {/* Trace Item 1: Init */}
                    <div className="flex items-center gap-4 group/item">
                       <span className="w-16 text-right text-gray-500">Init</span>
                       <div className="flex-1 h-6 bg-white/5 rounded relative overflow-hidden">
                          <motion.div 
                             initial={{ width: 0 }}
                             whileInView={{ width: '5%' }}
                             viewport={{ once: true }}
                             transition={{ delay: 0.5, duration: 0.2 }}
                             className="h-full bg-gray-600 rounded"
                          />
                       </div>
                       <span className="w-12 text-gray-400">1ms</span>
                    </div>

                    {/* Trace Item 2: Restore */}
                    <div className="flex items-center gap-4 group/item">
                       <span className="w-16 text-right text-blue-400/80">Restore</span>
                       <div className="flex-1 h-6 bg-white/5 rounded relative overflow-hidden">
                          <motion.div 
                             initial={{ width: 0, x: 0 }}
                             whileInView={{ width: '10%', x: '5%' }} // Starts after init
                             viewport={{ once: true }}
                             transition={{ delay: 0.7, duration: 0.3 }}
                             className="h-full bg-blue-500 rounded absolute left-0"
                          />
                       </div>
                       <span className="w-12 text-blue-400">2ms</span>
                    </div>

                    {/* Trace Item 3: Handler */}
                    <div className="flex items-center gap-4 group/item">
                       <span className="w-16 text-right text-green-400/80">Exec</span>
                       <div className="flex-1 h-6 bg-white/5 rounded relative overflow-hidden">
                          <motion.div 
                             initial={{ width: 0, x: 0 }}
                             whileInView={{ width: '40%', x: '15%' }} // Starts after restore
                             viewport={{ once: true }}
                             transition={{ delay: 1.0, duration: 0.5 }}
                             className="h-full bg-green-500 rounded absolute left-0"
                          />
                       </div>
                       <span className="w-12 text-green-400">12ms</span>
                    </div>

                    {/* Total Time Badge */}
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1.6 }}
                      className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#0A0A0A] border border-green-500/30 text-green-400 px-3 py-1.5 rounded-lg shadow-xl"
                    >
                       <span className="font-bold">Total: 15ms</span>
                    </motion.div>
                 </div>
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default BentoGridSection;