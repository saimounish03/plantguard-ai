export type Severity = "healthy" | "mild" | "severe";

export interface DiseaseInfo {
  name: string;
  severity: Severity;
  description: string;
  actions: string[];
  affectedCrops: string[];
}

export const DISEASE_DATA: Record<string, DiseaseInfo> = {
  Healthy: {
    name: "Healthy",
    severity: "healthy",
    description:
      "Your plant appears healthy with no signs of disease or infection. The leaf shows normal coloration, texture, and structure. Continue your current care practices to maintain plant health.",
    actions: [
      "Continue regular watering and fertilization schedule",
      "Monitor regularly for early signs of pest or disease",
      "Maintain good air circulation around plants",
    ],
    affectedCrops: ["All crops"],
  },
  "Early Blight": {
    name: "Early Blight",
    severity: "mild",
    description:
      "Early Blight is a fungal disease caused by Alternaria solani. It appears as dark brown spots with yellow halos on lower leaves. If untreated, it can spread quickly and reduce yield significantly.",
    actions: [
      "Remove and destroy infected leaves immediately",
      "Apply copper-based fungicide every 7–10 days",
      "Water at the base of plants to keep foliage dry",
    ],
    affectedCrops: ["Tomato", "Potato", "Pepper"],
  },
  "Late Blight": {
    name: "Late Blight",
    severity: "severe",
    description:
      "Late Blight is a devastating disease caused by Phytophthora infestans. It spreads rapidly in cool, wet conditions and can destroy an entire crop within days. Water-soaked spots turn dark brown with white mold underneath.",
    actions: [
      "Apply systemic fungicide (mancozeb or metalaxyl) immediately",
      "Remove and bury infected plants far from field",
      "Avoid overhead irrigation and improve drainage",
    ],
    affectedCrops: ["Tomato", "Potato"],
  },
  "Powdery Mildew": {
    name: "Powdery Mildew",
    severity: "mild",
    description:
      "Powdery Mildew is a fungal disease that forms a white powdery coating on leaf surfaces. It thrives in warm, dry conditions with high humidity. While rarely fatal, it weakens plants and reduces fruit quality.",
    actions: [
      "Spray with a solution of baking soda (1 tbsp per liter of water)",
      "Apply sulfur-based fungicide as directed",
      "Increase spacing between plants to improve air circulation",
    ],
    affectedCrops: ["Wheat", "Grape", "Apple", "Corn"],
  },
  Rust: {
    name: "Rust",
    severity: "mild",
    description:
      "Rust diseases are caused by various fungi and appear as orange-brown pustules on leaf undersides. They spread through wind-carried spores. Severe infections can cause premature leaf drop and reduced photosynthesis.",
    actions: [
      "Apply fungicide containing triazole or strobilurin",
      "Remove heavily infected leaves and dispose properly",
      "Plant disease-resistant varieties in future seasons",
    ],
    affectedCrops: ["Wheat", "Corn", "Apple", "Grape"],
  },
  "Leaf Spot": {
    name: "Leaf Spot",
    severity: "mild",
    description:
      "Leaf Spot diseases are caused by various fungi and bacteria. They appear as circular spots with darker borders, often with yellow halos. Multiple spots can merge, causing large dead areas on leaves.",
    actions: [
      "Remove infected leaves and clean up fallen debris",
      "Apply copper or chlorothalonil fungicide",
      "Avoid working with plants when foliage is wet",
    ],
    affectedCrops: ["Tomato", "Corn", "Rice", "Pepper"],
  },
  "Bacterial Blight": {
    name: "Bacterial Blight",
    severity: "severe",
    description:
      "Bacterial Blight is caused by Xanthomonas or Pseudomonas bacteria. Water-soaked lesions turn brown and dry. Infected tissue may ooze bacterial exudate. Spreads rapidly in rainy weather.",
    actions: [
      "Apply copper bactericide as a preventive spray",
      "Avoid overhead irrigation and field work when wet",
      "Use certified disease-free seeds for future planting",
    ],
    affectedCrops: ["Rice", "Pepper", "Tomato", "Wheat"],
  },
  "Downy Mildew": {
    name: "Downy Mildew",
    severity: "mild",
    description:
      "Downy Mildew is caused by oomycete pathogens. Yellow angular spots appear on upper leaf surfaces while downy gray-purple growth develops underneath. It spreads rapidly in cool, moist conditions.",
    actions: [
      "Apply metalaxyl or fosetyl-aluminum fungicide",
      "Improve field drainage and reduce humidity",
      "Plant resistant varieties and rotate crops yearly",
    ],
    affectedCrops: ["Grape", "Corn", "Wheat"],
  },
  "Gray Mold": {
    name: "Gray Mold",
    severity: "mild",
    description:
      "Gray Mold, caused by Botrytis cinerea, produces soft brown lesions covered with gray fuzzy spores. It attacks weakened or damaged plant tissue first. Cool, humid conditions promote rapid spread.",
    actions: [
      "Remove all infected plant material promptly",
      "Apply iprodione or fenhexamid fungicide",
      "Reduce humidity by improving ventilation and spacing",
    ],
    affectedCrops: ["Tomato", "Grape", "Apple", "Strawberry"],
  },
  Anthracnose: {
    name: "Anthracnose",
    severity: "severe",
    description:
      "Anthracnose is caused by Colletotrichum fungi and creates dark, sunken lesions on leaves, stems, and fruits. It can cause significant post-harvest losses. The disease spreads through rain splash and infected tools.",
    actions: [
      "Apply mancozeb or chlorothalonil fungicide every 10–14 days",
      "Harvest fruits before full ripeness to prevent spread",
      "Sterilize tools with bleach solution after use",
    ],
    affectedCrops: ["Tomato", "Apple", "Pepper", "Grape"],
  },
  "Fusarium Wilt": {
    name: "Fusarium Wilt",
    severity: "severe",
    description:
      "Fusarium Wilt is caused by soil-borne Fusarium fungi. Plants wilt, yellow, and die as the fungus blocks water-conducting vessels. There is no effective cure once a plant is infected.",
    actions: [
      "Remove and destroy infected plants immediately",
      "Rotate crops with non-susceptible species for 3–4 years",
      "Use resistant varieties and sterilized growing media",
    ],
    affectedCrops: ["Tomato", "Pepper", "Wheat", "Corn"],
  },
  "Mosaic Virus": {
    name: "Mosaic Virus",
    severity: "severe",
    description:
      "Mosaic Virus causes mottled yellow-green patterns on leaves and stunted growth. It is spread by aphids and infected tools. There is no chemical cure; prevention is the only effective strategy.",
    actions: [
      "Remove and destroy infected plants immediately",
      "Control aphid populations with insecticide or reflective mulch",
      "Use virus-resistant seed varieties and disinfect tools",
    ],
    affectedCrops: ["Tomato", "Pepper", "Corn", "Potato"],
  },
  "Yellow Leaf Curl": {
    name: "Yellow Leaf Curl",
    severity: "severe",
    description:
      "Yellow Leaf Curl Virus is transmitted by whiteflies. Leaves curl upward and turn yellow, and plants become stunted and unproductive. Once infected, plants cannot recover and must be removed.",
    actions: [
      "Control whitefly populations with imidacloprid or neem oil",
      "Use reflective mulch to repel whiteflies",
      "Plant virus-resistant tomato varieties",
    ],
    affectedCrops: ["Tomato", "Pepper"],
  },
  "Cercospora Leaf Spot": {
    name: "Cercospora Leaf Spot",
    severity: "mild",
    description:
      "Cercospora Leaf Spot creates small, circular spots with gray centers and reddish-brown borders. As spots enlarge, affected leaves turn yellow and drop. Warm, humid weather accelerates spread.",
    actions: [
      "Apply fungicides containing mancozeb or carbendazim",
      "Remove infected leaves and improve air circulation",
      "Avoid wetting foliage during irrigation",
    ],
    affectedCrops: ["Corn", "Rice", "Pepper", "Apple"],
  },
  "Crown Rot": {
    name: "Crown Rot",
    severity: "severe",
    description:
      "Crown Rot is caused by soil-borne pathogens like Sclerotinia or Phytophthora. The crown and base of the stem rot, causing wilting and plant death. Waterlogged soils dramatically increase infection risk.",
    actions: [
      "Improve field drainage immediately",
      "Apply phosphonate fungicide as a soil drench",
      "Avoid planting in infected soil for 2–3 seasons",
    ],
    affectedCrops: ["Tomato", "Pepper", "Apple", "Wheat"],
  },
  "Root Rot": {
    name: "Root Rot",
    severity: "severe",
    description:
      "Root Rot is caused by multiple soil pathogens including Pythium and Rhizoctonia. Roots turn brown and mushy, cutting off water and nutrient supply. Overwatering and poor drainage are primary causes.",
    actions: [
      "Reduce watering frequency and improve soil drainage",
      "Apply biological fungicides like Trichoderma to soil",
      "Replant in fresh, well-draining growing media",
    ],
    affectedCrops: ["All crops"],
  },
  Scab: {
    name: "Scab",
    severity: "mild",
    description:
      "Scab is caused by Venturia fungi and creates dark, scabby lesions on leaves and fruit surfaces. It reduces marketability of produce significantly. Cool, wet spring weather favors infection and spread.",
    actions: [
      "Apply captan or thiophanate-methyl fungicide at 7–14 day intervals",
      "Collect and destroy fallen leaves to reduce spore source",
      "Plant scab-resistant varieties where available",
    ],
    affectedCrops: ["Apple", "Potato"],
  },
  Canker: {
    name: "Canker",
    severity: "severe",
    description:
      "Canker diseases create sunken, dead areas on stems and branches. They are caused by both fungal and bacterial pathogens. Infected bark cracks and tissue dies, eventually girdling and killing affected branches.",
    actions: [
      "Prune infected branches 15cm below visible symptoms",
      "Sterilize pruning tools between cuts with 70% alcohol",
      "Apply copper-based bactericide to pruning wounds",
    ],
    affectedCrops: ["Apple", "Grape", "Tomato"],
  },
  "Fire Blight": {
    name: "Fire Blight",
    severity: "severe",
    description:
      "Fire Blight is a bacterial disease caused by Erwinia amylovora. Infected blossoms, shoots, and branches turn brown or black and look scorched, giving the name 'fire blight'. It spreads rapidly during bloom period.",
    actions: [
      "Prune infected wood 30cm below visible symptoms",
      "Apply copper bactericide during bloom period",
      "Avoid excessive nitrogen fertilization that promotes soft growth",
    ],
    affectedCrops: ["Apple", "Grape"],
  },
  "Blossom End Rot": {
    name: "Blossom End Rot",
    severity: "mild",
    description:
      "Blossom End Rot is a physiological disorder caused by calcium deficiency, often related to irregular watering. Dark, sunken spots appear at the blossom end of fruits. It is not contagious but affects fruit quality and yield.",
    actions: [
      "Maintain consistent soil moisture with regular irrigation",
      "Apply calcium foliar spray (calcium chloride solution)",
      "Test soil pH and maintain between 6.2–6.8 for calcium availability",
    ],
    affectedCrops: ["Tomato", "Pepper"],
  },
};

