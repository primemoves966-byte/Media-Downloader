export type PlatformType = 'all' | 'pinterest' | 'youtube' | 'instagram' | 'tiktok' | 'twitter' | 'video';

export interface MediaFormat {
  id: string;
  quality: string;
  type: 'video' | 'audio' | 'image';
  format: string;
  size: string;
  url: string;
  isBest?: boolean;
  bitrate?: string;
}

export interface MediaItem {
  platform: PlatformType;
  title: string;
  author: string;
  thumbnail: string;
  duration?: string;
  originalUrl: string;
  formats: MediaFormat[];
  extractedAt?: number;
}

export interface HistoryItem {
  id: string;
  title: string;
  author: string;
  platform: PlatformType;
  thumbnail: string;
  format: string;
  quality: string;
  downloadUrl: string;
  timestamp: number;
}
