# Backend Hardening 報告

_更新時間：2025-11-20_

## 強化內容
1. **服務資料 API 防護**  
   - `server/routes.ts` 針對 `GET /api/services` 與 `GET /api/services/active` 加入 try/catch，失敗時回傳 HTTP 500 及詳細訊息欄位，避免未捕捉的 Promise 導致伺服器崩潰。`server/routes.ts`
2. **Staff API 防護**  
   - `GET /api/staff`、`/active`、`/role/:role` 皆加入錯誤處理，確保後台/前台對人員資料的依賴更穩定。
3. **服務更新驗證**  
   - 新增 `updateServiceSchema = insertServiceSchema.partial()`，`PATCH /api/services/:id` 會先經 Zod 驗證後才寫入 DB，避免傳入無效欄位或破壞 `isActive`、`price` 型別。`server/routes.ts`

## 測試建議
1. `npm run dev` 啟動後，關閉資料庫連線（或暫時更改 `DATABASE_URL`），呼叫 `/api/services/active`，應回傳 500 並含 `error`/`detail`。  
2. 對 `PATCH /api/services/:id` 嘗試寫入字串型 price，應收到 400 與 Zod error。  
3. 正常流程下（資料庫可用）：`GET /api/staff/active` 應回傳資料且無變更。

## 後續建議
- 其餘 GET endpoints（customers、bookings 等）之錯誤處理可沿用同樣模式。  
- 未來若導入日誌系統，可將錯誤同步寫入監控以利追蹤。


