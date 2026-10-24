import React from 'react';
import { 
  Building2, 
  PhoneCall, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Award, 
  Globe, 
  Download, 
  BookOpen, 
  Sparkles,
  ArrowRight,
  Lock
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onSelectTab: (tab: 'catalogues' | 'tileFinder' | 'flipbook' | 'calculator' | 'experienceCenter') => void;
  onOpenDealerModal: () => void;
  onOpenVisitingCard?: () => void;
  onOpenAdminDashboard?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, onOpenDealerModal, onOpenVisitingCard, onOpenAdminDashboard }) => {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-neutral-950 text-gray-300 border-t border-gray-800 pt-16 pb-10 px-4 sm:px-10 relative overflow-hidden font-devanagari">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute bottom-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-neutral-800">
          
          {/* Brand & Corporate Summary */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 text-neutral-950 font-black rounded-lg flex items-center justify-center text-base shadow-lg">
                AT
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight text-white uppercase block">
                  {t.brandName}
                </span>
                <span className="text-xs font-serif italic text-amber-400/90 block -mt-0.5">
                  {t.brandTagline}
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed uppercase tracking-wider max-w-sm font-medium">
              {t.footerAboutText}
            </p>

            <div className="space-y-1.5 text-xs text-gray-300 uppercase tracking-widest font-semibold pt-1">
              <p className="text-white flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{language === 'mr' ? 'सांगली रोड, जत, जि. सांगली - ४१६४०४' : language === 'hi' ? 'सांगली रोड, जत, जिला सांगली - 416404' : 'Satara Road, Jath, Dist. Sangli - 416404'}</span>
              </p>
              <p className="flex items-center space-x-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{t.propAjit} <a href="tel:9822090345" className="text-white font-bold underline hover:text-amber-300">9822090345</a></span>
              </p>
              <p className="flex items-center space-x-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{t.propNiraj} <a href="tel:9822309345" className="text-white font-bold underline hover:text-amber-300">9822309345</a></span>
              </p>
            </div>

            {onOpenVisitingCard && (
              <button
                onClick={onOpenVisitingCard}
                className="mt-3 text-[11px] font-bold uppercase tracking-widest bg-white text-neutral-950 px-4 py-2.5 rounded-lg hover:bg-amber-400 transition-all font-extrabold inline-block shadow-md hover:-translate-y-0.5 cursor-pointer"
              >
                📇 {t.visitingCard}
              </button>
            )}
          </div>

          {/* Catalogues Links */}
          <div>
            <h4 className="text-xs font-extrabold text-white uppercase tracking-widest mb-4 flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>{t.navCatalogues}</span>
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400 uppercase tracking-wider">
              <li><button onClick={() => onSelectTab('catalogues')} className="hover:text-amber-300 transition-colors cursor-pointer">{language === 'mr' ? 'ग्रँड जीव्हीटी स्लॅब' : language === 'hi' ? 'ग्रैंड जीवीटी स्लैब' : 'Grand GVT Slabs'}</button></li>
              <li><button onClick={() => onSelectTab('catalogues')} className="hover:text-amber-300 transition-colors cursor-pointer">{language === 'mr' ? 'पॉलिश व्हिट्रिफाइड' : language === 'hi' ? 'पॉलिश विट्रिफाइड' : 'Polished Vitrified'}</button></li>
              <li><button onClick={() => onSelectTab('catalogues')} className="hover:text-amber-300 transition-colors cursor-pointer">{language === 'mr' ? '३D वॉल कॉन्सेप्ट्स' : language === 'hi' ? '3D वॉल कॉन्सेप्ट' : '3D Wall Concepts'}</button></li>
              <li><button onClick={() => onSelectTab('catalogues')} className="hover:text-amber-300 transition-colors cursor-pointer">{language === 'mr' ? 'हेवी ड्युटी आउटडोअर' : language === 'hi' ? 'हेवी ड्यूटी आउटडोर' : 'Heavy Duty Outdoor'}</button></li>
              <li><button onClick={() => onSelectTab('catalogues')} className="hover:text-amber-300 transition-colors cursor-pointer">{language === 'mr' ? 'सॅनिटरीवेअर २०२६' : language === 'hi' ? 'सैनिटरीवेयर 2026' : 'Sanitaryware 2026'}</button></li>
            </ul>
          </div>

          {/* Interactive Tools Links */}
          <div>
            <h4 className="text-xs font-extrabold text-white uppercase tracking-widest mb-4 flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>{t.footerDesignTools}</span>
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400 uppercase tracking-wider">
              <li><button onClick={() => onSelectTab('tileFinder')} className="hover:text-amber-300 transition-colors cursor-pointer">{t.directoryTitle}</button></li>
              <li><button onClick={() => onSelectTab('flipbook')} className="hover:text-amber-300 transition-colors cursor-pointer">{t.btnOpenFlipbook}</button></li>
              <li><button onClick={() => onSelectTab('calculator')} className="hover:text-amber-300 transition-colors cursor-pointer">{t.calcModalTitle}</button></li>
              <li><button onClick={() => onSelectTab('experienceCenter')} className="hover:text-amber-300 transition-colors cursor-pointer">{t.experienceCenterTitle}</button></li>
            </ul>
          </div>

          {/* Dealer & Export Info */}
          <div>
            <h4 className="text-xs font-extrabold text-white uppercase tracking-widest mb-4 flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>{t.footerArchitectSupport}</span>
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400 uppercase tracking-wider">
              <li><button onClick={onOpenDealerModal} className="hover:text-amber-300 transition-colors cursor-pointer">{t.locateDealer}</button></li>
              <li><button onClick={() => onSelectTab('catalogues')} className="hover:text-amber-300 transition-colors cursor-pointer">{t.sampleBasket}</button></li>
              <li><button onClick={onOpenDealerModal} className="hover:text-amber-300 transition-colors cursor-pointer">{language === 'mr' ? 'आर्किटेक्ट्स व बिल्डर्स' : language === 'hi' ? 'आर्किटेक्ट्स एवं बिल्डर्स' : 'Architects & Builders'}</button></li>
              <li><button onClick={onOpenDealerModal} className="hover:text-amber-300 transition-colors cursor-pointer">{language === 'mr' ? 'गुणवत्ता प्रमाणपत्रे' : language === 'hi' ? 'गुणवत्ता मानक' : 'Quality Assurance'}</button></li>
              {onOpenAdminDashboard && (
                <li className="pt-3 border-t border-neutral-800">
                  <button 
                    onClick={onOpenAdminDashboard} 
                    className="text-amber-400 font-bold flex items-center space-x-1.5 hover:underline text-[11px] bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded-md cursor-pointer"
                  >
                    <Lock className="w-3 h-3 text-amber-400" />
                    <span>{t.adminPortal} (8421001308)</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] uppercase tracking-widest text-gray-500 font-bold">
          <p>{t.footerCopyright}</p>
          <div className="flex items-center space-x-6">
            <span className="text-amber-500/80">{t.footerDisclaimer}</span>
            <span>•</span>
            <span>{language === 'mr' ? 'सांगली जिल्हा, महाराष्ट्र' : language === 'hi' ? 'सांगली जिला, महाराष्ट्र' : 'Sangli District, Maharashtra'}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
