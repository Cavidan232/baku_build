import { Category, Product, Review } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'sement-quru',
    name: 'Sement və Quru Qarışıqlar',
    slug: 'sement-quru-qarisiqlar',
    iconName: 'Package',
    description: 'Norm Sement, Ağdağ gips, astar, şpatlyovka, kafel yapışdırıcıları',
    image: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=600&auto=format&fit=crop&q=80',
    itemCount: 42,
    subcategories: ['Sement', 'Gips əsaslı suvaqlar', 'Sement əsaslı suvaqlar', 'Kafel yapışdırıcıları', 'Şpatlyovka və Astar', 'Dərz dolğuları (Fuga)']
  },
  {
    id: 'armatur-metal',
    name: 'Armatur və Metal Məmulatları',
    slug: 'armatur-metal-memulatlari',
    iconName: 'Layers',
    description: 'A500C armatur, metal profil borular, sinklənmiş təbəqə, məftil',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=80',
    itemCount: 36,
    subcategories: ['Armatur (A500C)', 'Profil borular', 'Künclük və Şveller', 'Dəmir təbəqələr', 'Tikinti setkaları və Məftil']
  },
  {
    id: 'kerpic-blok',
    name: 'Kərpic, Qazobeton və Daş',
    slug: 'kerpic-qazobeton-das',
    iconName: 'Boxes',
    description: 'Qırmızı bişmiş kərpic, AAC qazobeton blok, Qaradağ mişar daşı',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&auto=format&fit=crop&q=80',
    itemCount: 28,
    subcategories: ['Bişmiş kərpiclər', 'Qazobeton bloklar (AAC)', 'Qaradağ mişar daşı', 'Dekorativ fasad kərpicləri', 'Beton bordyurlar']
  },
  {
    id: 'taxta-dikt',
    name: 'Taxta, Brus və Dikt (Fanera)',
    slug: 'taxta-brus-dikt',
    iconName: 'Trees',
    description: 'Rusiya şam taxtası, suya davamlı dikt, laminat və OSB',
    image: 'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?w=600&auto=format&fit=crop&q=80',
    itemCount: 31,
    subcategories: ['Şam taxtası və Brus', 'Dikt (Fanera)', 'OSB lövhələr', 'Döşəmə taxtası', 'Taxta reykalar']
  },
  {
    id: 'dam-izolyasiya',
    name: 'Dam Örtükləri və İzolyasiya',
    slug: 'dam-ortukleri-izolyasiya',
    iconName: 'ShieldCheck',
    description: 'Daş yunu, penoplast, ruberoid, profnastil, hidroizolyasiya',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&auto=format&fit=crop&q=80',
    itemCount: 39,
    subcategories: ['İstilik izolyasiyası (Daş yunu)', 'Hidroizolyasiya (Ruberoid, Mastika)', 'Penoplast və XPS', 'Profnastil və Çerepitsa', 'Buxar izolyasiya membranları']
  },
  {
    id: 'boya-kimyevi',
    name: 'Boya, Lak və Tikinti Kimyası',
    slug: 'boya-lak-tikinti-kimyasi',
    iconName: 'Paintbrush',
    description: 'Fasad və daxili emulsiya boyaları, astar, poliuretan köpük, silikon',
    image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&auto=format&fit=crop&q=80',
    itemCount: 45,
    subcategories: ['Daxili divar boyaları', 'Fasad boyaları', 'Montaj köpükləri və Silikonlar', 'Beton qatqıları və Plastifikatorlar', 'Lak və Taxta qoruyucuları']
  },
  {
    id: 'santexnika-boru',
    name: 'Santexnika və Boru Sistemləri',
    slug: 'santexnika-boru-sistemleri',
    iconName: 'Wrench',
    description: 'PPRC su boruları, kanalizasiya sistemləri, nasoslar, kranlar',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&auto=format&fit=crop&q=80',
    itemCount: 34,
    subcategories: ['PPRC isti/soyuq su boruları', 'Kanalizasiya boru və fitinqləri', 'Döşəməaltı isitmə boruları', 'Su nasosları və Hidrofor', 'Kran və Ventillər']
  },
  {
    id: 'elektrik-isiq',
    name: 'Elektrik və İşıqlandırma',
    slug: 'elektrik-isiqlandirma',
    iconName: 'Zap',
    description: 'Mis güc kabelləri, avtomat açarlar, qoruyucu şitlər, LED projektorlar',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80',
    itemCount: 30,
    subcategories: ['Güc kabelləri (VVG, NYM)', 'Avtomat açarlar və Qoruyucular', 'Paylayıcı qutular və Şitlər', 'Tikinti LED Projektorları', 'Rozetka və Açar sistemləri']
  },
  {
    id: 'aletler-avadanliq',
    name: 'Tikinti Alətləri və Avadanlıqlar',
    slug: 'tikinti-aletleri-avadanliqlar',
    iconName: 'Hammer',
    description: 'Drel, laqonda, lazer səviyyəölçən, əl alətləri, mala, ruletka',
    image: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?w=600&auto=format&fit=crop&q=80',
    itemCount: 40,
    subcategories: ['Elektrikli alətlər', 'Ölçü və Lazer cihazları', 'Suvaq və Kafel alətləri', 'Kəsici disklər və Qazmalar', 'Fərdi mühafizə vasitələri (Kaska, Əlcək)']
  }
];

