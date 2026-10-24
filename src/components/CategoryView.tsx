import React, { useState } from 'react';
import { 
  Sparkles, 
  Layers, 
  ShieldCheck, 
  ArrowRight, 
  Eye, 
  SlidersHorizontal,
  Compass,
  CheckCircle2,
  Building2,
  PhoneCall,
  BookOpen
} from 'lucide-react';
import { TileProduct } from '../types';
import { Interactive3DCard } from './Interactive3DCard';
import { useLanguage } from '../context/LanguageContext';

export interface CategoryInfo {
  id: string;
  name: string;
  queryKey: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  accentColor: string;
  keyFormats: string[];
  recommendedFinish: string;
  wearRating: string;
  idealApplications: string[];
  buyingTips: string[];
}

export const CATEGORY_DEFINITIONS: Record<string, CategoryInfo> = {
  floor: {
    id: 'floor',
    name: 'Floor Tiles',
    queryKey: 'floor',
    eyebrow: 'ARCHITECTURAL FLOORING',
    title: 'Precision Engineered Floor Tiles & Mega Slabs',
    subtitle: 'High breaking strength, scratch resistance, and seamless mirror reflections for high-traffic modern spaces.',
    description: 'Explore grand 800x1600mm and 1200x2400mm vitrified slabs alongside anti-skid porcelain planks designed for continuous living room, bedroom, and commercial floor layouts.',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80',
    accentColor: '#6EA8FE', // Soft Azure
    keyFormats: ['1200x2400mm', '800x1600mm', '600x1200mm', '600x600mm'],
    recommendedFinish: 'High Gloss / Silk Matt',
    wearRating: 'PEI Class IV & V',
    idealApplications: ['Living Rooms', 'Master Bedrooms', 'Corridors', 'Boutique Showrooms'],
    buyingTips: [
      'Choose 800x1600mm or 1200x2400mm to minimize grout lines and create open visual expanse',
      'For bedrooms and senior spaces, silk matt or carving finishes offer superior foot grip',
      'Always order 10% extra for diagonal cutting and waste buffer during installation'
    ]
  },
  wall: {
    id: 'wall',
    name: 'Wall Tiles',
    queryKey: 'wall',
    eyebrow: 'ELEVATION & WALL CONCEPTS',
    title: 'Tactile 3D Relief & Designer Ceramic Wall Tiles',
    subtitle: 'Fluted textures, satin glazes, and bookmatch feature walls that transform vertical surfaces into art.',
    description: 'From 300x600mm hydro-resistant ceramic wall tiles with brass fluted highlighters to monolithic exterior stone facades that withstand monsoons.',
    heroImage: '/src/assets/images/amol_catalog_cover_wall_1784971081615.jpg',
    accentColor: '#A78BFA', // Lavender
    keyFormats: ['300x600mm', '300x900mm', '600x1200mm', '800x1600mm'],
    recommendedFinish: 'Glossy / Satin Fluted / Relief',
    wearRating: 'Zero Moisture Retention',
    idealApplications: ['Bathroom Walls', 'Kitchen Backsplashes', 'TV Feature Walls', 'Front Elevation'],
    buyingTips: [
      'Pair light plain field tiles with one fluted highlighter wall for a harmonious spa aesthetic',
      'High-gloss surfaces bounce natural light into compact bathrooms and powder rooms',
      'Use epoxy grout in shower wet zones to prevent discoloration and soap staining'
    ]
  },
  bathroom: {
    id: 'bathroom',
    name: 'Bathroom Tiles',
    queryKey: 'bathroom',
    eyebrow: 'BATHROOM SANCTUARY',
    title: 'Water-Resistant Sanctuary Tiles & Anti-Skid Concepts',
    subtitle: 'Curated pairings of non-slip floor tiles, fluted shower highlighters, and designer sanitaryware.',
    description: 'Transform daily routines into serene rituals. Explore our coordinated bathroom series combining R10/R11 anti-skid floor tiles with zero-porosity wall tiles and precision vanity backdrops.',
    heroImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1400&q=80',
    accentColor: '#86D7C4', // Mint
    keyFormats: ['300x600mm (Wall)', '600x600mm (Floor)', '300x300mm (Anti-Skid)'],
    recommendedFinish: 'Matt Anti-Skid (Floor) + Gloss/Fluted (Wall)',
    wearRating: 'R10/R11 Slip Resistance',
    idealApplications: ['Master Bathrooms', 'Powder Rooms', 'Shower Enclosures', 'Vanity Accents'],
    buyingTips: [
      'Prioritize anti-skid floor tiles to prevent slips when soapy or wet',
      'Consider large 600x1200mm wall slabs in showers to eliminate mildew-prone grout joints',
      'Match tile undertones with sanitaryware fixtures (Marbito, Warmora, Wellnato, Squad)'
    ]
  },
  kitchen: {
    id: 'kitchen',
    name: 'Kitchen Tiles',
    queryKey: 'kitchen',
    eyebrow: 'GOURMET KITCHEN & DINING',
    title: 'Stain-Resistant Countertop Slabs & Splashbacks',
    subtitle: 'Heat-proof porcelain countertops and easy-wipe ceramic backsplashes for modern culinary spaces.',
    description: 'Seamless 800x2400mm and 1200x2400mm porcelain slabs resistant to hot utensils, knife cuts, turmeric stains, and lemon acid. Complemented by artisanal subway backsplashes.',
    heroImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1400&q=80',
    accentColor: '#F6C7A8', // Champagne Peach
    keyFormats: ['800x2400mm', '1200x2400mm', '300x600mm', '75x300mm (Subway)'],
    recommendedFinish: 'Silk Matt Countertop + Gloss Backsplash',
    wearRating: 'MOHS Hardness 7+',
    idealApplications: ['Cooking Countertops', 'Kitchen Islands', 'Backsplashes', 'Dining Table Tops'],
    buyingTips: [
      'Porcelain slabs can withstand hot pots up to 800°C without burning or scorching',
      'Non-porous food-grade surfaces prevent bacterial growth and odor absorption',
      'Pair with Jindal and Eureka stainless steel sinks for flush undermount installation'
    ]
  },
  living: {
    id: 'living',
    name: 'Living Room Tiles',
    queryKey: 'living room',
    eyebrow: 'GRAND LIVING ROOM',
    title: 'Continuous Vein Statuario & Royal Onyx Slabs',
    subtitle: 'Extraordinary bookmatch symmetry and high-gloss vitrified grandeur for modern halls.',
    description: 'Create an expansive atmosphere with Italian marble looks, Statuario continuous veins, and crystal mirror surfaces that reflect natural sunlight across the entire residence.',
    heroImage: '/src/assets/images/black_marble_living_room_1786558171845.jpg',
    accentColor: '#6EA8FE', // Soft Azure
    keyFormats: ['800x1600mm', '1200x2400mm', '600x1200mm'],
    recommendedFinish: 'High Gloss Crystal / Carving Bookmatch',
    wearRating: 'Class IV Wear Resistant',
    idealApplications: ['Main Living Hall', 'Foyer Entrance', 'Dining Space', 'TV Feature Wall'],
    buyingTips: [
      'Bookmatch slabs create an open butterfly-pattern centerpiece in living halls',
      'High-gloss vitrified tiles brighten rooms with limited natural window exposure',
      'Keep grout lines to 1mm using tile levelers for a monolithic marble slab appearance'
    ]
  },
  outdoor: {
    id: 'outdoor',
    name: 'Outdoor Tiles',
    queryKey: 'outdoor',
    eyebrow: 'EXTERIOR & LANDSCAPING',
    title: 'Weatherproof Stone Facades & Exterior Pavers',
    subtitle: 'Monsoon-proof split-face stone cladding and thermal-resistant veranda surfaces.',
    description: 'Engineered to withstand harsh ultraviolet sun rays, intense seasonal monsoons, and thermal temperature fluctuations without cracking, fading, or peeling.',
    heroImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80',
    accentColor: '#E8B4C8', // Dusty Rose
    keyFormats: ['600x600x16mm', '300x600mm', '400x400mm'],
    recommendedFinish: 'Rustic Anti-Skid / Split Face Stone',
    wearRating: 'Weatherproof & UV Stable',
    idealApplications: ['Villa Elevation Facades', 'Balconies & Verandas', 'Open Terraces', 'Pool Decks'],
    buyingTips: [
      'Ensure outdoor tiles have <0.5% water absorption to prevent moisture damage during monsoons',
      'Split-face exterior stone cladding conceals dust and requires virtually zero maintenance',
      'Use flexible outdoor tile adhesive formulated for extreme thermal expansion'
    ]
  },
  parking: {
    id: 'parking',
    name: 'Parking Tiles',
    queryKey: 'parking',
    eyebrow: 'HEAVY DUTY DRIVEWAY SERIES',
    title: '16mm Full-Body Heavy Load Parking Pavers',
    subtitle: 'Engineered for SUV axle loads, high tire friction, and extreme vehicular durability.',
    description: 'Constructed with dense porcelain bodies up to 16mm thick. Features deep anti-skid textures and high breaking load (>4000N) designed for car garages, driveways, and commercial plazas.',
    heroImage: '/src/assets/images/amol_catalog_cover_outdoor_1784971094848.jpg',
    accentColor: '#F6C7A8', // Champagne Peach
    keyFormats: ['600x600x16mm', '400x400x12mm', '300x300mm'],
    recommendedFinish: 'R11 Heavy Duty Anti-Skid / Punch Texture',
    wearRating: 'Wheel Load Certified (>4000N)',
    idealApplications: ['Car Porches & Driveways', 'Commercial Parking Lots', 'Basement Ramps', 'Warehouse Loading Bays'],
    buyingTips: [
      '16mm thickness provides double the load-bearing strength of standard 8mm tiles',
      'R11 textured surfaces maintain tire traction even during heavy rainfall',
      'Lay on a compacted cement mortar bed with full adhesive coverage to eliminate air voids'
    ]
  },
  ceramic: {
    id: 'ceramic',
    name: 'Ceramic Tiles',
    queryKey: 'ceramic',
    eyebrow: 'HANDCRAFTED & GLAZED CERAMIC',
    title: 'Artisanal Ceramic Wall Highlighters & Backsplashes',
    subtitle: 'Rich colorful glazes, organic reliefs, and cost-effective wall beauty.',
    description: 'Explore lightweight glazed ceramic wall tiles that bring artisan charm to bathroom vanity backdrops, kitchen splash areas, and interior feature alcoves.',
    heroImage: '/src/assets/images/amol_catalog_cover_wall_1784971081615.jpg',
    accentColor: '#A78BFA', // Lavender
    keyFormats: ['300x600mm', '300x900mm', '300x300mm'],
    recommendedFinish: 'Glossy / Satin / Embossed Ceramic',
    wearRating: 'Wall Grade Glazed Ceramic',
    idealApplications: ['Bathroom Walls', 'Kitchen Backsplashes', 'Pooja Room Niches', 'Commercial Restrooms'],
    buyingTips: [
      'Ceramic tiles are lightweight, making them effortless to install on drywall or brick partitions',
      'Vibrant glazes offer superior color saturation compared to unglazed surfaces',
      'Budget-friendly pricing makes them ideal for full-height bathroom wall cladding'
    ]
  },
  vitrified: {
    id: 'vitrified',
    name: 'Vitrified Tiles',
    queryKey: 'vitrified',
    eyebrow: 'GLAZED & POLISHED VITRIFIED',
    title: 'GVT, PVT & Double Charge Vitrified Flooring',
    subtitle: 'Near-zero water absorption (<0.05%), mirror reflectance, and unyielding durability.',
    description: 'Manufactured by fusing silica and clay under extreme hydraulic pressure and firing above 1200°C. Delivers glass-like vitrification with supreme compressive strength.',
    heroImage: '/src/assets/images/regenerated_image_1787246045342.png',
    accentColor: '#6EA8FE', // Soft Azure
    keyFormats: ['800x1600mm', '1200x2400mm', '600x1200mm', '600x600mm'],
    recommendedFinish: 'High Gloss GVT / Double Charge Polished',
    wearRating: 'Water Absorption <0.05% (Impermeable)',
    idealApplications: ['Living Rooms & Bedrooms', 'Showroom Floors', 'Commercial Complexes', 'Hospitals'],
    buyingTips: [
      'GVT (Glazed Vitrified Tiles) offers limitless high-definition digital marble and stone designs',
      'Double Charge vitrified tiles have a 3-4mm wear layer ideal for heavy commercial foot traffic',
      'Nano-coating prevents stubborn stains from tea, coffee, and shoe scuffs'
    ]
  }
};

