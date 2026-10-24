import React, { useState, useEffect } from 'react';
import { CatalogueItem } from '../types';
import { 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  X, 
  Sparkles, 
  List, 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface EFlipbookModalProps {
  catalogue: CatalogueItem | null;
  onClose: () => void;
  onSelectTileFromHotspot: (tileId: string) => void;
}

export const EFlipbookModal: React.FC<EFlipbookModalProps> = ({
  catalogue,
  onClose,
  onSelectTileFromHotspot
}) => {
  const { t, language, formatNumber } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showToc, setShowToc] = useState(false);
  const [activeHotspotTile, setActiveHotspotTile] = useState<{ id: string; name: string } | null>(null);

  if (!catalogue) return null;

  const totalPages = catalogue.pagesData?.length || catalogue.pages || 10;
  const currentPageData = catalogue.pagesData?.find(p => p.pageNumber === currentPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
      setZoomLevel(1);
      setActiveHotspotTile(null);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      setZoomLevel(1);
      setActiveHotspotTile(null);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, totalPages]);

  const handleZoomIn = () => {
    if (zoomLevel < 2) setZoomLevel(prev => prev + 0.25);
  };

  const handleZoomOut = () => {
    if (zoomLevel > 0.75) setZoomLevel(prev => prev - 0.25);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col justify-between text-white overflow-hidden animate-fadeIn font-devanagari">
      
      {/* Top Reader Controls Header */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between gap-4 z-20">
        
        {/* Title & Catalogue Name */}
        <div className="flex items-center space-x-3">
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
            title={t.close}
            aria-label={t.close}
          >
            <X className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center space-x-2">
              <span className="bg-amber-500 text-slate-950 font-extrabold text-[10px] px-2 py-0.5 rounded uppercase tracking-wider font-devanagari">
                {t.flipbookTitle}
              </span>
              <span className="text-xs text-slate-400 font-mono hidden sm:inline">PDF {catalogue.fileSize}</span>
            </div>
            <h2 className="text-sm sm:text-base font-bold text-white font-serif tracking-tight truncate max-w-xs sm:max-w-md">
              {catalogue.title}
            </h2>
          </div>
        </div>

        {/* Center Page Nav & Slider */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg text-white cursor-pointer"
            aria-label="Previous Page"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-2 text-xs font-mono">
            <span>{t.flipbookPage}</span>
            <input
              type="number"
              min={1}
              max={totalPages}
              value={currentPage}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                if (val >= 1 && val <= totalPages) setCurrentPage(val);
              }}
              className="w-12 py-1 bg-slate-800 border border-slate-700 rounded text-center text-amber-400 font-bold focus:outline-none"
            />
            <span className="text-slate-400">/ {formatNumber(totalPages)}</span>
          </div>

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg text-white cursor-pointer"
            aria-label="Next Page"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Right Tools & Actions */}
        <div className="flex items-center space-x-2">
          {/* Table of Contents Drawer Toggle */}
          <button
            onClick={() => setShowToc(!showToc)}
            className={`p-2 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer font-devanagari ${
              showToc ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
            }`}
            title={t.tableOfContents}
          >
            <List className="w-4 h-4" />
            <span className="hidden md:inline">{t.tableOfContents}</span>
          </button>

          {/* Zoom Controls */}
          <div className="hidden sm:flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700">
            <button onClick={handleZoomOut} className="p-1.5 hover:text-amber-400 cursor-pointer" title={t.flipbookZoomOut}>
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-[10px] font-mono px-1.5 text-slate-300">{Math.round(zoomLevel * 100)}%</span>
            <button onClick={handleZoomIn} className="p-1.5 hover:text-amber-400 cursor-pointer" title={t.flipbookZoomIn}>
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Main E-Book Viewer Workspace */}
      <div className="flex-1 relative flex overflow-hidden">
        
        {/* Side Table of Contents Drawer */}
        {showToc && (
          <div className="w-72 bg-slate-900 border-r border-slate-800 p-4 flex flex-col z-20 overflow-y-auto animate-slideInLeft">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center">
                <List className="w-3.5 h-3.5 mr-1.5" />
                Catalogue Contents
              </h3>
              <button onClick={() => setShowToc(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Page Thumbnail Links */}
            <div className="space-y-2 flex-1">
              {catalogue.pagesData?.map((p) => (
                <button
                  key={p.pageNumber}
                  onClick={() => {
                    setCurrentPage(p.pageNumber);
                    setShowToc(false);
                  }}
                  className={`w-full text-left p-2 rounded-lg border text-xs flex items-center space-x-3 transition-all ${
                    currentPage === p.pageNumber
                      ? 'bg-amber-500/10 border-amber-500 text-amber-300'
                      : 'bg-slate-800/50 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="w-10 h-14 bg-slate-950 rounded overflow-hidden shrink-0 border border-slate-700">
                    <img src={p.imageUrl} alt={p.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="text-[10px] text-amber-400 font-mono">Page {p.pageNumber}</span>
                    <p className="font-bold line-clamp-1">{p.title}</p>
                    <span className="text-[9px] text-slate-400">{p.category}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* E-Page Render Stage */}
        <div className="flex-1 relative flex items-center justify-center p-4 sm:p-8 overflow-auto">
          
          <div 
            className="relative transition-transform duration-300 shadow-2xl rounded-lg overflow-hidden border border-slate-800 max-h-[80vh]"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            {/* Slide Image */}
            <img
              src={currentPageData?.imageUrl || catalogue.coverImage}
              alt={currentPageData?.title || catalogue.title}
              referrerPolicy="no-referrer"
              className="max-h-[75vh] w-auto object-contain bg-slate-950"
            />

            {/* Interactive Hotspots on Page */}
            {currentPageData?.hotspots?.map((spot, idx) => (
              <div
                key={idx}
                style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                onClick={() => {
                  setActiveHotspotTile({ id: spot.tileId, name: spot.tileName });
                  onSelectTileFromHotspot(spot.tileId);
                }}
              >
                {/* Pulsing Hotspot Icon */}
                <div className="relative">
                  <span className="absolute -inset-1 rounded-full bg-amber-400 animate-ping opacity-75" />
                  <div className="relative w-7 h-7 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-xs shadow-xl border-2 border-slate-950 group-hover:scale-125 transition-transform">
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>

                {/* Hotspot Hover Label */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-slate-950/90 text-amber-300 border border-amber-500/40 text-[11px] font-bold py-1 px-3 rounded-md shadow-2xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30">
                  <span>View Tile: {spot.tileName}</span>
                </div>
              </div>
            ))}

            {/* Bottom Slide Info Overlay */}
            <div className="absolute bottom-0 inset-x-0 bg-slate-950/80 backdrop-blur-md p-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] text-amber-400 uppercase font-mono tracking-wider">
                  Page {currentPage} • {currentPageData?.category || catalogue.category}
                </span>
                <p className="font-bold text-white font-serif">{currentPageData?.title || catalogue.title}</p>
              </div>

              {currentPageData?.hotspots && currentPageData.hotspots.length > 0 && (
                <div className="flex items-center space-x-1 text-emerald-400 text-[11px] font-semibold bg-emerald-950/80 px-2.5 py-1 rounded border border-emerald-500/30">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Click Hotspot to View Tile Spec</span>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Thumbnail Strip Bar */}
      <div className="bg-slate-900 border-t border-slate-800 p-2.5 px-4 flex items-center justify-between gap-4 z-20">
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1 flex-1">
          {catalogue.pagesData?.map((p) => (
            <button
              key={p.pageNumber}
              onClick={() => {
                setCurrentPage(p.pageNumber);
                setZoomLevel(1);
              }}
              className={`w-12 h-16 rounded overflow-hidden shrink-0 border-2 transition-all relative ${
                currentPage === p.pageNumber 
                  ? 'border-amber-400 scale-105 shadow-md' 
                  : 'border-slate-800 opacity-60 hover:opacity-100'
              }`}
            >
              <img src={p.imageUrl} alt={p.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              <span className="absolute bottom-0 inset-x-0 bg-slate-950/80 text-white text-[9px] text-center font-mono">
                {p.pageNumber}
              </span>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};
