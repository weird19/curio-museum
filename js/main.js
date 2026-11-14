"use strict";

const categories = { animals: "動物奇聞館", science: "科學腦洞館", history: "歷史怪事館", everyday: "日常為什麼館" };
const grid = document.querySelector("#exhibit-grid");
const statusText = document.querySelector("#collection-status");
const dialog = document.querySelector("#exhibit-dialog");
const randomButton = document.querySelector("#random-exhibit");
let exhibits = [];
let activeCategory = "all";
let previousFocus = null;
let collectionState = "loading";

function updateCollectionStatus(visibleCount = 0) {
  const messages = {
    loading: "正在整理展品，請稍候……",
    success: `館藏目錄 ／ ${visibleCount} 件已查證展品`,
    error: "展品暫時無法載入。請確認已使用本機 HTTP 伺服器開啟網站，再重新整理。",
    empty: "這個展區正在準備新展品，歡迎先逛逛其他展區。"
  };
  statusText.textContent = messages[collectionState];
  grid.setAttribute("aria-busy", String(collectionState === "loading"));
  randomButton.disabled = collectionState === "loading" || collectionState === "error" || exhibits.length === 0;
}

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
}

function renderExhibits() {
  // Category changes must preserve loading and error states.
  if (collectionState === "loading" || collectionState === "error") {
    updateCollectionStatus();
    return;
  }
  const visibleExhibits = exhibits.filter(exhibit => activeCategory === "all" || exhibit.category === activeCategory);
  collectionState = visibleExhibits.length ? "success" : "empty";
  grid.replaceChildren();
  visibleExhibits.forEach(exhibit => {
    const card = createElement("article", "exhibit-card");
    const button = createElement("button", "card-button");
    button.type = "button";
    button.setAttribute("aria-haspopup", "dialog");
    button.setAttribute("aria-label", `查看展品：${exhibit.title}`);
    const image = createElement("img", "card-image");
    image.src = exhibit.image;
    image.alt = `${exhibit.title} 主題插畫`;
    image.width = 600;
    image.height = 420;
    image.loading = "lazy";
    const copy = createElement("div", "card-copy");
    const meta = createElement("div", "card-meta");
    meta.append(createElement("span", "", `NO. ${exhibit.id.toUpperCase()}`), createElement("span", "category-tag", categories[exhibit.category]));
    copy.append(meta, createElement("h3", "", exhibit.title), createElement("p", "card-hook", exhibit.hook), createElement("span", "card-link", "揭開這個小祕密 ↗"));
    button.append(image, copy);
    button.addEventListener("click", () => openExhibit(exhibit));
    card.append(button);
    grid.append(card);
  });
  updateCollectionStatus(visibleExhibits.length);
}

function openExhibit(exhibit) {
  previousFocus = document.activeElement;
  document.querySelector("#detail-number").textContent = `NO. ${exhibit.id.toUpperCase()}`;
  document.querySelector("#detail-category").textContent = categories[exhibit.category];
  ["title", "answer", "explanation"].forEach(field => { document.querySelector(`#detail-${field}`).textContent = exhibit[field]; });
  document.querySelector("#detail-fun-fact").textContent = exhibit.funFact;
  const image = document.querySelector("#detail-image");
  image.src = exhibit.image;
  image.alt = `${exhibit.title} 主題插畫`;
  const source = document.querySelector("#detail-source");
  source.href = exhibit.sourceUrl;
  source.textContent = `${exhibit.sourceName} ↗`;
  dialog.showModal();
  dialog.scrollTop = 0;
  document.querySelector("#close-dialog").focus();
}

document.querySelector("#close-dialog").addEventListener("click", () => dialog.close());
dialog.addEventListener("close", () => { if (previousFocus?.isConnected) previousFocus.focus(); });
dialog.addEventListener("click", event => {
  const rect = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
});
// Native modal dialogs contain keyboard focus and support Escape to close.
document.querySelectorAll("[data-category]").forEach(button => {
  button.addEventListener("click", () => {
    activeCategory = button.dataset.category;
    document.querySelectorAll("[data-category]").forEach(filter => filter.setAttribute("aria-pressed", String(filter === button)));
    renderExhibits();
  });
});
randomButton.addEventListener("click", () => { if (exhibits.length) openExhibit(exhibits[Math.floor(Math.random() * exhibits.length)]); });

async function loadExhibits() {
  collectionState = "loading";
  exhibits = [];
  grid.replaceChildren();
  updateCollectionStatus();
  try {
    const response = await fetch("data/facts.json");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    if (!Array.isArray(data)) throw new Error("展品資料必須為陣列");
    const ids = new Set();
    const prefixes = { animals: "animal", science: "science", history: "history", everyday: "everyday" };
    const fields = ["id", "category", "title", "hook", "answer", "explanation", "funFact", "image", "sourceName", "sourceUrl"];
    exhibits = data.filter(exhibit => {
      if (!exhibit || exhibit.verified !== true) return false;
      const valid = fields.every(field => typeof exhibit[field] === "string" && exhibit[field].trim())
        && Object.hasOwn(categories, exhibit.category)
        && new RegExp(`^${prefixes[exhibit.category]}-\\d{3}$`).test(exhibit.id)
        && !ids.has(exhibit.id) && /^https?:\/\//.test(exhibit.sourceUrl)
        && /^assets\/images\/[a-z0-9-]+\.(svg|webp|png|jpg|jpeg)$/.test(exhibit.image);
      if (!valid) { console.warn("略過格式不完整的展品", exhibit.id); return false; }
      ids.add(exhibit.id);
      return true;
    });
    collectionState = "success";
    renderExhibits();
  } catch (error) {
    collectionState = "error";
    updateCollectionStatus();
    console.error("展品載入失敗", error);
  }
}
loadExhibits();
