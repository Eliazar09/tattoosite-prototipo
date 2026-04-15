const PEXELS_KEY = 'HX6lpZGO3pQmUX3XKKiI7DYLHvnu0JUSjWlIgIHe6bMiZunPISPD1l4Q'

export interface PexelsPhoto {
  id: number
  src: {
    original: string
    large2x: string
    large: string
    medium: string
    small: string
    portrait: string
    landscape: string
    tiny: string
  }
  alt: string
  photographer: string
}

export interface PexelsVideo {
  id: number
  video_files: { link: string; quality: string; file_type: string }[]
  image: string
}

export async function searchPhotos(query: string, perPage = 15): Promise<PexelsPhoto[]> {
  try {
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${perPage}&orientation=landscape`,
      { headers: { Authorization: PEXELS_KEY } }
    )
    const data = await res.json()
    return data.photos || []
  } catch {
    return []
  }
}

export async function searchVideos(query: string, perPage = 5): Promise<PexelsVideo[]> {
  try {
    const res = await fetch(
      `https://api.pexels.com/videos/search?query=${encodeURIComponent(query)}&per_page=${perPage}`,
      { headers: { Authorization: PEXELS_KEY } }
    )
    const data = await res.json()
    return data.videos || []
  } catch {
    return []
  }
}

export function getBestVideoFile(video: PexelsVideo): string {
  const order = ['hd', 'sd', 'full_hd']
  for (const q of order) {
    const file = video.video_files.find(f => f.quality === q && f.file_type === 'video/mp4')
    if (file) return file.link
  }
  return video.video_files[0]?.link || ''
}
