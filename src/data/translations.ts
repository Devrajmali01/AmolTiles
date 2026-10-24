export type Language = 'en' | 'mr' | 'hi';

export interface Translations {
  // Brand & Header Utility
  brandName: string;
  brandTagline: string;
  authorizedDealer: string;
  callUs: string;
  propAjit: string;
  propNiraj: string;
  searchPlaceholder: string;
  visitingCard: string;
  sampleBasket: string;
  compare: string;
  locateDealer: string;
  workingHours: string;
  account: string;
  logout: string;
  adminPortal: string;
  enquiryBtn: string;
  regionIndia: string;
  regionGlobal: string;

  // Language selector labels
  langEnglish: string;
  langMarathi: string;
  langHindi: string;
  selectLanguage: string;

  // Navigation Items
  navCollections: string;
  navAllTiles: string;
  navFloorTiles: string;
  navWallTiles: string;
  navBathroomTiles: string;
  navKitchenTiles: string;
  navOutdoorTiles: string;
  navCommercialSlabs: string;
  navCatalogues: string;
  navExperienceCenter: string;
  navCalculator: string;
  navNewBadge: string;

  // Hero Section
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  heroGatewayTitle: string;
  btnExploreCatalogues: string;
  btnViewFlipbook: string;
  btnVisitingCard: string;
  btnCuratedCollections: string;
  statGvtDesigns: string;
  statVitrifiedSlabs: string;
  statJathDelivery: string;

  // Room / Category Gateway
  roomLiving: string;
  roomKitchen: string;
  roomBathroom: string;
  roomBedroom: string;
  roomOutdoor: string;
  roomElevation: string;
  catAll: string;
  catGvt: string;
  catGranite: string;
  catSanitary: string;
  catWall: string;
  catKitchenPipes: string;

  // Tile Directory & Filters
  directoryTitle: string;
  directorySubtitle: string;
  allBrands: string;
  filterSize: string;
  filterFinish: string;
  filterApplication: string;
  filterLook: string;
  filterCategory: string;
  coveragePerBox: string;
  pcsPerBox: string;
  thickness: string;
  waterAbs: string;
  randomFaces: string;
  grade: string;
  btnCalculate: string;
  btnSample: string;
  btnSampleAdded: string;
  btnViewDetails: string;
  btnAddToCompare: string;
  btnRemoveCompare: string;
  noTilesFound: string;
  noTilesFoundDesc: string;

  // Catalogue Grid
  cataloguesTitle: string;
  cataloguesSubtitle: string;
  pagesCount: string;
  fileSize: string;
  btnOpenFlipbook: string;
  btnDownloadPdf: string;
  btnBrowseItems: string;
  bookmark: string;
  bookmarked: string;
  viewGrid: string;
  viewList: string;

  // Tile Detail Modal
  detailModalTitle: string;
  specifications: string;
  tileFeatures: string;
  applicationAreas: string;
  boxSpecs: string;
  shareTile: string;
  linkCopied: string;
  close: string;

  // Tile Calculator Modal
  calcModalTitle: string;
  calcSubtitle: string;
  unitFeet: string;
  unitMeters: string;
  roomLength: string;
  roomWidth: string;
  wastageBuffer: string;
  recommendedBuffer: string;
  totalArea: string;
  totalBoxesNeeded: string;
  totalPieces: string;
  approxWeight: string;
  calcDisclaimer: string;

  // Sample Basket Drawer
  sampleDrawerTitle: string;
  sampleDrawerSubtitle: string;
  emptyBasket: string;
  emptyBasketDesc: string;
  checkoutTitle: string;
  fullName: string;
  mobileNumber: string;
  emailAddress: string;
  professionRole: string;
  deliveryCity: string;
  fullAddress: string;
  roleArchitect: string;
  roleDesigner: string;
  roleBuilder: string;
  roleHomeowner: string;
  roleDealer: string;
  btnDispatchSamples: string;
  dispatching: string;
  dispatchSuccessTitle: string;
  dispatchSuccessDesc: string;
  referenceId: string;
  estimatedDelivery: string;
  clearAll: string;

  // Compare Modal
  compareTitle: string;
  compareSubtitle: string;
  noCompareTiles: string;
  noCompareDesc: string;
  property: string;
  finish: string;
  size: string;
  material: string;

  // Visiting Card Modal
  cardHeaderTitle: string;
  cardFirmName: string;
  cardOwnerName: string;
  cardSubtitle: string;
  cardAddress: string;
  cardPhone: string;
  cardSaveContact: string;
  cardShareWhatsapp: string;
  cardGetLocation: string;
  qrCodeScan: string;

  // Experience Center
  experienceCenterTitle: string;
  experienceCenterSubtitle: string;
  bookVipVisit: string;
  preferredDate: string;
  preferredTime: string;
  interestedCategory: string;
  additionalNotes: string;
  btnConfirmAppointment: string;
  bookingSuccessTitle: string;
  bookingSuccessDesc: string;

  // Contact / Enquiry Modal
  enquiryModalTitle: string;
  enquiryModalSubtitle: string;
  inquiryCategory: string;
  yourMessage: string;
  btnSubmitEnquiry: string;
  enquirySuccessTitle: string;
  enquirySuccessDesc: string;

  // Auth Modal
  signInTitle: string;
  registerTitle: string;
  tabSignIn: string;
  tabRegister: string;
  identifierPlaceholder: string;
  passwordPlaceholder: string;
  createPassword: string;
  confirmPassword: string;
  btnSignIn: string;
  btnCreateAccount: string;
  authSuccess: string;
  needAccount: string;
  alreadyHaveAccount: string;

  // Admin Portal
  adminLoginTitle: string;
  adminPasswordPlaceholder: string;
  btnAdminLogin: string;
  adminWelcome: string;
  tabOverview: string;
  tabAppointments: string;
  tabEnquiries: string;
  tabNotifications: string;
  tabCustomers: string;

  // Footer
  footerAbout: string;
  footerAboutText: string;
  footerQuickLinks: string;
  footerDesignTools: string;
  footerArchitectSupport: string;
  footerContactUs: string;
  footerCopyright: string;
  footerDisclaimer: string;

  // Common API & Validation Messages
  valNameRequired: string;
  valPhoneInvalid: string;
  valEmailInvalid: string;
  valPasswordShort: string;
  valFillRequired: string;
  apiSuccess: string;
  apiErrorConnection: string;
  apiErrorServer: string;
  apiUserNotFound: string;
  apiIncorrectPassword: string;

  // Extended Dealer & Showroom
  dealerTitle: string;
  dealerSubtitle: string;
  dealerSearchPlaceholder: string;
  getDirections: string;
  spotlightShowroom: string;
  spotlightHeading: string;
  spotlightDesc: string;
  spotlightAddress: string;

  // Extended Flipbook
  flipbookTitle: string;
  flipbookPage: string;
  flipbookOf: string;
  flipbookZoomIn: string;
  flipbookZoomOut: string;
  flipbookDownload: string;
  flipbookSearchPlaceholder: string;
  tableOfContents: string;

  // Extended Collections & Categories
  collectionsHeroTitle: string;
  collectionsHeroSubtitle: string;
  allCollections: string;
  catCeramicTiles: string;
  catVitrifiedTiles: string;
  catMegaSlabs: string;
  catOutdoorParking: string;
  catWoodSeries: string;
  catElevationStone: string;
  catBoutiqueMosaics: string;
  buyingTipsTitle: string;
  keyFormatsTitle: string;
  wearRatingTitle: string;
  applicationsTitle: string;

  // AI Support Assistant
  aiSupportTitle: string;
  aiSupportWelcome: string;
  aiSupportPlaceholder: string;
  aiSupportSend: string;
  aiSupportAskHours: string;
  aiSupportAskBooking: string;
  aiSupportAskBrands: string;
  aiSupportCallAjit: string;

