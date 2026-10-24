import React, { useState, useRef } from 'react';
import { 
  BookOpen, 
  Search, 
  Layers, 
  Calculator, 
  Sparkles, 
  MapPin, 
  Package, 
  SlidersHorizontal,
  ChevronDown,
  PhoneCall,
  Download,
  Share2,
  CheckCircle2,
  Globe,
  Lock,
  User,
  MessageSquare,
  Building2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
  activeCategory?: string;
  setActiveCategory?: (cat: string) => void;
  sampleCount: number;
  openSampleDrawer: () => void;
  openDealerModal: () => void;
  openCompareModal: () => void;
  openVisitingCardModal: () => void;
  openAdminDashboard?: () => void;
  openAuthModal?: () => void;
  openContactModal?: () => void;
  currentUser?: any;
  onLogout?: () => void;
  compareCount: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  activeCategory = 'floor',
  setActiveCategory,
  sampleCount,
  openSampleDrawer,
  openDealerModal,
  openCompareModal,
  openVisitingCardModal,
  openAdminDashboard,
  openAuthModal,
  openContactModal,
  currentUser,
  onLogout,
  compareCount,
  searchQuery,
  setSearchQuery
}) => {
  const { language, setLanguage, t } = useLanguage();
  const [selectedRegion, setSelectedRegion] = useState('India (INR)');
  const navScrollRef = useRef<HTMLDivElement>(null);

  const scrollNav = (direction: 'left' | 'right') => {
    if (navScrollRef.current) {
      navScrollRef.current.scrollBy({
        left: direction === 'left' ? -280 : 280,
        behavior: 'smooth'
      });
    }
  };

  const getLangLabel = () => {
    if (language === 'mr') return 'मराठी';
    if (language === 'hi') return 'हिन्दी';
    return 'English';
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
      {/* Top Utility Bar */}
      <div className="bg-[#f9fafb] text-gray-600 text-[11px] py-2 px-3 sm:px-10 flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 uppercase tracking-widest font-medium">
        <div className="flex flex-wrap items-center space-x-3 sm:space-x-4">
          <span className="flex items-center text-black font-semibold">
            <Sparkles className="w-3.5 h-3.5 mr-1 text-black" />
            {t.authorizedDealer}
          </span>
          <span className="hidden lg:inline-flex items-center text-gray-700 font-mono">
            <PhoneCall className="w-3 h-3 mr-1 text-black" /> {t.callUs}
          </span>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Quick Contact Enquiry */}
          {openContactModal && (
            <button
              onClick={openContactModal}
              className="text-black font-bold flex items-center hover:underline cursor-pointer"
            >
              <MessageSquare className="w-3 h-3 mr-1 text-black" />
              <span>{t.enquiryBtn}</span>
            </button>
          )}

          <span className="text-gray-300">|</span>

          {/* Customer Sign In / Account */}
          {currentUser ? (
            <div className="flex items-center space-x-2">
              <span className="font-bold text-black flex items-center">
                <User className="w-3 h-3 mr-1 text-green-600" />
                <span className="max-w-[90px] truncate">{currentUser.name}</span>
              </span>
              {onLogout && (
                <button
                  onClick={onLogout}
                  className="text-gray-400 hover:text-black text-[10px] lowercase underline cursor-pointer"
                >
                  ({t.logout})
                </button>
              )}
            </div>
          ) : (
            openAuthModal && (
              <button
                onClick={openAuthModal}
                className="text-black font-bold flex items-center hover:underline cursor-pointer"
              >
                <User className="w-3 h-3 mr-1 text-black" />
                <span>{t.account}</span>
              </button>
            )
          )}

          <span className="text-gray-300">|</span>

          {/* Admin Management Dashboard */}
          {openAdminDashboard && (
            <button
              onClick={openAdminDashboard}
              className="bg-black text-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider flex items-center space-x-1 hover:bg-gray-800 transition-colors cursor-pointer"
              title="Amol Tiles Administrator Portal"
            >
              <Lock className="w-2.5 h-2.5 text-amber-400" />
              <span>{t.adminPortal}</span>
            </button>
          )}

          <span className="text-gray-300 hidden sm:inline">|</span>

          <button 
            onClick={openVisitingCardModal}
            className="text-black font-bold flex items-center hover:underline hidden sm:flex cursor-pointer"
          >
            📇 {t.visitingCard}
          </button>
          <span className="text-gray-300 hidden sm:inline">|</span>
          <button 
            onClick={() => setActiveTab('experienceCenter')}
            className="hover:text-black transition-colors flex items-center font-bold cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5 mr-1 text-black" />
            <span className="hidden sm:inline">{t.locateDealer}</span>
            <span className="sm:hidden">Jath</span>
          </button>
          <span className="text-gray-300">|</span>

          {/* Professional Language Switcher */}
          <div className="relative group" role="region" aria-label={t.selectLanguage}>
            <button 
              className="hover:text-black flex items-center font-bold text-black bg-amber-50 px-2.5 py-0.5 rounded border border-amber-300 cursor-pointer shadow-2xs"
              aria-haspopup="true"
              aria-label={`${t.selectLanguage}: ${getLangLabel()}`}
            >
              <Globe className="w-3 h-3 mr-1.5 text-amber-600" />
              <span className="font-extrabold tracking-normal font-devanagari">{getLangLabel()}</span>
              <ChevronDown className="w-3 h-3 ml-1 text-gray-600" />
            </button>
            <div className="absolute right-0 top-full mt-1 w-36 bg-black text-white py-1.5 shadow-2xl hidden group-hover:block z-50 text-[12px] rounded-lg border border-gray-800">
              <button 
                onClick={() => setLanguage('en')} 
                className={`flex items-center justify-between w-full text-left px-3 py-1.5 font-bold hover:bg-amber-400 hover:text-black transition-colors cursor-pointer ${language === 'en' ? 'text-amber-400 bg-gray-900 font-extrabold' : ''}`}
              >
                <span>English</span>
                {language === 'en' && <span className="text-amber-400 text-xs font-black">✓</span>}
              </button>
              <button 
                onClick={() => setLanguage('mr')} 
                className={`flex items-center justify-between w-full text-left px-3 py-1.5 font-bold hover:bg-amber-400 hover:text-black transition-colors cursor-pointer font-devanagari ${language === 'mr' ? 'text-amber-400 bg-gray-900 font-extrabold' : ''}`}
              >
                <span>मराठी</span>
                {language === 'mr' && <span className="text-amber-400 text-xs font-black">✓</span>}
              </button>
              <button 
                onClick={() => setLanguage('hi')} 
                className={`flex items-center justify-between w-full text-left px-3 py-1.5 font-bold hover:bg-amber-400 hover:text-black transition-colors cursor-pointer font-devanagari ${language === 'hi' ? 'text-amber-400 bg-gray-900 font-extrabold' : ''}`}
              >
                <span>हिन्दी</span>
                {language === 'hi' && <span className="text-amber-400 text-xs font-black">✓</span>}
              </button>
            </div>
          </div>

          <span className="text-gray-300 hidden md:inline">|</span>
          <div className="relative group hidden md:block">
            <button className="hover:text-black flex items-center font-bold">
              <span>{selectedRegion}</span>
              <ChevronDown className="w-3 h-3 ml-1" />
            </button>
            <div className="absolute right-0 top-full mt-1 w-36 bg-black text-white py-1 shadow-xl hidden group-hover:block z-50 text-[10px]">
              <button onClick={() => setSelectedRegion(t.regionIndia)} className="block w-full text-left px-3 py-1 hover:bg-gray-800">{t.regionIndia}</button>
              <button onClick={() => setSelectedRegion(t.regionGlobal)} className="block w-full text-left px-3 py-1 hover:bg-gray-800">{t.regionGlobal}</button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Branding & Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-10 py-4 flex flex-wrap items-center justify-between gap-4">
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('catalogues')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-10 h-10 bg-[#1a1a1a] flex items-center justify-center text-white font-bold text-lg">
            AT
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-black tracking-tighter text-[#1a1a1a]">
                {language === 'mr' ? 'अमोल टाईल्स, जत' : language === 'hi' ? 'अमोल टाइल्स, जत' : 'AMOL TILES, JATH'}
              </span>
            </div>
            <p className="text-[10px] text-gray-500 font-bold tracking-widest uppercase -mt-0.5">
              {language === 'mr' ? 'टाईल्स, ग्रॅनाइट्स, मार्बल, कडप्पा, सॅनिटरीवेअर व फिनोलेक्स प्लंबिंग' : language === 'hi' ? 'टाइल्स, ग्रेनाइट्स, मार्बल, कडप्पा, सैनिटरीवेयर व फिनोलेक्स पाइप्स' : 'Tiles, Granite, Marble, Kadappa, Sanitaryware & Plumbing'}
            </p>
          </div>
        </div>

        {/* Global Catalog Search Bar (Desktop) */}
        <div className="flex-1 max-w-md mx-2 relative hidden md:block">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                const val = e.target.value;
                if (val.trim().toLowerCase() === 'amoltiles4545') {
                  setSearchQuery('');
                  openAdminDashboard?.();
                  return;
                }
                setSearchQuery(val);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && searchQuery.trim().toLowerCase() === 'amoltiles4545') {
                  setSearchQuery('');
                  openAdminDashboard?.();
                }
              }}
              placeholder={t.searchPlaceholder}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-none text-xs text-black placeholder-gray-400 focus:outline-none focus:border-black transition-all font-devanagari"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-black font-bold"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Action Widgets (Compare & Sample Basket) */}
        <div className="flex items-center space-x-3">
          {/* Compare Button */}
          <button
            onClick={openCompareModal}
            className={`flex items-center space-x-1.5 px-3 py-2 border text-[10px] uppercase font-bold tracking-wider transition-colors ${
              compareCount > 0 
                ? 'bg-black text-white border-black' 
                : 'border-gray-300 text-gray-700 hover:border-black'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.compare}</span>
            {compareCount > 0 && (
              <span className="ml-1 bg-white text-black text-[9px] font-bold px-1.5 py-0.2">
                {compareCount}
              </span>
            )}
          </button>

          {/* Sample Box Request Basket */}
          <button
            onClick={openSampleDrawer}
            className="flex items-center space-x-2 px-4 py-2 bg-[#1a1a1a] hover:bg-black text-white text-[10px] font-bold uppercase tracking-widest border border-black transition-all"
          >
            <Package className="w-3.5 h-3.5" />
            <span>{t.sampleBasket}</span>
            {sampleCount > 0 && (
              <span className="bg-white text-black font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {sampleCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Search Bar & Instant Language Switcher Bar */}
      <div className="px-4 pb-2 md:hidden space-y-2">
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              const val = e.target.value;
              if (val.trim().toLowerCase() === 'amoltiles4545') {
                setSearchQuery('');
                openAdminDashboard?.();
                return;
              }
              setSearchQuery(val);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && searchQuery.trim().toLowerCase() === 'amoltiles4545') {
                setSearchQuery('');
                openAdminDashboard?.();
              }
            }}
            placeholder={t.searchPlaceholder}
            className="w-full pl-9 pr-8 py-2 bg-gray-50 border border-gray-200 rounded-none text-xs text-black placeholder-gray-400 focus:outline-none focus:border-black transition-all font-devanagari"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-black font-bold"
            >
              ✕
            </button>
          )}
        </div>

        {/* Mobile Fast Language Selector Tabs */}
        <div className="flex items-center justify-between bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-bold font-devanagari" role="tablist" aria-label={t.selectLanguage}>
          <button
            type="button"
            onClick={() => setLanguage('en')}
            className={`flex-1 py-1.5 text-center rounded-md transition-all ${
              language === 'en'
                ? 'bg-black text-white shadow-xs font-extrabold'
                : 'text-slate-700 hover:text-black hover:bg-white/50'
            }`}
          >
            English
          </button>
          <button
            type="button"
            onClick={() => setLanguage('mr')}
            className={`flex-1 py-1.5 text-center rounded-md transition-all ${
              language === 'mr'
                ? 'bg-amber-500 text-black shadow-xs font-black'
                : 'text-slate-700 hover:text-black hover:bg-white/50'
            }`}
          >
            मराठी
          </button>
          <button
            type="button"
            onClick={() => setLanguage('hi')}
            className={`flex-1 py-1.5 text-center rounded-md transition-all ${
              language === 'hi'
                ? 'bg-amber-500 text-black shadow-xs font-black'
                : 'text-slate-700 hover:text-black hover:bg-white/50'
            }`}
          >
            हिन्दी
          </button>
        </div>
      </div>

      {/* Soft Luxury Category & Feature Navigation Bar */}
      <div className="bg-[#FAF9F6] border-t border-b border-slate-200/90 text-[#263238] select-none shadow-xs sticky top-[73px] z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center px-1 sm:px-4 relative">
          
          {/* Left Arrow Button « */}
          <button
            type="button"
            onClick={() => scrollNav('left')}
            className="text-[#64748B] hover:text-[#263238] px-2 sm:px-3 py-3 font-mono text-base font-bold transition-colors shrink-0 flex items-center justify-center cursor-pointer hover:bg-slate-200/60 rounded-md"
            title="Scroll left"
            aria-label="Scroll left"
          >
            «
          </button>

          {/* Horizontal Scrollable Navigation Items */}
          <div
            ref={navScrollRef}
            className="flex-1 flex items-center space-x-5 sm:space-x-7 overflow-x-auto no-scrollbar scroll-smooth py-2.5 px-2 text-[13px] sm:text-[14px] font-medium [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden font-devanagari"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* 1. CATALOGUES - Official E-Catalogues & Directory */}
            <button
              type="button"
              onClick={() => {
                setActiveTab('catalogues');
                setSearchQuery('');
              }}
              className={`whitespace-nowrap transition-all duration-150 cursor-pointer flex items-center space-x-1.5 px-3 py-1 rounded-full ${
                activeTab === 'catalogues'
                  ? 'bg-[#263238] text-white font-bold shadow-xs'
                  : 'text-[#263238] hover:bg-slate-200/70 font-semibold'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-[#6EA8FE]" />
              <span>{t.navCatalogues}</span>
            </button>

            {/* 2. All Tiles */}
            <button
              type="button"
              onClick={() => {
                setActiveTab('tileFinder');
                setSearchQuery('');
              }}
              className={`whitespace-nowrap transition-all duration-150 cursor-pointer ${
                activeTab === 'tileFinder' && (!searchQuery || searchQuery.trim() === '')
                  ? 'text-[#263238] font-bold border-b-2 border-[#263238] pb-0.5'
                  : 'text-[#64748B] hover:text-[#263238]'
              }`}
            >
              {t.navAllTiles}
            </button>

            {/* 3. Floor Tiles */}
            <button
              type="button"
              onClick={() => {
                setActiveCategory?.('floor');
                setActiveTab('category');
              }}
              className={`whitespace-nowrap transition-all duration-150 cursor-pointer ${
                activeTab === 'category' && activeCategory === 'floor'
                  ? 'text-[#263238] font-bold border-b-2 border-[#6EA8FE] pb-0.5'
                  : 'text-[#64748B] hover:text-[#263238]'
              }`}
            >
              {t.navFloorTiles}
            </button>

            {/* 4. Wall Tiles */}
            <button
              type="button"
              onClick={() => {
                setActiveCategory?.('wall');
                setActiveTab('category');
              }}
              className={`whitespace-nowrap transition-all duration-150 cursor-pointer ${
                activeTab === 'category' && activeCategory === 'wall'
                  ? 'text-[#263238] font-bold border-b-2 border-[#A78BFA] pb-0.5'
                  : 'text-[#64748B] hover:text-[#263238]'
              }`}
            >
              {t.navWallTiles}
            </button>

            {/* 5. Bathroom Tiles */}
            <button
              type="button"
              onClick={() => {
                setActiveCategory?.('bathroom');
                setActiveTab('category');
              }}
              className={`whitespace-nowrap transition-all duration-150 cursor-pointer ${
                activeTab === 'category' && activeCategory === 'bathroom'
                  ? 'text-[#263238] font-bold border-b-2 border-[#86D7C4] pb-0.5'
                  : 'text-[#64748B] hover:text-[#263238]'
              }`}
            >
              {t.navBathroomTiles}
            </button>

            {/* 6. Kitchen Tiles */}
            <button
              type="button"
              onClick={() => {
                setActiveCategory?.('kitchen');
                setActiveTab('category');
              }}
              className={`whitespace-nowrap transition-all duration-150 cursor-pointer ${
                activeTab === 'category' && activeCategory === 'kitchen'
                  ? 'text-[#263238] font-bold border-b-2 border-[#F6C7A8] pb-0.5'
                  : 'text-[#64748B] hover:text-[#263238]'
              }`}
            >
              {t.navKitchenTiles}
            </button>

            {/* 7. Living Room Tiles */}
            <button
              type="button"
              onClick={() => {
                setActiveCategory?.('living');
                setActiveTab('category');
              }}
              className={`whitespace-nowrap transition-all duration-150 cursor-pointer ${
                activeTab === 'category' && activeCategory === 'living'
                  ? 'text-[#263238] font-bold border-b-2 border-[#6EA8FE] pb-0.5'
                  : 'text-[#64748B] hover:text-[#263238]'
              }`}
            >
              {language === 'mr' ? 'लिव्हिंग रूम टाईल्स' : language === 'hi' ? 'लिविंग रूम टाइल्स' : 'Living Room Tiles'}
            </button>

            {/* 8. Outdoor Tiles */}
            <button
              type="button"
              onClick={() => {
                setActiveCategory?.('outdoor');
                setActiveTab('category');
              }}
              className={`whitespace-nowrap transition-all duration-150 cursor-pointer ${
                activeTab === 'category' && activeCategory === 'outdoor'
                  ? 'text-[#263238] font-bold border-b-2 border-[#E8B4C8] pb-0.5'
                  : 'text-[#64748B] hover:text-[#263238]'
              }`}
            >
              {t.navOutdoorTiles}
            </button>

            {/* 9. Parking Tiles */}
            <button
              type="button"
              onClick={() => {
                setActiveCategory?.('parking');
                setActiveTab('category');
              }}
              className={`whitespace-nowrap transition-all duration-150 cursor-pointer ${
                activeTab === 'category' && activeCategory === 'parking'
                  ? 'text-[#263238] font-bold border-b-2 border-[#F6C7A8] pb-0.5'
                  : 'text-[#64748B] hover:text-[#263238]'
              }`}
            >
              {language === 'mr' ? 'पार्किंग टाईल्स' : language === 'hi' ? 'पार्किंग टाइल्स' : 'Parking Tiles'}
            </button>

            {/* 10. Ceramic Tiles */}
            <button
              type="button"
              onClick={() => {
                setActiveCategory?.('ceramic');
                setActiveTab('category');
              }}
              className={`whitespace-nowrap transition-all duration-150 cursor-pointer ${
                activeTab === 'category' && activeCategory === 'ceramic'
                  ? 'text-[#263238] font-bold border-b-2 border-[#A78BFA] pb-0.5'
                  : 'text-[#64748B] hover:text-[#263238]'
              }`}
            >
              {language === 'mr' ? 'सिरेमिक टाईल्स' : language === 'hi' ? 'सिरेमिक टाइल्स' : 'Ceramic Tiles'}
            </button>

            {/* 11. Vitrified Tiles */}
            <button
              type="button"
              onClick={() => {
                setActiveCategory?.('vitrified');
                setActiveTab('category');
              }}
              className={`whitespace-nowrap transition-all duration-150 cursor-pointer ${
                activeTab === 'category' && activeCategory === 'vitrified'
                  ? 'text-[#263238] font-bold border-b-2 border-[#6EA8FE] pb-0.5'
                  : 'text-[#64748B] hover:text-[#263238]'
              }`}
            >
              {language === 'mr' ? 'व्हिट्रिफाइड टाईल्स' : language === 'hi' ? 'विट्रिफाइड टाइल्स' : 'Vitrified Tiles'}
            </button>

            {/* 12. SHOWROOM CENTRE */}
            <button
              type="button"
              onClick={() => setActiveTab('experienceCenter')}
              className={`whitespace-nowrap transition-all duration-150 flex items-center space-x-1.5 px-3 py-1 rounded-full cursor-pointer ${
                activeTab === 'experienceCenter'
                  ? 'bg-[#263238] text-white font-black shadow-xs ring-2 ring-[#263238]/20'
                  : 'bg-[#F6C7A8]/30 border border-[#F6C7A8] text-[#263238] hover:bg-[#F6C7A8]/60 font-bold'
              }`}
              title="Visit Amol Tiles Jath Showroom & Experience Centre"
            >
              <Building2 className="w-3.5 h-3.5 text-[#b8860b] shrink-0" />
              <span>{t.navExperienceCenter}</span>
              <span className={`text-[9px] px-1.5 py-0.2 rounded font-black uppercase ${
                activeTab === 'experienceCenter' ? 'bg-[#F6C7A8] text-[#263238]' : 'bg-[#263238] text-white'
              }`}>
                {language === 'mr' ? 'जत' : language === 'hi' ? 'जत' : 'Jath'}
              </span>
            </button>
          </div>

          {/* Right Arrow Button » */}
          <button
            type="button"
            onClick={() => scrollNav('right')}
            className="text-[#64748B] hover:text-[#263238] px-2 sm:px-3 py-3 font-mono text-base font-bold transition-colors shrink-0 flex items-center justify-center cursor-pointer hover:bg-slate-200/60 rounded-md"
            title="Scroll right"
            aria-label="Scroll right"
          >
            »
          </button>
        </div>
      </div>
    </header>
  );
};
