import React from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';

const plans = [
  {
    name: "Developer",
    price: "$0",
    description: "Perfect for side projects and learning.",
    features: [
      "Up to 1,000 executions/mo",
      "14-day log retention",
      "Community support",
      "1 team member"
    ],
    highlight: false,
    delay: 0
  },
  {
    name: "Pro",
    price: "$49",
    period: "/mo",
    description: "For scaling teams with production workloads.",
    features: [
      "Unlimited executions",
      "90-day log retention",
      "Priority email support",
      "Time-travel debugging",
      "Up to 10 team members"
    ],
    highlight: true,
    delay: 0.1
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Security, compliance, and dedicated support.",
    features: [
      "Custom retention policies",
      "SAML / SSO",
      "Dedicated success manager",
      "99.99% Uptime SLA",
      "VPC Peering"
    ],
    highlight: false,
    delay: 0.2
  }
];

const PricingSection: React.FC = () => {
  return (
    <section id="pricing" className="w-full py-32 bg-[#050505] relative border-t border-white/5 overflow-hidden">
       {/* Background Glow */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-red/5 blur-[100px] rounded-full pointer-events-none" />

       <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto mb-20">
             <motion.div 
               initial={{ opacity: 0, y: 10 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="flex items-center justify-center gap-2 mb-4"
             >
                <div className="h-px w-8 bg-brand-red/50" />
                <span className="text-brand-red text-sm font-mono uppercase tracking-widest">Pricing</span>
                <div className="h-px w-8 bg-brand-red/50" />
             </motion.div>
             
             <motion.h2 
               initial={{ opacity: 0, y: 10 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.1 }}
               className="text-4xl md:text-5xl font-serif text-white mb-6"
             >
                Simple, transparent <br />
                <span className="italic text-gray-500">predictable pricing.</span>
             </motion.h2>
             
             <motion.p 
               initial={{ opacity: 0, y: 10 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2 }}
               className="text-gray-400 text-lg"
             >
                Start for free, scale as you grow. No credit card required for the developer plan.
             </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {plans.map((plan, i) => (
                <PricingCard key={i} plan={plan} />
             ))}
          </div>

       </div>
    </section>
  );
};

const PricingCard = ({ plan }: any) => {
   return (
      <motion.div 
         initial={{ opacity: 0, y: 20 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true }}
         transition={{ delay: plan.delay, duration: 0.5 }}
         className={`relative p-8 rounded-3xl border flex flex-col h-full ${
            plan.highlight 
             ? 'bg-gradient-to-b from-[#111] to-[#080808] border-brand-red/30 shadow-[0_0_30px_rgba(255,59,48,0.1)]' 
             : 'bg-[#0a0a0a] border-white/10'
         } group hover:border-brand-red/20 transition-all duration-300`}
      >
         {plan.highlight && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-red text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
               <Sparkles className="w-3 h-3" />
               MOST POPULAR
            </div>
         )}

         <div className="mb-8">
            <h3 className="text-lg font-medium text-white mb-2">{plan.name}</h3>
            <div className="flex items-baseline gap-1 mb-4">
               <span className="text-4xl font-serif text-white">{plan.price}</span>
               {plan.period && <span className="text-gray-500">{plan.period}</span>}
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">{plan.description}</p>
         </div>

         <ul className="space-y-4 mb-8 flex-grow">
            {plan.features.map((feature: string, idx: number) => (
               <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                  <div className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                     plan.highlight ? 'bg-brand-red/20' : 'bg-white/10'
                  }`}>
                     <Check className={`w-2.5 h-2.5 ${plan.highlight ? 'text-brand-red' : 'text-gray-400'}`} />
                  </div>
                  {feature}
               </li>
            ))}
         </ul>

         <button className={`w-full py-3 rounded-xl font-medium transition-all duration-200 ${
            plan.highlight
             ? 'bg-white text-black hover:bg-gray-100 shadow-[0_0_20px_rgba(255,255,255,0.2)]'
             : 'bg-white/5 text-white hover:bg-white/10 border border-white/5'
         }`}>
            {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
         </button>
      </motion.div>
   )
}

export default PricingSection;