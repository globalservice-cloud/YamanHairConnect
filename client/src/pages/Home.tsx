import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Scissors, Palette, Waves, Sparkles, Heart, Star } from "lucide-react";
import { SiLine } from "react-icons/si";
import ServiceCard from "@/components/ServiceCard";
import StylistCard from "@/components/StylistCard";
import heroImage from '@assets/IMG_3658_1762413566765.jpeg';
import salonInterior1 from '@assets/IMG_3678_1762413758256.jpeg';
import salonInterior2 from '@assets/IMG_3679_1762413758256.jpeg';
import workingImage from '@assets/IMG_3675_1762413758256.jpeg';
import qiaoxuanImage from '@assets/IMG_3664_1762413101449.jpeg';
import yianImage from '@assets/IMG_3667_1762413450872.jpeg';

export default function Home() {
  const services = [
    {
      title: "專業剪髮",
      description: "根據您的臉型與個性，打造專屬於您的髮型",
      price: "NT$ 400",
      image: workingImage,
      icon: Scissors,
    },
    {
      title: "時尚染髮",
      description: "使用頂級染劑，為您呈現完美髮色",
      price: "NT$ 2,000 起",
      image: salonInterior1,
      icon: Palette,
    },
    {
      title: "質感燙髮",
      description: "自然捲度與蓬鬆感，展現迷人魅力",
      price: "NT$ 2,000 起",
      image: salonInterior2,
      icon: Waves,
    },
  ];

  const stylists = [
    {
      name: "益安",
      specialty: "資深設計師（總監）",
      experience: "35年專業經驗",
      image: yianImage,
    },
    {
      name: "巧宣",
      specialty: "資深設計師",
      experience: "27年專業經驗",
      image: qiaoxuanImage,
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
