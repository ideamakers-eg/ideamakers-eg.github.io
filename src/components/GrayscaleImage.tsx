import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { getMediaItem } from '../lib/db';

interface GrayscaleImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
}

/**
 * GrayscaleImage Component
 * 
 * Features:
 * - Hardware-accelerated grayscale to color transition.
 * - Smooth scale-up effect on hover/touch.
 * - Optimized for mobile touch and desktop hover.
 * - Lazy loading support.
 * - Supports db:// URLs for custom local uploads.
 */
const GrayscaleImage: React.FC<GrayscaleImageProps> = ({ 
  src, 
  alt, 
  className = "", 
  aspectRatio = "aspect-video" 
}) => {
  const [resolvedSrc, setResolvedSrc] = useState<string>('');

  useEffect(() => {
    if (!src) {
      setResolvedSrc('');
      return;
    }

    if (src.startsWith('db://')) {
      const key = src.replace('db://', '');
      getMediaItem(key).then((val) => {
        if (val) {
          setResolvedSrc(val);
        } else {
          setResolvedSrc('');
        }
      }).catch(() => {
        setResolvedSrc('');
      });
    } else {
      setResolvedSrc(src);
    }
  }, [src]);

  return (
    <div className={`relative overflow-hidden rounded-2xl group cursor-pointer ${aspectRatio} ${className}`}>
      <motion.img
        src={resolvedSrc || src}
        alt={alt}
        loading="lazy"
        referrerPolicy="no-referrer"
        className="w-full h-full object-cover will-change-[filter,transform]"
        initial={{ filter: 'grayscale(100%)', scale: 1 }}
        whileHover={{ filter: 'grayscale(0%)', scale: 1.08 }}
        whileTap={{ filter: 'grayscale(0%)', scale: 1.05 }}
        whileInView={{ filter: 'grayscale(0%)' }}
        viewport={{ once: false, amount: 0.6 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
      
      {/* Subtle Overlay for depth */}
      <motion.div 
        className="absolute inset-0 bg-black/10 pointer-events-none"
        initial={{ opacity: 1 }}
        whileHover={{ opacity: 0 }}
        whileTap={{ opacity: 0 }}
        whileInView={{ opacity: 0 }}
        viewport={{ once: false, amount: 0.6 }}
        transition={{ duration: 0.8 }}
      />
      
      {/* Tech border effect */}
      <motion.div 
        className="absolute inset-0 border border-primary/0 rounded-2xl pointer-events-none"
        initial={{ borderColor: 'rgba(168, 85, 247, 0)' }}
        whileHover={{ borderColor: 'rgba(168, 85, 247, 0.3)', borderWidth: '2px' }}
        whileTap={{ borderColor: 'rgba(168, 85, 247, 0.3)', borderWidth: '2px' }}
        transition={{ duration: 0.8 }}
      />
    </div>
  );
};

export default GrayscaleImage;
