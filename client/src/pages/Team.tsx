import StylistCard from "@/components/StylistCard";
import qiaoxuanImage from '@assets/IMG_3664_1762413101449.jpeg';
import yianImage from '@assets/IMG_3667_1762413450872.jpeg';

export default function Team() {
  const stylists = [
    {
      name: "益安",
      specialty: "資深設計師（總監）",
      experience: "35年專業經驗",
      image: yianImage,
      bio: "擁有35年豐富經驗的資深總監，精通各式剪髮、染燙技術。以專業的技術領導團隊，為每位顧客提供最優質的美髮服務。",
    },
    {
      name: "巧宣",
      specialty: "資深設計師",
      experience: "27年專業經驗",
      image: qiaoxuanImage,
      bio: "擁有27年豐富經驗的資深設計師，精通各式剪髮、染燙技術。以專業的技術與溫暖的服務，為每位顧客打造最適合的髮型。",
    },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-serif font-bold mb-4">專業團隊</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            我們的設計師團隊擁有豐富經驗與專業技術，以真誠的態度為您服務
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {stylists.map((stylist, index) => (
            <StylistCard key={index} {...stylist} />
          ))}
        </div>

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
