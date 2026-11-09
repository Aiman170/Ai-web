# AI WEB — Haute Maison & Luxury Atelier E-Commerce Web Application

A modern, responsive, full-featured luxury e-commerce web application created for **"ai web"** — an artisanal European luxury maison specializing in handcrafted leather bags, rare botanical *haute parfumerie*, and fine horological timepieces.

Built with a modular front-end architecture using **Tailwind CSS**, bespoke luxury styling, and reactive **`localStorage` persistence** for all state.

---

## 🌟 Key Features & Implementation Matrix

### 1. Sticky Luxury Header
- **Brand Identity**: Refined serif & display typography (`AI WEB | HAUTE MAISON`) with Paris • Milan • New York • Tokyo monograms.
- **Predictive Live Search**: Instant autocomplete dropdown with highlighted matches and keyboard shortcut `⌘K` / `Ctrl+K`.
- **Category Navigation**: Seamless filtering between *All Collections*, *Bags & Leather*, *Haute Parfumerie*, and *Fine Accessories*.
- **Live Multi-Currency Conversion**: Instant currency switching across **USD ($)**, **EUR (€)**, **GBP (£)**, **JPY (¥)**, and **AED (AED)** with live recalculations across all cards, PDPs, cart, and checkout.
- **Animated Shopping Bag Badge**: Live item count indicator with bounce animation whenever a creation is added.
- **Private Wishlist Counter**: Heart count badge that persists across user sessions.
- **Dark & Light Luxury Themes**: Toggle between *Opulent Dark Mode* (deep obsidian & gold accents) and *Editorial Light Mode* (warm alabaster & bronze gold).

### 2. High-Impact Hero & Brand Pillars
- **Hero Banner**: Atmospheric editorial campaign photography with radial gold glow, "The 2026 Sovereign Edition" pulsating badge, and dual CTA buttons (*Shop The Collection* and *Haute Parfumerie*).
- **Brand Value Bar**:
  - ⚜️ 100% Certified European Atelier with numbered authenticity dossier
  - ✈️ Complimentary White-Glove Worldwide Delivery on orders over $500
  - 🎁 Signature Presentation with silk ribbon and wax seal
  - 🛡️ 256-Bit Vault Secure Checkout

### 3. Featured Products Grid & Interactive Filtering
- **Hover Image Crossfade**: Smooth transition to a secondary angle when hovering over product cards.
- **Product Badges**: Custom luxury tags (*Atelier Signature*, *Bestseller*, *Limited Edition*, *Masterpiece*).
- **Quick View Modal**: Instant modal preview with multi-angle thumbnail navigation, color swatches, size selection, and quantity stepper without leaving the catalog.
- **Price Range Slider**: Live budget filtering from $400 to $10,000+.
- **Sorting Options**: Sort by *Featured Curations*, *Price: Low to High*, *Price: High to Low*, *Client Rating*, and *Most Reviewed*.
- **Client Star Ratings**: Detailed fractional star ratings with verified review counts.

### 4. Interactive Product Detail Page (PDP)
- **Deep-Linked URL Routing**: Direct navigation support via `#product-{id}` (e.g. `#product-bag-01`).
- **Multi-Angle Gallery**: High-resolution thumbnails updating the primary viewport with cursor hover zoom.
- **Variant Selectors**:
  - Color swatches with live shade label updates.
  - Size / Volume variants with dynamic price adjustments.
- **Stock Reservation Indicator**: Atelier reserve count (e.g. *"In Stock: Only 3 pieces remaining in atelier"*).
- **Interactive Tabs**:
  1. *Craftsmanship & Heritage*: Artisanal backstory and fabrication process.
  2. *Olfactory Pyramid / Specifications*: Top, Heart, and Base notes for perfumes; dimensions, hallmarks, and materials for bags & jewelry.
  3. *White-Glove Delivery*: Policy and courier details.
  4. *Client Reviews*: Real reviews with verified collector badges and ratings.
- **"You May Also Admire"**: Curated related pairings from the same atelier category.

