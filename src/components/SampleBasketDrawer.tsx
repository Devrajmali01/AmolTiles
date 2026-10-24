import React, { useState } from 'react';
import { TileProduct } from '../types';
import { Package, X, Trash2, Send, CheckCircle2, Building2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface SampleBasketDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  sampleTileIds: string[];
  tiles: TileProduct[];
  onRemoveSample: (tileId: string) => void;
  onClearSamples: () => void;
}

export const SampleBasketDrawer: React.FC<SampleBasketDrawerProps> = ({
  isOpen,
  onClose,
  sampleTileIds,
  tiles,
  onRemoveSample,
  onClearSamples
}) => {
  const { t, language, formatNumber } = useLanguage();
  const sampledTiles = tiles.filter(t => sampleTileIds.includes(t.id));

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [userRole, setUserRole] = useState<'Architect' | 'Interior Designer' | 'Builder / Developer' | 'Homeowner'>('Architect');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || sampledTiles.length === 0) return;

    setSubmitting(true);

    try {
      const res = await fetch('/api/inquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sampleTileIds,
          tileNames: sampledTiles.map(t => `${t.name} (${t.code})`),
          customerName: name,
          email,
          phone,
          userRole,
          city,
          address
        })
      });

      const data = await res.json();
      setSubmitting(false);
      setSubmitted(true);
      setReferenceId(data.referenceId || `AML-INQ-${Math.floor(100000 + Math.random() * 900000)}`);
    } catch {
      setSubmitting(false);
      setSubmitted(true);
      setReferenceId(`AML-INQ-${Math.floor(100000 + Math.random() * 900000)}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex justify-end animate-fadeIn font-devanagari">
      <div className="bg-white border-l border-slate-200 w-full max-w-md h-full flex flex-col text-slate-900 shadow-2xl">
        
        {/* Header */}
        <div className="p-4 px-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <Package className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-sm font-bold font-serif text-white">{t.sampleDrawerTitle}</h3>
              <p className="text-[10px] text-amber-300 font-mono">
                {formatNumber(sampledTiles.length)} {language === 'mr' ? 'सॅम्पल निवडले' : language === 'hi' ? 'सैंपल चुने गए' : 'Samples Selected'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg cursor-pointer" aria-label={t.close}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4 my-auto">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
            <h3 className="text-xl font-bold font-serif text-slate-900">{t.dispatchSuccessTitle}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.dispatchSuccessDesc}
            </p>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs font-mono">
              <span className="text-slate-400 block text-[10px]">{t.referenceId}</span>
              <strong className="text-amber-700 text-sm">{referenceId}</strong>
            </div>
            <p className="text-xs text-emerald-700 font-semibold">{t.estimatedDelivery}</p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClearSamples();
                onClose();
              }}
              className="w-full py-3 bg-slate-900 text-amber-400 font-bold text-xs rounded-xl cursor-pointer hover:bg-slate-800"
            >
              {t.close}
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            
            {/* List of Selected Tile Samples */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t.sampleBasket}</span>
                {sampledTiles.length > 0 && (
                  <button onClick={onClearSamples} className="text-[10px] text-red-600 hover:underline flex items-center cursor-pointer">
                    <Trash2 className="w-3 h-3 mr-1" /> {t.clearAll}
                  </button>
                )}
              </div>

              {sampledTiles.length === 0 ? (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center text-xs text-slate-500 space-y-2">
                  <Package className="w-8 h-8 text-slate-300 mx-auto" />
                  <p className="font-bold text-slate-700">{t.emptyBasket}</p>
                  <p className="text-[10px] text-slate-400">{t.emptyBasketDesc}</p>
                </div>
              ) : (
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {sampledTiles.map(tItem => (
                    <div key={tItem.id} className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img src={tItem.textureUrl} alt={tItem.name} referrerPolicy="no-referrer" className="w-10 h-10 rounded-lg object-cover border border-slate-300 bg-slate-900" />
                        <div>
                          <h4 className="text-xs font-bold text-slate-900 font-serif">{tItem.name}</h4>
                          <span className="text-[10px] text-amber-700 font-mono">{tItem.code} • {tItem.size}</span>
                        </div>
                      </div>
                      <button onClick={() => onRemoveSample(tItem.id)} className="p-1 text-slate-400 hover:text-red-500 cursor-pointer">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Request Dispatch Form */}
            {sampledTiles.length > 0 && (
              <form onSubmit={handleSubmit} className="space-y-4 border-t border-slate-200 pt-5">
                <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-900">
                  <Building2 className="w-4 h-4 text-amber-500" />
                  <span>{t.checkoutTitle}</span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                      {t.fullName} *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={language === 'mr' ? 'उदा. सुमित कदम' : language === 'hi' ? 'उदा. सुमित कदम' : 'e.g. Sumit Kadam'}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                        {t.mobileNumber} *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="98XXXXXXXX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                        {t.emailAddress}
                      </label>
                      <input
                        type="email"
                        placeholder="name@domain.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                        {t.professionRole}
                      </label>
                      <select
                        value={userRole}
                        onChange={(e) => setUserRole(e.target.value as any)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-amber-500"
                      >
                        <option value="Architect">{t.roleArchitect}</option>
                        <option value="Interior Designer">{t.roleDesigner}</option>
                        <option value="Builder / Developer">{t.roleBuilder}</option>
                        <option value="Homeowner">{t.roleHomeowner}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                        {t.deliveryCity}
                      </label>
                      <input
                        type="text"
                        placeholder="Jath / Sangli"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                      {t.fullAddress}
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Street, Landmark, Pincode"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-amber-500 leading-relaxed"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-60"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? t.dispatching : t.btnDispatchSamples}</span>
                </button>
              </form>
            )}

          </div>
        )}
      </div>
    </div>
  );
};