export const DISEASE_NAMES = Object.keys(DISEASE_DATA);

// Weighted selection — Healthy has ~30% probability
export const DISEASE_WEIGHTS: Record<string, number> = {
  Healthy: 30,
  "Early Blight": 8,
  "Late Blight": 6,
  "Powdery Mildew": 8,
  Rust: 7,
  "Leaf Spot": 8,
  "Bacterial Blight": 5,
  "Downy Mildew": 5,
  "Gray Mold": 4,
  Anthracnose: 3,
  "Fusarium Wilt": 3,
  "Mosaic Virus": 3,
  "Yellow Leaf Curl": 2,
  "Cercospora Leaf Spot": 3,
  "Crown Rot": 2,
  "Root Rot": 2,
  Scab: 2,
  Canker: 1,
  "Fire Blight": 1,
  "Blossom End Rot": 2,
};

export function getRandomDisease(): string {
  const entries = Object.entries(DISEASE_WEIGHTS);
  const totalWeight = entries.reduce((sum, [, w]) => sum + w, 0);
  let random = Math.random() * totalWeight;
  for (const [disease, weight] of entries) {
    random -= weight;
    if (random <= 0) return disease;
  }
  return "Healthy";
}

export function getRandomConfidence(): number {
  return Math.floor(Math.random() * (98 - 72 + 1)) + 72;
}

