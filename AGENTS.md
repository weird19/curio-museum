# AGENTS.md — Curio Museum

## 1. Project Overview

### Project Name
Curio Museum｜奇趣冷知識博物館

### Purpose
本專案是一個可持續擴充的互動式冷知識展示網站，透過復古博物館與趣味插畫風格，讓使用者探索生活、動物、科學與歷史中的有趣知識。

網站將每一則冷知識視為一件博物館展品（Exhibit）。

### Main Goals
1. 建立一致且具有特色的網站視覺風格。
2. 使用統一的資料結構管理展品。
3. 讓 AI 能依照既有規則快速新增展品。
4. 新增內容時，不需要重新修改網站版型。
5. 確保展品內容具備正確性與可信來源。

---

## 2. Technology Stack

使用以下技術：

- HTML5
- CSS3
- Vanilla JavaScript
- JSON
- GitHub Pages

開發限制：

- 不使用後端伺服器。
- 不使用資料庫。
- 不使用需要 API Key 的第三方服務。
- 不額外引入大型前端框架。
- 優先使用原生 JavaScript。
- 所有資源需適用於 GitHub Pages 靜態網站環境。

---

## 3. Project Structure

```text
curio-museum/
├── AGENTS.md
├── README.md
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── data/
│   └── facts.json
└── assets/
    └── images/
```

### Responsibilities

- `index.html`：網站結構及語意化 HTML。
- `css/style.css`：整體視覺、共用元件、響應式排版。
- `js/main.js`：資料讀取、展品渲染、分類與互動。
- `data/facts.json`：展品資料的唯一主要來源。
- `assets/images/`：所有展品圖片。
- `AGENTS.md`：AI 開發規範。
- `README.md`：提供使用者閱讀的專案說明。

禁止將新增展品的完整內容直接寫死於 HTML。

---

## 4. Visual Design Guidelines

### Design Style
Retro Museum × Playful Illustration

視覺關鍵字：

- 復古
- 自然史博物館
- 趣味插畫
- 紙張質感
- 展品標籤
- 精緻但活潑

### Color Palette

- Primary Background: `#F5EEDC`
- Primary Green: `#284B3F`
- Accent Terracotta: `#C76B4A`
- Accent Yellow: `#E4BB66`
- Soft Green: `#D7E1D2`
- Body Text: `#352C28`

所有色彩應定義在 CSS `:root` 變數中。

不可隨意新增不符合風格的顏色。

### Typography
- 中文標題：Noto Serif TC，備援使用 serif。
- 中文內文：Noto Sans TC，備援使用 sans-serif。
- 英文裝飾性標題：Georgia 或 serif。
- 網站主要語言為繁體中文。

### Layout
- 內容最大寬度：1120px。
- 桌面版展品列表：3 欄。
- 平板版展品列表：2 欄。
- 手機版展品列表：1 欄。
- 卡片間距需一致。
- 保持清楚的文字層級與適當留白。
- 避免過度動畫。

### Component Consistency
- 所有展品使用相同卡片模板。
- 同類型標籤使用相同配色及尺寸。
- 卡片圖片維持一致的比例。
- 展品詳細視窗使用共用元件。
- 新增內容不得破壞原有版型。

---

## 5. Exhibit Categories

目前定義四個主要展區：

| Key | 展區名稱 |
|---|---|
| animals | 動物奇聞館 |
| science | 科學腦洞館 |
| history | 歷史怪事館 |
| everyday | 日常為什麼館 |

未經使用者明確要求，不得任意新增或重新命名展區。

---

## 6. Exhibit Data Schema

所有展品存放於 `data/facts.json`，以 JSON Array 管理。

每筆資料必須具備以下欄位：

| Field | Type | Description |
|---|---|---|
| id | string | 展品唯一識別碼 |
| category | string | 展區分類 Key |
| title | string | 疑問句形式的展品標題 |
| hook | string | 引發好奇的短句 |
| answer | string | 精簡答案 |
| explanation | string | 主要知識說明 |
| funFact | string | 延伸趣聞 |
| image | string | 本地圖片路徑 |
| sourceName | string | 可靠來源名稱 |
| sourceUrl | string | 可直接查閱的來源網址 |
| verified | boolean | 是否已完成內容查證 |

### Data Rules

1. `id` 必須唯一。
2. `id` 格式為 `{category-prefix}-{number}`。
3. category prefix：
   - animals → `animal`
   - science → `science`
   - history → `history`
   - everyday → `everyday`
4. number 使用三位數，例如 `animal-001`。
5. `category` 只能使用現有四種 Key。
6. 標題使用繁體中文，以有趣且清楚的疑問句為主。
7. `hook` 建議不超過 35 個中文字。
8. `answer` 建議不超過 80 個中文字。
9. `explanation` 建議約 100～200 個中文字。
10. `funFact` 不得加入未經證實的傳聞。
11. `sourceUrl` 必須指向實際支持內容的來源頁面。
12. 正式公開的展品必須設定 `verified: true`。
13. 不可刪除既有欄位或任意更改欄位名稱。
14. 必須保持 JSON 格式合法。

