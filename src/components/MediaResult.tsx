import React, { useState } from 'react';
import { 
  Play, 
  Download, 
  Check, 
  Loader2, 
  Music, 
  Film, 
  Image as ImageIcon, 
  Sparkles,
  ExternalLink,
  Copy,
  Clock,
  User,
  ShieldCheck
} from 'lucide-react';
import { MediaItem, MediaFormat } from '../types';

interface MediaResultProps {
  media: MediaItem;
  onDownload: (format: MediaFormat) => Promise<void>;
  onOpenPlayer: () => void;
}

export const MediaResult: React.FC<MediaResultProps> = ({
  media,
  onDownload,
  onOpenPlayer
}) => {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [completedId, setCompletedId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'video' | 'audio' | 'image'>('all');

  const handleDownloadClick = async (format: MediaFormat) => {
    setDownloadingId(format.id);
    setProgress(20);
    const interval = setInterval(() => {
      setProgress(p => (p < 85 ? p + 15 : p));
    }, 150);

    try {
      await onDownload(format);
      clearInterval(interval);
      setProgress(100);
      setCompletedId(format.id);
      setTimeout(() => {
        setDownloadingId(null);
        setCompletedId(null);
        setProgress(0);
      }, 2500);
    } catch {
      clearInterval(interval);
      setDownloadingId(null);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(media.originalUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const filteredFormats = media.formats.filter(f => {
    if (activeFilter === 'all') return true;
    return f.type === activeFilter;
  });

  return (
    <div className="w-full max-w-4xl mx-auto px-4 mb-16 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="bg-neutral-950 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl">
        
        {/* Top Info Bar */}
        <div className="p-6 border-b border-neutral-900 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center w-full">
            
            {/* Thumbnail Box with Play overlay */}
            <div 
              onClick={onOpenPlayer}
              className="relative w-full sm:w-44 h-28 sm:h-28 rounded-2xl overflow-hidden bg-black border border-neutral-800 group cursor-pointer shrink-0 shadow-lg"
            >
              <img
                src={media.thumbnail}
                alt={media.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 flex items-center justify-center transition-colors">
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-lime-400 to-emerald-400 text-black flex items-center justify-center shadow-lg shadow-lime-400/30 group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </div>
              </div>

              {media.duration && (
                <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/80 text-[10px] font-mono text-white font-bold border border-white/10">
                  {media.duration}
                </span>
              )}
            </div>

            {/* Title & Metadata */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-lime-400/10 text-lime-400 border border-lime-400/30">
                  {media.platform}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded-full border border-cyan-800/40 font-semibold">
                  <ShieldCheck className="w-3 h-3" />
                  No Watermark
                </span>
              </div>

              <h2 className="text-base sm:text-lg font-bold text-white leading-snug line-clamp-2 mb-2 font-['Space_Grotesk',sans-serif]">
                {media.title}
              </h2>

              <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400">
                <span className="flex items-center gap-1 text-neutral-300">
                  <User className="w-3.5 h-3.5 text-neutral-500" />
                  {media.author}
                </span>
                {media.duration && (
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-neutral-500" />
                    {media.duration}
                  </span>
                )}
              </div>
            </div>

          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end border-t md:border-t-0 pt-3 md:pt-0 border-neutral-900">
            <button
              id="btn-preview-player"
              onClick={onOpenPlayer}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-neutral-900 hover:bg-neutral-850 text-white border border-neutral-800 transition-colors flex items-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5 text-red-500" />
              <span>Preview</span>
            </button>

            <button
              id="btn-copy-media-link"
              onClick={handleCopyLink}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-neutral-900 hover:bg-neutral-850 text-neutral-300 hover:text-white border border-neutral-800 transition-colors flex items-center gap-1.5"
              title="Copy original link"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Copied' : 'Share'}</span>
            </button>
          </div>
        </div>

        {/* Format Selection Filter Tabs */}
        <div className="px-6 pt-5 pb-3 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-1 bg-black p-1 rounded-xl border border-neutral-900">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                activeFilter === 'all'
                  ? 'bg-neutral-850 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              All Formats ({media.formats.length})
            </button>
            <button
              onClick={() => setActiveFilter('video')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
                activeFilter === 'video'
                  ? 'bg-neutral-850 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Film className="w-3 h-3 text-red-400" />
              Videos
            </button>
            <button
              onClick={() => setActiveFilter('audio')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
                activeFilter === 'audio'
                  ? 'bg-neutral-850 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Music className="w-3 h-3 text-emerald-400" />
              Audio MP3
            </button>
            <button
              onClick={() => setActiveFilter('image')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
                activeFilter === 'image'
                  ? 'bg-neutral-850 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <ImageIcon className="w-3 h-3 text-blue-400" />
              Thumbnails & Images
            </button>
          </div>

          <span className="text-xs text-neutral-500">
            Instant Direct Downloads
          </span>
        </div>

        {/* Formats Download Grid / List */}
        <div className="p-6 pt-2 space-y-2.5">
          {filteredFormats.map((format) => {
            const isDownloading = downloadingId === format.id;
            const isDone = completedId === format.id;

            return (
              <div
                key={format.id}
                className={`relative p-3.5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  format.isBest
                    ? 'bg-neutral-900/70 border-red-900/40 hover:border-red-700/60'
                    : 'bg-black/60 border-neutral-850 hover:border-neutral-800'
                }`}
              >
                {/* Format Info */}
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${
                    format.type === 'video'
                      ? 'bg-red-950/40 border-red-900/50 text-red-400'
                      : format.type === 'audio'
                      ? 'bg-emerald-950/40 border-emerald-900/50 text-emerald-400'
                      : 'bg-blue-950/40 border-blue-900/50 text-blue-400'
                  }`}>
                    {format.type === 'video' && <Film className="w-4 h-4" />}
                    {format.type === 'audio' && <Music className="w-4 h-4" />}
                    {format.type === 'image' && <ImageIcon className="w-4 h-4" />}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">
                        {format.quality}
                      </span>
                      {format.isBest && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-gradient-to-r from-lime-400 to-emerald-400 text-black tracking-wider uppercase shadow-sm">
                          ⚡ NITRO BEST
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-neutral-400 mt-0.5">
                      <span className="font-semibold uppercase text-neutral-300">{format.format}</span>
                      <span>•</span>
                      <span>{format.size}</span>
                      {format.type === 'video' && <span>• High Bitrate</span>}
                    </div>
                  </div>
                </div>

                {/* Download Button with Progress */}
                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    id={`btn-download-${format.id}`}
                    onClick={() => handleDownloadClick(format)}
                    disabled={isDownloading}
                    className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 shadow-sm cursor-pointer active:scale-95 ${
                      isDone
                        ? 'bg-emerald-500 text-black font-extrabold shadow-emerald-500/20'
                        : format.isBest
                        ? 'bg-gradient-to-r from-lime-400 via-emerald-400 to-cyan-400 hover:from-lime-300 hover:to-cyan-300 text-black shadow-lg shadow-lime-400/20'
                        : 'bg-neutral-850 hover:bg-neutral-800 text-white border border-neutral-750 hover:border-lime-400/40'
                    }`}
                  >
                    {isDownloading ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Saving ({progress}%)...</span>
                      </>
                    ) : isDone ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Downloaded!</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-3.5 h-3.5" />
                        <span>Download</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Progress bar line if downloading */}
                {isDownloading && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-neutral-800 rounded-b-2xl overflow-hidden">
                    <div 
                      className="h-full bg-red-600 transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
