import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "InfinitePuppy",
    template: "%s | InfinitePuppy"
  },
  description: "Explore an infinite world of adorable puppies and discover pure joy in every scroll.",
  keywords: ["puppy", "dog", "cute animals", "infinite scroll", "dog photography", "puppy videos"],
  authors: [{ name: "PW486" }],
  creator: "PW486",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  icons: {
    icon: "/infinite-puppy/favicon.png",
    shortcut: "/infinite-puppy/favicon.png",
    apple: "/infinite-puppy/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://pw486.github.io/infinite-puppy",
    title: "InfinitePuppy",
    description: "Explore an infinite world of adorable puppies and discover pure joy in every scroll.",
    siteName: "InfinitePuppy",
    images: [
      {
        url: "https://pw486.github.io/infinite-puppy/og-image.png",
        width: 1200,
        height: 630,
        alt: "InfinitePuppy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "InfinitePuppy",
    description: "Explore an infinite world of adorable puppies and discover pure joy in every scroll.",
    images: ["https://pw486.github.io/infinite-puppy/og-image.png"],
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
    alternateName: "Puppy Gallery",
    url: "https://pw486.github.io/infinite-puppy",
    description: "Explore an infinite world of adorable puppies and discover pure joy in every scroll.",
    image: "https://pw486.github.io/infinite-puppy/og-image.png",
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
