import React, { useState, useEffect, useRef } from 'react';
import { X, PhoneCall, MapPin, Share2, Download, QrCode, MessageSquare, ExternalLink, UserPlus, Check, Copy, Sparkles, Smartphone } from 'lucide-react';
import QRCode from 'qrcode';
import { useLanguage } from '../context/LanguageContext';

interface VisitingCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type QRMode = 'vcard' | 'whatsapp' | 'call_ajit' | 'call_niraj' | 'maps';

export const VisitingCardModal: React.FC<VisitingCardModalProps> = ({ isOpen, onClose }) => {
  const { t, language } = useLanguage();
  const [qrMode, setQrMode] = useState<QRMode>('vcard');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const contactVCard = `BEGIN:VCARD
VERSION:3.0
N:Shinde;Ajit & Niraj;;;
FN:Amol Tiles & Granites Jath
ORG:Amol Tiles & Granites
TITLE:Proprietors: Ajit Shinde & Niraj Shinde
TEL;TYPE=WORK,VOICE:+919822090345
TEL;TYPE=CELL,VOICE:+919822309345
ADR;TYPE=WORK:;;Satara Road, Near Bus Stand;Jath;Maharashtra;416404;India
NOTE:Authorized Dealer: Marbito, Warmora, Finolex, Eureka. Tiles, Granite, Marble, Kadappa, Sanitaryware & Plumbing.
URL:https://amoltilesjath.com
END:VCARD`;

  const getQRValue = (mode: QRMode): string => {
    switch (mode) {
      case 'vcard':
        return contactVCard;
      case 'whatsapp':
        return 'https://wa.me/919822309345?text=Hello%20Amol%20Tiles%20Jath,%20I%20visited%20your%20digital%20catalogue%20and%20would%20like%20to%20inquire%20about%20Tiles%20and%20Granite.';
      case 'call_ajit':
        return 'tel:+919822090345';
      case 'call_niraj':
        return 'tel:+919822309345';
      case 'maps':
        return 'https://maps.google.com/?q=Satara+Road+Jath+Sangli+Maharashtra+416404';
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const generateQR = async () => {
      try {
        const text = getQRValue(qrMode);
        const url = await QRCode.toDataURL(text, {
          width: 260,
          margin: 1,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          },
          errorCorrectionLevel: 'M'
        });
        setQrDataUrl(url);
      } catch (err) {
        console.error('QR generation error:', err);
      }
    };

    generateQR();
  }, [isOpen, qrMode]);

  if (!isOpen) return null;

  const handleDownloadVCard = () => {
    const blob = new Blob([contactVCard], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Amol_Tiles_Jath_Contact.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadQR = () => {
    if (!qrDataUrl) return;
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = `Amol_Tiles_QR_${qrMode}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyDetails = () => {
    const details = `AMOL TILES & GRANITES, JATH
📍 Satara Road, Jath, Dist. Sangli - 416404
📞 Pro. Ajit Shinde: +91 9822090345
📞 Pro. Niraj Shinde: +91 9822309345
💬 WhatsApp: https://wa.me/919822309345
⭐ Authorized Dealer: Marbito, Warmora, Finolex, Eureka`;
    
    navigator.clipboard.writeText(details);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: t.brandName,
          text: `${t.brandName} - ${t.brandTagline}. Pro. Ajit Shinde: 9822090345, Pro. Niraj Shinde: 9822309345`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share error:', err);
      }
    } else {
      handleCopyDetails();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto font-devanagari" onClick={onClose}>
      <div 
        className="bg-white border border-gray-200 max-w-lg w-full shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 my-auto rounded-none overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Top Header Bar */}
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-3.5 bg-[#f9fafb]">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-black uppercase tracking-widest text-black flex items-center gap-1.5">
              <QrCode className="w-4 h-4 text-amber-600" />
              {t.cardHeaderTitle}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gray-500 hover:text-black hover:bg-gray-200 rounded transition-colors cursor-pointer"
            aria-label={t.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Visiting Card Reproduction Container */}
        <div className="p-4 sm:p-6 max-h-[85vh] overflow-y-auto">
          <div className="border-2 border-gray-300 p-5 bg-white relative shadow-sm rounded-none font-sans text-center">
            
            {/* Subtle background texture pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

            {/* Top Row: Proprietors */}
            <div className="relative z-10 flex flex-col sm:flex-row justify-between items-center text-[11px] font-bold text-gray-900 border-b border-gray-200 pb-3 mb-4 gap-2 font-devanagari">
              <div className="text-left w-full sm:w-auto bg-amber-50 p-2.5 rounded border border-amber-200 flex-1">
                <p className="text-black font-black text-xs">{t.propAjit}</p>
                <p className="font-mono text-gray-800 font-bold mt-0.5">Mob: <a href="tel:9822090345" className="text-black hover:underline font-extrabold">9822090345</a></p>
              </div>

              <div className="text-right w-full sm:w-auto bg-emerald-50 p-2.5 rounded border border-emerald-200 flex-1">
                <p className="text-black font-black text-xs">{t.propNiraj}</p>
                <p className="font-mono text-gray-800 font-bold mt-0.5">Mob: <a href="tel:9822309345" className="text-black hover:underline font-extrabold">9822309345</a></p>
              </div>
            </div>

            {/* QR Code Generator & Scanner Showcase Box */}
            <div className="relative z-10 my-3 bg-neutral-900 text-white p-4 border border-neutral-800 shadow-md">
              <div className="flex items-center justify-between mb-2.5 border-b border-neutral-700 pb-2">
                <div className="text-left">
                  <div className="text-[11px] font-black tracking-widest uppercase text-amber-400 flex items-center gap-1">
                    <Smartphone className="w-3.5 h-3.5" />
                    {t.qrCodeScan}
                  </div>
                  <p className="text-[10px] text-gray-300 font-devanagari">
                    {language === 'mr' ? 'कॅमेऱ्याने स्कॅन करा व थेट फोनमध्ये सेव्ह करा' : language === 'hi' ? 'कैमरे से स्कैन करें व सीधे फोन में सेव करें' : 'Scan with camera to save contacts directly'}
                  </p>
                </div>

                <button
                  onClick={handleDownloadQR}
                  title="Download QR as Image"
                  className="text-[10px] font-bold uppercase tracking-wider bg-neutral-800 hover:bg-neutral-700 text-gray-200 px-2 py-1 border border-neutral-700 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Download className="w-3 h-3" />
                  Save QR
                </button>
              </div>

              {/* Interactive QR Modes */}
              <div className="flex flex-wrap gap-1 justify-center mb-3">
                <button
                  onClick={() => setQrMode('vcard')}
                  className={`text-[10px] px-2.5 py-1 font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                    qrMode === 'vcard'
                      ? 'bg-amber-500 text-black border-amber-400 font-black shadow-sm'
                      : 'bg-neutral-800 text-gray-300 border-neutral-700 hover:bg-neutral-700'
                  }`}
                >
                  📇 vCard
                </button>
                <button
                  onClick={() => setQrMode('whatsapp')}
                  className={`text-[10px] px-2.5 py-1 font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                    qrMode === 'whatsapp'
                      ? 'bg-emerald-500 text-black border-emerald-400 font-black shadow-sm'
                      : 'bg-neutral-800 text-gray-300 border-neutral-700 hover:bg-neutral-700'
                  }`}
                >
                  💬 WhatsApp
                </button>
                <button
                  onClick={() => setQrMode('call_ajit')}
                  className={`text-[10px] px-2.5 py-1 font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                    qrMode === 'call_ajit'
                      ? 'bg-sky-500 text-black border-sky-400 font-black shadow-sm'
                      : 'bg-neutral-800 text-gray-300 border-neutral-700 hover:bg-neutral-700'
                  }`}
                >
                  📞 Ajit
                </button>
                <button
                  onClick={() => setQrMode('call_niraj')}
                  className={`text-[10px] px-2.5 py-1 font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                    qrMode === 'call_niraj'
                      ? 'bg-teal-500 text-black border-teal-400 font-black shadow-sm'
                      : 'bg-neutral-800 text-gray-300 border-neutral-700 hover:bg-neutral-700'
                  }`}
                >
                  📞 Niraj
                </button>
                <button
                  onClick={() => setQrMode('maps')}
                  className={`text-[10px] px-2.5 py-1 font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                    qrMode === 'maps'
                      ? 'bg-rose-500 text-black border-rose-400 font-black shadow-sm'
                      : 'bg-neutral-800 text-gray-300 border-neutral-700 hover:bg-neutral-700'
                  }`}
                >
                  🗺️ Google Map
                </button>
              </div>

              {/* QR Image Render with decorative frame */}
              <div className="flex justify-center my-2">
                <div className="p-2 bg-white inline-block shadow-lg border-2 border-amber-400 relative group">
                  {qrDataUrl ? (
                    <img
                      src={qrDataUrl}
                      alt={`Amol Tiles QR Code (${qrMode})`}
                      className="w-36 h-36 sm:w-40 sm:h-40 object-contain mx-auto block"
                    />
                  ) : (
                    <div className="w-36 h-36 sm:w-40 sm:h-40 bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                      Generating QR...
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-1 text-[9px] font-black tracking-widest text-black bg-white/90 uppercase text-center py-0.5">
                    AMOL TILES JATH
                  </div>
                </div>
              </div>

              {/* Direct Save vCard / Add Contact Button */}
              <div className="mt-3 flex flex-col sm:flex-row gap-2 justify-center">
                <button
                  onClick={handleDownloadVCard}
                  className="py-2 px-3 bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow-sm cursor-pointer"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>{t.cardSaveContact}</span>
                </button>
                
                <button
                  onClick={handleCopyDetails}
                  className="py-2 px-3 bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs uppercase tracking-wider border border-neutral-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? (language === 'mr' ? 'नंबर कॉपी झाले!' : language === 'hi' ? 'नंबर कॉपी हुए!' : 'Copied!') : (language === 'mr' ? 'नंबर कॉपी करा' : language === 'hi' ? 'नंबर कॉपी करें' : 'Copy Numbers')}</span>
                </button>
              </div>
            </div>

            {/* Brand Title */}
            <div className="relative z-10 my-2">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight uppercase font-sans">
                Amol
              </h2>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-wide uppercase">
                Tiles, Jath
              </h3>
              <p className="text-xs font-serif italic text-gray-600 mt-0.5 font-devanagari">
                ( {t.brandName} )
              </p>
            </div>

            {/* Tagline */}
            <div className="relative z-10 my-2">
              <p className="text-[10px] font-black uppercase tracking-widest text-black border-y border-black py-1 inline-block px-4 font-devanagari">
                {t.heroBadge}
              </p>
            </div>

            {/* Product Offerings List */}
            <div className="relative z-10 my-3 space-y-0.5 font-devanagari">
              <p className="text-xs sm:text-sm font-extrabold text-gray-900 tracking-wide uppercase leading-relaxed">
                {t.brandTagline}
              </p>
            </div>

            {/* Address Bar */}
            <div className="relative z-10 mt-4 bg-black text-white p-2.5 font-semibold text-[11px] sm:text-xs tracking-wider uppercase flex items-center justify-center space-x-2">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Satara Road, Jath. Tq. Jath, Dist. Sangli - 416404</span>
            </div>

          </div>

          {/* Quick Action Dial Buttons */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs uppercase font-bold tracking-widest">
            <a
              href="tel:9822090345"
              className="py-2.5 px-3 bg-black text-white text-center flex items-center justify-center space-x-2 hover:bg-amber-600 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{t.propAjit} 9822090345</span>
            </a>

            <a
              href="tel:9822309345"
              className="py-2.5 px-3 bg-black text-white text-center flex items-center justify-center space-x-2 hover:bg-emerald-600 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{t.propNiraj} 9822309345</span>
            </a>

            <a
              href="https://wa.me/919822309345?text=Hello%20Amol%20Tiles%20Jath,%20I%20visited%20your%20digital%20catalogue%20and%20would%20like%20to%20inquire%20about%20Tiles%20and%20Granite."
              target="_blank"
              rel="noreferrer"
              className="py-2.5 px-3 border border-emerald-600 bg-emerald-50 text-emerald-900 text-center flex items-center justify-center space-x-2 hover:bg-emerald-600 hover:text-white transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t.cardShareWhatsapp}</span>
            </a>

            <button
              onClick={handleShare}
              className="py-2.5 px-3 border border-black text-black text-center flex items-center justify-center space-x-2 hover:bg-black hover:text-white transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? 'कार्ड शेअर करा' : language === 'hi' ? 'कार्ड साझा करें' : 'Share Visiting Card'}</span>
            </button>
          </div>

          <div className="mt-3 text-center">
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent('Satara Road, Jath. Tq. Jath, Dist. Sangli - 416404')}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-1 text-[11px] font-bold uppercase tracking-widest text-black hover:underline hover:text-amber-600"
            >
              <span>{t.cardGetLocation}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};
