import React, { useState } from 'react';
import { 
  MapPin, 
  PhoneCall, 
  Mail, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  Calendar, 
  User, 
  Building2, 
  Navigation, 
  Layers, 
  ShieldCheck, 
  Compass, 
  Code, 
  AlertCircle 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ExperienceCenterProps {
  onOpenSampleDrawer: () => void;
  onOpenVisitingCard?: () => void;
}

export const ExperienceCenter: React.FC<ExperienceCenterProps> = ({
  onOpenSampleDrawer,
  onOpenVisitingCard
}) => {
  const { t, language, translateApiError } = useLanguage();
  // Appointment Form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    timeSlot: '11:00 AM - 01:00 PM',
    collection: 'Tiles, Granite & Marble Slabs',
    notes: ''
  });

  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState('');
  const [confirmedAptId, setConfirmedAptId] = useState('');
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

  const galleryImages = [
    {
      url: '/src/assets/images/regenerated_image_1787245810395.png',
      title: 'Amol Tiles, Jath Showroom Exterior',
      desc: 'Modern 2-story glass facade experience center on Satara Road, Jath'
    },
    {
      url: '/src/assets/images/regenerated_image_1787246045342.png',
      title: 'Granite & Marble Slabs Display',
      desc: 'Polished vitrified slabs, Italian marble, and Kadappa stone stacks'
    },
    {
      url: '/src/assets/images/amol_catalog_cover_wall_1784971081615.jpg',
      title: '3D Bathroom & Sanitaryware Studio',
      desc: 'Plumbing fittings, art basins, and designer wall concepts'
    }
  ];

  const experienceCentersList = [
    {
      id: 'ec-jath',
      name: 'Amol Tiles, Jath (अमोल टाईल्स)',
      address: 'Satara Road, Jath. Tq. Jath, Dist. Sangali - 416404',
      phone: 'Pro. Ajit Shinde: +91 9822090345 | Pro. Niraj Shinde: +91 9822309345',
      email: 'jath.showroom@amoltiles.com',
      hours: 'Mon - Sun: 8:30 AM - 8:30 PM',
      area: 'Flagship Showroom',
      features: ['Tiles & Granite Display', 'Marble & Kadappa Stone', 'Sanitaryware & Plumbing Suite', 'On-Site Delivery']
    }
  ];

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookingError('');
    if (!formData.name || !formData.phone || !formData.date) {
      setBookingError('Name, mobile number, and preferred date are required.');
      return;
    }

    setBookingLoading(true);
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: formData.name,
          customerPhone: formData.phone,
          customerEmail: formData.email,
          service: formData.collection,
          appointmentDate: formData.date,
          appointmentTime: formData.timeSlot,
          customerMessage: formData.notes
        })
      });

      const data = await res.json();
      setBookingLoading(false);

      if (res.ok && data.success) {
        setConfirmedAptId(data.appointment.id);
        setBookingSuccess(true);
      } else {
        setBookingError(data.error || 'Failed to submit appointment. Please try again.');
      }
    } catch (err: any) {
      setBookingLoading(false);
      setBookingError('Network error while scheduling appointment. Please try again.');
    }
  };

  return (
    <div className="py-10 bg-white min-h-screen text-gray-900 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-10">
        
        {/* Technology Architecture & Card Header Banner */}
        <div className="bg-[#f9fafb] border border-gray-200 p-4 mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-black text-white flex items-center justify-center font-mono text-xs font-bold">
              AT
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-black">
                Amol Tiles, Jath (अमोल टाईल्स, जत) • PREMIUM QUALITY PREMIUM SERVICE
              </p>
              <p className="text-[10px] text-gray-500 uppercase tracking-wider">
                Tiles, Granite, Marble, Kadappa, Sanitaryware & Plumbing Available
              </p>
            </div>
          </div>
          {onOpenVisitingCard && (
            <button
              onClick={onOpenVisitingCard}
              className="text-[10px] font-mono bg-black text-white px-3 py-1.5 uppercase tracking-widest hover:bg-gray-800 transition-colors"
            >
              📇 Digital Visiting Card
            </button>
          )}
        </div>

        {/* Page Header */}
        <div className="mb-10">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
            Satara Road, Jath • Official Experience Center
          </p>
          <h1 className="text-3xl sm:text-4xl font-serif italic text-gray-900">
            Amol Tiles, Jath (अमोल टाईल्स, जत)
          </h1>
          <p className="text-xs text-gray-600 mt-1 max-w-3xl leading-relaxed uppercase tracking-widest font-medium">
            Explore our vast showroom and outdoor yard displaying Tiles, Granite, Marble, Kadappa stone, Sanitaryware & Plumbing solutions for your home or project.
          </p>
        </div>

        {/* Main Hero Card for Jath Experience Center */}
        <div className="bg-[#f9fafb] border border-gray-200 p-6 md:p-8 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Gallery Image Display */}
            <div className="lg:col-span-7 space-y-4">
              <div className="relative aspect-[16/10] bg-gray-200 overflow-hidden border border-gray-200">
                <img
                  src={galleryImages[activeGalleryIndex].url}
                  alt={galleryImages[activeGalleryIndex].title}
                  className="w-full h-full object-cover transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="bg-white text-black text-[9px] font-bold uppercase tracking-widest px-2 py-0.5">
                    Showroom Gallery • Image 0{activeGalleryIndex + 1}
                  </span>
                  <h3 className="text-xl font-serif italic mt-1 text-white">
                    {galleryImages[activeGalleryIndex].title}
                  </h3>
                  <p className="text-[10px] uppercase tracking-widest text-gray-300">
                    {galleryImages[activeGalleryIndex].desc}
                  </p>
                </div>
              </div>

              {/* Gallery Thumbnails */}
              <div className="grid grid-cols-3 gap-3">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveGalleryIndex(idx)}
                    className={`relative aspect-[16/10] overflow-hidden border transition-all ${
                      activeGalleryIndex === idx ? 'border-black ring-2 ring-black' : 'border-gray-300 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Address & Specs Details */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-[10px] bg-black text-white font-bold uppercase tracking-widest px-2.5 py-1 inline-block mb-3">
                  Flagship Store • Jath
                </span>
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 uppercase">
                  Amol Tiles, Jath
                </h2>
                <p className="text-xs font-serif italic text-gray-600 mt-1">
                  अमोल टाईल्स • "PREMIUM QUALITY PREMIUM SERVICE"
                </p>
              </div>

              {/* Proprietor Cards */}
              <div className="bg-white p-4 border border-gray-200 space-y-2 text-xs uppercase tracking-wider">
                <p className="font-bold text-black border-b border-gray-100 pb-1">Proprietors & Direct Contact</p>
                <div className="flex justify-between items-center pt-1 font-medium">
                  <span>Pro. Ajit Shinde:</span>
                  <a href="tel:9822090345" className="font-bold font-mono text-black underline">9822090345</a>
                </div>
                <div className="flex justify-between items-center font-medium">
                  <span>Pro. Niraj Shinde:</span>
                  <a href="tel:9822309345" className="font-bold font-mono text-black underline">9822309345</a>
                </div>
              </div>

              <div className="space-y-3 text-xs uppercase tracking-widest text-gray-600 font-medium border-t border-b border-gray-200 py-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-black shrink-0 mt-0.5" />
                  <div>
                    <span className="text-black font-bold block">Location:</span>
                    <span className="text-gray-900 font-bold">Satara Road, Jath. Tq. Jath, Dist. Sangali - 416404</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Layers className="w-4 h-4 text-black shrink-0 mt-0.5" />
                  <div>
                    <span className="text-black font-bold block">Available Materials:</span>
                    <span className="text-gray-900 font-bold">Tiles, Granite, Marble, Kadappa, Sanitaryware & Plumbing</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-black shrink-0" />
                  <div>
                    <span className="text-black font-bold mr-1">Hours:</span>
                    <span>Monday – Sunday: 8:30 AM – 8:30 PM</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent('Satara Road, Jath. Tq. Jath, Dist. Sangali - 416404')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 bg-black text-white text-[10px] uppercase font-bold tracking-widest hover:bg-gray-800 transition-colors flex items-center space-x-2"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Google Maps Directions</span>
                </a>

                {onOpenVisitingCard && (
                  <button
                    onClick={onOpenVisitingCard}
                    className="px-5 py-2.5 border border-black text-black text-[10px] uppercase font-bold tracking-widest hover:bg-black hover:text-white transition-colors flex items-center space-x-2"
                  >
                    <span>📇 Digital Visiting Card</span>
                  </button>
                )}
              </div>

            </div>

          </div>
        </div>

        {/* Two Column Layout: Appointment HTML5 Form + Amenities */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          
          {/* HTML5 Form for VIP Appointment Booking */}
          <div className="lg:col-span-7 bg-white border border-gray-200 p-6 md:p-8">
            <div className="mb-6">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">
                HTML5 Form • VIP Architectural Consultation
              </span>
              <h3 className="text-2xl font-serif italic text-gray-900">
                Book an Appointment at Jath Experience Center
              </h3>
              <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">
                Schedule a one-on-one consultation with our tile surface specialists.
              </p>
            </div>

            {bookingSuccess ? (
              <div className="bg-[#f9fafb] border border-black p-8 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-black mx-auto" />
                <h4 className="text-xl font-serif italic text-black">
                  ✅ Appointment Submitted Successfully!
                </h4>
                
                <div className="p-4 bg-white border border-gray-300 max-w-sm mx-auto text-left space-y-1.5 font-mono text-xs">
                  <p className="flex justify-between">
                    <span className="text-gray-500">Appointment ID:</span>
                    <span className="font-bold text-amber-700">{confirmedAptId}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-500">Customer:</span>
                    <span className="font-bold text-black">{formData.name}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-500">Scheduled:</span>
                    <span className="font-bold text-black">{formData.date} ({formData.timeSlot})</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-500">Status:</span>
                    <span className="font-bold text-amber-600 uppercase">Pending Review</span>
                  </p>
                </div>

                <p className="text-xs uppercase tracking-widest text-gray-600 max-w-md mx-auto leading-relaxed">
                  We have received your request and will contact you shortly. An automatic confirmation message has been dispatched to your mobile on <strong>{formData.phone}</strong>. Both Amol Tiles administrators have been notified.
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setBookingSuccess(false);
                      setFormData({
                        name: '',
                        phone: '',
                        email: '',
                        date: '',
                        timeSlot: '11:00 AM - 01:00 PM',
                        collection: 'Tiles, Granite & Marble Slabs',
                        notes: ''
                      });
                    }}
                    className="px-6 py-2 border border-black text-[10px] uppercase font-bold tracking-widest hover:bg-black hover:text-white transition-colors"
                  >
                    Book Another Visit
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitBooking} className="space-y-4 text-xs">
                {bookingError && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center space-x-2 rounded-md font-devanagari">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                    <span>{bookingError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-devanagari">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-1">
                      {t.fullName} *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={language === 'mr' ? 'उदा. आर्किटेक्ट राजेश पाटील' : language === 'hi' ? 'उदा. आर्किटेक्ट राजेश पाटिल' : 'e.g. Architect Rajesh Patel'}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-2.5 border border-gray-300 text-xs text-black focus:outline-none focus:border-black rounded-md"
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
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-2.5 border border-gray-300 text-xs text-black focus:outline-none focus:border-black rounded-md"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-devanagari">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-1">
                      {t.emailAddress}
                    </label>
                    <input
                      type="email"
                      placeholder="name@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-2.5 border border-gray-300 text-xs text-black focus:outline-none focus:border-black rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-1">
                      {t.preferredDate} *
                    </label>
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full p-2.5 border border-gray-300 text-xs text-black focus:outline-none focus:border-black rounded-md"
                    />
                  </div>
                </div>

                <div className="font-devanagari">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-1">
                    {t.preferredTime}
                  </label>
                  <select
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    className="w-full p-2.5 border border-gray-300 text-xs text-black focus:outline-none focus:border-black uppercase rounded-md bg-white"
                  >
                    <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</option>
                    <option value="12:00 PM - 02:00 PM">12:00 PM - 02:00 PM</option>
                    <option value="03:00 PM - 05:00 PM">03:00 PM - 05:00 PM</option>
                    <option value="05:00 PM - 07:00 PM">05:00 PM - 07:00 PM</option>
                  </select>
                </div>

                <div className="font-devanagari">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-1">
                    {t.interestedCategory}
                  </label>
                  <select
                    value={formData.collection}
                    onChange={(e) => setFormData({ ...formData, collection: e.target.value })}
                    className="w-full p-2.5 border border-gray-300 text-xs text-black focus:outline-none focus:border-black uppercase rounded-md bg-white"
                  >
                    <option value="Grand GVT Slabs (800x1600mm & 1200x2400mm)">{t.catGvt}</option>
                    <option value="Polished Vitrified Flooring (600x1200mm)">{language === 'mr' ? 'पॉलिश व्हिट्रिफाइड फर्शी' : language === 'hi' ? 'पॉलिश विट्रिफाइड फर्श' : 'Polished Vitrified Flooring'}</option>
                    <option value="Black Granite & Kadappa Stone">{t.catGranite}</option>
                    <option value="3D Ceramic Wall Concepts">{t.catWall}</option>
                    <option value="Heavy Duty 16mm Outdoor Pavers">{t.navOutdoorTiles}</option>
                    <option value="Sanitaryware & Plumbing Suite">{t.catSanitary}</option>
                    <option value="Full Project Procurement">{language === 'mr' ? 'संपूर्ण घराचे मटेरियल' : language === 'hi' ? 'संपूर्ण परियोजना सामग्री' : 'Full Project Procurement'}</option>
                  </select>
                </div>

                <div className="font-devanagari">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-1">
                    {t.additionalNotes}
                  </label>
                  <textarea
                    rows={3}
                    placeholder={language === 'mr' ? 'उदा. २५०० चौ.फूट बंगला, जत किंवा डिलिव्हरीचे ठिकाण नमूद करा...' : language === 'hi' ? 'उदा. 2500 वर्ग फुट बंगला, जत या डिलीवरी का स्थान लिखें...' : 'Provide details such as floor area sq.ft or project type...'}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full p-2.5 border border-gray-300 text-xs text-black focus:outline-none focus:border-black rounded-md leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  disabled={bookingLoading}
                  className="w-full py-3 bg-black text-white text-[10px] uppercase font-bold tracking-widest hover:bg-gray-800 disabled:opacity-50 transition-colors flex items-center justify-center space-x-2 cursor-pointer rounded-md font-devanagari"
                >
                  <span>{bookingLoading ? (language === 'mr' ? 'नोंदणी करत आहे...' : language === 'hi' ? 'पंजीकरण किया जा रहा है...' : 'Scheduling Visit...') : t.btnConfirmAppointment}</span>
                </button>
              </form>
            )}
          </div>

          {/* Showroom Features & Amenities Box */}
          <div className="lg:col-span-5 bg-[#f9fafb] border border-gray-200 p-6 md:p-8 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">
                Showroom Amenities
              </span>
              <h3 className="text-xl font-serif italic text-gray-900 mb-4">
                What to Expect at Jath Center
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-black text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-black uppercase tracking-wider">12,000 Sq. Ft. Display Floor</h4>
                    <p className="text-gray-500 text-[11px] uppercase tracking-wider mt-0.5">
                      View full-size slabs displayed with realistic warm lighting and zero seam joints.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-black text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-black uppercase tracking-wider">Touch & Feel Texture Bar</h4>
                    <p className="text-gray-500 text-[11px] uppercase tracking-wider mt-0.5">
                      Compare carving punch, satin matt, high gloss, and anti-skid outdoor finishes side-by-side.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-black text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-black uppercase tracking-wider">Free Sample Box Dispatch</h4>
                    <p className="text-gray-500 text-[11px] uppercase tracking-wider mt-0.5">
                      Select 4x4 inch physical cut-pieces to take home for site trial matching.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-black text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                    4
                  </div>
                  <div>
                    <h4 className="font-bold text-black uppercase tracking-wider">3D VR Visualization Kiosk</h4>
                    <p className="text-gray-500 text-[11px] uppercase tracking-wider mt-0.5">
                      Simulate selected tiles directly onto your room layout before making a final purchase.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200 mt-6">
              <button
                onClick={onOpenSampleDrawer}
                className="w-full py-2.5 border border-black text-black text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
              >
                Request Sample Box Online
              </button>
            </div>

          </div>

        </div>

        {/* Other Pan-India Showrooms */}
        <div className="border-t border-gray-200 pt-10">
          <div className="mb-6">
            <h3 className="text-2xl font-serif italic text-gray-900">
              All Amol Tiles Experience Centers
            </h3>
            <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">
              Find an authorized experience center in your region.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {experienceCentersList.map((center) => (
              <div key={center.id} className="border border-gray-200 p-5 bg-white space-y-3">
                <span className="text-[9px] font-mono font-bold uppercase tracking-widest bg-gray-100 text-gray-700 px-2 py-0.5">
                  {center.area}
                </span>
                <h4 className="text-base font-serif italic text-black">{center.name}</h4>
                <p className="text-xs text-gray-600 uppercase tracking-wider font-medium">{center.address}</p>
                <div className="text-[11px] text-gray-500 font-mono space-y-1 pt-1 border-t border-gray-100">
                  <p>📞 {center.phone}</p>
                  <p>✉️ {center.email}</p>
                  <p>⏰ {center.hours}</p>
                </div>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(center.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-2 text-[10px] uppercase font-bold tracking-widest text-black underline hover:opacity-75"
                >
                  View on Google Maps →
                </a>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
