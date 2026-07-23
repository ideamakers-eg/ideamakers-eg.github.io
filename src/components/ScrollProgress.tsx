import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { ArrowUp } from 'lucide-react';

const ScrollProgress = () => {
  const [showButton, setShowButton] = useState(false);
  const { scrollYProgress } = useScroll();
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      
      // Show button only when reaching the bottom of the page (within 100px threshold)
      if (windowHeight + scrollTop >= documentHeight - 100) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* 1. Top Progress Bar: Indicates horizontal scroll progress at the very top */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-purple-400 to-primary origin-left z-[9999] shadow-[0_0_20px_rgba(168,85,247,0.7)]"
        style={{ scaleX }}
      />

      {/* 2. Back to Top Button: Appears after 200px scroll */}
      <AnimatePresence>
        {showButton && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            className="fixed bottom-6 right-6 sm:bottom-10 sm:right-10 z-[9998]"
          >
            <div className="relative group">
              {/* Circular Progress Indicator: Wraps the button */}
              <svg className="w-14 h-14 sm:w-16 sm:h-16 transform -rotate-90">
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  className="stroke-white/10 fill-none"
                  strokeWidth="3"
                />
                <motion.circle
                  cx="32"
                  cy="32"
                  r="28"
                  className="stroke-primary fill-none"
                  strokeWidth="3"
                  strokeDasharray="176"
                  style={{
                    pathLength: scrollYProgress
                  }}
                />
              </svg>

              {/* The Main Button: Features a dynamic gradient and glassmorphism */}
              <motion.button
                whileHover={{ 
                  scale: 1.1, 
                  boxShadow: "0 0 40px rgba(168,85,247,0.8)",
                  backgroundImage: "linear-gradient(to bottom right, #a855f7, #7e22ce)" 
                }}
                whileTap={{ scale: 0.9 }}
                onClick={scrollToTop}
                className="absolute inset-0 m-auto w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-primary-dark rounded-full shadow-[0_0_30px_rgba(168,85,247,0.5)] flex items-center justify-center border border-white/40 backdrop-blur-md transition-all duration-300 z-[10000] cursor-pointer"
                aria-label="Back to top"
              >
                {/* Pulse Animated Arrow: High visibility white icon */}
                <motion.div
                  animate={{ 
                    y: [0, -4, 0],
                    opacity: [1, 0.8, 1]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                >
                  <ArrowUp 
                    className="w-6 h-6 sm:w-7 sm:h-7 text-white stroke-[3.5px] drop-shadow-md" 
                    color="white"
                  />
                </motion.div>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ScrollProgress;
