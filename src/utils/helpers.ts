import { Product, UnitType, User } from '../types';

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('az-AZ', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price) + ' ₼';
};

export const calculateItemPrice = (
  product: Product,
  quantity: number
): { unitPrice: number; total: number; discountPercent: number; savings: number } => {
  let discountPercent = 0;
  if (product.bulkTiers && product.bulkTiers.length > 0) {
    const sortedTiers = [...product.bulkTiers].sort((a, b) => b.minQty - a.minQty);
    for (const tier of sortedTiers) {
      if (quantity >= tier.minQty) {
        discountPercent = tier.discountPercent;
        break;
      }
    }
  }

  const unitPrice = discountPercent > 0 
    ? product.price * (1 - discountPercent / 100) 
    : product.price;
    
  const regularTotal = product.price * quantity;
  const total = unitPrice * quantity;
  const savings = regularTotal - total;

  return { unitPrice, total, discountPercent, savings };
};

export const calculateEstimatedDelivery = (
  totalWeightKg: number,
  deliveryType: 'standard' | 'express_2h' | 'crane_truck' | 'pickup'
): { cost: number; description: string; vehicle: string } => {
  if (deliveryType === 'pickup') {
    return {
      cost: 0,
      description: 'Filialdan pulsuz təhvil alma (Dərnəgül və ya Sədərək anbarı)',
      vehicle: 'Şəxsi nəqliyyat'
    };
  }

  if (deliveryType === 'crane_truck') {
    return {
      cost: 45,
      description: 'Kran-Manipulyator ilə ünvana boşaltma (Paletlərlə və ağır yüklər üçün)',
      vehicle: 'Kran-Manipulyator (10-15 Tonna)'
    };
  }

  if (deliveryType === 'express_2h') {
    return {
      cost: 25,
      description: '2 saat ərzində təcili tikinti sahəsinə çatdırılma',
      vehicle: 'Ekspress Qazel'
    };
  }

  // Standard delivery based on weight
  if (totalWeightKg === 0) {
    return { cost: 5, description: 'Kuryerlə standart çatdırılma', vehicle: 'Kuryer avtomobili' };
  } else if (totalWeightKg <= 50) {
    return { cost: 8, description: 'Standart şəhərdaxili çatdırılma', vehicle: 'Yüngül yük avtomobili' };
  } else if (totalWeightKg <= 1500) {
    return { cost: 20, description: 'Bortlu yük maşını (Qazel)', vehicle: 'Qazel Yük Maşını (1.5 T)' };
  } else {
    return { cost: 35, description: 'Böyük tonnajlı yük maşını', vehicle: 'Bortlu KamAZ / MAN (5-10 T)' };
  }
};

export const DEMO_USERS: User[] = [
  {
    id: 'user-demo-1',
    name: 'Cavidan Vəlizadə',
    email: 'cavidan@tikinti.az',
    phone: '+994 50 123 45 67',
    role: 'individual',
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
    name: 'Elmir Həsənov (Elmir İnşaat MMC)',
    email: 'elmir@elmir-insaat.az',
    phone: '+994 70 888 99 00',
    role: 'contractor',
    companyName: 'Elmir İnşaat MMC',
    taxNumber: '1402839201',
    bonusPoints: 650,
    addresses: [
      {
        id: 'addr-b2b-1',
        title: 'Obyekt - Ağ Şəhər Layihəsi',
        city: 'Bakı',
        district: 'Xətai r-nu, Ağ Şəhər',
        fullAddress: 'Fəvvarələr meydanı küçəsi, Blok 3B',
        contactName: 'Elmir Həsənov',
        contactPhone: '+994 70 888 99 00',
        requiresCrane: true,
        isDefault: true
      }
    ],
    createdAt: '2024-04-12'
  }
];
