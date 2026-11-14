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
- `assets/images/`：本專案自行繪製的 SVG 示意插畫，非實物照片；六張展品插畫的檔名對應展品 ID，`hero-cabinet.svg` 為首頁奇趣收藏櫃主視覺。
- `AGENTS.md`：專案開發、設計與查證規範。

詳細視窗支援 Tab 導覽、Escape 關閉、關閉按鈕、點擊背景關閉，關閉後回復原觸發按鈕焦點。請使用支援原生 `<dialog>` 的現代瀏覽器。

字型依序指定 Noto Serif TC、Noto Sans TC 與系統備援字型；未下載或內嵌字型，未安裝 Noto 時會採用備援。

## 六件館藏與來源

目前共有六件展品；下表的 ID、題目、來源名稱與網址均依 `data/facts.json` 實際內容列出。六件展品目前皆為 `verified: true`。

| ID | 題目 | 查證來源 |
| --- | --- | --- |
| animal-001 | 章魚為什麼有三顆心臟？ | [英國自然史博物館｜Octopuses keep surprising us](https://www.nhm.ac.uk/discover/octopuses-keep-surprising-us-here-are-eight-examples-how.html) |
| science-001 | 夕陽為什麼會變成紅色？ | [NASA Space Place｜Why Is the Sky Blue?](https://spaceplace.nasa.gov/blue-sky/en/) |
| history-001 | 羅塞塔石碑為何刻了三種文字？ | [大英博物館｜Hieroglyphs 展覽指南（PDF）](https://www.britishmuseum.org/sites/default/files/2022-10/Hieroglyphs_unlocking_ancient_Egypt_large_print_guide_The_British_Museum.pdf) |
| everyday-001 | 為什麼在冰裡加鹽會更冷？ | [美國化學學會｜Why does salt make ice colder?（PDF）](https://www.acs.org/content/dam/acsorg/msc/downloads/chapter-2/lesson-4/ch2-l4-teacher-background.pdf) |
| animal-002 | 為什麼火鶴是粉紅色的？ | [史密森尼國家動物園｜Why Are Flamingos Pink? And Other Flamingo Facts](https://nationalzoo.si.edu/animals/news/why-are-flamingos-pink-and-other-flamingo-facts) |
| science-002 | 金星的一天真的比一年還長嗎？ | [NASA Space Place｜All About Venus](https://spaceplace.nasa.gov/all-about-venus/en/) |

`verified: true` 表示已對照上述資料，不代表來源永遠不變；後續修改內容必須重新查證。不確定的內容使用 `verified: false`，網站不顯示該筆資料。

來源連線紀錄：先前檢查中，其餘五件展品的官方來源皆可讀取。大英博物館展覽指南的搜尋索引可讀取相關原文，但直接讀取其網站回傳 HTTP 403；一般瀏覽器能否開啟仍待確認，不能將此項列為連線驗收通過。

## 新增展品

依 AGENTS.md 流程確認題目不重複、查閱可靠來源、分配分類與三位數 ID，在 `data/facts.json` 新增完整資料，再將同名圖片存入 `assets/images/`。無須修改頁面或卡片模板。維持既有四種分類，不任意變更 Schema。所有本地資源使用相對路徑，適用 GitHub Pages 專案子目錄。

## AI Agent 擴充測試

網站由最初四件展品擴充為六件，新增 `animal-002`（為什麼火鶴是粉紅色的？）與 `science-002`（金星的一天真的比一年還長嗎？）。擴充前先檢查既有題目，查閱官方來源後才將兩筆新資料標記為已驗證；金星展品也區分自轉一圈的恆星日與兩次日出之間的太陽日，避免誤導。

AGENTS.md 為這次擴充提供以下規範：

| 規範 | 擴充時的實際做法 |
| --- | --- |
| 資料 Schema | 沿用全部 12 個欄位：`id`、`category`、`title`、`hook`、`answer`、`explanation`、`funFact`、`image`、`sourceName`、`sourceUrl`、`verified`，未增加或重新命名欄位。 |
| 展區分類 | 分別使用既有 `animals` 與 `science`，未新增或改名展區。 |
| 命名 | 檢查 ID 不重複，以分類前綴搭配三位數編號，分配 `animal-002` 與 `science-002`。 |
| 圖片 | 自行繪製同名 SVG，存於 `assets/images/`，沿用指定配色、600×420 比例與簡潔復古線條。 |
| 共用元件 | 由既有 JavaScript 讀取 JSON，沿用同一卡片模板及共用詳細視窗；未改動 HTML、CSS 或 JavaScript。 |

這次新增展品只修改 `data/facts.json` 並新增兩張插畫，無須重新建立 HTML 頁面。原四筆資料與圖片保留，新增展品自動參與分類、詳細內容與隨機探索。首頁收藏櫃主視覺則是後續獨立的視覺調整，不屬於新增展品所需的修改。

## 驗收事項

以 HTTP 伺服器確認首頁、四個分類、隨機展品、完整詳細內容、來源新分頁、圖片及資料載入失敗提示。以鍵盤確認焦點停留於開啟的視窗中、Escape 關閉後焦點返回。於手機、平板與桌面寬度檢查排版，並檢查瀏覽器 Console。

### 已執行並通過的測試

以下為本次文件更新前已實際執行的開發與發布前檢查紀錄；模擬 DOM 測試不代表已完成實際瀏覽器驗收。

- `node --check js/main.js` 語法檢查通過。
- 六筆 JSON 資料可解析，12 個欄位及型別完整，ID 唯一且符合分類前綴與三位數命名；六件展品均可讀取。
- 六張展品圖片與首頁主視覺皆存在，七張 SVG 格式檢查通過。
- HTML 頁內連結目標、資源相對路徑及檔名大小寫檢查通過。
- 模擬 GitHub Pages 的 `/curio-museum/` 子路徑，以本機 HTTP 伺服器確認首頁、CSS、JavaScript、JSON 與七張圖片，共 11 個網站資源皆回傳 HTTP 200，並從 HTTP 回應讀取六筆展品。
- Node.js 模擬 DOM 測試確認分類數量：全部六件、動物兩件、科學兩件、歷史一件、日常一件；六件展品的詳細內容、圖片及來源網址帶入、關閉與焦點返回均通過。
- 隨機探索可選到六件展品，包含新增兩件；未驗證資料會被排除。
- 模擬載入中切換分類，載入提示持續保留，成功後顯示所選分類。
- 模擬網路錯誤、HTTP 404、JSON 解析失敗及非陣列資料後切換分類，錯誤提示均持續保留；成功載入但分類無展品時會顯示空狀態，切回有展品分類後正常呈現。

### 尚待確認

- 實際瀏覽器的首頁與插畫呈現、手機／平板／桌面排版及 Console 錯誤檢查。
- 原生 `<dialog>` 的 Tab、Shift+Tab 焦點限制、Escape 關閉、背景點擊關閉與焦點返回，以及來源連結的新分頁操作。
- 大英博物館 PDF 在一般瀏覽器中的可用性。
- GitHub Pages 部署後的公開網址、資源載入與完整互動驗收；本機子路徑測試不能取代部署後測試。

## GitHub 與部署狀態

原始碼已推送至 [GitHub Repository：weird19/curio-museum](https://github.com/weird19/curio-museum) 的 `main` 分支。此次 README 更新前，本機工作目錄乾淨，`main` 與 `origin/main` 同步；本次文件變更尚未 commit 或 push。

2026-11-14 查詢 GitHub Repository API，結果為 `has_pages: false`；預期的 Pages 入口與 Pages API 均回傳 HTTP 404。GitHub Pages 尚未部署，目前沒有已確認可使用的網站公開網址，因此不列出網站連結。
