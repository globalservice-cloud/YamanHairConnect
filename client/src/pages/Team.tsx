import { useQuery } from "@tanstack/react-query";
import StylistCard from "@/components/StylistCard";
import type { Staff } from "@shared/schema";

export default function Team() {
  const { data: allStaff = [], isLoading } = useQuery<Staff[]>({
    queryKey: ["/api/staff/active"],
  });

  // Filter only designers
  const designers = allStaff.filter(s => s.role === "設計師");

  // Transform staff data to match StylistCard interface
  const stylists = designers.map(designer => ({
    name: designer.name,
    specialty: designer.specialty || "專業設計師",
    experience: designer.yearsOfExperience ? `${designer.yearsOfExperience}年專業經驗` : "豐富經驗",
    image: designer.photoUrl || "",
    bio: `擁有${designer.yearsOfExperience || "豐富"}年經驗的${designer.specialty || "專業設計師"}，精通各式剪髮、染燙技術。以專業的技術與溫暖的服務，為每位顧客打造最適合的髮型。`,
  }));

  if (isLoading) {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-5xl font-serif font-bold mb-4">專業團隊</h1>
            <p className="text-lg text-muted-foreground">載入中...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-serif font-bold mb-4">專業團隊</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            我們的設計師團隊擁有豐富經驗與專業技術，以真誠的態度為您服務
          </p>
        </div>

        {stylists.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">目前沒有設計師資料</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {stylists.map((stylist, index) => (
              <StylistCard key={index} {...stylist} />
            ))}
          </div>
        )}

        <div className="mt-16 p-8 bg-card rounded-2xl max-w-4xl mx-auto">
          <h2 className="text-2xl font-serif font-semibold mb-4 text-center">為什麼選擇雅曼</h2>
          <div className="grid md:grid-cols-2 gap-6 text-muted-foreground">
            <div>
              <h3 className="font-semibold text-foreground mb-2">專業認證</h3>
              <p className="text-sm">所有設計師均經過專業培訓與認證，持續進修最新技術</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">客製服務</h3>
              <p className="text-sm">根據每位顧客的需求，提供最適合的專業建議</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">溫馨環境</h3>
              <p className="text-sm">如家般舒適的空間，讓您在放鬆中享受美髮時光</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">品質保證</h3>
              <p className="text-sm">使用頂級美髮產品，確保最佳服務品質</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
