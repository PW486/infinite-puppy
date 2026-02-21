'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { MediaItem, fetchDogMedia } from '../lib/pexels';
import DogCard from './DogCard';
import Lightbox from './Lightbox';
import { Loader2 } from 'lucide-react';

export default function MasonryGallery() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    
    try {
      const nextItems = await fetchDogMedia(page);
      if (nextItems.length === 0) {
        setHasMore(false);
      } else {
        setItems(prev => [...prev, ...nextItems]);
        setPage(prev => prev + 1);
      }
    } catch (err) {
      console.error("Failed to load dogs:", err);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);

  // Initial load
  useEffect(() => {
    loadMore();
  }, []);

  // Intersection Observer for Infinite Scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [loadMore, hasMore]);

  return (
    <div className="w-full relative px-12">
      <div className="masonry-grid">
        {items.map((item, idx) => (
          <DogCard 
            key={`${item.id}-${idx}`} 
            item={item} 
            onClick={() => setSelectedItem(item)}
          />
        ))}
      </div>

      {/* Minimal Loading Sentinel */}
      <div ref={observerTarget} className="flex flex-col items-center justify-center py-32 w-full">
        {loading && (
          <div className="flex flex-col items-center gap-6 text-black/20">
            <Loader2 className="animate-spin" size={24} strokeWidth={2} />
            <span className="font-black tracking-[0.4em] text-[9px] uppercase">Loading Content</span>
          </div>
        )}
        {!hasMore && (
          <div className="flex flex-col items-center gap-4 text-black/10">
            <p className="font-black text-[9px] uppercase tracking-[0.6em]">End of Collection</p>
          </div>
        )}
      </div>

      {/* Immersive Detail View */}
      <Lightbox 
        item={selectedItem} 
        onClose={() => setSelectedItem(null)} 
      />
    </div>
  );
}
