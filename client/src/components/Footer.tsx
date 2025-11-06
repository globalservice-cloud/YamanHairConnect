import { MapPin, Phone, Clock } from "lucide-react";
import { SiLine } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-card border-t mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-serif font-bold text-primary mb-4">雅曼美髮沙龍</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              如家人般溫馨的服務，讓您在輕鬆自在的氛圍中享受專業美髮體驗
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">聯絡資訊</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">中和區民德路52號1樓</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <a href="tel:02-89513058" className="text-muted-foreground hover:text-primary transition-colors">
                  02-89513058
                </a>
              </div>
              <div className="flex items-center gap-2">
                <SiLine className="w-4 h-4 text-primary flex-shrink-0" />
                <a href="https://line.me/R/ti/p/@377bechg" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  @377bechg
                </a>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">營業時間</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                <div className="text-muted-foreground">
                  <p>週一至週六：10:00 - 20:00</p>
                  <p>週日：10:00 - 18:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2024 雅曼美髮沙龍 版權所有</p>
        </div>
      </div>
    </footer>
  );
}
