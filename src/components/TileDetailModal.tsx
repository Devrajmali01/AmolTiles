import React, { useState } from 'react';
import { TileProduct } from '../types';
import { 
  X, 
  Sparkles, 
  Package, 
  Calculator, 
  Layers, 
  CheckCircle2, 
  FileText, 
  Share2, 
  SlidersHorizontal,
  Maximize2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface TileDetailModalProps {
  tile: TileProduct | null;
  onClose: () => void;
  onToggleSampleRequest: (tileId: string) => void;
  isSampled: boolean;
  onOpenCalculatorWithTile: (tile: TileProduct) => void;
}

export const TileDetailModal: React.FC<TileDetailModalProps> = ({
  tile,
  onClose,
  onToggleSampleRequest,
  isSampled,
  onOpenCalculatorWithTile
}) => {
  const { t, language, formatNumber } = useLanguage();
  const [activeTab, setActiveTab] = useState<'texture' | 'room' | 'randomFaces'>('texture');

  if (!tile) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn font-devanagari">
      <div className="bg-white rounded-3xl max-w-4xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-5 px-6 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div>
            <div className="flex items-center space-x-2">
              <span className="bg-amber-500 text-slate-950 font-extrabold text-[10px] px-2 py-0.5 rounded uppercase tracking-wider">
                {tile.category}
              </span>
              <span className="text-xs text-amber-300 font-mono font-bold">{tile.code}</span>
            </div>
            <h2 className="text-xl font-bold font-serif text-white mt-0.5">{tile.name}</h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl transition-colors cursor-pointer"
            aria-label={t.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Left Visual Preview (Texture / Room Mockup / Random Faces) */}
          <div className="md:col-span-6 space-y-4">
            
            {/* View Selector Tabs */}
            <div className="flex items-center space-x-2 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveTab('texture')}
                className={`flex-1 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'texture' ? 'bg-slate-900 text-amber-400 font-bold shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {language === 'mr' ? 'हाय-रेझ टेक्सचर' : language === 'hi' ? 'हाई-रेज टेक्सचर' : 'High-Res Texture'}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('room')}
                className={`flex-1 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'room' ? 'bg-slate-900 text-amber-400 font-bold shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {language === 'mr' ? 'रूम मॉकप' : language === 'hi' ? 'रूम मॉकअप' : 'Room Mockup'}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('randomFaces')}
                className={`flex-1 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'randomFaces' ? 'bg-slate-900 text-amber-400 font-bold shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t.randomFaces} ({tile.randomFacesCount})
              </button>
            </div>

            {/* Stage Box */}
            <div className="aspect-square bg-slate-950 rounded-2xl overflow-hidden border border-slate-200 relative group shadow-inner">
              {activeTab === 'texture' && (
                <img src={tile.textureUrl} alt={tile.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              )}
              {activeTab === 'room' && (
                <img src={tile.roomPreviewUrl} alt={`${tile.name} room`} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              )}
              {activeTab === 'randomFaces' && (
                <div className="grid grid-cols-3 gap-1 p-2 h-full bg-slate-900">
                  {Array.from({ length: Math.min(tile.randomFacesCount, 6) }).map((_, idx) => (
                    <div key={idx} className="relative rounded overflow-hidden border border-slate-700 bg-slate-800">
                      <img src={tile.textureUrl} alt={`Face ${idx + 1}`} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                      <span className="absolute bottom-1 left-1 bg-slate-950/80 text-white text-[9px] font-mono px-1 rounded">
                        Pattern {idx + 1}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <div className="absolute bottom-3 right-3">
                <span className="bg-slate-950/80 text-amber-400 text-[10px] font-mono font-bold px-2.5 py-1 rounded-md border border-amber-500/30">
                  {tile.size}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-500 italic bg-amber-50/50 p-3 rounded-xl border border-amber-200/60 leading-relaxed">
              "{tile.description}"
            </p>
          </div>

          {/* Right Specs Sheet & Catalog Source */}
          <div className="md:col-span-6 space-y-6">
            
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{t.specifications}</h3>
              
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden text-xs">
                <div className="grid grid-cols-2 p-3 bg-slate-50 font-medium">
                  <span className="text-slate-500">{language === 'mr' ? 'प्रॉडक्ट कोड' : language === 'hi' ? 'उत्पाद कोड' : 'Product Code'}</span>
                  <span className="font-mono font-bold text-slate-900">{tile.code}</span>
                </div>
                <div className="grid grid-cols-2 p-3 font-medium">
                  <span className="text-slate-500">{t.filterSize}</span>
                  <span className="font-bold text-slate-900">{tile.size}</span>
                </div>
                <div className="grid grid-cols-2 p-3 bg-slate-50 font-medium">
                  <span className="text-slate-500">{t.filterFinish}</span>
                  <span className="font-bold text-amber-700">{tile.finish}</span>
                </div>
                <div className="grid grid-cols-2 p-3 font-medium">
                  <span className="text-slate-500">{t.filterLook}</span>
                  <span className="font-bold text-slate-900">{tile.look}</span>
                </div>
                <div className="grid grid-cols-2 p-3 bg-slate-50 font-medium">
                  <span className="text-slate-500">{t.thickness}</span>
                  <span className="font-bold text-slate-900">{tile.thickness}</span>
                </div>
                <div className="grid grid-cols-2 p-3 font-medium">
                  <span className="text-slate-500">{t.waterAbs}</span>
                  <span className="font-bold text-slate-900">{tile.waterAbsorption}</span>
                </div>
                <div className="grid grid-cols-2 p-3 bg-slate-50 font-medium">
                  <span className="text-slate-500">{t.boxSpecs}</span>
                  <span className="font-bold text-slate-900">{tile.pcsPerBox} {t.pcsPerBox} ({tile.coveragePerBoxSqFt} sq.ft)</span>
                </div>
                <div className="grid grid-cols-2 p-3 font-medium">
                  <span className="text-slate-500">{t.grade}</span>
                  <span className="font-bold text-emerald-700">{tile.grade}</span>
                </div>
              </div>
            </div>

            {/* Catalog Source Info */}
            <div className="bg-slate-900 text-slate-300 rounded-2xl p-4 text-xs border border-slate-800">
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block mb-1">
                {language === 'mr' ? 'कॅटलॉग संदर्भ' : language === 'hi' ? 'कैटलॉग संदर्भ' : 'Catalogue Origin'}
              </span>
              <p className="font-bold text-white font-serif text-sm">{tile.catalogName}</p>
              <p className="text-slate-400 text-[11px] mt-0.5">
                {language === 'mr' ? `पान क्रमांक ${tile.catalogPage} वरील डिझाईन` : language === 'hi' ? `पृष्ठ संख्या ${tile.catalogPage} पर उपलब्ध` : `Featured on Page ${tile.catalogPage}`}
              </p>
            </div>

            {/* Modal Actions */}
            <div className="space-y-2 pt-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenCalculatorWithTile(tile);
                  }}
                  className="py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl flex items-center justify-center space-x-1.5 touch-manipulation cursor-pointer min-h-[44px] active:scale-95"
                >
                  <Calculator className="w-4 h-4 text-slate-600" />
                  <span>{t.btnCalculate}</span>
                </button>

                <button
                  type="button"
                  onClick={() => onToggleSampleRequest(tile.id)}
                  className={`py-3 font-bold text-xs rounded-xl flex items-center justify-center space-x-1.5 transition-all touch-manipulation cursor-pointer min-h-[44px] active:scale-95 ${
                    isSampled
                      ? 'bg-emerald-600 text-white'
                      : 'bg-amber-500 hover:bg-amber-600 text-slate-950'
                  }`}
                >
                  <Package className="w-4 h-4" />
                  <span>{isSampled ? t.btnSampleAdded : t.btnSample}</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
