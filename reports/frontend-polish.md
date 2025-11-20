# Frontend Polish 自檢

_更新時間：2025-11-20_

## 調整重點
- `client/src/hooks/useServices.ts`：新增可重用的服務資料 React Query hook，統一串接 `/api/services/active`。
- `client/src/data/serviceMeta.ts`：建立服務對應的圖片、icon、描述與價格格式化邏輯，並提供動態/預設轉換 helper。
- `client/src/pages/Services.tsx`：前台服務頁面改用實際資料，加入 Skeleton 載入、錯誤提示、預設資料告知與重新整理按鈕。
- `client/src/pages/Home.tsx`：首頁「專業服務項目」區塊改為即時資料、Skeleton 佈局與 fallback 訊息，確保首頁敘述與後端同步。

## 手動驗證
1. 本地執行 `npm run dev`，於瀏覽器造訪 `/services` 與 `/`。  
2. 觀察以下狀態：
   - API 載入期間顯示骨架。  
   - Neon/後端有資料時會呈現真實價格、敘述與 icon。  
   - 當資料表為空或失敗時，Alert 會說明已顯示預設內容並提供重新整理。  
3. 手動停用 API（或使其錯誤）確認錯誤提示仍可正常回復。

## 待觀察項目
- 後端若改為可上傳服務圖片，可再擴充 `serviceMeta` 使資料完全後台化。
- 現階段預設圖片仍儲存在 repo，部署時需確保靜態資源可由 Node 伺服器輸出或改採 CDN。


