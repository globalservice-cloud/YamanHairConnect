import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import type { Booking, Staff } from "@shared/schema";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths, getDay } from "date-fns";
import { zhTW } from "date-fns/locale";

export default function AdminCalendar() {
  const { toast } = useToast();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editStatus, setEditStatus] = useState<string>("");
  const [editStylistId, setEditStylistId] = useState<string>("");
  const [editAssistantId, setEditAssistantId] = useState<string>("");

  const { data: bookings = [], isLoading } = useQuery<Booking[]>({
    queryKey: ["/api/bookings"],
  });

  const { data: designers = [] } = useQuery<Staff[]>({
    queryKey: ["/api/staff/role/設計師"],
  });

  const { data: assistants = [] } = useQuery<Staff[]>({
    queryKey: ["/api/staff/role/助理"],
  });

  const updateBookingMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: any }) => {
      const response = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (!response.ok) throw new Error("Failed to update booking");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      toast({ title: "預約已更新" });
      setIsEditDialogOpen(false);
      setSelectedBooking(null);
    },
  });

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const startDayOfWeek = getDay(monthStart);
  const paddingDays = Array.from({ length: startDayOfWeek }, (_, i) => i);

  const getBookingsForDate = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    return bookings.filter((booking) => booking.bookingDate === dateStr);
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleBookingClick = (booking: Booking) => {
    setSelectedBooking(booking);
    setEditStatus(booking.status);
    setEditStylistId(booking.stylistId || "");
    setEditAssistantId(booking.assistantId || "");
    setIsEditDialogOpen(true);
  };

  const handleUpdateBooking = () => {
    if (selectedBooking) {
      const selectedStylist = designers.find(d => d.id === editStylistId);
      const selectedAssistant = assistants.find(a => a.id === editAssistantId);
      
      const updates: any = { status: editStatus };
      
      if (editStylistId) {
        updates.stylistId = editStylistId;
        updates.stylistName = selectedStylist?.name || "";
      }
      
      if (editAssistantId) {
        updates.assistantId = editAssistantId;
        updates.assistantName = selectedAssistant?.name || "";
      } else {
        updates.assistantId = null;
        updates.assistantName = null;
      }
      
      updateBookingMutation.mutate({ id: selectedBooking.id, updates });
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "confirmed":
        return "default";
      case "completed":
        return "secondary";
      case "cancelled":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "待確認";
      case "confirmed":
        return "已確認";
      case "completed":
        return "已完成";
      case "cancelled":
        return "已取消";
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-serif">預約月曆</h1>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePreviousMonth}
              data-testid="button-previous-month"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="text-lg font-medium min-w-[120px] text-center" data-testid="text-current-month">
              {format(currentMonth, "yyyy年 M月", { locale: zhTW })}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNextMonth}
              data-testid="button-next-month"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              預約行事曆
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8 text-muted-foreground">載入中...</div>
            ) : (
              <div className="grid grid-cols-7 gap-2">
                {["日", "一", "二", "三", "四", "五", "六"].map((day) => (
                  <div
                    key={day}
                    className="text-center font-medium text-sm py-2 text-muted-foreground"
                  >
                    {day}
                  </div>
                ))}
                
                {paddingDays.map((_, index) => (
                  <div key={`padding-${index}`} className="min-h-[100px]" />
                ))}
                
                {daysInMonth.map((date) => {
                  const dayBookings = getBookingsForDate(date);
                  const isToday = isSameDay(date, new Date());

                  return (
                    <div
                      key={date.toISOString()}
                      className={`min-h-[100px] border rounded-md p-2 ${
                        isToday ? "bg-accent/20 border-primary" : "bg-card"
                      }`}
                      data-testid={`calendar-day-${format(date, "yyyy-MM-dd")}`}
                    >
                      <div className="text-sm font-medium mb-1">{format(date, "d")}</div>
                      <div className="space-y-1">
                        {dayBookings.map((booking) => (
                          <button
                            key={booking.id}
                            onClick={() => handleBookingClick(booking)}
                            className="w-full text-left text-xs p-1 rounded hover-elevate active-elevate-2 bg-primary/10 border border-primary/20"
                            data-testid={`booking-${booking.id}`}
                          >
                            <div className="font-medium truncate">{booking.bookingTime}</div>
                            <div className="truncate text-muted-foreground">{booking.customerName}</div>
                            <div className="truncate text-muted-foreground">{booking.serviceName}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent data-testid="dialog-booking-details">
            <DialogHeader>
              <DialogTitle>預約詳情</DialogTitle>
            </DialogHeader>
            {selectedBooking && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">客戶姓名</div>
                    <div className="font-medium" data-testid="text-customer-name">
                      {selectedBooking.customerName}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">聯絡電話</div>
                    <div className="font-medium" data-testid="text-customer-phone">
                      {selectedBooking.customerPhone}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">服務項目</div>
                    <div className="font-medium" data-testid="text-service-name">
                      {selectedBooking.serviceName}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">設計師</div>
                    <div className="font-medium" data-testid="text-stylist-name">
                      {selectedBooking.stylistName}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">助理</div>
                    <div className="font-medium" data-testid="text-assistant-name">
                      {selectedBooking.assistantName || "未指派"}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">預約日期</div>
                    <div className="font-medium" data-testid="text-booking-date">
                      {selectedBooking.bookingDate}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">預約時間</div>
                    <div className="font-medium" data-testid="text-booking-time">
                      {selectedBooking.bookingTime}
                    </div>
                  </div>
                </div>

                {selectedBooking.customerLineId && (
                  <div>
                    <div className="text-sm text-muted-foreground">LINE ID</div>
                    <div className="font-medium" data-testid="text-customer-line">
                      {selectedBooking.customerLineId}
                    </div>
                  </div>
                )}

                {selectedBooking.notes && (
                  <div>
                    <div className="text-sm text-muted-foreground">備註</div>
                    <div className="font-medium" data-testid="text-booking-notes">
                      {selectedBooking.notes}
                    </div>
                  </div>
                )}

                <div>
                  <Label className="text-sm text-muted-foreground mb-2">指派設計師</Label>
                  <Select value={editStylistId} onValueChange={setEditStylistId}>
                    <SelectTrigger data-testid="select-stylist">
                      <SelectValue placeholder="選擇設計師" />
                    </SelectTrigger>
                    <SelectContent>
                      {designers.filter(d => d.isActive).map(designer => (
                        <SelectItem key={designer.id} value={designer.id}>
                          {designer.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm text-muted-foreground mb-2">指派助理（選填）</Label>
                  <Select value={editAssistantId} onValueChange={setEditAssistantId}>
                    <SelectTrigger data-testid="select-assistant">
                      <SelectValue placeholder="選擇助理（可不選）" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">不指派助理</SelectItem>
                      {assistants.filter(a => a.isActive).map(assistant => (
                        <SelectItem key={assistant.id} value={assistant.id}>
                          {assistant.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm text-muted-foreground mb-2">預約狀態</Label>
                  <Select value={editStatus} onValueChange={setEditStatus}>
                    <SelectTrigger data-testid="select-booking-status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">待確認</SelectItem>
                      <SelectItem value="confirmed">已確認</SelectItem>
                      <SelectItem value="completed">已完成</SelectItem>
                      <SelectItem value="cancelled">已取消</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm text-muted-foreground">目前狀態</Label>
                  <Badge variant={getStatusBadgeVariant(selectedBooking.status)} data-testid="badge-current-status">
                    {getStatusText(selectedBooking.status)}
                  </Badge>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
                data-testid="button-cancel"
              >
                取消
              </Button>
              <Button
                onClick={handleUpdateBooking}
                disabled={updateBookingMutation.isPending}
                data-testid="button-update-booking"
              >
                {updateBookingMutation.isPending ? "更新中..." : "更新預約"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
