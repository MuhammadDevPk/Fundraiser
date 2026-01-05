# 🎓 Education Fundraiser Website

A modern, responsive single-page fundraising website built with vanilla HTML, CSS, and JavaScript. Created to raise funds for a BSc in Artificial Intelligence in the UK.

## 🚀 Quick Start

Simply open `index.html` in your browser — no build process or server required!

```bash
# Option 1: Open directly
open index.html

# Option 2: Use a local server (optional)
npx serve .
```

## 📁 Project Structure

```
FundRaiser/
├── index.html    # Main HTML file with all content
├── styles.css    # Complete styling (dark theme, responsive)
├── script.js     # Interactive functionality
└── README.md     # This file
```

## ✅ Features

- **Responsive Design** — Mobile-first, works on all devices
- **Dark Theme** — Modern, professional look
- **Progress Bar** — Animated donation tracker
- **Copy Wallet** — One-click crypto address copy with toast notification
- **FAQ Accordion** — Expandable Q&A section
- **Smooth Scroll** — Navigation links scroll smoothly
- **Scroll Animations** — Elements fade in as you scroll

## ⚙️ Configuration

### Update Donation Progress

Edit `script.js` (lines 20-21):

```javascript
const goalUSD = 20000; // Your goal
let raisedUSD = 0; // Current raised amount
```

### Update Wallet Address

1. In `script.js` (line 27):

```javascript
const walletAddress = "0xYOUR_ACTUAL_ADDRESS";
```

2. In `index.html` (search for `wallet-address`):

```html
<code id="wallet-address">0xYOUR_ACTUAL_ADDRESS</code>
```

### Update Contact Information

Search and replace these placeholders in `index.html`:

| Placeholder                   | Replace With      |
| ----------------------------- | ----------------- |
| `youremail@example.com`       | Your email        |
| `linkedin.com/in/yourprofile` | Your LinkedIn URL |
| `github.com/yourusername`     | Your GitHub URL   |
| `YourUsername#0000`           | Your Discord tag  |

## 🎨 Customization

### Colors

Edit CSS variables in `styles.css` (`:root` section):

```css
--accent-primary: #3b82f6; /* Main accent color */
--accent-secondary: #06b6d4; /* Secondary accent */
--bg-primary: #0a0f1c; /* Background */
```

### Fonts

The site uses [Inter](https://fonts.google.com/specimen/Inter) from Google Fonts. To change:

1. Update the `<link>` tag in `index.html`
2. Update `--font-family` in `styles.css`

## 🌐 Deployment

This is a static site — deploy anywhere:

- **GitHub Pages** — Free, just push to a `gh-pages` branch
- **Netlify** — Drag and drop the folder
- **Vercel** — Connect your repo
- **Any web host** — Upload the 3 files

## 📝 License

This project is open source. Feel free to use and modify for your own fundraising needs.

---

Built with 💙 and determination
