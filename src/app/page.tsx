import MasonryGallery from "@/components/MasonryGallery";
import { Dog } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Clean Header */}
      <header className="sticky top-0 z-[60] bg-white/80 backdrop-blur-xl px-12 py-8 border-b border-black/5">
        <div className="max-w-[1800px] mx-auto flex items-center justify-center">
          <div className="flex items-center" style={{ gap: '10px' }}>
            <div 
              className="bg-black p-3.5 rounded-[22px] text-white shadow-xl shadow-black/10"
              style={{ transform: 'translateY(4px)' }}
            >
              <Dog size={32} strokeWidth={2.5} />
            </div>
            <h1 className="text-4xl font-black tracking-tighter text-black">
              Infinite<span className="text-gray-300">Puppy</span>
            </h1>
          </div>
        </div>
      </header>

      {/* Main Gallery */}
      <main className="py-12">
        <MasonryGallery />
      </main>

      {/* Simple Footer */}
      <footer className="py-20 border-t border-black/5">
        <div className="max-w-[1800px] mx-auto flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 opacity-10">
            <Dog size={24} />
            <span className="text-xl font-black tracking-tighter">InfinitePuppy</span>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-black/20">
            © 2026 Infinite Puppy
          </p>
        </div>
      </footer>
    </div>
  );
}
