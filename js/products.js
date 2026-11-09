/**
 * AI WEB - Luxury Maison & E-Commerce Atelier
 * Master Product Catalog (Curated Luxury Goods in Pakistani Rupees - PKR / Rs.)
 */

const LUXURY_PRODUCTS = [
  // ==========================================
  // CATEGORY: BAGS & LEATHER GOODS
  // ==========================================
  {
    id: "bag-01",
    name: "The Sovereign Croc-Embossed Grand Tote",
    category: "bags",
    categoryLabel: "Bags & Leather",
    tag: "Atelier Signature",
    price: 950000,
    originalPrice: 1050000,
    rating: 4.9,
    reviewCount: 38,
    stock: 4,
    sku: "AIW-BAG-092",
    images: {
      primary: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80",
      secondary: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=80",
      angles: [
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=1000&q=80"
      ]
    },
    colors: [
      { name: "Obsidian Noir", hex: "#111111" },
      { name: "Royal Cognac", hex: "#8A4922" },
      { name: "Bordeaux Rouge", hex: "#5C1322" },
      { name: "Alabaster Ivory", hex: "#ECE9E2" }
    ],
    sizes: [
      { name: "Petite (28cm)", priceMod: 0 },
      { name: "Classic (35cm)", priceMod: 110000 },
      { name: "Grand Voyage (42cm)", priceMod: 210000 }
    ],
    shortDesc: "Sculpted from select Italian full-grain calfskin with deep crocodile relief and 24-karat gold-plated brass hardware.",
    fullDesc: "Conceived in our Florence atelier, The Sovereign Grand Tote represents the apex of modern leather artisanship. Each hide is hand-selected from heritage Italian tanneries, embossed under precise thermal pressure to yield an authentic croc grain, and finished with double beeswax edge painting that requires 18 hours of dedicated hand labor. A suede-lined sanctuary features dedicated compartments for your daily essentials, tech devices, and private documents.",
    specs: {
      "Origin": "Handcrafted in Florence, Italy",
      "Material": "100% Full-Grain Italian Calfskin",
      "Lining": "Natural Micro-Suede in Champagne",
      "Hardware": "Hand-Polished 24k Gold-Dipped Brass",
      "Dimensions": "35 cm W × 28 cm H × 14 cm D",
      "Handle Drop": "14 cm dual handles, 48 cm detachable shoulder strap"
    },
    reviews: [
      {
        author: "Eleanor Vance-St. Clair",
        location: "Geneva, Switzerland",
        rating: 5,
        date: "October 14, 2026",
        verified: true,
        title: "Breathtaking presence and immaculate hand-stitching",
        content: "The weight of the 24k hardware and the smell of the Tuscan leather are transcendent. Truly rivals the historic Parisian houses at a level of finish that is undeniable."
      },
      {
        author: "Zainab Malik",
        location: "Islamabad, Pakistan",
        rating: 5,
        date: "September 29, 2026",
        verified: true,
        title: "Absolute royalty in hand",
        content: "Delivered to my residence in Islamabad within 48 hours in immaculate wooden trunk packaging. Flawless craftsmanship."
      }
    ]
  },
  {
    id: "bag-02",
    name: "L'Étoile Quilted Flap Crossbody",
    category: "bags",
    categoryLabel: "Bags & Leather",
    tag: "Bestseller",
    price: 790000,
    originalPrice: null,
    rating: 5.0,
    reviewCount: 52,
    stock: 6,
    sku: "AIW-BAG-108",
    images: {
      primary: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80",
      secondary: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80",
      angles: [
        "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=1000&q=80"
      ]
    },
    colors: [
      { name: "Midnight Black", hex: "#161616" },
      { name: "Champagne Pearl", hex: "#E7DFD5" },
      { name: "Emerald Glaze", hex: "#173B2E" }
    ],
    sizes: [
      { name: "Classic (24cm)", priceMod: 0 },
      { name: "Mini Pochette (18cm)", priceMod: -85000 }
    ],
    shortDesc: "Signature chevron diamond quilting in lambskin leather, crowned with the AI WEB monogram turnlock.",
    fullDesc: "L'Étoile reimagines the timeless evening crossbody with plush French lambskin that feels like silk beneath your fingertips. Hand-quilted using over 2,400 precision stitches, it features a fluid woven leather-and-chain strap that transitions effortlessly from daytime shoulder carry to an opulent evening crossbody. The secure rotary lock seals with a satisfying mechanical click.",
    specs: {
      "Origin": "Parisian Atelier, France",
      "Material": "Supple French Lambskin",
      "Lining": "Burgundy Nappa Leather",
      "Hardware": "Brushed Champagne Gold Alloy",
      "Dimensions": "24 cm W × 16 cm H × 8 cm D",
      "Closure": "Monogram Mechanical Turnlock"
    },
    reviews: [
      {
        author: "Ayla Qureshi",
        location: "Lahore, Pakistan",
        rating: 5,
        date: "November 2, 2026",
        verified: true,
        title: "Perfection in proportion",
        content: "The lambskin is buttery soft, yet holds its architectural shape without a flaw. Arrived with authenticity card and dust bag."
      }
    ]
  },
  {
    id: "bag-03",
    name: "The Monaco Minaudière Clutch",
    category: "bags",
    categoryLabel: "Bags & Leather",
    tag: "Limited Edition",
    price: 595000,
    originalPrice: 660000,
    rating: 4.8,
    reviewCount: 24,
    stock: 2,
    sku: "AIW-BAG-304",
    images: {
      primary: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=1000&q=80",
      secondary: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80",
      angles: [
        "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80"
      ]
    },
    colors: [
      { name: "Liquid Gold", hex: "#D4AF37" },
      { name: "Obsidian Mirror", hex: "#0E0E10" },
      { name: "Rose Dore", hex: "#DCAE96" }
    ],
    sizes: [
      { name: "One Size", priceMod: 0 }
    ],
    shortDesc: "Sculptural metallic hardcase clutch lined in silk velvet with custom pavé crystal clasp.",
    fullDesc: "A gala silhouette carved from electroplated aerospace-grade aluminum and wrapped in high-gloss lacquer. The Monaco Minaudière sits like an art object in the palm, reflecting candlelight with magnetic allure. Includes a delicate serpent chain for optional shoulder drape.",
    specs: {
      "Origin": "Monte Carlo Exclusive Workshop",
      "Structure": "Hand-Polished Electroplated Aluminum Frame",
      "Interior": "Italian Black Silk Velvet",
      "Clasp": "Facet-Cut Austrian Crystal Push Lock",
      "Dimensions": "20 cm W × 11 cm H × 5 cm D"
    },
    reviews: [
      {
        author: "Camille Dupont",
        location: "Monaco",
        rating: 5,
        date: "October 20, 2026",
        verified: true,
        title: "A jewel for gala evenings",
        content: "Turned heads all evening. Fits my phone, cardholder, and lipstick perfectly."
      }
    ]
  },
  {
    id: "bag-04",
    name: "Atelier Heritage Saddle Weekender",
    category: "bags",
    categoryLabel: "Bags & Leather",
    tag: "Craftsman Edition",
    price: 1165000,
    originalPrice: null,
    rating: 4.9,
    reviewCount: 19,
    stock: 3,
    sku: "AIW-BAG-419",
    images: {
      primary: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80",
      secondary: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=80",
      angles: [
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80"
      ]
    },
    colors: [
      { name: "Heritage Saddle", hex: "#784421" },
      { name: "Carbon Noir", hex: "#1A1A1A" }
    ],
    sizes: [
      { name: "Cabin 50cm", priceMod: 0 },
      { name: "Long Voyage 60cm", priceMod: 165000 }
    ],
    shortDesc: "Vegetable-tanned Bavarian bridle leather travel companion engineered for private aviation cabins.",
    fullDesc: "Crafted for discerning jet-setters who require generational longevity. The Atelier Saddle Weekender will develop a breathtaking golden-amber patina with each voyage. Reinforcements include hand-hammered copper rivets, heavy-gauge YKK Excella gold zippers, and an interior waterproof compartment for tailored attire.",
    specs: {
      "Origin": "Munich, Germany",
      "Leather": "5mm Thick Full-Grain Bridle Leather",
      "Capacity": "48 Litres",
      "Dimensions": "52 cm L × 32 cm H × 26 cm D",
      "TSA Approval": "Standard Carry-On Compliant"
    },
    reviews: [
      {
        author: "Hamza Tariq",
        location: "Karachi, Pakistan",
        rating: 5,
        date: "August 12, 2026",
        verified: true,
        title: "Generational leather excellence",
        content: "Flown across multiple continents with it. The patina is developing into a rich honey shade."
      }
    ]
  },

  // ==========================================
  // CATEGORY: HAUTE PARFUMERIE
  // ==========================================
  {
    id: "perfume-01",
    name: "Ambre Impérial Extrait de Parfum",
    category: "perfumes",
    categoryLabel: "Haute Parfumerie",
    tag: "Maison Icon",
    price: 138000,
    originalPrice: 152000,
    rating: 5.0,
    reviewCount: 77,
    stock: 9,
    sku: "AIW-PRF-001",
    images: {
      primary: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&q=80",
      secondary: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1000&q=80",
      angles: [
        "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1000&q=80"
      ]
    },
    colors: [
      { name: "Crystal Amber", hex: "#C88A34" },
      { name: "Flacon Noir", hex: "#1C1C1E" }
    ],
    sizes: [
      { name: "50 ml Flacon", priceMod: 0 },
      { name: "100 ml Grand Flacon", priceMod: 60000 },
      { name: "250 ml Crystal Decanter", priceMod: 185000 }
    ],
    shortDesc: "Sensual warm amber, Madagascar bourbon vanilla, and smoked benzoin resin with a 32% pure oil concentration.",
    fullDesc: "Master Perfumer Jacques Moreau spent five years curating the raw botanical absolutes for Ambre Impérial. It opens with a luminous spark of Sicilian bergamot and pink peppercorn before sinking into a hypnotic heart of rare benzoin Siam, labdanum, and velvety tonka bean. The drydown leaves an intoxicating trail of toasted Madagascar vanilla and dark golden amber that lingers on skin for over 24 hours.",
    olfactory: {
      family: "Oriental Amber & Smoky Woods",
      concentration: "Extrait de Parfum (32% concentration)",
      topNotes: "Sicilian Bergamot, Madagascar Pink Peppercorn, Cardamom",
      heartNotes: "Benzoin Siam Resinoid, Turkish Rose Damascena, Tonka Bean",
      baseNotes: "Aged Golden Ambergris, Smoked Bourbon Vanilla, Patchouli Coeur"
    },
    specs: {
      "Bottle": "Heavy Baccarat-Style Smoked Crystal with 24k Gold Cap",
      "Vaporisateur": "Ultra-Fine Cashmere Mist Atomizer",
      "Origin": "Grasse, French Riviera",
      "Aging": "Macerated for 180 Days in Oak Casks"
    },
    reviews: [
      {
        author: "Shehryar Khan",
        location: "Lahore, Pakistan",
        rating: 5,
        date: "November 1, 2026",
        verified: true,
        title: "The scent of royal distinction",
        content: "Incredible sillage. Projection lasts beyond 24 hours in Pakistan's climate. The bourbon vanilla and ambergris are sublime."
      },
      {
        author: "Kareem Al-Mansoor",
        location: "Dubai, UAE",
        rating: 5,
        date: "October 18, 2026",
        verified: true,
        title: "Unrivaled sillage and longevity",
        content: "Stays on silk scarves for days. Magnificent projection without ever feeling loud."
      }
    ]
  },
  {
    id: "perfume-02",
    name: "Oud Sublime Royale Absolu",
    category: "perfumes",
    categoryLabel: "Haute Parfumerie",
    tag: "Rare Harvest",
    price: 189000,
    originalPrice: null,
    rating: 4.9,
    reviewCount: 41,
    stock: 5,
    sku: "AIW-PRF-012",
    images: {
      primary: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1000&q=80",
      secondary: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&q=80",
      angles: [
        "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1000&q=80"
      ]
    },
    colors: [
      { name: "Smoked Obsidian Flacon", hex: "#18181A" }
    ],
    sizes: [
      { name: "50 ml Flacon", priceMod: 0 },
      { name: "100 ml Grand Flacon", priceMod: 95000 }
    ],
    shortDesc: "Distilled from wild Assamese agarwood aged 40 years, blended with Taif rose and royal saffron threads.",
    fullDesc: "A scent of untamed majesty. The core agarwood is sustainably harvested from century-old trees in Northeast India, producing an oily, complex animalic wood note smoothed by dawn-picked Taif rose petals and the rich culinary warmth of Persian saffron.",
    olfactory: {
      family: "Deep Precious Woods & Smoked Leather",
      concentration: "Pure Perfume Oil Extract (38%)",
      topNotes: "Persian Saffron, Nutmeg Blossom, Sun-Drenched Bergamot",
      heartNotes: "Taif Rose Petals, Royal Leather Accord, Cistus Labdanum",
      baseNotes: "Assam Wild Agarwood (Oud), Cedar of Lebanon, Frankincense"
    },
    specs: {
      "Origin": "Distilled in Grasse & Muscat",
      "Limited Batch": "Only 300 Bottles Produced for 2026",
      "Packaging": "Lacquered Piano-Wood Presentation Box with Certificate"
    },
    reviews: [
      {
        author: "Bilal Siddiqui",
        location: "Karachi, Pakistan",
        rating: 5,
        date: "October 05, 2026",
        verified: true,
        title: "Pure oud royalty",
        content: "Authentic, spiritual, and commanding. The saffron and Taif rose make this an instant masterpiece."
      }
    ]
  },
  {
    id: "perfume-03",
    name: "Rose de Grasse & White Cedar",
    category: "perfumes",
    categoryLabel: "Haute Parfumerie",
    tag: "Spring Harvest",
    price: 108000,
    originalPrice: 120000,
    rating: 4.8,
    reviewCount: 33,
    stock: 8,
    sku: "AIW-PRF-044",
    images: {
      primary: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1000&q=80",
      secondary: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&q=80",
      angles: [
        "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1000&q=80"
      ]
    },
    colors: [
      { name: "Rose Dore Crystal", hex: "#E8C8C8" }
    ],
    sizes: [
      { name: "50 ml", priceMod: 0 },
      { name: "100 ml", priceMod: 50000 }
    ],
    shortDesc: "May Rose Centifolia hand-harvested at dawn, paired with crisp Virginia cedarwood and white musks.",
    fullDesc: "Capturing the fleeting dewy whisper of Provence in May. Hundred-petaled Rose Centifolia provides an airy honeyed floral heart, balanced by the architectural dryness of clean white cedar and luminous cashmeran silk.",
    olfactory: {
      family: "Solar Floral & Clean Woods",
      concentration: "Eau de Parfum Intense (22%)",
      topNotes: "Morning Dewdrops, Green Mandarin, Pink Peppercorn",
      heartNotes: "May Rose Centifolia Absolu, White Peony, Lily of the Valley",
      baseNotes: "White Atlas Cedar, Clean Silk Musks, Amberwood"
    },
    specs: {
      "Origin": "Grasse, France",
      "Bottle": "Frost-etched Fluted Glass",
      "Sustainable": "100% Organic Floral Absolute"
    },
    reviews: [
      {
        author: "Mehwish R.",
        location: "Islamabad, Pakistan",
        rating: 5,
        date: "September 15, 2026",
        verified: true,
        title: "Subtle, ethereal, and chic",
        content: "Crisp, dewy rose with an elegant cedar drydown. Perfect signature scent."
      }
    ]
  },
  {
    id: "perfume-04",
    name: "Nuit d'Or Smoked Incense & Tobacco",
    category: "perfumes",
    categoryLabel: "Haute Parfumerie",
    tag: "Atelier Exclusive",
    price: 145000,
    originalPrice: null,
    rating: 4.9,
    reviewCount: 29,
    stock: 4,
    sku: "AIW-PRF-089",
    images: {
      primary: "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=1000&q=80",
      secondary: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&q=80",
      angles: [
        "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1000&q=80"
      ]
    },
    colors: [
      { name: "Midnight Charcoal", hex: "#222224" }
    ],
    sizes: [
      { name: "100 ml Flacon", priceMod: 0 }
    ],
    shortDesc: "Omani silver frankincense, Cuban tobacco leaf, and charred oak barrel aged rum.",
    fullDesc: "Evoking the velvet salons of midnight Saint-Germain. Smoldering ecclesiastical incense entwines with rich sun-cured tobacco and a decadent pour of vintage rum, leaving an aura of irresistible charisma.",
    olfactory: {
      family: "Smoky Gourmand & Leather",
      concentration: "Extrait de Parfum (30%)",
      topNotes: "Aged Caribbean Rum, Dried Plum, Coriander Seed",
      heartNotes: "Cuban Dark Tobacco Leaf, Somalian Myrrh, Cinnamon Bark",
      baseNotes: "Omani Silver Frankincense, Castoreum, Guaiac Wood"
    },
    specs: {
      "Origin": "Paris & Muscat",
      "Bottle": "Matte Jet-Black Porcelain with Gold Inlay",
      "Longevity": "18+ Hours on Skin"
    },
    reviews: [
      {
        author: "Danyal Mirza",
        location: "Rawalpindi, Pakistan",
        rating: 5,
        date: "October 30, 2026",
        verified: true,
        title: "Intoxicating evening signature",
        content: "Dark, warm, and sophisticated. The tobacco and rum balance is incredible."
      }
    ]
  },

  // ==========================================
  // CATEGORY: FINE ACCESSORIES & TIMEPIECES
  // ==========================================
  {
    id: "acc-01",
    name: "The Royal Tourbillon Obsidian Chronograph",
    category: "accessories",
    categoryLabel: "Accessories & Timepieces",
    tag: "Masterpiece",
    price: 2475000,
    originalPrice: 2650000,
    rating: 5.0,
    reviewCount: 15,
    stock: 2,
    sku: "AIW-WAT-001",
    images: {
      primary: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=1000&q=80",
      secondary: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80",
      angles: [
        "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1000&q=80"
      ]
    },
    colors: [
      { name: "Rose Gold & Onyx", hex: "#B76E79" },
      { name: "Platinum & Deep Blue", hex: "#2C3E50" },
      { name: "Forged Carbon Noir", hex: "#1A1A1A" }
    ],
    sizes: [
      { name: "40 mm Case", priceMod: 0 },
      { name: "42 mm Grand Case", priceMod: 165000 }
    ],
    shortDesc: "Hand-assembled flying tourbillon movement in 18k Rose Gold with sunray obsidian dial and alligator strap.",
    fullDesc: "The pinnacle of Swiss haute horlogerie. Assembled by a single master watchmaker over 220 hours in La Chaux-de-Fonds, this timepiece features an open-worked flying tourbillon rotating once every 60 seconds to counteract gravity's effects. A double anti-reflective sapphire crystal reveals hand-beveled titanium bridges and 33 synthetic ruby jewels.",
    specs: {
      "Movement": "In-House Manual-Wind Calibre AIW-08 (72-hour power reserve)",
      "Case Material": "Solid 18K 750 Rose Gold (Certified Swiss Hallmark)",
      "Dial": "Natural Black Obsidian with Applied Hand-Polished Gold Indices",
      "Strap": "Hand-Stitched Mississippiensis Alligator Leather",
      "Water Resistance": "50 Metres (5 ATM)"
    },
    reviews: [
      {
        author: "Sultan Jahangir",
        location: "Karachi, Pakistan",
        rating: 5,
        date: "October 11, 2026",
        verified: true,
        title: "Horological triumph",
        content: "A genuine flying tourbillon of breathtaking finish. Keeps time with chronometric accuracy."
      }
    ]
  },
  {
    id: "acc-02",
    name: "Aurelia Hand-Rolled Mulberry Silk Carré",
    category: "accessories",
    categoryLabel: "Accessories & Timepieces",
    tag: "Bestseller",
    price: 135000,
    originalPrice: null,
    rating: 4.9,
    reviewCount: 68,
    stock: 12,
    sku: "AIW-ACC-032",
    images: {
      primary: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=1000&q=80",
      secondary: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80",
      angles: [
        "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=1000&q=80"
      ]
    },
    colors: [
      { name: "Emerald & Gold Crest", hex: "#1D4E3A" },
      { name: "Royal Navy & Coral", hex: "#1A2A44" },
      { name: "Monochrome Noir", hex: "#222222" }
    ],
    sizes: [
      { name: "90 × 90 cm Carré", priceMod: 0 },
      { name: "140 × 140 cm Grand Châle", priceMod: 65000 }
    ],
    shortDesc: "100% 18-momme Mulberry silk twill with artisan hand-screened mythological celestial pattern and hand-rolled roulotté edges.",
    fullDesc: "Screen-printed by generational artisans in Como, Italy, using 14 individual color plates. Each edge is rolled and stitched entirely by hand by master seamstresses, requiring forty minutes of meticulous work per scarf. Drapes with peerless fluidity around the neckline or hair.",
    specs: {
      "Material": "100% Organic Mulberry Silk Twill (18 Momme)",
      "Hem": "Hand-Rolled & Stitched (Roulotté Main)",
      "Dimensions": "90 cm × 90 cm",
      "Origin": "Como, Italy",
      "Care": "Dry Clean Only / Cool Iron"
    },
    reviews: [
      {
        author: "Fatima Abbasi",
        location: "Lahore, Pakistan",
        rating: 5,
        date: "October 22, 2026",
        verified: true,
        title: "Exquisite silk luster",
        content: "The hand-rolled hem and vibrant print quality are magnificent. Pairs gorgeously with formal evening wear."
      }
    ]
  },
  {
    id: "acc-03",
    name: "Celestial 18K Gold & Diamond Cufflinks",
    category: "accessories",
    categoryLabel: "Accessories & Timepieces",
    tag: "High Jewelry",
    price: 890000,
    originalPrice: 970000,
    rating: 5.0,
    reviewCount: 18,
    stock: 4,
    sku: "AIW-JWL-204",
    images: {
      primary: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80",
      secondary: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=1000&q=80",
      angles: [
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=1000&q=80"
      ]
    },
    colors: [
      { name: "Yellow Gold & White Diamonds", hex: "#D4AF37" },
      { name: "White Gold & Black Diamonds", hex: "#D9D9D9" }
    ],
    sizes: [
      { name: "Standard Link (16mm)", priceMod: 0 }
    ],
    shortDesc: "Handcrafted 18k yellow gold set with 48 brilliant-cut VVS1 ethically sourced natural diamonds (0.96 ctw).",
    fullDesc: "Designed for black-tie galas and state occasions. The octagonal bevel mimics the dome of the Place Vendôme, capturing illumination at every gesture with blazing diamond fire.",
    specs: {
      "Metal": "Solid 18K Gold (Hallmarked 750)",
      "Gemstones": "Natural Diamonds, Color F-G, Clarity VVS1",
      "Total Carat Weight": "0.96 Carats Total",
      "Mechanism": "Solid Gold Whaleback Toggle",
      "Certification": "GIA Certified Gemological Dossier Included"
    },
    reviews: [
      {
        author: "Asad Mansoor",
        location: "Islamabad, Pakistan",
        rating: 5,
        date: "September 19, 2026",
        verified: true,
        title: "Pure understated prestige",
        content: "Glows with immense elegance on double-cuff sherwanis and tailored suits. GIA dossier included."
      }
    ]
  },
  {
    id: "acc-04",
    name: "Venetian Hand-Carved Acetate Sunglasses",
    category: "accessories",
    categoryLabel: "Accessories & Timepieces",
    tag: "New Season",
    price: 178000,
    originalPrice: null,
    rating: 4.8,
    reviewCount: 37,
    stock: 7,
    sku: "AIW-EYE-101",
    images: {
      primary: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=80",
      secondary: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1000&q=80",
      angles: [
        "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1000&q=80"
      ]
    },
    colors: [
      { name: "Havana Tortoiseshell", hex: "#4A2F1C" },
      { name: "Piano Gloss Noir", hex: "#111111" },
      { name: "Champagne Crystal", hex: "#E9DFD1" }
    ],
    sizes: [
      { name: "Standard (52-20-145)", priceMod: 0 }
    ],
    shortDesc: "10mm Japanese cured acetate with Zeiss polarized emerald-tint lenses and 24k gold interior wire core.",
    fullDesc: "Sculpted through 48 individual hand-tumbling and polishing steps in Cadore, Italy. Features custom barrel hinges tensioned to lifelong smoothness and anti-reflective Carl Zeiss mineral glass lenses providing 100% UVA/UVB protection.",
    specs: {
      "Frame": "Japanese Takiron Cured Cellulose Acetate",
      "Lenses": "Carl Zeiss Polarized Mineral Glass (Category 3)",
      "Hinges": "Seven-Barrel Custom Riveted Hinges",
      "UV Protection": "100% UVA/UVB/UVC Protection up to 400nm",
      "Case": "Handcrafted Italian Leather Hard Case Included"
    },
    reviews: [
      {
        author: "Farhan Lodhi",
        location: "Karachi, Pakistan",
        rating: 5,
        date: "October 03, 2026",
        verified: true,
        title: "Optical perfection",
        content: "The balance on the bridge is superb. The Zeiss glass makes colors pop with unbelievable clarity."
      }
    ]
  }
];

// Helper to get product by ID (uses store.getProducts() when available)
function getProductById(id) {
  const catalog = (window.store && typeof window.store.getProducts === "function") 
    ? window.store.getProducts() 
    : LUXURY_PRODUCTS;
  return catalog.find(p => p.id === id) || null;
}
