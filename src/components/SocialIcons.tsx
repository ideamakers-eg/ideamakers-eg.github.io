import React from 'react';
import { motion } from 'motion/react';
import { Facebook, Youtube, MessageCircle, Music2 } from 'lucide-react';

const socialLinks = [
  {
    name: 'فيسبوك',
    icon: Facebook,
    url: 'https://www.facebook.com/profile.php?id=61572400644539',
    color: '#1877F2',
    tooltip: 'تابعنا على فيسبوك',
  },
  {
    name: 'واتساب',
    icon: MessageCircle,
    url: 'https://wa.me/201121778205?text',
    color: '#25D366',
    tooltip: 'تواصل واتساب',
  },
  {
    name: 'يوتيوب',
    icon: Youtube,
    url: 'https://www.youtube.com/@%D8%B5%D9%86%D8%A7%D8%B9%D8%A7%D9%84%D9%81%D9%83%D8%B1%D8%A9',
    color: '#FF0000',
    tooltip: 'شاهدنا على يوتيوب',
  },
  {
    name: 'تيك توك',
    icon: Music2,
    url: 'https://www.tiktok.com/@ideamakers2',
    color: '#000000',
    tooltip: 'تابعنا على تيك توك',
    isTikTok: true,
  },
];

export const SocialIcons = () => {
  return (
    <section className="py-12 bg-black/40 border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-8">
          <motion.h3 
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl sm:text-2xl font-black text-white text-center"
          >
            تواصل معنا عبر منصاتنا
          </motion.h3>
          
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10 social-icons-row">
            {socialLinks.map((social) => (
              <motion.div
                key={social.name}
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                className="relative group"
              >
                {/* Tooltip */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-white text-black text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-xl z-20">
                  {social.tooltip}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45" />
                </div>

                <motion.a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/5 border border-white/10 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:border-white/20 social-icon-btn"
                  style={{ 
                    boxShadow: `0 10px 30px -10px rgba(0,0,0,0.5)`
                  }}
                >
                  {/* Glow Effect on Hover */}
                  <div 
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-300"
                    style={{ backgroundColor: social.color }}
                  />
                  
                  <social.icon 
                    className="w-6 h-6 sm:w-7 sm:h-7 relative z-10 transition-all duration-300 group-hover:brightness-125" 
                    style={{ color: social.color === '#000000' ? '#FFFFFF' : social.color }}
                  />

                  {/* Special styling for TikTok if it's black */}
                  {social.isTikTok && (
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#00f2ea] via-black to-[#ff0050] opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                  )}
                </motion.a>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
