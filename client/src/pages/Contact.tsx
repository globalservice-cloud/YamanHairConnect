import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock, Mail } from "lucide-react";
import { SiLine } from "react-icons/si";

export default function Contact() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-serif font-bold mb-4">聯絡我們</h1>
          <p className="text-lg text-muted-foreground">歡迎隨時與我們聯繫</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-semibold mb-6">聯絡資訊</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">地址</h3>
                    <p className="text-muted-foreground">新北市中和區民德路52號1樓</p>
                    <a
                      href="https://maps.google.com/?q=新北市中和區民德路52號1樓"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary text-sm hover:underline"
                    >
                      在Google地圖中查看
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">電話</h3>
                    <a href="tel:02-89513058" className="text-muted-foreground hover:text-primary transition-colors">
                      02-89513058
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <SiLine className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">LINE官方帳號</h3>
                    <p className="text-muted-foreground mb-2">@377bechg</p>
                    <a href="https://line.me/R/ti/p/@377bechg" target="_blank" rel="noopener noreferrer">
                      <Button size="sm" data-testid="button-line-contact">
                        <SiLine className="w-4 h-4 mr-2" />
                        加入LINE好友
                      </Button>
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">營業時間</h3>
                    <div className="text-muted-foreground space-y-1">
                      <p>週一至週六：10:00 - 20:00</p>
                      <p>週日：10:00 - 18:00</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-semibold mb-6">交通方式</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">大眾運輸</h3>
                  <ul className="text-muted-foreground space-y-2 text-sm">
                    <li>• 捷運：中和新蘆線「景安站」步行約10分鐘</li>
                    <li>• 公車：242、243、248、307、705 於「民德路口」站下車</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">停車資訊</h3>
                  <ul className="text-muted-foreground space-y-2 text-sm">
                    <li>• 路邊停車格（民德路沿線）</li>
                    <li>• 中和民德公有停車場（步行3分鐘）</li>
                  </ul>
                </div>

                <div className="bg-muted/50 p-4 rounded-xl">
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <MapPin className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-center text-muted-foreground mt-2">地圖位置</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-semibold mb-4">建議提前預約</h2>
              <p className="text-muted-foreground mb-6">
                為確保您能在最適合的時間享受服務，我們建議您提前預約。
                您可以透過電話、LINE或線上預約系統完成預約。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:02-89513058">
                  <Button variant="outline" data-testid="button-call">
                    <Phone className="w-4 h-4 mr-2" />
                    電話預約
                  </Button>
                </a>
                <a href="https://line.me/R/ti/p/@377bechg" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" data-testid="button-line">
                    <SiLine className="w-4 h-4 mr-2" />
                    LINE預約
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
