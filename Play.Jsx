import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, Maximize2, Minimize2, RefreshCw, Gamepad2 } from 'lucide-react';

export default function Play() {
  const params = new URLSearchParams(window.location.search);
  const title = params.get('title') || 'Game';
  const url = params.get('url') || '';
  const image = params.get('image') || '';

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [key, setKey] = useState(0); // used to reload iframe
  const navigate = useNavigate();

  const toggleFullscreen = () => {
    const el = document.getElementById('game-frame-wrapper');
    if (!document.fullscreenElement) {
      el?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  if (!url) {
    return (
      <div className="min-h-screen bg-[#0f0f2e] flex flex-col items-center justify-center text-white gap-4">
        <Gamepad2 className="w-16 h-16 text-[#4d9fff]/40" />
        <p className="text-xl font-bold">No game URL provided.</p>
        <button
          onClick={() => navigate(createPageUrl('Home'))}
          className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#4d9fff] hover:bg-[#3a8eee] font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Games
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f2e] flex flex-col">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0a0a20] border-b border-[#1a1a4e] shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(createPageUrl('Home'))}
            className="flex items-center gap-2 text-[#8888cc] hover:text-white transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <div className="w-px h-5 bg-[#2a2a6e]" />
          {image && (
            <img src={image} alt={title} className="w-7 h-7 rounded object-cover" />
          )}
          <span className="text-white font-bold text-lg">{title}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setKey(k => k + 1)}
            title="Reload game"
            className="p-2 rounded-lg text-[#8888cc] hover:text-white hover:bg-[#1a1a4e] transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={toggleFullscreen}
            title="Fullscreen"
            className="p-2 rounded-lg text-[#8888cc] hover:text-white hover:bg-[#1a1a4e] transition-colors"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Game iframe */}
      <div id="game-frame-wrapper" className="flex-1 w-full bg-black">
        <iframe
          key={key}
          src={url}
          title={title}
          className="w-full h-full border-0"
          style={{ minHeight: 'calc(100vh - 57px)' }}
          allow="fullscreen; autoplay; clipboard-write"
          allowFullScreen
        />
      </div>
    </div>
  );
}