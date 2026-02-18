import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { label: "Daily Executions", value: "2.5M+", color: "text-white" },
  { label: "Global Edge Nodes", value: "140", color: "text-brand-red" },
  { label: "Uptime SLA", value: "99.99%", color: "text-white" },
  { label: "Contributors", value: "400+", color: "text-white" }
];

const StatsSection: React.FC = () => {
  return (
    <section className="w-full py-24 bg-[#080808] border-y border-white/5 relative">
       {/* Mesh Background */}
       <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
       
       <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
         <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex flex-col gap-2"
              >
                <div className={`text-4xl md:text-5xl font-serif font-medium ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-sm font-mono text-gray-500 uppercase tracking-widest">
                  {stat.label}
                </div>
              </motion.div>
            ))}
         </div>
       </div>
    </section>
  );
};

export default StatsSection;