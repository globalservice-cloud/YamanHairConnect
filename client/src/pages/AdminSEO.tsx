import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertSeoSettingSchema, type SeoSetting, type InsertSeoSetting } from "@shared/schema";
import { Search, Edit } from "lucide-react";

const PAGE_OPTIONS = [
  { value: "home", label: "首頁" },
  { value: "services", label: "服務項目" },
  { value: "team", label: "設計師團隊" },
  { value: "booking", label: "線上預約" },
  { value: "contact", label: "聯絡我們" },
];

export default function AdminSEO() {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState<string>("");

  const { data: seoSettings = [], isLoading } = useQuery<SeoSetting[]>({
    queryKey: ["/api/seo-settings"],
  });

  const form = useForm<InsertSeoSetting>({
    resolver: zodResolver(insertSeoSettingSchema),
    defaultValues: {
      page: "",
      title: "",
      description: "",
      keywords: null,
      ogImage: null,
    },
  });

  const saveSeoSettingMutation = useMutation({
    mutationFn: async (data: InsertSeoSetting) => {
      const response = await fetch("/api/seo-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to save SEO setting");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/seo-settings"] });
      toast({ title: "SEO 設定已儲存" });
      handleCloseDialog();
    },
  });

  const handleEditPage = (page: string) => {
    const existing = seoSettings.find((s) => s.page === page);
    setSelectedPage(page);
    
    if (existing) {
      form.reset({
        page: existing.page,
        title: existing.title,
        description: existing.description,
        keywords: existing.keywords,
        ogImage: existing.ogImage,
      });
    } else {
      const pageOption = PAGE_OPTIONS.find((p) => p.value === page);
      form.reset({
        page,
        title: `雅曼美髮沙龍 - ${pageOption?.label || ""}`,
        description: "",
        keywords: null,
        ogImage: null,
      });
    }
    
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedPage("");
    form.reset();
  };

  const handleSubmit = (data: InsertSeoSetting) => {
    saveSeoSettingMutation.mutate(data);
  };

  const getPageSetting = (page: string) => {
    return seoSettings.find((s) => s.page === page);
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-serif">SEO 設定</h1>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              搜尋引擎最佳化設定
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            設定每個頁面的標題、描述和關鍵字，以提升網站在搜尋引擎的排名。
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>頁面 SEO 設定</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8 text-muted-foreground">載入中...</div>
            ) : (
              <div className="divide-y">
                {PAGE_OPTIONS.map((pageOption) => {
                  const setting = getPageSetting(pageOption.value);
                  
                  return (
                    <div
                      key={pageOption.value}
                      className="flex items-start justify-between py-4"
                      data-testid={`seo-page-${pageOption.value}`}
                    >
                      <div className="flex-1">
                        <div className="font-medium text-lg mb-1" data-testid={`text-page-name-${pageOption.value}`}>
                          {pageOption.label}
                        </div>
                        {setting ? (
                          <div className="space-y-1">
                            <div className="text-sm">
                              <span className="text-muted-foreground">標題: </span>
                              <span data-testid={`text-page-title-${pageOption.value}`}>{setting.title}</span>
                            </div>
                            <div className="text-sm">
                              <span className="text-muted-foreground">描述: </span>
                              <span className="line-clamp-2" data-testid={`text-page-description-${pageOption.value}`}>
                                {setting.description}
                              </span>
                            </div>
                            {setting.keywords && (
                              <div className="text-sm">
                                <span className="text-muted-foreground">關鍵字: </span>
                                <span data-testid={`text-page-keywords-${pageOption.value}`}>{setting.keywords}</span>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="text-sm text-muted-foreground">尚未設定</div>
                        )}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditPage(pageOption.value)}
                        data-testid={`button-edit-${pageOption.value}`}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        {setting ? "編輯" : "設定"}
                      </Button>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
          <DialogContent className="max-w-2xl" data-testid="dialog-seo-form">
            <DialogHeader>
              <DialogTitle>
                編輯 SEO 設定 - {PAGE_OPTIONS.find((p) => p.value === selectedPage)?.label}
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>頁面標題 *</FormLabel>
                      <FormControl>
                        <Input {...field} data-testid="input-seo-title" />
                      </FormControl>
                      <FormDescription>
                        這將顯示在瀏覽器標籤和搜尋結果中 (建議 50-60 字元)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>頁面描述 *</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={4} data-testid="input-seo-description" />
                      </FormControl>
                      <FormDescription>
                        這將顯示在搜尋結果的摘要中 (建議 150-160 字元)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="keywords"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>關鍵字</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value || ""} data-testid="input-seo-keywords" />
                      </FormControl>
                      <FormDescription>
                        用逗號分隔多個關鍵字，例如: 美髮, 剪髮, 染髮, 燙髮
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="ogImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>社群分享圖片 URL</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value || ""} placeholder="https://..." data-testid="input-seo-og-image" />
                      </FormControl>
                      <FormDescription>
                        當頁面在社群媒體分享時顯示的圖片 (建議尺寸 1200x630px)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCloseDialog}
                    data-testid="button-cancel"
                  >
                    取消
                  </Button>
                  <Button
                    type="submit"
                    disabled={saveSeoSettingMutation.isPending}
                    data-testid="button-submit"
                  >
                    {saveSeoSettingMutation.isPending ? "儲存中..." : "儲存設定"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
