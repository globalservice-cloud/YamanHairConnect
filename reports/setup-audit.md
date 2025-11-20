# Yaman Hair Connect — 現況健檢（Setup Audit）

_更新時間：2025-11-20_

## 1. 架構概覽

- **前端**：React 18 + Vite，使用 Wouter 管理公開（Home/Services/Team/Booking/Contact）與後台（Admin*）路由；Navbar/Footer 只在非 `/admin` 路徑渲染，配合 React Query、TooltipProvider 與 Toaster 提供全域狀態與 UI 服務。

```1:44:client/src/App.tsx
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route path="/admin/calendar" component={AdminCalendar} />
      <Route path="/admin/customers" component={AdminCustomers} />
```

- **狀態/資料擷取**：`queryClient` 將預設 QueryFn 設為 `fetch(queryKey.join("/"))`，強制 401 直接 throw，禁用自動 refetch，並提供 `apiRequest` 進行具體 CRUD 呼叫，預設 `credentials: "include"` 以便 session 維持。

```1:58:client/src/lib/queryClient.ts
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
```

- **設計系統**：Shadcn/UI + Radix + Tailwind，自定義字體 (Noto Serif TC / Noto Sans TC / Inter)，色票與 spacing 依 `design_guidelines.md` 與 `client/src/index.css` 的 CSS 變數調校。
- **後端**：Express 伺服器集中於 `server/index.ts`，掛載 JSON/URL-Encoded parsing、自製 API logging middleware、錯誤處理，依 `NODE_ENV` 切換 dev HMR (`setupVite`) 與 production 靜態檔 (`serveStatic`)。

```1:80:server/index.ts
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
```

- **API**：`server/routes.ts` 封裝 RESTful 資源（customers/services/staff/bookings/purchase-records/marketing-campaigns/seo-settings/business-hours/announcements），並提供 `/api/upload` 圖片上傳（multer，5MB 上限，檔案落地到 `attached_assets/`）。

```49:142:server/routes.ts
  app.get("/api/services/active", async (_req, res) => {
    const services = await storage.getActiveServices();
    res.json(services);
  });
```

- **資料層**：Drizzle ORM + Neon PostgreSQL。`shared/schema.ts` 定義 10+ 資料表與 zod schema；`server/storage.ts` 提供 `MemStorage`（測試）與 `DbStorage`（正式），建構時會 `initializeDefaultData()` 自動寫入預設管理員、服務、設計師、營業時間。

```474:549:server/storage.ts
  constructor() {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL not configured");
    }
    const sql = neon(process.env.DATABASE_URL);
    this.db = drizzle(sql);
    this.initializeDefaultData();
  }
```

- **建置/腳本**：`package.json` 定義 `npm run dev`（tsx）、`npm run build`（Vite + esbuild bundle server）、`npm run start`（node dist/index.js）、`npm run check`（tsc）、`npm run db:push`（drizzle-kit）。

```6:12:package.json
  "scripts": {
    "dev": "NODE_ENV=development tsx server/index.ts",
    "build": "vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist",
```

## 2. 環境設定

- **必要環境變數**：`DATABASE_URL`（Neon/Postgres 連線字串）為 `DbStorage` 初始化硬性需求；`PORT` 預設 5000，可於部署平臺覆蓋。尚未看到 `.env.example`。
- **靜態資源**：所有圖像存放於 `attached_assets/`，上傳 API 也會放置於此；部署到 Vercel 時需確認該資料夾納入輸出，或改採物件儲存。
- **Session / Auth**：`package.json` 引入 `express-session`, `passport`, `passport-local`，但目前程式碼仍採自建 admin user + JWT-less fetch；可能是後續故事尚未接好。

## 3. 既有資料模型

- 客戶、服務、設計師、預約、消費紀錄、行銷活動、SEO、營業時間、公告等皆以 Drizzle schema 定義；Booking 以文字儲存 `serviceIds` (text array) 與 `bookingDate/time`（text）。

```47:67:shared/schema.ts
export const bookings = pgTable("bookings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  customerId: varchar("customer_id").references(() => customers.id),
  customerName: text("customer_name").notNull(),
```

- `initializeDefaultData()` 目前僅涵蓋 user/services/staff/business hours；其他表需手動或 API 新增。若 Neon DB 為全域共享，需注意多環境碰撞。

## 4. 風險與缺口（需滾動追蹤）

1. **環境機密**：缺少 `.env.example` 與說明；`DATABASE_URL` 未設時伺服器直接 throw。建議補示例並提供本地/雲端配置指南。
2. **文件上傳儲存**：multer 直接寫到本地 `attached_assets/`，免費 Vercel/Render 會使用唯讀或易揮發檔系統；需改為物件儲存（S3/Cloudflare R2）或改在 build 時打包靜態內容。
3. **Auth/Security**：目前 login 資料表有 plain password；沒有 bcrypt/salting 與 RBAC、Rate Limit、CSRF 防禦（雖 React Query fetch `credentials: include`）。需確認後台實作。
4. **多語系 SEO**：`seo_settings` schema 已備好，但尚未在前端頁面使用；部署前需確認 SSR/Metadata 產出策略。
5. **Testing Coverage**：未見 Jest/Vitest/Cypress 設定，僅 `npm run check`。接下來 QA 需定義測試堆疊。
6. **Deployment Target**：`npm run start` 需要 Node server 長駐；純 Vercel 靜態無法直接執行，需採 Vercel Serverless/Edge Function 或改用 Render/ Railway。需評估 Vercel 的 Node Serverless 支援與 Neon 連線限制。

## 5. 建議後續行動

- 整理 `.env.example` & Deployment README，描述 `DATABASE_URL`、`PORT`、靜態資源策略。
- 優先針對 Booking/後台流程撰寫 E2E 測試（Playwright/Cypress）與 API 測試（Supertest）以支援 QA 任務。
- 決定最終部署拓撲：若堅持 Vercel，需使用 Serverless Functions + separate frontend build；或者以 Render Web Service 提供 Node 執行，再用 Vercel 僅 serve 靜態前端。
- 制定遷移策略將上傳檔案轉移至持久儲存（S3/R2），避免免費平臺 ephemeral disk。

---

此健檢將作為後續 `frontend-polish`、`backend-hardening`、`qa-validation`、`deploy-vercel` 任務之基線，可隨進度補充。 

