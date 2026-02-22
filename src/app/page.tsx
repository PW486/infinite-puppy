import MasonryGallery from "@/components/MasonryGallery";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Clean Header - Now scrolls with the content */}
      <header style={{ padding: '60px 0' }}>
        <div className="max-w-[1800px] mx-auto flex items-center justify-center">
          <div className="flex items-center" style={{ gap: '10px' }}>
            <h1 className="text-4xl font-black tracking-tighter text-black">
              Infinite<span className="text-gray-300">Puppy</span>
            </h1>
          </div>
        </div>
      </header>

      {/* Main Gallery - Tighter padding */}
      <main className="pb-12">
        <MasonryGallery />
      </main>

      {/* Simple Footer */}
      <footer className="py-20 border-t border-black/5">
        <div className="max-w-[1800px] mx-auto flex flex-col items-center gap-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-black/20">
            © 2026 Infinite Puppy
          </p>
        </div>
      </footer>
    </div>
  );
}
