const PEXELS_API_URL = "https://api.pexels.com/v1";
const PEXELS_VIDEO_URL = "https://api.pexels.com/videos";

export interface PexelsPhoto {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  src: {
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
  type: 'photo';
}

export interface PexelsVideo {
  id: number;
  width: number;
  height: number;
  url: string;
  image: string;
  duration: number;
  user: {
    id: number;
    name: string;
    url: string;
  };
  video_files: {
    id: number;
    quality: string;
    file_type: string;
    width: number;
    height: number;
    link: string;
  }[];
  type: 'video';
}

export type MediaItem = PexelsPhoto | PexelsVideo;

export async function fetchDogMedia(page: number = 1, perPage: number = 20): Promise<MediaItem[]> {
  const apiKey = process.env.NEXT_PUBLIC_PEXELS_API_KEY;

  if (!apiKey) {
    console.warn("PEXELS_API_KEY is missing. Returning empty array.");
    return [];
  }

  try {
    // Fetch photos
    const photoRes = await fetch(
      `${PEXELS_API_URL}/search?query=dog&per_page=${perPage}&page=${page}`,
      { headers: { Authorization: apiKey } }
    );
    const photoData = await photoRes.json();
    const photos: MediaItem[] = (photoData.photos || []).map((p: any) => ({ ...p, type: 'photo' }));

    // Fetch videos (occasionally)
    let videos: MediaItem[] = [];
    if (page % 2 === 1) { // Fetch videos only on odd pages to mix them in
      const videoRes = await fetch(
        `${PEXELS_VIDEO_URL}/search?query=dog&per_page=5&page=${Math.ceil(page / 2)}`,
        { headers: { Authorization: apiKey } }
      );
      const videoData = await videoRes.json();
      videos = (videoData.videos || []).map((v: any) => ({ ...v, type: 'video' }));
    }

    // Interleave photos and videos
    const mixedMedia: MediaItem[] = [...photos];
    videos.forEach((v, i) => {
      const index = (i + 1) * 4; // Place video every 4th photo
      if (index < mixedMedia.length) {
        mixedMedia.splice(index, 0, v);
      } else {
        mixedMedia.push(v);
      }
    });

    return mixedMedia;
  } catch (error) {
    console.error("Error fetching media from Pexels:", error);
    return [];
  }
}
