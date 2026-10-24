/**
 * Amol Tiles & Granites Jath - Pure Vanilla JavaScript Engine
 * Language localization, 3D Room Visualizer, and Calculators
 */

// 1. Language Translations Dictionary
const translations = {
  mr: {
    topTitle: "अधिकृत टाईल्स व सॅनिटरीवेअर डीलर • जत (सांगली)",
    currentLang: "🚩 मराठी",
    vcardBtn: "व्हिजिटिंग कार्ड",
    brandTitle: "AMOL TILES, JATH",
    brandTagline: "टाईल्स, ग्रॅनाइट्स, मार्बल, कडप्पा, सॅनिटरीवेअर व फिनोलेक्स प्लंबिंग",
    searchPlaceholder: "टाईल्स, ग्रॅनाइट्स, साईझ शोधा...",
    tabCatalogues: "टाईल्स कॅटलॉग",
    tabVisualizer: "३D रूम सिम्युलेटर",
    tabDirectory: "टाईल डायरेक्टरी",
    tabCalculator: "टाईल्स कॅल्क्युलेटर",
    tabShowroom: "शोरूम लोकेशन",
    heroBadge: "मारबिटो • वारमोरा • फिनोलेक्स • युरेका अधिकृत डीलर - जत",
    heroTitle: "अमोल टाईल्स आणि ग्रॅनाइट्स जत",
    heroDesc: "सुंदर आणि मजबूत घरासाठी प्रीमियम व्हिट्रिफाइड स्लॅब्स, नॅचरल ग्रॅनाइट्स, इटालियन मार्बल आणि सॅनिटरीवेअर कलेक्शन.",
    propAjit: "प्रो. अजित शिंदे:",
    propNiraj: "प्रो. निरज शिंदे:",
    btnHeroVis: "३D रूममध्ये पहा",
    btnHeroCard: "📇 डिजिटल व्हिजिटिंग कार्ड",
    visTitle: "३D रूम व्हिज्युलायझर",
    visSubtitle: "वेगवेगळ्या खोल्यांमध्ये टाईल्स व ग्रॅनाइट निवडून लाईव्ह लूक पहा.",
    roomSelectTitle: "रूमचा प्रकार निवडा:",
    tileSelectTitle: "अमोल टाईल्स फर्शी निवड:",
    catTitle: "अधिकृत ब्रँड ई-कॅटलॉग २०२६",
    catSubtitle: "उच्च गुणवत्तेचे ई-कॅटलॉग पहा आणि संपूर्ण व्हरायटी जाणून घ्या.",
    calcTitle: "टाईल्स मोजणी कॅल्क्युलेटर",
    calcSubtitle: "खोलीच्या लांबी व रुंदीनुसार लागणारे बॉक्स आणि चौरस फूट मोजा.",
    showTitle: "अमोल टाईल्स शोरूम आणि स्टॉक यार्ड - जत",
    showSubtitle: "सांगली रोड, जत येथील भव्य शोरूमला प्रत्यक्ष भेट द्या."
  },
  hi: {
    topTitle: "अधिकृत टाइल्स एवं सैनिटरीवेयर डीलर • जत (सांगली)",
    currentLang: "🇮🇳 हिंदी",
    vcardBtn: "विजिटिंग कार्ड",
    brandTitle: "AMOL TILES, JATH",
    brandTagline: "टाइल्स, ग्रेनाइट्स, मार्बल, कडप्पा, सैनिटरीवेयर व फिनोलेक्स पाइप्स",
    searchPlaceholder: "टाइल्स, ग्रेनाइट्स, साइज खोजें...",
    tabCatalogues: "टाइल्स कैटलॉग",
    tabVisualizer: "३D रूम सिमुलेटर",
    tabDirectory: "टाइल डायरेक्टरी",
    tabCalculator: "टाइल्स कैलकुलेटर",
    tabShowroom: "शोरूम लोकेशन",
    heroBadge: "मारबिटो • वारमोरा • फिनोलेक्स • युरेका अधिकृत डीलर - जत",
    heroTitle: "अमोल टाइल्स एवं ग्रेनाइट्स जत",
    heroDesc: "सुंदर और मजबूत घर के लिए प्रीमियम विट्रिफाइड स्लैब्स, नेचुरल ग्रेनाइट्स, इटालियन मार्बल और सैनिटरीवेयर कलेक्शन.",
    propAjit: "प्रो. अजित शिंदे:",
    propNiraj: "प्रो. निरज शिंदे:",
    btnHeroVis: "३D रूम में देखें",
    btnHeroCard: "📇 डिजिटल विजिटिंग कार्ड",
    visTitle: "३D रूम विजुअलाइज़र",
    visSubtitle: "विभिन्न कमरों में टाइल्स और ग्रेनाइट चुनकर लाइव लुक देखें।",
    roomSelectTitle: "कमरे का प्रकार चुनें:",
    tileSelectTitle: "अमोल टाइल्स फर्श चयन:",
    catTitle: "अधिकृत ब्रांड ई-कैटलॉग २०२६",
    catSubtitle: "उच्च गुणवत्ता वाले ई-कैटलॉग देखें और पूरी वैरायटी जानें।",
    calcTitle: "टाइल्स कैलकुलेटर",
    calcSubtitle: "कमरे की लंबाई और चौड़ाई के अनुसार आवश्यक बॉक्स और वर्ग फुट मापें।",
    showTitle: "अमोल टाइल्स शोरूम एवं स्टॉक यार्ड - जत",
    showSubtitle: "सांगली रोड, जत स्थित भव्य शोरूम पर पधारें।"
  },
  en: {
    topTitle: "Authorized Tile & Sanitaryware Dealer • Jath (Sangli)",
    currentLang: "🌐 English",
    vcardBtn: "Visiting Card",
    brandTitle: "AMOL TILES, JATH",
    brandTagline: "Tiles, Granite, Marble, Kadappa, Sanitaryware & Plumbing",
    searchPlaceholder: "Search tiles, granites, formats...",
    tabCatalogues: "Catalogues",
    tabVisualizer: "3D Room Simulator",
    tabDirectory: "Tile Directory",
    tabCalculator: "Tile Calculator",
    tabShowroom: "Showroom Location",
    heroBadge: "Marbito • Warmora • Finolex • Eureka Authorized Dealer - Jath",
    heroTitle: "Amol Tiles & Granites Jath",
    heroDesc: "Premium vitrified slabs, natural granites, Italian marble, and sanitaryware collection for your dream home.",
    propAjit: "Pro. Ajit Shinde:",
    propNiraj: "Pro. Niraj Shinde:",
    btnHeroVis: "View in 3D Room",
    btnHeroCard: "📇 Digital Visiting Card",
    visTitle: "3D Room Visualizer",
    visSubtitle: "Preview tiles and granites across different room settings in real-time.",
    roomSelectTitle: "Select Room Type:",
    tileSelectTitle: "Select Amol Tile / Granite:",
    catTitle: "Official Brand E-Catalogues 2026",
    catSubtitle: "Browse high-definition catalogues and explore full product ranges.",
    calcTitle: "Tile Area Calculator",
    calcSubtitle: "Calculate required boxes and square footage based on room dimensions.",
    showTitle: "Amol Tiles Showroom & Stockyard - Jath",
    showSubtitle: "Visit our grand experience center on Sangli Road, Jath."
  }
};

