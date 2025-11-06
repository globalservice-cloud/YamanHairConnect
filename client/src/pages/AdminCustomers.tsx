import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertCustomerSchema, type Customer, type InsertCustomer, type PurchaseRecord } from "@shared/schema";
import { UserPlus, Eye, Trash2, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export default function AdminCustomers() {
  const { toast } = useToast();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: customers = [], isLoading } = useQuery<Customer[]>({
    queryKey: ["/api/customers"],
  });

  const { data: purchaseRecords = [] } = useQuery<PurchaseRecord[]>({
    queryKey: ["/api/purchase-records/customer", selectedCustomer?.id],
    enabled: !!selectedCustomer?.id,
  });

  const form = useForm<InsertCustomer>({
    resolver: zodResolver(insertCustomerSchema),
    defaultValues: {
      name: "",
      phone: "",
      lineId: null,
      email: null,
      notes: null,
    },
  });

  const createCustomerMutation = useMutation({
    mutationFn: async (data: InsertCustomer) => {
      const response = await fetch("/api/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to create customer");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/customers"] });
      toast({ title: "客戶已新增" });
      setIsCreateDialogOpen(false);
      form.reset();
    },
  });

  const deleteCustomerMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/customers/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete customer");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/customers"] });
      toast({ title: "客戶已刪除" });
    },
  });

  const handleViewCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsViewDialogOpen(true);
  };

  const handleDeleteCustomer = (id: string) => {
    if (confirm("確定要刪除此客戶嗎？")) {
      deleteCustomerMutation.mutate(id);
    }
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-serif">客戶管理</h1>
          <Button
            onClick={() => setIsCreateDialogOpen(true)}
            data-testid="button-add-customer"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            新增客戶
          </Button>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜尋客戶姓名或電話..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                data-testid="input-search-customers"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>客戶列表 ({filteredCustomers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8 text-muted-foreground">載入中...</div>
            ) : filteredCustomers.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                {searchQuery ? "找不到符合的客戶" : "尚無客戶資料"}
              </div>
            ) : (
              <div className="divide-y">
                {filteredCustomers.map((customer) => (
                  <div
                    key={customer.id}
                    className="flex items-center justify-between py-4"
                    data-testid={`customer-${customer.id}`}
                  >
                    <div className="flex-1">
                      <div className="font-medium text-lg" data-testid={`text-customer-name-${customer.id}`}>
                        {customer.name}
                      </div>
                      <div className="text-sm text-muted-foreground space-x-4">
                        <span data-testid={`text-customer-phone-${customer.id}`}>
                          電話: {customer.phone}
                        </span>
                        {customer.lineId && (
                          <span data-testid={`text-customer-line-${customer.id}`}>
                            LINE: {customer.lineId}
                          </span>
                        )}
                      </div>
                      {customer.email && (
                        <div className="text-sm text-muted-foreground" data-testid={`text-customer-email-${customer.id}`}>
                          Email: {customer.email}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewCustomer(customer)}
                        data-testid={`button-view-${customer.id}`}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        查看
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteCustomer(customer.id)}
                        data-testid={`button-delete-${customer.id}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent data-testid="dialog-create-customer">
            <DialogHeader>
              <DialogTitle>新增客戶</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit((data) => createCustomerMutation.mutate(data))} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>客戶姓名 *</FormLabel>
                      <FormControl>
                        <Input {...field} data-testid="input-customer-name" />
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
                      <FormLabel>聯絡電話 *</FormLabel>
                      <FormControl>
                        <Input {...field} data-testid="input-customer-phone" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lineId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LINE ID</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value || ""} data-testid="input-customer-line" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>電子郵件</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value || ""} type="email" data-testid="input-customer-email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>備註</FormLabel>
                      <FormControl>
                        <Textarea {...field} value={field.value || ""} data-testid="input-customer-notes" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsCreateDialogOpen(false)}
                    data-testid="button-cancel"
                  >
                    取消
                  </Button>
                  <Button
                    type="submit"
                    disabled={createCustomerMutation.isPending}
                    data-testid="button-submit"
                  >
                    {createCustomerMutation.isPending ? "新增中..." : "新增客戶"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent data-testid="dialog-view-customer">
            <DialogHeader>
              <DialogTitle>客戶詳情</DialogTitle>
            </DialogHeader>
            {selectedCustomer && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">客戶姓名</div>
                    <div className="font-medium" data-testid="text-detail-name">
                      {selectedCustomer.name}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">聯絡電話</div>
                    <div className="font-medium" data-testid="text-detail-phone">
                      {selectedCustomer.phone}
                    </div>
                  </div>
                  {selectedCustomer.lineId && (
                    <div>
                      <div className="text-sm text-muted-foreground">LINE ID</div>
                      <div className="font-medium" data-testid="text-detail-line">
                        {selectedCustomer.lineId}
                      </div>
                    </div>
                  )}
                  {selectedCustomer.email && (
                    <div>
                      <div className="text-sm text-muted-foreground">電子郵件</div>
                      <div className="font-medium" data-testid="text-detail-email">
                        {selectedCustomer.email}
                      </div>
                    </div>
                  )}
                </div>

                {selectedCustomer.notes && (
                  <div>
                    <div className="text-sm text-muted-foreground">備註</div>
                    <div className="font-medium" data-testid="text-detail-notes">
                      {selectedCustomer.notes}
                    </div>
                  </div>
                )}

                <div>
                  <div className="text-sm text-muted-foreground mb-2">消費紀錄</div>
                  {purchaseRecords.length === 0 ? (
                    <div className="text-sm text-muted-foreground">尚無消費紀錄</div>
                  ) : (
                    <div className="space-y-2">
                      {purchaseRecords.map((record) => (
                        <div
                          key={record.id}
                          className="p-3 border rounded-md"
                          data-testid={`purchase-record-${record.id}`}
                        >
                          <div className="flex justify-between items-start mb-1">
                            <div className="font-medium">{record.serviceName}</div>
                            <Badge variant="secondary">NT$ {record.amount}</Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {format(new Date(record.purchaseDate), "yyyy-MM-dd HH:mm")}
                          </div>
                          {record.stylistName && (
                            <div className="text-sm text-muted-foreground">
                              設計師: {record.stylistName}
                            </div>
                          )}
                          {record.notes && (
                            <div className="text-sm text-muted-foreground mt-1">
                              {record.notes}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
