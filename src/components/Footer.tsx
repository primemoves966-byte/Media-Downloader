import React from 'react';
import { Download, ShieldCheck, Heart, Github } from 'lucide-react';
import { PlatformType } from '../types';

interface FooterProps {
  onSelectPlatform: (platform: PlatformType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectPlatform }) => {
  return (
    <footer className="border-t border-neutral-900 bg-black text-neutral-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Brand Info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-xl bg-red-600 flex items-center justify-center text-white font-bold shadow-md shadow-red-950/40">
                <Download className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="text-base font-black text-white font-['Space_Grotesk',sans-serif]">
                Klick<span className="text-red-500">Pin</span> <span className="text-xs uppercase font-bold text-red-400 bg-red-950/80 border border-red-900/60 px-1.5 py-0.5 rounded-full">PRO</span>
              </span>
            </div>
            <p className="text-neutral-400 text-xs max-w-sm leading-relaxed mb-4">
              The high-speed black edition of Klickpin. Seamlessly download videos, pins, reels, photos and MP3 audio from Pinterest, YouTube, Instagram, and TikTok with no watermark.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-neutral-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Safe, Secure & No User Data Stored</span>
            </div>
          </div>

          {/* Quick Tools */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 font-['Space_Grotesk',sans-serif]">
              Downloaders
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onSelectPlatform('pinterest')}
                  className="hover:text-white transition-colors"
                >
                  Pinterest Video & Pin Downloader
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectPlatform('youtube')}
                  className="hover:text-white transition-colors"
                >
                  YouTube 1080p & MP3 Converter
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectPlatform('instagram')}
                  className="hover:text-white transition-colors"
                >
                  Instagram Reels & Photo Saver
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectPlatform('video')}
                  className="hover:text-white transition-colors"
                >
                  TikTok & Universal Video Downloader
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Usage */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 font-['Space_Grotesk',sans-serif]">
              Information
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li>Free & Unlimited Usage</li>
              <li>No Software Installation</li>
              <li>Supported: MP4, MP3, JPG, WEBP</li>
              <li>Privacy-First Architecture</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <p>
            © {new Date().getFullYear()} Media Downloader. For personal & fair use only. We do not host any copyrighted media on our servers.
          </p>
          <div className="flex items-center gap-4">
            <span>Fast Stream Engine</span>
            <span>•</span>
            <span>Zero Watermark</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
