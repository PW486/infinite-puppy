'use client';

import { useEffect } from 'react';
import { MediaItem, PexelsPhoto, PexelsVideo } from '../lib/pexels';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Image from 'next/image';

interface LightboxProps {
  item: MediaItem | null;
  onClose: () => void;
}

export default function Lightbox({ item, onClose }: LightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (item) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [item, onClose]);

  if (!item) return null;

  const isVideo = item.type === 'video';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1000,
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          backdropFilter: 'blur(20px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px'
        }}
        onClick={onClose}
      >
        {/* Floating Close Button */}
        <button 
          className="lightbox-close"
          style={{
            position: 'fixed',
            top: '40px',
            right: '40px',
            width: '56px',
            height: '56px',
            backgroundColor: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '50%',
            color: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1100,
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = 'white';
            e.currentTarget.style.color = 'black';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
            e.currentTarget.style.color = 'white';
          }}
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          <X size={28} strokeWidth={2} />
        </button>

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'default'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {isVideo ? (
            <video
              src={(item as PexelsVideo).video_files[0]?.link}
              poster={(item as PexelsVideo).image}
              controls
              autoPlay
              style={{
                maxWidth: '90vw',
                maxHeight: '85vh',
                borderRadius: '24px',
                boxShadow: '0 40px 100px rgba(0,0,0,0.6)',
                backgroundColor: 'black',
                display: 'block'
              }}
            />
          ) : (
            <div style={{ 
              position: 'relative', 
              width: 'auto',
              maxWidth: '90vw',
              maxHeight: '85vh',
              aspectRatio: `${item.width} / ${item.height}`,
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 40px 100px rgba(0,0,0,0.6)'
            }}>
              <Image
                src={(item as PexelsPhoto).src.large}
                alt="Cute puppy"
                width={item.width}
                height={item.height}
                style={{
                  width: 'auto',
                  height: 'auto',
                  maxWidth: '90vw',
                  maxHeight: '85vh',
                  objectFit: 'contain'
                }}
                priority
                quality={100}
              />
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
