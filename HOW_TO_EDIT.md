# 🛠️ HOW TO EDIT "AI WEB" ON YOUR OWN

You have **complete and unrestricted access** to edit this website. You can customize products, change prices in Pakistani Rupees (PKR), update store text, add new photos, and change design elements using either of two methods:

---

## 🚀 METHOD 1: The In-Browser Visual Studio (Easiest — No Coding Required)

A built-in **Atelier Studio Customizer** is installed right on the website:

1. Double-click [`index.html`](file:///c:/Users/OFFICE/Desktop/ai%20web/index.html) to open the store in your browser.
2. Look at the **bottom-left corner** of your screen and click the glowing gold button:  
   👉 **`⚙️ Edit Store (Studio)`**  
   *(or click "⚙️ Open Atelier Customizer Studio" in the footer)*
3. A luxury control panel will open with 3 tabs:

### Tab 1: Store Texts & Banners
- **Store Brand Name**: Change from *"AI WEB"* to any brand name you want.
- **Top Announcement Bar**: Update promotional messages or contact numbers.
- **Hero Headline & Subtitle**: Customize the main headline and welcoming story.
- **Free Shipping Threshold**: Set the minimum amount in PKR (default: `140000`).
- Click **"Save Changes Live"** and the website updates instantly!

### Tab 2: Product Catalog & PKR Rates
- See all 12 luxury creations with their current prices in **Pakistani Rupees (PKR)** and stock counts.
- **Edit any product**: Click **"Edit"** next to any item to change its title, price in PKR, strikethrough price, stock, description, or image URL. Click **"Save Changes Live"**.
- **Add new products**: Click **"➕ Add New Creation"**, enter the product name, category (Bags, Perfumes, Accessories), price in PKR, stock, and image link. Click **"Publish Creation to Catalog"** and it will appear on your homepage immediately!
- **Delete products**: Click **"Delete"** to remove any item.
- **Reset to Factory Defaults**: Click **"Reset Defaults"** anytime if you want to restore the original catalog.

### Tab 3: Export to `products.js` Code
- All changes made in the studio automatically save to your browser's persistent storage.
- If you also want to permanently save them to your project files, click **"Copy Code to Clipboard"**, open `c:\Users\OFFICE\Desktop\ai web\js\products.js`, and paste the code!

---

## 💻 METHOD 2: Direct File Editing (For Complete Code Control)

All files are located on your computer at:  
📁 **`c:\Users\OFFICE\Desktop\ai web`**

You can edit them using **VS Code**, **Sublime Text**, **Notepad++**, or standard **Notepad**.

### 1. How to Edit Products in Code
Open: [`js/products.js`](file:///c:/Users/OFFICE/Desktop/ai%20web/js/products.js)

Each product is a clean JavaScript object:
```javascript
{
  id: "bag-01",
  name: "The Sovereign Croc-Embossed Grand Tote",
  category: "bags",                         // "bags", "perfumes", or "accessories"
  categoryLabel: "Bags & Leather",
  tag: "Atelier Signature",                // Badge on card
  price: 950000,                            // Price in PKR (Rs. 950,000)
  originalPrice: 1050000,                  // Strikethrough price in PKR
  stock: 4,                                 // Number of items in stock
  images: {
    primary: "https://your-image-url.com/photo.jpg",
    secondary: "https://your-image-url.com/photo-angle-2.jpg",
    angles: [ ... ]
  },
  shortDesc: "Your short description here...",
  specs: { ... }
}
```
- Change `price: 950000` to whatever PKR rate you want.
- Change `name` to rename the product.
- Change `stock` to update inventory.
- Replace image URLs with your own photos or Unsplash links.

### 2. How to Edit Currency & Shipping Rules
Open: [`js/store.js`](file:///c:/Users/OFFICE/Desktop/ai%20web/js/store.js)

- **Default Currency**: PKR is already configured as primary (`this.currentCurrency = "PKR"`).
- **Free Shipping Threshold**:
  ```javascript
  const FREE_SHIPPING_THRESHOLD_PKR = 140000; // Rs. 140,000
  const STANDARD_SHIPPING_PKR = 2500;         // Rs. 2,500
  ```
- **Promo Discount Codes**:
  Look for `VALID_PROMOS` around line 28 to add or change coupon codes:
  ```javascript
  LUXE20: { code: "LUXE20", type: "percent", value: 20 },
  VIP50:  { code: "VIP50", type: "flat", value: 15000 }
  ```

### 3. How to Edit Page Layout & Headers
Open: [`index.html`](file:///c:/Users/OFFICE/Desktop/ai%20web/index.html)

- **Top Announcement Bar**: Lines 48–54
- **Logo & Navigation Links**: Lines 60–120
- **Hero Section**: Lines 160–215
- **Brand Highlights**: Lines 220–270
- **Pakistani Cities in Checkout**: Search for `checkout-city` (Lines 440–455) to add more cities!
- **Footer Links & Salon Cities**: Lines 650–740

### 4. How to Edit Colors & Luxury Styling
Open: [`css/luxury-custom.css`](file:///c:/Users/OFFICE/Desktop/ai%20web/css/luxury-custom.css)

- Gold theme color accents:
  ```css
  --gold-primary: #D4AF37;
  --gold-light: #F3E5AB;
  --gold-hover: #C5A028;
  ```
- Fonts: Cormorant Garamond, Cinzel, and Plus Jakarta Sans.

---

## 🔄 How to Preview Changes

Whenever you edit any file:
1. Save the file (`Ctrl + S`).
2. Refresh your browser (`F5` or `Ctrl + R`).
3. Your updates appear immediately!
