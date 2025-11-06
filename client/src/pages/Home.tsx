import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Scissors, Palette, Waves, Sparkles, Heart, Star, Phone, MapPin } from "lucide-react";
import { SiLine } from "react-icons/si";

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
      <section className="relative py-20 md:py-32 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
            雅曼美髮沙龍
          </h1>
          <p className="text-2xl md:text-3xl mb-6 text-muted-foreground font-light">
            如家般溫馨的美髮體驗
          </p>
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center text-muted-foreground mb-8">
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking">
              <Button size="lg" className="text-lg px-8" data-testid="button-hero-booking">
                <Sparkles className="w-5 h-5 mr-2" />
                立即預約
              </Button>
            </Link>
            <a href="https://line.me/R/ti/p/@377bechg" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="text-lg px-8" data-testid="button-hero-line">
                <SiLine className="w-5 h-5 mr-2" />
                LINE諮詢
              </Button>
            </a>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-serif font-semibold mb-4">歡迎來到雅曼</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            在雅曼，我們相信美髮不只是技術，更是一種藝術與關懷的結合。
            我們的設計師以專業的技術與溫暖的態度，為每位顧客打造最適合的髮型。
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-serif font-semibold text-center mb-12">服務項目</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <Card key={index} className="hover-elevate">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <service.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-muted-foreground mb-3 text-sm">{service.description}</p>
                <p className="text-primary font-medium">{service.price}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-accent/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-semibold text-center mb-4">線上預約</h2>
          <p className="text-center text-muted-foreground mb-12">簡單三步驟，輕鬆完成預約</p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.desc}</p>
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

      <section className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-serif font-semibold text-center mb-8">聯絡我們</h2>
          <Card>
            <CardContent className="p-8 space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">地址</h3>
                  <p className="text-muted-foreground">中和區民德路52號1樓</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">電話</h3>
                  <a href="tel:02-89513058" className="text-muted-foreground hover:text-primary">
                    02-89513058
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <SiLine className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">LINE ID</h3>
                  <p className="text-muted-foreground">@377bechg</p>
                </div>
              </div>
              <div className="pt-4">
                <a href="https://line.me/R/ti/p/@377bechg" target="_blank" rel="noopener noreferrer" className="block">
                  <Button className="w-full" variant="outline">
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
