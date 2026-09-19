import React, { useState } from 'react';
import { 
  Layers, 
  Download, 
  Trash2, 
  Plus, 
  CheckCircle, 
  Loader2, 
  AlertCircle,
  ExternalLink 
} from 'lucide-react';
import { MediaItem } from '../types';
import { detectPlatform, downloadFile } from '../utils/mediaHelper';

interface BatchQueueItem {
  id: string;
  url: string;
  platform: string;
  status: 'idle' | 'fetching' | 'ready' | 'downloading' | 'completed' | 'error';
  media?: MediaItem;
  errorMsg?: string;
}

interface BatchDownloaderProps {
  onClose: () => void;
  onDownloadedItem: (title: string, author: string, platform: any, thumbnail: string, format: string, quality: string, url: string) => void;
}

export const BatchDownloader: React.FC<BatchDownloaderProps> = ({
  onClose,
  onDownloadedItem
}) => {
  const [inputText, setInputText] = useState('');
  const [queue, setQueue] = useState<BatchQueueItem[]>([]);
  const [isProcessingAll, setIsProcessingAll] = useState(false);

  const handleAddLinks = () => {
    const lines = inputText
      .split('\n')
      .map(l => l.trim())
      .filter(l => l.length > 5 && (l.startsWith('http://') || l.startsWith('https://')));

    if (lines.length === 0) return;

    const newItems: BatchQueueItem[] = lines.map((url, idx) => ({
      id: `${Date.now()}-${idx}`,
      url,
      platform: detectPlatform(url),
      status: 'idle'
    }));

    setQueue(prev => [...prev, ...newItems]);
    setInputText('');
  };

  const processQueueItem = async (item: BatchQueueItem) => {
    setQueue(prev => prev.map(q => q.id === item.id ? { ...q, status: 'fetching' } : q));

    try {
      const res = await fetch('/api/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: item.url })
      });

      if (!res.ok) throw new Error('Extraction failed');
      const data: MediaItem = await res.json();

      setQueue(prev => prev.map(q => q.id === item.id ? { ...q, status: 'ready', media: data } : q));
      return data;
    } catch {
      setQueue(prev => prev.map(q => q.id === item.id ? { ...q, status: 'error', errorMsg: 'Could not fetch media' } : q));
      return null;
    }
  };

  const handleDownloadItem = async (item: BatchQueueItem) => {
    if (!item.media || item.media.formats.length === 0) return;
    const bestFormat = item.media.formats[0];

    setQueue(prev => prev.map(q => q.id === item.id ? { ...q, status: 'downloading' } : q));

    try {
      const filename = `${item.media.title.slice(0, 30).replace(/[^a-zA-Z0-9]/g, '_')}_${bestFormat.quality}.${bestFormat.format.toLowerCase()}`;
      await downloadFile(bestFormat.url, filename);

      onDownloadedItem(
        item.media.title,
        item.media.author,
        item.media.platform,
        item.media.thumbnail,
        bestFormat.format,
        bestFormat.quality,
        bestFormat.url
      );

      setQueue(prev => prev.map(q => q.id === item.id ? { ...q, status: 'completed' } : q));
    } catch {
      setQueue(prev => prev.map(q => q.id === item.id ? { ...q, status: 'error', errorMsg: 'Download failed' } : q));
    }
  };

  const handleProcessAndDownloadAll = async () => {
    setIsProcessingAll(true);

    for (const item of queue) {
      if (item.status === 'completed') continue;

      let media = item.media;
      if (!media) {
        media = (await processQueueItem(item)) || undefined;
      }

      if (media && media.formats.length > 0) {
        const bestFormat = media.formats[0];
        setQueue(prev => prev.map(q => q.id === item.id ? { ...q, status: 'downloading' } : q));
        
        try {
          const filename = `${media.title.slice(0, 30).replace(/[^a-zA-Z0-9]/g, '_')}_${bestFormat.quality}.${bestFormat.format.toLowerCase()}`;
          await downloadFile(bestFormat.url, filename);
          onDownloadedItem(
            media.title,
            media.author,
            media.platform,
            media.thumbnail,
            bestFormat.format,
            bestFormat.quality,
            bestFormat.url
          );
          setQueue(prev => prev.map(q => q.id === item.id ? { ...q, status: 'completed' } : q));
        } catch {
          setQueue(prev => prev.map(q => q.id === item.id ? { ...q, status: 'error' } : q));
        }
      }
    }

    setIsProcessingAll(false);
  };

  const handleRemove = (id: string) => {
    setQueue(prev => prev.filter(q => q.id !== id));
  };

  const handleClearAll = () => {
    setQueue([]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 mb-12 animate-in fade-in duration-300">
      <div className="bg-neutral-950 border border-neutral-800 rounded-3xl p-6 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-900 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-red-500">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-['Space_Grotesk',sans-serif]">
                Batch URL Downloader
              </h2>
              <p className="text-xs text-neutral-400">
                Paste multiple links (one per line) from Pinterest, YouTube, Instagram or TikTok
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-xs font-semibold text-neutral-400 hover:text-white px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800"
          >
            Close Batch
          </button>
        </div>

        {/* Textarea Input */}
        <div className="space-y-3 mb-6">
          <textarea
            id="batch-urls-input"
            rows={3}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=...&#10;https://www.instagram.com/reel/...&#10;https://pinterest.com/pin/..."
            className="w-full bg-black border border-neutral-800 rounded-xl p-3 text-xs sm:text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-red-600/50 font-mono"
          />

          <div className="flex items-center justify-between">
            <span className="text-xs text-neutral-500">
              Enter one link per line
            </span>

            <button
              id="btn-add-batch-links"
              onClick={handleAddLinks}
              disabled={!inputText.trim()}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-neutral-900 hover:bg-neutral-850 text-white border border-neutral-800 disabled:opacity-40 transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5 text-red-500" />
              <span>Add to Queue</span>
            </button>
          </div>
        </div>

        {/* Queue List */}
        {queue.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-neutral-400 pb-2 border-b border-neutral-900">
              <span>Queue ({queue.length} items)</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleClearAll}
                  className="text-neutral-500 hover:text-red-400 transition-colors"
                >
                  Clear All
                </button>
                <button
                  id="btn-download-all-batch"
                  onClick={handleProcessAndDownloadAll}
                  disabled={isProcessingAll}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-red-600 hover:bg-red-500 text-white transition-colors flex items-center gap-1.5 disabled:opacity-50"
                >
                  {isProcessingAll ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" />
                      <span>Download All</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {queue.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-black/60 border border-neutral-850 text-xs"
                >
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-neutral-900 text-red-400 border border-neutral-800 shrink-0">
                      {item.platform}
                    </span>

                    <span className="text-neutral-300 truncate font-mono">
                      {item.media ? item.media.title : item.url}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {item.status === 'idle' && (
                      <button
                        onClick={() => processQueueItem(item)}
                        className="px-2.5 py-1 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-medium"
                      >
                        Extract
                      </button>
                    )}

                    {item.status === 'fetching' && (
                      <span className="flex items-center gap-1 text-neutral-400">
                        <Loader2 className="w-3 h-3 animate-spin text-red-500" />
                        Fetching
                      </span>
                    )}

                    {item.status === 'ready' && (
                      <button
                        onClick={() => handleDownloadItem(item)}
                        className="px-2.5 py-1 rounded bg-red-600 hover:bg-red-500 text-white font-bold flex items-center gap-1"
                      >
                        <Download className="w-3 h-3" />
                        Download
                      </button>
                    )}

                    {item.status === 'downloading' && (
                      <span className="flex items-center gap-1 text-red-400">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        Downloading
                      </span>
                    )}

                    {item.status === 'completed' && (
                      <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                        <CheckCircle className="w-3 h-3" />
                        Saved
                      </span>
                    )}

                    {item.status === 'error' && (
                      <span className="flex items-center gap-1 text-red-400">
                        <AlertCircle className="w-3 h-3" />
                        Failed
                      </span>
                    )}

                    <button
                      onClick={() => handleRemove(item.id)}
                      className="p-1 text-neutral-600 hover:text-neutral-300 rounded"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