export const BRANDS = [
  'Norm Sement',
  'Mətanət A',
  'Knauf',
  'Baku Steel Company',
  'Masterplast',
  'TexnoNikol',
  'Dyo',
  'Fab Boya',
  'Akfix',
  'Sika',
  'Pilsa',
  'Gəncə Kabel',
  'Schneider Electric',
  'Bosch',
  'Makita',
  'Kronospan'
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-norm-klass-400',
    name: 'Norm Klass 400 Sement (CEM II/B-M 32.5 R) 50 kq',
    sku: 'NRM-KL400-50',
    category: 'sement-quru',
    subcategory: 'Sement',
    brand: 'Norm Sement',
    price: 7.80,
    oldPrice: 8.50,
    unit: 'kisə',
    weightKg: 50,
    rating: 4.9,
    reviewCount: 142,
    inStock: true,
    stockCount: 850,
    minOrder: 1,
    image: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=600&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&auto=format&fit=crop&q=80'
    ],
    description: 'Norm Klass 400 sementi yüksək keyfiyyətli klinkerdən hazırlanmış, ümumi inşaat, bünövrə tökmə, hörgü və suvaq işləri üçün ideal universal sement növüdür.',
    features: [
      'Yüksək sıxılma möhkəmliyi (32.5 R)',
      'Çatlama və aqressiv mühitə qarşı gücləndirilmiş davamlılıq',
      'Birbaşa Qaradağ zavodundan sertifikatlı təchizat',
      'Standart: AZS 411-2010 və EN 197-1'
    ],
    specifications: [
      { key: 'Markası', value: 'CEM II/B-M (P-L) 32.5 R' },
      { key: 'Çəkisi', value: '50 kq (±1%)' },
      { key: 'İstehsalçı', value: 'Norm ASC (Azərbaycan)' },
      { key: 'İstifadə sahəsi', value: 'Bünövrə, beton panellər, hörgü, suvaq' },
      { key: 'Qablaşdırma', value: '3 qat nəmə davamlı kağız kisə' }
    ],
    tags: ['Zavod qiyməti', 'Ən çox satılan', 'Toplu sərfəli'],
    bulkTiers: [
      { minQty: 40, discountPercent: 5 },
      { minQty: 200, discountPercent: 8 },
      { minQty: 500, discountPercent: 12 }
    ],
    isFeatured: true,
    isDailyDeal: false
  },
  {
    id: 'prod-norm-master-500',
    name: 'Norm Master 500 Yüksək Möhkəmlikli Sement 50 kq',
    sku: 'NRM-MS500-50',
    category: 'sement-quru',
    subcategory: 'Sement',
    brand: 'Norm Sement',
    price: 8.90,
    oldPrice: 9.60,
    unit: 'kisə',
    weightKg: 50,
    rating: 5.0,
    reviewCount: 98,
    inStock: true,
    stockCount: 620,
    minOrder: 1,
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=80'
    ],
    description: 'Yüksək mərtəbəli binalar, körpülər və kritik yükdaşıyan dəmir-beton konstruksiyalar üçün sürətli bərkiyən xüsusi möhkəm sement.',
    features: [
      'Erkən yaşda yüksək möhkəmlik qazanma',
      'Şaxtayadavamlılıq və su keçirməzlik dərəcəsi W8',
      'M400 və M500 markalı beton qarışıqları üçün'
    ],
    specifications: [
      { key: 'Markası', value: 'CEM I 42.5 R (500 Marka)' },
      { key: 'Çəkisi', value: '50 kq' },
      { key: 'İstehsalçı', value: 'Norm Sement (Azərbaycan)' },
      { key: 'Bərkimə müddəti', value: 'İlkin: 160 dəq, Son: 230 dəq' }
    ],
    tags: ['Zavod qiyməti', 'Premium'],
    bulkTiers: [
      { minQty: 50, discountPercent: 6 },
      { minQty: 200, discountPercent: 10 }
    ],
    isFeatured: true
  },
  {
    id: 'prod-agdag-direk',
    name: 'Ağdağ Direk Gips Əsaslı Əl Suvağı 30 kq (Mətanət A)',
    sku: 'MTN-AGD-30',
    category: 'sement-quru',
    subcategory: 'Gips əsaslı suvaqlar',
    brand: 'Mətanət A',
    price: 6.20,
    oldPrice: 6.80,
    unit: 'kisə',
    weightKg: 30,
    rating: 4.8,
    reviewCount: 165,
    inStock: true,
    stockCount: 1100,
    minOrder: 1,
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&auto=format&fit=crop&q=80'
    ],
    description: 'İç məkanlarda kərpic, beton və qazobeton divarların birbaşa suvanması üçün yüksək yapışma qabiliyyətinə malik elastik gips suvağı.',
    features: [
      'Nəfəs alan divarlar təmin edir, otağın mikroiqlimini tənzimləyir',
      'Bir qatda 5-30 mm qalınlıqda asan tətbiq',
      'Çatlama vermir və parlaq hamar səth yaradır'
    ],
    specifications: [
      { key: 'Sərfiyyat', value: '1 sm qalınlıqda ~9-10 kq/m²' },
      { key: 'Qablaşdırma', value: '30 kq kağız kisə' },
      { key: 'İstifadə ömrü qarışdırıldıqdan sonra', value: '60-90 dəqiqə' },
      { key: 'İstehsalçı', value: 'Mətanət A (Azərbaycan)' }
    ],
    tags: ['Ən çox satılan', 'Usta tövsiyəsi'],
    bulkTiers: [
      { minQty: 30, discountPercent: 5 },
      { minQty: 100, discountPercent: 8 }
    ],
    isFeatured: true,
    isDailyDeal: true
  },
  {
    id: 'prod-knauf-rotband',
    name: 'Knauf Rotband Universal Gips Suvağı 30 kq',
    sku: 'KNF-ROTB-30',
    category: 'sement-quru',
    subcategory: 'Gips əsaslı suvaqlar',
    brand: 'Knauf',
    price: 8.50,
    oldPrice: 9.30,
    unit: 'kisə',
    weightKg: 30,
    rating: 4.9,
    reviewCount: 210,
    inStock: true,
    stockCount: 430,
    minOrder: 1,
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&auto=format&fit=crop&q=80'
    ],
    description: 'Dünya standartı keyfiyyətdə universal gips suvağı. Tavanlar və divarlar üçün qüsursuz yapışma və hamarlıq.',
    features: [
      'Bütün növ bərk mineral əsaslara möhkəm yapışma',
      'Yüksək elastiklik və asan çəkilmə',
      'Ekoloji təmiz təbii gips'
    ],
    specifications: [
      { key: 'Sərfiyyat', value: '10 mm qalınlıqda 8.5 kq/m²' },
      { key: 'Tətbiq qalınlığı', value: '5 mm - 50 mm' },
      { key: 'Qablaşdırma', value: '30 kq' },
      { key: 'Brend ölkəsi', value: 'Almaniya / Knauf' }
    ],
    tags: ['Premium', 'Orijinal'],
    bulkTiers: [
      { minQty: 35, discountPercent: 4 },
      { minQty: 100, discountPercent: 7 }
    ],
    isFeatured: true
  },
  {
    id: 'prod-rokol-kafel',
    name: 'Rokol Kafel və Keramoqranit Yapışdırıcısı 25 kq (Mətanət A)',
    sku: 'MTN-ROK-25',
    category: 'sement-quru',
    subcategory: 'Kafel yapışdırıcıları',
    brand: 'Mətanət A',
    price: 5.40,
    oldPrice: 6.00,
    unit: 'kisə',
    weightKg: 25,
    rating: 4.7,
    reviewCount: 88,
    inStock: true,
    stockCount: 780,
    minOrder: 1,
    image: 'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?w=600&auto=format&fit=crop&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?w=600&auto=format&fit=crop&q=80'],
    description: 'Daxili və xarici məkanlarda kafel, metlax, mozaika və orta ölçülü keramoqranit plitələrin yapışdırılması üçün polimer qatqılı xüsusi yapışdırıcı.',
    features: [
      'Sürüşməyə qarşı yüksək müqavimət (C1T standartı)',
      'Şaxtaya və suya tam davamlı',
      'İsti döşəmə sistemlərinə uyğundur'
    ],
    specifications: [
      { key: 'Sərfiyyat', value: 'Dişli malaya görə 3.5 - 5 kq/m²' },
      { key: 'Çəkisi', value: '25 kq' },
      { key: 'İstehsalçı', value: 'Mətanət A' }
    ],
    tags: ['Endirim', 'Ən çox satılan'],
    bulkTiers: [{ minQty: 40, discountPercent: 6 }],
    isFeatured: false
  },
  {
    id: 'prod-armatur-12mm',
    name: 'Armatur A500C Ø12 mm (Baku Steel) 1 metr / Tonna',
    sku: 'BSC-ARM-12',
    category: 'armatur-metal',
    subcategory: 'Armatur (A500C)',
    brand: 'Baku Steel Company',
    price: 1.25,
    oldPrice: 1.35,
    unit: 'metr',
    weightKg: 0.888,
    rating: 4.9,
    reviewCount: 112,
    inStock: true,
    stockCount: 15000,
    minOrder: 10,
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=80'],
    description: 'Qaynaq oluna bilən, yüksək möhkəmlikli periodik profilli A500C sinifli armatur. Bünövrə, karkas, sütun və rigellərin möhkəmləndirilməsi üçün nəzərdə tutulub.',
    features: [
      'A500C yüksək axıcılıq həddi',
      'Zavod sertifikatı və pasportu ilə təqdim edilir',
      'Kranla istənilən ünvana çatdırılma və boşaltma'
    ],
    specifications: [
      { key: 'Diametr', value: '12 mm' },
      { key: '1 metr çəkisi', value: '0.888 kq' },
      { key: 'Standart uzunluq', value: '11.7 metr və ya kəsilmiş' },
      { key: 'İstehsalçı', value: 'Baku Steel Company (Azərbaycan)' }
    ],
    tags: ['Zavod qiyməti', 'Toplu sərfəli'],
    bulkTiers: [
      { minQty: 500, discountPercent: 4 },
      { minQty: 2000, discountPercent: 8 }
    ],
    isFeatured: true
  },
  {
    id: 'prod-armatur-14mm',
    name: 'Armatur A500C Ø14 mm (Baku Steel)',
    sku: 'BSC-ARM-14',
    category: 'armatur-metal',
    subcategory: 'Armatur (A500C)',
    brand: 'Baku Steel Company',
    price: 1.68,
    oldPrice: 1.80,
    unit: 'metr',
    weightKg: 1.21,
    rating: 4.8,
    reviewCount: 74,
    inStock: true,
    stockCount: 12000,
    minOrder: 10,
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=80'],
    description: 'Yükdaşıyan sütunlar və monolit örtüklər üçün 14mm periodik armatur.',
    features: ['100% laboratoriya sınaqlı', 'Böyük partiyalar üçün birbaşa tərəzi qiyməti'],
    specifications: [
      { key: 'Diametr', value: '14 mm' },
      { key: '1 metr çəkisi', value: '1.21 kq' },
      { key: 'Polad markası', value: 'A500C' }
    ],
    tags: ['Zavod qiyməti'],
    isFeatured: false
  },
  {
    id: 'prod-profil-boru-40x40',
    name: 'Dördbucaqlı Metal Profil Boru 40x40x2.0 mm (6 metr)',
    sku: 'MET-PRF-4040',
    category: 'armatur-metal',
    subcategory: 'Profil borular',
    brand: 'Baku Steel Company',
    price: 18.50,
    oldPrice: 20.00,
    unit: 'ədəd',
    weightKg: 14.5,
    rating: 4.9,
    reviewCount: 53,
    inStock: true,
    stockCount: 420,
    minOrder: 1,
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=80'],
    description: 'Metal konstruksiyalar, hasarlar, qapı və çardaq karkasları üçün dəqiq həndəsi ölçülü profil boru.',
    features: ['Hamar səth və dəqiq 90 dərəcə bucaqlar', 'Qaynaq üçün optimal qalınlıq (2.0 mm)'],
    specifications: [
      { key: 'Ölçü', value: '40 x 40 mm' },
      { key: 'Divar qalınlığı', value: '2.0 mm' },
      { key: 'Uzunluq', value: '6 metr' }
    ],
    tags: ['Yeni', 'Toplu sərfəli'],
    isFeatured: false
  },
  {
    id: 'prod-kerpic-8goz',
    name: 'Qırmızı Bişmiş Tikinti Kərpici (8-Gözlü) 250x120x88 mm',
    sku: 'KRP-8GZ-RED',
    category: 'kerpic-blok',
    subcategory: 'Bişmiş kərpiclər',
    brand: 'Norm Sement',
    price: 0.38,
    oldPrice: 0.42,
    unit: 'ədəd',
    weightKg: 3.2,
    rating: 4.8,
    reviewCount: 89,
    inStock: true,
    stockCount: 45000,
    minOrder: 100,
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&auto=format&fit=crop&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&auto=format&fit=crop&q=80'],
    description: 'Yüksək temperaturlu sobada bişirilmiş möhkəm daxili və xarici divar hörgüsü üçün 8-gözlü kərpic. İsti və səs izolyasiyası yüksəkdir.',
    features: [
      'Dəqiq künclər və yüksək sıxılma həddi (M125)',
      '1 m² divar hörgüsünə ~38 ədəd kərpic sərf olunur',
      'Kran-manipulyator ilə paletlə boşaltma imkanı'
    ],
    specifications: [
      { key: 'Ölçülər', value: '250 x 120 x 88 mm' },
      { key: 'Paletdə say', value: '336 ədəd' },
      { key: 'Şaxtayadavamlılıq', value: 'F35 dövr' }
    ],
    tags: ['Zavod qiyməti', 'Ən çox satılan'],
    bulkTiers: [
      { minQty: 1000, discountPercent: 5 },
      { minQty: 5000, discountPercent: 10 }
    ],
    isFeatured: true
  },
  {
    id: 'prod-qazobeton-aac',
    name: 'AAC Qazobeton Blok D500 (600x300x200 mm)',
    sku: 'AAC-BLK-603020',
    category: 'kerpic-blok',
    subcategory: 'Qazobeton bloklar (AAC)',
    brand: 'Masterplast',
    price: 4.80,
    oldPrice: 5.20,
    unit: 'ədəd',
    weightKg: 18.0,
    rating: 4.9,
    reviewCount: 67,
    inStock: true,
    stockCount: 3200,
    minOrder: 10,
    image: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=600&auto=format&fit=crop&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=600&auto=format&fit=crop&q=80'],
    description: 'Yüngül, yüksək istilik və səs izolyasiyalı müasir avtoklav qazobeton blok. Binanın ümumi çəkisini azaldır və hörgü sürətini 3 dəfə artırır.',
    features: [
      'Xüsusi yapışdırıcı ilə cəmi 2-3 mm dərzlə hörülür',
      'A1 dərəcəli yanmaz material',
      'Kəsilməsi və elektrik yuvalarının açılması olduqca asandır'
    ],
    specifications: [
      { key: 'Ölçü', value: '600 x 300 x 200 mm' },
      { key: 'Sıxlıq', value: 'D500 kq/m³' },
      { key: 'İstilik keçiricilik', value: '0.12 W/mK' }
    ],
    tags: ['Yeni', 'Usta tövsiyəsi'],
    bulkTiers: [{ minQty: 100, discountPercent: 6 }],
    isFeatured: false
  },
  {
    id: 'prod-misar-dasi',
    name: 'Qaradağ Mişar Daşı (Güzdək 1-ci növ Əla Keyfiyyət)',
    sku: 'DAS-QRD-01',
    category: 'kerpic-blok',
    subcategory: 'Qaradağ mişar daşı',
    brand: 'Norm Sement',
    price: 0.85,
    oldPrice: 0.95,
    unit: 'ədəd',
    weightKg: 24.0,
    rating: 4.7,
    reviewCount: 130,
    inStock: true,
    stockCount: 18000,
    minOrder: 200,
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&auto=format&fit=crop&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&auto=format&fit=crop&q=80'],
    description: 'Qaradağ/Güzdək yatağından çıxarılan təbii ağ əhəngdaşı. Həyət evləri, villalar və hasarlar üçün ənənəvi etibarlı hörgü daşı.',
    features: ['1-ci növ bərk struktur, ovulmur', 'Bortlu yük maşınları ilə ünvana boşaldılma'],
    specifications: [
      { key: 'Ölçülər', value: '390 x 190 x 188 mm' },
      { key: 'Mənşəyi', value: 'Qaradağ / Azərbaycan' }
    ],
    tags: ['Zavod qiyməti'],
    isFeatured: false
  },
  {
    id: 'prod-sam-taxta-50x100',
    name: 'Rusiya Şam Taxtası (Brus) 50x100x6000 mm (1 ədəd)',
    sku: 'RUS-SAM-50100',
    category: 'taxta-dikt',
    subcategory: 'Şam taxtası və Brus',
    brand: 'Kronospan',
    price: 14.20,
    oldPrice: 15.50,
    unit: 'ədəd',
    weightKg: 16.0,
    rating: 4.8,
    reviewCount: 64,
    inStock: true,
    stockCount: 890,
    minOrder: 2,
    image: 'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?w=600&auto=format&fit=crop&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?w=600&auto=format&fit=crop&q=80'],
    description: 'Dam karkasları, arakəsmələr, döşəməaltı laqalar və qəlib işləri üçün 1-ci növ Rusiya şam ağacından hazırlanmış tir.',
    features: [
      'Düzgün kəsim və təbii qurudulmuş ağac',
      'Göbələk və çürüməyə qarşı yüksək müqavimət'
    ],
    specifications: [
      { key: 'Eni x Qalınlığı', value: '100 mm x 50 mm' },
      { key: 'Uzunluğu', value: '6.0 metr' },
      { key: 'Ağac növü', value: 'Rusiya Şamı (Sosna/Yel)' }
    ],
    tags: ['Ən çox satılan', 'Toplu sərfəli'],
    bulkTiers: [{ minQty: 30, discountPercent: 6 }],
    isFeatured: true
  },
  {
    id: 'prod-dikt-18mm-suya-davamli',
    name: 'Suya Davamlı Dikt (Fanera / FSF) 18 mm (1220x2440 mm)',
    sku: 'RUS-DKT-18FSF',
    category: 'taxta-dikt',
    subcategory: 'Dikt (Fanera)',
    brand: 'Kronospan',
    price: 52.00,
    oldPrice: 58.00,
    unit: 'ədəd',
    weightKg: 34.0,
    rating: 4.9,
    reviewCount: 42,
    inStock: true,
    stockCount: 210,
    minOrder: 1,
    image: 'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?w=600&auto=format&fit=crop&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?w=600&auto=format&fit=crop&q=80'],
    description: 'Beton qəlib (opalubka) və döşəməaltı hamarlama üçün suya və rütubətə 100% davamlı Rusiya istehsalı ağcaqayın dikti.',
    features: [
      'FSF suya davamlı fenol-formaldehid yapışdırıcı təbəqəsi',
      'Çoxsaylı monolit beton tökmələrinə dözümlü'
    ],
    specifications: [
      { key: 'Ölçü', value: '1220 x 2440 mm (~2.98 m²)' },
      { key: 'Qalınlıq', value: '18 mm' },
      { key: 'Material', value: '100% Ağcaqayın (Bereza)' }
    ],
    tags: ['Premium', 'Orijinal'],
    isFeatured: false
  },
  {
    id: 'prod-das-yunu-50mm',
    name: 'Masterplast Daş Yunu (İzolyasiya Paneli) 50 mm (50 kq/m³)',
    sku: 'MST-DYUN-50',
    category: 'dam-izolyasiya',
    subcategory: 'İstilik izolyasiyası (Daş yunu)',
    brand: 'Masterplast',
    price: 36.50,
    oldPrice: 41.00,
    unit: 'paçka',
    weightKg: 18.0,
    rating: 4.9,
    reviewCount: 78,
    inStock: true,
    stockCount: 350,
    minOrder: 1,
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&auto=format&fit=crop&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&auto=format&fit=crop&q=80'],
    description: 'Fasad, dam örtükləri və daxili arakəsmələrdə yüksək istilik və səs izolyasiyası təmin edən bazalt daş yunu lövhələri.',
    features: [
      'Yanmazlıq sinfi: A1 (1000°C-yə qədər yanmır)',
      '1 paçkada 7.2 m² sahə örtür (12 lövhə)',
      'Evin qızdırılma və soyudulma xərclərini 50% azaldır'
    ],
    specifications: [
      { key: 'Lövhə ölçüsü', value: '1200 x 600 mm' },
      { key: 'Qalınlıq', value: '50 mm' },
      { key: 'Sıxlıq', value: '50 kq/m³' }
    ],
    tags: ['Endirim', 'Usta tövsiyəsi'],
    bulkTiers: [{ minQty: 20, discountPercent: 7 }],
    isFeatured: true,
    isDailyDeal: true
  },
  {
    id: 'prod-ruberoid-texnonikol',
    name: 'TexnoNikol Bipol Hidroizolyasiya Ruberoidi (10 m²)',
    sku: 'TXN-BIP-10',
    category: 'dam-izolyasiya',
    subcategory: 'Hidroizolyasiya (Ruberoid, Mastika)',
    brand: 'TexnoNikol',
    price: 44.00,
    oldPrice: 49.00,
    unit: 'rulon',
    weightKg: 38.0,
    rating: 4.8,
    reviewCount: 51,
    inStock: true,
    stockCount: 290,
    minOrder: 1,
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&auto=format&fit=crop&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&auto=format&fit=crop&q=80'],
    description: 'Damların, bünövrələrin və yeraltı konstruksiyaların su keçirməzliyi üçün yandırılaraq yapışdırılan bitum-polimer membran.',
    features: ['Şüşə-parça (steklotkan) əsaslı möhkəm tərkib', '15+ il xidmət müddəti'],
    specifications: [
      { key: 'Rulon sahəsi', value: '10 m² (1 x 10 metr)' },
      { key: 'Qalınlıq', value: '3.8 mm' },
      { key: 'İstehsalçı', value: 'TexnoNikol' }
    ],
    tags: ['Zavod qiyməti'],
    isFeatured: false
  },
  {
    id: 'prod-dyo-dinamik-boya',
    name: 'Dyo Dinamik Silikonlu Yuyula Bilən Divar Boyası 15 Litr (Ağ)',
    sku: 'DYO-DNM-15L',
    category: 'boya-kimyevi',
    subcategory: 'Daxili divar boyaları',
    brand: 'Dyo',
    price: 115.00,
    oldPrice: 128.00,
    unit: 'ədəd',
    weightKg: 22.0,
    rating: 5.0,
    reviewCount: 94,
    inStock: true,
    stockCount: 160,
    minOrder: 1,
    image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&auto=format&fit=crop&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&auto=format&fit=crop&q=80'],
    description: 'İpək mat görünüşlü, silikon qatqılı, tam yuyula bilən daxili məkan boyası. Ləkə saxlamır, nəfəs alır və qoxusuzdur.',
    features: [
      '15 litrlə 150-180 m² sahəni iki qat boyamaq mümkündür',
      'İstənilən rəng çalarında kompüterlə tonlaşdırıla bilər',
      'Saralmayan və solmayan xüsusi formula'
    ],
    specifications: [
      { key: 'Həcmi', value: '15 Litr' },
      { key: 'Görünüş', value: 'İpək Mat (Matte Silk)' },
      { key: 'Quruma müddəti', value: 'Tam quruma: 24 saat' }
    ],
    tags: ['Premium', 'Ən çox satılan'],
    bulkTiers: [{ minQty: 5, discountPercent: 5 }],
    isFeatured: true,
    isDailyDeal: true
  },
  {
    id: 'prod-akfix-705-kopuk',
    name: 'Akfix 705 Sürətli Universal Yapışdırıcı Dəst (400ml + 100gr)',
    sku: 'AKF-705-SET',
    category: 'boya-kimyevi',
    subcategory: 'Montaj köpükləri və Silikonlar',
    brand: 'Akfix',
    price: 6.50,
    oldPrice: 7.50,
    unit: 'ədəd',
    weightKg: 0.5,
    rating: 4.9,
    reviewCount: 180,
    inStock: true,
    stockCount: 650,
    minOrder: 1,
    image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&auto=format&fit=crop&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&auto=format&fit=crop&q=80'],
    description: 'Cəmi 10 saniyədə taxta, MDF, rezin, plastik və dərini bərk yapışdıran aktivatorlu sianokrilat yapışdırıcı.',
    features: ['Dərhal yapışma', 'Peşəkar mebel və montaj işləri üçün əvəzolunmaz'],
    specifications: [
      { key: 'Dəst tərkibi', value: '400ml aerozol sprey + 100g maye' },
      { key: 'Yapışma vaxtı', value: '8 - 10 saniyə' }
    ],
    tags: ['Ən çox satılan'],
    isFeatured: false
  },
  {
    id: 'prod-pilsa-boru-25',
    name: 'Pilsa PPRC Kompozit İsti/Soyuq Su Borusu Ø25 mm (4 metr)',
    sku: 'PLS-PPR-25',
    category: 'santexnika-boru',
    subcategory: 'PPRC isti/soyuq su boruları',
    brand: 'Pilsa',
    price: 7.20,
    oldPrice: 8.00,
    unit: 'ədəd',
    weightKg: 1.4,
    rating: 4.8,
    reviewCount: 46,
    inStock: true,
    stockCount: 520,
    minOrder: 1,
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&auto=format&fit=crop&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&auto=format&fit=crop&q=80'],
    description: 'Şüşə lifi (fiberglas) qatlı xüsusi kompozit boru. İstilikdən uzanmır, 95°C temperatura və 20 Bar təzyiqə davamlıdır.',
    features: ['Ərp və pas bağlamır', '50 il zəmanətli istismar müddəti'],
    specifications: [
      { key: 'Diametr', value: 'Ø25 mm' },
      { key: 'Təzyiq sinfi', value: 'PN 20' },
      { key: 'Uzunluq', value: '4.0 metr' }
    ],
    tags: ['Zavod qiyməti'],
    isFeatured: false
  },
  {
    id: 'prod-gence-kabel-3x25',
    name: 'Gəncə Kabel Mis Güc Kabeli VVG-P 3x2.5 mm² (100 metr buxta)',
    sku: 'GNZ-VVG-325',
    category: 'elektrik-isiq',
    subcategory: 'Güc kabelləri (VVG, NYM)',
    brand: 'Gəncə Kabel',
    price: 135.00,
    oldPrice: 148.00,
    unit: 'rulon',
    weightKg: 12.0,
    rating: 4.9,
    reviewCount: 95,
    inStock: true,
    stockCount: 180,
    minOrder: 1,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80'],
    description: '100% təmiz elektrolitik mis damarlı, yanmayan PVC izolyasiyalı daxili elektrik naqilləri üçün rozetka xətti kabeli.',
    features: [
      'QOST və AZS standartlarına tam uyğundur',
      'Qızmaya və qısaqapanmaya qarşı etibarlı qoruma'
    ],
    specifications: [
      { key: 'Damar sayı və kəsiyi', value: '3 x 2.5 mm²' },
      { key: 'Uzunluq', value: '100 metr (Buxta)' },
      { key: 'İstehsalçı', value: 'Gəncə Kabel ASC (Azərbaycan)' }
    ],
    tags: ['Zavod qiyməti', 'Ən çox satılan'],
    bulkTiers: [{ minQty: 5, discountPercent: 5 }],
    isFeatured: true
  },
  {
    id: 'prod-bosch-drel',
    name: 'Bosch GSB 13 RE Zərbəli Elektrik Dreli (600W)',
    sku: 'BSH-GSB-13RE',
    category: 'aletler-avadanliq',
    subcategory: 'Elektrikli alətlər',
    brand: 'Bosch',
    price: 119.00,
    oldPrice: 135.00,
    unit: 'ədəd',
    weightKg: 2.0,
    rating: 5.0,
    reviewCount: 114,
    inStock: true,
    stockCount: 75,
    minOrder: 1,
    image: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?w=600&auto=format&fit=crop&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1508873696983-2df5293cb32f?w=600&auto=format&fit=crop&q=80'],
    description: 'Kompakt və güclü zərbəli drel. Beton, kərpic, polad və taxtanı asanlıqla qazmaq üçün peşəkar və məişət istifadəsinə yararlıdır.',
    features: [
      'Elektron sürət tənzimləməsi və revers düyməsi',
      'Erqonomik rezin tutacaq və dərinlik məhdudlaşdırıcısı'
    ],
    specifications: [
      { key: 'Güc', value: '600 Watt' },
      { key: 'Patron növü', value: 'Açarlı 1.5 - 13 mm' },
      { key: 'Çəkisi', value: '1.8 kq' }
    ],
    tags: ['Premium', 'Orijinal'],
    isFeatured: true,
    isDailyDeal: true
  },
  {
    id: 'prod-makita-laqonda',
    name: 'Makita GA5030R Bucaqlı Cilalama Maşını (Laqonda 125mm 720W)',
    sku: 'MKT-GA5030',
    category: 'aletler-avadanliq',
    subcategory: 'Elektrikli alətlər',
    brand: 'Makita',
    price: 125.00,
    oldPrice: 140.00,
    unit: 'ədəd',
    weightKg: 2.2,
    rating: 4.9,
    reviewCount: 88,
    inStock: true,
    stockCount: 60,
    minOrder: 1,
    image: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?w=600&auto=format&fit=crop&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1508873696983-2df5293cb32f?w=600&auto=format&fit=crop&q=80'],
    description: 'Armatur kəsmə, daşlama və qaynaq tikişlərini təmizləmə üçün incə korpuslu yapon keyfiyyətli laqonda.',
    features: ['Tozdan qorunmalı labirint konstruksiyası', 'Yenidən işə düşməyə qarşı Anti-Restart qoruyucu sistem'],
    specifications: [
      { key: 'Disk diametri', value: '125 mm' },
      { key: 'Dövrələr sayı', value: '11,000 dövr/dəq' },
      { key: 'Güc', value: '720 Watt' }
    ],
    tags: ['Usta tövsiyəsi', 'Orijinal'],
    isFeatured: false
  }
];

