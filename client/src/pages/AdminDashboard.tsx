import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Scissors, Phone, Mail, LogOut } from "lucide-react";
import { useLocation } from "wouter";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();

  const mockBookings = [
    {
      id: 1,
      customerName: "王小明",
      phone: "0912-345-678",
      service: "專業剪髮",
      stylist: "林美華",
      date: "2024-11-15",
      time: "14:00",
      status: "confirmed",
    },
    {
      id: 2,
      customerName: "李美玲",
      phone: "0923-456-789",
      service: "時尚染髮",
      stylist: "陳志明",
      date: "2024-11-15",
      time: "15:30",
      status: "pending",
    },
    {
      id: 3,
      customerName: "張大華",
      phone: "0934-567-890",
      service: "質感燙髮",
      stylist: "無指定",
      date: "2024-11-16",
      time: "10:00",
      status: "confirmed",
    },
    {
      id: 4,
      customerName: "林小芬",
      phone: "0945-678-901",
      service: "深層護髮",
      stylist: "林美華",
      date: "2024-11-16",
      time: "16:00",
      status: "pending",
    },
  ];

  const handleLogout = () => {
    console.log("Logging out");
    setLocation("/admin");
  };

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-serif font-bold mb-2">預約管理</h1>
            <p className="text-muted-foreground">雅曼美髮沙龍後台管理系統</p>
          </div>
          <Button variant="outline" onClick={handleLogout} data-testid="button-logout">
            <LogOut className="w-4 h-4 mr-2" />
            登出
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 gap-2">
              <CardTitle className="text-sm font-medium">今日預約</CardTitle>
              <Calendar className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">2</div>
              <p className="text-xs text-muted-foreground mt-1">待確認：1</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 gap-2">
              <CardTitle className="text-sm font-medium">明日預約</CardTitle>
              <Calendar className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">2</div>
              <p className="text-xs text-muted-foreground mt-1">待確認：1</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 gap-2">
              <CardTitle className="text-sm font-medium">本週預約</CardTitle>
              <Calendar className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">8</div>
              <p className="text-xs text-muted-foreground mt-1">總計預約數</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>預約列表</CardTitle>
            <CardDescription>查看與管理所有預約</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockBookings.map((booking) => (
                <Card key={booking.id} className="hover-elevate">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-lg">{booking.customerName}</h3>
                          <Badge variant={booking.status === "confirmed" ? "default" : "secondary"}>
                            {booking.status === "confirmed" ? "已確認" : "待確認"}
                          </Badge>
                        </div>
                        
                        <div className="grid sm:grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Scissors className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                            <span className="text-muted-foreground">{booking.service}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                            <span className="text-muted-foreground">{booking.stylist}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                            <span className="text-muted-foreground">
                              {booking.date} {booking.time}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                            <span className="text-muted-foreground">{booking.phone}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {booking.status === "pending" && (
                          <Button 
                            size="sm" 
                            onClick={() => console.log("Confirm booking:", booking.id)}
                            data-testid={`button-confirm-${booking.id}`}
                          >
                            確認
                          </Button>
                        )}
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => console.log("Cancel booking:", booking.id)}
                          data-testid={`button-cancel-${booking.id}`}
                        >
                          取消
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
