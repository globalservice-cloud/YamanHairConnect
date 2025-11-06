import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Scissors, Palette, Waves, Sparkles, Heart, Star, Phone, MapPin } from "lucide-react";
import { SiLine } from "react-icons/si";
import teamPhoto from "@assets/HEIF影像_1762424685823.jpeg";

export default function Home() {
  const services = [
    {
      title: "專業剪髮",
      description: "根據您的臉型與個性，打造專屬髮型",
      price: "NT$ 400",
      icon: Scissors,
    },
    {
      title: "時尚染髮",
      description: "使用頂級染劑，呈現完美髮色",
      price: "NT$ 2,000 起",
      icon: Palette,
    },
    {
      title: "質感燙髮",
      description: "自然捲度，展現迷人魅力",
      price: "NT$ 2,000 起",
      icon: Waves,
    },
  ];

  const steps = [
    { icon: Scissors, title: "選擇服務", desc: "選擇您需要的美髮服務" },
    { icon: Heart, title: "指定設計師", desc: "選擇您喜歡的設計師" },
    { icon: Star, title: "預約時間", desc: "選擇方便的時間" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Team Photo */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/10">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center max-w-7xl mx-auto">
            {/* Left: Welcome Text */}
            <div className="text-center lg:text-left space-y-6 md:space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight">
                  雅曼美髮沙龍
                </h1>
                <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground font-light">
                  如家般溫馨的美髮體驗
                </p>
                <div className="pt-2">
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    專業技術 × 溫暖服務<br/>
                    讓每位顧客都能享受賓至如歸的美髮時光
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-center lg:items-start justify-center lg:justify-start text-sm md:text-base text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>中和區民德路52號1樓</span>
                </div>
                <span className="hidden sm:inline">|</span>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <a href="tel:02-89513058" className="hover:text-primary">02-89513058</a>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start pt-4">
                <Link href="/booking">
                  <Button size="lg" className="text-base md:text-lg px-6 md:px-8 w-full sm:w-auto" data-testid="button-hero-booking">
                    <Sparkles className="w-5 h-5 mr-2" />
                    立即預約
                  </Button>
                </Link>
                <a href="https://line.me/R/ti/p/@377bechg" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="text-base md:text-lg px-6 md:px-8 w-full" data-testid="button-hero-line">
                    <SiLine className="w-5 h-5 mr-2" />
                    LINE諮詢
                  </Button>
                </a>
              </div>
            </div>

            {/* Right: Team Photo */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <div className="aspect-[3/4] relative">
                  <img 
                    src={teamPhoto} 
                    alt="雅曼美髮沙龍專業團隊 - 益安與巧宣設計師" 
                    className="w-full h-full object-cover"
                  />
                  {/* Warm gradient overlay at bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
              </div>
              {/* Decorative element */}
              <div className="absolute -z-10 top-8 right-8 w-full h-full rounded-3xl bg-primary/10"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-3 md:mb-4">歡迎來到雅曼</h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            在雅曼，我們相信美髮不只是技術，更是一種藝術與關懷的結合。
            我們的設計師以專業的技術與溫暖的態度，為每位顧客打造最適合的髮型。
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-serif font-semibold text-center mb-8 md:mb-12">服務項目</h2>
        <div className="grid md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <Card key={index} className="hover-elevate">
              <CardContent className="p-5 md:p-6 text-center">
                <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <service.icon className="w-7 h-7 md:w-8 md:h-8 text-primary" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-muted-foreground mb-3 text-sm md:text-base">{service.description}</p>
                <p className="text-primary font-medium text-sm md:text-base">{service.price}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-accent/30 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-serif font-semibold text-center mb-2 md:mb-4">線上預約</h2>
          <p className="text-center text-muted-foreground text-sm md:text-base mb-8 md:mb-12">簡單三步驟，輕鬆完成預約</p>
          
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto mb-8 md:mb-12">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <step.icon className="w-7 h-7 md:w-8 md:h-8 text-primary" />
                </div>
                <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center px-4">
            <Link href="/booking">
              <Button size="lg" className="w-full sm:w-auto" data-testid="button-start-booking">
                開始預約
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-serif font-semibold text-center mb-6 md:mb-8">聯絡我們</h2>
          <Card>
            <CardContent className="p-6 md:p-8 space-y-5 md:space-y-6">
              <div className="flex items-start gap-3 md:gap-4">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1 text-sm md:text-base">地址</h3>
                  <p className="text-muted-foreground text-sm md:text-base">中和區民德路52號1樓</p>
                </div>
              </div>
              <div className="flex items-start gap-3 md:gap-4">
                <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1 text-sm md:text-base">電話</h3>
                  <a href="tel:02-89513058" className="text-muted-foreground hover:text-primary text-sm md:text-base">
                    02-89513058
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3 md:gap-4">
                <SiLine className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1 text-sm md:text-base">LINE ID</h3>
                  <p className="text-muted-foreground text-sm md:text-base">@377bechg</p>
                </div>
              </div>
              <div className="pt-2 md:pt-4">
                <a href="https://line.me/R/ti/p/@377bechg" target="_blank" rel="noopener noreferrer" className="block">
                  <Button className="w-full text-sm md:text-base" variant="outline">
                    <SiLine className="w-5 h-5 mr-2" />
                    透過 LINE 聯絡我們
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
