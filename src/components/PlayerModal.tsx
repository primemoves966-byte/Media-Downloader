import React from 'react';
import { X, Download, Play, Music, ExternalLink } from 'lucide-react';
import { MediaItem, MediaFormat } from '../types';

interface PlayerModalProps {
  media: MediaItem;
  isOpen: boolean;
  onClose: () => void;
  onDownload: (format: MediaFormat) => void;
}

export const PlayerModal: React.FC<PlayerModalProps> = ({
  media,
  isOpen,
  onClose,
  onDownload
}) => {
  if (!isOpen) return null;

  const bestVideoFormat = media.formats.find(f => f.type === 'video') || media.formats[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-850">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-red-950 text-red-400 border border-red-800">
              {media.platform}
            </span>
            <h3 className="text-sm font-semibold text-white truncate max-w-md">
              {media.title}
            </h3>
          </div>

          <button
            id="modal-close-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Player Body */}
        <div className="bg-black flex items-center justify-center relative min-h-[300px] max-h-[500px]">
          {bestVideoFormat && bestVideoFormat.type === 'video' ? (
            <video
              src={bestVideoFormat.url}
              controls
              autoPlay
              playsInline
              className="w-full max-h-[480px] object-contain"
              poster={media.thumbnail}
            >
              Your browser does not support video playback.
            </video>
          ) : (
            <div className="p-8 text-center flex flex-col items-center">
              <img
                src={media.thumbnail}
                alt={media.title}
                className="max-h-[360px] rounded-lg object-contain mb-4 border border-neutral-800"
              />
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-neutral-950 border-t border-neutral-850 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-neutral-400">
            <span>By <strong className="text-white">{media.author}</strong></span>
            {media.duration && <span className="ml-2">• {media.duration}</span>}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={media.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800 transition-colors flex items-center gap-1.5"
            >
              <span>Original Post</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {bestVideoFormat && (
              <button
                id="modal-download-btn"
                onClick={() => onDownload(bestVideoFormat)}
                className="px-4 py-1.5 rounded-lg text-xs font-bold bg-red-600 hover:bg-red-500 text-white transition-colors flex items-center gap-1.5 shadow-md shadow-red-950/40"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download {bestVideoFormat.quality}</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
