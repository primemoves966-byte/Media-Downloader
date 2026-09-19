import { MediaItem, PlatformType } from '../types';

export function detectPlatform(url: string): PlatformType {
  const lower = url.trim().toLowerCase();
  if (lower.includes('pinterest.com') || lower.includes('pin.it')) {
    return 'pinterest';
  }
  if (lower.includes('youtube.com') || lower.includes('youtu.be')) {
    return 'youtube';
  }
  if (lower.includes('instagram.com')) {
    return 'instagram';
  }
  if (lower.includes('tiktok.com')) {
    return 'tiktok';
  }
  if (lower.includes('twitter.com') || lower.includes('x.com')) {
    return 'twitter';
  }
  return 'video';
}

export const SAMPLE_LINKS = [
  {
    label: 'Pinterest Aesthetic Pin',
    platform: 'pinterest' as PlatformType,
    url: 'https://pinterest.com/pin/1085790040177726481/',
    title: 'Minimalist Architecture & Interior Moodboard',
    author: 'DesignStudio',
    thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    duration: '00:32'
  },
  {
    label: 'YouTube 4K & MP3',
    platform: 'youtube' as PlatformType,
    url: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
    title: 'Big Buck Bunny 4K 60FPS Ultra HD Animation',
    author: 'Blender Foundation',
    thumbnail: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&auto=format&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    duration: '09:56'
  },
  {
    label: 'Instagram Viral Reel',
    platform: 'instagram' as PlatformType,
    url: 'https://www.instagram.com/reel/C8qXyz12345/',
    title: 'Cinematic Mountain Roadtrip Sunrise in Switzerland',
    author: '@wanderlust.travel',
    thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    duration: '00:28'
  },
  {
    label: 'TikTok No-Watermark',
    platform: 'tiktok' as PlatformType,
    url: 'https://www.tiktok.com/@creator/video/738291048123984',
    title: 'Satisfying Kinetic Art & Sand Symphony Loop',
    author: '@satisfyingart',
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    duration: '00:15'
  }
];

export async function downloadFile(url: string, filename: string, onProgress?: (percent: number) => void): Promise<void> {
  try {
    if (onProgress) onProgress(15);
    // Use server proxy download to bypass CORS when possible
    const proxyUrl = `/api/proxy-download?url=${encodeURIComponent(url)}&filename=${encodeURIComponent(filename)}`;
    
    // Test fetch to monitor progress or trigger direct anchor download
    const res = await fetch(proxyUrl);
    if (!res.ok) {
      throw new Error(`Failed with status ${res.status}`);
    }

    if (onProgress) onProgress(50);
    const blob = await res.blob();
    if (onProgress) onProgress(90);

    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);

    if (onProgress) onProgress(100);
  } catch {
    // Fallback: direct browser navigation to download URL
    if (onProgress) onProgress(100);
    const fallbackLink = document.createElement('a');
    fallbackLink.href = url;
    fallbackLink.download = filename;
    fallbackLink.target = '_blank';
    fallbackLink.rel = 'noopener noreferrer';
    document.body.appendChild(fallbackLink);
    fallbackLink.click();
    document.body.removeChild(fallbackLink);
  }
}

export function formatTime(seconds?: number): string {
  if (!seconds) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
