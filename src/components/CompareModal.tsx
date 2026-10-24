import React from 'react';
import { TileProduct } from '../types';
import { X, SlidersHorizontal, Sparkles, Package, Trash2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface CompareModalProps {
  tileIds: string[];
  tiles: TileProduct[];
  onClose: () => void;
  onRemoveCompareTile: (tileId: string) => void;
  onToggleSampleRequest: (tileId: string) => void;
  sampleTileIds: string[];
}

export const CompareModal: React.FC<CompareModalProps> = ({
  tileIds,
  tiles,
  onClose,
  onRemoveCompareTile,
  onToggleSampleRequest,
  sampleTileIds
}) => {
  const { t, language, formatNumber } = useLanguage();
  const selectedTiles = tiles.filter(tItem => tileIds.includes(tItem.id));

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn font-devanagari">
      <div className="bg-white rounded-3xl max-w-5xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 px-6 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center space-x-2">
            <SlidersHorizontal className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="text-base font-bold font-serif text-white">{t.compareTitle}</h2>
              <p className="text-[10px] text-slate-400 font-mono">
                {formatNumber(selectedTiles.length)} {language === 'mr' ? 'टाईल्स निवडल्या' : language === 'hi' ? 'टाइल्स चुनी गईं' : 'Tiles Selected'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg cursor-pointer" aria-label={t.close}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Matrix */}
        <div className="p-6 flex-1 overflow-x-auto overflow-y-auto">
          {selectedTiles.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <p className="text-sm font-bold">{t.noCompareTiles}</p>
              <p className="text-xs mt-1">{t.noCompareDesc}</p>
            </div>
          ) : (
            <div className="min-w-[600px]">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr>
                    <th className="p-3 bg-slate-100 text-slate-500 font-bold uppercase text-[10px] w-40">{t.property}</th>
                    {selectedTiles.map(tItem => (
                      <th key={tItem.id} className="p-3 bg-slate-50 border-l border-slate-200 text-center relative w-48">
                        <button
                          onClick={() => onRemoveCompareTile(tItem.id)}
                          className="absolute top-2 right-2 text-slate-400 hover:text-red-500 cursor-pointer"
                          title={t.btnRemoveCompare}
                          aria-label={t.btnRemoveCompare}
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                        <div className="w-20 h-20 mx-auto rounded-lg overflow-hidden border border-slate-300 shadow-sm mb-2 bg-slate-900">
                          <img src={tItem.textureUrl} alt={tItem.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                        </div>
                        <span className="text-[10px] text-amber-700 font-bold font-mono block">{tItem.code}</span>
                        <h4 className="font-bold text-slate-900 font-serif line-clamp-1">{tItem.name}</h4>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 border-t border-slate-200">
                  <tr>
                    <td className="p-3 font-bold text-slate-500 bg-slate-50">{t.filterSize}</td>
                    {selectedTiles.map(tItem => <td key={tItem.id} className="p-3 text-center border-l font-bold">{tItem.size}</td>)}
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-slate-500 bg-slate-50">{t.filterFinish}</td>
                    {selectedTiles.map(tItem => <td key={tItem.id} className="p-3 text-center border-l font-bold text-amber-700">{tItem.finish}</td>)}
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-slate-500 bg-slate-50">{t.thickness}</td>
                    {selectedTiles.map(tItem => <td key={tItem.id} className="p-3 text-center border-l">{tItem.thickness}</td>)}
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-slate-500 bg-slate-50">{t.waterAbs}</td>
                    {selectedTiles.map(tItem => <td key={tItem.id} className="p-3 text-center border-l font-mono">{tItem.waterAbsorption}</td>)}
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-slate-500 bg-slate-50">{t.coveragePerBox}</td>
                    {selectedTiles.map(tItem => <td key={tItem.id} className="p-3 text-center border-l">{tItem.pcsPerBox} {t.pcsPerBox} ({tItem.coveragePerBoxSqFt} sq.ft)</td>)}
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-slate-500 bg-slate-50">{t.randomFaces}</td>
                    {selectedTiles.map(tItem => <td key={tItem.id} className="p-3 text-center border-l font-mono">{tItem.randomFacesCount} Patterns</td>)}
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-slate-500 bg-slate-50">{t.grade}</td>
                    {selectedTiles.map(tItem => <td key={tItem.id} className="p-3 text-center border-l font-bold text-emerald-700">{tItem.grade}</td>)}
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-slate-500 bg-slate-50">Actions</td>
                    {selectedTiles.map(tItem => (
                      <td key={tItem.id} className="p-3 border-l text-center">
                        <button
                          onClick={() => onToggleSampleRequest(tItem.id)}
                          className={`w-full py-2 text-[10px] font-bold rounded cursor-pointer ${
                            sampleTileIds.includes(tItem.id) ? 'bg-emerald-600 text-white' : 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                          }`}
                        >
                          {sampleTileIds.includes(tItem.id) ? t.btnSampleAdded : t.btnSample}
                        </button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