  // Standard API & Operation Codes
  codeInvalidEmail: string;
  codeInvalidPhone: string;
  codeNameRequired: string;
  codeUserNotFound: string;
  codeIncorrectPassword: string;
  codeAccountExists: string;
  codeDuplicateSubmission: string;
  codeRecordSaved: string;
  codeLoginSuccess: string;
  codeEnquirySuccess: string;
  codeBookingSuccess: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  // ==========================================
  // 1. ENGLISH (en)
  // ==========================================
  en: {
    brandName: "AMOL TILES, JATH",
    brandTagline: "Tiles, Granites, Marble, Kadappa, Sanitaryware & Finolex Plumbing",
    authorizedDealer: "Authorized Tile & Sanitaryware Dealer • Jath",
    callUs: "Prop. Ajit Shinde: 9822090345 | Prop. Niraj Shinde: 9822309345",
    propAjit: "Prop. Ajit Shinde:",
    propNiraj: "Prop. Niraj Shinde:",
    searchPlaceholder: "Search tiles, granites, sizes or brands...",
    visitingCard: "Digital Visiting Card",
    sampleBasket: "Sample Basket",
    compare: "Compare",
    locateDealer: "Showroom Location",
    workingHours: "Mon-Sat: 9:00 AM - 8:30 PM",
    account: "Account",
    logout: "Logout",
    adminPortal: "Admin",
    enquiryBtn: "Enquiry",
    regionIndia: "India (INR)",
    regionGlobal: "Global Export (USD)",

    langEnglish: "English",
    langMarathi: "मराठी",
    langHindi: "हिन्दी",
    selectLanguage: "Select Language",

    navCollections: "Collections",
    navAllTiles: "All Tiles",
    navFloorTiles: "Floor Tiles",
    navWallTiles: "Wall Tiles",
    navBathroomTiles: "Bathroom Tiles",
    navKitchenTiles: "Kitchen Tiles",
    navOutdoorTiles: "Outdoor & Elevation",
    navCommercialSlabs: "Commercial Slabs",
    navCatalogues: "E-Catalogues",
    navExperienceCenter: "Experience Center",
    navCalculator: "Calculators",
    navNewBadge: "New",

    heroBadge: "Official Dealer for Marbito • Warmora • Finolex • Eureka",
    heroTitle: "Amol Tiles & Granites Jath",
    heroSubtitle: "Premium Vitrified Slabs, Natural Granites, Marbles & Sanitaryware Collections for Modern Spaces.",
    heroGatewayTitle: "Quick Category Gateway",
    btnExploreCatalogues: "Explore 2026 Catalogues",
    btnViewFlipbook: "Open 3D Flipbook",
    btnVisitingCard: "Owner Contact Card",
    btnCuratedCollections: "Curated Collections",
    statGvtDesigns: "140+ GVT Designs",
    statVitrifiedSlabs: "100% Vitrified Slabs",
    statJathDelivery: "Direct Jath Delivery",

    roomLiving: "Living Room",
    roomKitchen: "Kitchen",
    roomBathroom: "Bathroom",
    roomBedroom: "Bedroom",
    roomOutdoor: "Outdoor & Parking",
    roomElevation: "Front Elevation",
    catAll: "All Collections",
    catGvt: "GVT Slabs (800x1600)",
    catGranite: "Natural Granites & Marble",
    catSanitary: "Sanitaryware & Pipes",
    catWall: "3D Wall Concepts",
    catKitchenPipes: "Kitchen Concepts & Sinks",

    directoryTitle: "Amol Tiles & Granites Directory",
    directorySubtitle: "Browse our complete inventory of tiles, granites, marbles, and bath fittings.",
    allBrands: "All Brands & Series",
    filterSize: "Filter by Size",
    filterFinish: "Filter by Finish",
    filterApplication: "Application Area",
    filterLook: "Visual Look",
    filterCategory: "Tile Category",
    coveragePerBox: "Coverage / Box",
    pcsPerBox: "Pieces / Box",
    thickness: "Thickness",
    waterAbs: "Water Absorption",
    randomFaces: "Random Faces",
    grade: "Grade & Quality",
    btnCalculate: "Calculate Requirement",
    btnSample: "Request Sample",
    btnSampleAdded: "In Sample Basket",
    btnViewDetails: "View Details",
    btnAddToCompare: "+ Compare",
    btnRemoveCompare: "Remove Compare",
    noTilesFound: "No tiles found matching your search.",
    noTilesFoundDesc: "Try adjusting filters or searching for terms like 'Statuario', 'Granite', or '600x1200'.",

    cataloguesTitle: "Official Brand E-Catalogues 2026",
    cataloguesSubtitle: "Flip through high-resolution brochures with direct product hotspots.",
    pagesCount: "Pages",
    fileSize: "PDF Size",
    btnOpenFlipbook: "Open 3D Flipbook",
    btnDownloadPdf: "Download PDF",
    btnBrowseItems: "Browse Products",
    bookmark: "Bookmark",
    bookmarked: "Bookmarked",
    viewGrid: "Grid View",
    viewList: "List View",

    detailModalTitle: "Tile Specifications & Architecture Guide",
    specifications: "Technical Specifications",
    tileFeatures: "Key Features & Standards",
    applicationAreas: "Ideal Application Areas",
    boxSpecs: "Packaging Details",
    shareTile: "Share Tile",
    linkCopied: "Link copied to clipboard!",
    close: "Close",

    calcModalTitle: "Tile Quantity & Box Calculator",
    calcSubtitle: "Precision Material & Box Estimator",
    unitFeet: "Feet (ft)",
    unitMeters: "Meters (m)",
    roomLength: "Room Length",
    roomWidth: "Room Width",
    wastageBuffer: "Cutting & Wastage Buffer",
    recommendedBuffer: "(10% recommended for straight layouts, 15% for diagonal)",
    totalArea: "Total Required Area (with wastage)",
    totalBoxesNeeded: "Boxes Needed",
    totalPieces: "Total Individual Tiles",
    approxWeight: "Approx. Total Weight",
    calcDisclaimer: "Note: Always confirm with your tile contractor before final purchase.",

    sampleDrawerTitle: "Physical Sample Basket",
    sampleDrawerSubtitle: "Architect & Builder Material Request Service",
    emptyBasket: "Your sample basket is empty.",
    emptyBasketDesc: "Click 'Request Sample' on any tile in the directory to add physical cut pieces here.",
    checkoutTitle: "Request Free Site Delivery of Selected Samples",
    fullName: "Full Name",
    mobileNumber: "10-Digit Mobile Number",
    emailAddress: "Email Address",
    professionRole: "Your Profession / Role",
    deliveryCity: "City / Town (e.g., Jath, Sangli, Bijapur)",
    fullAddress: "Complete Delivery Address with Pincode",
    roleArchitect: "Architect",
    roleDesigner: "Interior Designer",
    roleBuilder: "Builder / Contractor",
    roleHomeowner: "Homeowner",
    roleDealer: "Tile Dealer / Retailer",
    btnDispatchSamples: "Dispatch Sample Box Request",
    dispatching: "Dispatching Request...",
    dispatchSuccessTitle: "Sample Box Request Dispatched!",
    dispatchSuccessDesc: "Our showroom team at Jath has received your sample basket. Our representative will contact you shortly.",
    referenceId: "Inquiry Reference ID",
    estimatedDelivery: "Estimated Dispatch: 2-3 Business Days",
    clearAll: "Clear All Samples",

    compareTitle: "Compare Tile Specifications",
    compareSubtitle: "Side-by-side comparison of dimensions, finishes, and technical metrics",
    noCompareTiles: "No tiles selected for comparison yet.",
    noCompareDesc: "Click '+ Compare' on any tile card in the directory to inspect differences side-by-side.",
    property: "Property",
    finish: "Surface Finish",
    size: "Tile Size",
    material: "Material Composition",

    cardHeaderTitle: "Amol Tiles & Granites Jath - Digital Business Card",
    cardFirmName: "AMOL TILES & SANITARYWARE",
    cardOwnerName: "Amol Mali (Proprietor)",
    cardSubtitle: "Authorized Dealer: Marbito, Warmora, Signova, Finolex & Rainbow",
    cardAddress: "Near New Bus Stand, Sangli-Bijapur Highway, Jath, Dist. Sangli, Maharashtra - 416404",
    cardPhone: "+91 98220 90345 / +91 98223 09345",
    cardSaveContact: "Save Contact Card (.vcf)",
    cardShareWhatsapp: "Share on WhatsApp",
    cardGetLocation: "Get Google Maps Directions",
    qrCodeScan: "Scan QR with Phone Camera",

    experienceCenterTitle: "Amol Tiles Grand Experience Center - Jath",
    experienceCenterSubtitle: "5,000 sq.ft. display yard near Satara Road, Jath. Experience full-size living room floors and natural granite slabs in person.",
    bookVipVisit: "Book a VIP Showroom Consultation",
    preferredDate: "Select Date",
    preferredTime: "Select Time Slot",
    interestedCategory: "Primary Interest",
    additionalNotes: "Project Notes (e.g., 2500 sq.ft villa in Jath)",
    btnConfirmAppointment: "Confirm VIP Appointment",
    bookingSuccessTitle: "VIP Appointment Confirmed!",
    bookingSuccessDesc: "A confirmation notification has been sent to our showroom proprietors and your WhatsApp.",

    enquiryModalTitle: "Direct Showroom Enquiry",
    enquiryModalSubtitle: "Speak with Ajit Shinde or Niraj Shinde regarding wholesale pricing and site deliveries.",
    inquiryCategory: "Enquiry Category",
    yourMessage: "Your Requirements & Project Details",
    btnSubmitEnquiry: "Submit Direct Enquiry",
    enquirySuccessTitle: "Enquiry Submitted Successfully",
    enquirySuccessDesc: "Thank you for reaching out to Amol Tiles, Jath. We will reply promptly via phone or WhatsApp.",

    signInTitle: "Customer & Professional Login",
    registerTitle: "Create Your Amol Tiles Account",
    tabSignIn: "Sign In",
    tabRegister: "Register",
    identifierPlaceholder: "Enter 10-digit mobile number or email",
    passwordPlaceholder: "Enter your password",
    createPassword: "Create Password (optional)",
    confirmPassword: "Confirm Password",
    btnSignIn: "Sign In to Account",
    btnCreateAccount: "Create Account",
    authSuccess: "Authentication successful! Welcome to Amol Tiles.",
    needAccount: "Don't have an account yet?",
    alreadyHaveAccount: "Already have an account?",

    adminLoginTitle: "Administrator Access Portal",
    adminPasswordPlaceholder: "Enter admin passcode (e.g., amoltiles4545)",
    btnAdminLogin: "Login to Admin Dashboard",
    adminWelcome: "Showroom Management Console",
    tabOverview: "Overview",
    tabAppointments: "Appointments",
    tabEnquiries: "Enquiries",
    tabNotifications: "Dispatched Logs",
    tabCustomers: "Customer Directory",

    footerAbout: "Amol Tiles & Granites Jath",
    footerAboutText: "Your trusted destination for premium vitrified tiles, GVT slabs, natural granites, marbles, CPVC plumbing, and luxury sanitaryware in Jath, Sangli.",
    footerQuickLinks: "Quick Navigation",
    footerDesignTools: "Design & Planning Tools",
    footerArchitectSupport: "Architect & Builder Support",
    footerContactUs: "Contact & Store Address",
    footerCopyright: "© 2026 Amol Tiles & Sanitaryware Jath. All Rights Reserved.",
    footerDisclaimer: "Authorized distributor of Marbito, Warmora, Finolex & Eureka Ceramics.",

    valNameRequired: "Please enter your full name.",
    valPhoneInvalid: "Please enter a valid 10-digit Indian mobile number.",
    valEmailInvalid: "Please enter a valid email address.",
    valPasswordShort: "Password must be at least 6 characters.",
    valFillRequired: "Please fill in all required fields.",
    apiSuccess: "Operation completed successfully.",
    apiErrorConnection: "Connection error. Please check your internet connection.",
    apiErrorServer: "Server encountered an error. Please try again shortly.",
    apiUserNotFound: "User account not found. Please register first.",
    apiIncorrectPassword: "Password entered is incorrect.",

    // Extended Dealer & Showroom
    dealerTitle: "Find Amol Tiles Showroom & Authorized Outlets",
    dealerSubtitle: "Exclusive Showrooms & Authorized Network across Maharashtra & India",
    dealerSearchPlaceholder: "Enter city, state or dealer name (e.g. Jath, Sangli, Mumbai)...",
    getDirections: "Get Map Directions",
    spotlightShowroom: "Official Showroom & Stock Yard",
    spotlightHeading: "Amol Tiles & Granites Showroom, Jath",
    spotlightDesc: "Authorized dealer for Marbito, Warmora, Finolex PVC and Eureka sanitaryware with ready warehouse inventory for quick delivery across Jath and surrounding talukas.",
    spotlightAddress: "Satara Road, Near MSEB Substation, Jath, Sangli, Maharashtra 416404",

    // Extended Flipbook
    flipbookTitle: "Interactive 3D E-Catalogue Flipbook",
    flipbookPage: "Page",
    flipbookOf: "of",
    flipbookZoomIn: "Zoom In",
    flipbookZoomOut: "Zoom Out",
    flipbookDownload: "Download PDF",
    flipbookSearchPlaceholder: "Search within pages, collections or finishes...",
    tableOfContents: "Table of Contents",

    // Extended Collections & Categories
    collectionsHeroTitle: "Curated Architectural Collections",
    collectionsHeroSubtitle: "Handpicked vitrified slabs, carved granites, Italian marbles and wall accents for premium homes and projects.",
    allCollections: "All Collections",
    catCeramicTiles: "Ceramic Tiles",
    catVitrifiedTiles: "Vitrified Tiles",
    catMegaSlabs: "Mega Slabs",
    catOutdoorParking: "Outdoor & Parking",
    catWoodSeries: "Wood Series",
    catElevationStone: "Elevation Stone",
    catBoutiqueMosaics: "Boutique Mosaics",
    buyingTipsTitle: "Professional Buying & Installation Tips",
    keyFormatsTitle: "Available Standard Formats",
    wearRatingTitle: "Wear Rating & Durability",
    applicationsTitle: "Ideal Application Areas",

    // AI Support Assistant
    aiSupportTitle: "Showroom Assistant",
    aiSupportWelcome: "Hello! Welcome to Amol Tiles, Jath. How can I help you today? You can ask me about tile finishes, showroom opening hours, appointment bookings, or request a direct callback from Prop. Ajit Shinde or Niraj Shinde.",
    aiSupportPlaceholder: "Ask about tile sizes, prices, showroom hours...",
    aiSupportSend: "Send",
    aiSupportAskHours: "What are your showroom hours?",
    aiSupportAskBooking: "How do I book a VIP visit?",
    aiSupportAskBrands: "Which tile brands do you stock?",
    aiSupportCallAjit: "Request callback from Prop. Ajit Shinde",

    // Standard API & Operation Codes
    codeInvalidEmail: "Please provide a valid email address.",
    codeInvalidPhone: "Please provide a valid 10-digit mobile number.",
    codeNameRequired: "Full name is required.",
    codeUserNotFound: "User account not found. Please register or check details.",
    codeIncorrectPassword: "Password entered is incorrect.",
    codeAccountExists: "An account with this email or mobile number already exists.",
    codeDuplicateSubmission: "Please wait a moment before resubmitting.",
    codeRecordSaved: "Record successfully saved.",
    codeLoginSuccess: "Logged in successfully.",
    codeEnquirySuccess: "Your enquiry has been received. Our team will contact you shortly.",
    codeBookingSuccess: "VIP showroom appointment booked successfully!"
  },

