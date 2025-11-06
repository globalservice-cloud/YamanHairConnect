import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Scissors, Palette, Waves, Sparkles, ChevronRight, ChevronLeft, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Service } from "@shared/schema";
import qiaoxuanImage from '@assets/IMG_3664_1762413101449.jpeg';
import yianImage from '@assets/IMG_3667_1762413450872.jpeg';

const getServiceIcon = (serviceName: string) => {
  if (serviceName.includes("洗")) return Sparkles;
  if (serviceName.includes("剪")) return Scissors;
  if (serviceName.includes("染")) return Palette;
  if (serviceName.includes("燙")) return Waves;
  return Sparkles;
};

export default function Booking() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState("");
  const [selectedStylist, setSelectedStylist] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerLine, setCustomerLine] = useState("");
  const { toast } = useToast();

  const { data: services = [], isLoading: servicesLoading } = useQuery<Service[]>({
    queryKey: ["/api/services/active"],
  });

  const stylists = [
    { id: "none", name: "無指定", image: "" },
    { id: "yian", name: "益安", specialty: "資深設計師（總監）・35年經驗", image: yianImage },
    { id: "qiaoxuan", name: "巧宣", specialty: "資深設計師・27年經驗", image: qiaoxuanImage },
  ];

  const timeSlots = [
    "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
    "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30", "18:00", "18:30",
  ];

  const handleNext = () => {
    if (step === 1 && !selectedService) {
      toast({ title: "請選擇服務項目", variant: "destructive" });
      return;
    }
    if (step === 2 && !selectedStylist) {
      toast({ title: "請選擇設計師", variant: "destructive" });
      return;
    }
    if (step === 3 && !selectedTime) {
      toast({ title: "請選擇預約時間", variant: "destructive" });
      return;
    }
    if (step === 4) {
      if (!customerName || !customerPhone) {
        toast({ title: "請填寫完整資料", variant: "destructive" });
        return;
      }
      handleSubmit();
      return;
    }
    setStep(step + 1);
  };

  const createBookingMutation = useMutation({
    mutationFn: async () => {
      const service = services.find(s => s.id === selectedService);
      const stylist = stylists.find(s => s.id === selectedStylist);
      
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerId: null,
          customerName,
          customerPhone,
          customerLineId: customerLine || null,
          serviceId: selectedService,
          serviceName: service?.name || "",
          stylistName: stylist?.name || "",
          bookingDate: selectedDate?.toISOString().split('T')[0] || "",
          bookingTime: selectedTime,
          status: "pending",
          notes: null,
        }),
      });
      
      if (!response.ok) throw new Error("Failed to create booking");
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "預約成功！", description: "我們已收到您的預約，將盡快與您確認。" });
      setStep(5);
    },
    onError: () => {
      toast({ title: "預約失敗", description: "請稍後再試或聯繫我們。", variant: "destructive" });
    },
  });

  const handleSubmit = () => {
    createBookingMutation.mutate();
  };

  const resetForm = () => {
    setStep(1);
    setSelectedService("");
    setSelectedStylist("");
    setSelectedDate(new Date());
    setSelectedTime("");
    setCustomerName("");
    setCustomerPhone("");
    setCustomerLine("");
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-serif font-bold mb-4">線上預約</h1>
          <p className="text-lg text-muted-foreground">輕鬆完成預約，享受專屬美髮時光</p>
        </div>

        {step < 5 && (
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      s <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {s}
                  </div>
                  {s < 4 && <div className={`w-12 h-1 ${s < step ? "bg-primary" : "bg-muted"}`} />}
                </div>
              ))}
            </div>
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">
              {step === 1 && "選擇服務項目"}
              {step === 2 && "選擇設計師"}
              {step === 3 && "選擇日期與時間"}
              {step === 4 && "填寫聯絡資訊"}
              {step === 5 && "預約完成"}
            </CardTitle>
            <CardDescription>
              {step === 1 && "請選擇您需要的美髮服務"}
              {step === 2 && "選擇您喜歡的設計師，或由我們為您安排"}
              {step === 3 && "選擇方便的預約時間"}
              {step === 4 && "填寫您的聯絡方式"}
              {step === 5 && "我們已收到您的預約"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === 1 && (
              <RadioGroup value={selectedService} onValueChange={setSelectedService}>
                <div className="grid md:grid-cols-2 gap-4">
                  {servicesLoading ? (
                    <div className="col-span-2 text-center py-8 text-muted-foreground">載入中...</div>
                  ) : services.length === 0 ? (
                    <div className="col-span-2 text-center py-8 text-muted-foreground">暫無可用服務</div>
                  ) : (
                    services.map((service) => {
                      const Icon = getServiceIcon(service.name);
                      const priceDisplay = service.priceNote 
                        ? `NT$ ${service.price.toLocaleString()} ${service.priceNote}`
                        : `NT$ ${service.price.toLocaleString()}`;
                      
                      return (
                        <Label
                          key={service.id}
                          htmlFor={service.id}
                          className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer hover-elevate ${
                            selectedService === service.id ? "border-primary bg-primary/5" : ""
                          }`}
                        >
                          <RadioGroupItem value={service.id} id={service.id} data-testid={`radio-service-${service.id}`} />
                          <Icon className="w-8 h-8 text-primary flex-shrink-0" />
                          <div className="flex-1">
                            <div className="font-semibold">{service.name}</div>
                            <div className="text-sm text-muted-foreground">{priceDisplay}</div>
                          </div>
                        </Label>
                      );
                    })
                  )}
                </div>
              </RadioGroup>
            )}

            {step === 2 && (
              <RadioGroup value={selectedStylist} onValueChange={setSelectedStylist}>
                <div className="grid md:grid-cols-3 gap-4">
                  {stylists.map((stylist) => (
                    <Label
                      key={stylist.id}
                      htmlFor={stylist.id}
                      className={`flex flex-col items-center p-4 border rounded-xl cursor-pointer hover-elevate ${
                        selectedStylist === stylist.id ? "border-primary bg-primary/5" : ""
                      }`}
                    >
                      <RadioGroupItem value={stylist.id} id={stylist.id} className="mb-2" data-testid={`radio-stylist-${stylist.id}`} />
                      {stylist.image ? (
                        <img src={stylist.image} alt={stylist.name} className="w-20 h-20 rounded-full object-cover mb-2" />
                      ) : (
                        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-2">
                          <Scissors className="w-8 h-8 text-muted-foreground" />
                        </div>
                      )}
                      <div className="font-semibold text-center">{stylist.name}</div>
                      {stylist.specialty && (
                        <div className="text-xs text-muted-foreground text-center">{stylist.specialty}</div>
                      )}
                    </Label>
                  ))}
                </div>
              </RadioGroup>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <Label className="mb-2 block">選擇日期</Label>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-xl border mx-auto"
                    disabled={(date) => date < new Date() || date.getDay() === 0}
                  />
                </div>
                <div>
                  <Label className="mb-2 block">選擇時間</Label>
                  <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedTime(time)}
                        data-testid={`button-time-${time}`}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">姓名 *</Label>
                  <Input
                    id="name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="請輸入您的姓名"
                    data-testid="input-name"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">電話 *</Label>
                  <Input
                    id="phone"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="請輸入您的聯絡電話"
                    data-testid="input-phone"
                  />
                </div>
                <div>
                  <Label htmlFor="line">LINE ID (選填)</Label>
                  <Input
                    id="line"
                    value={customerLine}
                    onChange={(e) => setCustomerLine(e.target.value)}
                    placeholder="方便我們透過LINE與您聯繫"
                    data-testid="input-line"
                  />
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-2">預約成功！</h3>
                <p className="text-muted-foreground mb-6">
                  我們已收到您的預約，將盡快與您確認。
                </p>
                <div className="bg-card p-6 rounded-xl max-w-md mx-auto text-left space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">服務項目：</span>
                    <span className="font-medium">
                      {services.find((s) => s.id === selectedService)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">設計師：</span>
                    <span className="font-medium">
                      {stylists.find((s) => s.id === selectedStylist)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">日期：</span>
                    <span className="font-medium">{selectedDate?.toLocaleDateString("zh-TW")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">時間：</span>
                    <span className="font-medium">{selectedTime}</span>
                  </div>
                </div>
                <Button onClick={resetForm} className="mt-6" data-testid="button-new-booking">
                  預約其他服務
                </Button>
              </div>
            )}

            {step < 5 && (
              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                  disabled={step === 1}
                  data-testid="button-prev"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  上一步
                </Button>
                <Button 
                  onClick={handleNext} 
                  disabled={step === 4 && createBookingMutation.isPending}
                  data-testid="button-next"
                >
                  {step === 4 ? (createBookingMutation.isPending ? "預約中..." : "確認預約") : "下一步"}
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
