import React from 'react';
import { MapPin, PhoneCall, CheckCircle2, Building2 } from 'lucide-react';
import { Interactive3DCard } from './Interactive3DCard';
import { useLanguage } from '../context/LanguageContext';

interface ShowroomSpotlightProps {
  onOpenVisitingCard: () => void;
  onExploreCatalogues: () => void;
}

export const ShowroomSpotlight: React.FC<ShowroomSpotlightProps> = ({
  onOpenVisitingCard,
  onExploreCatalogues
}) => {
  const { t, language } = useLanguage();

  // Store photo path
  const shopPhotoUrl = '/src/assets/images/regenerated_image_1787245810395.png';

  const tileBrands = ['Marbito', 'Signova', 'Warmora', 'Wellnato'];
  const granites = ['Pearl Black', 'Steel Gray', 'Z Black', 'Silvassa Red', 'Lakha Red'];
  const plumbingAndTanks = [
    { name: 'Finolex', category: language === 'mr' ? 'पीव्हीसी / सीपीव्हीसी पाईप्स' : language === 'hi' ? 'पीवीसी / सीपीवीसी पाइप्स' : 'PVC / CPVC Pipes & Plumbing' },
    { name: 'Rainbow', category: language === 'mr' ? 'हेवी ड्युटी वॉटर टँक्स' : language === 'hi' ? 'हैवी ड्यूटी वाटर टैंक्स' : 'Heavy Duty Water Tanks' }
  ];
  const bathroomAndKitchenSinks = [
    { name: 'Eureka', desc: language === 'mr' ? 'स्टेनलेस स्टील व डिझायनर सिंक' : language === 'hi' ? 'स्टेनलेस स्टील व डिजाइनर सिंक' : 'Stainless Steel & Designer Sinks' },
    { name: 'Squad', desc: language === 'mr' ? 'आधुनिक बाथरूम फिटिंग्स' : language === 'hi' ? 'आधुनिक बाथरूम फिटिंग्स' : 'Modern Bathroom & Kitchen Fixtures' },
    { name: 'Jindal', desc: language === 'mr' ? 'प्रीमियम स्टील सिंकवेअर' : language === 'hi' ? 'प्रीमियम स्टील सिंकवेयर' : 'Premium Stainless Steel Sinkware' }
  ];

  return (
    <section className="bg-white py-14 px-4 sm:px-10 border-b border-gray-200/90 relative overflow-hidden font-devanagari">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -top-40 right-10 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        
        {/* Main Heading & Store Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: 3D Interactive Showroom & Stock Yard Card */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <Interactive3DCard maxTilt={5} glareEffect={true} className="rounded-2xl overflow-hidden shadow-xl">
              <div className="relative bg-gray-950 group overflow-hidden h-[360px] sm:h-[450px] border border-gray-900 rounded-2xl">
                
                {/* Cropped Photo */}
                <img
                  src={shopPhotoUrl}
                  alt="Amol Tiles Showroom & Yard, Satara Road Jath"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-[center_28%] group-hover:scale-105 transition-transform duration-700"
                />

                {/* 3D Vignette & Glass Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                {/* Top Floating Glass Badge */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-white">
                  <span className="bg-black/80 backdrop-blur-md text-white px-3 py-1.5 rounded-full border border-white/20 flex items-center space-x-1.5 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="font-extrabold text-amber-300">{t.spotlightShowroom}</span>
                  </span>
                  <span className="bg-black/70 backdrop-blur-md text-gray-200 px-3 py-1 rounded-full hidden sm:inline-block border border-white/10 font-mono">
                    {language === 'mr' ? 'सातारा रोड, जत' : language === 'hi' ? 'सातारा रोड, जत' : 'Satara Road, Jath'}
                  </span>
                </div>

                {/* Bottom Information Layer Over Image */}
                <div className="absolute bottom-5 left-5 right-5 text-white space-y-2">
                  <div className="flex items-center space-x-2 text-xs font-serif italic text-amber-300">
                    <span>{t.brandName}</span>
                    <span>•</span>
                    <span>PREMIUM QUALITY • DIRECT DEALER</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white leading-tight font-devanagari">
                    {t.brandName}
                  </h3>
                  <p className="text-[11px] uppercase tracking-wider text-gray-300 font-medium font-devanagari">
                    {t.brandTagline}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-2 text-[10px] uppercase font-bold tracking-widest font-devanagari">
                    <button
                      onClick={onOpenVisitingCard}
                      className="bg-white text-black px-4 py-2.5 rounded-lg hover:bg-amber-400 font-extrabold transition-all shadow-md hover:-translate-y-0.5 cursor-pointer"
                    >
                      📇 {t.visitingCard}
                    </button>
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent('Satara Road, Jath. Tq. Jath, Dist. Sangali - 416404')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-black/80 backdrop-blur-md border border-white/30 text-white px-4 py-2.5 rounded-lg hover:bg-black transition-all flex items-center space-x-1.5 shadow-md hover:-translate-y-0.5 cursor-pointer"
                    >
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      <span>{t.locateDealer}</span>
                    </a>
                  </div>
                </div>
              </div>
            </Interactive3DCard>

            {/* Sub-caption bar with subtle depth */}
            <div className="bg-[#f9fafb] border border-gray-200/90 rounded-xl p-3.5 mt-3 flex flex-wrap justify-between items-center text-[11px] font-bold uppercase tracking-widest text-gray-700 gap-2 shadow-xs font-devanagari">
              <span className="flex items-center text-black">
                <Building2 className="w-3.5 h-3.5 mr-1.5 text-black" />
                {t.spotlightShowroom}
              </span>
              <span className="text-gray-500 font-mono text-xs">
                {t.spotlightAddress}
              </span>
            </div>
          </div>

          {/* Right Column: Authorized Brands & Materials Directory with 3D Depth */}
          <div className="lg:col-span-5 bg-gradient-to-br from-white to-[#f9fafb] border border-gray-200/90 rounded-2xl p-6 flex flex-col justify-between space-y-6 shadow-md font-devanagari">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="w-2.5 h-2.5 bg-amber-500 rounded-full"></span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500">
                  {language === 'mr' ? 'अधिकृत ब्रँड्स व प्रॉडक्ट्स' : language === 'hi' ? 'अधिकृत ब्रांड्स व प्रॉडक्ट्स' : 'Authorized Brands & Products'}
                </span>
              </div>
              <h2 className="text-2xl font-serif italic text-gray-900 leading-tight">
                {language === 'mr' ? 'अमोल टाईल्स येथे उपलब्ध दर्जेदार साहित्य' : language === 'hi' ? 'अमोल टाइल्स पर उपलब्ध गुणवत्तापूर्ण सामग्री' : 'Quality Materials Available at Amol Tiles'}
              </h2>
              <p className="text-xs text-gray-600 uppercase tracking-widest mt-1 font-medium">
                {language === 'mr' ? 'नामवंत टाईल्स, नॅचरल ग्रॅनाइट, प्लंबिंग सिस्टिम्स, पाण्याच्या टाक्या व सिंकवेअर.' : language === 'hi' ? 'प्रमुख टाइल्स, नेचुरल ग्रेनाइट, प्लंबिंग सिस्टम्स, पानी की टंकियां व सिंकवेयर।' : 'Top tile brands, natural granite colors, plumbing systems, tanks & kitchen sinkware.'}
              </p>
            </div>

            {/* Brands & Categories Grid */}
            <div className="space-y-4 text-xs">
              
              {/* Tile Brands */}
              <div className="border-b border-gray-200/80 pb-3.5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-black mb-2 flex items-center">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
                  {language === 'mr' ? 'टाईल्स ब्रँड्स' : language === 'hi' ? 'टाइल्स ब्रांड्स' : 'Tiles Brands'}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {tileBrands.map((brand) => (
                    <span
                      key={brand}
                      className="bg-white border border-gray-200 text-black px-3 py-1 rounded-md text-[11px] font-extrabold uppercase tracking-wider shadow-xs hover:border-black hover:-translate-y-0.5 transition-all"
                    >
                      {brand}
                    </span>
                  ))}
                </div>
              </div>

              {/* Granites Available */}
              <div className="border-b border-gray-200/80 pb-3.5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-black mb-2 flex items-center">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
                  {language === 'mr' ? 'उपलब्ध ग्रॅनाइट कलर्स' : language === 'hi' ? 'उपलब्ध ग्रेनाइट कलर्स' : 'Granite Colors Available'}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {granites.map((granite) => (
                    <span
                      key={granite}
                      className="bg-neutral-900 text-white px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider shadow-xs hover:bg-black transition-colors"
                    >
                      {granite}
                    </span>
                  ))}
                </div>
              </div>

              {/* Plumbing & Tanks */}
              <div className="border-b border-gray-200/80 pb-3.5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-black mb-2 flex items-center">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
                  {language === 'mr' ? 'प्लंबिंग व वॉटर टँक्स' : language === 'hi' ? 'प्लंबिंग एवं वाटर टैंक्स' : 'Plumbing & Water Tanks'}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {plumbingAndTanks.map((item) => (
                    <div key={item.name} className="bg-white p-2.5 rounded-lg border border-gray-200 shadow-xs">
                      <span className="font-extrabold text-black uppercase block">{item.name}</span>
                      <span className="text-[9px] text-gray-500 uppercase tracking-widest block">{item.category}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bathroom & Kitchen Sinks */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-black mb-2 flex items-center">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
                  {language === 'mr' ? 'बाथरूम व किचन सिंक' : language === 'hi' ? 'बाथरूम व किचन सिंक' : 'Bathroom Material & Kitchen Sinks'}
                </p>
                <div className="grid grid-cols-3 gap-2 text-center">
                  {bathroomAndKitchenSinks.map((sink) => (
                    <div key={sink.name} className="bg-white p-2.5 rounded-lg border border-gray-200 shadow-xs">
                      <span className="font-extrabold text-black uppercase block">{sink.name}</span>
                      <span className="text-[8px] text-gray-500 uppercase tracking-tight block">{sink.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Proprietor Contact Bar */}
            <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-xs flex flex-wrap justify-between items-center text-xs uppercase tracking-wider font-bold">
              <div>
                <span className="text-gray-500 text-[10px] block">{t.propAjit}</span>
                <a href="tel:9822090345" className="text-black font-extrabold font-mono hover:underline text-xs">📞 9822090345</a>
              </div>
              <div>
                <span className="text-gray-500 text-[10px] block">{t.propNiraj}</span>
                <a href="tel:9822309345" className="text-black font-extrabold font-mono hover:underline text-xs">📞 9822309345</a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
