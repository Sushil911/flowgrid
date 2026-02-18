import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const FooterCTA: React.FC = () => {
  return (
    <section className="w-full py-32 bg-[#050505] relative overflow-hidden flex flex-col items-center justify-center text-center border-b border-white/5">
       {/* Background Glow */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-red/5 rounded-full blur-[120px] pointer-events-none" />
       
       <div className="relative z-10 max-w-3xl px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-serif text-white mb-8 tracking-tight"
          >
            Ready to break <br/> the <span className="italic text-brand-red">linear</span> cycle?
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 mb-10 max-w-lg mx-auto"
          >
            Join 4,000+ engineering teams shipping reliable workflows at scale.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-gray-100 transition-colors flex items-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              Start Building Now
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 text-gray-400 hover:text-white transition-colors font-medium border border-transparent hover:border-white/10 rounded-full"
            >
              Read Documentation
            </motion.button>
          </motion.div>
       </div>
    </section>
  );
};

export default FooterCTA;