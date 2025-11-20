# QA Validation Report

_更新時間：2025-11-20_

## 測試範圍
- 首頁「專業服務項目」區塊的資料載入、骨架狀態與 fallback 提示 (`client/src/pages/Home.tsx`)。
- 服務列表頁面之動態資料、錯誤提示、預設資料說明 (`client/src/pages/Services.tsx`)。
- 服務/人員相關 API 的錯誤處理與 PATCH 驗證 (`server/routes.ts`)。

## 測試案例
| 編號 | 項目 | 步驟 | 預期結果 | 狀態 |
| --- | --- | --- | --- | --- |
| TC-01 | 首頁服務載入 | 1) 啟動 `npm run dev` 2) 開啟 `/` | 出現 Skeleton，資料載入後顯示實際服務與價格 | 待執行（本地缺少 npm） |
| TC-02 | 首頁 fallback 提示 | 1) 將 `services` 表の `is_active` 全設為 false 2) 重新整理首頁 | Cards 使用預設內容並顯示提示文字 | 待執行 |
| TC-03 | 服務頁錯誤提示 | 1) 停止資料庫服務 2) 瀏覽 `/services` | 顯示錯誤 Alert 與「重新整理」按鈕 | 待執行 |
| TC-04 | 服務頁 fallback | 1) 清空/停用服務資料 2) 瀏覽 `/services` | 顯示預設 Alert，卡片仍呈現品牌內容 | 待執行 |
| TC-05 | API 錯誤處理 | 1) `curl /api/services/active` 在資料庫不可用時 | 回傳 500、`error` 與 `detail` 欄位 | 待執行 |
| TC-06 | PATCH 驗證 | 1) `curl -X PATCH /api/services/:id` 傳送 `price: "abc"` | 回傳 400，說明 Zod 錯誤 | 待執行 |

## 自動化/靜態檢查
- 嘗試執行 `npm run check`（TypeScript 編譯檢查）以驗證型別安全，惟當前環境找不到 npm，可於具備 Node.js 的環境重新執行。指令與輸出請參考本次工作紀錄。

## 待辦
- 於具 Node.js 的環境重新執行上述測試並填寫結果。  
- 後續可以 Playwright 覆蓋 TC-01～TC-04，Supertest 覆蓋 TC-05～TC-06。


