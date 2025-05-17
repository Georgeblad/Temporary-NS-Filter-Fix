
# 🔧 NetSuite Report Filter Fix (Temporary Patch)

**⚠️ Temporary workaround for NetSuite's broken filter dropdowns in GL reports and other native reports**

---

## 📌 Problem

After a recent NetSuite update (May 2025), many users encountered a UI bug where filter dropdowns on native reports—such as GL or transaction reports—**stopped working**.

Clicking the filter shows no dropdown, or the popup is hidden behind the report container. This bug appears to be caused by `overflow: hidden` and `z-index` conflicts introduced in the latest UI changes.

---

## ✅ What this extension does

This extension dynamically detects the filter popup element (`crit_*_popup`) and walks up the DOM tree to **remove style constraints** (like `overflow: hidden`, `clip`, etc.) from its ancestor containers. It also brings the popup to the front using `z-index`.

This allows the filter dropdown to display normally and become interactive again—**without modifying any NetSuite data** or backend logic.

---

## 🖥️ How to use it

### Option 1: Chrome Extension

1. Clone or download this repo
2. Open `chrome://extensions` in Chrome or Brave
3. Enable **Developer mode**
4. Click **Load unpacked**
5. Select the folder containing this extension

Once installed, the extension **automatically runs** on any NetSuite report page and prints a confirmation in the browser console:

```txt
✅ ancestor clipping cleared <div id="crit_...">
```

No clicks, no configuration—just install and open your report.

---

## ⚠️ Disclaimer

> This is a temporary frontend workaround. It **does not modify NetSuite data** and only affects browser rendering at runtime.
> Use at your own discretion. Always consult with your administrator or technical team before applying third-party scripts.

---

## 💡 How it works

The core fix is this:

```js
const pop = document.querySelector('div[id^="crit_"][id$="_popup"]');
for (let p = pop?.parentElement; p; p = p.parentElement) {
  ['overflow', 'clip', 'clipPath', 'maxHeight'].forEach(prop => p.style[prop] = 'visible');
}
Object.assign(pop.style, { zIndex: 2147483647, overflow: 'visible' });
```

---

## 🧪 Tested on

* ✅ Chrome
* ✅ Brave
* ✅ Edge (Chromium-based)

---

## 🔗 Links

* [LinkedIn write-up & context](#) (https://www.linkedin.com/pulse/how-i-solved-critical-netsuite-bug-before-oracle-didand-jorge-mu%25C3%25B1oz-3rzde)

---

## 👨‍💻 Author

Built by [Jorge Muñoz](https://www.linkedin.com/in/jorge-mu%C3%B1oz-431513229/) — NetSuite consultant and full-stack developer.

If this saved your team, feel free to ⭐ the repo or connect on LinkedIn!
