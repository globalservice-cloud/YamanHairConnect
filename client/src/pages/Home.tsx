import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Scissors, Palette, Waves, Sparkles, Heart, Star } from "lucide-react";
import { SiLine } from "react-icons/si";
import ServiceCard from "@/components/ServiceCard";
import StylistCard from "@/components/StylistCard";
import heroImage from '@assets/generated_images/Cozy_salon_interior_hero_34f24d2c.png';
import cuttingImage from '@assets/generated_images/Hair_cutting_service_ac14a7f9.png';
import coloringImage from '@assets/generated_images/Hair_coloring_service_8a98426c.png';
import treatmentImage from '@assets/generated_images/Hair_treatment_service_44b1f4a0.png';
import stylist1 from '@assets/generated_images/Female_stylist_portrait_c9075e53.png';
import stylist2 from '@assets/generated_images/Male_stylist_portrait_924b7d24.png';

export default function Home() {
  const services = [
    {
      title: "專業剪髮",
      description: "根據您的臉型與個性，打造專屬於您的髮型",
      price: "NT$ 800 起",
      image: cuttingImage,
      icon: Scissors,
    },
    {
      title: "時尚染髮",
      description: "使用頂級染劑，為您呈現完美髮色",
      price: "NT$ 2,000 起",
      image: coloringImage,
      icon: Palette,
    },
    {
      title: "質感燙髮",
      description: "自然捲度與蓬鬆感，展現迷人魅力",
      price: "NT$ 2,500 起",
      image: treatmentImage,
      icon: Waves,
    },
  ];

  const stylists = [
    {
      name: "林美華",
      specialty: "染燙專家",
      experience: "8年專業經驗",
      image: stylist1,
    },
    {
      name: "陳志明",
      specialty: "剪髮造型",
      experience: "10年專業經驗",
      image: stylist2,
    },
  ];

  const steps = [
    { icon: Scissors, title: "選擇服務", desc: "選擇您需要的美髮服務" },
    { icon: Heart, title: "指定設計師", desc: "選擇您喜歡的設計師" },
    { icon: Star, title: "預約時間", desc: "選擇方便的時間" },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="雅曼美髮沙龍"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto text-white">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
            雅曼美髮沙龍
          </h1>
          <p className="text-xl md:text-2xl mb-4 font-light">
            如家般溫馨的美髮體驗
          </p>
          <p className="text-lg mb-8 text-white/90">
            中和區民德路52號1樓 | 02-89513058
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking">
              <Button size="lg" variant="default" className="text-lg px-8" data-testid="button-hero-booking">
                <Sparkles className="w-5 h-5 mr-2" />
                立即預約
              </Button>
            </Link>
            <a href="https://line.me/R/ti/p/@377bechg" target="_blank" rel="noopener noreferrer">
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20" 
                data-testid="button-hero-line"
              >
                <SiLine className="w-5 h-5 mr-2" />
                LINE諮詢
              </Button>
            </a>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-serif font-semibold mb-6">歡迎來到雅曼</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            在雅曼，我們相信美髮不只是技術，更是一種藝術與關懷的結合。我們的設計師以專業的技術與溫暖的態度，
            為每位顧客打造最適合的髮型。在這裡，您可以像在家中一樣放鬆自在，享受專屬於您的美好時光。
          </p>
        </div>
      </section>

      <section className="bg-card py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-serif font-semibold text-center mb-12">服務項目</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/services">
              <Button size="lg" variant="outline" data-testid="button-view-all-services">
                查看所有服務
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-serif font-semibold text-center mb-12">專業團隊</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {stylists.map((stylist, index) => (
            <StylistCard key={index} {...stylist} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/team">
            <Button size="lg" variant="outline" data-testid="button-view-team">
              認識我們的團隊
            </Button>
          </Link>
        </div>
      </section>

      <section className="bg-card py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-serif font-semibold text-center mb-4">簡單三步驟，預約您的美髮時光</h2>
          <p className="text-center text-muted-foreground mb-12">輕鬆完成線上預約</p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <step.icon className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/booking">
              <Button size="lg" data-testid="button-start-booking">
                開始預約
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