export function getSeverityLabel(severity: Severity): string {
  switch (severity) {
    case "healthy":
      return "Healthy";
    case "mild":
      return "Mild";
    case "severe":
      return "Severe";
  }
}

export const CROP_TYPES = [
  "Tomato",
  "Potato",
  "Corn",
  "Wheat",
  "Rice",
  "Apple",
  "Grape",
  "Pepper",
  "Other",
];

export const DISEASE_LIBRARY: Array<{
  name: string;
  severity: Severity;
  shortDesc: string;
  affectedCrops: string[];
}> = [
  {
    name: "Early Blight",
    severity: "mild",
    shortDesc: "Dark spots with yellow halos on lower leaves",
    affectedCrops: ["Tomato", "Potato", "Pepper"],
  },
  {
    name: "Late Blight",
    severity: "severe",
    shortDesc: "Water-soaked lesions that rapidly turn brown",
    affectedCrops: ["Tomato", "Potato"],
  },
  {
    name: "Powdery Mildew",
    severity: "mild",
    shortDesc: "White powdery coating on leaf surfaces",
    affectedCrops: ["Wheat", "Grape", "Apple"],
  },
  {
    name: "Rust",
    severity: "mild",
    shortDesc: "Orange-brown pustules on leaf undersides",
    affectedCrops: ["Wheat", "Corn", "Apple"],
  },
  {
    name: "Bacterial Blight",
    severity: "severe",
    shortDesc: "Water-soaked lesions that turn brown and dry",
    affectedCrops: ["Rice", "Pepper", "Tomato"],
  },
  {
    name: "Fusarium Wilt",
    severity: "severe",
    shortDesc: "Yellowing and wilting from soil-borne fungus",
    affectedCrops: ["Tomato", "Pepper", "Wheat"],
  },
  {
    name: "Mosaic Virus",
    severity: "severe",
    shortDesc: "Mottled yellow-green patterns, stunted growth",
    affectedCrops: ["Tomato", "Corn", "Pepper"],
  },
  {
    name: "Anthracnose",
    severity: "severe",
    shortDesc: "Dark sunken lesions on leaves, stems, fruit",
    affectedCrops: ["Tomato", "Apple", "Pepper"],
  },
  {
    name: "Downy Mildew",
    severity: "mild",
    shortDesc: "Yellow spots above, gray growth underneath",
    affectedCrops: ["Grape", "Corn", "Wheat"],
  },
  {
    name: "Gray Mold",
    severity: "mild",
    shortDesc: "Soft brown lesions with gray fuzzy spores",
    affectedCrops: ["Tomato", "Grape", "Apple"],
  },
  {
    name: "Fire Blight",
    severity: "severe",
    shortDesc: "Scorched-looking blossoms and shoots",
    affectedCrops: ["Apple", "Grape"],
  },
  {
    name: "Leaf Spot",
    severity: "mild",
    shortDesc: "Circular spots with darker borders and halos",
    affectedCrops: ["Tomato", "Corn", "Rice"],
  },
];
