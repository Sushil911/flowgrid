import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Github, Server, Globe, Check } from 'lucide-react';

const steps = [
  {
    id: 'local',
    label: 'Local Dev',
    icon: Terminal,
    description: 'Develop and test functions locally with full parity.',
    color: 'text-gray-400'
  },
  {
    id: 'git',
    label: 'Git Push',
    icon: Github,
    description: 'Automatic triggers on push to main branch.',
    color: 'text-white'
  },
  {
    id: 'build',
    label: 'Build & Test',
    icon: Server,
    description: 'Parallelized builds and integration tests.',
    color: 'text-yellow-400'
  },
  {
    id: 'deploy',
    label: 'Global Edge',
    icon: Globe,
    description: 'Instant propagation to 140+ regions.',
    color: 'text-brand-red'
  }
];

const DeploymentPipelineSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    let mounted = true;

    const runSequence = async () => {
      while (mounted) {
        // Step 1: Local
        setActiveStep(0);
        await new Promise(r => setTimeout(r, 1500));
        if (!mounted) break;

        // Step 2: Git
        setActiveStep(1);
        await new Promise(r => setTimeout(r, 1500));
        if (!mounted) break;

        // Step 3: Build
        setActiveStep(2);
        await new Promise(r => setTimeout(r, 1500));
        if (!mounted) break;

        // Step 4: Deploy
        setActiveStep(3);
        await new Promise(r => setTimeout(r, 3000)); // Longer pause at the end
        if (!mounted) break;
        
        // Loop continues back to 0
      }
    };

    runSequence();

    return () => { mounted = false; };
  }, []);

  return (
    <section className="w-full py-32 bg-[#050505] relative border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
         
         <div className="text-center mb-24 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
               From <span className="font-mono text-brand-red">localhost</span> to <br/>
               <span className="italic text-gray-500">production in seconds.</span>
            </h2>
            <p className="text-gray-400 text-lg">
               Forget about provisioning servers, configuring VPCs, or managing container registries. Just push code.
            </p>
         </div>

         {/* Pipeline Visualization */}
         <div className="relative">
            
            {/* Connecting Line Background */}
            <div className="absolute top-12 left-0 right-0 h-px bg-white/10 hidden md:block" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-4 relative">
               {steps.map((step, idx) => {
                  const isActive = idx <= activeStep;
                  const isCurrent = idx === activeStep;

                  return (
                     <div key={step.id} className="relative flex flex-col items-center text-center group">
                        
                        {/* Node Circle */}
                        <motion.div 
                           className={`w-24 h-24 rounded-2xl border flex items-center justify-center relative z-10 transition-colors duration-500 bg-[#080808] ${
                              isActive 
                                 ? 'border-brand-red text-white shadow-[0_0_30px_rgba(255,59,48,0.15)]' 
                                 : 'border-white/10 text-gray-600'
                           }`}
                           animate={isCurrent ? {
                             scale: [1, 1.1, 1],
                             boxShadow: ["0 0 0px rgba(255,59,48,0)", "0 0 20px rgba(255,59,48,0.3)", "0 0 0px rgba(255,59,48,0)"]
                           } : {
                             scale: 1,
                             boxShadow: isActive ? "0 0 30px rgba(255,59,48,0.15)" : "none"
                           }}
                           transition={{ duration: 1.5, repeat: isCurrent ? Infinity : 0 }}
                        >
                           {/* Icon */}
                           <step.icon className={`w-8 h-8 ${isActive ? step.color : 'text-gray-600'} transition-colors duration-500`} />

                           {/* Active Pulse Ring - Extra visual */}
                           {isCurrent && (
                              <motion.div 
                                 initial={{ scale: 1, opacity: 0.5 }}
                                 animate={{ scale: 1.5, opacity: 0 }}
                                 transition={{ duration: 1.5, repeat: Infinity }}
                                 className="absolute inset-0 rounded-2xl border border-brand-red/50"
                              />
                           )}
                           
                           {/* Connection Line Progress (Mobile: Vertical) */}
                           {idx < steps.length - 1 && (
                              <div className="absolute top-full left-1/2 w-px h-12 bg-white/10 md:hidden">
                                 <motion.div 
                                    className="w-full bg-brand-red"
                                    initial={{ height: "0%" }}
                                    animate={{ height: isActive ? "100%" : "0%" }}
                                    transition={{ duration: 0.5 }}
                                 />
                              </div>
                           )}
                           
                           {/* Connection Line Progress (Desktop: Horizontal) */}
                           {idx < steps.length - 1 && (
                              <div className="absolute left-full top-1/2 h-px w-[calc(100%+2rem)] -translate-y-1/2 bg-white/10 hidden md:block -z-10">
                                 <motion.div 
                                    className="h-full bg-gradient-to-r from-brand-red to-brand-red/50"
                                    initial={{ width: "0%" }}
                                    animate={{ width: isActive ? "100%" : "0%" }}
                                    transition={{ duration: 0.8, ease: "easeInOut" }}
                                 />
                              </div>
                           )}

                           {/* Status Badge */}
                           <div className={`absolute -top-3 -right-3 w-6 h-6 rounded-full flex items-center justify-center border transition-all duration-300 ${
                              isActive ? 'bg-brand-red border-brand-red text-white scale-100' : 'bg-[#080808] border-white/10 text-transparent scale-0'
                           }`}>
                              <Check className="w-3 h-3" />
                           </div>
                        </motion.div>

                        {/* Text Content */}
                        <div className="mt-8 px-2">
                           <h3 className={`text-lg font-medium mb-2 transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-500'}`}>
                              {step.label}
                           </h3>
                           <p className="text-sm text-gray-500 leading-relaxed">
                              {step.description}
                           </p>
                        </div>
                     </div>
                  );
               })}
            </div>
         </div>
      </div>
    </section>
  );
};

export default DeploymentPipelineSection;