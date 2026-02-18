import React, { useEffect, useState } from 'react';
import { motion, useAnimation, useMotionValue, useTransform, animate } from 'framer-motion';
import { History, Play, RotateCcw, Bug, CheckCircle2, AlertCircle, Search } from 'lucide-react';

// Reusing the high-fidelity 3D Icon from WorkflowSection for consistency
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
        {/* Realistic Drop Shadow */}
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
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-50" />
            <div className={`relative z-10 ${color} drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] transform -rotate-[0deg]`}>
               {React.cloneElement(icon as React.ReactElement, { size: 22, strokeWidth: 2.5 } as any)}
            </div>
        </div>
      </motion.div>
    </div>
  );
};

// Premium Feature Block
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

const TimeTravelSection: React.FC = () => {
  return (
    <section className="w-full py-32 bg-[#050505] relative border-t border-white/5 overflow-hidden">
      {/* Background Ambience - Red Tint */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-red/5 via-[#050505] to-[#050505] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Text Content */}
          <div className="w-full lg:w-1/3 order-2 lg:order-1">
             <div className="flex items-center gap-2 mb-6">
                <div className="p-2 rounded-lg bg-brand-red/10 border border-brand-red/20">
                  <History className="w-4 h-4 text-brand-red" />
                </div>
                <span className="text-xs font-mono text-brand-red uppercase tracking-widest">Time Travel Debugging</span>
             </div>
             <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
                Fix bugs in the <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-orange-500 italic">past tense.</span>
             </h2>
             <p className="text-gray-400 text-lg leading-relaxed mb-8">
                Don't just read logs. Replay the entire execution state frame-by-frame. 
                Rewind to the exact moment of failure, inspect variables, and patch logic without reproducing locally.
             </p>
             
             {/* 3D Feature Blocks */}
             <div className="flex flex-col gap-6">
                <FeatureBlock 
                  icon={<RotateCcw />}
                  title="Instant Replay"
                  description="Restore full memory state from any checkpoint."
                  color="text-brand-red"
                  delay={0}
                />
                <FeatureBlock 
                  icon={<Search />}
                  title="Deep Inspection"
                  description="Query variable values at any point in time."
                  color="text-orange-400"
                  delay={0.2}
                />
             </div>
          </div>

          {/* Interactive Visual */}
          <div className="w-full lg:w-2/3 order-1 lg:order-2">
             <DebuggerInterface />
          </div>

        </div>
      </div>
    </section>
  );
};

const DebuggerInterface = () => {
  const [playState, setPlayState] = useState<'playing' | 'error' | 'rewinding' | 'fixed'>('playing');
  const scrubberX = useMotionValue(0);
  // Transform scrubber X (0-100%) to a time value
  const timeDisplay = useTransform(scrubberX, [0, 100], ["00:00.000", "00:02.500"]);
  
  // Animation Loop
  useEffect(() => {
    const sequence = async () => {
      while(true) {
        // Phase 1: Normal Playback (0% -> 60%)
        setPlayState('playing');
        await animate(scrubberX, 60, { duration: 3, ease: "linear" });
        
        // Phase 2: Error Encountered (At 60%)
        setPlayState('error');
        await new Promise(r => setTimeout(r, 1500)); // Pause on error

        // Phase 3: Rewind (60% -> 30%)
        setPlayState('rewinding');
        await animate(scrubberX, 30, { duration: 1, ease: "easeInOut" });
        await new Promise(r => setTimeout(r, 500)); // Pause before fix

        // Phase 4: Play with Fix (30% -> 100%)
        setPlayState('fixed');
        await animate(scrubberX, 100, { duration: 4, ease: "linear" });
        
        // Reset
        await new Promise(r => setTimeout(r, 2000));
        scrubberX.set(0);
      }
    };
    sequence();
  }, []);

  return (
    <div className="relative rounded-xl bg-[#080808] border border-white/10 shadow-2xl overflow-hidden font-mono text-sm select-none">
       {/* Glass Reflection */}
       <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none z-20" />
       
       {/* Top Bar */}
       <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-[#0C0C0C]">
          <div className="flex items-center gap-4 overflow-hidden">
             <div className="flex gap-1.5 shrink-0">
                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
             </div>
             <div className="h-4 w-px bg-white/10 shrink-0" />
             <div className="text-gray-500 text-xs flex items-center gap-2 truncate">
                <span className="text-brand-red truncate hidden sm:inline">debug_session_8492</span>
                <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/5 text-[10px] text-gray-400 whitespace-nowrap">
                  {playState === 'playing' && 'RUNNING'}
                  {playState === 'error' && 'CRASHED'}
                  {playState === 'rewinding' && 'SEEKING'}
                  {playState === 'fixed' && 'REPLAYING'}
                </span>
             </div>
          </div>
          <div className="flex items-center gap-3 text-gray-400 shrink-0">
             <motion.div className="font-variant-numeric tabular-nums w-20 text-right text-xs">
                {/* We render the MotionValue directly as text */}
                <TimeDisplay value={timeDisplay} />
             </motion.div>
             <Play className={`w-4 h-4 ${playState === 'playing' || playState === 'fixed' ? 'text-green-400 fill-green-400' : ''}`} />
          </div>
       </div>

       {/* Main Viewport */}
       <div className="grid grid-cols-1 md:grid-cols-2 h-[450px] md:h-[320px]">
          
          {/* Left: Code/State View */}
          <div className="border-r border-white/5 p-6 bg-[#0A0A0A] relative overflow-x-auto md:overflow-visible">
             {/* State Code Block */}
             <div className="space-y-1 min-w-[280px]">
                <div className="text-gray-500">// Current Scope</div>
                <div className="text-purple-400">const <span className="text-blue-300">paymentIntent</span> = {'{'}</div>
                
                <motion.div className="pl-4">
                   <div className="flex gap-2">
                      <span className="text-blue-300">id:</span> 
                      <span className="text-green-400">'pi_3X92k...'</span>,
                   </div>
                   <div className="flex gap-2">
                      <span className="text-blue-300">amount:</span> 
                      <span className="text-yellow-400">4900</span>,
                   </div>
                   
                   {/* Animated Status Line */}
                   <motion.div 
                     className={`flex gap-2 px-1 -ml-1 rounded transition-colors duration-300 ${
                        playState === 'error' ? 'bg-red-500/20' : 
                        playState === 'fixed' ? 'bg-green-500/20' : ''
                     }`}
                   >
                      <span className="text-blue-300">status:</span> 
                      <span className={
                        playState === 'playing' ? 'text-yellow-400' :
                        playState === 'error' ? 'text-red-400 font-bold' :
                        playState === 'rewinding' ? 'text-gray-400' :
                        'text-green-400 font-bold'
                      }>
                        {playState === 'playing' && "'processing'"}
                        {playState === 'error' && "'failed'"}
                        {playState === 'rewinding' && "'...rewinding'"}
                        {playState === 'fixed' && "'succeeded'"}
                      </span>
                   </motion.div>

                   <div className="flex gap-2">
                      <span className="text-blue-300">retries:</span> 
                      <span className="text-purple-400">
                         {playState === 'fixed' ? 1 : 0}
                      </span>
                   </div>
                </motion.div>
                
                <div className="text-purple-400">{'}'};</div>
             </div>

             {/* Error Toast */}
             <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                   opacity: playState === 'error' ? 1 : 0,
                   y: playState === 'error' ? 0 : 20
                }}
                className="absolute bottom-6 left-6 right-6 bg-red-500/10 border border-red-500/20 p-3 rounded-lg flex items-start gap-3 z-10"
             >
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                <div>
                   <div className="text-red-400 font-bold text-xs">Runtime Error</div>
                   <div className="text-red-300/70 text-[10px]">StripeAPIError: Connection timeout after 3000ms</div>
                </div>
             </motion.div>
          </div>

          {/* Right: Event Stream */}
          <div className="bg-[#080808] p-4 flex flex-col relative border-t md:border-t-0 border-white/5">
             <div className="text-xs text-gray-500 mb-4 font-semibold tracking-wider">EVENT STREAM</div>
             
             <div className="space-y-3 relative z-10 overflow-y-auto pb-8">
                <LogItem time="00:00.100" type="info" text="Workflow started" active={true} />
                <LogItem time="00:00.450" type="info" text="Payment intent created" active={true} />
                
                <LogItem 
                  time="00:01.200" 
                  type="warn" 
                  text="External API latency high" 
                  active={playState !== 'playing' || scrubberX.get() > 40} // Example logic
                />
                
                {playState !== 'fixed' && (
                   <LogItem 
                     time="00:02.500" 
                     type="error" 
                     text="Request timed out" 
                     active={playState === 'error'} 
                   />
                )}
                
                {playState === 'fixed' && (
                   <>
                     <LogItem time="00:01.800" type="success" text="Retry policy triggered" active={true} />
                     <LogItem time="00:02.100" type="success" text="Payment confirmed" active={true} />
                   </>
                )}
             </div>

             {/* Gradient fade at bottom */}
             <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#080808] to-transparent pointer-events-none" />
          </div>
       </div>

       {/* Timeline Area (Bottom) */}
       <div className="bg-[#050505] border-t border-white/5 h-16 relative">
          {/* Ticks */}
          <div className="absolute inset-0 flex justify-between px-4 items-end pb-2 opacity-20">
             {[...Array(20)].map((_, i) => (
                <div key={i} className={`w-px bg-white ${i % 5 === 0 ? 'h-3' : 'h-1.5'}`} />
             ))}
          </div>

          {/* Markers */}
          <div className="absolute top-1/2 -translate-y-1/2 left-[60%] w-2 h-2 rounded-full bg-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.5)] z-0" />
          
          {/* Scrubber Head */}
          <motion.div 
             className="absolute top-0 bottom-0 w-0.5 bg-brand-red z-10 shadow-[0_0_15px_rgba(255,59,48,1)]"
             style={{ left: useTransform(scrubberX, x => `${x}%`) }}
          >
             {/* Head Icon */}
             <div className="absolute -top-1.5 -translate-x-1/2 w-3 h-3 bg-brand-red rotate-45 border border-white" />
             
             {/* Drag Line Glow */}
             <div className="absolute top-0 bottom-0 -left-4 w-8 bg-brand-red/10 blur-sm" />
          </motion.div>
       </div>
    </div>
  );
};

const LogItem = ({ time, type, text, active }: any) => {
   const colors: any = {
      info: 'text-blue-400',
      warn: 'text-yellow-400',
      error: 'text-red-400',
      success: 'text-green-400'
   };

   return (
      <motion.div 
         initial={{ opacity: 0, x: -10 }}
         animate={{ opacity: active ? 1 : 0.3, x: active ? 0 : 0 }}
         className="flex items-center gap-3 text-xs"
      >
         <span className="text-gray-600 font-mono shrink-0">{time}</span>
         <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${type === 'error' ? 'bg-red-500' : type === 'success' ? 'bg-green-500' : 'bg-gray-600'}`} />
         <span className={`${active ? 'text-gray-300' : 'text-gray-700'} ${type === 'error' && active ? 'text-red-400' : ''} truncate`}>
            {text}
         </span>
      </motion.div>
   );
}

// Helper for rendering MotionValue as text
const TimeDisplay = ({ value }: { value: any }) => {
   const [display, setDisplay] = useState("00:00.000");
   useEffect(() => value.on("change", (latest: string) => setDisplay(latest)), [value]);
   return <>{display}</>;
}

export default TimeTravelSection;