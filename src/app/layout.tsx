import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "InfinitePuppy - Endless Dog Cuteness",
    template: "%s | InfinitePuppy"
  },
  description: "Endless Dog Cuteness, One Scroll at a Time. Discover cute puppies and high-quality dog media.",
  keywords: ["puppy", "dog", "cute animals", "infinite scroll", "dog photography", "puppy videos"],
  authors: [{ name: "InfinitePuppy Team" }],
  creator: "InfinitePuppy",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://infinite-puppy.vercel.app", // 실제 도메인이 있다면 변경 필요
    title: "InfinitePuppy - Endless Dog Cuteness",
    description: "Endless Dog Cuteness, One Scroll at a Time. Discover cute puppies.",
    siteName: "InfinitePuppy",
    images: [
      {
        url: "/favicon.png", // 대표 이미지가 있다면 해당 경로로 변경
        width: 512,
        height: 512,
        alt: "InfinitePuppy Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "InfinitePuppy - Endless Dog Cuteness",
    description: "Endless Dog Cuteness, One Scroll at a Time. Discover cute puppies.",
    images: ["/favicon.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "InfinitePuppy",
    alternateName: "Puppy Infinite Gallery",
    url: "https://infinite-puppy.vercel.app",
    description: "Endless Dog Cuteness, One Scroll at a Time.",
    image: "/favicon.png",
  };

  return (
    <html lang="ko">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
