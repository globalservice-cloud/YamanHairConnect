import type { Service } from "@shared/schema";
import type { LucideIcon } from "lucide-react";
import { Droplets, Palette, Scissors, Sparkles, Waves } from "lucide-react";

import washingImage from "@assets/stock_images/clean_professional_h_d5fc4d99.jpg";
import cuttingImage from "@assets/stock_images/professional_hairdre_9015c124.jpg";
import coloringImage from "@assets/stock_images/professional_hair_co_3a1117ee.jpg";
import permingImage from "@assets/stock_images/hair_perm_curling_se_31f1e998.jpg";
import treatmentImage from "@assets/generated_images/Professional_hair_treatment_service_d3367325.png";

type ServiceVisual = {
  name: string;
  description: string;
  basePriceLabel: string;
  image: string;
  icon: LucideIcon;
};

const serviceVisualOrder = ["洗髮", "專業剪髮", "時尚染髮", "質感燙髮", "深層護髮"] as const;

export const serviceVisuals: Record<string, ServiceVisual> = {
  洗髮: {
    name: "洗髮",
    description: "舒適的洗髮體驗，使用優質產品完成基礎清潔與放鬆頭皮按摩。",
    basePriceLabel: "NT$ 250",
    image: washingImage,
    icon: Droplets,
  },
  專業剪髮: {
    name: "專業剪髮",
    description: "依臉型、氣質與生活風格量身打造，維持整體造型與線條比例。",
    basePriceLabel: "NT$ 400",
    image: cuttingImage,
    icon: Scissors,
  },
  時尚染髮: {
    name: "時尚染髮",
    description: "使用頂級染劑打造高質感髮色，兼顧飽和度與髮質保護。",
    basePriceLabel: "NT$ 2,000 起",
    image: coloringImage,
    icon: Palette,
  },
  質感燙髮: {
    name: "質感燙髮",
    description: "以溫和藥水塑造自然彈性與蓬鬆度，減少對髮絲的傷害。",
    basePriceLabel: "NT$ 2,000 起",
    image: permingImage,
    icon: Waves,
  },
  深層護髮: {
    name: "深層護髮",
    description: "針對受損髮質補充養分與水分，恢復健康光澤與柔順度。",
    basePriceLabel: "NT$ 800 起",
    image: treatmentImage,
    icon: Sparkles,
  },
};

const fallbackVisual = serviceVisuals["專業剪髮"];

const currencyFormatter = new Intl.NumberFormat("zh-TW", {
  style: "currency",
  currency: "TWD",
  maximumFractionDigits: 0,
});

function formatPriceLabel(service?: Pick<Service, "price" | "priceNote">, fallback?: string) {
  if (typeof service?.price === "number") {
    const base = currencyFormatter.format(service.price);
    return service.priceNote ? `${base} ${service.priceNote}` : base;
  }

  if (service?.priceNote) {
    return service.priceNote;
  }

  return fallback ?? "請洽門市";
}

function resolveVisual(name?: string) {
  if (name && serviceVisuals[name]) {
    return serviceVisuals[name];
  }
  return fallbackVisual;
}

export function buildServiceCardData(service?: Service | null) {
  const visual = resolveVisual(service?.name);
  return {
    title: service?.name ?? visual.name,
    description: service?.description ?? visual.description,
    price: formatPriceLabel(service, visual.basePriceLabel),
    image: visual.image,
  };
}

export function buildServiceHighlightData(service?: Service | null) {
  const visual = resolveVisual(service?.name);
  return {
    title: service?.name ?? visual.name,
    description: service?.description ?? visual.description,
    price: formatPriceLabel(service, visual.basePriceLabel),
    icon: visual.icon,
  };
}

export const defaultServiceCards = serviceVisualOrder.map((name) => {
  const visual = resolveVisual(name);
  return {
    title: visual.name,
    description: visual.description,
    price: visual.basePriceLabel,
    image: visual.image,
  };
});

export const defaultServiceHighlights = serviceVisualOrder.slice(0, 4).map((name) => {
  const visual = resolveVisual(name);
  return {
    title: visual.name,
    description: visual.description,
    price: visual.basePriceLabel,
    icon: visual.icon,
  };
});