---

## 7. Content Quality & Fact-Checking

由於本網站提供知識內容，正確性是必要條件。

### Source Priority
優先採用：

1. 政府、研究機構及大學的官方網站。
2. 博物館、科學機構與專業組織。
3. 學術文獻及可靠的教育資料。
4. 具有明確編輯審核程序的專業出版物。

### Verification Rules
- 不得捏造事實、統計數據或文獻。
- 不得編造來源網址。
- 不得將尚有爭議的說法當作確定事實。
- 必須確認來源與展品內容確實相關。
- 若無法驗證，保持 `verified: false`。
- 未驗證的內容不得出現在正式展品列表。
- 圖片必須自行製作、取得適當授權，或使用允許使用的素材。
- 來源必須能透過網站詳細視窗查看。

### Writing Style
- 使用繁體中文。
- 語氣有趣、清楚、容易理解。
- 避免過度誇張與誤導性的標題。
- 優先解釋「為什麼」。
- 避免內容過度冗長。
- 不使用未經解釋的專業術語。

---

## 8. UI & Interaction Rules

網站至少需支援：

1. 首頁導覽。
2. 四個展區分類。
3. 動態產生展品卡片。
4. 點擊卡片查看展品詳細內容。
5. 查看知識來源連結。
6. 響應式版面。

### Exhibit Card
每張卡片必須顯示：
- 展品圖片
- 展品編號
- 所屬展區
- 展品標題
- 簡短引導文字

### Exhibit Detail
詳細視窗必須提供：
- 展品標題
- 問題與答案
- 詳細說明
- 延伸趣聞
- 資料來源連結
- 明確的關閉方式

互動視窗應支援鍵盤操作、Escape 關閉及基本焦點管理。

### Additional Interaction
可以使用隨機展品探索功能，但不可影響主要瀏覽流程。

---

## 9. Naming Conventions

### Files
- 使用英文小寫。
- 使用 kebab-case。
- 不使用空格與中文檔名。

### Images
- 使用與展品 ID 相同的檔名。
- 例如：`animal-001.webp`
- 存放於 `assets/images/`。

### JavaScript
- 變數及函式使用 camelCase。
- 函式命名必須能表達用途。
- 避免重複建立相同功能。

### CSS
- 使用語意清楚的 class。
- 相關元件應共享樣式。
- 優先修改 CSS 變數，不要重複使用硬編碼色碼。

---

## 10. Procedure for Adding a New Exhibit

當使用者要求新增冷知識時，AI 必須依序：

1. 閱讀 `AGENTS.md`。
2. 檢查 `data/facts.json` 的既有展品。
3. 確認新題目沒有與既有展品重複。
4. 選擇合適的既有展區。
5. 搜尋並確認可靠資料來源；如無法查證則不得標記為已驗證。
6. 根據 Schema 建立完整展品資料。
7. 分配不重複的展品 ID。
8. 建立或加入有使用權的展品圖片。
9. 將資料加入 `facts.json`。
10. 確認展品使用既有卡片模板正確呈現。
11. 確認分類篩選與詳細視窗正常。
12. 確認所有既有展品仍可正常瀏覽。
13. 回報新增的展品 ID、修改檔案、驗證結果。

### Important Restrictions
新增普通展品時：

- 不得重新設計首頁。
- 不得任意改變整體配色。
- 不得重寫共用卡片元件。
- 不得刪除既有展品。
- 不得新增額外套件。
- 若需變更 Schema，必須先說明原因並取得使用者同意。

---

## 11. Development Workflow

進行開發或修改前：

1. 先理解既有架構。
2. 優先重複使用既有程式碼。
3. 僅修改完成當前任務所需的檔案。
4. 保持程式碼簡潔且容易維護。
5. 不加入未要求的複雜功能。
6. 不使用絕對根路徑引用本地檔案，以確保 GitHub Pages 專案子路徑可正常載入。

---

## 12. Local Development & Testing

從專案根目錄啟動：

```bash
python -m http.server 8000
```

然後瀏覽：

`http://localhost:8000`

不要依賴直接開啟 `file://` 網址來測試 JSON 載入。

### Testing Checklist

- [ ] 網站首頁正常顯示
- [ ] JSON 資料可以正常讀取
- [ ] 所有已驗證展品正常顯示
- [ ] 展品 ID 沒有重複
- [ ] 所有展品欄位完整
- [ ] 分類篩選正常
- [ ] 詳細視窗正常開啟及關閉
- [ ] 來源連結可使用
- [ ] 圖片載入正常
- [ ] 手機版排版正常
- [ ] 沒有重大 JavaScript Console 錯誤
- [ ] GitHub Pages 公開網址正常運作

---

## 13. Definition of Done

只有當以下條件成立時，才算完成一個新增展品任務：

1. 展品內容經過查證。
2. 符合統一資料格式。
3. 圖片與來源有效。
4. 網站顯示正常。
5. 既有功能未遭破壞。
6. AI 已回報修改內容及檢查結果。

本專案的核心原則是：

**新增一件展品，應該只需要新增資料與圖片，不需要重新開發網站頁面。**