import React, { useState } from 'react';
import { TileProduct } from '../types';
import { Calculator, X, CheckCircle2, Package, Layers, Info, Copy, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface TileCalculatorModalProps {
  tile: TileProduct | null;
  onClose: () => void;
  onToggleSampleRequest?: (tileId: string) => void;
  isSampled?: boolean;
}

export const TileCalculatorModal: React.FC<TileCalculatorModalProps> = ({
  tile,
  onClose,
  onToggleSampleRequest,
  isSampled
}) => {
  const { t, language, formatNumber } = useLanguage();
  const [unit, setUnit] = useState<'feet' | 'meters'>('feet');
  const [length, setLength] = useState<number>(15);
  const [width, setWidth] = useState<number>(12);
  const [wastagePercent, setWastagePercent] = useState<number>(10);
  const [copied, setCopied] = useState(false);

  // Default coverage per box (e.g. 27.55 sq.ft for 800x1600mm box of 2)
  const coveragePerBox = tile ? tile.coveragePerBoxSqFt : 27.55;
  const pcsPerBox = tile ? tile.pcsPerBox : 2;

  // Calculate area in Sq.Ft
  const rawArea = unit === 'feet' ? length * width : length * width * 10.7639;
  const areaWithWastage = rawArea * (1 + wastagePercent / 100);

  const boxesNeeded = Math.ceil(areaWithWastage / coveragePerBox);
  const approxWeightKg = Math.round(boxesNeeded * 24); // approx 24kg per box

  const handleCopySummary = () => {
    const tileName = tile ? `${tile.name} (${tile.size})` : 'Tile Surface';
    const text = `📐 Amol Tiles Jath - Material Estimate\n• Material: ${tileName}\n• Room Size: ${length}x${width} ${unit} (+${wastagePercent}% wastage)\n• Total Required: ${boxesNeeded} Boxes (${totalPieces} pcs, ~${totalCoverageSqFt} sq.ft, ${approxWeightKg} kg)\n• Showroom: Amol Tiles, Satara Road, Jath (Pro. Ajit Shinde: +91 9822090345 / Pro. Niraj Shinde: +91 9822309345)`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn font-devanagari">
      <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-5 px-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <Calculator className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="text-base font-bold font-serif text-white">{t.calcModalTitle}</h2>
              <p className="text-[10px] text-slate-400 font-mono">{t.calcSubtitle}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg cursor-pointer" aria-label={t.close}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          
          {/* Selected Tile Mini Card */}
          {tile && (
            <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200 flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-slate-300 bg-slate-900">
                <img src={tile.textureUrl} alt={tile.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="text-[10px] text-amber-700 font-bold uppercase">{tile.code} • {tile.size}</span>
                <h4 className="text-xs font-bold text-slate-900 font-serif">{tile.name}</h4>
                <p className="text-[10px] text-slate-500">{tile.pcsPerBox} {t.pcsPerBox} ({tile.coveragePerBoxSqFt} {t.coveragePerBox})</p>
              </div>
            </div>
          )}

          {/* Input Controls */}
          <div className="space-y-4 text-xs">
            
            {/* Unit Selector */}
            <div className="flex items-center justify-between bg-slate-100 p-1 rounded-xl font-semibold">
              <button
                type="button"
                onClick={() => setUnit('feet')}
                className={`flex-1 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  unit === 'feet' ? 'bg-slate-900 text-amber-400 font-bold shadow' : 'text-slate-600'
                }`}
              >
                {t.unitFeet}
              </button>
              <button
                type="button"
                onClick={() => setUnit('meters')}
                className={`flex-1 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  unit === 'meters' ? 'bg-slate-900 text-amber-400 font-bold shadow' : 'text-slate-600'
                }`}
              >
                {t.unitMeters}
              </button>
            </div>

            {/* Room Dimensions Inputs */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                  {t.roomLength} ({unit === 'feet' ? 'ft' : 'm'})
                </label>
                <input
                  type="number"
                  min={1}
                  value={length}
                  onChange={(e) => setLength(Math.max(1, parseFloat(e.target.value) || 0))}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                  {t.roomWidth} ({unit === 'feet' ? 'ft' : 'm'})
                </label>
                <input
                  type="number"
                  min={1}
                  value={width}
                  onChange={(e) => setWidth(Math.max(1, parseFloat(e.target.value) || 0))}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Wastage Buffer */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">{t.wastageBuffer}</label>
                <span className="text-amber-700 font-bold font-mono text-xs">{wastagePercent}%</span>
              </div>
              <div className="flex items-center space-x-2">
                {[5, 10, 15].map(w => (
                  <button
                    key={w}
                    type="button"
                    onClick={() => setWastagePercent(w)}
                    className={`flex-1 py-1.5 rounded-lg border text-xs font-bold transition-colors cursor-pointer ${
                      wastagePercent === w
                        ? 'bg-slate-900 text-amber-400 border-slate-900'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {w}%
                  </button>
                ))}
              </div>
              <p className="text-[9px] text-slate-400 mt-1">{t.recommendedBuffer}</p>
            </div>

          </div>

          {/* Results Display */}
          <div className="bg-amber-50/70 border border-amber-200/90 rounded-2xl p-4 space-y-3">
            <div className="grid grid-cols-2 gap-3 pb-3 border-b border-amber-200/70">
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-semibold">{t.totalArea}</span>
                <div className="text-base font-extrabold text-slate-900 font-mono">
                  {formatNumber(parseFloat(areaWithWastage.toFixed(1)))} sq.ft
                </div>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-semibold">{t.totalBoxesNeeded}</span>
                <div className="text-2xl font-black text-amber-800 font-mono">
                  {formatNumber(boxesNeeded)} {language === 'mr' ? 'बॉक्स' : language === 'hi' ? 'बॉक्स' : 'Boxes'}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-semibold">{t.totalPieces}</span>
                <div className="font-bold text-slate-800 font-mono">
                  {formatNumber(totalPieces)} {language === 'mr' ? 'नग' : language === 'hi' ? 'नग' : 'pcs'}
                </div>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-semibold">{t.approxWeight}</span>
                <div className="font-bold text-slate-800 font-mono">
                  ~{formatNumber(approxWeightKg)} kg
                </div>
              </div>
            </div>
          </div>

          {/* Actions & Sample Request button */}
          <div className="space-y-2">
            {tile && onToggleSampleRequest && (
              <button
                type="button"
                onClick={() => onToggleSampleRequest(tile.id)}
                className={`w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-colors cursor-pointer ${
                  isSampled
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}
              >
                <Package className="w-4 h-4" />
                <span>{isSampled ? t.btnSampleAdded : t.btnSample}</span>
              </button>
            )}

            {/* Copy Estimation Summary */}
            <button
              type="button"
              onClick={handleCopySummary}
              className="w-full py-2.5 bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-amber-700" />}
              <span>{copied ? (language === 'mr' ? 'कॉपी झाले!' : language === 'hi' ? 'कॉपी हो गया!' : 'Estimate Copied!') : (language === 'mr' ? 'मोजणी माहिती कॉपी करा' : language === 'hi' ? 'अनुमान जानकारी कॉपी करें' : 'Copy Estimate Summary')}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              {t.close}
            </button>
          </div>

          <p className="text-[10px] text-slate-400 text-center">
            {t.calcDisclaimer}
          </p>

        </div>
      </div>
    </div>
  );
};
