# Curio Museum｜奇趣冷知識博物館

以「復古博物館 × 趣味插畫」呈現冷知識的繁體中文靜態網站。使用 HTML5、CSS3、原生 JavaScript 與 JSON，不需建置、不需 API Key 或額外套件。

## 本機瀏覽

在專案根目錄執行：

```sh
python -m http.server 8000
```

開啟 http://localhost:8000 。請勿直接使用 `file://` 開啟，瀏覽器可能阻擋 JSON 載入。結束時於終端機按 Ctrl+C。

## 檔案與功能

- `index.html`：首頁、導覽、展區按鈕與共用原生 dialog。
- `css/style.css`：指定六色 CSS 變數、紙張底紋、復古標籤與響應式排版；桌面三欄、平板兩欄、手機一欄。
- `js/main.js`：載入及基本驗證 JSON、過濾未查證展品、產生卡片、分類、隨機探索與詳細視窗。
- `data/facts.json`：展品唯一主要資料來源，保留 AGENTS.md 的全部欄位。
- `assets/images/`：本專案自行繪製的 SVG 示意插畫，非實物照片；檔名對應展品 ID。
- `AGENTS.md`：專案開發、設計與查證規範。

詳細視窗支援 Tab 導覽、Escape 關閉、關閉按鈕、點擊背景關閉，關閉後回復原觸發按鈕焦點。請使用支援原生 `<dialog>` 的現代瀏覽器。

字型依序指定 Noto Serif TC、Noto Sans TC 與系統備援字型；未下載或內嵌字型，未安裝 Noto 時會採用備援。

## 首批展品與來源

2026-11-14 查閱官方來源後建立：

| ID | 題目 | 查證來源 |
| --- | --- | --- |
| animal-001 | 章魚的三顆心臟 | [英國自然史博物館](https://www.nhm.ac.uk/discover/octopuses-keep-surprising-us-here-are-eight-examples-how.html) |
| science-001 | 夕陽為何偏紅 | [NASA Space Place](https://spaceplace.nasa.gov/blue-sky/en/) |
| history-001 | 羅塞塔石碑的三種文字 | [大英博物館展覽指南，PDF，第 42–43 頁](https://www.britishmuseum.org/sites/default/files/2022-10/Hieroglyphs_unlocking_ancient_Egypt_large_print_guide_The_British_Museum.pdf) |
| everyday-001 | 冰裡加鹽與降溫 | [美國化學學會教學資料，PDF，第 1 頁](https://www.acs.org/content/dam/acsorg/msc/downloads/chapter-2/lesson-4/ch2-l4-teacher-background.pdf) |

`verified: true` 表示已對照上述資料，不代表來源永遠不變；後續修改內容必須重新查證。不確定的內容使用 `verified: false`，網站不顯示該筆資料。

來源連線限制：大英博物館展覽指南的搜尋索引可讀取相關原文，但本次直接讀取其網站回傳 HTTP 403；一般瀏覽器能否開啟仍待確認。

## 新增展品

依 AGENTS.md 流程確認題目不重複、查閱可靠來源、分配分類與三位數 ID，在 `data/facts.json` 新增完整資料，再將同名圖片存入 `assets/images/`。無須修改頁面或卡片模板。維持既有四種分類，不任意變更 Schema。所有本地資源使用相對路徑，適用 GitHub Pages 專案子目錄。

## 驗收事項

以 HTTP 伺服器確認首頁、四個分類、隨機展品、完整詳細內容、來源新分頁、圖片及資料載入失敗提示。以鍵盤確認焦點停留於開啟的視窗中、Escape 關閉後焦點返回。於手機、平板與桌面寬度檢查排版，並檢查瀏覽器 Console。

本階段未發布至 GitHub Pages；公開網址與部署後子路徑仍須於日後部署時驗證。

第一版已通過 JavaScript 語法檢查、JSON 欄位／ID／本地圖片與 SVG 格式檢查，以及八個本地資源的 HTTP 200 檢查。以模擬 DOM 檢查四展區篩選、排除未查證資料、詳細內容、關閉後焦點返回及隨機探索；此檢查不能取代實際瀏覽器的視覺、原生 dialog 與鍵盤驗收。