let currentLang = 'mr';

// 2. Set Language Function
function setLanguage(lang) {
  currentLang = lang;
  document.body.className = `lang-${lang}`;
  const t = translations[lang];

  document.getElementById('top-title').innerText = t.topTitle;
  document.getElementById('current-lang-text').innerText = t.currentLang;
  document.getElementById('btn-vcard-text').innerText = t.vcardBtn;
  document.getElementById('brand-title').innerText = t.brandTitle;
  document.getElementById('brand-tagline').innerText = t.brandTagline;
  document.getElementById('tile-search').placeholder = t.searchPlaceholder;
  
  document.getElementById('tab-catalogues').innerText = t.tabCatalogues;
  document.getElementById('tab-visualizer').innerText = t.tabVisualizer;
  document.getElementById('tab-directory').innerText = t.tabDirectory;
  document.getElementById('tab-calculator').innerText = t.tabCalculator;
  document.getElementById('tab-showroom').innerText = t.tabShowroom;

  document.getElementById('hero-badge').innerText = t.heroBadge;
  document.getElementById('hero-title').innerText = t.heroTitle;
  document.getElementById('hero-desc').innerText = t.heroDesc;
  document.getElementById('prop-ajit-label').innerText = t.propAjit;
  document.getElementById('prop-niraj-label').innerText = t.propNiraj;
  document.getElementById('btn-hero-visualizer').innerText = t.btnHeroVis;
  document.getElementById('btn-hero-card').innerText = t.btnHeroCard;

  document.getElementById('vis-title').innerText = t.visTitle;
  document.getElementById('vis-subtitle').innerText = t.visSubtitle;
  document.getElementById('ctrl-room-select-title').innerText = t.roomSelectTitle;
  document.getElementById('ctrl-tile-select-title').innerText = t.tileSelectTitle;

  document.getElementById('cat-title').innerText = t.catTitle;
  document.getElementById('cat-subtitle').innerText = t.catSubtitle;
  document.getElementById('calc-title').innerText = t.calcTitle;
  document.getElementById('calc-subtitle').innerText = t.calcSubtitle;
  document.getElementById('show-title').innerText = t.showTitle;
  document.getElementById('show-subtitle').innerText = t.showSubtitle;

  const dropdown = document.getElementById('lang-dropdown');
  if (dropdown) dropdown.classList.remove('show');
}

function toggleLangDropdown() {
  const dropdown = document.getElementById('lang-dropdown');
  if (dropdown) dropdown.classList.toggle('show');
}

// 3. Tab Switching
function switchTab(tabId) {
  const tabs = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('.tab-section');

  tabs.forEach(tab => tab.classList.remove('active'));
  sections.forEach(sec => sec.classList.remove('active'));

  const activeTabBtn = document.getElementById(`tab-${tabId}`);
  const activeSection = document.getElementById(`section-${tabId}`);

  if (activeTabBtn) activeTabBtn.classList.add('active');
  if (activeSection) activeSection.classList.add('active');

  window.scrollTo({ top: 380, behavior: 'smooth' });
}

