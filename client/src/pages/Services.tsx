import ServiceCard from "@/components/ServiceCard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { buildServiceCardData, defaultServiceCards } from "@/data/serviceMeta";
import { useActiveServices } from "@/hooks/useServices";

export default function Services() {
  const {
    data: services = [],
    isLoading,
    isError,
    refetch,
  } = useActiveServices();

  const cards = services.length ? services.map((service) => buildServiceCardData(service)) : defaultServiceCards;
  const showFallbackNotice = !isLoading && services.length === 0 && !isError;

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-serif font-bold mb-4">服務項目</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            從基礎護理到時尚造型，我們提供全方位的專業美髮服務
          </p>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-[360px] w-full rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {cards.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        )}

        {isError && (
          <Alert variant="destructive" className="mt-10 max-w-4xl mx-auto">
            <AlertTitle>服務列表載入失敗</AlertTitle>
            <AlertDescription className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <span>請檢查網路連線或稍後再試一次。</span>
              <Button variant="outline" size="sm" onClick={() => refetch()}>
                重新整理
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {showFallbackNotice && (
          <Alert className="mt-10 max-w-4xl mx-auto">
            <AlertTitle>目前顯示預設服務資訊</AlertTitle>
            <AlertDescription>
              尚未在後台啟用服務資料，訪客暫時看到的是品牌預設內容；可在管理後台新增或啟用服務來更新此區塊。
            </AlertDescription>
          </Alert>
        )}

        <div className="mt-16 p-8 bg-card rounded-2xl max-w-4xl mx-auto">
          <h2 className="text-2xl font-serif font-semibold mb-4 text-center">服務說明</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>• 以上價格為基本價格，實際費用依照髮長、髮質及服務內容而定</p>
            <p>• 首次來店享有9折優惠</p>
            <p>• 建議提前預約，確保您的專屬時段</p>
            <p>• 所有服務均包含專業諮詢與造型建議</p>
          </div>
        </div>
      </div>
    </div>
  );
}
