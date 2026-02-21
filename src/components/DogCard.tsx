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
      className="dog-card group relative"
      onClick={onClick}
    >
      <div className="relative overflow-hidden w-full h-full bg-gray-50 aspect-auto">
        {isVideo ? (
          <div className="relative w-full h-full">
            <video
              src={(item as PexelsVideo).video_files[0]?.link}
              poster={(item as PexelsVideo).image}
              loop
              muted
              playsInline
              onMouseEnter={(e) => (e.target as HTMLVideoElement).play()}
              onMouseLeave={(e) => {
                const video = e.target as HTMLVideoElement;
                video.pause();
                video.currentTime = 0;
              }}
              className="w-full h-auto block object-cover max-h-[600px] transition-all duration-700 group-hover:scale-105"
            />
            {/* Video Indicator - ALWAYS KEEP THIS */}
            <div className="absolute top-4 right-4 bg-white/90 p-3 rounded-full text-black shadow-lg">
              <Play size={14} fill="black" />
            </div>
          </div>
        ) : (
          <div className="relative w-full h-full overflow-hidden">
            <Image
              src={(item as PexelsPhoto).src.large}
              alt="Cute dog"
              width={item.width}
              height={item.height}
              className="w-full h-auto block object-cover max-h-[600px] transition-all duration-700 group-hover:scale-105"
              sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1100px) 33vw, 20vw"
              priority={false}
            />
          </div>
        )}

        {/* Hover Accent Only (No Author Info) */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
    </motion.div>
  );
}
