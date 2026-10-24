import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CatalogueItem } from '../types';
import { 
  BookOpen, 
  Download, 
  Eye, 
  Sparkles, 
  Layers, 
  FileText, 
  CheckCircle2,
  Bookmark,
  Share2,
  SlidersHorizontal,
  LayoutGrid,
  List,
  Compass
} from 'lucide-react';
import { Interactive3DCard } from './Interactive3DCard';
import { useLanguage } from '../context/LanguageContext';

interface CatalogueGridProps {
  catalogues: CatalogueItem[];
  onOpenFlipbook: (catalogue: CatalogueItem) => void;
  onBrowseTiles: (catalogueId: string) => void;
  onBookmarkCatalogue: (catalogueId: string) => void;
  bookmarkedIds: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  searchQuery: string;
}

export const CatalogueGrid: React.FC<CatalogueGridProps> = ({
  catalogues,
  onOpenFlipbook,
  onBrowseTiles,
  onBookmarkCatalogue,
  bookmarkedIds,
  selectedCategory,
  setSelectedCategory,
  searchQuery
}) => {
  const { t, language, formatNumber } = useLanguage();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [downloadModalCatalogue, setDownloadModalCatalogue] = useState<CatalogueItem | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const categories = [
    'All Catalogues',
    'GVT Slabs',
    'Ceramic Wall',
    'Polished Vitrified',
    'Outdoor Paver',
    'Kitchen Concepts',
    'Sanitaryware'
  ];

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'All Catalogues': return language === 'mr' ? 'सर्व कॅटलॉग' : language === 'hi' ? 'सभी कैटलॉग' : 'All Catalogues';
      case 'GVT Slabs': return language === 'mr' ? 'जीव्हीटी स्लॅब्स' : language === 'hi' ? 'जीएमटी स्लैब्स' : 'GVT Slabs';
      case 'Ceramic Wall': return language === 'mr' ? 'सिरेमिक वॉल' : language === 'hi' ? 'सिरेमिक वॉल' : 'Ceramic Wall';
      case 'Polished Vitrified': return language === 'mr' ? 'पॉलिश्ड व्हिट्रिफाइड' : language === 'hi' ? 'पॉलिश विट्रिफाइड' : 'Polished Vitrified';
      case 'Outdoor Paver': return language === 'mr' ? 'आउटडोअर पेव्हर' : language === 'hi' ? 'आउटडोर पेवर' : 'Outdoor Paver';
      case 'Kitchen Concepts': return language === 'mr' ? 'किचन कन्सेप्ट्स' : language === 'hi' ? 'किचन कॉन्सेप्ट्स' : 'Kitchen Concepts';
      case 'Sanitaryware': return language === 'mr' ? 'सॅनिटरीवेअर' : language === 'hi' ? 'सैनिटरीवेयर' : 'Sanitaryware';
      default: return cat;
    }
  };

  const filteredCatalogues = catalogues.filter(cat => {
    const matchesCategory = selectedCategory === 'All Catalogues' || cat.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.dimensions.some(d => d.toLowerCase().includes(searchQuery.toLowerCase())) ||
      cat.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const handleSimulateDownload = (cat: CatalogueItem) => {
    setDownloadModalCatalogue(cat);
    setDownloading(true);
    setDownloadSuccess(false);

    setTimeout(() => {
      setDownloading(false);
      setDownloadSuccess(true);
    }, 1500);
  };

  return (
    <section className="py-12 bg-[#fafbfc] min-h-[600px] border-b border-gray-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-10">
        
        {/* Category Header & Filters with 3D Depth */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center space-x-2 text-[10px] font-extrabold uppercase tracking-widest text-amber-600 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? 'आर्किटेक्चरल कलेक्शन • २०२६ आवृत्ती' : language === 'hi' ? 'आर्किटेक्चरल कलेक्शन • 2026 संस्करण' : 'Architectural Collection • 2026 Edition'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-950 font-devanagari">
              {t.cataloguesTitle}
            </h2>
            <p className="text-gray-500 text-xs leading-relaxed uppercase tracking-widest mt-0.5 font-devanagari">
              {t.cataloguesSubtitle}
            </p>
          </div>

          <div className="flex items-center space-x-3">
            {/* Grid / List View Toggle */}
            <div className="border border-gray-300 bg-white rounded-lg p-0.5 flex items-center space-x-1 shadow-xs">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 text-xs rounded transition-colors ${
                  viewMode === 'grid' ? 'bg-black text-white font-bold' : 'text-gray-500 hover:text-black'
                }`}
                title={t.viewGrid}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 text-xs rounded transition-colors ${
                  viewMode === 'list' ? 'bg-black text-white font-bold' : 'text-gray-500 hover:text-black'
                }`}
                title={t.viewList}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills Bar with 3D Press Effects */}
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-4 mb-8 border-b border-gray-200">
          {categories.map((cat) => {
            const count = cat === 'All Catalogues' 
              ? catalogues.length 
              : catalogues.filter(c => c.category === cat).length;

            const isSelected = selectedCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wider transition-all whitespace-nowrap border shadow-xs font-devanagari ${
                  isSelected
                    ? 'bg-black text-white border-black shadow-md -translate-y-0.5'
                    : 'border-gray-200 text-gray-600 hover:border-black hover:text-black bg-white'
                }`}
              >
                <span>{getCategoryLabel(cat)}</span>
                <span className={`ml-2 text-[9px] px-1.5 py-0.5 rounded-full ${
                  isSelected ? 'bg-amber-400 text-black font-bold' : 'bg-gray-100 text-gray-500 font-mono'
                }`}>
                  {formatNumber(count)}
                </span>
              </button>
            );
          })}
        </div>

        {/* Catalogues Display */}
        {filteredCatalogues.length === 0 ? (
          <div className="bg-white p-12 text-center border border-gray-200 rounded-xl my-8 shadow-sm font-devanagari">
            <BookOpen className="w-10 h-10 text-gray-400 mx-auto mb-3" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-800">
              {language === 'mr' ? 'कोणताही कॅटलॉग सापडला नाही' : language === 'hi' ? 'कोई कैटलॉग नहीं मिला' : 'No catalogues match your search'}
            </h3>
            <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">
              {language === 'mr' ? 'कृपया कॅटेगरी किंवा शोध शब्द बदलून पुन्हा प्रयत्न करा.' : language === 'hi' ? 'कृपया श्रेणी या खोज शब्द बदलकर पुनः प्रयास करें।' : 'Try resetting category or search criteria.'}
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All Catalogues');
              }}
              className="mt-4 px-4 py-2 bg-black text-white text-[10px] font-bold uppercase tracking-widest rounded hover:bg-gray-800 cursor-pointer font-devanagari"
            >
              {language === 'mr' ? 'फिल्टर्स पूर्ववत करा' : language === 'hi' ? 'फ़िल्टर रीसेट करें' : 'Reset Filters'}
            </button>
          </div>
        ) : (
          <div className={
            viewMode === 'grid'
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              : "space-y-4"
          }>
            {filteredCatalogues.map((cat, index) => {
              const isBookmarked = bookmarkedIds.includes(cat.id);

              if (viewMode === 'list') {
                return (
                  <motion.div 
                    key={cat.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1], delay: (index % 6) * 0.05 }}
                    whileHover={{ y: -2 }}
                    className="bg-white border border-gray-200/90 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 hover:border-black transition-all shadow-xs hover:shadow-md"
                  >
                    <div className="flex items-center space-x-4 w-full sm:w-auto">
                      <div className="w-16 h-24 bg-gray-200 overflow-hidden shrink-0 rounded-lg border border-gray-200 relative shadow-sm">
                        <img
                          src={cat.coverImage}
                          alt={cat.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block font-mono">{cat.code || `MTL-26-${cat.id}`}</span>
                        <h3 className="text-base font-serif italic text-gray-900 mt-0.5">{cat.title}</h3>
                        <p className="text-xs text-gray-500 uppercase tracking-widest">{cat.subtitle}</p>
                        <div className="flex items-center space-x-3 mt-2 text-[10px] text-gray-400 uppercase tracking-widest font-mono">
                          <span>{formatNumber(cat.pages)} {language === 'mr' ? 'पृष्ठे' : language === 'hi' ? 'पृष्ठ' : 'Pages'}</span>
                          <span>•</span>
                          <span>{formatNumber(cat.tileCount)} {language === 'mr' ? 'डिझाइन्स' : language === 'hi' ? 'डिजाइन' : 'Designs'}</span>
                          <span>•</span>
                          <span>{cat.fileSize}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 w-full sm:w-auto justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100">
                      <button
                        onClick={() => onOpenFlipbook(cat)}
                        className="px-4 py-2 bg-black text-white text-[10px] uppercase font-bold tracking-widest rounded hover:bg-gray-800 shadow-xs cursor-pointer font-devanagari"
                      >
                        {language === 'mr' ? 'ई-फ्लिपबुक' : language === 'hi' ? 'ई-फ्लिपबुक' : 'Flipbook'}
                      </button>
                      <button
                        onClick={() => handleSimulateDownload(cat)}
                        className="px-4 py-2 border border-gray-300 text-[10px] uppercase font-bold tracking-widest rounded hover:border-black hover:bg-black hover:text-white transition-colors cursor-pointer"
                      >
                        PDF
                      </button>
                    </div>
                  </motion.div>
                );
              }

              return (
                <Interactive3DCard 
                  key={cat.id} 
                  maxTilt={8} 
                  glareEffect={true} 
                  className="rounded-xl overflow-hidden"
                >
                  <div className="bg-white border border-gray-200/90 rounded-xl p-3.5 flex flex-col justify-between h-full shadow-xs hover:shadow-xl transition-shadow">
                    
                    {/* Aspect 3/4 Card Image Box with 3D Depth */}
                    <div 
                      onClick={() => onOpenFlipbook(cat)}
                      className="aspect-[3/4] bg-neutral-900 rounded-lg relative overflow-hidden flex items-center justify-center p-3 group cursor-pointer border border-gray-200 shadow-inner"
                    >
                      <img
                        src={cat.coverImage}
                        alt={cat.title}
                        referrerPolicy="no-referrer"
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      
                      {/* Contrast Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Inner Content Layer */}
                      <div className="w-full h-full flex flex-col justify-between p-2 relative z-10">
                        <div className="flex items-center justify-between">
                          <span className="bg-black/80 backdrop-blur-sm text-white text-[9px] uppercase font-extrabold tracking-widest px-2 py-0.5 rounded border border-white/20 font-devanagari">
                            {getCategoryLabel(cat.category)}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onBookmarkCatalogue(cat.id);
                            }}
                            className={`p-1.5 rounded-full bg-black/40 backdrop-blur-sm cursor-pointer ${isBookmarked ? 'text-amber-400' : 'text-white/80 hover:text-white'}`}
                            title={isBookmarked ? t.bookmarked : t.bookmark}
                          >
                            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
                          </button>
                        </div>

                        <div>
                          <p className="text-white font-serif text-lg leading-tight drop-shadow-md">
                            {cat.title}
                          </p>
                          <p className="text-[10px] uppercase font-sans tracking-widest text-gray-300 mt-1 font-medium">
                            {cat.subtitle}
                          </p>
                          <div className="mt-2 flex items-center space-x-2 text-[9px] font-mono text-amber-300">
                            <span>{formatNumber(cat.pages)} {language === 'mr' ? 'पृष्ठे' : language === 'hi' ? 'पृष्ठ' : 'Pgs'}</span>
                            <span>•</span>
                            <span>{formatNumber(cat.tileCount)} {language === 'mr' ? 'डिझाइन्स' : language === 'hi' ? 'डिजाइन' : 'Designs'}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card Bottom Specs & Actions */}
                    <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-tight text-gray-400 font-mono">
                        {cat.code || `MTL-26-0${cat.id}`}
                      </span>
                      <div className="flex items-center space-x-1.5">
                        <button
                          onClick={() => onOpenFlipbook(cat)}
                          className="px-3 py-1.5 bg-black text-white text-[10px] uppercase font-extrabold tracking-wider rounded hover:bg-gray-800 transition-colors shadow-xs cursor-pointer font-devanagari"
                        >
                          {language === 'mr' ? 'वाचा' : language === 'hi' ? 'पढ़ें' : 'Read'}
                        </button>
                        <button
                          onClick={() => handleSimulateDownload(cat)}
                          className="p-1.5 border border-gray-300 text-black rounded hover:border-black hover:bg-black hover:text-white transition-colors cursor-pointer"
                          title={t.flipbookDownload}
                        >
                          <Download className="w-3.5 h-3.5" />
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

      {/* Download Progress Modal */}
      {downloadModalCatalogue && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full p-6 border border-gray-300 rounded-2xl shadow-2xl text-center space-y-4 font-devanagari">
            {downloading ? (
              <div className="py-6 space-y-4">
                <div className="w-12 h-12 border-3 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto" />
                <h3 className="text-base font-serif italic text-black">
                  {language === 'mr' ? 'हाय-रिझोल्युशन पीडीएफ तयार होत आहे...' : language === 'hi' ? 'हाई-रिज़ॉल्यूशन पीडीएफ तैयार हो रहा है...' : 'Preparing High-Res PDF...'}
                </h3>
                <p className="text-xs text-gray-500 uppercase tracking-widest">{downloadModalCatalogue.title}</p>
              </div>
            ) : downloadSuccess ? (
              <div className="py-6 space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-base font-serif italic text-black">
                  {language === 'mr' ? 'पीडीएफ सेव्हसाठी सज्ज आहे' : language === 'hi' ? 'पीडीएफ सहेजने के लिए तैयार है' : 'PDF Ready for Save'}
                </h3>
                <p className="text-xs text-gray-500 uppercase tracking-widest">
                  {downloadModalCatalogue.title} ({downloadModalCatalogue.fileSize})
                </p>
                <div className="pt-2 flex space-x-3">
                  <button
                    onClick={() => {
                      setDownloadModalCatalogue(null);
                      onOpenFlipbook(downloadModalCatalogue);
                    }}
                    className="flex-1 py-2.5 bg-black text-white text-[10px] uppercase font-bold tracking-widest rounded-lg cursor-pointer"
                  >
                    {t.btnOpenFlipbook}
                  </button>
                  <button
                    onClick={() => setDownloadModalCatalogue(null)}
                    className="px-4 py-2.5 border border-gray-300 text-[10px] uppercase font-bold tracking-widest rounded-lg hover:border-black cursor-pointer"
                  >
                    {t.close}
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}

    </section>
  );
};
