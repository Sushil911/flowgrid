import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "How does the retry mechanism work?",
    answer: "Flowgrid uses an exponential backoff strategy by default. You can configure the initial interval, maximum attempts, and backoff multiplier per node in your workflow definition."
  },
  {
    question: "Can I self-host Flowgrid?",
    answer: "Yes! We offer a Docker-compose setup for local development and a Helm chart for Kubernetes deployments. The open-source version is MIT licensed."
  },
  {
    question: "Is Flowgrid SOC2 compliant?",
    answer: "Our managed cloud service is SOC2 Type II compliant. We encrypt all data at rest and in transit, and undergo annual third-party security audits."
  },
  {
    question: "What languages are supported?",
    answer: "Currently, we offer a first-class TypeScript/Node.js SDK. Python and Go SDKs are in beta and available upon request for Enterprise customers."
  },
  {
    question: "How do you handle secrets?",
    answer: "Secrets are encrypted using AES-256-GCM and stored in a dedicated vault. They are injected into your workflow execution environment only at runtime."
  }
];

const FAQSection: React.FC = () => {
  return (
    <section id="faq" className="w-full py-32 bg-[#050505] relative border-t border-white/5">
      <div className="max-w-3xl mx-auto px-6 md:px-12 relative z-10">
         
         <div className="text-center mb-16">
            <motion.h2 
               initial={{ opacity: 0, y: 10 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="text-3xl md:text-4xl font-serif text-white mb-4"
            >
               Frequently Asked Questions
            </motion.h2>
            <motion.p 
               initial={{ opacity: 0, y: 10 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.1 }}
               className="text-gray-400"
            >
               Everything you need to know about the platform.
            </motion.p>
         </div>

         <div className="space-y-4">
            {faqs.map((faq, i) => (
               <FAQItem key={i} faq={faq} delay={i * 0.1} />
            ))}
         </div>

      </div>
    </section>
  );
};

const FAQItem = ({ faq, delay }: any) => {
   const [isOpen, setIsOpen] = useState(false);

   return (
      <motion.div 
         initial={{ opacity: 0, y: 10 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true }}
         transition={{ delay }}
         className="border border-white/10 rounded-xl bg-[#0a0a0a] overflow-hidden hover:border-white/20 transition-colors"
      >
         <button 
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between p-6 text-left"
         >
            <span className="text-white font-medium pr-8">{faq.question}</span>
            <div className={`p-1 rounded-full border border-white/10 transition-colors ${isOpen ? 'bg-brand-red border-brand-red text-white' : 'text-gray-400'}`}>
               {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </div>
         </button>
         
         <AnimatePresence>
            {isOpen && (
               <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
               >
                  <div className="px-6 pb-6 text-gray-400 text-sm leading-relaxed">
                     {faq.answer}
                  </div>
               </motion.div>
            )}
         </AnimatePresence>
      </motion.div>
   )
}

export default FAQSection;