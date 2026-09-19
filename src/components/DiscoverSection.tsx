import React from 'react';
import { 
  ChevronRight, 
  Video, 
  DownloadCloud, 
  Film, 
  Sparkles, 
  FolderDown, 
  Music, 
  Cpu
} from 'lucide-react';
import { PlatformType } from '../types';

interface DiscoverSectionProps {
  onSelectPlatform: (platform: PlatformType) => void;
  onOpenBatch: () => void;
  onScrollToGuide: () => void;
}

export const DiscoverSection: React.FC<DiscoverSectionProps> = ({
  onSelectPlatform,
  onOpenBatch,
  onScrollToGuide,
}) => {
  const tools = [
    {
      id: 'tool-online-video',
      title: 'Universal Video Extractor',
      description: 'Ultra-fast extraction for TikTok, X, Facebook, and web MP4 streams',
      badge: '4K SPEED',
      badgeColor: 'bg-lime-400/20 text-lime-300 border-lime-400/40',
      icon: Video,
      iconBg: 'bg-lime-400/10 border-lime-400/30 text-lime-400',
      action: () => {
        onSelectPlatform('video');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    {
      id: 'tool-download-managers',
      title: 'Batch Multi-Link Turbo',
      description: 'Process and batch download multiple media URLs with simultaneous dispatch',
      badge: 'TURBO DISPATCH',
      badgeColor: 'bg-amber-400/20 text-amber-300 border-amber-400/40',
      icon: FolderDown,
      iconBg: 'bg-amber-400/10 border-amber-400/30 text-amber-400',
      action: () => {
        onOpenBatch();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    {
      id: 'tool-pinterest-gifs',
      title: 'Pinterest Ultra Pins & GIFs',
      description: 'Original master-quality Pinterest graphics, pins, and GIF loops without watermark',
      badge: 'ORIGINAL RES',
      badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
      icon: Film,
      iconBg: 'bg-rose-500/10 border-rose-500/30 text-rose-400',
      action: () => {
        onSelectPlatform('pinterest');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    {
      id: 'tool-mp3-extractor',
      title: 'YouTube 320kbps MP3 Master',
      description: 'Direct studio-grade lossless audio extraction for tracks, sets, and podcasts',
      badge: '320KBPS LOSSLESS',
      badgeColor: 'bg-cyan-400/20 text-cyan-300 border-cyan-400/40',
      icon: Music,
      iconBg: 'bg-cyan-400/10 border-cyan-400/30 text-cyan-400',
      action: () => {
        onSelectPlatform('youtube');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    {
      id: 'tool-hardware-acceleration',
      title: 'Speed Optimization & FAQ',
      description: 'Full guide to bypassing ISP throttling and downloading at maximum line rate',
      badge: 'MAX RATE',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
      icon: Cpu,
      iconBg: 'bg-purple-500/10 border-purple-500/30 text-purple-400',
      action: () => {
        onScrollToGuide();
      }
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 mt-8 mb-12">
      <div className="bg-neutral-950 border border-neutral-800 hover:border-neutral-750 rounded-2xl overflow-hidden shadow-2xl transition-all">
        
        {/* Header banner with Puma sports electric styling */}
        <div className="px-5 py-4 bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-neutral-900 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-lime-400/20 border border-lime-400/40 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-lime-400" />
            </div>
            <h3 className="text-sm font-black tracking-wider uppercase text-white font-['Space_Grotesk',sans-serif]">
              Discover Speed Tools
            </h3>
          </div>
          <span className="text-[10px] text-lime-400 uppercase tracking-widest font-black px-2 py-0.5 rounded-full bg-lime-400/10 border border-lime-400/30">
            PRO SUITE
          </span>
        </div>

        {/* List items */}
        <div className="divide-y divide-neutral-850/80">
          {tools.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                id={item.id}
                onClick={item.action}
                className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-neutral-900/80 transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-3.5 min-w-0 pr-3">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform ${item.iconBg}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-sm font-bold text-neutral-100 group-hover:text-white transition-colors">
                        {item.title}
                      </p>
                      <span className={`text-[9px] font-black uppercase tracking-wider px-1.5 py-0.2 rounded border ${item.badgeColor}`}>
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 truncate">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center text-neutral-500 group-hover:text-lime-400 group-hover:translate-x-1 transition-all shrink-0">
                  <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};
