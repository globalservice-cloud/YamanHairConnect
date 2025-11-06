import { useState, useRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Pencil, Trash2, User, LogOut, Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { queryClient } from "@/lib/queryClient";
import type { Staff, InsertStaff } from "@shared/schema";
import { insertStaffSchema } from "@shared/schema";

export default function AdminStaff() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: staff = [], isLoading } = useQuery<Staff[]>({
    queryKey: ["/api/staff"],
  });

  const form = useForm<InsertStaff>({
    resolver: zodResolver(insertStaffSchema),
    defaultValues: {
      name: "",
      role: "設計師",
      email: null,
      phone: null,
      specialty: "",
      yearsOfExperience: 0,
      photoUrl: null,
      isActive: true,
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertStaff) => {
      const response = await fetch("/api/staff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to create staff");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/staff"] });
      toast({ title: "成功", description: "已新增員工" });
      handleCloseDialog();
    },
    onError: () => {
      toast({ title: "錯誤", description: "新增員工失敗", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertStaff> }) => {
      const response = await fetch(`/api/staff/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to update staff");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/staff"] });
      toast({ title: "成功", description: "已更新員工資料" });
      handleCloseDialog();
    },
    onError: () => {
      toast({ title: "錯誤", description: "更新員工失敗", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/staff/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete staff");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/staff"] });
      toast({ title: "成功", description: "已刪除員工" });
    },
    onError: () => {
      toast({ title: "錯誤", description: "刪除員工失敗", variant: "destructive" });
    },
  });

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast({ title: "錯誤", description: "請選擇圖片文件", variant: "destructive" });
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "錯誤", description: "圖片大小不能超過5MB", variant: "destructive" });
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPhotoPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to server
    setUploadingPhoto(true);
    const formData = new FormData();
    formData.append("photo", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("上傳失敗");

      const data = await response.json();
      form.setValue("photoUrl", data.photoUrl);
      toast({ title: "成功", description: "照片上傳成功" });
    } catch (error) {
      toast({ title: "錯誤", description: "照片上傳失敗", variant: "destructive" });
      setPhotoPreview(null);
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleRemovePhoto = () => {
    setPhotoPreview(null);
    form.setValue("photoUrl", null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleEdit = (member: Staff) => {
    setEditingStaff(member);
    setPhotoPreview(member.photoUrl);
    form.reset({
      name: member.name,
      role: member.role,
      email: member.email,
      phone: member.phone,
      specialty: member.specialty || "",
      yearsOfExperience: member.yearsOfExperience || 0,
      photoUrl: member.photoUrl,
      isActive: member.isActive,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (data: InsertStaff) => {
    if (editingStaff) {
      updateMutation.mutate({ id: editingStaff.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingStaff(null);
    setPhotoPreview(null);
    form.reset();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const designers = staff.filter(s => s.role === "設計師");
  const assistants = staff.filter(s => s.role === "助理");

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-serif font-bold mb-2">員工管理</h1>
            <p className="text-muted-foreground">管理設計師和助理</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setLocation("/admin/dashboard")} data-testid="button-back">
              返回
            </Button>
            <Button variant="outline" onClick={() => setLocation("/admin")} data-testid="button-logout">
              <LogOut className="w-4 h-4 mr-2" />
              登出
            </Button>
          </div>
        </div>

        <div className="mb-6">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingStaff(null)} data-testid="button-add-staff">
                <Plus className="w-4 h-4 mr-2" />
                新增員工
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingStaff ? "編輯員工" : "新增員工"}</DialogTitle>
                <DialogDescription>
                  {editingStaff ? "修改員工資料" : "填寫新員工資料"}
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>姓名 *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="請輸入姓名" data-testid="input-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>職位 *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-role">
                              <SelectValue placeholder="選擇職位" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="設計師">設計師</SelectItem>
                            <SelectItem value="助理">助理</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            value={field.value || ""} 
                            type="email"
                            placeholder="email@example.com" 
                            data-testid="input-email" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>電話</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            value={field.value || ""} 
                            placeholder="例：0912-345-678" 
                            data-testid="input-phone" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="specialty"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>專長</FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value || ""} placeholder="例：資深設計師" data-testid="input-specialty" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="yearsOfExperience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>年資</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            value={field.value || 0}
                            onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                            placeholder="經驗年數" 
                            data-testid="input-years"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Photo Upload Section */}
                  <div className="space-y-2">
                    <Label>照片</Label>
                    <div className="flex items-start gap-4">
                      {/* Photo Preview */}
                      <div className="flex-shrink-0">
                        <Avatar className="w-32 h-32 border-2">
                          {photoPreview ? (
                            <AvatarImage src={photoPreview} alt="預覽" className="object-cover" />
                          ) : (
                            <AvatarFallback>
                              <User className="w-16 h-16 text-muted-foreground" />
                            </AvatarFallback>
                          )}
                        </Avatar>
                      </div>

                      {/* Upload Controls */}
                      <div className="flex-1 space-y-2">
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                          data-testid="input-photo-file"
                        />
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploadingPhoto}
                            data-testid="button-upload-photo"
                          >
                            <Upload className="w-4 h-4 mr-2" />
                            {uploadingPhoto ? "上傳中..." : "上傳照片"}
                          </Button>
                          {photoPreview && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={handleRemovePhoto}
                              disabled={uploadingPhoto}
                              data-testid="button-remove-photo"
                            >
                              <X className="w-4 h-4 mr-2" />
                              移除照片
                            </Button>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          支援 JPG、PNG、GIF、WebP 格式，最大 5MB
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={handleCloseDialog} data-testid="button-cancel">
                      取消
                    </Button>
                    <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending} data-testid="button-submit">
                      {editingStaff ? "更新" : "新增"}
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>設計師 ({designers.length})</CardTitle>
              <CardDescription>管理髮型設計師</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8 text-muted-foreground">載入中...</div>
              ) : designers.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">尚無設計師</div>
              ) : (
                <div className="space-y-3">
                  {designers.map((member) => (
                    <Card key={member.id} className="hover-elevate" data-testid={`card-staff-${member.id}`}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-3 flex-1">
                            <Avatar className="w-12 h-12 flex-shrink-0">
                              {member.photoUrl ? (
                                <AvatarImage src={member.photoUrl} alt={member.name} className="object-cover" />
                              ) : (
                                <AvatarFallback>
                                  <User className="w-6 h-6 text-primary" />
                                </AvatarFallback>
                              )}
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold">{member.name}</h3>
                                {!member.isActive && <Badge variant="secondary">已停用</Badge>}
                              </div>
                              {member.specialty && (
                                <p className="text-sm text-muted-foreground">{member.specialty}</p>
                              )}
                              {member.yearsOfExperience && (
                                <p className="text-xs text-muted-foreground mt-1">
                                  {member.yearsOfExperience} 年經驗
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <Button 
                              size="icon" 
                              variant="ghost"
                              onClick={() => handleEdit(member)}
                              data-testid={`button-edit-${member.id}`}
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="icon" 
                              variant="ghost"
                              onClick={() => deleteMutation.mutate(member.id)}
                              data-testid={`button-delete-${member.id}`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>助理 ({assistants.length})</CardTitle>
              <CardDescription>管理美髮助理</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8 text-muted-foreground">載入中...</div>
              ) : assistants.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">尚無助理</div>
              ) : (
                <div className="space-y-3">
                  {assistants.map((member) => (
                    <Card key={member.id} className="hover-elevate" data-testid={`card-staff-${member.id}`}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-3 flex-1">
                            <Avatar className="w-12 h-12 flex-shrink-0">
                              {member.photoUrl ? (
                                <AvatarImage src={member.photoUrl} alt={member.name} className="object-cover" />
                              ) : (
                                <AvatarFallback>
                                  <User className="w-6 h-6 text-primary" />
                                </AvatarFallback>
                              )}
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold">{member.name}</h3>
                                {!member.isActive && <Badge variant="secondary">已停用</Badge>}
                              </div>
                              {member.specialty && (
                                <p className="text-sm text-muted-foreground">{member.specialty}</p>
                              )}
                              {member.yearsOfExperience && (
                                <p className="text-xs text-muted-foreground mt-1">
                                  {member.yearsOfExperience} 年經驗
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <Button 
                              size="icon" 
                              variant="ghost"
                              onClick={() => handleEdit(member)}
                              data-testid={`button-edit-${member.id}`}
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="icon" 
                              variant="ghost"
                              onClick={() => deleteMutation.mutate(member.id)}
                              data-testid={`button-delete-${member.id}`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
