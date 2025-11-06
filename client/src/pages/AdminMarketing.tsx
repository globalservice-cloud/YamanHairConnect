import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertMarketingCampaignSchema, type MarketingCampaign, type InsertMarketingCampaign } from "@shared/schema";
import { Plus, Edit, Trash2, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AdminMarketing() {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<MarketingCampaign | null>(null);

  const { data: campaigns = [], isLoading } = useQuery<MarketingCampaign[]>({
    queryKey: ["/api/marketing-campaigns"],
  });

  const form = useForm<InsertMarketingCampaign>({
    resolver: zodResolver(insertMarketingCampaignSchema),
    defaultValues: {
      title: "",
      description: "",
      discountType: null,
      discountValue: null,
      startDate: null,
      endDate: null,
      isActive: true,
    },
  });

  const createCampaignMutation = useMutation({
    mutationFn: async (data: InsertMarketingCampaign) => {
      const response = await fetch("/api/marketing-campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to create campaign");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/marketing-campaigns"] });
      toast({ title: "行銷活動已新增" });
      handleCloseDialog();
    },
  });

  const updateCampaignMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertMarketingCampaign> }) => {
      const response = await fetch(`/api/marketing-campaigns/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to update campaign");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/marketing-campaigns"] });
      toast({ title: "行銷活動已更新" });
      handleCloseDialog();
    },
  });

  const deleteCampaignMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/marketing-campaigns/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete campaign");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/marketing-campaigns"] });
      toast({ title: "行銷活動已刪除" });
    },
  });

  const handleCreateNew = () => {
    setEditingCampaign(null);
    form.reset({
      title: "",
      description: "",
      discountType: null,
      discountValue: null,
      startDate: null,
      endDate: null,
      isActive: true,
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (campaign: MarketingCampaign) => {
    setEditingCampaign(campaign);
    form.reset({
      title: campaign.title,
      description: campaign.description,
      discountType: campaign.discountType,
      discountValue: campaign.discountValue,
      startDate: campaign.startDate,
      endDate: campaign.endDate,
      isActive: campaign.isActive,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("確定要刪除此行銷活動嗎？")) {
      deleteCampaignMutation.mutate(id);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingCampaign(null);
    form.reset();
  };

  const handleSubmit = (data: InsertMarketingCampaign) => {
    if (editingCampaign) {
      updateCampaignMutation.mutate({ id: editingCampaign.id, data });
    } else {
      createCampaignMutation.mutate(data);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-serif">行銷活動管理</h1>
          <Button onClick={handleCreateNew} data-testid="button-add-campaign">
            <Plus className="h-4 w-4 mr-2" />
            新增活動
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              行銷活動列表 ({campaigns.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8 text-muted-foreground">載入中...</div>
            ) : campaigns.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">尚無行銷活動</div>
            ) : (
              <div className="divide-y">
                {campaigns.map((campaign) => (
                  <div
                    key={campaign.id}
                    className="py-4"
                    data-testid={`campaign-${campaign.id}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-lg" data-testid={`text-campaign-title-${campaign.id}`}>
                            {campaign.title}
                          </span>
                          {campaign.isActive ? (
                            <Badge variant="default">進行中</Badge>
                          ) : (
                            <Badge variant="secondary">已結束</Badge>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground" data-testid={`text-campaign-description-${campaign.id}`}>
                          {campaign.description}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(campaign)}
                          data-testid={`button-edit-${campaign.id}`}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          編輯
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(campaign.id)}
                          data-testid={`button-delete-${campaign.id}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm mt-2">
                      {campaign.discountType && (
                        <div>
                          <span className="text-muted-foreground">優惠類型: </span>
                          <span className="font-medium">{campaign.discountType}</span>
                        </div>
                      )}
                      {campaign.discountValue && (
                        <div>
                          <span className="text-muted-foreground">優惠內容: </span>
                          <span className="font-medium">{campaign.discountValue}</span>
                        </div>
                      )}
                      {campaign.startDate && (
                        <div>
                          <span className="text-muted-foreground">開始日期: </span>
                          <span className="font-medium">{campaign.startDate}</span>
                        </div>
                      )}
                      {campaign.endDate && (
                        <div>
                          <span className="text-muted-foreground">結束日期: </span>
                          <span className="font-medium">{campaign.endDate}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
          <DialogContent data-testid="dialog-campaign-form">
            <DialogHeader>
              <DialogTitle>{editingCampaign ? "編輯行銷活動" : "新增行銷活動"}</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>活動標題 *</FormLabel>
                      <FormControl>
                        <Input {...field} data-testid="input-campaign-title" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>活動說明 *</FormLabel>
                      <FormControl>
                        <Textarea {...field} data-testid="input-campaign-description" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="discountType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>優惠類型</FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value || ""} placeholder="例如: 折扣、優惠" data-testid="input-campaign-discount-type" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="discountValue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>優惠內容</FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value || ""} placeholder="例如: 8折、送護髮" data-testid="input-campaign-discount-value" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>開始日期</FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value || ""} type="date" data-testid="input-campaign-start-date" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>結束日期</FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value || ""} type="date" data-testid="input-campaign-end-date" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-4">
                      <div>
                        <FormLabel>活動狀態</FormLabel>
                        <div className="text-sm text-muted-foreground">
                          {field.value ? "此活動將在前台顯示" : "此活動將被隱藏"}
                        </div>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          data-testid="switch-campaign-active"
                        />
                      </FormControl>
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
                    disabled={createCampaignMutation.isPending || updateCampaignMutation.isPending}
                    data-testid="button-submit"
                  >
                    {createCampaignMutation.isPending || updateCampaignMutation.isPending
                      ? "儲存中..."
                      : editingCampaign
                      ? "更新活動"
                      : "新增活動"}
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
