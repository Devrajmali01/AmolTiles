import React, { useState } from 'react';
import { MapPin, X, PhoneCall, Building2, Search, CheckCircle2, Navigation } from 'lucide-react';
import { DealerInfo } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface DealerLocateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SAMPLE_DEALERS: DealerInfo[] = [
  {
    id: 'd-0',
    name: 'Amol World Experience Center - Jath',
    city: 'Jath',
    state: 'Maharashtra',
    address: 'Satara road, Jath, Maharashtra 416404',
    phone: '+91 2344 220011',
    email: 'jath.showroom@amoltiles.com',
    type: 'Exclusive Amol World Showroom'
  },
  {
    id: 'd-1',
    name: 'Amol World Experience Center - Mumbai Flagship',
    city: 'Mumbai',
    state: 'Maharashtra',
    address: 'Plot 42, Laxmi Industrial Estate, New Link Road, Andheri West, Mumbai - 400053',
    phone: '+91 22 2634 8800',
    email: 'mumbai.showroom@amoltiles.com',
    type: 'Exclusive Amol World Showroom'
  },
  {
    id: 'd-2',
    name: 'Amol Ceramics Gallery - New Delhi',
    city: 'New Delhi',
    state: 'Delhi NCR',
    address: 'B-12, Ring Road, Rajouri Garden, New Delhi - 110027',
    phone: '+91 11 4144 9900',
    email: 'delhi.gallery@amoltiles.com',
    type: 'Exclusive Amol World Showroom'
  },
  {
    id: 'd-3',
    name: 'Amol Tiles & Sanitaryware Studio - Ahmedabad',
    city: 'Ahmedabad',
    state: 'Gujarat',
    address: 'S.G. Highway, Opp. Rajpath Club, Bodakdev, Ahmedabad - 380054',
    phone: '+91 79 2687 1122',
    email: 'ahmedabad@amoltiles.com',
    type: 'Experience Center'
  },
  {
    id: 'd-4',
    name: 'Amol Premium Ceramic Emporium - Bengaluru',
    city: 'Bengaluru',
    state: 'Karnataka',
    address: '100 Feet Road, Indiranagar, Bengaluru - 560038',
    phone: '+91 80 4112 3344',
    email: 'bengaluru@amoltiles.com',
    type: 'Authorized Dealer'
  },
  {
    id: 'd-5',
    name: 'Amol Architectural Lounge - Hyderabad',
    city: 'Hyderabad',
    state: 'Telangana',
    address: 'Road No. 36, Jubilee Hills, Hyderabad - 500033',
    phone: '+91 40 2355 6677',
    email: 'hyderabad@amoltiles.com',
    type: 'Experience Center'
  }
];

export const DealerLocateModal: React.FC<DealerLocateModalProps> = ({ isOpen, onClose }) => {
  const { t, language } = useLanguage();
  const [searchCity, setSearchCity] = useState('');

  if (!isOpen) return null;

  const filteredDealers = SAMPLE_DEALERS.filter(d => 
    !searchCity || 
    d.city.toLowerCase().includes(searchCity.toLowerCase()) ||
    d.state.toLowerCase().includes(searchCity.toLowerCase()) ||
    d.name.toLowerCase().includes(searchCity.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn font-devanagari">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 px-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="text-base font-bold font-serif text-white">{t.dealerTitle}</h2>
              <p className="text-[10px] text-amber-300 font-mono">{t.dealerSubtitle}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg cursor-pointer" aria-label={t.close}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              placeholder={t.dealerSearchPlaceholder}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:border-amber-500 font-devanagari"
            />
          </div>

          {/* Dealer Cards */}
          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {filteredDealers.map((d) => (
              <div key={d.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl hover:border-amber-400 transition-colors">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="bg-amber-100 text-amber-800 text-[9px] font-bold px-2 py-0.5 rounded uppercase font-devanagari">
                      {d.id === 'd-0' ? (language === 'mr' ? 'अधिकृत मुख्य शोरूम' : language === 'hi' ? 'अधिकृत मुख्य शोरूम' : d.type) : d.type}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 font-serif mt-1">{d.name}</h4>
                    <p className="text-xs text-slate-600 mt-0.5">{d.address}</p>
                    <div className="flex flex-wrap items-center gap-4 mt-2 text-[11px] text-slate-500 font-mono">
                      <span className="flex items-center text-slate-700">
                        <PhoneCall className="w-3 h-3 mr-1 text-amber-600" /> {d.phone}
                      </span>
                      <span>{d.email}</span>
                    </div>
                  </div>

                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(d.name + ' ' + d.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-slate-900 text-amber-400 rounded-xl hover:bg-slate-800 transition-colors shrink-0"
                    title={t.getDirections}
                  >
                    <Navigation className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};
