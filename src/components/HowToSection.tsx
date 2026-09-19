import React, { useState } from 'react';
import { 
  Copy, 
  Search, 
  Download, 
  ChevronDown, 
  ChevronUp, 
  HelpCircle, 
  ShieldCheck,
  Smartphone,
  Check
} from 'lucide-react';

export const HowToSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: 'How do I download videos and images from Pinterest using Media Downloader?',
      a: 'Open Pinterest on your browser or app, navigate to the pin or video you want to save, click the "Share" button, and copy the link. Paste the link into Media Downloader, click "Download", and choose your preferred resolution (such as 1080p MP4 or high-resolution original image).'
    },
    {
      q: 'Can I download YouTube videos as MP3 audio files?',
      a: 'Yes! When you paste a YouTube video or Short URL, Media Downloader extracts both high-definition video formats (1080p, 720p, 480p) as well as dedicated MP3 audio tracks (320kbps high fidelity and 128kbps standard).'
    },
    {
      q: 'Does Media Downloader remove watermarks from TikTok and Instagram Reels?',
      a: 'Yes, our extraction process delivers clean MP4 streams without added promotional watermarks, preserving the original aspect ratio and clarity for your personal collection.'
    },
    {
      q: 'Does it work on iPhone, iPad, and Android mobile devices?',
      a: 'Yes! Media Downloader is 100% web-based and fully responsive. On iOS (Safari/Chrome), tapping download will prompt you to save the file to your Downloads folder or Files app. On Android, the media saves directly to your Gallery or Downloads.'
    },
    {
      q: 'Is Media Downloader completely free to use?',
      a: 'Yes, Media Downloader is 100% free with unlimited downloads. There are no subscriptions, registration requirements, or limits on the number of media files you can download.'
    },
    {
      q: 'Where are my downloaded files saved?',
      a: 'Files are saved automatically to your device’s default "Downloads" folder, which can be viewed in your browser download history, files manager, or photo gallery.'
    }
  ];

  return (
    <section id="guide-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-neutral-900">
      
      {/* 3-Step Guide - Puma Athletic Velocity */}
      <div className="mb-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-black tracking-widest text-lime-400 mb-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-lime-400/10 border border-lime-400/30">
            TURBO SPEED WORKFLOW
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white font-['Space_Grotesk',sans-serif] uppercase tracking-tight mt-2">
            How to Download Media with Media Downloader
          </h2>
          <p className="text-neutral-400 text-sm mt-2">
            Save any video, reel, pin or 320k audio file in three straightforward steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 - Volt Lime */}
          <div className="relative bg-neutral-950 border border-neutral-800 hover:border-lime-400/50 p-6 rounded-3xl transition-all shadow-xl hover:shadow-lime-400/5 group">
            <div className="w-12 h-12 rounded-2xl bg-lime-400/10 border border-lime-400/30 text-lime-400 flex items-center justify-center font-black text-lg mb-5 group-hover:scale-110 group-hover:bg-lime-400 group-hover:text-black transition-all">
              01
            </div>
            <h3 className="text-base font-black text-white mb-2 font-['Space_Grotesk',sans-serif]">
              Copy the Media URL
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Open YouTube, Instagram, Pinterest or TikTok. Tap the <strong>Share</strong> button on any pin, video or reel, then select <strong>Copy Link</strong>.
            </p>
          </div>

          {/* Step 2 - Cyber Cyan */}
          <div className="relative bg-neutral-950 border border-neutral-800 hover:border-cyan-400/50 p-6 rounded-3xl transition-all shadow-xl hover:shadow-cyan-400/5 group">
            <div className="w-12 h-12 rounded-2xl bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 flex items-center justify-center font-black text-lg mb-5 group-hover:scale-110 group-hover:bg-cyan-400 group-hover:text-black transition-all">
              02
            </div>
            <h3 className="text-base font-black text-white mb-2 font-['Space_Grotesk',sans-serif]">
              Paste in Media Downloader
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Paste the copied URL into the search box at the top or click the <strong>Paste</strong> button. Hit <strong>Download Now</strong> to fetch details.
            </p>
          </div>

          {/* Step 3 - Hyper Red */}
          <div className="relative bg-neutral-950 border border-neutral-800 hover:border-rose-500/50 p-6 rounded-3xl transition-all shadow-xl hover:shadow-rose-500/5 group">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center font-black text-lg mb-5 group-hover:scale-110 group-hover:bg-rose-500 group-hover:text-white transition-all">
              03
            </div>
            <h3 className="text-base font-black text-white mb-2 font-['Space_Grotesk',sans-serif]">
              Choose Quality & Save
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Select 1080p Full HD, 4K resolution, or 320kbps MP3 audio, and click download. The file saves directly to your device storage.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 text-neutral-300 text-xs font-semibold mb-3 border border-neutral-800">
            <HelpCircle className="w-3.5 h-3.5 text-red-500" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-['Space_Grotesk',sans-serif]">
            Everything You Need to Know
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-neutral-950 border border-neutral-850 rounded-2xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 text-white font-semibold text-sm hover:text-red-400 transition-colors"
                >
                  <span className="font-['Space_Grotesk',sans-serif]">{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-neutral-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-neutral-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-0 text-xs sm:text-sm text-neutral-400 leading-relaxed border-t border-neutral-900/60 mt-1">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
};
