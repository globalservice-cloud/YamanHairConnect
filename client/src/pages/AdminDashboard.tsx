import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Scissors, TrendingUp, Search, LogOut, CalendarDays, Lock, Clock } from "lucide-react";
import { useLocation } from "wouter";
import type { Booking } from "@shared/schema";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();

  const { data: bookings = [] } = useQuery<Booking[]>({
    queryKey: ["/api/bookings"],
  });

  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];

  const todayBookings = bookings.filter(b => b.bookingDate === today);
  const tomorrowBookings = bookings.filter(b => b.bookingDate === tomorrow);
  const pendingBookings = bookings.filter(b => b.status === "pending");

  const handleLogout = () => {
    console.log("Logging out");
    setLocation("/admin");
  };

  const menuItems = [
    {
      title: "預約月曆",
      description: "查看月曆視圖和管理預約",
      icon: CalendarDays,
      path: "/admin/calendar",
      color: "text-blue-600",
      testId: "nav-calendar"
    },
    {
      title: "客戶管理",
      description: "管理客戶資料和消費紀錄",
      icon: Users,
      path: "/admin/customers",
      color: "text-green-600",
      testId: "nav-customers"
    },
    {
      title: "服務項目",
      description: "新增、編輯和管理服務項目",
      icon: Scissors,
      path: "/admin/services",
      color: "text-purple-600",
      testId: "nav-services"
    },
    {
      title: "員工管理",
      description: "管理設計師和助理",
      icon: Users,
      path: "/admin/staff",
      color: "text-indigo-600",
      testId: "nav-staff"
    },
    {
      title: "行銷活動",
      description: "建立和管理促銷活動",
      icon: TrendingUp,
      path: "/admin/marketing",
      color: "text-orange-600",
      testId: "nav-marketing"
    },
    {
      title: "SEO 設定",
      description: "管理網站 SEO 元數據",
      icon: Search,
      path: "/admin/seo",
      color: "text-pink-600",
      testId: "nav-seo"
    },
    {
      title: "營業時間與公告",
      description: "管理營業時間和對外公告",
      icon: Clock,
      path: "/admin/business-settings",
      color: "text-teal-600",
      testId: "nav-business-settings"
    },
  ];

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-serif font-bold mb-2">管理後台</h1>
            <p className="text-muted-foreground">雅曼美髮沙龍後台管理系統</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setLocation("/admin/change-password")} data-testid="button-change-password">
              <Lock className="w-4 h-4 mr-2" />
              修改密碼
            </Button>
            <Button variant="outline" onClick={handleLogout} data-testid="button-logout">
              <LogOut className="w-4 h-4 mr-2" />
              登出
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 gap-2">
              <CardTitle className="text-sm font-medium">今日預約</CardTitle>
              <Calendar className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{todayBookings.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                待確認：{todayBookings.filter(b => b.status === "pending").length}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 gap-2">
              <CardTitle className="text-sm font-medium">明日預約</CardTitle>
              <Calendar className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{tomorrowBookings.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                待確認：{tomorrowBookings.filter(b => b.status === "pending").length}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 gap-2">
              <CardTitle className="text-sm font-medium">待確認預約</CardTitle>
              <Calendar className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{pendingBookings.length}</div>
              <p className="text-xs text-muted-foreground mt-1">總預約數：{bookings.length}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <Card
              key={item.path}
              className="hover-elevate active-elevate-2 cursor-pointer"
              onClick={() => setLocation(item.path)}
              data-testid={item.testId}
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-muted ${item.color}`}>
                    <item.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>{item.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
