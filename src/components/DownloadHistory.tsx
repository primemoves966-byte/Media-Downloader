import React from 'react';
import { X, Trash2, Download, History, ExternalLink, Film, Music, Image as ImageIcon } from 'lucide-react';
import { HistoryItem } from '../types';
import { downloadFile } from '../utils/mediaHelper';

interface DownloadHistoryProps {
  isOpen: boolean;
  onClose: () => void;
  items: HistoryItem[];
  onClearHistory: () => void;
  onRemoveItem: (id: string) => void;
}

export const DownloadHistory: React.FC<DownloadHistoryProps> = ({
  isOpen,
  onClose,
  items,
  onClearHistory,
  onRemoveItem
}) => {
  if (!isOpen) return null;

  const handleReDownload = async (item: HistoryItem) => {
    const filename = `${item.title.slice(0, 30).replace(/[^a-zA-Z0-9]/g, '_')}_${item.quality}.${item.format.toLowerCase()}`;
    await downloadFile(item.downloadUrl, filename);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md h-full bg-neutral-950 border-l border-neutral-850 p-6 flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-900">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300">
              <History className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white font-['Space_Grotesk',sans-serif]">
                Download History
              </h3>
              <p className="text-[11px] text-neutral-400">
                {items.length} {items.length === 1 ? 'item' : 'items'} saved locally
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {items.length > 0 && (
              <button
                onClick={onClearHistory}
                className="p-1.5 text-neutral-400 hover:text-red-400 rounded-lg hover:bg-neutral-900 transition-colors"
                title="Clear all history"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* List Content */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-neutral-500">
              <History className="w-10 h-10 stroke-1 mb-3 text-neutral-600" />
              <p className="text-sm font-medium text-neutral-400">No downloads yet</p>
              <p className="text-xs text-neutral-600 mt-1 max-w-xs">
                Your downloaded media from YouTube, Instagram, Pinterest and TikTok will appear here for fast re-access.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-2xl bg-black border border-neutral-850 hover:border-neutral-800 transition-all flex items-center gap-3"
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-14 h-14 rounded-xl object-cover border border-neutral-850 shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="px-1.5 py-0.2 rounded text-[9px] uppercase font-bold bg-neutral-900 text-red-400 border border-neutral-800">
                      {item.platform}
                    </span>
                    <span className="text-[10px] text-neutral-500 font-medium">
                      {new Date(item.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                    </span>
                  </div>

                  <h4 className="text-xs font-semibold text-white truncate">
                    {item.title}
                  </h4>

                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    {item.quality} • {item.format}
                  </p>
                </div>

                <div className="flex flex-col items-center gap-1 shrink-0">
                  <button
                    onClick={() => handleReDownload(item)}
                    className="p-2 rounded-lg bg-neutral-900 hover:bg-red-600 hover:text-white text-neutral-300 border border-neutral-800 transition-colors"
                    title="Download again"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="p-1 text-neutral-600 hover:text-neutral-300 transition-colors"
                    title="Remove from history"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="pt-4 border-t border-neutral-900 text-center">
            <span className="text-[11px] text-neutral-500">
              Downloaded items are stored on this browser
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
