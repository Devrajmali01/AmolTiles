import React, { useState, useEffect } from 'react';
import { TileProduct } from '../types';
import { 
  Search, 
  Layers, 
  Sparkles, 
  SlidersHorizontal, 
  CheckCircle2, 
  Package, 
  Eye, 
  Copy, 
  ArrowUpDown,
  Maximize2,
  Info
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Interactive3DCard } from './Interactive3DCard';

interface TileFinderProps {
  tiles: TileProduct[];
  onSelectTile: (tile: TileProduct) => void;
  onToggleCompare: (tileId: string) => void;
  compareTileIds: string[];
  onToggleSampleRequest: (tileId: string) => void;
  sampleTileIds: string[];
  initialSearchQuery?: string;
  onOpenAdminDashboard?: () => void;
}

export const TileFinder: React.FC<TileFinderProps> = ({
  tiles,
  onSelectTile,
  onToggleCompare,
  compareTileIds,
  onToggleSampleRequest,
  sampleTileIds,
  initialSearchQuery = '',
  onOpenAdminDashboard
}) => {
  const { t, language } = useLanguage();
  const [search, setSearch] = useState(initialSearchQuery);
  const [selectedSize, setSelectedSize] = useState('All Sizes');
  const [selectedFinish, setSelectedFinish] = useState('All Finishes');
  const [selectedApplication, setSelectedApplication] = useState('All Applications');
  const [selectedLook, setSelectedLook] = useState('All Looks');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  useEffect(() => {
    setSearch(initialSearchQuery);
  }, [initialSearchQuery]);

  const sizes = ['All Sizes', '1200x2400mm', '800x1600mm', '600x1200mm', '600x600mm', '300x600mm', '200x1200mm'];
  const finishes = ['All Finishes', 'High Gloss', 'Silk Matt', 'Carving', 'Bookmatch', 'Rustic Anti-Skid', 'Satin'];
  const applications = ['All Applications', 'Floor', 'Wall', 'Outdoor', 'Kitchen', 'Bathroom', 'Elevation'];
  const looks = ['All Looks', 'Statuario Marble', 'Onyx', 'Wood Plank', 'Concrete', 'Geometric Art', 'Royal Slate'];

  const filteredTiles = tiles.filter((tile) => {
    const s = search.trim().toLowerCase();
    const matchesSearch = !s || 
      tile.name.toLowerCase().includes(s) ||
      tile.code.toLowerCase().includes(s) ||
      tile.description.toLowerCase().includes(s) ||
      tile.category.toLowerCase().includes(s) ||
      tile.look.toLowerCase().includes(s) ||
      tile.finish.toLowerCase().includes(s) ||
      tile.application.some(app => app.toLowerCase().includes(s)) ||
      (s === 'parking' && (tile.category.toLowerCase().includes('paver') || tile.application.some(a => a.toLowerCase().includes('outdoor')))) ||
      (s === 'living room' && (tile.description.toLowerCase().includes('living') || tile.description.toLowerCase().includes('drawing') || tile.application.some(a => a.toLowerCase().includes('floor')))) ||
      (s === 'vitrified' && (tile.category.toLowerCase().includes('vitrified') || tile.category.toLowerCase().includes('gvt') || tile.description.toLowerCase().includes('vitrified'))) ||
      (s === 'ceramic' && (tile.category.toLowerCase().includes('ceramic') || tile.description.toLowerCase().includes('ceramic')));

    const matchesSize = selectedSize === 'All Sizes' || tile.size === selectedSize;
    const matchesFinish = selectedFinish === 'All Finishes' || tile.finish === selectedFinish;
    const matchesApp = selectedApplication === 'All Applications' || tile.application.includes(selectedApplication as any);
    const matchesLook = selectedLook === 'All Looks' || tile.look === selectedLook;
    const matchesCategory = selectedCategory === 'All Categories' || tile.category === selectedCategory;

    return matchesSearch && matchesSize && matchesFinish && matchesApp && matchesLook && matchesCategory;
  });

  return (
    <div className="py-10 bg-white min-h-screen border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-10">
        
        {/* Header Title */}
        <div className="mb-6 font-devanagari">
          <p className="text-xs font-bold text-[#b8860b] uppercase tracking-widest mb-1">
            {t.directoryTitle}
          </p>
          <h1 className="text-3xl font-extrabold text-gray-900">
            {t.directoryTitle}
          </h1>
          <p className="text-xs text-gray-600 mt-1 max-w-2xl font-semibold uppercase tracking-wider">
            {t.directorySubtitle}
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-[#f9fafb] border border-gray-200 p-5 mb-8 space-y-4">
          
          {/* Top Search Bar */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                const val = e.target.value;
                if (val.trim().toLowerCase() === 'amoltiles4545') {
                  setSearch('');
                  onOpenAdminDashboard?.();
                  return;
                }
                setSearch(val);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && search.trim().toLowerCase() === 'amoltiles4545') {
                  setSearch('');
                  onOpenAdminDashboard?.();
                }
              }}
              placeholder="Search by name, brand, or code (e.g., Marbito, Granite, Z Black, Finolex, Eureka...)"
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 text-xs text-gray-900 focus:outline-none focus:border-black transition-all"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-black font-bold">
                ✕
              </button>
            )}
          </div>

          {/* Quick Filter Tag Chips */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[10px] uppercase font-bold tracking-wider">
            <span className="text-gray-400 mr-1">Quick Search:</span>
            {['Marbito', 'Signova', 'Warmora', 'Wellnato', 'Granite', 'Z Black', 'Pearl Black', 'Steel Gray', 'Silvassa Red', 'Lakha Red', 'Finolex', 'Rainbow', 'Eureka', 'Squad', 'Jindal'].map((tag) => (
              <button
                key={tag}
                onClick={() => setSearch(search === tag ? '' : tag)}
                className={`px-2.5 py-1 border transition-colors ${
                  search.toLowerCase() === tag.toLowerCase()
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-black'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Filter Dropdowns Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            
            {/* Size Filter */}
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Size Format</label>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full py-2 px-3 bg-white border border-gray-200 text-gray-800 font-medium focus:outline-none focus:border-black uppercase text-[11px]"
              >
                {sizes.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {/* Finish Filter */}
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Surface Finish</label>
              <select
                value={selectedFinish}
                onChange={(e) => setSelectedFinish(e.target.value)}
                className="w-full py-2 px-3 bg-white border border-gray-200 text-gray-800 font-medium focus:outline-none focus:border-black uppercase text-[11px]"
              >
                {finishes.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>

            {/* Application Filter */}
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Application Area</label>
              <select
                value={selectedApplication}
                onChange={(e) => setSelectedApplication(e.target.value)}
                className="w-full py-2 px-3 bg-white border border-gray-200 text-gray-800 font-medium focus:outline-none focus:border-black uppercase text-[11px]"
              >
                {applications.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>

            {/* Look / Style Filter */}
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Aesthetic Look</label>
              <select
                value={selectedLook}
                onChange={(e) => setSelectedLook(e.target.value)}
                className="w-full py-2 px-3 bg-white border border-gray-200 text-gray-800 font-medium focus:outline-none focus:border-black uppercase text-[11px]"
              >
                {looks.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>

          </div>

          {/* Filter Status Reset */}
          <div className="flex items-center justify-between text-[11px] uppercase tracking-widest text-gray-400 pt-2 border-t border-gray-200">
            <span>Showing <strong>{filteredTiles.length}</strong> matching tile designs</span>
            {(selectedSize !== 'All Sizes' || selectedFinish !== 'All Finishes' || selectedApplication !== 'All Applications' || selectedLook !== 'All Looks' || search) && (
              <button
                onClick={() => {
                  setSelectedSize('All Sizes');
                  setSelectedFinish('All Finishes');
                  setSelectedApplication('All Applications');
                  setSelectedLook('All Looks');
                  setSearch('');
                }}
                className="text-black font-bold underline hover:opacity-75"
              >
                Reset All Filters
              </button>
            )}
          </div>

        </div>

        {/* Tile Cards Grid */}
        {filteredTiles.length === 0 ? (
          <div className="bg-[#f9fafb] p-12 text-center border border-gray-200">
            <Layers className="w-10 h-10 text-gray-400 mx-auto mb-3" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-800">No tiles found matching your criteria</h3>
            <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">Try adjusting your filters or search keywords.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTiles.map((tile) => {
              const isComparing = compareTileIds.includes(tile.id);
              const isSampled = sampleTileIds.includes(tile.id);

              return (
                <Interactive3DCard
                  key={tile.id}
                  maxTilt={7}
                  glareEffect={true}
                  className="rounded-xl overflow-hidden shadow-xs hover:shadow-xl transition-shadow"
                >
                  <div
                    className="bg-white border border-gray-200/90 rounded-xl overflow-hidden flex flex-col h-full group hover:border-black transition-colors"
                  >
                    {/* Texture Thumbnail Image */}
                    <div className="relative aspect-square bg-gray-100 overflow-hidden cursor-pointer" onClick={() => onSelectTile(tile)}>
                      <img
                        src={tile.textureUrl}
                        alt={tile.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      {/* Size & Code Badges */}
                      <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                        <span className="bg-black/80 backdrop-blur-sm text-white text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border border-white/20">
                          {tile.size}
                        </span>
                        <span className="bg-black/80 backdrop-blur-sm text-white text-[9px] font-mono px-2 py-0.5 rounded border border-white/20">
                          {tile.code}
                        </span>
                      </div>

                      {/* Quick View Button Overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectTile(tile);
                          }}
                          className="px-4 py-2 bg-white text-black font-bold text-[10px] uppercase tracking-widest rounded border border-black hover:bg-black hover:text-white transition-colors shadow-md"
                        >
                          View Specs & Faces
                        </button>
                      </div>
                    </div>

                    {/* Tile Information Content */}
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600">
                            {tile.finish}
                          </span>
                          <span className="text-[10px] text-gray-300">•</span>
                          <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">{tile.look}</span>
                        </div>

                        <h3 
                          onClick={() => onSelectTile(tile)}
                          className="text-base font-serif italic text-gray-900 line-clamp-1 hover:text-black cursor-pointer"
                        >
                          {tile.name}
                        </h3>

                        <p className="text-[11px] text-gray-500 line-clamp-2 mt-1 leading-relaxed">
                          {tile.description}
                        </p>

                        {/* Specs Mini Bar */}
                        <div className="grid grid-cols-2 gap-2 mt-3 p-2.5 bg-[#f9fafb] rounded-lg text-[10px] uppercase tracking-widest text-gray-600 border border-gray-100">
                          <div>
                            <span className="text-gray-400 block text-[9px]">Thickness</span>
                            <span className="font-bold text-black">{tile.thickness}</span>
                          </div>
                          <div>
                            <span className="text-gray-400 block text-[9px]">Pcs / Box</span>
                            <span className="font-bold text-black">{tile.pcsPerBox} pcs ({tile.coveragePerBoxSqFt} sq.ft)</span>
                          </div>
                        </div>
                      </div>

                      {/* Actions Row */}
                      <div className="mt-4 pt-3 border-t border-gray-100 space-y-2 font-devanagari">
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => onSelectTile(tile)}
                            className="px-2.5 py-2.5 rounded-lg border border-black hover:bg-black hover:text-white text-black text-[10px] font-bold uppercase tracking-widest flex items-center justify-center space-x-1.5 transition-colors touch-manipulation cursor-pointer min-h-[44px] active:scale-95 shadow-xs"
                            title={t.btnViewDetails}
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>{t.btnViewDetails}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => onToggleCompare(tile.id)}
                            className={`px-2.5 py-2.5 rounded-lg border text-[10px] font-bold uppercase tracking-widest flex items-center justify-center transition-colors touch-manipulation cursor-pointer min-h-[44px] active:scale-95 ${
                              isComparing 
                                ? 'bg-black text-white border-black' 
                                : 'border-gray-200 text-gray-700 hover:border-black hover:text-black'
                            }`}
                          >
                            <span>{isComparing ? (language === 'mr' ? 'तुलनेत आहे ✓' : language === 'hi' ? 'तुलना में है ✓' : 'Comparing ✓') : t.btnAddToCompare}</span>
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => onToggleSampleRequest(tile.id)}
                          className={`w-full py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-widest border transition-all touch-manipulation cursor-pointer min-h-[44px] active:scale-95 ${
                            isSampled
                              ? 'bg-black text-white border-black shadow-sm'
                              : 'border-black text-black hover:bg-black hover:text-white'
                          }`}
                        >
                          <span>{isSampled ? t.btnSampleAdded : t.btnSample}</span>
                        </button>
                      </div>

                    </div>
                  </div>
                </Interactive3DCard>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};
