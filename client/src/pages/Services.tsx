import ServiceCard from "@/components/ServiceCard";
import { Scissors, Palette, Waves, Sparkles, Wind, Droplets } from "lucide-react";
import cuttingImage from '@assets/generated_images/Hair_cutting_service_ac14a7f9.png';
import coloringImage from '@assets/generated_images/Hair_coloring_service_8a98426c.png';
import treatmentImage from '@assets/generated_images/Hair_treatment_service_44b1f4a0.png';

export default function Services() {
  const services = [
    {
      title: "專業剪髮",
      description: "根據您的臉型、氣質與生活方式，設計專屬於您的完美髮型。我們的設計師會細心傾聽您的需求，提供專業建議。",
      price: "NT$ 800 起",
      image: cuttingImage,
      icon: Scissors,
    },
    {
      title: "時尚染髮",
      description: "使用頂級染劑，為您呈現完美髮色。從自然色系到時尚潮流色，都能展現您的獨特魅力。",
      price: "NT$ 2,000 起",
      image: coloringImage,
      icon: Palette,
    },
    {
      title: "質感燙髮",
      description: "打造自然捲度與蓬鬆感，讓頭髮充滿生命力。使用溫和藥水，降低對髮質的傷害。",
      price: "NT$ 2,500 起",
      image: treatmentImage,
      icon: Waves,
    },
    {
      title: "深層護髮",
      description: "針對受損髮質提供深層修護，補充養分與水分，讓秀髮恢復健康光澤。",
      price: "NT$ 800 起",
      image: treatmentImage,
      icon: Sparkles,
    },
    {
      title: "造型設計",
      description: "特殊場合造型設計，婚禮、派對或重要約會，讓您成為全場焦點。",
      price: "NT$ 1,200 起",
      image: cuttingImage,
      icon: Wind,
    },
    {
      title: "頭皮護理",
      description: "深層清潔頭皮，促進血液循環，改善頭皮健康，為秀髮打好基礎。",
      price: "NT$ 600 起",
      image: coloringImage,
      icon: Droplets,
    },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-serif font-bold mb-4">服務項目</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            從基礎護理到時尚造型，我們提供全方位的專業美髮服務
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>

        <div className="mt-16 p-8 bg-card rounded-2xl max-w-4xl mx-auto">
          <h2 className="text-2xl font-serif font-semibold mb-4 text-center">服務說明</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>• 以上價格為基本價格，實際費用依照髮長、髮質及服務內容而定</p>
            <p>• 首次來店享有9折優惠</p>
            <p>• 建議提前預約，確保您的專屬時段</p>
            <p>• 所有服務均包含專業諮詢與造型建議</p>
          </div>
        </div>
      </div>
    </div>
  );
}