interface CategoryViewProps {
  categoryKey: string;
  tiles: TileProduct[];
  onSelectTile: (tile: TileProduct) => void;
  onToggleCompare: (tileId: string) => void;
  compareTileIds: string[];
  onToggleSampleRequest: (tileId: string) => void;
  sampleTileIds: string[];
  onOpenAllTiles: (filter?: string) => void;
  onOpenCatalogues: () => void;
  onOpenExperienceCenter: () => void;
}

export const CategoryView: React.FC<CategoryViewProps> = ({
  categoryKey,
  tiles,
  onSelectTile,
  onToggleCompare,
  compareTileIds,
  onToggleSampleRequest,
  sampleTileIds,
  onOpenAllTiles,
  onOpenCatalogues,
  onOpenExperienceCenter
}) => {
  const { t, language, formatNumber } = useLanguage();
  const categoryInfo = CATEGORY_DEFINITIONS[categoryKey] || CATEGORY_DEFINITIONS.floor;
  const [selectedFormat, setSelectedFormat] = useState('All Sizes');

  const getCategoryDisplayName = (id: string, fallbackName: string) => {
    switch (id) {
      case 'floor': return t.navFloorTiles;
      case 'wall': return t.navWallTiles;
      case 'bathroom': return t.navBathroomTiles;
      case 'kitchen': return t.navKitchenTiles;
      case 'living': return language === 'mr' ? 'दिवाणखाना टाईल्स' : language === 'hi' ? 'ड्राइंग रूम टाइल्स' : fallbackName;
      case 'outdoor': return t.navOutdoorTiles;
      case 'commercial': return t.navCommercialSlabs;
      case 'vitrified': return language === 'mr' ? 'व्हिट्रिफाइड टाईल्स' : language === 'hi' ? 'विट्रिफाइड टाइल्स' : fallbackName;
      case 'ceramic': return language === 'mr' ? 'सिरेमिक टाईल्स' : language === 'hi' ? 'सिरेमिक टाइल्स' : fallbackName;
      default: return fallbackName;
    }
  };

  // Filter matching tiles
  const matchingTiles = tiles.filter((tile) => {
    const q = categoryInfo.queryKey.toLowerCase();
    const matchCategory = 
      tile.category.toLowerCase().includes(q) ||
      tile.application.some(a => a.toLowerCase().includes(q)) ||
      tile.description.toLowerCase().includes(q) ||
      (q === 'parking' && (tile.category.toLowerCase().includes('paver') || tile.application.some(a => a.toLowerCase().includes('outdoor')))) ||
      (q === 'living room' && (tile.description.toLowerCase().includes('living') || tile.description.toLowerCase().includes('drawing') || tile.application.some(a => a.toLowerCase().includes('floor')))) ||
      (q === 'vitrified' && (tile.category.toLowerCase().includes('vitrified') || tile.category.toLowerCase().includes('gvt') || tile.description.toLowerCase().includes('vitrified'))) ||
      (q === 'ceramic' && (tile.category.toLowerCase().includes('ceramic') || tile.description.toLowerCase().includes('ceramic')));

    const matchFormat = selectedFormat === 'All Sizes' || tile.size === selectedFormat;

    return matchCategory && matchFormat;
  });

  const catName = getCategoryDisplayName(categoryKey, categoryInfo.name);

  return (
    <div className="bg-[#FAF9F6] text-[#263238] min-h-screen font-devanagari">
      
      {/* Category Hero Section with Soft Pastel Gradient & Architectural Presence */}
      <section className="relative overflow-hidden pt-12 pb-16 px-4 sm:px-10 border-b border-slate-200/60 bg-gradient-to-b from-[#FAF9F6] via-white to-[#F1F5F9]/60">
        
        {/* Soft Ambient Color Glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div 
            className="absolute -top-20 right-10 w-96 h-96 rounded-full blur-3xl opacity-20"
            style={{ backgroundColor: categoryInfo.accentColor }}
          />
          <div className="absolute bottom-0 -left-10 w-80 h-80 rounded-full blur-3xl opacity-15 bg-[#6EA8FE]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Breadcrumb Path */}
          <nav className="flex items-center space-x-2 text-xs text-[#64748B] mb-5 font-medium">
            <span className="hover:text-[#263238] transition-colors cursor-pointer" onClick={() => onOpenExperienceCenter()}>{t.brandName}</span>
            <span>/</span>
            <span className="hover:text-[#263238] transition-colors cursor-pointer" onClick={() => onOpenAllTiles()}>{language === 'mr' ? 'कॅटेगरी' : language === 'hi' ? 'श्रेणियाँ' : 'Categories'}</span>
            <span>/</span>
            <span className="text-[#263238] font-bold">{catName}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              
              <div className="inline-flex items-center space-x-2 bg-white/90 backdrop-blur-md border border-slate-200 px-3.5 py-1 rounded-full shadow-2xs">
                <span 
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: categoryInfo.accentColor }}
                />
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#263238]">
                  {categoryInfo.eyebrow}
                </span>
                <span className="text-[10px] text-[#64748B]">{language === 'mr' ? 'आर्किटेक्चरल दर्जा' : language === 'hi' ? 'आर्किटेक्चरल मानक' : 'Architectural Standards'}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#263238] tracking-tight leading-[1.18] font-devanagari">
                {categoryInfo.title}
              </h1>

              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed max-w-xl font-devanagari">
                {categoryInfo.description}
              </p>

              {/* Key Architectural Specs Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 max-w-lg font-devanagari">
                <div className="p-3 bg-white/80 border border-slate-200 rounded-xl">
                  <span className="text-[9px] uppercase font-bold text-[#64748B] block">{t.filterFinish}</span>
                  <span className="text-xs font-bold text-[#263238] truncate block mt-0.5">{categoryInfo.recommendedFinish}</span>
                </div>
                <div className="p-3 bg-white/80 border border-slate-200 rounded-xl">
                  <span className="text-[9px] uppercase font-bold text-[#64748B] block">{t.wearRatingTitle}</span>
                  <span className="text-xs font-bold text-[#263238] truncate block mt-0.5">{categoryInfo.wearRating}</span>
                </div>
                <div className="p-3 bg-white/80 border border-slate-200 rounded-xl col-span-2 sm:col-span-1">
                  <span className="text-[9px] uppercase font-bold text-[#64748B] block">{t.filterSize}</span>
                  <span className="text-xs font-bold text-[#263238] truncate block mt-0.5">{categoryInfo.keyFormats[0]}</span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="pt-2 flex flex-wrap items-center gap-3 font-devanagari">
                <button
                  type="button"
                  onClick={() => onOpenAllTiles(categoryInfo.name)}
                  className="px-5 py-2.5 bg-[#263238] hover:bg-black text-white font-bold text-xs rounded-xl transition-colors flex items-center space-x-2 shadow-sm cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#6EA8FE]" />
                  <span>{language === 'mr' ? `सर्व ${catName} पहा` : language === 'hi' ? `सभी ${catName} देखें` : `Browse All ${catName}`}</span>
                </button>

                <button
                  type="button"
                  onClick={onOpenCatalogues}
                  className="px-4 py-2.5 bg-white border border-slate-200 hover:border-[#263238] text-[#263238] font-bold text-xs rounded-xl transition-colors shadow-2xs cursor-pointer flex items-center space-x-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#6EA8FE]" />
                  <span>{language === 'mr' ? 'ई-कॅटलॉग पहा →' : language === 'hi' ? 'ई-कैटलॉग देखें →' : 'View E-Catalogues →'}</span>
                </button>
              </div>

            </div>

            {/* Right Architectural Preview Card */}
            <div className="lg:col-span-5 flex justify-center">
              <Interactive3DCard maxTilt={6} glareEffect={true} className="w-full max-w-md rounded-2xl overflow-hidden shadow-xl">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 border border-white/60">
                  <img
                    src={categoryInfo.heroImage}
                    alt={categoryInfo.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#263238]/90 via-[#263238]/20 to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span 
                      className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-white/90 text-[#263238]"
                      style={{ borderLeftColor: categoryInfo.accentColor, borderLeftWidth: '3px' }}
                    >
                      {categoryInfo.name} Sanctuary
                    </span>
                    <p className="text-xs text-slate-200 mt-1 line-clamp-2">
                      {categoryInfo.subtitle}
                    </p>
                  </div>
                </div>
              </Interactive3DCard>
            </div>

          </div>

          {/* Format Filter Bar */}
          <div className="mt-10 pt-6 border-t border-slate-200/70 flex items-center space-x-2 overflow-x-auto no-scrollbar font-devanagari">
            <span className="text-xs font-bold uppercase tracking-widest text-[#64748B] mr-2 shrink-0">
              {language === 'mr' ? 'साईझ निवडा:' : language === 'hi' ? 'साइज चुनें:' : 'Format Filter:'}
            </span>
            {['All Sizes', ...categoryInfo.keyFormats].map((size) => {
              const isActive = selectedFormat === size;
              const sizeLabel = size === 'All Sizes'
                ? (language === 'mr' ? 'सर्व साईजेस' : language === 'hi' ? 'सभी साइज' : 'All Sizes')
                : size;
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedFormat(size)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer font-devanagari ${
                    isActive
                      ? 'bg-[#263238] text-white shadow-sm'
                      : 'bg-white text-[#64748B] hover:text-[#263238] border border-slate-200'
                  }`}
                >
                  {sizeLabel}
                </button>
              );
            })}
          </div>

        </div>
      </section>

      {/* Curated Tiles Grid for This Category */}
      <section className="py-12 px-4 sm:px-10 max-w-7xl mx-auto font-devanagari">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 font-devanagari">
          <div>
            <span className="text-xs font-bold text-[#6EA8FE] uppercase tracking-widest block mb-1">
              {language === 'mr' ? 'क्युरेटेड डिझाइन्स' : language === 'hi' ? 'क्यूरेटेड डिजाइन्स' : 'Curated Surfaces'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#263238] tracking-tight">
              {catName} ({formatNumber(matchingTiles.length)})
            </h2>
            <p className="text-xs text-[#64748B] mt-1">
              {language === 'mr' ? 'प्रत्येक डिझाईनमध्ये उच्च दर्जाचे रँडम फेसेस, अचूक जाडी व फिनिश तपशील.' : language === 'hi' ? 'प्रत्येक डिजाइन में उच्च गुणवत्ता वाले रैंडम फेसेस व सटीक मोटाई शामिल है।' : 'Every design includes high-resolution randomized face previews, technical thickness, and 3D room testing'}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onOpenAllTiles(categoryInfo.queryKey)}
            className="px-4 py-2 bg-white border border-slate-200 hover:border-[#263238] text-[#263238] font-bold text-xs rounded-lg transition-colors flex items-center space-x-1.5 shadow-2xs self-start sm:self-auto cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#6EA8FE]" />
            <span>{t.directoryTitle}</span>
          </button>
        </div>

        {matchingTiles.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center font-devanagari">
            <Layers className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-[#263238] uppercase tracking-wider">
              {language === 'mr' ? 'या साईझमध्ये टाईल्स सापडल्या नाहीत' : language === 'hi' ? 'इस साइज में टाइल्स नहीं मिलीं' : 'No tiles found in this format'}
            </h3>
            <p className="text-xs text-[#64748B] mt-1">
              {language === 'mr' ? 'कृपया साईझ बदलून पहा किंवा सर्व डिझाइन्स पहा.' : language === 'hi' ? 'कृपया साइज बदलकर देखें या सभी डिजाइन्स देखें।' : 'Try resetting the format filter or view all tiles.'}
            </p>
            <button
              onClick={() => setSelectedFormat('All Sizes')}
              className="mt-4 px-4 py-2 bg-[#263238] text-white text-xs font-bold rounded-lg cursor-pointer"
            >
              {language === 'mr' ? 'सर्व साईजेस पहा' : language === 'hi' ? 'सभी साइज देखें' : 'Reset Format Filter'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 font-devanagari">
            {matchingTiles.map((tile) => {
              const isComparing = compareTileIds.includes(tile.id);
              const isSampled = sampleTileIds.includes(tile.id);

              return (
                <Interactive3DCard
                  key={tile.id}
                  maxTilt={6}
                  glareEffect={true}
                  className="rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300"
                >
                  <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden flex flex-col h-full group hover:border-[#263238]/30 transition-all">
                    
                    {/* Tile Texture Image */}
                    <div 
                      className="aspect-square relative overflow-hidden bg-slate-100 cursor-pointer"
                      onClick={() => onSelectTile(tile)}
                    >
                      <img
                        src={tile.textureUrl}
                        alt={tile.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#263238]/70 via-transparent to-transparent" />
                      
                      {/* Size & Code Tags */}
                      <div className="absolute top-2.5 left-2.5 right-2.5 flex justify-between items-center text-[9px] font-bold">
                        <span className="bg-[#263238]/85 text-white px-2 py-0.5 rounded backdrop-blur-xs">
                          {tile.size}
                        </span>
                        <span className="bg-white/90 text-[#263238] px-2 py-0.5 rounded font-mono shadow-2xs">
                          {tile.code}
                        </span>
                      </div>

                      {/* Quick Inspect Cue */}
                      <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white text-[10px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                        <span>{language === 'mr' ? 'रँडम फेसेस पाहण्यासाठी क्लिक करा' : language === 'hi' ? 'रैंडम फेसेस देखने के लिए क्लिक करें' : 'Click to view random faces'}</span>
                        <Eye className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Tile Body Details */}
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex items-center space-x-1.5 text-[10px] uppercase font-bold text-[#6EA8FE] mb-0.5">
                          <span>{tile.finish}</span>
                          <span>•</span>
                          <span className="text-[#64748B]">{tile.look}</span>
                        </div>

                        <h3 
                          onClick={() => onSelectTile(tile)}
                          className="text-base font-bold text-[#263238] hover:text-[#6EA8FE] cursor-pointer truncate"
                        >
                          {tile.name}
                        </h3>

                        <p className="text-xs text-[#64748B] line-clamp-2 mt-1 leading-relaxed">
                          {tile.description}
                        </p>

                        {/* Specs row */}
                        <div className="grid grid-cols-2 gap-2 mt-3 p-2 rounded-lg bg-[#FAF9F6] border border-slate-200/60 text-[10px]">
                          <div>
                            <span className="text-[#64748B] block text-[9px] uppercase font-bold">{t.thickness}</span>
                            <span className="font-bold text-[#263238]">{tile.thickness}</span>
                          </div>
                          <div>
                            <span className="text-[#64748B] block text-[9px] uppercase font-bold">{t.coveragePerBox}</span>
                            <span className="font-bold text-[#263238]">{tile.coveragePerBoxSqFt} sq.ft</span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="pt-3 border-t border-slate-100 space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => onSelectTile(tile)}
                            className="py-2 px-2 bg-[#263238] hover:bg-black text-white text-[10px] font-bold uppercase tracking-wider rounded-lg flex items-center justify-center space-x-1 transition-colors cursor-pointer"
                          >
                            <Eye className="w-3 h-3 text-[#6EA8FE]" />
                            <span>{t.btnViewDetails}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => onToggleCompare(tile.id)}
                            className={`py-2 px-2 text-[10px] font-bold uppercase tracking-wider rounded-lg border transition-colors cursor-pointer ${
                              isComparing
                                ? 'bg-[#263238] text-white border-[#263238]'
                                : 'border-slate-200 text-[#263238] hover:border-[#263238]'
                            }`}
                          >
                            {isComparing ? (language === 'mr' ? 'तुलना सुरू ✓' : language === 'hi' ? 'तुलना जारी ✓' : 'Comparing ✓') : t.btnAddToCompare}
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => onToggleSampleRequest(tile.id)}
                          className={`w-full py-2 text-[10px] font-bold uppercase tracking-wider rounded-lg border transition-colors cursor-pointer ${
                            isSampled
                              ? 'bg-[#86D7C4] text-[#263238] border-[#86D7C4]'
                              : 'border-slate-200 text-[#263238] hover:bg-slate-50'
                          }`}
                        >
                          {isSampled ? t.btnSampleAdded : t.btnSample}
                        </button>
                      </div>

                    </div>

                  </div>
                </Interactive3DCard>
              );
            })}
          </div>
        )}

      </section>

      {/* Buyer's Guide & Showroom Invitation Section */}
      <section className="py-12 px-4 sm:px-10 max-w-7xl mx-auto border-t border-slate-200/60 font-devanagari">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#6EA8FE] block mb-1">
                {language === 'mr' ? 'तज्ज्ञ मार्गदर्शक' : language === 'hi' ? 'विशेषज्ञ मार्गदर्शन' : 'Expert Guidelines'}
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#263238] tracking-tight">
                {language === 'mr' ? `${catName} खरेदीसाठी तज्ज्ञ सल्ला` : language === 'hi' ? `${catName} खरीद के लिए विशेषज्ञ सुझाव` : `Architect's Buying Tips for ${catName}`}
              </h3>
              <ul className="mt-4 space-y-2.5 text-xs text-[#64748B]">
                {categoryInfo.buyingTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-[#86D7C4] mr-2 shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 bg-[#FAF9F6] rounded-xl border border-slate-200/80 space-y-3">
              <div className="flex items-center space-x-2">
                <Building2 className="w-5 h-5 text-[#6EA8FE]" />
                <h4 className="text-sm font-bold text-[#263238] uppercase tracking-wider">
                  {language === 'mr' ? 'जत शोरूमला प्रत्यक्ष भेट द्या' : language === 'hi' ? 'जत शोरूम में अनुभव करें' : 'Experience in Jath Showroom'}
                </h4>
              </div>
              <p className="text-xs text-[#64748B] leading-relaxed">
                {language === 'mr' ? 'अमोल टाईल्स, सातारा रोड जत येथे नैसर्गिक प्रकाशात टाईल्सचे रँडम फेसेस, फिनिश आणि ग्रॅनाइट स्लॅब्स प्रत्यक्ष अनुभवा.' : language === 'hi' ? 'अमोल टाइल्स, सातारा रोड जत में प्राकृतिक प्रकाश में टाइल्स के रैंडम फेसेस, फिनिश और ग्रेनाइट स्लैब्स का प्रत्यक्ष अनुभव करें।' : 'Touch raw textures, inspect random faces under natural sunlight, and consult our senior architectural tiling team at Amol Tiles, Satara Road Jath.'}
              </p>
              <div className="pt-2 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={onOpenExperienceCenter}
                  className="px-4 py-2 bg-[#263238] text-white text-xs font-bold rounded-lg hover:bg-black transition-colors cursor-pointer"
                >
                  {language === 'mr' ? 'शोरूम अपॉइंटमेंट बुक करा' : language === 'hi' ? 'शोरूम अपॉइंटमेंट बुक करें' : 'Book Showroom Visit'}
                </button>
                <a
                  href="tel:8421001308"
                  className="px-4 py-2 bg-white border border-slate-200 text-[#263238] text-xs font-bold rounded-lg hover:border-[#263238] transition-colors flex items-center space-x-1.5 cursor-pointer"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-[#6EA8FE]" />
                  <span>{language === 'mr' ? 'कॉल करा: ८४२१००१३०८' : language === 'hi' ? 'कॉल करें: 8421001308' : 'Call 8421001308'}</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
