import React from 'react';
import { 
  Download, 
  History, 
  Layers, 
  HelpCircle, 
  Video, 
  Youtube, 
  Instagram, 
  Pin 
} from 'lucide-react';
import { PlatformType } from '../types';

interface NavbarProps {
  activeTab: PlatformType;
  setActiveTab: (tab: PlatformType) => void;
  historyCount: number;
  onOpenHistory: () => void;
  batchMode: boolean;
  setBatchMode: (val: boolean) => void;
  onScrollToGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  historyCount,
  onOpenHistory,
  batchMode,
  setBatchMode,
  onScrollToGuide
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-900 bg-black/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo - Puma Athletic Energy */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-lime-400 via-emerald-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-lime-400/20 border border-lime-300/30">
            <Download className="w-5 h-5 text-black stroke-[3]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tight text-white font-['Space_Grotesk',sans-serif] uppercase">
                Media <span className="text-lime-400">Downloader</span>
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] uppercase font-black tracking-wider bg-lime-400 text-black rounded-md shadow-sm">
                NITRO
              </span>
            </div>
            <p className="text-[11px] text-neutral-400 hidden sm:block font-medium">
              Ultra-Fast 4K Video & High-Fidelity Audio
            </p>
          </div>
        </div>

        {/* Navigation Tabs - Puma Speed Palette */}
        <nav className="hidden md:flex items-center gap-1.5 bg-neutral-950/90 p-1.5 rounded-xl border border-neutral-850">
          <button
            id="tab-all"
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'all'
                ? 'bg-gradient-to-r from-lime-400 to-emerald-400 text-black shadow-md shadow-lime-400/25 scale-105'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
            }`}
          >
            <Video className={`w-3.5 h-3.5 ${activeTab === 'all' ? 'text-black' : 'text-neutral-400'}`} />
            All Formats
          </button>

          <button
            id="tab-pinterest"
            onClick={() => setActiveTab('pinterest')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'pinterest'
                ? 'bg-gradient-to-r from-red-600 to-rose-500 text-white shadow-md shadow-red-600/30 scale-105'
                : 'text-neutral-400 hover:text-red-400 hover:bg-neutral-900'
            }`}
          >
            <Pin className="w-3.5 h-3.5 fill-current" />
            Pinterest
          </button>

          <button
            id="tab-youtube"
            onClick={() => setActiveTab('youtube')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'youtube'
                ? 'bg-gradient-to-r from-red-600 to-amber-500 text-white shadow-md shadow-red-600/30 scale-105'
                : 'text-neutral-400 hover:text-red-400 hover:bg-neutral-900'
            }`}
          >
            <Youtube className="w-3.5 h-3.5" />
            YouTube
          </button>

          <button
            id="tab-instagram"
            onClick={() => setActiveTab('instagram')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'instagram'
                ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white shadow-md shadow-pink-500/30 scale-105'
                : 'text-neutral-400 hover:text-pink-400 hover:bg-neutral-900'
            }`}
          >
            <Instagram className="w-3.5 h-3.5" />
            Instagram
          </button>

          <button
            id="tab-video"
            onClick={() => setActiveTab('video')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'video'
                ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-black shadow-md shadow-cyan-400/25 scale-105'
                : 'text-neutral-400 hover:text-cyan-400 hover:bg-neutral-900'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            Any Video
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Batch Mode Switch */}
          <button
            id="btn-batch-mode"
            onClick={() => setBatchMode(!batchMode)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all flex items-center gap-1.5 ${
              batchMode
                ? 'bg-neutral-800 text-red-400 border-red-500/40'
                : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-white hover:border-neutral-700'
            }`}
            title="Toggle Multiple Links Downloader"
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Batch</span>
          </button>

          {/* History Button */}
          <button
            id="btn-open-history"
            onClick={onOpenHistory}
            className="relative px-3 py-1.5 rounded-lg text-xs font-medium bg-neutral-950 text-neutral-300 border border-neutral-800 hover:text-white hover:border-neutral-700 transition-all flex items-center gap-1.5"
            title="View Download History"
          >
            <History className="w-3.5 h-3.5 text-neutral-400" />
            <span className="hidden sm:inline">History</span>
            {historyCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-red-600 text-white">
                {historyCount}
              </span>
            )}
          </button>

          {/* Guide Button */}
          <button
            id="btn-guide"
            onClick={onScrollToGuide}
            className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 transition-all"
            title="How to use Media Downloader"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Mobile Tab Scroller - Colorful Athletic Badges */}
      <div className="md:hidden flex items-center gap-1.5 px-4 py-2 overflow-x-auto border-t border-neutral-900 scrollbar-none bg-neutral-950/80">
        {(['all', 'pinterest', 'youtube', 'instagram', 'video'] as PlatformType[]).map((tab) => {
          let activeClass = 'bg-lime-400 text-black font-extrabold shadow-sm shadow-lime-400/20';
          if (tab === 'pinterest') activeClass = 'bg-red-600 text-white font-extrabold shadow-sm shadow-red-600/30';
          if (tab === 'youtube') activeClass = 'bg-red-500 text-white font-extrabold shadow-sm shadow-red-500/30';
          if (tab === 'instagram') activeClass = 'bg-gradient-to-r from-pink-500 to-purple-600 text-white font-extrabold shadow-sm shadow-pink-500/30';
          if (tab === 'video') activeClass = 'bg-cyan-400 text-black font-extrabold shadow-sm shadow-cyan-400/20';

          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1 rounded-full text-xs transition-all whitespace-nowrap capitalize ${
                activeTab === tab
                  ? activeClass
                  : 'bg-neutral-900 text-neutral-400 font-medium hover:text-white'
              }`}
            >
              {tab === 'all' ? 'All Formats' : tab}
            </button>
          );
        })}
      </div>
    </header>
  );
};
