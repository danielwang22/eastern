# 東森全球股份有限公司 - 企業官網

> 人體工學界最傑出的研發和製造服務螢幕支架供應商

## 📋 專案簡介

這是東森全球股份有限公司的企業官方網站，展示公司在人體工學螢幕支架領域的專業研發與製造能力。網站採用現代化的響應式設計，提供完整的產品資訊、公司介紹、新聞動態等功能。

## 🚀 技術架構

- **前端框架**: Vite + HTML/CSS/JavaScript
- **開發工具**: Vite 5.0
- **代碼格式化**: Prettier
- **包管理器**: pnpm
- **構建工具**: Rollup (透過 Vite)

## 📁 專案結構

```
eastern/
├── public/                 # 靜態資源目錄
│   ├── assets/
│   │   ├── icons/         # 圖標文件
│   │   └── images/        # 圖片資源
├── *.html                 # 各頁面 HTML 文件
├── package.json           # 專案配置文件
├── vite.config.js         # Vite 配置文件
└── README.md              # 專案說明文件
```

## 🌐 網站頁面

- **首頁** (`index.html`) - 公司主頁
- **產品頁面** (`products.html`) - 產品展示
- **產品詳情** (`product-detail.html`) - 單一產品詳細資訊
- **收藏系列** (`collections.html`) - 產品系列展示
- **電子型錄** (`e-catalog.html`) - 數位型錄
- **新聞中心** (`news.html`) - 公司新聞
- **新聞詳情** (`news-detail.html`) - 新聞內容詳情
- **工作機會** (`job+reference.html`) - 招聘資訊
- **聯絡我們** (`contact.html`) - 聯絡方式
- **常見問題** (`FAQ.html`) - 常見問題解答

## 🛠️ 開發環境設置

### 前置需求

- Node.js (建議版本 16+)
- pnpm

### 安裝步驟

1. **克隆專案**
   ```bash
   git clone <repository-url>
   cd eastern
   ```

2. **安裝依賴**
   ```bash
   pnpm install
   ```

3. **啟動開發服務器**
   ```bash
   pnpm dev
   ```
   開發服務器將在 `http://localhost:5173` 啟動

## 📦 可用腳本

```bash
# 啟動開發服務器
pnpm dev

# 構建生產版本
pnpm build

# 預覽構建結果
pnpm preview

# 格式化代碼
pnpm prettier
```

## 🏗️ 構建部署

1. **構建專案**
   ```bash
   pnpm build
   ```

2. **構建輸出**
   - 構建文件將輸出到 `dist/` 目錄
   - 所有 HTML 頁面都會被正確處理和優化

3. **部署**
   - 將 `dist/` 目錄中的內容部署到您的網頁服務器

## 🎨 代碼風格

專案使用 Prettier 進行代碼格式化，配置文件為 `.prettierrc.cjs`。

執行格式化：
```bash
pnpm prettier
```

## 📝 開發注意事項

- 所有 HTML 文件都在根目錄下
- 靜態資源放置在 `public/` 目錄
- Vite 配置支援多頁面應用程式構建
- 響應式設計適配各種設備尺寸

## 🤝 貢獻指南

1. Fork 此專案
2. 創建您的功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

## 📞 聯絡資訊

**東森全球股份有限公司**
- 專業領域：人體工學螢幕支架研發製造
- 官方網站：[待更新]

## 📄 授權

此專案為東森全球股份有限公司所有，保留所有權利。

---

*最後更新：2025年8月*