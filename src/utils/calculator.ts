export interface WallCalcInput {
  length: number; // meters
  height: number; // meters
  openingsArea: number; // m² (windows + doors)
  materialType: 'red_brick_8' | 'aac_block' | 'mishar_stone';
  wallThickness: 'single' | 'double';
}

export interface WallCalcResult {
  netArea: number;
  totalPieces: number;
  palletsCount: number;
  cementBags: number; // 50kg bags
  sandCubicMeters: number;
}

export interface FloorCalcInput {
  roomLength: number; // meters
  roomWidth: number; // meters
  tileWidthCm: number;
  tileLengthCm: number;
  boxCoverageM2: number;
  layoutType: 'straight' | 'diagonal'; // 7% vs 10% reserve
}

export interface FloorCalcResult {
  areaM2: number;
  totalAreaWithWasteM2: number;
  boxesNeeded: number;
  adhesiveBags: number; // 25kg bags
  groutKg: number;
}

export interface PlasterCalcInput {
  wallAreaM2: number;
  thicknessMm: number; // e.g. 10mm, 20mm, 30mm
  plasterType: 'agdag_gypsum' | 'cement_sand';
}

export interface PlasterCalcResult {
  totalMaterialKg: number;
  bagsNeeded: number; // 30kg or 50kg bags
  primerLiters: number;
}

export interface ConcreteCalcInput {
  length: number;
  width: number;
  depth: number;
  concreteGrade: 'M200' | 'M300' | 'M350';
}

export interface ConcreteCalcResult {
  volumeM3: number;
  cementBags50kg: number;
  sandTons: number;
  gravelTons: number;
  rebarKgEstimated: number;
}

export const calculateWall = (input: WallCalcInput): WallCalcResult => {
  const grossArea = input.length * input.height;
  const netArea = Math.max(0, grossArea - input.openingsArea);

  let piecesPerM2 = 0;
  let palletSize = 336;
  let cementPerM2 = 0.2; // in 50kg bags
  let sandPerM2 = 0.025;

  if (input.materialType === 'red_brick_8') {
    // 250x120x88 mm brick
    piecesPerM2 = input.wallThickness === 'single' ? 38 : 76;
    palletSize = 336;
    cementPerM2 = input.wallThickness === 'single' ? 0.15 : 0.3;
    sandPerM2 = input.wallThickness === 'single' ? 0.02 : 0.04;
  } else if (input.materialType === 'aac_block') {
    // 600x300x200 mm block
    piecesPerM2 = input.wallThickness === 'single' ? 8.3 : 16.6;
    palletSize = 40;
    cementPerM2 = 0.05; // uses thin bed adhesive
    sandPerM2 = 0.005;
  } else if (input.materialType === 'mishar_stone') {
    // 390x190x188 mm Qaradağ daşı
    piecesPerM2 = input.wallThickness === 'single' ? 12.5 : 25;
    palletSize = 100;
    cementPerM2 = input.wallThickness === 'single' ? 0.22 : 0.45;
    sandPerM2 = input.wallThickness === 'single' ? 0.03 : 0.06;
  }

  // +5% cutting/breakage waste
  const totalPieces = Math.ceil(netArea * piecesPerM2 * 1.05);
  const palletsCount = Math.ceil(totalPieces / palletSize);
  const cementBags = Math.ceil(netArea * cementPerM2);
  const sandCubicMeters = Number((netArea * sandPerM2).toFixed(2));

  return {
    netArea: Number(netArea.toFixed(1)),
    totalPieces,
    palletsCount,
    cementBags,
    sandCubicMeters
  };
};

export const calculateFloor = (input: FloorCalcInput): FloorCalcResult => {
  const areaM2 = input.roomLength * input.roomWidth;
  const wasteMultiplier = input.layoutType === 'diagonal' ? 1.10 : 1.07;
  const totalAreaWithWasteM2 = areaM2 * wasteMultiplier;
  
  const boxCoverage = input.boxCoverageM2 > 0 ? input.boxCoverageM2 : 1.44;
  const boxesNeeded = Math.ceil(totalAreaWithWasteM2 / boxCoverage);
  
  // 1 bag of 25kg tile adhesive covers ~5 m²
  const adhesiveBags = Math.ceil(totalAreaWithWasteM2 / 5);
  
  // Grout: ~0.35 kg per m² for average tile joints
  const groutKg = Math.ceil(totalAreaWithWasteM2 * 0.35);

  return {
    areaM2: Number(areaM2.toFixed(2)),
    totalAreaWithWasteM2: Number(totalAreaWithWasteM2.toFixed(2)),
    boxesNeeded,
    adhesiveBags,
    groutKg
  };
};

export const calculatePlaster = (input: PlasterCalcInput): PlasterCalcResult => {
  const area = Math.max(0, input.wallAreaM2);
  const thicknessCm = input.thicknessMm / 10;
  
  // Agdag gypsum consumes ~9.5 kg per m² per 1cm thickness
  // Cement-sand plaster consumes ~16 kg per m² per 1cm thickness
  const kgPerM2PerCm = input.plasterType === 'agdag_gypsum' ? 9.5 : 16;
  const totalMaterialKg = area * thicknessCm * kgPerM2PerCm;
  
  const bagWeight = input.plasterType === 'agdag_gypsum' ? 30 : 50;
  const bagsNeeded = Math.ceil(totalMaterialKg / bagWeight);
  
  // Primer (Astar boya): ~0.15 Liters per m²
  const primerLiters = Math.ceil(area * 0.15);

  return {
    totalMaterialKg: Math.round(totalMaterialKg),
    bagsNeeded,
    primerLiters
  };
};

export const calculateConcrete = (input: ConcreteCalcInput): ConcreteCalcResult => {
  const volumeM3 = Number((input.length * input.width * input.depth).toFixed(2));
  
  // For M300 grade concrete: ~350kg cement, 0.5m³ sand (0.75 ton), 0.8m³ gravel (1.2 ton) per m³
  let cementPerM3 = 350; // kg
  if (input.concreteGrade === 'M200') cementPerM3 = 280;
  if (input.concreteGrade === 'M350') cementPerM3 = 400;

  const totalCementKg = volumeM3 * cementPerM3;
  const cementBags50kg = Math.ceil(totalCementKg / 50);
  const sandTons = Number((volumeM3 * 0.75).toFixed(2));
  const gravelTons = Number((volumeM3 * 1.2).toFixed(2));
  
  // Estimated foundation rebar density: ~80 kg per m³ of reinforced concrete
  const rebarKgEstimated = Math.round(volumeM3 * 80);

  return {
    volumeM3,
    cementBags50kg,
    sandTons,
    gravelTons,
    rebarKgEstimated
  };
};
