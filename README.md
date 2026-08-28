# 打擊樂器學習室

給樂器體驗營零基礎學員使用的繁體中文打擊樂入門網站，支援手機、平板與電腦。

## 網站內容

- 首頁：單元入口與樂器中英文、縮寫對照表
- 演奏基本功：德式、法式、美式對稱握法
- 樂器介紹：同頁整理鼓與鈸類、琴類、小型與特殊打擊樂器
- 音樂賞析：管樂經典、行進曲、電影動畫遊戲與流行樂改編
- 管樂團知識：扇形樂團配置及樂器家族介紹

## 本機使用

需要 Node.js 22.13.0 以上版本。

```bash
npm install
npm run dev
```

正式建置與測試：

```bash
npm run build
npm test
```

本機預覽使用 vinext；GitHub Pages 使用下方的獨立靜態建置流程。原平台的內部部署設定不包含在公開儲存庫中。

## GitHub Pages

GitHub Pages 使用獨立的 Next.js 靜態輸出；本機預覽仍使用原本的 vinext。

```bash
npm ci
npm run test:pages
```

輸出在 `out/`。預設發布路徑為 `/percussion-learning-room`，可用 `PAGES_BASE_PATH` 與 `PAGES_ORIGIN` 調整。所有頁面導覽與本機圖片都會自動套用發布路徑。

在 GitHub 的 Settings → Pages → Build and deployment，將 Source 設成 **GitHub Actions**。`.github/workflows/deploy-pages.yml` 會在更新 `main` 後檢查並發布網站，也可在 Actions 手動執行。完成前次部署後才會更新公開版本；只在 VS Code 儲存不會自動發布，還需要將修改提交並推送至 GitHub。

預計網址： https://soymilkyway.github.io/percussion-learning-room/ 。是否已上線請以 GitHub Actions 結果與實際網址為準。

修改文字：首頁在 `app/page.tsx`，樂器資料在 `app/data/instruments.ts`，其他分頁在 `app/分頁名稱/page.tsx`。圖片請保留來源與授權紀錄 `public/images/IMAGE_SOURCES.json`；其中標示 `publicationPending` 的素材不能直接公開上傳。

煞車鼓目前僅顯示樂器名稱與影片連結。圖片來源清單僅包含已公開使用的素材；低音管照片的 GFDL 1.2 授權全文附於 `public/images/GFDL-1.2.txt`。