  // ==========================================
  // 2. MARATHI (मराठी - mr)
  // ==========================================
  mr: {
    brandName: "अमोल टाईल्स, जत",
    brandTagline: "टाईल्स, ग्रॅनाइट्स, मार्बल, कडप्पा, सॅनिटरीवेअर व फिनोलेक्स प्लंबिंग",
    authorizedDealer: "अधिकृत टाईल्स व सॅनिटरीवेअर डीलर • जत (सांगली)",
    callUs: "प्रो. अजित शिंदे: ९८२२०९०३४५ | प्रो. निरज शिंदे: ९८२२३०९३४५",
    propAjit: "प्रो. अजित शिंदे:",
    propNiraj: "प्रो. निरज शिंदे:",
    searchPlaceholder: "टाईल्स, ग्रॅनाइट्स, साईझ किंवा ब्रँड शोधा...",
    visitingCard: "डिजिटल व्हिजिटिंग कार्ड",
    sampleBasket: "सॅम्पल बास्केट",
    compare: "टाईल्स तुलना",
    locateDealer: "शोरूम लोकेशन",
    workingHours: "सोम-शनि: सकाळी ९:०० ते रात्री ८:३०",
    account: "खाते",
    logout: "लॉगआउट",
    adminPortal: "प्रशासक",
    enquiryBtn: "चौकशी",
    regionIndia: "भारत (INR)",
    regionGlobal: "ग्लोबल एक्सपोर्ट (USD)",

    langEnglish: "English",
    langMarathi: "मराठी",
    langHindi: "हिन्दी",
    selectLanguage: "भाषा निवडा",

    navCollections: "संग्रह (Collections)",
    navAllTiles: "सर्व टाईल्स",
    navFloorTiles: "फर्शीच्या टाईल्स",
    navWallTiles: "भिंतीच्या टाईल्स",
    navBathroomTiles: "बाथरूम टाईल्स",
    navKitchenTiles: "किचन टाईल्स",
    navOutdoorTiles: "आउटडोअर व एलिव्हेशन",
    navCommercialSlabs: "कमर्शियल स्लॅब्स",
    navCatalogues: "ई-कॅटलॉग",
    navExperienceCenter: "एक्सपिरीयन्स सेंटर",
    navCalculator: "कॅल्क्युलेटर",
    navNewBadge: "नवीन",

    heroBadge: "मारबिटो • वारमोरा • फिनोलेक्स • युरेका अधिकृत डीलर - जत",
    heroTitle: "अमोल टाईल्स आणि ग्रॅनाइट्स जत",
    heroSubtitle: "सुंदर आणि मजबूत घरासाठी प्रीमियम व्हिट्रिफाइड स्लॅब्स, नॅचरल ग्रॅनाइट्स, इटालियन मार्बल आणि सॅनिटरीवेअर कलेक्शन.",
    heroGatewayTitle: "द्रुत कॅटेगरी प्रवेश",
    btnExploreCatalogues: "२०२६ कॅटलॉग पहा",
    btnViewFlipbook: "३D ई-फ्लिपबुक पहा",
    btnVisitingCard: "मालक संपर्क कार्ड",
    btnCuratedCollections: "क्युरेटेड कलेक्शन्स",
    statGvtDesigns: "१४०+ जीव्हीटी डिझाईन्स",
    statVitrifiedSlabs: "१००% व्हिट्रिफाइड स्लॅब्स",
    statJathDelivery: "थेट जत साईट डिलिव्हरी",

    roomLiving: "लिव्हिंग रूम",
    roomKitchen: "किचन ओटा",
    roomBathroom: "बाथरूम",
    roomBedroom: "बेडरूम",
    roomOutdoor: "पार्किंग व अंगण",
    roomElevation: "दर्शनी एलिव्हेशन",
    catAll: "सर्व संग्रह",
    catGvt: "जीव्हीटी स्लॅब (800x1600)",
    catGranite: "नॅचरल ग्रॅनाइट व मार्बल",
    catSanitary: "सॅनिटरीवेअर व पाईप्स",
    catWall: "३D वॉल कॉन्सेप्ट",
    catKitchenPipes: "किचन कॉन्सेप्ट व सिंक",

    directoryTitle: "अमोल टाईल्स व ग्रॅनाइट्स डायरेक्टरी",
    directorySubtitle: "अमोल टाईल्स जत येथील सर्व प्रकारच्या टाईल्स, ग्रॅनाइट्स आणि सॅनिटरीवेअरची संपूर्ण यादी.",
    allBrands: "सर्व ब्रँड्स आणि सिरिज",
    filterSize: "साईझनुसार शोधा",
    filterFinish: "फिनिशनुसार शोधा",
    filterApplication: "वापराचे ठिकाण",
    filterLook: "डिझाईन लूक",
    filterCategory: "टाईल प्रकार",
    coveragePerBox: "कव्हरेज / बॉक्स",
    pcsPerBox: "नग / बॉक्स",
    thickness: "जाडी (Thickness)",
    waterAbs: "पाणी शोषण क्षमता",
    randomFaces: "रँडम फेसेस",
    grade: "ग्रेड आणि गुणवत्ता",
    btnCalculate: "टाईल्स मोजा",
    btnSample: "सॅम्पल मागवा",
    btnSampleAdded: "सॅम्पल बास्केटमध्ये जोडले",
    btnViewDetails: "तपशील पहा",
    btnAddToCompare: "+ तुलना करा",
    btnRemoveCompare: "तुलनेतून काढा",
    noTilesFound: "कोणतीही टाईल सापडली नाही.",
    noTilesFoundDesc: "कृपया इतर फिल्टर्स निवडून पहा किंवा 'Statuario', 'Granite' असे शब्द शोधा.",

    cataloguesTitle: "अधिकृत ब्रँड ई-कॅटलॉग २०२६",
    cataloguesSubtitle: "उच्च गुणवत्तेचे ई-कॅटलॉग पान उलटून पहा आणि प्रॉडक्टची सविस्तर माहिती मिळवा.",
    pagesCount: "पाने",
    fileSize: "पीडीएफ साईझ",
    btnOpenFlipbook: "३D फ्लिपबुक उघडा",
    btnDownloadPdf: "पीडीएफ डाऊनलोड करा",
    btnBrowseItems: "टाईल्स प्रॉडक्ट्स पहा",
    bookmark: "बुकमार्क",
    bookmarked: "बुकमार्क केले",
    viewGrid: "ग्रिड व्ह्यू",
    viewList: "यादी व्ह्यू",

    detailModalTitle: "टाईल्स वैशिष्ट्ये आणि आर्किटेक्चर गाईड",
    specifications: "तांत्रिक तपशील",
    tileFeatures: "प्रमुख वैशिष्ट्ये व मानके",
    applicationAreas: "योग्य वापराची ठिकाणे",
    boxSpecs: "पॅकिंग व बॉक्स तपशील",
    shareTile: "टाईल शेअर करा",
    linkCopied: "लिंक कॉपी झाली!",
    close: "बंद करा",

    calcModalTitle: "टाईल्स मोजणी व बॉक्स कॅल्क्युलेटर",
    calcSubtitle: "अचूक मटेरिअल व बॉक्स अंदाज साधन",
    unitFeet: "फूट (ft)",
    unitMeters: "मीटर (m)",
    roomLength: "खोलीची लांबी",
    roomWidth: "खोलीची रुंदी",
    wastageBuffer: "कटिंग व वेस्टेज बफर",
    recommendedBuffer: "(सरळ मांडणीसाठी १०% व तिरप्या कटिंगसाठी १५% शिफारस)",
    totalArea: "एकूण आवश्यक क्षेत्र (वेस्टेजसह)",
    totalBoxesNeeded: "लागणारे एकूण बॉक्स",
    totalPieces: "एकूण टाईल्स नग",
    approxWeight: "अंदाजे एकूण वजन",
    calcDisclaimer: "टीप: अंतिम खरेदीपूर्वी तुमच्या टाईल कारागिराशी खात्री करून घ्या.",

    sampleDrawerTitle: "प्रत्यक्ष टाईल सॅम्पल बास्केट",
    sampleDrawerSubtitle: "आर्किटेक्ट, बिल्डर व घरमालकांसाठी मोफत सॅम्पल सेवा",
    emptyBasket: "सॅम्पल बास्केट रिकामे आहे.",
    emptyBasketDesc: "डायरेक्टरीमधील कोणत्याही टाईलवर 'सॅम्पल मागवा' क्लिक करून येथे तुकडे जोडा.",
    checkoutTitle: "निवडलेल्या सॅम्पलची साईट डिलिव्हरी मागवा",
    fullName: "पूर्ण नाव",
    mobileNumber: "१० अंकी मोबाईल नंबर",
    emailAddress: "ईमेल पत्ता",
    professionRole: "तुमचा व्यवसाय / भूमिका",
    deliveryCity: "शहर / गाव (उदा. जत, सांगली, विजापूर)",
    fullAddress: "पिनकोडसह संपूर्ण पत्ता",
    roleArchitect: "आर्किटेक्ट",
    roleDesigner: "इंटीरियर डिझायनर",
    roleBuilder: "बिल्डर / कॉन्ट्रॅक्टर",
    roleHomeowner: "घरमालक",
    roleDealer: "टाईल्स डीलर / दुकानदार",
    btnDispatchSamples: "सॅम्पल बॉक्स पाठवण्याची विनंती करा",
    dispatching: "विनंती पाठवत आहे...",
    dispatchSuccessTitle: "सॅम्पल विनंती यशस्वीपणे पाठवली!",
    dispatchSuccessDesc: "जत येथील आमच्या शोरूम टीमला तुमची विनंती प्राप्त झाली आहे. आमचा प्रतिनिधी लवकरच संपर्क करेल.",
    referenceId: "चौकशी संदर्भ क्रमांक",
    estimatedDelivery: "अंदाजे पाठवणी: २-३ कामकाजाचे दिवस",
    clearAll: "सर्व सॅम्पल्स काढा",

    compareTitle: "टाईल्स वैशिष्ट्यांची तुलना",
    compareSubtitle: "दोन किंवा अधिक टाईल्सची साईझ, फिनिश आणि पॅरामीटर्सची समोरासमोर तुलना",
    noCompareTiles: "तुलनेसाठी कोणतीही टाईल निवडलेली नाही.",
    noCompareDesc: "टाईल कार्डवरील '+ तुलना करा' बटनावर क्लिक करून येथे जोडा.",
    property: "तपशील",
    finish: "फिनिश",
    size: "साईझ",
    material: "मटेरिअल",

    cardHeaderTitle: "अमोल टाईल्स व ग्रॅनाइट्स जत - डिजिटल व्हिजिटिंग कार्ड",
    cardFirmName: "अमोल टाईल्स आणि सॅनिटरीवेअर",
    cardOwnerName: "अमोल माळी (प्रोप्रायटर)",
    cardSubtitle: "अधिकृत डीलर: मारबिटो, वारमोरा, सिग्नोव्हा, फिनोलेक्स व रेनबो वॉटर टँक्स",
    cardAddress: "नवीन बस स्थानकाजवळ, सांगली-विजापूर रोड, जत, जि. सांगली, महाराष्ट्र - ४१६४०४",
    cardPhone: "+91 ९८२२० ९०३४५ / +91 ९८२२३ ०९३४५",
    cardSaveContact: "संपर्क सेव्ह करा (.vcf)",
    cardShareWhatsapp: "व्हॉट्सॲपवर शेअर करा",
    cardGetLocation: "गुगल मॅप लोकेशन मिळवा",
    qrCodeScan: "फोन कॅमेऱ्याने QR कोड स्कॅन करा",

    experienceCenterTitle: "अमोल टाईल्स ग्रँड शोरूम आणि स्टॉक यार्ड - जत",
    experienceCenterSubtitle: "सांगली रोड, जत येथील ५००० चौ.फूट भव्य शोरूमला भेट द्या. लिव्हिंग रूम फर्शी, बाथरुम मॉकप आणि Z Black ग्रॅनाइटचे थेट प्रात्यक्षिक पहा.",
    bookVipVisit: "व्हीआयपी शोरूम भेटीची वेळ बुक करा",
    preferredDate: "तारीख निवडा",
    preferredTime: "वेळ निवडा",
    interestedCategory: "प्राधान्य प्रॉडक्ट",
    additionalNotes: "प्रकल्पाचे तपशील (उदा. २५०० चौ.फूट बंगला, जत)",
    btnConfirmAppointment: "अपॉइंटमेंट निश्चित करा",
    bookingSuccessTitle: "अपॉइंटमेंट यशस्वीपणे निश्चित झाली!",
    bookingSuccessDesc: "शोरूम मालकांना आणि आपल्या व्हॉट्सॲपवर पुष्टीकरणाचा मेसेज पाठवण्यात आला आहे.",

    enquiryModalTitle: "थेट शोरूम चौकशी",
    enquiryModalSubtitle: "घाऊक दर आणि साईट डिलिव्हरीसाठी प्रो. अजित शिंदे किंवा प्रो. निरज शिंदे यांच्याशी संपर्क साधा.",
    inquiryCategory: "चौकशीचा प्रकार",
    yourMessage: "तुमच्या गरजा आणि घराचे तपशील",
    btnSubmitEnquiry: "चौकशी सबमिट करा",
    enquirySuccessTitle: "चौकशी यशस्वीपणे पाठवली",
    enquirySuccessDesc: "अमोल टाईल्स, जत येथे संपर्क केल्याबद्दल धन्यवाद. आम्ही लवकरच फोन किंवा व्हॉट्सॲपद्वारे संपर्क करू.",

    signInTitle: "ग्राहक व व्यावसायिक लॉगिन",
    registerTitle: "अमोल टाईल्स खाते तयार करा",
    tabSignIn: "लॉगिन",
    tabRegister: "नोंदणी करा",
    identifierPlaceholder: "१० अंकी मोबाईल नंबर किंवा ईमेल प्रविष्ट करा",
    passwordPlaceholder: "तुमचा पासवर्ड टाका",
    createPassword: "पासवर्ड तयार करा (ऐच्छिक)",
    confirmPassword: "पासवर्डची पुष्टी करा",
    btnSignIn: "खात्यात लॉगिन करा",
    btnCreateAccount: "नवीन खाते तयार करा",
    authSuccess: "प्रमाणीकरण यशस्वी! अमोल टाईल्समध्ये आपले स्वागत आहे.",
    needAccount: "अजून खाते नाही का?",
    alreadyHaveAccount: "आधीपासूनच खाते आहे का?",

    adminLoginTitle: "प्रशासक लॉगिन पोर्टल",
    adminPasswordPlaceholder: "पासकोड प्रविष्ट करा (उदा. amoltiles4545)",
    btnAdminLogin: "डॅशबोर्डमध्ये प्रवेश करा",
    adminWelcome: "शोरूम मॅनेजमेंट कन्सोल",
    tabOverview: "आढावा",
    tabAppointments: "अपॉइंटमेंट्स",
    tabEnquiries: "चौकशी",
    tabNotifications: "मेसेज लॉग्स",
    tabCustomers: "ग्राहक यादी",

    footerAbout: "अमोल टाईल्स आणि ग्रॅनाइट्स जत",
    footerAboutText: "जत व सांगली जिल्ह्यातील विश्वासू टाईल्स, नॅचरल ग्रॅनाइट्स, इटालियन मार्बल आणि फिनोलेक्स प्लंबिंगचे अधिकृत दालन.",
    footerQuickLinks: "महत्वाच्या लिंक्स",
    footerDesignTools: "डिझाईन व मोजणी साधने",
    footerArchitectSupport: "आर्किटेक्ट व बिल्डर सहाय्य",
    footerContactUs: "संपर्क व शोरूम पत्ता",
    footerCopyright: "© २०२६ अमोल टाईल्स आणि सॅनिटरीवेअर जत. सर्व हक्क सुरक्षित.",
    footerDisclaimer: "मारबिटो, वारमोरा, फिनोलेक्स व युरेका सेरामिक्सचे अधिकृत वितरक.",

    valNameRequired: "कृपया आपले पूर्ण नाव प्रविष्ट करा.",
    valPhoneInvalid: "कृपया योग्य १० अंकी मोबाईल नंबर टाका.",
    valEmailInvalid: "कृपया योग्य ईमेल पत्ता प्रविष्ट करा.",
    valPasswordShort: "पासवर्ड किमान ६ अक्षरांचा असावा.",
    valFillRequired: "कृपया आवश्यक माहिती भरा.",
    apiSuccess: "कृती यशस्वीपणे पूर्ण झाली.",
    apiErrorConnection: "इंटरनेट कनेक्शन समस्या. कृपया तपासा.",
    apiErrorServer: "सर्व्हर त्रुटी. कृपया काही वेळाने प्रयत्न करा.",
    apiUserNotFound: "वापरकर्ता सापडला नाही. कृपया प्रथम नोंदणी करा.",
    apiIncorrectPassword: "प्रविष्ट केलेला पासवर्ड चुकीचा आहे.",

    // Extended Dealer & Showroom
    dealerTitle: "अमोल टाईल्स शोरूम व अधिकृत विक्रेते शोधा",
    dealerSubtitle: "महाराष्ट्र व भारतभरातील अधिकृत शोरूम व डिलर्स नेटवर्क",
    dealerSearchPlaceholder: "शहर किंवा राज्य प्रविष्ट करा (उदा. जत, सांगली, मुंबई, कोल्हापूर)...",
    getDirections: "गुगल मॅप दिशा-निर्देश",
    spotlightShowroom: "अधिकृत शोरूम व मुख्य स्टॉक यार्ड",
    spotlightHeading: "अमोल टाईल्स आणि ग्रॅनाइट्स शोरूम, जत",
    spotlightDesc: "मार्बिटो, वार्मोरा, फिनोलेक्स पीव्हीसी व युरेका सेरामिक्सचे थेट अधिकृत वितरक. जत आणि परिसरासाठी मोठा गोडाऊन साठा सदैव उपलब्ध.",
    spotlightAddress: "सातारा रोड, एमएसईबी सबस्टेशन जवळ, जत, सांगली, महाराष्ट्र ४१६४०४",

    // Extended Flipbook
    flipbookTitle: "३डी डिजिटल ई-कॅटलॉग फ्लिपबुक",
    flipbookPage: "पृष्ठ",
    flipbookOf: "पैकी",
    flipbookZoomIn: "मोठे करा",
    flipbookZoomOut: "लहान करा",
    flipbookDownload: "पीडीएफ डाऊनलोड करा",
    flipbookSearchPlaceholder: "कॅटलॉग पानांमध्ये किंवा डिझाईन्समध्ये शोधा...",
    tableOfContents: "अनुक्रमणिका",

    // Extended Collections & Categories
    collectionsHeroTitle: "निवडक आर्किटेक्चरल कलेक्शन्स",
    collectionsHeroSubtitle: "आधुनिक घरे व व्यावसायिक प्रकल्पांसाठी प्रख्यात व्हिट्रिफाइड स्लॅब्स, नॅचरल ग्रॅनाइट्स, इटालियन मार्बल व डिझायनर वॉल टाईल्स.",
    allCollections: "सर्व कलेक्शन्स",
    catCeramicTiles: "सिरेमिक टाईल्स",
    catVitrifiedTiles: "व्हिट्रिफाइड टाईल्स",
    catMegaSlabs: "मेगा स्लॅब्स (८००x१६०० / १२००x२४००)",
    catOutdoorParking: "आउटडोअर व पार्किंग पेव्हर्स",
    catWoodSeries: "वुडन प्लँक सिरीज",
    catElevationStone: "एलिव्हेशन स्टोन व टेक्सचर",
    catBoutiqueMosaics: "बुटीक मोझॅक",
    buyingTipsTitle: "तज्ज्ञ खरेदी व फिटिंग सल्ला",
    keyFormatsTitle: "उपलब्ध मुख्य साईजेस",
    wearRatingTitle: "टिकाऊपणा व घर्षण क्षमता (PEI Class)",
    applicationsTitle: "उपयुक्त जागा (Applications)",

    // AI Support Assistant
    aiSupportTitle: "शोरूम डिजिटल सहाय्यक",
    aiSupportWelcome: "नमस्कार! अमोल टाईल्स, जत मध्ये आपले स्वागत आहे. मी आपली काय मदत करू शकतो? टाईल्स साईझ, फिनिश, शोरूम वेळ, व्हीआयपी अपॉइंटमेंट किंवा प्रो. अजित शिंदे व निरज शिंदे सरांशी थेट चर्चेसाठी मला विचारा.",
    aiSupportPlaceholder: "टाईल्स साईझ, भाव किंवा शोरूम वेळेबद्दल विचारा...",
    aiSupportSend: "पाठवा",
    aiSupportAskHours: "शोरूम उघडण्याची वेळ काय आहे?",
    aiSupportAskBooking: "व्हीआयपी भेट कशी बुक करावी?",
    aiSupportAskBrands: "कोणत्या ब्रँडच्या टाईल्स उपलब्ध आहेत?",
    aiSupportCallAjit: "प्रो. अजित शिंदे सरांना कॉलबॅक विनंती करा",

    // Standard API & Operation Codes
    codeInvalidEmail: "कृपया वैध ईमेल पत्ता प्रविष्ट करा.",
    codeInvalidPhone: "कृपया योग्य १० अंकी मोबाईल नंबर प्रविष्ट करा.",
    codeNameRequired: "पूर्ण नाव भरणे आवश्यक आहे.",
    codeUserNotFound: "वापरकर्ता खाते सापडले नाही. कृपया नोंदणी करा किंवा माहिती तपासा.",
    codeIncorrectPassword: "प्रविष्ट केलेला पासवर्ड चुकीचा आहे.",
    codeAccountExists: "या ईमेल किंवा मोबाईल क्रमांकावर आधीच खाते अस्तित्वात आहे.",
    codeDuplicateSubmission: "कृपया पुन्हा सबमिट करण्यापूर्वी काही क्षण थांबा.",
    codeRecordSaved: "माहिती यशस्वीपणे जतन करण्यात आली.",
    codeLoginSuccess: "यशस्वीरीत्या लॉगिन झाले.",
    codeEnquirySuccess: "आपली चौकशी नोंदवली गेली आहे. आमची टीम लवकरच संपर्क करेल.",
    codeBookingSuccess: "व्हीआयपी शोरूम अपॉइंटमेंट यशस्वीरीत्या बुक झाली!"
  },

