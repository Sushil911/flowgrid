import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, CheckCircle2 } from 'lucide-react';
import Navbar from './components/Navbar';
import IsometricScene from './components/isometric/IsometricScene';
import Ruler from './components/ui/Ruler';
import GridBackground from './components/ui/GridBackground';
import FeatureCarousel from './components/FeatureCarousel';
import CodeSection from './components/sections/CodeSection';
import StatsSection from './components/sections/StatsSection';
import FooterCTA from './components/sections/FooterCTA';
import BentoGridSection from './components/sections/BentoGridSection';
import IntegrationSection from './components/sections/IntegrationSection';
import WorkflowEngineSection from './components/sections/WorkflowEngineSection';
import TimeTravelSection from './components/sections/TimeTravelSection';
import PricingSection from './components/sections/PricingSection';
import FAQSection from './components/sections/FAQSection';
import DeploymentPipelineSection from './components/sections/DeploymentPipelineSection';
import Footer from './components/Footer';

const App: React.FC = () => {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } 
    }
  };

  return (
    <div className="w-full bg-[#050505] text-white overflow-x-hidden relative selection:bg-brand-red/30 selection:text-white">
      <GridBackground />
      <Navbar />
      <Ruler />

      {/* Hero Section */}
      <main className="relative z-10 pt-32 pb-20 px-6 md:px-12 max-w-[1400px] mx-auto min-h-screen flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT COLUMN: TEXT */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-8 max-w-xl"
          >
            {/* Tagline */}
            <motion.div variants={itemVariants} className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-widest text-brand-red">v3.0 Available Now</span>
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-serif leading-[1.1] tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70">
              Your workflows aren't linear. <br/>
              <span className="italic text-white">Your engine shouldn't be either.</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p variants={itemVariants} className="text-lg text-gray-400 leading-relaxed max-w-md">
              A graph-based workflow engine with node-level retries, checkpointing, and crash-safe execution built for production systems.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 pt-4">
              <button className="group relative px-8 py-3.5 bg-white rounded-full font-semibold flex items-center gap-2 overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] active:scale-95">
                {/* Red Background Slide */}
                <div className="absolute inset-0 bg-brand-red transform translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0" />
                
                {/* Text Content */}
                <span className="relative z-10 flex items-center gap-2 text-brand-dark transition-colors duration-300 group-hover:text-white">
                  Get Started 
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </button>

              <button className="group px-6 py-3.5 rounded-full border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 transition-all duration-300 flex items-center gap-2 font-medium active:scale-95 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                <Star className="w-4 h-4 text-gray-400 group-hover:text-yellow-400 transition-colors duration-300" />
                <span>Star Github</span>
                <span className="ml-2 bg-white/10 text-xs px-2 py-0.5 rounded text-gray-400 group-hover:text-white transition-colors">2.4k</span>
              </button>
            </motion.div>
            
            {/* Trust Badges */}
            <motion.div variants={itemVariants} className="pt-8 flex items-center gap-6 border-t border-white/5 mt-8">
               <div className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-300 transition-colors cursor-default">
                 <CheckCircle2 className="w-4 h-4 text-brand-red" />
                 <span>Type-safe SDK</span>
               </div>
               <div className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-300 transition-colors cursor-default">
                 <CheckCircle2 className="w-4 h-4 text-brand-red" />
                 <span>Zero Infrastructure</span>
               </div>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: 3D SCENE */}
          <div className="relative h-full flex items-center justify-center lg:justify-end">
             <IsometricScene />
          </div>

        </div>
      </main>
      
      {/* Workflow Engine Section */}
      <div id="features">
        <WorkflowEngineSection />
      </div>

      {/* Time Travel Section */}
      <TimeTravelSection />

      {/* NEW: Deployment Pipeline Section */}
      <DeploymentPipelineSection />

      {/* Bento Grid Features */}
      <BentoGridSection />

      {/* Feature Carousel Section */}
      <FeatureCarousel />
      
      {/* Code Section */}
      <CodeSection />

      {/* Stats Section */}
      <StatsSection />
      
      {/* Integrations */}
      <IntegrationSection />
      
      {/* Pricing Section */}
      <PricingSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Footer CTA */}
      <FooterCTA />

      {/* Footer */}
      <Footer />
      
    </div>
  );
};

export default App;