import { CatalogueItem } from '../types';

// Asset references for generated catalogue covers
const gvtCover = '/src/assets/images/regenerated_image_1787246045342.png';
const wallCover = '/src/assets/images/amol_catalog_cover_wall_1784971081615.jpg';
const outdoorCover = '/src/assets/images/amol_catalog_cover_outdoor_1784971094848.jpg';

export const CATALOGUES_DATA: CatalogueItem[] = [
  {
    id: 'cat-gvt-2026',
    title: 'Amol Grand GVT & Carving Slabs 2026',
    subtitle: 'Extraordinary Glazed Vitrified Tiles & Mega Marble Slabs',
    category: 'GVT Slabs',
    year: '2026 Edition',
    pages: 36,
    fileSize: '18.4 MB',
    coverImage: gvtCover,
    pdfUrl: '#download-gvt-2026',
    description: 'Explore ultra-luxurious 800x1600mm and 1200x2400mm Glazed Vitrified Slabs featuring high-gloss marble veins, silk matt carved textures, and bookmatch symmetry.',
    featured: true,
    isNew: true,
    dimensions: ['800x1600mm', '1200x2400mm', '600x1200mm'],
    tileCount: 140,
    minPricePerSqFt: 65,
    maxPricePerSqFt: 180,
    priceRangeLabel: '₹65 - ₹180 / sq.ft',
    tags: ['GVT', 'High Gloss', 'Marble Look', 'Carving', 'Mega Slab'],
    pagesData: [
      {
        pageNumber: 1,
        title: 'Cover - Grand GVT Slabs 2026',
        imageUrl: gvtCover,
        category: 'Introduction'
      },
      {
        pageNumber: 2,
        title: 'Statuario Imperial - High Gloss 800x1600mm',
        imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        category: 'Living Room Collection',
        hotspots: [
          { x: 35, y: 65, tileId: 'tile-statuario-01', tileName: 'Statuario Imperial GVT' }
        ]
      },
      {
        pageNumber: 3,
        title: 'Onyx Gold Royal Slabs - 1200x2400mm',
        imageUrl: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
        category: 'Luxe Onyx Series',
        hotspots: [
          { x: 50, y: 70, tileId: 'tile-onyx-02', tileName: 'Onyx Gold Royal Slab' }
        ]
      },
      {
        pageNumber: 4,
        title: 'Calacatta Verde & Carving Bookmatch',
        imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
        category: 'Bookmatch Collection',
        hotspots: [
          { x: 40, y: 55, tileId: 'tile-calacatta-03', tileName: 'Calacatta Verde Bookmatch' }
        ]
      },
      {
        pageNumber: 5,
        title: 'Carving Natural Oak Wood Planks',
        imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
        category: 'Wood Aesthetics',
        hotspots: [
          { x: 60, y: 80, tileId: 'tile-wood-oak-04', tileName: 'Natural Oak Wood Carving' }
        ]
      },
      {
        pageNumber: 6,
        title: 'Volcanic Slate & Dark Charcoal Matt',
        imageUrl: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&q=80',
        category: 'Modern Dark Series',
        hotspots: [
          { x: 45, y: 75, tileId: 'tile-volcanic-05', tileName: 'Volcanic Ash Dark' }
        ]
      }
    ]
  },
  {
    id: 'cat-wall-2026',
    title: 'Amol Ceramic Wall Concepts Vol. 14',
    subtitle: 'Designer Wall Tiles for Modern Bathrooms & Kitchens',
    category: 'Ceramic Wall',
    year: '2026 Edition',
    pages: 48,
    fileSize: '22.1 MB',
    coverImage: wallCover,
    pdfUrl: '#download-wall-2026',
    description: 'Immersive collection of 300x600mm and 300x900mm ceramic wall tiles with matching highlighter panels, 3D relief structures, and glossy kitchen backsplashes.',
    featured: true,
    isNew: true,
    dimensions: ['300x600mm', '300x900mm', '300x300mm'],
    tileCount: 185,
    minPricePerSqFt: 30,
    maxPricePerSqFt: 75,
    priceRangeLabel: '₹30 - ₹75 / sq.ft',
    tags: ['Wall Tiles', '3D Fluted', 'Bathroom', 'Kitchen', 'Glossy', 'Satin'],
    pagesData: [
      {
        pageNumber: 1,
        title: 'Cover - Wall Concepts Vol. 14',
        imageUrl: wallCover,
        category: 'Introduction'
      },
      {
        pageNumber: 2,
        title: 'Spa Bathroom - Fluted Grey & Brass Accent',
        imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
        category: 'Spa Concepts',
        hotspots: [
          { x: 50, y: 40, tileId: 'tile-wall-fluted-06', tileName: 'Fluted Brass Accent Wall' }
        ]
      },
      {
        pageNumber: 3,
        title: 'Geometric Hexagon & Botanical Kitchen Backsplash',
        imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
        category: 'Kitchen Concepts',
        hotspots: [
          { x: 50, y: 50, tileId: 'tile-kitchen-geo-07', tileName: 'Emerald Geo Backsplash' }
        ]
      },
      {
        pageNumber: 4,
        title: 'Satin Touch Beige & Floral Relief Highlighter',
        imageUrl: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1200&q=80',
        category: 'Highlighter Series',
        hotspots: [
          { x: 60, y: 45, tileId: 'tile-wall-satin-08', tileName: 'Satin Floral Relief' }
        ]
      }
    ]
  },
  {
    id: 'cat-outdoor-2026',
    title: 'Amol Heavy Duty Pavers & Elevation 2026',
    subtitle: '16mm Thickness Outdoor Pavers & Architectural Facade Cladding',
    category: 'Outdoor Paver',
    year: '2026 Edition',
    pages: 28,
    fileSize: '14.2 MB',
    coverImage: outdoorCover,
    pdfUrl: '#download-outdoor-2026',
    description: 'Ultra-durable, high load-bearing 16mm thick porcelain outdoor pavers, stone finish elevation tiles, anti-skid terrace tiles, and pool deck concepts.',
    featured: true,
    isNew: false,
    dimensions: ['600x600x16mm', '300x600mm', '400x400mm'],
    tileCount: 92,
    minPricePerSqFt: 40,
    maxPricePerSqFt: 95,
    priceRangeLabel: '₹40 - ₹95 / sq.ft',
    tags: ['Outdoor', 'Pavers', 'Anti-Skid', '16mm Thick', 'Elevation Stone'],
    pagesData: [
      {
        pageNumber: 1,
        title: 'Cover - Heavy Duty Pavers & Elevation',
        imageUrl: outdoorCover,
        category: 'Introduction'
      },
      {
        pageNumber: 2,
        title: 'Villa Patio & Pool Deck Pavers',
        imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
        category: 'Pool & Patio',
        hotspots: [
          { x: 50, y: 80, tileId: 'tile-paver-slate-09', tileName: 'Granite Slate Paver 16mm' }
        ]
      },
      {
        pageNumber: 3,
        title: 'Stacked Natural Stone Facade Cladding',
        imageUrl: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80',
        category: 'Exterior Elevation',
        hotspots: [
          { x: 40, y: 35, tileId: 'tile-elevation-stone-10', tileName: 'Quarry Stone Facade' }
        ]
      }
    ]
  },
  {
    id: 'cat-polished-2026',
    title: 'Amol Elegance Polished Vitrified Catalogue',
    subtitle: 'Mirror Finish High-Reflectance Vitrified Flooring',
    category: 'Polished Vitrified',
    year: '2026 Edition',
    pages: 32,
    fileSize: '16.8 MB',
    coverImage: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=80',
    pdfUrl: '#download-pvt-2026',
    description: 'Double charge and soluble salt polished vitrified tiles engineered for extreme wear resistance, mirror shine gloss, and effortless commercial & residential floor cleaning.',
    featured: false,
    isNew: true,
    dimensions: ['600x1200mm', '600x600mm', '800x800mm'],
    tileCount: 110,
    minPricePerSqFt: 38,
    maxPricePerSqFt: 85,
    priceRangeLabel: '₹38 - ₹85 / sq.ft',
    tags: ['Polished Vitrified', 'Double Charge', 'Mirror Finish', 'Commercial Floor'],
    pagesData: [
      {
        pageNumber: 1,
        title: 'Polished Vitrified Elegance Series',
        imageUrl: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
        category: 'Commercial & Living'
      },
      {
        pageNumber: 2,
        title: 'Double Charge Royal Ivory',
        imageUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
        category: 'Living Room Flooring',
        hotspots: [
          { x: 50, y: 70, tileId: 'tile-pvt-ivory-11', tileName: 'Royal Ivory Double Charge' }
        ]
      }
    ]
  },
  {
    id: 'cat-kitchen-2026',
    title: 'Amol Gourmet Kitchen & Countertop Slabs',
    subtitle: 'Stain-Resistant Heat-Proof Slabs & Seamless Splashbacks',
    category: 'Kitchen Concepts',
    year: '2026 Edition',
    pages: 24,
    fileSize: '11.5 MB',
    coverImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80',
    pdfUrl: '#download-kitchen-2026',
    description: 'High performance porcelain kitchen countertop slabs resistant to hot pots, knife scratches, lemon acid, and oil stains. Complemented by designer backsplash mosaics.',
    featured: false,
    isNew: false,
    dimensions: ['800x2400mm', '300x600mm', '600x1200mm'],
    tileCount: 65,
    minPricePerSqFt: 55,
    maxPricePerSqFt: 140,
    priceRangeLabel: '₹55 - ₹140 / sq.ft',
    tags: ['Kitchen Countertop', 'Heat Resistant', 'Stain Proof', 'Porcelain Slab'],
    pagesData: [
      {
        pageNumber: 1,
        title: 'Gourmet Kitchen Slabs Collection',
        imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
        category: 'Countertops'
      }
    ]
  },
  {
    id: 'cat-sanitary-2026',
    title: 'Amol Luxe Sanitaryware & Bath Fittings 2026',
    subtitle: 'Rimless Water Closets, Art Basins, Thermostatic Showers',
    category: 'Sanitaryware',
    year: '2026 Edition',
    pages: 40,
    fileSize: '25.0 MB',
    coverImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80',
    pdfUrl: '#download-sanitary-2026',
    description: 'Complete bath wellness suite including ceramic tabletop art basins, soft-close rimless wall hung WC, rain shower panels, and brushed gold brassware accessories.',
    featured: false,
    isNew: true,
    dimensions: ['Sanitaryware Suite', 'Tabletop Basins', 'Wall Hung WC'],
    tileCount: 150,
    minPricePerSqFt: 45,
    maxPricePerSqFt: 160,
    priceRangeLabel: '₹45 - ₹160 / unit',
    tags: ['Sanitaryware', 'Art Basins', 'Rimless WC', 'Brassware', 'Bath Wellness'],
    pagesData: [
      {
        pageNumber: 1,
        title: 'Amol Bath Wellness Suite 2026',
        imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
        category: 'Sanitaryware'
      }
    ]
  },
  {
    id: 'cat-granites-2026',
    title: 'Amol Natural Granites, Marble & Kadappa 2026',
    subtitle: 'Z Black, Pearl Black, Steel Gray, Silvassa Red & Lakha Red',
    category: 'GVT Slabs',
    year: '2026 Edition',
    pages: 30,
    fileSize: '19.8 MB',
    coverImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80',
    pdfUrl: '#download-granites-2026',
    description: 'Exclusive collection of natural polished granite slabs including Z Black, Pearl Black, Steel Gray, Silvassa Red, Lakha Red, Italian Marble & Kadappa Stone stacks directly from Jath stock yard.',
    featured: true,
    isNew: true,
    dimensions: ['8x3 Ft', '10x4 Ft', 'Custom Slab Sizing'],
    tileCount: 75,
    minPricePerSqFt: 80,
    maxPricePerSqFt: 250,
    priceRangeLabel: '₹80 - ₹250 / sq.ft',
    tags: ['Granite', 'Z Black', 'Pearl Black', 'Steel Gray', 'Silvassa Red', 'Lakha Red', 'Marble', 'Kadappa'],
    pagesData: [
      {
        pageNumber: 1,
        title: 'Z Black Granite Slab - Mirror Polish',
        imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
        category: 'Granite Slabs',
        hotspots: [
          { x: 50, y: 50, tileId: 'granite-z-black-12', tileName: 'Z Black Granite Slab' }
        ]
      },
      {
        pageNumber: 2,
        title: 'Pearl Black Granite Slab - Silver Flecks',
        imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        category: 'Granite Slabs',
        hotspots: [
          { x: 50, y: 50, tileId: 'granite-pearl-black-13', tileName: 'Pearl Black Granite Slab' }
        ]
      },
      {
        pageNumber: 3,
        title: 'Steel Gray Granite - Modern Island Counter',
        imageUrl: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&q=80',
        category: 'Granite Slabs',
        hotspots: [
          { x: 50, y: 50, tileId: 'granite-steel-gray-14', tileName: 'Steel Gray Granite Slab' }
        ]
      },
      {
        pageNumber: 4,
        title: 'Silvassa Red Granite - Temple & Entrance Door Framing',
        imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
        category: 'Granite Slabs',
        hotspots: [
          { x: 50, y: 50, tileId: 'granite-silvassa-red-15', tileName: 'Silvassa Red Granite Slab' }
        ]
      },
      {
        pageNumber: 5,
        title: 'Lakha Red Granite - Imperial Facade & Steps',
        imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
        category: 'Granite Slabs',
        hotspots: [
          { x: 50, y: 50, tileId: 'granite-lakha-red-16', tileName: 'Lakha Red Premium Granite' }
        ]
      }
    ]
  },
  {
    id: 'cat-marbito-2026',
    title: 'Marbito & Signova Luxury Tiles Catalogue 2026',
    subtitle: 'Authorized Dealer Collection • GVT Slabs & Carving Series',
    category: 'GVT Slabs',
    year: '2026 Edition',
    pages: 50,
    fileSize: '24.5 MB',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    pdfUrl: '#download-marbito-2026',
    description: 'Official Marbito and Signova brand catalogue featuring high-gloss Statuario slabs, carved texture veins, and bookmatch luxury living room tiles.',
    featured: true,
    isNew: true,
    dimensions: ['800x1600mm', '600x1200mm'],
    tileCount: 160,
    minPricePerSqFt: 70,
    maxPricePerSqFt: 195,
    priceRangeLabel: '₹70 - ₹195 / sq.ft',
    tags: ['Marbito', 'Signova', 'GVT', 'Carving', 'Luxury'],
    pagesData: [
      {
        pageNumber: 1,
        title: 'Marbito Royale Statuario Slab - 800x1600mm',
        imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        category: 'Marbito Slabs',
        hotspots: [
          { x: 50, y: 50, tileId: 'marbito-gvt-17', tileName: 'Marbito Royale Statuario Slab' }
        ]
      },
      {
        pageNumber: 2,
        title: 'Signova Carved Calacatta Gold - 600x1200mm',
        imageUrl: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
        category: 'Signova Carving',
        hotspots: [
          { x: 50, y: 50, tileId: 'signova-carving-18', tileName: 'Signova Carved Calacatta Gold' }
        ]
      }
    ]
  },
  {
    id: 'cat-warmora-2026',
    title: 'Warmora & Wellnato Designer Tiles Catalogue 2026',
    subtitle: 'Authorized Dealer Collection • Floor Vitrified & Wall Concepts',
    category: 'Polished Vitrified',
    year: '2026 Edition',
    pages: 42,
    fileSize: '21.0 MB',
    coverImage: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=80',
    pdfUrl: '#download-warmora-2026',
    description: 'Official Warmora and Wellnato authorized catalogue featuring high reflectance floor vitrified tiles and 3D fluted bathroom wall concepts.',
    featured: true,
    isNew: true,
    dimensions: ['600x1200mm', '300x600mm'],
    tileCount: 130,
    minPricePerSqFt: 42,
    maxPricePerSqFt: 110,
    priceRangeLabel: '₹42 - ₹110 / sq.ft',
    tags: ['Warmora', 'Wellnato', 'Polished Vitrified', 'Wall Tile', '3D Fluted'],
    pagesData: [
      {
        pageNumber: 1,
        title: 'Warmora Imperial Crema Vitrified Floor',
        imageUrl: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
        category: 'Warmora Flooring',
        hotspots: [
          { x: 50, y: 50, tileId: 'warmora-floor-19', tileName: 'Warmora Imperial Crema' }
        ]
      },
      {
        pageNumber: 2,
        title: 'Wellnato 3D Fluted Wall Concept',
        imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
        category: 'Wellnato Wall',
        hotspots: [
          { x: 50, y: 50, tileId: 'wellnato-wall-20', tileName: 'Wellnato 3D Fluted Wall' }
        ]
      }
    ]
  },
  {
    id: 'cat-plumbing-2026',
    title: 'Finolex Plumbing & Rainbow Water Tanks Catalogue',
    subtitle: 'CPVC Pipes, PVC Fittings & 3-Layer UV Water Tanks',
    category: 'Sanitaryware',
    year: '2026 Edition',
    pages: 20,
    fileSize: '12.0 MB',
    coverImage: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1000&q=80',
    pdfUrl: '#download-plumbing-2026',
    description: 'Authorized Finolex plumbing systems and Rainbow 3-layer UV protected overhead water storage tanks available at Amol Tiles, Jath.',
    featured: false,
    isNew: true,
    dimensions: ['Pipes & Fittings', '500L to 2000L Tanks'],
    tileCount: 80,
    minPricePerSqFt: 25,
    maxPricePerSqFt: 80,
    priceRangeLabel: '₹25 - ₹80 / ft',
    tags: ['Finolex', 'Rainbow', 'Plumbing', 'Water Tank', 'CPVC'],
    pagesData: [
      {
        pageNumber: 1,
        title: 'Finolex Heavy Duty CPVC Plumbing Systems',
        imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80',
        category: 'Finolex Plumbing',
        hotspots: [
          { x: 50, y: 50, tileId: 'finolex-plumbing-21', tileName: 'Finolex CPVC Pipe System' }
        ]
      },
      {
        pageNumber: 2,
        title: 'Rainbow 3-Layer UV Protected Water Storage Tank',
        imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
        category: 'Rainbow Tanks',
        hotspots: [
          { x: 50, y: 50, tileId: 'rainbow-tank-22', tileName: 'Rainbow 3-Layer Water Tank' }
        ]
      }
    ]
  },
  {
    id: 'cat-sinkware-2026',
    title: 'Eureka, Squad & Jindal Sinkware & Fixtures',
    subtitle: '304 Stainless Steel Kitchen Sinks & Brass Bath Fittings',
    category: 'Kitchen Concepts',
    year: '2026 Edition',
    pages: 28,
    fileSize: '15.2 MB',
    coverImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80',
    pdfUrl: '#download-sinkware-2026',
    description: 'Authorized Eureka handcrafted steel sinks, Squad brass bath mixers & Jindal heavy duty kitchen sinkware catalogue.',
    featured: false,
    isNew: true,
    dimensions: ['Handcrafted Sinks', 'Single & Double Bowl', 'Brass Mixers'],
    tileCount: 95,
    minPricePerSqFt: 50,
    maxPricePerSqFt: 150,
    priceRangeLabel: '₹50 - ₹150 / pc',
    tags: ['Eureka', 'Squad', 'Jindal', 'Kitchen Sink', 'Bathroom Fixtures'],
    pagesData: [
      {
        pageNumber: 1,
        title: 'Eureka Handcrafted 304 Stainless Steel Kitchen Sink',
        imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
        category: 'Eureka Sinks',
        hotspots: [
          { x: 50, y: 50, tileId: 'eureka-sink-23', tileName: 'Eureka Stainless Steel Sink' }
        ]
      },
      {
        pageNumber: 2,
        title: 'Squad Heavy Brass Bathroom Single Lever Mixer',
        imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
        category: 'Squad Fittings',
        hotspots: [
          { x: 50, y: 50, tileId: 'squad-fixture-24', tileName: 'Squad Brass Mixer' }
        ]
      },
      {
        pageNumber: 3,
        title: 'Jindal Heavy Duty Kitchen Stainless Steel Sink',
        imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
        category: 'Jindal Sinks',
        hotspots: [
          { x: 50, y: 50, tileId: 'jindal-sink-25', tileName: 'Jindal Heavy Steel Sink' }
        ]
      }
    ]
  }
];

