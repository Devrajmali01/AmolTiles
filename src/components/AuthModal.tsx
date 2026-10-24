import React, { useState } from 'react';
import { X, User, Phone, Mail, Lock, ShieldCheck, CheckCircle2, AlertCircle, Building } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: any) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const { t, language, translateApiError } = useLanguage();
  const [mode, setMode] = useState<'login' | 'register'>('register');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<'customer' | 'architect' | 'dealer' | 'builder'>('customer');
  const [password, setPassword] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

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
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          role,
          password
        })
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok && data.success) {
        setSuccessMsg(t.authSuccess);
        onLoginSuccess(data.user);
        setTimeout(() => {
          onClose();
        }, 1200);
      } else {
        setError(translateApiError(data.error || t.apiErrorServer));
      }
    } catch {
      setLoading(false);
      setError(t.apiErrorConnection);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: email || phone,
          password
        })
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok && data.success) {
        setSuccessMsg(t.authSuccess);
        onLoginSuccess(data.user);
        setTimeout(() => {
          onClose();
        }, 800);
      } else {
        setError(translateApiError(data.error || t.apiIncorrectPassword));
      }
    } catch {
      setLoading(false);
      setError(t.apiErrorConnection);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn font-devanagari">
      <div className="bg-white border border-gray-200 w-full max-w-md shadow-2xl overflow-hidden rounded-xl">
        
        {/* Header */}
        <div className="bg-black text-white p-4 px-6 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-7 h-7 bg-white text-black font-bold flex items-center justify-center text-xs rounded">
              AT
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider">
                {mode === 'register' ? t.registerTitle : t.signInTitle}
              </h3>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-serif">
                {t.brandName}
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-1 text-gray-400 hover:text-white transition-colors cursor-pointer" aria-label={t.close}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="grid grid-cols-2 border-b border-gray-200 text-xs font-bold uppercase tracking-wider">
          <button
            onClick={() => { setMode('register'); setError(''); }}
            className={`py-3 text-center transition-colors cursor-pointer ${
              mode === 'register' ? 'bg-white text-black border-b-2 border-black font-extrabold' : 'bg-gray-50 text-gray-500 hover:text-black'
            }`}
          >
            {t.tabRegister}
          </button>
          <button
            onClick={() => { setMode('login'); setError(''); }}
            className={`py-3 text-center transition-colors cursor-pointer ${
              mode === 'login' ? 'bg-white text-black border-b-2 border-black font-extrabold' : 'bg-gray-50 text-gray-500 hover:text-black'
            }`}
          >
            {t.tabSignIn}
          </button>
        </div>

        {/* Body Form */}
        <div className="p-6">
          {successMsg && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-800 text-xs flex items-center space-x-2 rounded-md">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-800 text-xs flex items-center space-x-2 rounded-md">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          {mode === 'register' ? (
            <form onSubmit={handleRegister} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-1">
                  {t.fullName} *
                </label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder={language === 'mr' ? 'उदा. आर्किटेक्ट राजेश पाटील' : language === 'hi' ? 'उदा. आर्किटेक्ट राजेश पाटिल' : 'e.g. Architect Rajesh Patel'}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 p-2.5 border border-gray-300 focus:outline-none focus:border-black text-xs rounded-md"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-1">
                    {t.mobileNumber} *
                  </label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="98XXXXXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 p-2.5 border border-gray-300 focus:outline-none focus:border-black text-xs rounded-md"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-1">
                    {t.emailAddress} *
                  </label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="name@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 p-2.5 border border-gray-300 focus:outline-none focus:border-black text-xs rounded-md"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-1">
                  {t.professionRole}
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as any)}
                  className="w-full p-2.5 border border-gray-300 focus:outline-none focus:border-black text-xs uppercase rounded-md bg-white"
                >
                  <option value="customer">{t.roleHomeowner}</option>
                  <option value="architect">{t.roleArchitect}</option>
                  <option value="builder">{t.roleBuilder}</option>
                  <option value="dealer">{t.roleDealer}</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-1">
                  {t.createPassword} *
                </label>
                <div className="relative">
                  <Lock className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 p-2.5 border border-gray-300 focus:outline-none focus:border-black text-xs rounded-md"
                  />
                </div>
                <span className="text-[10px] text-gray-400 mt-1 block">
                  {language === 'mr' ? 'सुरक्षित एन्क्रिप्ट केले जाईल. पासवर्ड कोणाशीही शेअर केला जात नाही.' : language === 'hi' ? 'सुरक्षित रूप से एन्क्रिप्टेड। पासवर्ड किसी के साथ साझा नहीं किया जाता।' : 'Encrypted securely. Password is never shared or stored in notifications.'}
                </span>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-black text-white text-xs uppercase font-bold tracking-widest hover:bg-gray-800 transition-colors cursor-pointer rounded-md disabled:opacity-60"
                >
                  {loading ? (language === 'mr' ? 'खाते तयार करत आहे...' : language === 'hi' ? 'खाता बनाया जा रहा है...' : 'Creating Account...') : t.btnCreateAccount}
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4 text-xs">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-1">
                  {t.identifierPlaceholder} *
                </label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder={t.identifierPlaceholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 p-2.5 border border-gray-300 focus:outline-none focus:border-black text-xs rounded-md"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-1">
                  {t.passwordPlaceholder} *
                </label>
                <div className="relative">
                  <Lock className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 p-2.5 border border-gray-300 focus:outline-none focus:border-black text-xs rounded-md"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-black text-white text-xs uppercase font-bold tracking-widest hover:bg-gray-800 transition-colors cursor-pointer rounded-md disabled:opacity-60"
                >
                  {loading ? (language === 'mr' ? 'तपासत आहे...' : language === 'hi' ? 'प्रमाणीकृत किया जा रहा है...' : 'Authenticating...') : t.btnSignIn}
                </button>
              </div>
            </form>
          )}

          <div className="mt-4 pt-3 border-t border-gray-100 text-center">
            <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">
              {t.authorizedDealer}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
