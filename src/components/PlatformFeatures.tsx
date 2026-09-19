import React from 'react';
import { 
  Pin, 
  Youtube, 
  Instagram, 
  Video, 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  Sparkles,
  Smartphone,
  Music,
  Image as ImageIcon
} from 'lucide-react';
import { PlatformType } from '../types';

interface PlatformFeaturesProps {
  onSelectPlatform: (platform: PlatformType) => void;
}

export const PlatformFeatures: React.FC<PlatformFeaturesProps> = ({ onSelectPlatform }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-white font-['Space_Grotesk',sans-serif] mb-3">
          Supported Platforms & Powerful Formats
        </h2>
        <p className="text-neutral-400 text-sm sm:text-base">
          Media Downloader provides direct extraction and high-speed downloads across all popular social media channels.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Pinterest Card - Hot Coral / Crimson Glow */}
        <div 
          onClick={() => onSelectPlatform('pinterest')}
          className="group relative bg-neutral-950 border border-neutral-800 hover:border-rose-500/60 p-6 rounded-3xl transition-all cursor-pointer shadow-xl hover:shadow-rose-500/10 flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-500 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-rose-500 group-hover:text-white transition-all">
              <Pin className="w-6 h-6 fill-current" />
            </div>

            <h3 className="text-lg font-black text-white mb-2 font-['Space_Grotesk',sans-serif] flex items-center justify-between">
              <span>Pinterest</span>
              <span className="text-[10px] font-black text-rose-400 bg-rose-500/10 border border-rose-500/30 px-2 py-0.5 rounded-full uppercase tracking-wider">PINS & GIFS</span>
            </h3>

            <p className="text-xs text-neutral-400 leading-relaxed mb-4">
              Download Pinterest videos, GIF animations, Idea pins, and original 4K HD images directly to your gallery.
            </p>

            <ul className="space-y-2 text-xs text-neutral-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span>Video Pins (1080p / 720p MP4)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span>Original High-Res Images & GIFs</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span>Idea Pins & Story Pins</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-neutral-900 flex items-center justify-between text-xs text-rose-400 font-bold group-hover:text-rose-300">
            <span>Use Pinterest Downloader</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>

        {/* YouTube Card - Racing Red & Amber Glow */}
        <div 
          onClick={() => onSelectPlatform('youtube')}
          className="group relative bg-neutral-950 border border-neutral-800 hover:border-red-500/60 p-6 rounded-3xl transition-all cursor-pointer shadow-xl hover:shadow-red-500/10 flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-500 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-red-500 group-hover:text-white transition-all">
              <Youtube className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-black text-white mb-2 font-['Space_Grotesk',sans-serif] flex items-center justify-between">
              <span>YouTube</span>
              <span className="text-[10px] font-black text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-full uppercase tracking-wider">1080P & MP3</span>
            </h3>

            <p className="text-xs text-neutral-400 leading-relaxed mb-4">
              Save YouTube videos up to 1080p FHD, download Shorts, convert to 320kbps MP3 audio, and grab HD thumbnails.
            </p>

            <ul className="space-y-2 text-xs text-neutral-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <span>1080p, 720p, 480p Video Downloads</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>MP3 Audio Extractor (320 kbps)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <span>YouTube Shorts & HD Thumbnails</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-neutral-900 flex items-center justify-between text-xs text-red-400 font-bold group-hover:text-red-300">
            <span>Use YouTube Downloader</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>

        {/* Instagram Card - Hyper Magenta Glow */}
        <div 
          onClick={() => onSelectPlatform('instagram')}
          className="group relative bg-neutral-950 border border-neutral-800 hover:border-pink-500/60 p-6 rounded-3xl transition-all cursor-pointer shadow-xl hover:shadow-pink-500/10 flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-pink-500/10 border border-pink-500/30 text-pink-500 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-gradient-to-tr group-hover:from-purple-600 group-hover:to-pink-500 group-hover:text-white transition-all">
              <Instagram className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-black text-white mb-2 font-['Space_Grotesk',sans-serif] flex items-center justify-between">
              <span>Instagram</span>
              <span className="text-[10px] font-black text-pink-400 bg-pink-500/10 border border-pink-500/30 px-2 py-0.5 rounded-full uppercase tracking-wider">REELS & POSTS</span>
            </h3>

            <p className="text-xs text-neutral-400 leading-relaxed mb-4">
              Download Instagram Reels in high definition, feed videos, multi-slide carousel photos, and background audio.
            </p>

            <ul className="space-y-2 text-xs text-neutral-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-pink-500 shrink-0" />
                <span>Instagram Reels (No Watermark)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-pink-500 shrink-0" />
                <span>Feed Photos & Carousel Posts</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span>Audio Track extraction</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-neutral-900 flex items-center justify-between text-xs text-pink-400 font-bold group-hover:text-pink-300">
            <span>Use Instagram Downloader</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>

        {/* All Video / TikTok Card - Cyan & Volt Lime Glow */}
        <div 
          onClick={() => onSelectPlatform('video')}
          className="group relative bg-neutral-950 border border-neutral-800 hover:border-cyan-400/60 p-6 rounded-3xl transition-all cursor-pointer shadow-xl hover:shadow-cyan-400/10 flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-cyan-400 group-hover:text-black transition-all">
              <Video className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-black text-white mb-2 font-['Space_Grotesk',sans-serif] flex items-center justify-between">
              <span>All Videos</span>
              <span className="text-[10px] font-black text-cyan-400 bg-cyan-400/10 border border-cyan-400/30 px-2 py-0.5 rounded-full uppercase tracking-wider">TIKTOK & X</span>
            </h3>

            <p className="text-xs text-neutral-400 leading-relaxed mb-4">
              Download TikTok clips without watermark, Twitter/X video threads, Facebook Reels, and direct media URLs.
            </p>

            <ul className="space-y-2 text-xs text-neutral-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>TikTok Videos without Watermark</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-lime-400 shrink-0" />
                <span>Twitter / X Videos & GIFs</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Direct MP4, WebM & MP3 links</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-neutral-900 flex items-center justify-between text-xs text-cyan-400 font-bold group-hover:text-cyan-300">
            <span>Use Video Downloader</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>

      </div>

      {/* Feature Badges Row - Puma Athletic Performance Bar */}
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-gradient-to-r from-neutral-950 via-neutral-900/90 to-neutral-950 border border-neutral-800 rounded-3xl shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-lime-400/10 border border-lime-400/30 flex items-center justify-center text-lime-400 shrink-0 shadow-sm">
            <Zap className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h4 className="text-sm font-black text-white font-['Space_Grotesk',sans-serif]">0.4s Nitro Speed</h4>
            <p className="text-xs text-neutral-400">Direct streaming bypasses bottlenecks</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 shrink-0 shadow-sm">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-black text-white font-['Space_Grotesk',sans-serif]">100% Free & Safe</h4>
            <p className="text-xs text-neutral-400">No subscription or signup required</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0 shadow-sm">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-black text-white font-['Space_Grotesk',sans-serif]">Universal Device</h4>
            <p className="text-xs text-neutral-400">Optimized for iPhone, Android, PC & Mac</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0 shadow-sm">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-black text-white font-['Space_Grotesk',sans-serif]">Lossless Master</h4>
            <p className="text-xs text-neutral-400">Full HD 1080p, 4K & 320kbps MP3</p>
          </div>
        </div>
      </div>
    </section>
  );
};
