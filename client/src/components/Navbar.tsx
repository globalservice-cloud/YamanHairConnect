import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Settings } from "lucide-react";
import { SiLine } from "react-icons/si";

export default function Navbar() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "首頁" },
    { path: "/services", label: "服務項目" },
    { path: "/team", label: "設計師團隊" },
    { path: "/booking", label: "線上預約" },
    { path: "/contact", label: "聯絡我們" },
    { path: "/admin", label: "後台管理", icon: Settings },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          <Link href="/" className="flex items-center gap-2">
            <h1 className="text-2xl font-serif font-bold text-primary">雅曼</h1>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <Button
                  variant="ghost"
                  className={location === item.path ? "bg-accent" : ""}
                  data-testid={`link-${item.label}`}
                >
                  {item.icon && <item.icon className="w-4 h-4 mr-2" />}
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <a href="tel:02-89513058">
              <Button variant="outline" size="sm" data-testid="button-phone">
                <Phone className="w-4 h-4 mr-2" />
                02-89513058
              </Button>
            </a>
            <a href="https://line.me/R/ti/p/@377bechg" target="_blank" rel="noopener noreferrer">
              <Button variant="default" size="sm" data-testid="button-line">
                <SiLine className="w-4 h-4 mr-2" />
                LINE預約
              </Button>
            </a>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link key={item.path} href={item.path}>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start ${location === item.path ? "bg-accent" : ""}`}
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid={`link-mobile-${item.label}`}
                  >
                    {item.icon && <item.icon className="w-4 h-4 mr-2" />}
                    {item.label}
                  </Button>
                </Link>
              ))}
              <div className="flex flex-col gap-2 mt-4">
                <a href="tel:02-89513058">
                  <Button variant="outline" className="w-full" data-testid="button-mobile-phone">
                    <Phone className="w-4 h-4 mr-2" />
                    02-89513058
                  </Button>
                </a>
                <a href="https://line.me/R/ti/p/@377bechg" target="_blank" rel="noopener noreferrer">
                  <Button variant="default" className="w-full" data-testid="button-mobile-line">
                    <SiLine className="w-4 h-4 mr-2" />
                    LINE預約
                  </Button>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
