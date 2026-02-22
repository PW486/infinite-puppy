# 🐶 InfinitePuppy

**InfinitePuppy** is a minimalist image gallery service that leverages the Pexels API to provide an endless stream of cute puppy photos and videos.

![InfinitePuppy Logo](./public/favicon.png)

## ✨ Key Features
- **Infinite Scroll**: New puppy content loads automatically as you scroll down.
- **Responsive Masonry Layout**: Arranges images of various sizes in a grid optimized for any screen size.
- **Video Previews**: Hover over video cards to instantly play a preview of the puppy video.
- **Lightbox Modal**: Click to view high-resolution images and videos in a full-screen modal with a sleek blur effect.
- **SEO Optimized**: Fully configured with Meta Tags, JSON-LD, Sitemap, and Robots for maximum search engine visibility.

## 🛠 Tech Stack
- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Styling**: Vanilla CSS (Modern & Minimalist)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **API**: [Pexels API](https://www.pexels.com/api/)
- **Language**: TypeScript

## 🚀 Getting Started

### 1. Environment Variables
Create a `.env.local` file and add your Pexels API key.
```env
NEXT_PUBLIC_PEXELS_API_KEY=your_api_key_here
```

### 2. Install and Run
```bash
npm install
npm run dev
```
Open `http://localhost:3000` in your browser to see the result.

## 📁 Project Structure
- `src/app`: Page layouts and SEO configurations.
- `src/components`: UI components including Gallery, Cards, and Lightbox.
- `src/lib`: API fetching logic.
- `public`: Favicon and static assets.

## 📄 License
© 2026 Infinite Puppy. All rights reserved.
