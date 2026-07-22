import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { getMediaItem } from '../lib/db';

interface GrayscaleImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
  loading?: 'lazy' | 'eager';
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
  aspectRatio = "aspect-video",
  loading = "lazy"
}) => {
  const [resolvedSrc, setResolvedSrc] = useState<string>('');

  useEffect(() => {
    let active = true;

    const loadLocalMedia = () => {
      if (!src) {
        if (active) setResolvedSrc('');
        return;
      }

      if (src.startsWith('db://')) {
        const key = src.replace('db://', '');
        getMediaItem(key).then((val) => {
          if (active) {
            if (val) {
              setResolvedSrc(val);
            } else {
              setResolvedSrc('');
            }
          }
        }).catch(() => {
          if (active) setResolvedSrc('');
        });
      } else {
        if (active) setResolvedSrc(src);
      }
    };

    loadLocalMedia();

    window.addEventListener('cms-content-changed', loadLocalMedia);
    return () => {
      active = false;
      window.removeEventListener('cms-content-changed', loadLocalMedia);
    };
  }, [src]);

  return (
    <div className={`relative overflow-hidden rounded-2xl group cursor-pointer ${aspectRatio} ${className}`}>
      <motion.img
        src={resolvedSrc || src}
        alt={alt}
        loading={loading}
        referrerPolicy="no-referrer"
        className="w-full h-full object-cover will-change-[filter,transform]"
        initial={{ filter: 'grayscale(15%)', scale: 1 }}
        whileHover={{ filter: 'grayscale(0%)', scale: 1.02 }}
        whileTap={{ filter: 'grayscale(0%)', scale: 1.01 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />
      
      {/* Subtle Overlay for depth */}
      <div className="absolute inset-0 bg-black/5 pointer-events-none" />
      
      {/* Tech border effect */}
      <div className="absolute inset-0 border border-white/5 group-hover:border-primary/20 rounded-2xl pointer-events-none transition-colors duration-200" />
    </div>
  );
};

export default GrayscaleImage;
