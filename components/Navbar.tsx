import React, { useEffect, useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Background Layer - transitions independently for smoothness */}
      <div 
        className={`absolute inset-0 transition-all duration-500 ease-in-out ${
           scrolled 
             ? 'bg-[#050505]/80 backdrop-blur-md border-b border-white/[0.08]' 
             : 'bg-transparent border-b border-transparent backdrop-blur-none'
        }`}
      />

      <div className={`relative max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between transition-all duration-500 ease-in-out ${scrolled ? 'py-4' : 'py-6'}`}>
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group cursor-pointer z-20">
          <div className="w-8 h-8 bg-brand-red rounded-lg flex items-center justify-center text-white font-bold italic shadow-[0_0_15px_rgba(255,59,48,0.5)] group-hover:shadow-[0_0_25px_rgba(255,59,48,0.8)] transition-all duration-300">
            F
          </div>
          <span className="text-lg font-semibold tracking-tight text-white">Flowgrid</span>
        </a>

        {/* Desktop Links */}
        <div 
          className={`hidden md:flex items-center gap-8 px-6 py-2 rounded-full border transition-all duration-500 ease-in-out z-10 ${
            scrolled 
              ? 'bg-transparent border-transparent shadow-none' 
              : 'bg-white/5 backdrop-blur-sm border-white/10 shadow-lg'
          }`}
        >
          {navLinks.map((item) => (
             <a key={item.name} href={item.href} className="text-sm text-gray-400 hover:text-white transition-colors relative group">
               {item.name}
               <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-red transition-all duration-300 group-hover:w-full" />
             </a>
          ))}
        </div>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center gap-4 z-10">
           <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-brand-red hover:text-white border border-brand-red/30 hover:bg-brand-red hover:border-brand-red rounded-lg transition-all duration-300 shadow-[0_0_10px_rgba(255,59,48,0.1)] hover:shadow-[0_0_20px_rgba(255,59,48,0.4)] active:scale-95 group">
             <span>Login</span>
           </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white hover:text-brand-red transition-colors z-20 p-2"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-0 z-10 bg-[#050505] pt-24 px-6 md:hidden flex flex-col"
          >
            {/* Background Gradients */}
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-brand-red/10 blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-blue-500/10 blur-[80px] pointer-events-none" />

            <div className="flex flex-col gap-6 text-xl">
              {navLinks.map((item, i) => (
                <motion.a 
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-4 border-b border-white/5 text-gray-300 hover:text-white flex items-center justify-between group"
                >
                  {item.name}
                  <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all text-brand-red" />
                </motion.a>
              ))}
              
              <motion.button 
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: 0.3 }}
                 className="mt-8 w-full py-4 bg-brand-red text-white rounded-xl font-semibold shadow-[0_0_20px_rgba(255,59,48,0.3)]"
              >
                Login to Dashboard
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;