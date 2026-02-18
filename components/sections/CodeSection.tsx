import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Copy, Check } from 'lucide-react';

const codeSnippet = `import { createWorkflow } from '@flowgrid/sdk';

export default createWorkflow({
  name: 'data-pipeline-v1',
  cron: '0 0 * * *',
  tasks: [
    async (ctx) => {
      // Fetch data from source
      const data = await ctx.fetch('/api/users');
      return data.json();
    },
    async (ctx, data) => {
      // Process and cache result
      await ctx.cache.set('users', data);
    }
  ]
});`;

const CodeSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <section className="w-full py-32 bg-[#050505] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Text Content */}
        <div className="order-2 lg:order-1">
          <div className="flex items-center gap-2 mb-6">
            <Terminal className="w-5 h-5 text-brand-red" />
            <span className="text-sm font-mono text-brand-red uppercase tracking-widest">Developer First</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
            Defined in code.<br />
            <span className="text-gray-500">Versioned in Git.</span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-md">
            Stop clicking through endless GUIs. Define your workflows as pure Typescript functions. 
            We handle the orchestration, state management, and retries.
          </p>
          
          <ul className="space-y-4">
            {['Type-safe definitions', 'Local testing & debugging', 'Zero infrastructure config'].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-gray-300">
                <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Code Visual */}
        <div className="order-1 lg:order-2 relative group">
          <div className="absolute inset-0 bg-brand-red/10 blur-[100px] rounded-full opacity-20" />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative bg-[#0F0F0F] border border-white/10 rounded-xl overflow-hidden shadow-2xl"
          >
            {/* Editor Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/5">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
              </div>
              <div className="flex items-center gap-4">
                <div className="text-xs font-mono text-gray-500">workflow.ts</div>
                <button 
                  onClick={handleCopy}
                  className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors focus:outline-none"
                >
                   <AnimatePresence mode='wait'>
                    {copied ? (
                      <motion.div
                        key="check"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="flex items-center gap-1.5"
                      >
                         <span className="text-xs text-green-400 font-medium">Copied!</span>
                         <Check className="w-4 h-4 text-green-400" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="copy"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                      >
                        <Copy className="w-4 h-4" />
                      </motion.div>
                    )}
                   </AnimatePresence>
                </button>
              </div>
            </div>

            {/* Code Content */}
            <div className="p-6 overflow-x-auto">
              <pre className="font-mono text-sm leading-relaxed text-gray-300">
                <code dangerouslySetInnerHTML={{ 
                  __html: codeSnippet
                    .replace(/import/g, '<span class="text-purple-400">import</span>')
                    .replace(/from/g, '<span class="text-purple-400">from</span>')
                    .replace(/export default/g, '<span class="text-purple-400">export default</span>')
                    .replace(/createWorkflow/g, '<span class="text-blue-400">createWorkflow</span>')
                    .replace(/'([^']*)'/g, '<span class="text-green-400">\'$1\'</span>')
                    .replace(/async/g, '<span class="text-yellow-400">async</span>')
                    .replace(/\/\/.*/g, '<span class="text-gray-500">$&</span>')
                    .replace(/const|return|await/g, '<span class="text-purple-400">$&</span>')
                    .replace(/([a-z]+):/g, '<span class="text-sky-300">$1</span>:')
                }} />
              </pre>
            </div>
            
            {/* Cursor Animation */}
            <motion.div 
               className="absolute bottom-12 left-12 w-2 h-5 bg-white/50"
               animate={{ opacity: [1, 0, 1] }}
               transition={{ duration: 1, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CodeSection;