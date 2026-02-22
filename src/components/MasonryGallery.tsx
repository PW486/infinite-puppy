'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { MediaItem, fetchDogMedia } from '../lib/pexels';
import DogCard from './DogCard';
import Lightbox from './Lightbox';
import { Loader2 } from 'lucide-react';

export default function MasonryGallery() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  
  const pageRef = useRef(1);
  const isFetching = useRef(false);

  // Responsive column count logic
  const [columnCount, setColumnCount] = useState(5);

  useEffect(() => {
    const updateColumns = () => {
      const w = window.innerWidth;
      if (w < 480) setColumnCount(1);
      else if (w < 768) setColumnCount(2);
      else if (w < 1200) setColumnCount(3);
      else if (w < 1600) setColumnCount(4);
      else setColumnCount(5);
    };
    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  const columns = useMemo(() => {
    const cols: MediaItem[][] = Array.from({ length: columnCount }, () => []);
    items.forEach((item, index) => cols[index % columnCount].push(item));
    return cols;
  }, [items, columnCount]);

  const loadMore = useCallback(async () => {
    if (isFetching.current || !hasMore) return;
    isFetching.current = true;
    setLoading(true);
    try {
      const nextItems = await fetchDogMedia(pageRef.current);
      if (!nextItems || nextItems.length === 0) {
        setHasMore(false);
      } else {
        setItems(prev => {
          const ids = new Set(prev.map(i => i.id));
          return [...prev, ...nextItems.filter(i => !ids.has(i.id))];
        });
        pageRef.current += 1;
      }
    } catch {
      // Silently fail
    } finally {
      setLoading(false);
      isFetching.current = false;
    }
  }, [hasMore]);

  useEffect(() => {
    loadMore();
  }, []);

  const observerTarget = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !isFetching.current) {
          loadMore();
        }
      },
      { threshold: 0.1, rootMargin: '400px' }
    );
    if (observerTarget.current) observer.observe(observerTarget.current);
    return () => observer.disconnect();
  }, [loadMore]);

  return (
    <div className="w-full relative" style={{ padding: '0 60px' }}>
      <div 
        style={{ 
          display: 'flex', 
          gap: '24px', 
          maxWidth: '1800px', 
          margin: '0 auto',
          alignItems: 'start' 
        }}
      >
        {columns.map((colItems, colIdx) => (
          <div 
            key={`col-${colIdx}`} 
            style={{ 
              flex: 1, 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '24px' 
            }}
          >
            {colItems.map((item, itemIdx) => (
              <DogCard 
                key={`${item.id}-${itemIdx}`} 
                item={item} 
                onClick={() => setSelectedItem(item)}
              />
            ))}
          </div>
        ))}
      </div>

      <div ref={observerTarget} className="flex flex-col items-center justify-center py-60 w-full">
        {loading && (
          <div 
            className="flex flex-col items-center gap-8 text-black/20"
            style={{ marginTop: '100px' }}
          >
            <Loader2 className="animate-spin" size={24} strokeWidth={2} />
            <span className="font-black tracking-[0.4em] text-[9px] uppercase">Loading Content</span>
          </div>
        )}
        {!hasMore && (
          <p className="font-black text-[9px] uppercase tracking-[0.6em] text-black/10">End of Collection</p>
        )}
      </div>

      <Lightbox 
        item={selectedItem} 
        onClose={() => setSelectedItem(null)} 
      />
    </div>
  );
}
