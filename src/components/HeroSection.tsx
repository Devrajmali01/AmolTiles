import React from 'react';
import { 
  Download, 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  ArrowRight,
  ShieldCheck,
  Building2,
  PhoneCall,
  MessageSquare,
  Compass,
  ChevronDown,
  Eye
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { ThreeDHeroCanvas } from './ThreeDHeroCanvas';
import { Interactive3DCard } from './Interactive3DCard';

interface HeroSectionProps {
  onExploreCatalogues: () => void;
  onOpenFlipbook: () => void;
  onOpenVisitingCard?: () => void;
  onSelectNavCategory?: (category: string) => void;
  onSelectCategory: (category: string) => void;
  selectedCategory: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreCatalogues,
  onOpenFlipbook,
  onOpenVisitingCard,
  onSelectNavCategory,
  onSelectCategory,
  selectedCategory
}) => {
  const { t, language } = useLanguage();

  return (
    <div className="relative bg-gradient-to-b from-[#fcfcfd] via-white to-[#f8f9fc] text-black border-b border-gray-100 overflow-hidden py-8 sm:py-12 px-4 sm:px-10">
      
      {/* Background 3D Depth Layer & Ambient Lights */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Soft Golden/Amber Ambient Glow */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-amber-200/25 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-32 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl" />
        
        {/* Subtle Architectural Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Hero Content & Controls */}
          <div className="lg:col-span-6 space-y-5">
            
            {/* 3D Floating Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/90 backdrop-blur-md border border-gray-200/80 px-3.5 py-1.5 rounded-full shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <p className="text-[10px] uppercase font-extrabold tracking-widest text-gray-800 font-devanagari">
                {t.heroBadge}
              </p>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-950 tracking-tight leading-[1.15] font-devanagari">
              {t.heroTitle}
            </h1>

            {/* Subtitle */}
            <p className="text-gray-700 text-xs sm:text-sm leading-relaxed uppercase tracking-wider max-w-xl font-semibold font-devanagari">
              {t.heroSubtitle}
            </p>

            {/* Quick Navigation Category Gateway */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-[#64748B] font-bold">
                <Compass className="w-3 h-3 text-[#6EA8FE]" />
                <span>{t.heroGatewayTitle}</span>
              </div>
              <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-wider font-bold">
                <button 
                  onClick={() => onSelectNavCategory ? onSelectNavCategory('floor') : onSelectCategory('GVT Slabs')}
                  className="bg-white hover:bg-[#FAF9F6] text-[#263238] border border-slate-200 px-3 py-1.5 rounded-md shadow-xs hover:border-[#6EA8FE] hover:text-[#6EA8FE] hover:-translate-y-0.5 transition-all cursor-pointer font-devanagari"
                >
                  {t.navFloorTiles}
                </button>
                <button 
                  onClick={() => onSelectNavCategory ? onSelectNavCategory('wall') : onSelectCategory('Ceramic Wall')}
                  className="bg-white hover:bg-[#FAF9F6] text-[#263238] border border-slate-200 px-3 py-1.5 rounded-md shadow-xs hover:border-[#A78BFA] hover:text-[#A78BFA] hover:-translate-y-0.5 transition-all cursor-pointer font-devanagari"
                >
                  {t.navWallTiles}
                </button>
                <button 
                  onClick={() => onSelectNavCategory ? onSelectNavCategory('bathroom') : onSelectCategory('Sanitaryware')}
                  className="bg-white hover:bg-[#FAF9F6] text-[#263238] border border-slate-200 px-3 py-1.5 rounded-md shadow-xs hover:border-[#86D7C4] hover:text-[#263238] hover:-translate-y-0.5 transition-all cursor-pointer font-devanagari"
                >
                  {t.navBathroomTiles}
                </button>
                <button 
                  onClick={() => onSelectNavCategory ? onSelectNavCategory('kitchen') : onSelectCategory('Kitchen Concepts')}
                  className="bg-white hover:bg-[#FAF9F6] text-[#263238] border border-slate-200 px-3 py-1.5 rounded-md shadow-xs hover:border-[#F6C7A8] hover:text-[#263238] hover:-translate-y-0.5 transition-all cursor-pointer font-devanagari"
                >
                  {t.navKitchenTiles}
                </button>
                <button 
                  onClick={() => onSelectNavCategory ? onSelectNavCategory('living') : onSelectCategory('GVT Slabs')}
                  className="bg-white hover:bg-[#FAF9F6] text-[#263238] border border-slate-200 px-3 py-1.5 rounded-md shadow-xs hover:border-[#6EA8FE] hover:text-[#6EA8FE] hover:-translate-y-0.5 transition-all cursor-pointer font-devanagari"
                >
                  {t.roomLiving}
                </button>
                <button 
                  onClick={() => onSelectNavCategory ? onSelectNavCategory('outdoor') : onSelectCategory('GVT Slabs')}
                  className="bg-white hover:bg-[#FAF9F6] text-[#263238] border border-slate-200 px-3 py-1.5 rounded-md shadow-xs hover:border-[#E8B4C8] hover:text-[#263238] hover:-translate-y-0.5 transition-all cursor-pointer font-devanagari"
                >
                  {t.navOutdoorTiles}
                </button>
              </div>
            </div>

            {/* 3D Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2 font-devanagari">
              <button
                onClick={onExploreCatalogues}
                className="px-6 py-3 bg-[#263238] hover:bg-[#1e293b] text-white text-xs uppercase font-extrabold tracking-widest rounded-lg shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center space-x-2 border border-[#263238] cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-[#6EA8FE]" />
                <span>{t.btnExploreCatalogues}</span>
              </button>

              <button
                onClick={onOpenFlipbook}
                className="px-5 py-3 bg-white text-[#263238] border border-slate-200 text-xs uppercase font-extrabold tracking-widest rounded-lg shadow-xs hover:border-[#263238] hover:shadow-sm hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center space-x-2 cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-[#F6C7A8]" />
                <span>{t.btnViewFlipbook}</span>
              </button>

              {onOpenVisitingCard && (
                <button
                  onClick={onOpenVisitingCard}
                  className="px-4 py-3 bg-[#FAF9F6] border border-slate-200 text-[#263238] text-xs uppercase font-bold tracking-widest rounded-lg hover:border-[#263238] hover:bg-white transition-all flex items-center space-x-1.5 cursor-pointer"
                >
                  <span>📇</span>
                  <span>{t.btnVisitingCard}</span>
                </button>
              )}
            </div>

            {/* Proprietor Direct Contact Cards with 3D Depth */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-gray-100 text-xs text-gray-800 font-bold font-devanagari">
              <div className="flex items-center justify-between bg-white border border-amber-200/90 p-3 rounded-xl shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center space-x-2.5">
                  <span className="w-2.5 h-2.5 bg-amber-500 rounded-full animate-pulse"></span>
                  <span className="font-extrabold text-slate-900">{t.propAjit}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <a 
                    href="tel:9822090345" 
                    className="text-black font-extrabold bg-amber-50/80 px-2.5 py-1 rounded-md border border-amber-300/70 hover:bg-black hover:text-white transition-all text-[11px]"
                  >
                    📞 9822090345
                  </a>
                </div>
              </div>

              <div className="flex items-center justify-between bg-white border border-emerald-200/90 p-3 rounded-xl shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center space-x-2.5">
                  <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
                  <span className="font-extrabold text-slate-900">{t.propNiraj}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <a 
                    href="tel:9822309345" 
                    className="text-black font-extrabold bg-emerald-50/80 px-2.5 py-1 rounded-md border border-emerald-300/70 hover:bg-black hover:text-white transition-all text-[11px]"
                  >
                    📞 9822309345
                  </a>
                  <a 
                    href="https://wa.me/919822309345" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-emerald-600 text-white p-1.5 rounded-md hover:bg-emerald-700 transition-all text-[11px] font-bold flex items-center"
                    title="Direct WhatsApp"
                  >
                    💬
                  </a>
                </div>
              </div>
            </div>

            {/* 3D Key Statistics Ribbon */}
            <div className="grid grid-cols-3 gap-2 pt-1 text-center font-devanagari">
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200/70 p-2.5 rounded-lg shadow-xs">
                <div className="text-base font-extrabold text-gray-950 font-mono">140+</div>
                <div className="text-[9px] uppercase tracking-wider text-gray-500 font-bold">{t.statGvtDesigns}</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200/70 p-2.5 rounded-lg shadow-xs">
                <div className="text-base font-extrabold text-gray-950 font-mono">100%</div>
                <div className="text-[9px] uppercase tracking-wider text-gray-500 font-bold">{t.statVitrifiedSlabs}</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200/70 p-2.5 rounded-lg shadow-xs">
                <div className="text-base font-extrabold text-gray-950 font-mono">25+ Yrs</div>
                <div className="text-[9px] uppercase tracking-wider text-gray-500 font-bold">{t.statJathDelivery}</div>
              </div>
            </div>

          </div>

          {/* Right Column: High-Impact 3D Slab Interactive Showcase & Spotlight */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Live 3D WebGL Canvas */}
            <ThreeDHeroCanvas 
              onOpenFlipbook={onOpenFlipbook}
            />

            {/* Spotlight Brochure Card with 3D Depth Tilt */}
            <Interactive3DCard maxTilt={6} glareEffect={true} className="rounded-xl overflow-hidden shadow-md">
              <div className="bg-white border border-gray-200/90 p-4 rounded-xl">
                <div className="flex items-center justify-between mb-2.5 text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                  <span className="text-black font-extrabold flex items-center space-x-1">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span>2026 Grand GVT Brochure</span>
                  </span>
                  <span className="font-mono text-gray-400">PDF 18.4 MB</span>
                </div>

                <div 
                  onClick={onOpenFlipbook}
                  className="relative aspect-[21/9] sm:aspect-[24/9] bg-neutral-900 rounded-lg overflow-hidden group cursor-pointer border border-gray-200"
                >
                  <img
                    src="/src/assets/images/regenerated_image_1787246045342.png"
                    alt="Amol Grand GVT Slabs"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-[center_30%] group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                  
                  <div className="absolute inset-0 p-4 flex flex-col justify-between text-white">
                    <span className="self-start text-[9px] uppercase font-bold tracking-widest bg-amber-400 text-black px-2 py-0.5 rounded">
                      Featured Catalogue
                    </span>

                    <div>
                      <h3 className="text-base font-serif italic text-white leading-tight">Amol Grand GVT Slabs</h3>
                      <p className="text-[10px] uppercase tracking-wider text-gray-300 font-medium">
                        800×1600mm & 1200×2400mm Slim Porcelain Slabs
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] uppercase tracking-widest font-bold text-gray-500 pt-2.5">
                  <span className="font-mono">36 Pages • 140 Designs</span>
                  <button
                    onClick={onOpenFlipbook}
                    className="text-black hover:text-amber-600 transition-colors flex items-center space-x-1 font-extrabold"
                  >
                    <span>Open 3D E-Flipbook</span>
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </button>
                </div>
              </div>
            </Interactive3DCard>

          </div>

        </div>

        {/* Floating Scroll Indicator */}
        <div className="mt-8 pt-4 flex flex-col items-center justify-center text-center">
          <button
            onClick={onExploreCatalogues}
            className="group flex flex-col items-center text-[10px] uppercase tracking-widest text-gray-600 hover:text-black transition-colors"
          >
            <span>Explore All Catalogues & Tile Finder</span>
            <ChevronDown className="w-4 h-4 mt-1 text-gray-500 group-hover:translate-y-1 transition-transform animate-bounce" />
          </button>
        </div>

      </div>
    </div>
  );
};
