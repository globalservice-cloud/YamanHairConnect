import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { toast } = useToast();

  const changePasswordMutation = useMutation({
    mutationFn: async () => {
      const adminUser = localStorage.getItem("adminUser");
      if (!adminUser) throw new Error("未登入");
      
      const user = JSON.parse(adminUser);
      
      const response = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          username: user.username, 
          oldPassword, 
          newPassword 
        }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "修改密碼失敗");
      }
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "密碼已更新", description: "請使用新密碼登入" });
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    },
    onError: (error: Error) => {
      toast({ 
        title: "修改密碼失敗", 
        description: error.message,
        variant: "destructive" 
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast({ 
        title: "密碼不符", 
        description: "新密碼與確認密碼不一致",
        variant: "destructive" 
      });
      return;
    }
    
    if (newPassword.length < 6) {
      toast({ 
        title: "密碼太短", 
        description: "新密碼至少需要6個字元",
        variant: "destructive" 
      });
      return;
    }
    
    changePasswordMutation.mutate();
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-serif">修改密碼</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              更改管理員密碼
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="oldPassword">目前密碼</Label>
                <Input
                  id="oldPassword"
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="請輸入目前密碼"
                  required
                  data-testid="input-old-password"
                />
              </div>
              <div>
                <Label htmlFor="newPassword">新密碼</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="請輸入新密碼（至少6個字元）"
                  required
                  data-testid="input-new-password"
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword">確認新密碼</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="再次輸入新密碼"
                  required
                  data-testid="input-confirm-password"
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  type="submit"
                  disabled={changePasswordMutation.isPending}
                  data-testid="button-change-password"
                >
                  {changePasswordMutation.isPending ? "更新中..." : "更新密碼"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
