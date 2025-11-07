import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Clock, Plus, Trash2, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { BusinessHour, Announcement } from "@shared/schema";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const weekDays = ["週日", "週一", "週二", "週三", "週四", "週五", "週六"];

export default function AdminBusinessSettings() {
  const { toast } = useToast();
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
  const [isAnnouncementDialogOpen, setIsAnnouncementDialogOpen] = useState(false);
  const [announcementForm, setAnnouncementForm] = useState({
    title: "",
    content: "",
    type: "info",
    isActive: true,
    startDate: "",
    endDate: "",
  });

  const { data: businessHours = [] } = useQuery<BusinessHour[]>({
    queryKey: ["/api/business-hours"],
  });

  const { data: announcements = [] } = useQuery<Announcement[]>({
    queryKey: ["/api/announcements"],
  });

  const updateBusinessHourMutation = useMutation({
    mutationFn: async (data: { dayOfWeek: number; openTime: string | null; closeTime: string | null; isClosed: boolean }) => {
      return apiRequest("/api/business-hours", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/business-hours"] });
      toast({ title: "營業時間已更新" });
    },
    onError: () => {
      toast({ title: "更新失敗", variant: "destructive" });
    },
  });

  const createAnnouncementMutation = useMutation({
    mutationFn: async (data: typeof announcementForm) => {
      return apiRequest("/api/announcements", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/announcements"] });
      toast({ title: "公告已創建" });
      setIsAnnouncementDialogOpen(false);
      resetAnnouncementForm();
    },
    onError: () => {
      toast({ title: "創建失敗", variant: "destructive" });
    },
  });

  const updateAnnouncementMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<typeof announcementForm> }) => {
      return apiRequest(`/api/announcements/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/announcements"] });
      toast({ title: "公告已更新" });
      setIsAnnouncementDialogOpen(false);
      setEditingAnnouncement(null);
      resetAnnouncementForm();
    },
    onError: () => {
      toast({ title: "更新失敗", variant: "destructive" });
    },
  });

  const deleteAnnouncementMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest(`/api/announcements/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/announcements"] });
      toast({ title: "公告已刪除" });
    },
    onError: () => {
      toast({ title: "刪除失敗", variant: "destructive" });
    },
  });

  const resetAnnouncementForm = () => {
    setAnnouncementForm({
      title: "",
      content: "",
      type: "info",
      isActive: true,
      startDate: "",
      endDate: "",
    });
  };

  const handleOpenAnnouncementDialog = (announcement?: Announcement) => {
    if (announcement) {
      setEditingAnnouncement(announcement);
      setAnnouncementForm({
        title: announcement.title,
        content: announcement.content,
        type: announcement.type,
        isActive: announcement.isActive,
        startDate: announcement.startDate || "",
        endDate: announcement.endDate || "",
      });
    } else {
      setEditingAnnouncement(null);
      resetAnnouncementForm();
    }
    setIsAnnouncementDialogOpen(true);
  };

  const handleSaveAnnouncement = () => {
    if (editingAnnouncement) {
      updateAnnouncementMutation.mutate({
        id: editingAnnouncement.id,
        data: announcementForm,
      });
    } else {
      createAnnouncementMutation.mutate(announcementForm);
    }
  };

  const handleBusinessHourChange = (dayOfWeek: number, field: string, value: string | boolean) => {
    const hour = businessHours.find(h => h.dayOfWeek === dayOfWeek);
    if (!hour) return;

    const updatedData = {
      dayOfWeek,
      openTime: hour.openTime,
      closeTime: hour.closeTime,
      isClosed: hour.isClosed,
      [field]: value,
    };

    if (field === "isClosed" && value === true) {
      updatedData.openTime = null;
      updatedData.closeTime = null;
    }

    updateBusinessHourMutation.mutate(updatedData);
  };

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold mb-2">營業時間與公告</h1>
          <p className="text-muted-foreground">管理店面營業時間和對外公告</p>
        </div>

        <div className="grid gap-8">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-muted text-blue-600">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle>營業時間設定</CardTitle>
                  <CardDescription>設定每週的營業時間</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {businessHours.sort((a, b) => a.dayOfWeek - b.dayOfWeek).map((hour) => (
                  <div key={hour.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="w-20 font-medium">{weekDays[hour.dayOfWeek]}</div>
                    <div className="flex items-center gap-2">
                      <Label htmlFor={`closed-${hour.dayOfWeek}`} className="text-sm">公休</Label>
                      <Switch
                        id={`closed-${hour.dayOfWeek}`}
                        checked={hour.isClosed}
                        onCheckedChange={(checked) => handleBusinessHourChange(hour.dayOfWeek, "isClosed", checked)}
                        data-testid={`switch-closed-${hour.dayOfWeek}`}
                      />
                    </div>
                    {!hour.isClosed && (
                      <>
                        <div className="flex items-center gap-2">
                          <Label htmlFor={`open-${hour.dayOfWeek}`} className="text-sm">開始</Label>
                          <Input
                            id={`open-${hour.dayOfWeek}`}
                            type="time"
                            value={hour.openTime || ""}
                            onChange={(e) => handleBusinessHourChange(hour.dayOfWeek, "openTime", e.target.value)}
                            className="w-32"
                            data-testid={`input-open-${hour.dayOfWeek}`}
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <Label htmlFor={`close-${hour.dayOfWeek}`} className="text-sm">結束</Label>
                          <Input
                            id={`close-${hour.dayOfWeek}`}
                            type="time"
                            value={hour.closeTime || ""}
                            onChange={(e) => handleBusinessHourChange(hour.dayOfWeek, "closeTime", e.target.value)}
                            className="w-32"
                            data-testid={`input-close-${hour.dayOfWeek}`}
                          />
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-muted text-orange-600">
                    <CalendarIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle>公告管理</CardTitle>
                    <CardDescription>發布特殊公告、臨時公休等訊息</CardDescription>
                  </div>
                </div>
                <Button onClick={() => handleOpenAnnouncementDialog()} data-testid="button-create-announcement">
                  <Plus className="w-4 h-4 mr-2" />
                  新增公告
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {announcements.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">目前沒有公告</div>
                ) : (
                  announcements.map((announcement) => (
                    <div key={announcement.id} className="p-4 border rounded-lg" data-testid={`announcement-${announcement.id}`}>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{announcement.title}</h3>
                          <Badge variant={announcement.isActive ? "default" : "secondary"}>
                            {announcement.isActive ? "啟用" : "停用"}
                          </Badge>
                          {announcement.type === "warning" && <Badge variant="destructive">重要</Badge>}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleOpenAnnouncementDialog(announcement)}
                            data-testid={`button-edit-${announcement.id}`}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteAnnouncementMutation.mutate(announcement.id)}
                            data-testid={`button-delete-${announcement.id}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{announcement.content}</p>
                      {(announcement.startDate || announcement.endDate) && (
                        <div className="text-xs text-muted-foreground">
                          {announcement.startDate && `開始：${announcement.startDate}`}
                          {announcement.startDate && announcement.endDate && " | "}
                          {announcement.endDate && `結束：${announcement.endDate}`}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <Dialog open={isAnnouncementDialogOpen} onOpenChange={setIsAnnouncementDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingAnnouncement ? "編輯公告" : "新增公告"}</DialogTitle>
              <DialogDescription>填寫公告資訊</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">標題</Label>
                <Input
                  id="title"
                  value={announcementForm.title}
                  onChange={(e) => setAnnouncementForm({ ...announcementForm, title: e.target.value })}
                  placeholder="公告標題"
                  data-testid="input-announcement-title"
                />
              </div>
              <div>
                <Label htmlFor="content">內容</Label>
                <Textarea
                  id="content"
                  value={announcementForm.content}
                  onChange={(e) => setAnnouncementForm({ ...announcementForm, content: e.target.value })}
                  placeholder="公告內容"
                  rows={4}
                  data-testid="input-announcement-content"
                />
              </div>
              <div>
                <Label htmlFor="type">類型</Label>
                <Select
                  value={announcementForm.type}
                  onValueChange={(value) => setAnnouncementForm({ ...announcementForm, type: value })}
                >
                  <SelectTrigger data-testid="select-announcement-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="info">一般資訊</SelectItem>
                    <SelectItem value="warning">重要通知</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="startDate">開始日期（選填）</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={announcementForm.startDate}
                  onChange={(e) => setAnnouncementForm({ ...announcementForm, startDate: e.target.value })}
                  data-testid="input-announcement-start"
                />
              </div>
              <div>
                <Label htmlFor="endDate">結束日期（選填）</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={announcementForm.endDate}
                  onChange={(e) => setAnnouncementForm({ ...announcementForm, endDate: e.target.value })}
                  data-testid="input-announcement-end"
                />
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="isActive"
                  checked={announcementForm.isActive}
                  onCheckedChange={(checked) => setAnnouncementForm({ ...announcementForm, isActive: checked })}
                  data-testid="switch-announcement-active"
                />
                <Label htmlFor="isActive">啟用公告</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAnnouncementDialogOpen(false)} data-testid="button-cancel">
                取消
              </Button>
              <Button onClick={handleSaveAnnouncement} data-testid="button-save">
                儲存
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
