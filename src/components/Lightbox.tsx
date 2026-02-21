'use client';

import { MediaItem, PexelsPhoto, PexelsVideo } from '../lib/pexels';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play } from 'lucide-react';
import Image from 'next/image';

interface LightboxProps {
  item: MediaItem | null;
  onClose: () => void;
}

export default function Lightbox({ item, onClose }: LightboxProps) {
  if (!item) return null;

  const isVideo = item.type === 'video';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-3xl flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Close Button Top-Right Only */}
        <button 
          className="absolute top-10 right-10 w-14 h-14 bg-black text-white rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-transform z-50 shadow-2xl"
          onClick={onClose}
        >
          <X size={28} strokeWidth={2.5} />
        </button>

        {/* Video / Image Display (Pure Focus) */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="relative w-full h-[85vh] flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          {isVideo ? (
            <div className="relative max-w-full max-h-full">
              <video
                src={(item as PexelsVideo).video_files[0]?.link}
                controls
                autoPlay
                className="max-w-full max-h-full object-contain shadow-[0_40px_100px_rgba(0,0,0,0.15)] rounded-2xl"
              />
              <div className="absolute -top-4 -right-4 bg-black p-4 rounded-full text-white shadow-xl">
                <Play size={20} fill="white" />
              </div>
            </div>
          ) : (
            <div className="relative w-full h-full">
              <Image
                src={(item as PexelsPhoto).src.large}
                alt="Cute puppy"
                fill
                className="object-contain drop-shadow-[0_40px_100px_rgba(0,0,0,0.15)]"
                priority
                quality={100}
              />
            </div>
          )}
        </motion.div>

        {/* Brand Accent */}
        <div className="absolute bottom-12 flex flex-col items-center gap-2 opacity-10">
          <p className="text-[10px] font-black uppercase tracking-[0.8em] text-black">Infinite Puppy</p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
