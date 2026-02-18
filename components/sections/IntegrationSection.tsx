import React from 'react';
import { motion } from 'framer-motion';
import { Database, Cloud, MessageSquare, Github, GitBranch, Terminal, Server, Box } from 'lucide-react';

const integrations = [
  { name: "PostgreSQL", icon: Database, color: "text-blue-400" },
  { name: "AWS Lambda", icon: Cloud, color: "text-yellow-400" },
  { name: "Slack", icon: MessageSquare, color: "text-green-400" },
  { name: "GitHub", icon: Github, color: "text-white" },
  { name: "Redis", icon: Server, color: "text-red-400" },
  { name: "Docker", icon: Box, color: "text-blue-500" },
  { name: "Terraform", icon: Terminal, color: "text-purple-400" },
  { name: "Kafka", icon: GitBranch, color: "text-orange-400" },
];

const IntegrationSection: React.FC = () => {
  return (
    <section className="w-full py-32 bg-[#050505] relative border-t border-white/5 overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center">
         
         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="mb-16 max-w-2xl text-center"
         >
           <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
             Plays well with <span className="italic text-gray-500">others.</span>
           </h2>
           <p className="text-gray-400 text-lg">
             Connect Flowgrid to your existing stack with over 50+ pre-built integrations.
           </p>
         </motion.div>

         {/* Line Grid Layout */}
         <div className="w-full max-w-5xl mx-auto border-t border-l border-white/10">
           <div className="grid grid-cols-2 md:grid-cols-4">
             {integrations.map((item, idx) => (
               <motion.div
                 key={idx}
                 initial={{ opacity: 0 }}
                 whileInView={{ opacity: 1 }}
                 viewport={{ once: true }}
                 transition={{ delay: idx * 0.05 }}
                 className="group relative h-48 border-r border-b border-white/10 flex flex-col items-center justify-center hover:bg-white/[0.02] transition-colors"
               >
                  {/* Subtle Corner Markers */}
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Icon */}
                  <motion.div 
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="p-4 rounded-xl bg-[#0F0F0F] border border-white/5 mb-4 shadow-lg group-hover:shadow-brand-red/10 group-hover:border-white/10 transition-all duration-300 relative z-10"
                  >
                    <item.icon className={`w-8 h-8 ${item.color}`} />
                  </motion.div>
                  
                  <span className="text-sm font-mono text-gray-500 group-hover:text-white transition-colors">
                    {item.name}
                  </span>
               </motion.div>
             ))}
           </div>
         </div>
         
         <div className="mt-12 flex items-center gap-2 text-sm text-gray-500 font-mono">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>+ 40 more integrations available</span>
         </div>
      </div>
    </section>
  );
};

export default IntegrationSection;