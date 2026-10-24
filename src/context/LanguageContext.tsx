import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, TRANSLATIONS, Translations } from '../data/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  formatNumber: (num: number, options?: Intl.NumberFormatOptions) => string;
  formatDate: (date: Date | string, options?: Intl.DateTimeFormatOptions) => string;
  formatCurrency: (amount: number) => string;
  translateApiError: (codeOrMsg: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('amol_tiles_lang');
    if (saved === 'mr' || saved === 'hi' || saved === 'en') {
      return saved;
    }
    // Default to Marathi as preferred by showroom location (Jath, Maharashtra) or fallback to 'en'
    return 'mr';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('amol_tiles_lang', lang);
  };

  useEffect(() => {
    // Update HTML lang attribute
    document.documentElement.lang = language;

    // Apply Devanagari font and language classes to body
    document.body.classList.remove('lang-en', 'lang-mr', 'lang-hi');
    document.body.classList.add(`lang-${language}`);

    if (language === 'mr' || language === 'hi') {
      document.body.classList.add('font-devanagari');
    } else {
      document.body.classList.remove('font-devanagari');
    }

    // Dynamic Title & Meta Description update based on language
    const titles: Record<Language, string> = {
      en: "Amol Tiles & Granites Jath | Authorized Dealer",
      mr: "अमोल टाईल्स आणि ग्रॅनाइट्स जत | अधिकृत डीलर",
      hi: "अमोल टाइल्स एवं ग्रेनाइट्स जत | अधिकृत डीलर"
    };
    document.title = titles[language];

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      const descriptions: Record<Language, string> = {
        en: "Official catalog, vitrified slab directory, box quantity calculator, and showroom appointment booking for Amol Tiles, Jath.",
        mr: "अमोल टाईल्स, जत यांचे अधिकृत डिजिटल कॅटलॉग, व्हिट्रिफाइड स्लॅब्स, मोजणी कॅल्क्युलेटर आणि शोरूम संपर्क.",
        hi: "अमोल टाइल्स, जत का आधिकारिक डिजिटल कैटलॉग, विट्रिफाइड स्लैब, बॉक्स कैलकुलेटर और शोरूम संपर्क।"
      };
      metaDesc.setAttribute('content', descriptions[language]);
    }
  }, [language]);

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  // Regional number formatting (en-IN, mr-IN, hi-IN)
  const getLocale = (lang: Language): string => {
    if (lang === 'mr') return 'mr-IN';
    if (lang === 'hi') return 'hi-IN';
    return 'en-IN';
  };

  const formatNumber = (num: number, options?: Intl.NumberFormatOptions): string => {
    try {
      return new Intl.NumberFormat(getLocale(language), options).format(num);
    } catch {
      return String(num);
    }
  };

  const formatDate = (date: Date | string, options?: Intl.DateTimeFormatOptions): string => {
    try {
      const d = typeof date === 'string' ? new Date(date) : date;
      const defaultOptions: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        ...options
      };
      return new Intl.DateTimeFormat(getLocale(language), defaultOptions).format(d);
    } catch {
      return String(date);
    }
  };

  const formatCurrency = (amount: number): string => {
    try {
      return new Intl.NumberFormat(getLocale(language), {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
      }).format(amount);
    } catch {
      return `₹${amount}`;
    }
  };

  const translateApiError = (codeOrMsg: string): string => {
    if (!codeOrMsg) return t.apiErrorServer;
    const clean = codeOrMsg.trim();
    const upper = clean.toUpperCase();
    
    // Explicit API Code mapping
    if (upper === 'INVALID_EMAIL') return t.codeInvalidEmail;
    if (upper === 'INVALID_PHONE') return t.codeInvalidPhone;
    if (upper === 'NAME_REQUIRED') return t.codeNameRequired;
    if (upper === 'USER_NOT_FOUND') return t.codeUserNotFound;
    if (upper === 'INCORRECT_PASSWORD' || upper === 'INVALID_CREDENTIALS') return t.codeIncorrectPassword;
    if (upper === 'ACCOUNT_EXISTS') return t.codeAccountExists;
    if (upper === 'DUPLICATE_SUBMISSION') return t.codeDuplicateSubmission;
    if (upper === 'RECORD_SAVED' || upper === 'SUCCESS') return t.codeRecordSaved;
    if (upper === 'LOGIN_SUCCESS') return t.codeLoginSuccess;
    if (upper === 'ENQUIRY_SUCCESS') return t.codeEnquirySuccess;
    if (upper === 'BOOKING_SUCCESS') return t.codeBookingSuccess;
    if (upper === 'SERVER_ERROR') return t.apiErrorServer;

    // Fuzzy text matching
    const lower = clean.toLowerCase();
    if (lower.includes('network') || lower.includes('connection')) return t.apiErrorConnection;
    if (lower.includes('already exists') || lower.includes('account with this')) return t.codeAccountExists;
    if (lower.includes('not found') || lower.includes('user not found')) return t.codeUserNotFound;
    if (lower.includes('password') || lower.includes('invalid credentials')) return t.codeIncorrectPassword;
    if (lower.includes('name')) return t.codeNameRequired;
    if (lower.includes('phone') || lower.includes('mobile')) return t.codeInvalidPhone;
    if (lower.includes('email')) return t.codeInvalidEmail;
    if (lower.includes('wait') || lower.includes('duplicate')) return t.codeDuplicateSubmission;
    if (lower.includes('server')) return t.apiErrorServer;

    return codeOrMsg;
  };

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage,
      t,
      formatNumber,
      formatDate,
      formatCurrency,
      translateApiError
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
