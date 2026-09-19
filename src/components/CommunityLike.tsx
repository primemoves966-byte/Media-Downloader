import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Flame, ThumbsUp, Star, Check, Zap } from 'lucide-react';

const LIKE_STORAGE_KEY = 'media_downloader_user_like_v1';
const REACTION_STORAGE_KEY = 'media_downloader_user_reactions_v1';
const BASE_LIKES = 38420;

export const CommunityLike: React.FC = () => {
  const [hasLiked, setHasLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(BASE_LIKES);
  const [showCelebration, setShowCelebration] = useState(false);
  const [selectedReactions, setSelectedReactions] = useState<string[]>([]);
  const [showNotification, setShowNotification] = useState<string | null>(null);

  useEffect(() => {
    try {
      const savedLike = localStorage.getItem(LIKE_STORAGE_KEY);
      if (savedLike === 'true') {
        setHasLiked(true);
        setLikeCount(BASE_LIKES + 1);
      }
      const savedReactions = localStorage.getItem(REACTION_STORAGE_KEY);
      if (savedReactions) {
        setSelectedReactions(JSON.parse(savedReactions));
      }
    } catch {
      // storage fallback
    }
  }, []);

  const handleToggleLike = () => {
    if (!hasLiked) {
      setHasLiked(true);
      setLikeCount(prev => prev + 1);
      setShowCelebration(true);
      setShowNotification('Thanks for the love! Added +1 to Media Downloader ❤️');
      try {
        localStorage.setItem(LIKE_STORAGE_KEY, 'true');
      } catch {
        // ignore
      }
      setTimeout(() => setShowCelebration(false), 2500);
      setTimeout(() => setShowNotification(null), 3500);
    } else {
      setHasLiked(false);
      setLikeCount(prev => Math.max(BASE_LIKES, prev - 1));
      try {
        localStorage.removeItem(LIKE_STORAGE_KEY);
      } catch {
        // ignore
      }
    }
  };

  const handleToggleReaction = (tag: string) => {
    let updated: string[];
    if (selectedReactions.includes(tag)) {
      updated = selectedReactions.filter(r => r !== tag);
    } else {
      updated = [...selectedReactions, tag];
      setShowNotification(`Marked as "${tag}"! ⚡`);
      setTimeout(() => setShowNotification(null), 2500);
    }
    setSelectedReactions(updated);
    try {
      localStorage.setItem(REACTION_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const tags = [
    { label: 'Super Fast', icon: Zap, color: 'text-lime-400 border-lime-400/40 bg-lime-400/10 hover:bg-lime-400/20' },
    { label: '4K Ultra HD', icon: Flame, color: 'text-red-400 border-red-400/40 bg-red-400/10 hover:bg-red-400/20' },
    { label: 'Crisp 320k Audio', icon: Sparkles, color: 'text-cyan-400 border-cyan-400/40 bg-cyan-400/10 hover:bg-cyan-400/20' },
    { label: 'Zero Watermark', icon: Check, color: 'text-emerald-400 border-emerald-400/40 bg-emerald-400/10 hover:bg-emerald-400/20' },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 mt-6">
      {/* Puma-style athletic neon accent card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-neutral-900/90 via-neutral-900/95 to-neutral-900/90 border border-neutral-800 p-4 sm:p-5 shadow-2xl backdrop-blur-md">
        
        {/* Colorful ambient glow in Puma colorways (Volt Lime + Hyper Red + Cyber Cyan) */}
        <div className="absolute -top-12 -left-12 w-36 h-36 bg-lime-400/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-36 h-36 bg-red-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Left: Like & Rating info */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            
            {/* Interactive Athletic Like Button */}
            <button
              id="btn-like-media-downloader"
              onClick={handleToggleLike}
              className={`group relative px-5 py-2.5 rounded-xl font-black text-sm tracking-wide transition-all duration-300 flex items-center gap-2.5 shadow-lg active:scale-95 cursor-pointer ${
                hasLiked
                  ? 'bg-gradient-to-r from-red-600 via-rose-500 to-red-600 text-white shadow-red-500/30 ring-2 ring-red-400/50 scale-105'
                  : 'bg-neutral-800/90 hover:bg-neutral-800 text-white border border-neutral-700/80 hover:border-lime-400/60 shadow-neutral-950/40'
              }`}
            >
              <Heart
                className={`w-5 h-5 transition-transform duration-300 ${
                  hasLiked 
                    ? 'fill-current text-white scale-125 animate-pulse' 
                    : 'text-red-500 group-hover:scale-125 group-hover:text-red-400'
                }`}
              />
              <span className="font-['Space_Grotesk',sans-serif]">
                {hasLiked ? 'Liked!' : 'Like App'}
              </span>
              <span className="px-2 py-0.5 rounded-md text-xs font-mono font-bold bg-black/40 text-neutral-200 border border-white/10">
                {likeCount.toLocaleString()}
              </span>

              {/* Sparkle burst effect on click */}
              {showCelebration && (
                <span className="absolute -top-3 -right-2 text-xs animate-bounce bg-lime-400 text-black font-extrabold px-2 py-0.5 rounded-full shadow-lg">
                  +1 Love! 🔥
                </span>
              )}
            </button>

            {/* Rating Stars & Community Count */}
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-1 mb-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
                <span className="ml-1 text-xs font-bold text-white font-mono">4.9 / 5.0</span>
              </div>
              <p className="text-[11px] text-neutral-400">
                Loved by <strong className="text-neutral-200">180,000+ creators</strong> worldwide
              </p>
            </div>

          </div>

          {/* Right: Quick Puma-style athletic tag reactions */}
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {tags.map(t => {
              const Icon = t.icon;
              const isSelected = selectedReactions.includes(t.label);
              return (
                <button
                  key={t.label}
                  id={`tag-${t.label.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => handleToggleReaction(t.label)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold tracking-tight transition-all border flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                    isSelected
                      ? 'bg-lime-400 text-black border-lime-400 shadow-md shadow-lime-400/20 scale-105'
                      : `${t.color} text-neutral-300`
                  }`}
                >
                  <Icon className={`w-3 h-3 ${isSelected ? 'text-black' : ''}`} />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Live Feedback Notification Toast */}
        {showNotification && (
          <div className="mt-3 pt-3 border-t border-neutral-800/80 flex items-center justify-center text-xs font-semibold text-lime-400 animate-in fade-in duration-200">
            <span>{showNotification}</span>
          </div>
        )}

      </div>
    </div>
  );
};
