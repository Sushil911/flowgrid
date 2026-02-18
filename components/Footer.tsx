import React from 'react';
import { Github, Twitter, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#080808] py-20 px-6 md:px-12 border-t border-white/10 text-sm relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
        
        {/* Brand Column */}
        <div className="col-span-1 md:col-span-4 flex flex-col gap-6">
          <div className="flex items-center gap-2">
             <div className="w-6 h-6 bg-brand-red rounded-md flex items-center justify-center text-white font-bold italic text-xs">F</div>
             <span className="font-semibold text-white text-base">Flowgrid</span>
          </div>
          <p className="text-gray-300 leading-relaxed max-w-xs">
            The standard for directed acyclic graph workflows. Built for resilience, scale, and developer experience.
          </p>
          <div className="flex gap-4">
             <a href="#" className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"><Github className="w-5 h-5" /></a>
             <a href="#" className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"><Twitter className="w-5 h-5" /></a>
             <a href="#" className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"><Linkedin className="w-5 h-5" /></a>
          </div>
        </div>

        {/* Links Column 1 */}
        <div className="col-span-1 md:col-span-2">
           <h4 className="text-white font-semibold mb-6">Product</h4>
           <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-brand-red transition-colors hover:translate-x-1 inline-block duration-200">Features</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand-red transition-colors hover:translate-x-1 inline-block duration-200">Integrations</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand-red transition-colors hover:translate-x-1 inline-block duration-200">Pricing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand-red transition-colors hover:translate-x-1 inline-block duration-200">Changelog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand-red transition-colors hover:translate-x-1 inline-block duration-200">Docs</a></li>
           </ul>
        </div>

        {/* Links Column 2 */}
        <div className="col-span-1 md:col-span-2">
           <h4 className="text-white font-semibold mb-6">Company</h4>
           <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-brand-red transition-colors hover:translate-x-1 inline-block duration-200">About</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand-red transition-colors hover:translate-x-1 inline-block duration-200">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand-red transition-colors hover:translate-x-1 inline-block duration-200">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand-red transition-colors hover:translate-x-1 inline-block duration-200">Customers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand-red transition-colors hover:translate-x-1 inline-block duration-200">Brand</a></li>
           </ul>
        </div>

        {/* Links Column 3 */}
        <div className="col-span-1 md:col-span-2">
           <h4 className="text-white font-semibold mb-6">Resources</h4>
           <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-brand-red transition-colors hover:translate-x-1 inline-block duration-200">Community</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand-red transition-colors hover:translate-x-1 inline-block duration-200">Contact</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand-red transition-colors hover:translate-x-1 inline-block duration-200">DPA</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand-red transition-colors hover:translate-x-1 inline-block duration-200">Terms of Service</a></li>
           </ul>
        </div>

        {/* Status Column */}
        <div className="col-span-1 md:col-span-2">
            <h4 className="text-white font-semibold mb-6">Status</h4>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group">
               <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500 group-hover:bg-green-400 transition-colors"></span>
                </span>
               <span className="text-gray-300 font-medium group-hover:text-white transition-colors">All systems normal</span>
            </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400">
         <p>© 2026 Flowgrid Inc. All rights reserved.</p>
         <p className="text-xs hover:text-white transition-colors cursor-default">Designed by Flowgrid Team</p>
      </div>
    </footer>
  );
};

export default Footer;