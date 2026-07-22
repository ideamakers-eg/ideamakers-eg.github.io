import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useMotionValueEvent } from 'motion/react';
import { ArrowUp } from 'lucide-react';

const ScrollProgress = () => {
  const [showButton, setShowButton] = useState(false);
  const { scrollYProgress } = useScroll();
  
  const scaleX = scrollYProgress;

  // Dynamically listen to scroll progress changes from Framer Motion's own optimized passive scroll loop
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Show back-to-top button when user is within 5% of the bottom
    if (latest >= 0.92) {
      if (!showButton) setShowButton(true);
    } else {
      if (showButton) setShowButton(false);
    }
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      {/* 1. Top Progress Bar: Indicates horizontal scroll progress at the very top */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-purple-400 to-primary origin-left z-[9999] shadow-[0_0_20px_rgba(168,85,247,0.7)]"
        style={{ scaleX }}
      />

      {/* 2. Back to Top Button: Appears near bottom */}
      <AnimatePresence>
        {showButton && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 4 }}
            transition={{ duration: 0.15 }}
            className="fixed bottom-24 right-6 sm:bottom-10 sm:right-10 z-[9998]"
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
                {!isMobile && (
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
                )}
              </svg>
              
              {/* The Main Button: Features a dynamic gradient and glassmorphism */}
              <motion.button
                whileHover={isMobile ? undefined : { 
                  scale: 1.03, 
                  boxShadow: "0 0 15px rgba(168,85,247,0.4)",
                }}
                whileTap={{ scale: 0.98 }}
                onClick={scrollToTop}
                className="absolute inset-0 m-auto w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-primary-dark rounded-full shadow-[0_0_20px_rgba(168,85,247,0.4)] flex items-center justify-center border border-white/20 backdrop-blur-md transition-all duration-300 z-[10000] cursor-pointer"
                aria-label="Back to top"
              >
                {/* Arrow icon with hardware-accelerated transitions */}
                <div>
                  <ArrowUp 
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white stroke-[3.5px] drop-shadow-md" 
                    color="white"
                  />
                </div>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ScrollProgress;
