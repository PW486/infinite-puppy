'use client';

import { PexelsPhoto, PexelsVideo, MediaItem } from '../lib/pexels';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import Image from 'next/image';

interface DogCardProps {
  item: MediaItem;
  onClick: () => void;
}

export default function DogCard({ item, onClick }: DogCardProps) {
  const isVideo = item.type === 'video';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -50px 0px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="dog-card group"
      onClick={onClick}
      style={{ 
        aspectRatio: `${item.width} / ${item.height}`,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{ position: 'relative', width: '100%', height: '100%', backgroundColor: '#f5f5f5' }}>
        {isVideo ? (
          <>
            <video
              src={(item as PexelsVideo).video_files[0]?.link}
              poster={(item as PexelsVideo).image}
              loop
              muted
              playsInline
              onMouseEnter={(e) => {
                const video = e.target as HTMLVideoElement;
                const playPromise = video.play();
                if (playPromise !== undefined) {
                  playPromise.catch(() => {
                    // Ignore interruption errors
                  });
                }
              }}
              onMouseLeave={(e) => {
                const video = e.target as HTMLVideoElement;
                video.pause();
                video.currentTime = 0;
              }}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              className="transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Video Badge */}
            <div 
              className="opacity-80 group-hover:opacity-100 transition-opacity duration-300"
              style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 100, pointerEvents: 'none' }}
            >
              <div style={{
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                backdropFilter: 'blur(12px)',
                padding: '8px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Play size={10} fill="white" color="white" strokeWidth={3} />
              </div>
            </div>
          </>
        ) : (
          <Image
            src={(item as PexelsPhoto).src.large}
            alt="Cute dog"
            width={item.width}
            height={item.height}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            className="transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1100px) 33vw, 20vw"
            priority={false}
          />
        )}
      </div>
    </motion.div>
  );
}
