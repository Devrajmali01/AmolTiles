import React, { useState } from 'react';
import { X, Send, CheckCircle2, AlertCircle, Phone, Mail, User, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const { t, language, translateApiError } = useLanguage();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('Tiles & GVT Slabs Inquiry');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successData, setSuccessData] = useState<any | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError(t.valNameRequired);
      return;
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setError(t.valPhoneInvalid);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: name,
          customerPhone: phone,
          customerEmail: email,
          category,
          customerMessage: message
        })
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok && data.success) {
        setSuccessData(data.contact);
      } else {
        setError(translateApiError(data.error || t.apiErrorServer));
      }
    } catch {
      setLoading(false);
      setError(t.apiErrorConnection);
    }
  };

  const handleReset = () => {
    setSuccessData(null);
    setName('');
    setPhone('');
    setEmail('');
    setMessage('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn font-devanagari">
      <div className="bg-white border border-gray-200 w-full max-w-lg shadow-2xl overflow-hidden rounded-xl">
        
        {/* Header */}
        <div className="bg-black text-white p-4 px-6 flex items-center justify-between">
          <div>
            <span className="text-[9px] text-amber-400 font-bold uppercase tracking-widest block">
              {language === 'mr' ? 'फ्लॅगशिप सेंटर • जत' : language === 'hi' ? 'फ्लैगशिप सेंटर • जत' : 'Flagship Center • Jath'}
            </span>
            <h3 className="text-sm font-bold uppercase tracking-wider">
              {t.enquiryModalTitle}
            </h3>
          </div>

          <button onClick={onClose} className="p-1 text-gray-400 hover:text-white transition-colors cursor-pointer" aria-label={t.close}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {successData ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-12 h-12 bg-black text-white mx-auto flex items-center justify-center rounded-full">
                <CheckCircle2 className="w-7 h-7 text-emerald-400" />
              </div>

              <div>
                <h4 className="text-lg font-bold text-gray-900 tracking-tight">
                  {t.enquirySuccessTitle}
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  {t.enquirySuccessDesc}
                </p>
              </div>

              <div className="p-4 bg-gray-50 border border-gray-200 max-w-sm mx-auto text-left text-xs space-y-1.5 font-mono rounded-lg">
                <p className="flex justify-between">
                  <span className="text-gray-500">{t.referenceId}:</span>
                  <span className="font-bold text-amber-700">{successData.id}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-500">{t.fullName}:</span>
                  <span className="font-bold text-black">{successData.customerName}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-500">{t.mobileNumber}:</span>
                  <span className="font-bold text-black">{successData.customerPhone}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-500">Status:</span>
                  <span className="font-bold text-green-700">Dispatched to Ajit & Niraj Shinde</span>
                </p>
              </div>

              <button
                onClick={handleReset}
                className="px-6 py-2.5 bg-black text-white text-xs uppercase font-bold tracking-widest hover:bg-gray-800 transition-colors cursor-pointer rounded-md"
              >
                {t.close}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <p className="text-xs text-gray-600 mb-2 font-medium">
                {t.enquiryModalSubtitle}
              </p>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-800 text-xs flex items-center space-x-2 rounded-md">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-1">
                    {t.fullName} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={language === 'mr' ? 'उदा. सुरेश शिंदे' : language === 'hi' ? 'उदा. सुरेश शिंदे' : 'e.g. Suresh Shinde'}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2.5 border border-gray-300 focus:outline-none focus:border-black text-xs rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-1">
                    {t.mobileNumber} *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="98XXXXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2.5 border border-gray-300 focus:outline-none focus:border-black text-xs rounded-md"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-1">
                    {t.emailAddress}
                  </label>
                  <input
                    type="email"
                    placeholder="name@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2.5 border border-gray-300 focus:outline-none focus:border-black text-xs rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-1">
                    {t.inquiryCategory}
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2.5 border border-gray-300 focus:outline-none focus:border-black text-xs uppercase rounded-md bg-white"
                  >
                    <option value="Tiles & GVT Slabs Inquiry">{t.catGvt}</option>
                    <option value="Black Granite & Kadappa Stone">{t.catGranite}</option>
                    <option value="Heavy Duty Outdoor Pavers">{t.navOutdoorTiles}</option>
                    <option value="Sanitaryware & Finolex Plumbing">{t.catSanitary}</option>
                    <option value="Architect & Wholesale Project Deal">{language === 'mr' ? 'आर्किटेक्ट व होलसेल प्रकल्प' : language === 'hi' ? 'आर्किटेक्ट एवं थोक परियोजना' : 'Architect / Wholesale Project'}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-1">
                  {t.yourMessage} *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder={language === 'mr' ? 'खोलीचे क्षेत्रफळ (चौ.फूट), डिझाईन किंवा साईटचे ठिकाण नमूद करा...' : language === 'hi' ? 'कमरे का आकार (वर्ग फुट), डिजाइन या साइट का स्थान लिखें...' : 'Describe your room dimensions (sq.ft), preferred design looks, or delivery destination...'}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 focus:outline-none focus:border-black text-xs leading-relaxed rounded-md"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-black text-white text-xs uppercase font-bold tracking-widest hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2 cursor-pointer rounded-md disabled:opacity-60"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{loading ? (language === 'mr' ? 'पाठवत आहे...' : language === 'hi' ? 'भेजा जा रहा है...' : 'Submitting Enquiry...') : t.btnSubmitEnquiry}</span>
                </button>
              </div>

              <p className="text-[10px] text-gray-400 text-center uppercase tracking-wider font-semibold">
                Direct WhatsApp Hotline: <strong>8421001308</strong> / <strong>9822309345</strong>
              </p>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
