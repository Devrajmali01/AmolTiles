import React, { useState, useEffect } from 'react';
import { CATALOGUES_DATA } from './data/catalogues';
import { TILES_DATA } from './data/tiles';
import { CatalogueItem, TileProduct } from './types';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CatalogueGrid } from './components/CatalogueGrid';
import { EFlipbookModal } from './components/EFlipbookModal';
import { TileFinder } from './components/TileFinder';
import { TileDetailModal } from './components/TileDetailModal';
import { TileCalculatorModal } from './components/TileCalculatorModal';
import { CompareModal } from './components/CompareModal';
import { SampleBasketDrawer } from './components/SampleBasketDrawer';
import { DealerLocateModal } from './components/DealerLocateModal';
import { ExperienceCenter } from './components/ExperienceCenter';
import { VisitingCardModal } from './components/VisitingCardModal';
import { ShowroomSpotlight } from './components/ShowroomSpotlight';
import { CategoryView } from './components/CategoryView';
import { Footer } from './components/Footer';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { AuthModal } from './components/AuthModal';
import { ContactModal } from './components/ContactModal';
import { AiCustomerSupportWidget } from './components/AiCustomerSupportWidget';

export default function App() {
  const [activeTab, setActiveTab] = useState<'category' | 'catalogues' | 'tileFinder' | 'flipbook' | 'calculator' | 'experienceCenter'>('catalogues');
  const [activeCategory, setActiveCategory] = useState<string>('floor');
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Catalogues');

  // Customer Auth state
  const [currentUser, setCurrentUser] = useState<any>(() => {
    try {
      const saved = localStorage.getItem('amol_customer_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Modals state
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showVisitingCardModal, setShowVisitingCardModal] = useState(false);

  // Bookmarking state
  const [bookmarkedCatalogueIds, setBookmarkedCatalogueIds] = useState<string[]>(['cat-gvt-2026']);

  // Comparison state
  const [compareTileIds, setCompareTileIds] = useState<string[]>(['tile-statuario-01', 'tile-onyx-02']);
  const [showCompareModal, setShowCompareModal] = useState(false);

  // Sample Basket state
  const [sampleTileIds, setSampleTileIds] = useState<string[]>(['tile-statuario-01']);
  const [showSampleDrawer, setShowSampleDrawer] = useState(false);

  // Active E-Flipbook state
  const [activeCatalogueForFlipbook, setActiveCatalogueForFlipbook] = useState<CatalogueItem | null>(CATALOGUES_DATA[0]);

  // Selected Tile Detail Modal
  const [selectedTileDetail, setSelectedTileDetail] = useState<TileProduct | null>(null);

  // Calculator Modal state
  const [selectedTileForCalculator, setSelectedTileForCalculator] = useState<TileProduct | null>(TILES_DATA[0]);
  const [showCalculatorModal, setShowCalculatorModal] = useState(false);

  // Dealer Modal state
  const [showDealerModal, setShowDealerModal] = useState(false);

  // Intercept amoltiles4545: never display password in search bar or URL
  useEffect(() => {
    if (searchQuery.trim().toLowerCase() === 'amoltiles4545') {
      setSearchQuery('');
      setShowAdminModal(true);
    }
  }, [searchQuery]);

  useEffect(() => {
    try {
      const url = new URL(window.location.href);
      const searchParam = url.searchParams.get('search') || url.searchParams.get('q') || url.searchParams.get('password') || url.searchParams.get('pwd');
      if (searchParam && searchParam.trim().toLowerCase() === 'amoltiles4545') {
        url.searchParams.delete('search');
        url.searchParams.delete('q');
        url.searchParams.delete('password');
        url.searchParams.delete('pwd');
        window.history.replaceState({}, '', url.pathname);
        setShowAdminModal(true);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  // Toast feedback state for clear user feedback
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'warning' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    setToast({ message, type });
  };

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3200);
    return () => clearTimeout(timer);
  }, [toast]);

  // Accessibility: Global Escape key dismisses open overlays in WCAG compliant order
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedTileDetail) { setSelectedTileDetail(null); return; }
        if (showCalculatorModal) { setShowCalculatorModal(false); return; }
        if (showCompareModal) { setShowCompareModal(false); return; }
        if (showSampleDrawer) { setShowSampleDrawer(false); return; }
        if (showDealerModal) { setShowDealerModal(false); return; }
        if (showVisitingCardModal) { setShowVisitingCardModal(false); return; }
        if (showAdminModal) { setShowAdminModal(false); return; }
        if (showAuthModal) { setShowAuthModal(false); return; }
        if (showContactModal) { setShowContactModal(false); return; }
        if (activeTab === 'flipbook') { setActiveTab('catalogues'); return; }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    selectedTileDetail,
    showCalculatorModal,
    showCompareModal,
    showSampleDrawer,
    showDealerModal,
    showVisitingCardModal,
    showAdminModal,
    showAuthModal,
    showContactModal,
    activeTab
  ]);

  // Handlers with instant user feedback
  const handleToggleBookmark = (id: string) => {
    setBookmarkedCatalogueIds(prev => {
      const willBookmark = !prev.includes(id);
      showToast(willBookmark ? 'Catalogue saved to bookmarks' : 'Catalogue removed from bookmarks', 'info');
      return willBookmark ? [...prev, id] : prev.filter(item => item !== id);
    });
  };

  const handleToggleCompare = (id: string) => {
    setCompareTileIds(prev => {
      if (prev.includes(id)) {
        showToast('Tile removed from comparison', 'info');
        return prev.filter(item => item !== id);
      }
      if (prev.length >= 4) {
        showToast('Maximum 4 tiles can be compared simultaneously', 'warning');
        return prev;
      }
      showToast(`Tile added to comparison (${prev.length + 1}/4)`, 'success');
      return [...prev, id];
    });
  };

  const handleToggleSampleRequest = (id: string) => {
    setSampleTileIds(prev => {
      const willAdd = !prev.includes(id);
      showToast(willAdd ? 'Sample tile added to your basket' : 'Sample removed from basket', willAdd ? 'success' : 'info');
      return willAdd ? [...prev, id] : prev.filter(item => item !== id);
    });
  };

  const handleOpenFlipbook = (cat?: CatalogueItem) => {
    if (cat) setActiveCatalogueForFlipbook(cat);
    setActiveTab('flipbook');
  };

  const handleBrowseTilesInCatalogue = (catId: string) => {
    const catObj = CATALOGUES_DATA.find(c => c.id === catId);
    if (catObj) {
      setSearchQuery(catObj.title);
      setActiveTab('tileFinder');
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a] flex flex-col font-sans selection:bg-black selection:text-white overflow-x-hidden w-full max-w-[100vw]">
      
      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeCategory={activeCategory}
        setActiveCategory={(cat) => {
          setActiveCategory(cat);
          setActiveTab('category');
        }}
        sampleCount={sampleTileIds.length}
        openSampleDrawer={() => setShowSampleDrawer(true)}
        openDealerModal={() => setShowDealerModal(true)}
        openCompareModal={() => setShowCompareModal(true)}
        openVisitingCardModal={() => setShowVisitingCardModal(true)}
        openAdminDashboard={() => setShowAdminModal(true)}
        openAuthModal={() => setShowAuthModal(true)}
        openContactModal={() => setShowContactModal(true)}
        currentUser={currentUser}
        onLogout={() => {
          setCurrentUser(null);
          localStorage.removeItem('amol_customer_user');
        }}
        compareCount={compareTileIds.length}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'category' && (
          <CategoryView
            categoryKey={activeCategory}
            tiles={TILES_DATA}
            onSelectTile={(tile) => setSelectedTileDetail(tile)}
            onToggleCompare={handleToggleCompare}
            compareTileIds={compareTileIds}
            onToggleSampleRequest={handleToggleSampleRequest}
            sampleTileIds={sampleTileIds}
            onOpenAllTiles={() => {
              setSearchQuery('');
              setActiveTab('tileFinder');
            }}
            onOpenCatalogues={() => setActiveTab('catalogues')}
            onOpenExperienceCenter={() => setActiveTab('experienceCenter')}
          />
        )}

        {activeTab === 'catalogues' && (
          <>
            <HeroSection
              onExploreCatalogues={() => setActiveTab('catalogues')}
              onOpenFlipbook={() => handleOpenFlipbook(CATALOGUES_DATA[0])}
              onOpenVisitingCard={() => setShowVisitingCardModal(true)}
              onSelectNavCategory={(cat) => {
                setActiveCategory(cat);
                setActiveTab('category');
              }}
              onSelectCategory={setSelectedCategory}
              selectedCategory={selectedCategory}
            />

            <ShowroomSpotlight
              onOpenVisitingCard={() => setShowVisitingCardModal(true)}
              onExploreCatalogues={() => setActiveTab('catalogues')}
            />

            <CatalogueGrid
              catalogues={CATALOGUES_DATA}
              onOpenFlipbook={handleOpenFlipbook}
              onBrowseTiles={handleBrowseTilesInCatalogue}
              onBookmarkCatalogue={handleToggleBookmark}
              bookmarkedIds={bookmarkedCatalogueIds}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              searchQuery={searchQuery}
            />
          </>
        )}

        {activeTab === 'tileFinder' && (
          <TileFinder
            tiles={TILES_DATA}
            onSelectTile={(tile) => setSelectedTileDetail(tile)}
            onToggleCompare={handleToggleCompare}
            compareTileIds={compareTileIds}
            onToggleSampleRequest={handleToggleSampleRequest}
            sampleTileIds={sampleTileIds}
            initialSearchQuery={searchQuery}
            onOpenAdminDashboard={() => setShowAdminModal(true)}
          />
        )}

        {activeTab === 'flipbook' && (
          <EFlipbookModal
            catalogue={activeCatalogueForFlipbook || CATALOGUES_DATA[0]}
            onClose={() => setActiveTab('catalogues')}
            onSelectTileFromHotspot={(tileId) => {
              const tile = TILES_DATA.find(t => t.id === tileId);
              if (tile) setSelectedTileDetail(tile);
            }}
          />
        )}

        {activeTab === 'calculator' && (
          <div className="py-12 bg-slate-100 min-h-screen">
            <div className="max-w-xl mx-auto px-4">
              <TileCalculatorModal
                tile={selectedTileForCalculator || TILES_DATA[0]}
                onClose={() => setActiveTab('catalogues')}
                onToggleSampleRequest={handleToggleSampleRequest}
                isSampled={sampleTileIds.includes(selectedTileForCalculator?.id || '')}
              />
            </div>
          </div>
        )}

        {activeTab === 'experienceCenter' && (
          <ExperienceCenter
            onOpenSampleDrawer={() => setShowSampleDrawer(true)}
            onOpenVisitingCard={() => setShowVisitingCardModal(true)}
          />
        )}
      </main>

      {/* Modals & Slide-Over Drawers */}
      {selectedTileDetail && (
        <TileDetailModal
          tile={selectedTileDetail}
          onClose={() => setSelectedTileDetail(null)}
          onToggleSampleRequest={handleToggleSampleRequest}
          isSampled={sampleTileIds.includes(selectedTileDetail.id)}
          onOpenCalculatorWithTile={(tile) => {
            setSelectedTileForCalculator(tile);
            setShowCalculatorModal(true);
          }}
        />
      )}

      {showCalculatorModal && (
        <TileCalculatorModal
          tile={selectedTileForCalculator}
          onClose={() => setShowCalculatorModal(false)}
          onToggleSampleRequest={handleToggleSampleRequest}
          isSampled={sampleTileIds.includes(selectedTileForCalculator?.id || '')}
        />
      )}

      {showCompareModal && (
        <CompareModal
          tileIds={compareTileIds}
          tiles={TILES_DATA}
          onClose={() => setShowCompareModal(false)}
          onRemoveCompareTile={handleToggleCompare}
          onToggleSampleRequest={handleToggleSampleRequest}
          sampleTileIds={sampleTileIds}
        />
      )}

      {showSampleDrawer && (
        <SampleBasketDrawer
          isOpen={showSampleDrawer}
          onClose={() => setShowSampleDrawer(false)}
          sampleTileIds={sampleTileIds}
          tiles={TILES_DATA}
          onRemoveSample={handleToggleSampleRequest}
          onClearSamples={() => setSampleTileIds([])}
        />
      )}

      {showDealerModal && (
        <DealerLocateModal
          isOpen={showDealerModal}
          onClose={() => setShowDealerModal(false)}
        />
      )}

      {showVisitingCardModal && (
        <VisitingCardModal
          isOpen={showVisitingCardModal}
          onClose={() => setShowVisitingCardModal(false)}
        />
      )}

      {/* Amol Tiles Management Admin Dashboard */}
      {showAdminModal && (
        <AdminDashboardModal
          isOpen={showAdminModal}
          onClose={() => setShowAdminModal(false)}
        />
      )}

      {/* Customer Registration & Login */}
      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onLoginSuccess={(u) => {
            setCurrentUser(u);
            localStorage.setItem('amol_customer_user', JSON.stringify(u));
          }}
        />
      )}

      {/* Quick Contact & Enquiry Desk */}
      {showContactModal && (
        <ContactModal
          isOpen={showContactModal}
          onClose={() => setShowContactModal(false)}
        />
      )}

      {/* 24/7 AI Customer Support & Appointment Status Tracker */}
      <AiCustomerSupportWidget
        currentUser={currentUser}
        onOpenAppointmentTab={() => setActiveTab('experienceCenter')}
        onOpenContactModal={() => setShowContactModal(true)}
      />

      {/* Footer */}
      <Footer
        onSelectTab={setActiveTab}
        onOpenDealerModal={() => setShowDealerModal(true)}
        onOpenVisitingCard={() => setShowVisitingCardModal(true)}
        onOpenAdminDashboard={() => setShowAdminModal(true)}
      />

      {/* Accessible Non-Intrusive Toast Feedback */}
      {toast && (
        <div 
          role="status" 
          aria-live="polite"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-all duration-200 font-devanagari"
        >
          <div className={`px-4 py-2.5 rounded-full shadow-2xl flex items-center space-x-2.5 text-xs font-bold uppercase tracking-wider border backdrop-blur-md ${
            toast.type === 'warning'
              ? 'bg-amber-950/95 text-amber-200 border-amber-500/60'
              : toast.type === 'info'
              ? 'bg-slate-900/95 text-slate-100 border-slate-700'
              : 'bg-[#1a1a1a]/95 text-amber-300 border-amber-500/50'
          }`}>
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>{toast.message}</span>
          </div>
        </div>
      )}

    </div>
  );
}
