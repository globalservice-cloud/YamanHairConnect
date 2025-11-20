import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Scissors, Sparkles, Heart, Star, Phone, MapPin, Clock, Award, Users, CheckCircle2 } from "lucide-react";
import { SiLine } from "react-icons/si";
import teamPhoto from "@assets/IMG_3687_1762425091046.jpeg";
import { useActiveServices } from "@/hooks/useServices";
import { buildServiceHighlightData, defaultServiceHighlights } from "@/data/serviceMeta";

export default function Home() {
  const {
    data: activeServices = [],
    isLoading: servicesLoading,
    isError: servicesError,
  } = useActiveServices();

  const featuredServices = activeServices.length
    ? activeServices.slice(0, 4).map((service) => buildServiceHighlightData(service))
    : defaultServiceHighlights;

  const showServiceFallbackMessage = !servicesLoading && (servicesError || activeServices.length === 0);
  const serviceFallbackMessage = servicesError
    ? "暫時無法載入實際服務資料，已顯示預設內容。"
    : "尚未在後台啟用服務資料，暫以品牌預設內容呈現。";

  const highlights = [
    {
      icon: Award,
      title: "60年專業經驗",
      description: "設計師團隊累積豐富實戰經驗",
    },
    {
      icon: Heart,
      title: "溫馨如家氛圍",
      description: "舒適環境讓您放鬆享受美髮時光",
    },
    {
      icon: Users,
      title: "專屬客製服務",
      description: "根據個人需求提供最適合的建議",
    },
    {
      icon: Clock,
      title: "彈性預約時段",
      description: "配合您的時間，提供便利服務",
    },
  ];

  const steps = [
    { icon: Scissors, title: "選擇服務", desc: "瀏覽服務項目，選擇您需要的美髮服務" },
    { icon: Heart, title: "指定設計師", desc: "挑選喜愛的設計師，或由我們為您推薦" },
    { icon: Star, title: "確認預約", desc: "選擇方便的時間，完成線上預約" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 -z-10"></div>
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center max-w-7xl mx-auto">
            {/* Left: Welcome Content */}
            <div className="text-center lg:text-left space-y-8">
              <div className="space-y-6">
                <div className="inline-block">
                  <div className="flex items-center gap-2 text-sm text-primary font-medium mb-4">
                    <Heart className="w-4 h-4 fill-primary" />
                    <span>用心對待每一位顧客</span>
                  </div>
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight">
                  雅曼美髮沙龍
                </h1>
                <p className="text-2xl md:text-3xl text-muted-foreground font-light leading-relaxed">
                  如家般溫馨<br className="sm:hidden"/>的美髮體驗
                </p>
                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3 text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-lg">累積60年豐富經驗的專業團隊</p>
                  </div>
                  <div className="flex items-start gap-3 text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-lg">舒適明亮的沙龍環境</p>
                  </div>
                  <div className="flex items-start gap-3 text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-lg">專屬客製化美髮服務</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3 items-center lg:items-start justify-center lg:justify-start text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>中和區民德路52號1樓</span>
                  </div>
                  <span className="hidden sm:inline text-muted-foreground/40">•</span>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary" />
                    <a href="tel:02-89513058" className="hover:text-primary transition-colors" data-testid="link-hero-phone">02-89513058</a>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-4">
                  <Link href="/booking" data-testid="link-hero-booking">
                    <Button size="lg" className="w-full sm:w-auto shadow-lg hover:shadow-xl transition-shadow" data-testid="button-hero-booking">
                      <Sparkles className="w-5 h-5 mr-2" />
                      立即線上預約
                    </Button>
                  </Link>
                  <a href="https://line.me/R/ti/p/@377bechg" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto" data-testid="link-hero-line">
                    <Button size="lg" variant="outline" className="w-full border-2" data-testid="button-hero-line">
                      <SiLine className="w-5 h-5 mr-2" />
                      LINE 諮詢
                    </Button>
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Team Photo */}
            <div className="relative lg:order-last order-first">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={teamPhoto} 
                  alt="雅曼美髮沙龍 - 益安與巧宣設計師在現代化沙龍環境" 
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -z-10 -top-6 -right-6 w-full h-full rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="bg-muted/30 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">為什麼選擇雅曼</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                我們相信美髮不只是技術，更是一種藝術與關懷的結合
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {highlights.map((item, index) => (
                <Card key={index} className="border-0 shadow-sm hover-elevate">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <item.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">專業服務項目</h2>
            <p className="text-lg text-muted-foreground">從基礎護理到時尚造型，滿足您的所有美髮需求</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicesLoading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <Card key={`service-skeleton-${index}`} className="p-6">
                    <Skeleton className="w-14 h-14 mb-4 rounded-xl" />
                    <Skeleton className="h-6 w-3/4 mb-3" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-5/6 mb-4" />
                    <Skeleton className="h-5 w-24" />
                  </Card>
                ))
              : featuredServices.map((service) => (
                  <Card key={service.title} className="hover-elevate group">
                    <CardContent className="p-6">
                      <div className="w-14 h-14 mb-4 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <service.icon className="w-7 h-7 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{service.description}</p>
                      <p className="text-primary font-semibold text-lg">{service.price}</p>
                    </CardContent>
                  </Card>
                ))}
          </div>
          {showServiceFallbackMessage && (
            <p className="text-center text-sm text-muted-foreground mt-4">{serviceFallbackMessage}</p>
          )}
          <div className="text-center mt-10">
            <Link href="/services" data-testid="link-view-services">
              <Button size="lg" variant="outline" data-testid="button-view-all-services">
                查看完整服務項目
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Booking Process Section */}
      <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">輕鬆線上預約</h2>
              <p className="text-lg text-muted-foreground">簡單三步驟，為您預留專屬美髮時光</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-primary/20 -z-10"></div>
                  )}
                  <div className="bg-background rounded-2xl p-6 shadow-sm text-center hover-elevate">
                    <div className="relative inline-flex mb-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        <step.icon className="w-8 h-8 text-primary" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link href="/booking" data-testid="link-booking-flow">
                <Button size="lg" className="shadow-lg hover:shadow-xl transition-shadow" data-testid="button-start-booking">
                  <Sparkles className="w-5 h-5 mr-2" />
                  開始預約您的美髮時光
                </Button>
              </Link>
              <p className="text-sm text-muted-foreground mt-4">預約後我們會盡快與您確認</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">聯絡我們</h2>
            <p className="text-lg text-muted-foreground">歡迎隨時與我們聯繫，我們樂意為您服務</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="hover-elevate border-2">
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">沙龍地址</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      新北市中和區民德路52號1樓
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">聯絡電話</h3>
                    <a href="tel:02-89513058" className="text-muted-foreground hover:text-primary transition-colors text-lg" data-testid="link-contact-phone">
                      02-89513058
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-elevate border-2 bg-gradient-to-br from-primary/5 to-accent/5">
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <SiLine className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">LINE 官方帳號</h3>
                    <p className="text-muted-foreground">@377bechg</p>
                  </div>
                </div>
                
                <a href="https://line.me/R/ti/p/@377bechg" target="_blank" rel="noopener noreferrer" className="block" data-testid="link-contact-line">
                  <Button size="lg" className="w-full shadow-md hover:shadow-lg transition-shadow" data-testid="button-line-contact">
                    <SiLine className="w-5 h-5 mr-2" />
                    立即透過 LINE 諮詢
                  </Button>
                </a>
                <p className="text-sm text-muted-foreground text-center mt-3">
                  快速回覆，為您解答所有美髮問題
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <Link href="/contact" data-testid="link-contact-page">
              <Button variant="outline" size="lg" data-testid="button-view-contact-info">
                查看完整聯絡資訊
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