export const INITIAL_PRODUCTS = PRODUCTS;
export const BRANDS_LIST = BRANDS;

export const DEMO_USERS = [
  {
    id: 'user-demo-1',
    name: 'Cavidan Vəlizadə',
    email: 'cavidan@tikinti.az',
    phone: '+994 50 123 45 67',
    role: 'individual' as const,
    bonusPoints: 120,
    addresses: [
      {
        id: 'addr-1',
        title: 'Mənzil (Nərimanov)',
        city: 'Bakı',
        district: 'Nərimanov r-nu',
        fullAddress: 'Təbriz küçəsi 54, mənzil 28',
        contactName: 'Cavidan Vəlizadə',
        contactPhone: '+994 50 123 45 67',
        isDefault: true
      },
      {
        id: 'addr-2',
        title: 'Bağ Evi (Mərdəkan Tikinti Sahəsi)',
        city: 'Bakı',
        district: 'Xəzər r-nu, Mərdəkan qəsəbəsi',
        fullAddress: 'Qoşa Qala restoranının yanı, 4-cü dalan, ev 12',
        contactName: 'Usta Rauf (Nəzarətçi)',
        contactPhone: '+994 55 987 65 43',
        requiresCrane: true
      }
    ],
    createdAt: '2025-11-10'
  },
  {
    id: 'user-demo-contractor',
    name: 'Usta Rəşad (Briqadir)',
    email: 'usta.reshad@insaat.az',
    phone: '+994 70 888 99 00',
    role: 'contractor' as const,
    companyName: 'Usta Rəşad Təmir Briqadası',
    taxNumber: '1402839201',
    bonusPoints: 480,
    addresses: [
      {
        id: 'addr-b2b-1',
        title: 'Tikinti Obyekti - Şüvəlan Villa Layihəsi',
        city: 'Bakı',
        district: 'Xəzər r-nu, Şüvəlan',
        fullAddress: 'Mayak yolu, döngə 3, Villa 18',
        contactName: 'Usta Rəşad',
        contactPhone: '+994 70 888 99 00',
        requiresCrane: true,
        isDefault: true
      }
    ],
    createdAt: '2024-04-12'
  }
];