  // ==========================================
  // 3. HINDI (हिन्दी - hi)
  // ==========================================
  hi: {
    brandName: "अमोल टाइल्स, जत",
    brandTagline: "टाइल्स, ग्रेनाइट्स, मार्बल, कडप्पा, सैनिटरीवेयर व फिनोलेक्स पाइप्स",
    authorizedDealer: "अधिकृत टाइल्स एवं सैनिटरीवेयर डीलर • जत (सांगली)",
    callUs: "प्रो. अजित शिंदे: 9822090345 | प्रो. निरज शिंदे: 9822309345",
    propAjit: "प्रो. अजित शिंदे:",
    propNiraj: "प्रो. निरज शिंदे:",
    searchPlaceholder: "टाइल्स, ग्रेनाइट्स, साइज या ब्रांड खोजें...",
    visitingCard: "डिजिटल विजिटिंग कार्ड",
    sampleBasket: "सैंपल बास्केट",
    compare: "तुलना करें",
    locateDealer: "शोरूम लोकेशन",
    workingHours: "सोम-शनि: सुबह 9:00 से रात 8:30",
    account: "खाता",
    logout: "लॉगआउट",
    adminPortal: "प्रशासक",
    enquiryBtn: "पूछताछ",
    regionIndia: "भारत (INR)",
    regionGlobal: "ग्लोबल एक्सपोर्ट (USD)",

    langEnglish: "English",
    langMarathi: "मराठी",
    langHindi: "हिन्दी",
    selectLanguage: "भाषा चुनें",

    navCollections: "संग्रह (Collections)",
    navAllTiles: "सभी टाइल्स",
    navFloorTiles: "फ़र्श की टाइल्स",
    navWallTiles: "दीवार की टाइल्स",
    navBathroomTiles: "बाथरूम टाइल्स",
    navKitchenTiles: "किचन टाइल्स",
    navOutdoorTiles: "आउटडोर व एलिवेशन",
    navCommercialSlabs: "कमर्शियल स्लैब्स",
    navCatalogues: "ई-कैटलॉग",
    navExperienceCenter: "एक्सपीरियंस सेंटर",
    navCalculator: "कैलकुलेटर",
    navNewBadge: "नया",

    heroBadge: "मारबिटो • वारमोरा • फिनोलेक्स • यूरेका अधिकृत डीलर",
    heroTitle: "अमोल टाइल्स एंड ग्रेनाइट्स जत",
    heroSubtitle: "आधुनिक घरों के लिए प्रीमियम विट्रिफाइड स्लैब, प्राकृतिक ग्रेनाइट, मार्बल और सैनिटरीवेयर संग्रह।",
    heroGatewayTitle: "त्वरित श्रेणी चयन",
    btnExploreCatalogues: "2026 कैटलॉग देखें",
    btnViewFlipbook: "3D ई-फ्लिपबुक खोलें",
    btnVisitingCard: "मालिक संपर्क कार्ड",
    btnCuratedCollections: "क्यूरेटेड कलेक्शन्स",
    statGvtDesigns: "140+ जीवीटी डिजाइन्स",
    statVitrifiedSlabs: "100% विट्रिफाइड स्लैब्स",
    statJathDelivery: "प्रत्यक्ष जत साइट डिलीवरी",

    roomLiving: "लिविंग रूम",
    roomKitchen: "किचन काउंटर",
    roomBathroom: "बाथरूम",
    roomBedroom: "बेडरूम",
    roomOutdoor: "पार्किंग व आंगन",
    roomElevation: "फ्रंट एलिवेशन",
    catAll: "सभी संग्रह",
    catGvt: "जीवीटी स्लैब (800x1600)",
    catGranite: "नेचुरल ग्रेनाइट व मार्बल",
    catSanitary: "सैनिटरीवेयर व पाइप्स",
    catWall: "3D वॉल कॉन्सेप्ट",
    catKitchenPipes: "किचन कॉन्सेप्ट व सिंक",

    directoryTitle: "अमोल टाइल्स एवं ग्रेनाइट्स निर्देशिका",
    directorySubtitle: "अमोल टाइल्स जत की सभी टाइल्स, ग्रेनाइट्स और सैनिटरीवेयर की संपूर्ण सूची।",
    allBrands: "सभी ब्रांड्स और सीरीज",
    filterSize: "साइज अनुसार खोजें",
    filterFinish: "फ़िनिश अनुसार खोजें",
    filterApplication: "उपयोग का स्थान",
    filterLook: "डिजाइन लुक",
    filterCategory: "टाइल श्रेणी",
    coveragePerBox: "कवरेज / बॉक्स",
    pcsPerBox: "नग / बॉक्स",
    thickness: "मोटाई (Thickness)",
    waterAbs: "जल अवशोषण क्षमता",
    randomFaces: "रैंडम फेसेस",
    grade: "ग्रेड और गुणवत्ता",
    btnCalculate: "मात्रा कैलकुलेटर",
    btnSample: "सैंपल अनुरोध करें",
    btnSampleAdded: "सैंपल बास्केट में जोड़ा गया",
    btnViewDetails: "विवरण देखें",
    btnAddToCompare: "+ तुलना करें",
    btnRemoveCompare: "तुलना से हटाएं",
    noTilesFound: "कोई टाइल नहीं मिली।",
    noTilesFoundDesc: "कृपया अन्य फिल्टर चुनकर देखें या 'Statuario', 'Granite' जैसे शब्द खोजें।",

    cataloguesTitle: "अधिकृत ब्रांड ई-कैटलॉग 2026",
    cataloguesSubtitle: "उच्च गुणवत्ता वाले ई-कैटलॉग के पन्ने पलटें और विस्तृत जानकारी प्राप्त करें।",
    pagesCount: "पन्ने",
    fileSize: "पीडीएफ साइज",
    btnOpenFlipbook: "3D फ्लिपबुक खोलें",
    btnDownloadPdf: "पीडीएफ डाउनलोड करें",
    btnBrowseItems: "उत्पाद देखें",
    bookmark: "बुकमार्क",
    bookmarked: "बुकमार्क किया गया",
    viewGrid: "ग्रिड दृश्य",
    viewList: "सूची दृश्य",

    detailModalTitle: "टाइल विनिर्देश एवं आर्किटेक्चर गाइड",
    specifications: "तकनीकी विनिर्देश",
    tileFeatures: "प्रमुख विशेषताएं व मानक",
    applicationAreas: "उपयुक्त उपयोग क्षेत्र",
    boxSpecs: "पैकेजिंग और बॉक्स विवरण",
    shareTile: "टाइल साझा करें",
    linkCopied: "लिंक कॉपी हो गया!",
    close: "बंद करें",

    calcModalTitle: "टाइल मात्रा एवं बॉक्स कैलकुलेटर",
    calcSubtitle: "सटीक सामग्री एवं बॉक्स अनुमानक",
    unitFeet: "फ़ीट (ft)",
    unitMeters: "मीटर (m)",
    roomLength: "कमरे की लंबाई",
    roomWidth: "कमरे की चौड़ाई",
    wastageBuffer: "कटिंग एवं वेस्टेज बफ़र",
    recommendedBuffer: "(सीधी फिटिंग हेतु 10% तथा तिरछी कटिंग हेतु 15% अनुशंसित)",
    totalArea: "कुल आवश्यक क्षेत्रफल (वेस्टेज सहित)",
    totalBoxesNeeded: "आवश्यक कुल बॉक्स",
    totalPieces: "कुल टाइल संख्या",
    approxWeight: "अनुमानित कुल वजन",
    calcDisclaimer: "नोट: अंतिम खरीद से पहले अपने टाइल ठेकेदार से पुष्टि अवश्य करें।",

    sampleDrawerTitle: "प्रत्यक्ष टाइल सैंपल बास्केट",
    sampleDrawerSubtitle: "आर्किटेक्ट एवं बिल्डर्स हेतु सामग्री डिलीवरी सेवा",
    emptyBasket: "आपकी सैंपल बास्केट खाली है।",
    emptyBasketDesc: "निर्देशिका में किसी भी टाइल पर 'सैंपल अनुरोध करें' दबाकर यहां जोड़ें।",
    checkoutTitle: "चयनित सैंपल्स की साइट डिलीवरी का अनुरोध करें",
    fullName: "पूरा नाम",
    mobileNumber: "10-अंकीय मोबाइल नंबर",
    emailAddress: "ईमेल पता",
    professionRole: "आपका पेशा / भूमिका",
    deliveryCity: "शहर / कस्बा (उदा. जत, सांगली, बीजापुर)",
    fullAddress: "पिनकोड सहित पूरा पता",
    roleArchitect: "आर्किटेक्ट",
    roleDesigner: "इंटीरियर डिजाइनर",
    roleBuilder: "बिल्डर / ठेकेदार",
    roleHomeowner: "मकान मालिक",
    roleDealer: "टाइल डीलर / विक्रेता",
    btnDispatchSamples: "सैंपल बॉक्स भेजने का अनुरोध करें",
    dispatching: "अनुरोध भेजा जा रहा है...",
    dispatchSuccessTitle: "सैंपल अनुरोध सफलतापूर्वक भेजा गया!",
    dispatchSuccessDesc: "जत स्थित हमारी शोरूम टीम को आपका अनुरोध प्राप्त हो गया है। हमारे प्रतिनिधि शीघ्र संपर्क करेंगे।",
    referenceId: "पूछताछ संदर्भ संख्या",
    estimatedDelivery: "अनुमानित प्रेषण: 2-3 कार्यदिवस",
    clearAll: "सभी सैंपल हटाएं",

    compareTitle: "टाइल विनिर्देशों की तुलना करें",
    compareSubtitle: "आयामों, फिनिश और तकनीकी मापदंडों की साथ-साथ तुलना",
    noCompareTiles: "तुलना के लिए कोई टाइल नहीं चुनी गई है।",
    noCompareDesc: "टाइल कार्ड पर '+ तुलना करें' पर क्लिक करके यहां जोड़ें।",
    property: "विवरण",
    finish: "सतह फिनिश",
    size: "टाइल साइज",
    material: "सामग्री संरचना",

    cardHeaderTitle: "अमोल टाइल्स व ग्रेनाइट्स जत - डिजिटल विजिटिंग कार्ड",
    cardFirmName: "अमोल टाइल्स एंड सैनिटरीवेयर",
    cardOwnerName: "अमोल माली (प्रोपराइटर)",
    cardSubtitle: "अधिकृत डीलर: मारबिटो, वारमोरा, सिग्नोवा, फिनोलेक्स व रेनबो वाटर टैंक",
    cardAddress: "नए बस स्टैंड के पास, सांगली-बीजापुर रोड, जत, जिला सांगली, महाराष्ट्र - 416404",
    cardPhone: "+91 98220 90345 / +91 98223 09345",
    cardSaveContact: "संपर्क सेव करें (.vcf)",
    cardShareWhatsapp: "व्हाट्सएप पर शेयर करें",
    cardGetLocation: "गूगल मैप लोकेशन प्राप्त करें",
    qrCodeScan: "फोन कैमरे से QR कोड स्कैन करें",

    experienceCenterTitle: "अमोल टाइल्स ग्रैंड एक्सपीरियंस सेंटर - जत",
    experienceCenterSubtitle: "सांगली रोड, जत स्थित 5000 वर्ग फुट के भव्य शोरूम में पधारें। लिविंग रूम फ़र्श, बाथरूम मॉकअप और Z Black ग्रेनाइट का लाइव डिस्प्ले देखें।",
    bookVipVisit: "वीआईपी शोरूम परामर्श का समय बुक करें",
    preferredDate: "तारीख चुनें",
    preferredTime: "समय चुनें",
    interestedCategory: "प्राथमिक रुचि",
    additionalNotes: "परियोजना विवरण (उदा. 2500 वर्ग फुट बंगला, जत)",
    btnConfirmAppointment: "अपॉइंटमेंट की पुष्टि करें",
    bookingSuccessTitle: "अपॉइंटमेंट सफलतापूर्वक निश्चित हुई!",
    bookingSuccessDesc: "शोरूम मालिकों और आपके व्हाट्सएप पर पुष्टिकरण संदेश भेजा गया है।",

    enquiryModalTitle: "प्रत्यक्ष शोरूम पूछताछ",
    enquiryModalSubtitle: "थोक दरों और साइट डिलीवरी के लिए प्रो. अजित शिंदे या प्रो. निरज शिंदे से संपर्क करें।",
    inquiryCategory: "पूछताछ श्रेणी",
    yourMessage: "आपकी आवश्यकताएं और परियोजना विवरण",
    btnSubmitEnquiry: "पूछताछ सबमिट करें",
    enquirySuccessTitle: "पूछताछ सफलतापूर्वक भेजी गई",
    enquirySuccessDesc: "अमोल टाइल्स, जत से संपर्क करने के लिए धन्यवाद। हम शीघ्र ही फोन या व्हाट्सएप पर संपर्क करेंगे।",

    signInTitle: "ग्राहक एवं पेशेवर लॉगिन",
    registerTitle: "अमोल टाइल्स खाता बनाएं",
    tabSignIn: "लॉगिन",
    tabRegister: "पंजीकरण",
    identifierPlaceholder: "10-अंकीय मोबाइल नंबर या ईमेल दर्ज करें",
    passwordPlaceholder: "अपना पासवर्ड दर्ज करें",
    createPassword: "पासवर्ड बनाएं (वैकल्पिक)",
    confirmPassword: "पासवर्ड की पुष्टि करें",
    btnSignIn: "खाते में लॉगिन करें",
    btnCreateAccount: "खाता बनाएं",
    authSuccess: "प्रमाणीकरण सफल! अमोल टाइल्स में आपका स्वागत है।",
    needAccount: "क्या आपका खाता नहीं है?",
    alreadyHaveAccount: "क्या पहले से खाता है?",

    adminLoginTitle: "प्रशासक लॉगिन पोर्टल",
    adminPasswordPlaceholder: "पासकोड दर्ज करें (उदा. amoltiles4545)",
    btnAdminLogin: "डैशबोर्ड में प्रवेश करें",
    adminWelcome: "शोरूम प्रबंधन कंसोल",
    tabOverview: "अवलोकन",
    tabAppointments: "अपॉइंटमेंट्स",
    tabEnquiries: "पूछताछ",
    tabNotifications: "प्रेषित लॉग्स",
    tabCustomers: "ग्राहक सूची",

    footerAbout: "अमोल टाइल्स एंड ग्रेनाइट्स जत",
    footerAboutText: "जत एवं सांगली जिले में प्रीमियम टाइल्स, नेचुरल ग्रेनाइट, मार्बल और सैनिटरीवेयर का विश्वसनीय शोरूम।",
    footerQuickLinks: "महत्वपूर्ण लिंक्स",
    footerDesignTools: "डिजाइन एवं माप उपकरण",
    footerArchitectSupport: "आर्किटेक्ट एवं बिल्डर सहायता",
    footerContactUs: "संपर्क एवं शोरूम पता",
    footerCopyright: "© 2026 अमोल टाइल्स एंड सैनिटरीवेयर जत। सर्वाधिकार सुरक्षित।",
    footerDisclaimer: "मारबिटो, वारमोरा, फिनोलेक्स व यूरेका सेरामिक्स के अधिकृत वितरक।",

    valNameRequired: "कृपया अपना पूरा नाम दर्ज करें।",
    valPhoneInvalid: "कृपया सही 10-अंकीय मोबाइल नंबर दर्ज करें।",
    valEmailInvalid: "कृपया मान्य ईमेल पता दर्ज करें।",
    valPasswordShort: "पासवर्ड कम से कम 6 अक्षरों का होना चाहिए।",
    valFillRequired: "कृपया सभी आवश्यक फ़ील्ड भरें।",
    apiSuccess: "कार्य सफलतापूर्वक पूरा हुआ।",
    apiErrorConnection: "इंटरनेट कनेक्शन समस्या। कृपया जांचें।",
    apiErrorServer: "सर्वर त्रुटि। कृपया कुछ समय बाद पुनः प्रयास करें।",
    apiUserNotFound: "उपयोगकर्ता खाता नहीं मिला। कृपया पहले पंजीकरण करें।",
    apiIncorrectPassword: "दर्ज किया गया पासवर्ड गलत है।",

    // Extended Dealer & Showroom
    dealerTitle: "अमोल टाइल्स शोरूम एवं अधिकृत डीलर खोजें",
    dealerSubtitle: "महाराष्ट्र एवं भारत भर में अधिकृत शोरूम एवं डीलर्स नेटवर्क",
    dealerSearchPlaceholder: "शहर या राज्य का नाम दर्ज करें (उदा. जत, सांगली, मुंबई, कोल्हापुर)...",
    getDirections: "गूगल मैप दिशा-निर्देश",
    spotlightShowroom: "अधिकृत शोरूम एवं मुख्य स्टॉक यार्ड",
    spotlightHeading: "अमोल टाइल्स एवं ग्रेनाइट्स शोरूम, जत",
    spotlightDesc: "मार्बिटो, वारमोरा, फिनोलेक्स पीवीसी व यूरेका सेरामिक्स के सीधे अधिकृत वितरक। जत और आसपास के क्षेत्रों के लिए विशाल गोदाम स्टॉक सदैव उपलब्ध।",
    spotlightAddress: "सातारा रोड, एमएसईबी सबस्टेशन के पास, जत, सांगली, महाराष्ट्र 416404",

    // Extended Flipbook
    flipbookTitle: "3D डिजिटल ई-कैटलॉग फ्लिपबुक",
    flipbookPage: "पृष्ठ",
    flipbookOf: "का",
    flipbookZoomIn: "बड़ा करें",
    flipbookZoomOut: "छोटा करें",
    flipbookDownload: "पीडीएफ डाउनलोड करें",
    flipbookSearchPlaceholder: "कैटलॉग पृष्ठों या डिजाइनों में खोजें...",
    tableOfContents: "विषय सूची",

    // Extended Collections & Categories
    collectionsHeroTitle: "चुनिंदा आर्किटेक्चरल कलेक्शंस",
    collectionsHeroSubtitle: "आधुनिक घरों और व्यावसायिक परियोजनाओं के लिए प्रसिद्ध विट्रिफाइड स्लैब्स, नेचुरल ग्रेनाइट्स, इटैलियन मार्बल व डिजाइनर वॉल टाइल्स।",
    allCollections: "सभी कलेक्शंस",
    catCeramicTiles: "सिरेमिक टाइल्स",
    catVitrifiedTiles: "विट्रिफाइड टाइल्स",
    catMegaSlabs: "मेगा स्लैब्स (800x1600 / 1200x2400)",
    catOutdoorParking: "आउटडोर एवं पार्किंग पेवर्स",
    catWoodSeries: "वुडन प्लैंक सीरीज",
    catElevationStone: "एलिवेशन स्टोन एवं टेक्सचर",
    catBoutiqueMosaics: "बुटीक मोजैक",
    buyingTipsTitle: "विशेषज्ञ खरीद व फिटिंग सुझाव",
    keyFormatsTitle: "उपलब्ध मुख्य साइज",
    wearRatingTitle: "टिकाऊपन एवं घर्षण क्षमता (PEI Class)",
    applicationsTitle: "उपयुक्त स्थान (Applications)",

    // AI Support Assistant
    aiSupportTitle: "शोरूम डिजिटल सहायक",
    aiSupportWelcome: "नमस्ते! अमोल टाइल्स, जत में आपका स्वागत है। मैं आपकी क्या मदद कर सकता हूँ? टाइल्स साइज, फिनिश, शोरूम समय, वीआईपी अपॉइंटमेंट या प्रो. अजित शिंदे व नीरज शिंदे जी से सीधे बात करने के लिए मुझसे पूछें।",
    aiSupportPlaceholder: "टाइल्स साइज, मूल्य या शोरूम समय के बारे में पूछें...",
    aiSupportSend: "भेजें",
    aiSupportAskHours: "शोरूम खुलने का समय क्या है?",
    aiSupportAskBooking: "वीआईपी विजिट कैसे बुक करें?",
    aiSupportAskBrands: "कौन-कौन से ब्रांड्स उपलब्ध हैं?",
    aiSupportCallAjit: "प्रो. अजित शिंदे जी से कॉलबैक का अनुरोध करें",

    // Standard API & Operation Codes
    codeInvalidEmail: "कृपया एक वैध ईमेल पता दर्ज करें।",
    codeInvalidPhone: "कृपया 10-अंकीय मोबाइल नंबर दर्ज करें।",
    codeNameRequired: "पूरा नाम दर्ज करना अनिवार्य है।",
    codeUserNotFound: "उपयोगकर्ता खाता नहीं मिला। कृपया पंजीकरण करें या विवरण जांचें।",
    codeIncorrectPassword: "दर्ज किया गया पासवर्ड गलत है।",
    codeAccountExists: "इस ईमेल या मोबाइल नंबर पर पहले से खाता मौजूद है।",
    codeDuplicateSubmission: "कृपया पुनः सबमिट करने से पहले कुछ क्षण प्रतीक्षा करें।",
    codeRecordSaved: "रिकॉर्ड सफलतापूर्वक सहेजा गया।",
    codeLoginSuccess: "सफलतापूर्वक लॉगिन हो गया।",
    codeEnquirySuccess: "आपकी पूछताछ दर्ज कर ली गई है। हमारी टीम जल्द ही संपर्क करेगी।",
    codeBookingSuccess: "वीआईपी शोरूम अपॉइंटमेंट सफलतापूर्वक बुक हो गया!"
  }
};
