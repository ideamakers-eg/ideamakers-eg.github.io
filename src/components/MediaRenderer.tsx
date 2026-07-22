import React, { useEffect, useState } from 'react';
import { getMediaItem } from '../lib/db';
import { Film, Play } from 'lucide-react';

interface MediaRendererProps {
  src: string;
  type: 'image' | 'video';
  className?: string;
  alt?: string;
  controls?: boolean;
  poster?: string;
  loading?: 'lazy' | 'eager';
}

export const MediaRenderer: React.FC<MediaRendererProps> = ({
  src,
  type,
  className = '',
  alt = '',
  controls = true,
  poster = '',
  loading: imageLoading = 'lazy',
}) => {
  const [resolvedSrc, setResolvedSrc] = useState<string>('');
  const [resolvedPoster, setResolvedPoster] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    let active = true;

    const loadSrc = () => {
      if (!src) {
        if (active) setResolvedSrc('');
        return;
      }

      if (src.startsWith('db://')) {
        const key = src.replace('db://', '');
        if (active) setLoading(true);
        getMediaItem(key).then((val) => {
          if (active) {
            if (val) {
              setResolvedSrc(val);
            } else {
              setResolvedSrc('');
            }
            setLoading(false);
          }
        }).catch(() => {
          if (active) {
            setLoading(false);
            setResolvedSrc('');
          }
        });
      } else {
        if (active) setResolvedSrc(src);
      }
    };

    loadSrc();

    window.addEventListener('cms-content-changed', loadSrc);
    return () => {
      active = false;
      window.removeEventListener('cms-content-changed', loadSrc);
    };
  }, [src]);

  useEffect(() => {
    let active = true;

    const loadPoster = () => {
      if (!poster) {
        if (active) setResolvedPoster('');
        return;
      }

      if (poster.startsWith('db://')) {
        const key = poster.replace('db://', '');
        getMediaItem(key).then((val) => {
          if (active) {
            if (val) {
              setResolvedPoster(val);
            } else {
              setResolvedPoster('');
            }
          }
        }).catch(() => {
          if (active) setResolvedPoster('');
        });
      } else {
        if (active) setResolvedPoster(poster);
      }
    };

    loadPoster();

    window.addEventListener('cms-content-changed', loadPoster);
    return () => {
      active = false;
      window.removeEventListener('cms-content-changed', loadPoster);
    };
  }, [poster]);

  // Reset play state when video src changes
  useEffect(() => {
    setIsPlaying(false);
  }, [src]);

  if (loading) {
    return (
      <div className={`animate-pulse bg-white/5 flex items-center justify-center rounded-2xl ${className}`}>
        <Film className="w-8 h-8 text-white/20 animate-spin" />
      </div>
    );
  }

  if (!resolvedSrc) {
    if (type === 'image') {
      return (
        <img
          src="https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=800"
          alt={alt}
          className={className}
          referrerPolicy="no-referrer"
          loading={imageLoading}
        />
      );
    }
    return null;
  }

  if (type === 'image') {
    return (
      <img
        src={resolvedSrc}
        alt={alt}
        className={className}
        referrerPolicy="no-referrer"
        loading={imageLoading}
      />
    );
  }

  // Handle Video
  const isYoutube = (url: string) => {
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  const getYoutubeEmbedUrl = (url: string) => {
    let videoId = '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      videoId = match[2];
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0` : url;
  };

  // Render elegant custom poster if specified and not yet playing
  if (resolvedPoster && !isPlaying) {
    return (
      <div 
        onClick={() => setIsPlaying(true)}
        className={`relative overflow-hidden aspect-video group cursor-pointer ${className}`}
      >
        <img
          src={resolvedPoster}
          alt="Video thumbnail"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
          loading={imageLoading}
        />
        {/* Play Overlay Button */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-colors duration-300 z-10">
          <div className="w-20 h-20 rounded-full bg-primary/95 text-white flex items-center justify-center shadow-2xl shadow-primary/50 group-hover:scale-110 transition-all duration-300 transform border border-white/20">
            <Play className="w-8 h-8 fill-white translate-x-[2px]" />
          </div>
        </div>
      </div>
    );
  }

  if (isYoutube(resolvedSrc)) {
    return (
      <div className={`relative overflow-hidden aspect-video ${className}`}>
        <iframe
          src={getYoutubeEmbedUrl(resolvedSrc)}
          title="Video preview"
          className="absolute top-0 left-0 w-full h-full rounded-2xl border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <video
      src={resolvedSrc}
      controls={controls}
      autoPlay={isPlaying}
      className={`w-full rounded-2xl object-cover border border-white/10 shadow-lg ${className}`}
    />
  );
};
