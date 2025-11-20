# Deploy & Monitoring 計畫

_更新時間：2025-11-20_

## 架構策略
- **Render Web Service（免費方案）**：負責執行完整的 Express + React SSR 伺服器，使用 `render.yaml` 自動化建置（`npm run build` → `npm run start`）。  
- **Vercel Static Frontend（免費方案）**：佈署 `client` 編譯後的靜態資產，用作全球 CDN 與行銷頁快取，同時透過環境變數 `VITE_API_BASE_URL` 代理到 Render API。  
- **資料庫**：Neon (Serverless PostgreSQL)。`DATABASE_URL` 於 Render 環境設定，Vercel 無須接觸機敏資訊。

## Render 佈署流程（後端 + API）
1. 於 Render Dashboard 新增 Web Service，直接連結 GitHub repo。  
2. Render 會讀取根目錄 `render.yaml`：  
   ```yaml
   services:
     - type: web
       buildCommand: npm install && npm run build
       startCommand: npm run start
   ```
3. 設定環境變數：  
   - `DATABASE_URL`：Neon 提供的連線字串。  
   - `NODE_ENV=production`（已在 `render.yaml` 預設）。  
4. 部署完成後，記錄公開 URL（例如 `https://yaman-hairconnect.onrender.com`），健康檢查路徑使用 `/api/services/active`。

## Vercel 佈署流程（前端靜態頁）
1. 於 Vercel 建立新專案，root 指向 `client/`。  
2. Build 設定：  
   - Install Command：`npm install`  
   - Build Command：`npm run build`  
   - Output Directory：`dist`（Vite 預設）。  
3. 環境變數：  
   - `VITE_API_BASE_URL=https://yaman-hairconnect.onrender.com`（Render Web Service URL）。  
4. 佈署後，所有 `fetch("/api/...")` 會自動指向 Render URL（`client/src/lib/queryClient.ts` 已支援）。

## 監控與回滾
- **Render Metrics**：啟用免費 CPU/記憶體儀表，設定健康檢查與失敗告警 email。  
- **Vercel Analytics**：開啟流量與地理統計，若前端出現重大問題可一鍵回滾至上一個成功佈署。  
- **日誌**：Render Log 遭遇 500 時會記錄 `detail` 欄位，方便比對 QA 報告 TC-05、TC-06。  
- **KPI**：  
  - API uptime ≥ 99%（Render 提供基本 SLA）。  
  - 首頁 LCP < 2.5s（透過 Vercel Analytics 追蹤）。  
  - 錯誤率（500 / 總請求）< 1%。

## 後續自動化
- 可於 GitHub 設定兩條 workflow：  
  1. `ci.yml`：執行 `npm run check` + 自動化測試。  
  2. `deploy.yml`：Branch 合併 main 後自動觸發 Render Deploy Hook 與 Vercel Deployment。  
- 亦可加入簡易健康檢查腳本，定時呼叫 `/api/services/active` 並將狀態送至 Slack。


