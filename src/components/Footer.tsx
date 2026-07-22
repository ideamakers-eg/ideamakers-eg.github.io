import React from 'react';
import { motion } from 'motion/react';
import { Heart, Gamepad2 } from 'lucide-react';

/**
 * Footer Component
 * 
 * Features:
 * - Semantic <footer> tag for SEO and accessibility.
 * - Modern, minimalistic, and elegant design.
 * - Responsive layout (Mobile, Tablet, Desktop).
 * - Highlighting for company and developer names with subtle hover effects.
 * - No external links on developer name as per request.
 */
interface FooterProps {
  onAdminClick?: () => void;
  onLogoClick?: () => void;
}

const Footer = ({ onAdminClick, onLogoClick }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#050505] border-t border-white/5 pt-20 pb-10 overflow-hidden">
      {/* Subtle Background Accents */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[80%] h-64 bg-primary/5 blur-[120px] rounded-full pointer-events-none opacity-50" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center">
          
          {/* Brand Identity */}
          <motion.div 
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-10 group cursor-pointer"
            onClick={() => {
              if (onLogoClick) {
                onLogoClick();
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <div className="w-12 h-12 rounded-2xl bg-white/[0.03] flex items-center justify-center border border-white/10 group-hover:border-primary/30 transition-all duration-500">
              <Gamepad2 className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-white/90 group-hover:text-white transition-colors">
              IDEA MAKERS
            </span>
          </motion.div>

          {/* Copyright Section */}
          <motion.div 
            initial={false}
            animate={{ opacity: 1 }}
            className="mb-10"
          >
            <p className="text-gray-500 text-sm sm:text-base font-medium tracking-wide">
              © {currentYear} <span className="text-white font-bold hover:text-primary transition-colors duration-300 cursor-default">صُنّاع الفكرة</span>. جميع الحقوق محفوظة.
            </p>
          </motion.div>

          {/* Minimalist Divider - Hidden Admin Gateway */}
          <div 
            id="admin-secret-divider"
            onClick={onAdminClick}
            className="w-12 h-[2px] bg-white/10 mb-10 cursor-pointer hover:bg-white/25 active:scale-95 transition-all duration-300"
          />

          {/* Developer Credit (Linked) */}
          <motion.div 
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row items-center gap-2 text-xs sm:text-sm text-gray-500 font-medium"
          >
            <div className="flex items-center gap-2">
              <span>Developed with</span>
              <div>
                <Heart className="w-3.5 h-3.5 text-red-500/80 fill-red-500/20" />
              </div>
              <span>by CEO:</span>
            </div>
            
            <a 
              href="https://eslamarafa-dev.github.io/Modern-Frontend-Portfolio/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-2 py-1 cursor-pointer"
            >
              <span className="text-gray-300 font-bold transition-all duration-300 group-hover:text-primary">
                Eslam Arafa
              </span>
              {/* Subtle hover underline effect */}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-primary/40 group-hover:w-full transition-all duration-500" />
            </a>
          </motion.div>

          {/* Global Standard Badge */}
          <motion.div 
            initial={false}
            animate={{ opacity: 1 }}
            className="mt-16"
          >
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/10 select-none">
              Engineering Excellence & Innovation
            </span>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