export const INITIAL_ORDERS = [
  {
    id: 'ord-1001',
    orderNumber: 'INS-928410',
    date: '10 Mart 2026',
    userId: 'user-demo-contractor',
    customerName: 'Usta Rəşad (Briqadir)',
    customerPhone: '+994 70 888 99 00',
    customerEmail: 'usta.reshad@insaat.az',
    items: [
      {
        productId: 'prod-norm-klass-400',
        productName: 'Norm Klass 400 Sement 50 kq',
        productImage: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=600&auto=format&fit=crop&q=80',
        price: 7.41,
        unit: 'kisə' as const,
        quantity: 40,
        total: 296.40
      },
      {
        productId: 'prod-agdag-direk',
        productName: 'Ağdağ Direk Gips Əl Suvağı 30 kq',
        productImage: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&auto=format&fit=crop&q=80',
        price: 5.89,
        unit: 'kisə' as const,
        quantity: 30,
        total: 176.70
      }
    ],
    subtotal: 473.10,
    discount: 25.00,
    deliveryFee: 45.00,
    total: 493.10,
    totalWeightKg: 2900,
    status: 'Yoldadır' as const,
    deliveryType: 'crane_truck' as const,
    deliveryAddress: 'Mayak yolu, döngə 3, Villa 18',
    deliveryCity: 'Bakı',
    paymentMethod: 'card_online' as const,
    isPaid: true,
    trackingUpdates: [
      {
        status: 'Gözləyir' as const,
        timestamp: '10 Mart, 09:15',
        description: 'Sifariş qeydə alındı və anbara ötürüldü'
      },
      {
        status: 'Hazırlanır' as const,
        timestamp: '10 Mart, 10:30',
        description: 'Materiallar Dərnəgül mərkəzi anbarında paletlərə yığıldı'
      },
      {
        status: 'Yoldadır' as const,
        timestamp: '10 Mart, 11:45',
        description: 'Kran-manipulyator yük maşını Şüvəlan ünvanına yola çıxdı'
      }
    ]
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'prod-norm-klass-400',
    userName: 'Usta Rauf Məmmədov',
    userRole: 'Monolit və Hörgü Ustası',
    rating: 5,
    date: '14 Fevral 2026',
    comment: 'Mərdəkanda villa bünövrəsi üçün 120 kisə sifariş etdik. Kranla vaxtında gətirib həyətə səliqəli yığdılar. Sementin bərkiməsi və keyfiyyəti əladır.',
    isVerifiedBuyer: true
  },
  {
    id: 'rev-2',
    productId: 'prod-norm-klass-400',
    userName: 'Elçin Quliyev',
    userRole: 'Fərdi Müştəri',
    rating: 5,
    date: '02 Mart 2026',
    comment: 'Toplu alış etdikdə əlavə 8% endirim hesablandı. Bazar qiymətindən xeyli ucuz başa gəldi.',
    isVerifiedBuyer: true
  },
  {
    id: 'rev-3',
    productId: 'prod-agdag-direk',
    userName: 'Kamran Əliyev',
    userRole: 'Təmir-Tikinti Briqadiri',
    rating: 5,
    date: '28 Yanvar 2026',
    comment: 'Ağdağ Direk həm kərpicə, həm də qazobetona mükəmməl yapışır. Uşaqlar 3 otaqlı mənzili 4 günə sıvadılar, çatlama vermədi.',
    isVerifiedBuyer: true
  },
  {
    id: 'rev-4',
    productId: 'prod-bosch-drel',
    userName: 'Zaur İsmayılov',
    userRole: 'Usta',
    rating: 5,
    date: '10 Mart 2026',
    comment: '100% orijinal Bosch malıdır, qarantiyası ilə birlikdə çatdırıldı. Zərbə gücü çox yaxşıdır.',
    isVerifiedBuyer: true
  }
];

