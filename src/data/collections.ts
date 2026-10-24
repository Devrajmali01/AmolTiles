import { CollectionItem } from '../types';

export const COLLECTIONS_DATA: CollectionItem[] = [
  {
    id: 'col-statuario-onyx',
    title: 'Statuario & Royal Onyx Slabs',
    slug: 'statuario-onyx',
    subtitle: 'High Gloss GVT Mega Slabs with Continuous Mirror Bookmatch',
    description: 'Breathtaking Italian Statuario and translucent honey Onyx slabs crafted in 800x1600mm and 1200x2400mm mirror formats. Designed to evoke luxury hotel grandeur in modern villas and penthouses.',
    categoryLabel: 'Mega Slabs',
    heroImage: '/src/assets/images/black_marble_living_room_1786558171845.jpg',
    cardImage: '/src/assets/images/regenerated_image_1787246045342.png',
    accentColor: '#6EA8FE', // Soft Azure
    tags: ['Italian Marble', 'Continuous Vein', 'High Gloss', 'Living Room', 'Mega Slab'],
    features: [
      'Continuous 4-tile mirror bookmatch alignment',
      'Nano-polished crystal gloss with >95% specular reflectance',
      'Micro-chamfered rectified edges for hairline 1mm grout joints',
      'High breaking strength (>2200N) suitable for heavy residential traffic'
    ],
    idealFor: ['Living Room Flooring', 'Feature TV Walls', 'Master Bedroom Suites', 'Corporate Foyers'],
    tileIds: ['tile-statuario-01', 'tile-onyx-02', 'tile-calacatta-03'],
    ctaLabel: 'Explore Slabs'
  },
  {
    id: 'col-fluted-ceramic-wall',
    title: 'Fluted 3D Ceramic Wall & Highlighters',
    slug: 'fluted-ceramic-wall',
    subtitle: 'Artisanal Tactile Relief with Satin & Metallic Accents',
    description: 'Tactile fluted panels, organic reeded contours, and gentle metallic highlighters crafted in 300x600mm. Creates rich play of shadow and soft light in modern sanctuaries.',
    categoryLabel: 'Ceramic Wall',
    heroImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1400&q=80',
    cardImage: '/src/assets/images/amol_catalog_cover_wall_1784971081615.jpg',
    accentColor: '#A78BFA', // Lavender
    tags: ['3D Fluted', 'Water-Resistant', 'Bathroom', 'Highlighter', 'Satin Touch'],
    features: [
      'Hydrophobic glazed surface repels water spots and soap scum',
      'Precision embossed fluted grooves for rich architectural shadows',
      'Pairs seamlessly with plain field tiles and brass sanitaryware fittings',
      'Zero maintenance ceramic body formulated for moist environments'
    ],
    idealFor: ['Bathroom Vanity Backdrops', 'Shower Niche Highlighters', 'Powder Rooms', 'Dining Accent Walls'],
    tileIds: ['tile-wall-fluted-06', 'tile-wall-satin-08'],
    ctaLabel: 'Explore Walls'
  },
  {
    id: 'col-rustic-outdoor-paver',
    title: '16mm Heavy Duty Exterior Pavers',
    slug: 'outdoor-pavers',
    subtitle: 'R11 Anti-Skid Full Body Porcelain for Vehicle Driveways & Terraces',
    description: 'Engineered specifically for heavy vehicle driveways, car porches, garden pathways, and poolside decks. Withstands extreme monsoon rains, summer thermal expansion, and abrasive tire friction.',
    categoryLabel: 'Outdoor & Parking',
    heroImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80',
    cardImage: '/src/assets/images/amol_catalog_cover_outdoor_1784971094848.jpg',
    accentColor: '#F6C7A8', // Champagne Peach
    tags: ['16mm Full Body', 'R11 Anti-Skid', 'Driveway', 'Parking', 'Weatherproof'],
    features: [
      'Unsurpassed 16mm slab thickness capable of withstanding SUV axle weights',
      'Certified R11 slip-resistance safe for bare feet when wet',
      'Zero moisture retention prevents moss, algae, and salt efflorescence',
      'UV-stable pigments remain vivid without fading under scorching sun'
    ],
    idealFor: ['Car Porches & Driveways', 'Pool Decks & Patios', 'Rooftop Terraces', 'Commercial Entry Plazas'],
    tileIds: ['tile-paver-slate-09', 'tile-elevation-stone-10'],
    ctaLabel: 'Explore Pavers'
  },
  {
    id: 'col-nordic-wood-planks',
    title: 'Nordic Oak & Teak Wood Planks',
    slug: 'wood-planks',
    subtitle: 'Carving Silk Matt Timber Aesthetic with Porcelain Durability',
    description: 'The organic warmth and soft knots of Scandinavian oak and golden Burmese teak captured on high-density porcelain planks in 200x1200mm. Enjoy timeless timber without termite risk or moisture warping.',
    categoryLabel: 'Wood Series',
    heroImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=80',
    cardImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    accentColor: '#86D7C4', // Mint
    tags: ['Silk Matt', 'Termite Proof', 'Oak Texture', 'Bedroom', 'Balcony Deck'],
    features: [
      'Synchronized carving texture follows natural wood grain lines',
      '100% termite proof, water resistant, and fire retardant',
      'Ideal for underfloor heating and high-humidity areas',
      'Available in herringbone, chevron, and 1/3 staggered plank layouts'
    ],
    idealFor: ['Master Bedrooms', 'Private Libraries', 'Enclosed Balconies', 'Boutique Cafes'],
    tileIds: ['tile-wood-oak-04'],
    ctaLabel: 'Explore Wood Planks'
  },
  {
    id: 'col-gourmet-kitchen-slabs',
    title: 'Gourmet Porcelain Countertop Slabs',
    slug: 'kitchen-slabs',
    subtitle: 'Heat-Proof, Scratch-Resistant & Stain-Proof Continuous Surfaces',
    description: 'Seamless porcelain slab surfaces engineered to replace granite and engineered quartz. Place sizzling cookware directly on the surface and chop fresh ingredients without fear of knife marks or lemon acid etching.',
    categoryLabel: 'Kitchen Concepts',
    heroImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1400&q=80',
    cardImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
    accentColor: '#E8B4C8', // Dusty Rose
    tags: ['Heat Proof', 'Food Grade', 'Zero Porosity', 'Countertop', 'Island Slabs'],
    features: [
      'Withstands temperatures up to 800°C without burning or scorching',
      'Non-porous hygienic food preparation surface certified non-toxic',
      'Impervious to turmeric stains, wine, cooking oil, and vinegar',
      'Pairs with Eureka and Jindal stainless steel undermount sinks'
    ],
    idealFor: ['Kitchen Islands', 'Cooking Counters', 'Dining Tables', 'Bar Tops'],
    tileIds: ['tile-kitchen-counter-12', 'tile-kitchen-geo-07'],
    ctaLabel: 'Explore Kitchen Slabs'
  },
  {
    id: 'col-double-charge-mirror',
    title: 'Double Charge Mirror Vitrified',
    slug: 'double-charge-vitrified',
    subtitle: 'Heavy-Traffic Mirror Gloss Flooring for Modern Residences & Halls',
    description: 'Double layer press technology delivering 3-4mm of solid wear layer. Boasts an everlasting crystalline reflection that stays pristine even after decades of continuous family foot traffic.',
    categoryLabel: 'Polished Vitrified',
    heroImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=80',
    cardImage: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80',
    accentColor: '#6EA8FE', // Soft Azure
    tags: ['Double Charge', 'Mirror Finish', 'Commercial Grade', 'Living Flooring'],
    features: [
      'Dual-layer composition provides maximum abrasion resistance (PEI Class 4)',
      'High-gloss reflective coat magnifies natural sunlight inside rooms',
      'Stain-resistant surface makes daily wet-mopping rapid and effortless',
      'Superb dimensional stability for crisp, flat leveling across large halls'
    ],
    idealFor: ['Living Rooms & Hallways', 'Showroom Floors', 'Banquet Halls', 'Commercial Offices'],
    tileIds: ['tile-pvt-ivory-11'],
    ctaLabel: 'Explore Vitrified'
  },
  {
    id: 'col-volcanic-facade-stone',
    title: 'Volcanic Basalt & Elevation Facades',
    slug: 'elevation-stone',
    subtitle: 'Architectural Stone Cladding for Modern Villa Exteriors',
    description: 'Monolithic split-face stone cladding and dark volcanic textures engineered to shield architectural facades from weathering while commanding undeniable exterior presence.',
    categoryLabel: 'Elevation Stone',
    heroImage: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1400&q=80',
    cardImage: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=800&q=80',
    accentColor: '#A78BFA', // Lavender
    tags: ['Split Face Stone', 'Exterior Elevation', 'Facade Cladding', 'Monsoon Resistant'],
    features: [
      'Interlocking multi-level stone relief hides joint lines completely',
      'Zero efflorescence prevents chalky white mineral streaks over time',
      'Thermal insulation barrier keeps interior walls cooler in summer heat',
      'Resistant to tropical rain driving winds and heavy fungal growth'
    ],
    idealFor: ['Villa Boundary & Gates', 'Front Elevation Porticos', 'Terrace Feature Walls', 'Fireplace Accents'],
    tileIds: ['tile-elevation-stone-10', 'tile-volcanic-05'],
    ctaLabel: 'Explore Elevation'
  },
  {
    id: 'col-artisanal-mosaics-geo',
    title: 'Artisanal Subway & Geometric Backsplashes',
    slug: 'artisanal-mosaics',
    subtitle: 'Designer Glazed Hexagons & Emerald Geometrics for Modern Kitchens',
    description: 'A playful yet sophisticated collection of glazed emerald hexagons, handmade subway bevels, and brass trim insets that turn kitchen backsplashes and vanity corners into works of art.',
    categoryLabel: 'Boutique Mosaics',
    heroImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1400&q=80',
    cardImage: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=800&q=80',
    accentColor: '#86D7C4', // Mint
    tags: ['Emerald Hexagon', 'Subway Tiles', 'Kitchen Splashback', 'Artisanal Ceramic'],
    features: [
      'Vivid jewel glazes fired at high temperatures for liquid depth',
      'Easy wipe-clean surface repels cooking oil splatters and steam',
      'Modular layouts accommodate herringbone, stack, and chevron orientations',
      'Complements black matte, brushed brass, and chrome sink hardware'
    ],
    idealFor: ['Kitchen Backsplashes', 'Coffee Bars & Cafes', 'Guest Bathroom Highlighters', 'Accent Niches'],
    tileIds: ['tile-kitchen-geo-07', 'tile-wall-fluted-06'],
    ctaLabel: 'Explore Mosaics'
  }
];
