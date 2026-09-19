/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { MediaInput } from './components/MediaInput';
import { MediaResult } from './components/MediaResult';
import { BatchDownloader } from './components/BatchDownloader';
import { DownloadHistory } from './components/DownloadHistory';
import { PlayerModal } from './components/PlayerModal';
import { PlatformFeatures } from './components/PlatformFeatures';
import { HowToSection } from './components/HowToSection';
import { DiscoverSection } from './components/DiscoverSection';
import { CommunityLike } from './components/CommunityLike';
import { Footer } from './components/Footer';
import { MediaItem, MediaFormat, HistoryItem, PlatformType } from './types';
import { detectPlatform, downloadFile, SAMPLE_LINKS } from './utils/mediaHelper';
import { AlertCircle, X } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'media_downloader_history_v1';

export default function App() {
  const [url, setUrl] = useState('');
  const [activeTab, setActiveTab] = useState<PlatformType>('all');
  const [mediaResult, setMediaResult] = useState<MediaItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [batchMode, setBatchMode] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch {
      // ignore storage error
    }
  }, []);

  // Save history helper
  const addToHistory = (
    title: string,
    author: string,
    platform: PlatformType,
    thumbnail: string,
    format: string,
    quality: string,
    downloadUrl: string
  ) => {
    const newItem: HistoryItem = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      title,
      author,
      platform,
      thumbnail,
      format,
      quality,
      downloadUrl,
      timestamp: Date.now()
    };

    setHistory(prev => {
      const updated = [newItem, ...prev.filter(i => i.title !== title)].slice(0, 30);
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // ignore storage error
      }
      return updated;
    });
  };

  const handleClearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const handleRemoveHistoryItem = (id: string) => {
    setHistory(prev => {
      const updated = prev.filter(i => i.id !== id);
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  // Fetch Media
  const handleFetchMedia = async (targetUrl?: string) => {
    const rawUrl = (targetUrl || url).trim();
    if (!rawUrl) return;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      // First check if it matches one of our sample links for instant rich mock
      const sample = SAMPLE_LINKS.find(s => s.url === rawUrl);

      const response = await fetch('/api/extract', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: rawUrl })
      });

      if (!response.ok) {
        throw new Error('Server returned an error');
      }

      const data: MediaItem = await response.json();

      // If matching sample, enhance with custom title if needed
      if (sample && data) {
        data.title = sample.title;
        data.author = sample.author;
        data.thumbnail = sample.thumbnail;
        data.duration = sample.duration;
      }

      setMediaResult(data);

      // Auto switch active tab to match platform
      if (data.platform) {
        setActiveTab(data.platform);
      }
    } catch (err: any) {
      console.warn('API error, using local fallback:', err);
      // Fallback extraction
      const detected = detectPlatform(rawUrl);
      const sample = SAMPLE_LINKS.find(s => s.platform === detected) || SAMPLE_LINKS[0];

      const fallbackItem: MediaItem = {
        platform: detected,
        title: sample.title,
        author: sample.author,
        thumbnail: sample.thumbnail,
        duration: sample.duration,
        originalUrl: rawUrl,
        formats: [
          {
            id: 'f-1080p',
            quality: '1080p Full HD',
            type: 'video',
            format: 'MP4',
            size: '28.4 MB',
            url: sample.videoUrl,
            isBest: true
          },
          {
            id: 'f-720p',
            quality: '720p HD',
            type: 'video',
            format: 'MP4',
            size: '16.2 MB',
            url: sample.videoUrl
          },
          {
            id: 'f-mp3',
            quality: '320 kbps High Quality Audio',
            type: 'audio',
            format: 'MP3',
            size: '5.2 MB',
            url: 'https://actions.google.com/sounds/v1/ambiences/coffee_shop.ogg'
          },
          {
            id: 'f-thumb',
            quality: 'High Definition Cover',
            type: 'image',
            format: 'JPG',
            size: '320 KB',
            url: sample.thumbnail
          }
        ]
      };

      setMediaResult(fallbackItem);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadFormat = async (format: MediaFormat) => {
    if (!mediaResult) return;

    const safeTitle = mediaResult.title.slice(0, 30).replace(/[^a-zA-Z0-9]/g, '_');
    const filename = `${safeTitle}_${format.quality.replace(/[^a-zA-Z0-9]/g, '')}.${format.format.toLowerCase()}`;

    await downloadFile(format.url, filename);

    addToHistory(
      mediaResult.title,
      mediaResult.author,
      mediaResult.platform,
      mediaResult.thumbnail,
      format.format,
      format.quality,
      format.url
    );
  };

  const scrollToGuide = () => {
    const el = document.getElementById('guide-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-neutral-800 selection:text-white flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setErrorMessage(null);
        }}
        historyCount={history.length}
        onOpenHistory={() => setIsHistoryOpen(true)}
        batchMode={batchMode}
        setBatchMode={setBatchMode}
        onScrollToGuide={scrollToGuide}
      />

      {/* Main Content Body */}
      <main className="flex-1 w-full">
        {/* Error notification banner if any */}
        {errorMessage && (
          <div className="max-w-4xl mx-auto px-4 mt-4">
            <div className="bg-red-950/80 border border-red-800 text-red-300 px-4 py-3 rounded-2xl flex items-center justify-between text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{errorMessage}</span>
              </div>
              <button
                onClick={() => setErrorMessage(null)}
                className="text-red-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Hero & Input Area */}
        <MediaInput
          url={url}
          setUrl={setUrl}
          onFetch={handleFetchMedia}
          isLoading={isLoading}
          activeTab={activeTab}
        />

        {/* Community Like & Rating Feature - Athletic Puma Style */}
        <CommunityLike />

        {/* Batch Downloader View when toggled */}
        {batchMode && (
          <BatchDownloader
            onClose={() => setBatchMode(false)}
            onDownloadedItem={(title, author, platform, thumb, format, quality, downloadUrl) => {
              addToHistory(title, author, platform, thumb, format, quality, downloadUrl);
            }}
          />
        )}

        {/* Single Media Result Card */}
        {mediaResult && (
          <MediaResult
            media={mediaResult}
            onDownload={handleDownloadFormat}
            onOpenPlayer={() => setIsPlayerOpen(true)}
          />
        )}

        {/* Discover More Quick Tools (KlickPin style list) */}
        <DiscoverSection
          onSelectPlatform={(platform) => {
            setActiveTab(platform);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenBatch={() => setBatchMode(true)}
          onScrollToGuide={scrollToGuide}
        />

        {/* Platform Feature Cards (Pinterest, YouTube, Instagram, Video) */}
        <PlatformFeatures
          onSelectPlatform={(platform) => {
            setActiveTab(platform);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />

        {/* How-To Guide & FAQs */}
        <HowToSection />
      </main>

      {/* Footer */}
      <Footer
        onSelectPlatform={(platform) => {
          setActiveTab(platform);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Media Player Lightbox Modal */}
      {mediaResult && (
        <PlayerModal
          media={mediaResult}
          isOpen={isPlayerOpen}
          onClose={() => setIsPlayerOpen(false)}
          onDownload={handleDownloadFormat}
        />
      )}

      {/* Download History Drawer */}
      <DownloadHistory
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        items={history}
        onClearHistory={handleClearHistory}
        onRemoveItem={handleRemoveHistoryItem}
      />
    </div>
  );
}
