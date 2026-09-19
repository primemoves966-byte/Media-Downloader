import React, { useState } from 'react';
import { 
  Search, 
  Clipboard, 
  X, 
  ArrowRight, 
  Loader2, 
  Sparkles,
  Pin,
  Youtube,
  Instagram,
  Video,
  Film,
  Zap,
  CheckCircle
} from 'lucide-react';
import { PlatformType } from '../types';
import { detectPlatform, SAMPLE_LINKS } from '../utils/mediaHelper';

interface MediaInputProps {
  url: string;
  setUrl: (url: string) => void;
  onFetch: (customUrl?: string) => void;
  isLoading: boolean;
  activeTab: PlatformType;
}

export const MediaInput: React.FC<MediaInputProps> = ({
  url,
  setUrl,
  onFetch,
  isLoading,
  activeTab
}) => {
  const [copiedNotification, setCopiedNotification] = useState(false);

  const detected = url.trim() ? detectPlatform(url) : activeTab === 'all' ? null : activeTab;

  const handlePaste = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        if (text) {
          setUrl(text.trim());
          setCopiedNotification(true);
          setTimeout(() => setCopiedNotification(false), 2000);
        }
      }
    } catch {
      // Browser permission prompt or fallback
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && url.trim() && !isLoading) {
      onFetch();
    }
  };

  const getPlaceholder = () => {
    switch (activeTab) {
      case 'pinterest':
        return 'Paste Pinterest Pin or Video URL (e.g. pinterest.com/pin/... or pin.it/...)';
      case 'youtube':
        return 'Paste YouTube video, Short or music link (e.g. youtube.com/watch?v=...)';
      case 'instagram':
        return 'Paste Instagram Reel, Post or IGTV link (e.g. instagram.com/reel/...)';
      case 'video':
        return 'Paste any video link (TikTok, X, Facebook, MP4 URL...)';
      default:
        return 'Paste link from Pinterest, YouTube, Instagram, TikTok or any video...';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* Hero Headings - Puma Athletic Power */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-lime-400/10 via-cyan-400/10 to-rose-500/10 border border-lime-400/30 text-lime-400 text-xs font-black uppercase tracking-wider mb-3 shadow-sm">
          <Zap className="w-3.5 h-3.5 text-lime-400 fill-current" />
          <span>Nitro High-Speed Engine • 4K & 320kbps</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight font-['Space_Grotesk',sans-serif] uppercase mb-3">
          {activeTab === 'pinterest' && (
            <>Pinterest <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-red-500">Downloader</span></>
          )}
          {activeTab === 'youtube' && (
            <>YouTube <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-400">Converter</span></>
          )}
          {activeTab === 'instagram' && (
            <>Instagram <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500">Reels Saver</span></>
          )}
          {activeTab === 'video' && (
            <>Universal <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Video Extractor</span></>
          )}
          {activeTab === 'all' && (
            <>Media <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-emerald-400 to-cyan-400">Downloader</span></>
          )}
        </h1>

        <p className="text-neutral-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed mb-4 font-medium">
          Save high-bitrate MP4 videos, original ultra-res photos, and 320kbps MP3 tracks in lossless clarity with zero watermarks.
        </p>

        {/* Athletic Performance Specs Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-lime-400/10 border border-lime-400/30 text-lime-400 font-bold">
            <Zap className="w-3 h-3 fill-current" />
            0.4s Parse Speed
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 font-bold">
            <Sparkles className="w-3 h-3" />
            4K Ultra HD
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 font-bold">
            <CheckCircle className="w-3 h-3" />
            No Watermark
          </span>
        </div>
      </div>

      {/* Main Download Card - Puma Nitro Vibrant Glow */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-lime-400 via-cyan-400 to-rose-500 rounded-3xl blur-md opacity-25 group-hover:opacity-40 transition duration-500"></div>

        <div className="relative bg-neutral-950/95 border border-neutral-800 group-hover:border-lime-400/40 rounded-2xl p-4 sm:p-5 shadow-2xl backdrop-blur-sm transition-colors">
          <div className="space-y-3">
            
            {/* Input Box with Inner Paste / Clear Controls */}
            <div className="relative flex items-center bg-neutral-900/90 border-2 border-neutral-700 focus-within:border-lime-400 focus-within:shadow-[0_0_20px_rgba(204,255,0,0.2)] rounded-xl transition-all shadow-inner">
              
              {/* Platform indicator icon */}
              <div className="pl-3.5 pr-1 text-neutral-400 flex items-center">
                {detected === 'pinterest' && <Pin className="w-5 h-5 text-rose-500 fill-current" />}
                {detected === 'youtube' && <Youtube className="w-5 h-5 text-red-500" />}
                {detected === 'instagram' && <Instagram className="w-5 h-5 text-pink-500" />}
                {detected === 'tiktok' && <Film className="w-5 h-5 text-cyan-400" />}
                {(!detected || detected === 'video' || detected === 'all') && (
                  <Search className="w-5 h-5 text-lime-400" />
                )}
              </div>

              {/* Input Element */}
              <input
                id="media-url-input"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={getPlaceholder()}
                className="w-full bg-transparent text-white placeholder:text-neutral-500 text-sm sm:text-base px-3 py-3.5 outline-none font-medium"
              />

              {/* Clear Button if URL has text */}
              {url && (
                <button
                  id="btn-clear-input"
                  onClick={() => setUrl('')}
                  className="p-2 mr-1 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
                  title="Clear input"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              {/* Integrated Paste Clipboard Button */}
              <button
                id="btn-paste-clipboard"
                type="button"
                onClick={handlePaste}
                className="mr-2 px-3 py-2 text-xs font-bold text-neutral-200 hover:text-white bg-neutral-800 hover:bg-neutral-750 active:scale-95 rounded-lg border border-neutral-700 transition-all flex items-center gap-1.5 whitespace-nowrap shadow-sm cursor-pointer"
                title="Paste from clipboard"
              >
                <Clipboard className="w-3.5 h-3.5 text-lime-400" />
                <span>{copiedNotification ? 'Pasted!' : 'Paste'}</span>
              </button>
            </div>

            {/* Prominent High-Impact Athletic Download Button */}
            <button
              id="btn-submit-download"
              type="button"
              disabled={!url.trim() || isLoading}
              onClick={() => onFetch()}
              className="w-full py-4 px-6 rounded-xl font-black text-base sm:text-lg uppercase tracking-wider bg-gradient-to-r from-lime-400 via-emerald-400 to-cyan-400 hover:from-lime-300 hover:to-cyan-300 text-black active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none transition-all shadow-xl shadow-lime-400/20 flex items-center justify-center gap-2 cursor-pointer font-['Space_Grotesk',sans-serif]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-black" />
                  <span>Parsing Media Stream...</span>
                </>
              ) : (
                <>
                  <span>Download Now</span>
                  <ArrowRight className="w-5 h-5 stroke-[3]" />
                </>
              )}
            </button>

          </div>
        </div>
      </div>

      {/* Quick Test Samples - Puma Athletic Badges */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-neutral-400">
        <span className="font-bold text-neutral-400 mr-1 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
          <Zap className="w-3.5 h-3.5 text-lime-400 fill-current" />
          Quick Test:
        </span>

        {SAMPLE_LINKS.map((sample) => (
          <button
            key={sample.label}
            id={`sample-${sample.platform}`}
            onClick={() => {
              setUrl(sample.url);
              onFetch(sample.url);
            }}
            className="px-3 py-1 rounded-lg bg-neutral-900/90 hover:bg-neutral-850 border border-neutral-800 hover:border-lime-400/50 text-neutral-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95"
          >
            {sample.platform === 'pinterest' && <Pin className="w-3.5 h-3.5 text-rose-500 fill-current" />}
            {sample.platform === 'youtube' && <Youtube className="w-3.5 h-3.5 text-red-500" />}
            {sample.platform === 'instagram' && <Instagram className="w-3.5 h-3.5 text-pink-500" />}
            {sample.platform === 'tiktok' && <Film className="w-3.5 h-3.5 text-cyan-400" />}
            <span className="font-semibold">{sample.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
