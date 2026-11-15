import React from 'react';
import { motion, useScroll } from 'motion/react';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();

  return (
    <>
      {/* Top Progress Bar: Indicates horizontal scroll progress at the very top */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-purple-400 to-primary origin-left z-[9999] shadow-[0_0_20px_rgba(168,85,247,0.7)]"
        style={{ scaleX: scrollYProgress }}
      />
    </>
  );
};

export default ScrollProgress;