### 5. Slide-Over Dedicated Cart Drawer
- **Smooth Drawer Animation**: Off-canvas slide-in from the right with backdrop blur.
- **Free Shipping Progress Tracker**: Visual progress bar calculating remaining amount to qualify for complimentary global shipping ($500 threshold).
- **Line Item Controls**: Quantity adjustments (`-` and `+`), instant item removal, and variant specifications display.
- **Invitation & Promo Code Engine**:
  - `LUXE20`: 20% off entire order
  - `ROYAL10`: 10% off entire order
  - `VIP50`: $50 off order
- **Dynamic Breakdown**: Subtotal, Applied Privilège Discount, White-Glove Shipping, Luxury Tax (8%), and Total.

### 6. Streamlined Multi-Step Checkout
- **Step 1: Recipient & Delivery Residence**: Full name, email, phone, street address, suite, city, postal code, and country with validation.
- **Step 2: Delivery Tier Selector**:
  - Standard White-Glove (3–5 days, Complimentary over $500)
  - Priority Air Courier (1–2 days, +$45)
  - Armored Sovereign Vault Delivery (24 hours, +$120)
- **Step 3: Vault Payment Methods**:
  - **Interactive 3D Virtual Credit Card**: As the user types their card number, holder name, and expiry date, the virtual card renders the details in real time with automated brand detection (**Visa**, **Mastercard**, **Amex**)!
  - **Cash on Delivery (COD)**: White-glove in-person courier settlement with physical guarantee dossier.
  - **Private Bank Wire / Apple Pay**: Direct wire routing details.
- **Sticky Order Summary Sidebar**: Live review of selected items, calculations, and active currency total.

### 7. Order Confirmation & Print Invoice
- **Royal Communique Screen**: Animated gold checkmark badge and unique order reference (e.g. `#AIW-89421-LUX`).
- **Order Details**: Estimated delivery date, customer address, chosen payment method, and dispatch notice.
- **Itemized Invoice Table**: Complete list of acquired items with quantities, variants, and unit prices.
- **Print / PDF Capability**: Dedicated `@media print` stylesheet for clean luxury invoice printing.

---

## 📁 File Structure

```
ai web/
├── index.html                 # Main Single Page Luxury Application
├── css/
│   └── luxury-custom.css      # Luxury gold gradients, 3D credit card, custom scrollbar, animations
├── js/
│   ├── products.js            # Curated catalog (12 products: Bags, Perfumes, Accessories)
│   ├── store.js               # Reactive State Management (localStorage, Cart, Wishlist, Currency, Theme)
│   ├── checkout.js            # Multi-step checkout controller, card formatter, invoice generator
│   ├── ui.js                  # DOM renderer, toasts, drawers, modals, quick view, filter engine
│   └── app.js                 # App initialization, search autocomplete, keyboard shortcuts, hash routing
└── README.md                  # Complete documentation and user guide
```

---

## 🚀 How to Launch and Run

Because this application is built with modern modular JavaScript and Tailwind CSS CDN, **no Node.js, npm install, or compilation server is required**!

1. Open File Explorer to:
   `c:\Users\OFFICE\Desktop\ai web`
2. **Double-click `index.html`** to open it directly in Google Chrome, Microsoft Edge, Mozilla Firefox, or Apple Safari.
3. Everything works immediately right out of the box!

*(Optional: If you use VS Code, you can also right-click `index.html` and select "Open with Live Server".)*

---

## 🧪 Testing Checklist & Demo Codes

- **Promo Codes**:
  - Enter `LUXE20` in the Shopping Bag drawer to get **20% off**.
  - Enter `VIP50` to get **$50 off**.
  - Enter `ROYAL10` to get **10% off**.
- **Currencies**:
  - Switch the currency dropdown in the header to **EUR (€)**, **GBP (£)**, **JPY (¥)**, or **AED (AED)** to see live price conversion across the entire store.
- **Theme Switcher**:
  - Click the Moon/Sun icon in the header to alternate between **Opulent Dark** and **Editorial Light** modes.
- **Virtual Credit Card**:
  - Proceed to Checkout, enter shipping details, and type `4242 4242 4242 4242` in Step 3 to watch the virtual 3D card update with the **Visa** brand badge!
- **Deep-linking**:
  - Append `#product-perfume-01` to the URL to jump directly to *Ambre Impérial Extrait de Parfum*.