// 4. 3D Room Visualizer Swapping
const roomImages = {
  living: '/src/assets/images/black_marble_living_room_1786558171845.jpg',
  kitchen: '/src/assets/images/regenerated_image_1787246045342.png',
  bath: '/src/assets/images/amol_catalog_cover_wall_1784971081615.jpg',
  hall: '/src/assets/images/regenerated_image_1787245810395.png'
};

const tileTextures = {
  black: '/src/assets/images/black_marble_living_room_1786558171845.jpg',
  pearl: '/src/assets/images/regenerated_image_1787246045342.png',
  statuario: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  wood: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
  crema: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'
};

function setRoomScene(roomKey) {
  const imgEl = document.getElementById('room-canvas-image');
  if (imgEl && roomImages[roomKey]) {
    imgEl.src = roomImages[roomKey];
  }
}

function applyFloorTile(tileKey) {
  const imgEl = document.getElementById('room-canvas-image');
  if (imgEl && tileTextures[tileKey]) {
    imgEl.src = tileTextures[tileKey];
  }
}

// 5. Tile Calculator
function calculateTiles() {
  const len = parseFloat(document.getElementById('calc-length').value) || 0;
  const wid = parseFloat(document.getElementById('calc-width').value) || 0;
  const coveragePerBox = parseFloat(document.getElementById('calc-size').value) || 15.5;

  const area = Math.round(len * wid * 100) / 100;
  const exactBoxes = Math.ceil(area / coveragePerBox);
  const totalBoxesWithWastage = Math.ceil((area * 1.05) / coveragePerBox);

  document.getElementById('res-area').innerText = area;
  document.getElementById('res-boxes').innerText = exactBoxes;
  document.getElementById('res-total-boxes').innerText = totalBoxesWithWastage;
}

// 6. Search Filter
function filterTiles() {
  const query = document.getElementById('tile-search').value.toLowerCase();
  const cards = document.querySelectorAll('.product-card');

  cards.forEach(card => {
    const text = card.innerText.toLowerCase();
    if (text.includes(query)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// 7. Visiting Card Modal & Dynamic QR Code Generator
const vCardData = `BEGIN:VCARD
VERSION:3.0
N:Shinde;Ajit & Niraj;;;
FN:Amol Tiles & Granites Jath
ORG:Amol Tiles & Granites
TEL;TYPE=CELL:+919822090345
TEL;TYPE=CELL:+919822309345
ADR;TYPE=WORK:;;Satara Road;Jath;Maharashtra;416404;India
NOTE:Authorized Dealer: Marbito, Warmora, Finolex, Eureka
URL:https://amoltilesjath.com
END:VCARD`;

const qrSources = {
  vcard: `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(vCardData)}`,
  whatsapp: `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent('https://wa.me/919822309345?text=Hello%20Amol%20Tiles%20Jath,%20I%20visited%20your%20digital%20catalogue%20and%20would%20like%20to%20inquire%20about%20Tiles%20and%20Granite.')}`,
  call: `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent('tel:+919822090345')}`,
  maps: `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent('https://maps.google.com/?q=Satara+Road+Jath+Sangli+Maharashtra+416404')}`
};

let currentHtmlQrMode = 'vcard';

function setHtmlQrMode(mode) {
  currentHtmlQrMode = mode;
  const qrImg = document.getElementById('html-qr-image');
  if (qrImg && qrSources[mode]) {
    qrImg.src = qrSources[mode];
  }

  // Update button active states
  ['vcard', 'whatsapp', 'call', 'maps'].forEach(m => {
    const btn = document.getElementById(`qrmode-${m}`);
    if (btn) {
      if (m === mode) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    }
  });
}

function downloadVCardFromJs() {
  const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'Amol_Tiles_Jath_Contact.vcf');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function downloadQRCode() {
  const src = qrSources[currentHtmlQrMode];
  const link = document.createElement('a');
  link.href = src;
  link.target = '_blank';
  link.download = `Amol_Tiles_QR_${currentHtmlQrMode}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function copyDealerDetails() {
  const details = `AMOL TILES & GRANITES, JATH
📍 Satara Road, Jath, Dist. Sangli - 416404
📞 Pro. Ajit Shinde: +91 9822090345
📞 Pro. Niraj Shinde: +91 9822309345
💬 WhatsApp: https://wa.me/919822309345
⭐ Authorized Dealer: Marbito, Warmora, Finolex, Eureka`;

  navigator.clipboard.writeText(details);
  alert('Contact details copied to clipboard! (नंबर कॉपी झाले आहेत)');
}

function openVisitingCard() {
  const modal = document.getElementById('vcard-modal');
  if (modal) modal.classList.add('show');
}

function closeVisitingCard(e) {
  const modal = document.getElementById('vcard-modal');
  if (modal) modal.classList.remove('show');
}

// Initial calculation on load
window.addEventListener('DOMContentLoaded', () => {
  calculateTiles();
});
