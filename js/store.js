/**
 * AI WEB - Luxury Maison & E-Commerce Atelier
 * Centralized State Management with localStorage Persistence
 * Native Currency: Pakistani Rupees (PKR / Rs.)
 */

const STORAGE_KEYS = {
  CART: "ai_web_cart",
  WISHLIST: "ai_web_wishlist",
  CURRENCY: "ai_web_currency",
  THEME: "ai_web_theme",
  PROMO: "ai_web_promo",
  SAVED_SHIPPING: "ai_web_shipping_profile",
  LAST_ORDER: "ai_web_last_order",
  ORDER_HISTORY: "ai_web_order_history",
  CUSTOM_PRODUCTS: "ai_web_custom_products",
  STORE_CONFIG: "ai_web_store_config"
};

// Available Currencies with exchange rates (Native Base Currency: PKR)
const CURRENCIES = {
  PKR: { code: "PKR", symbol: "Rs. ", rate: 1.0, decimals: 0, prefix: true, name: "Pakistani Rupee" },
  USD: { code: "USD", symbol: "$", rate: 0.0036, decimals: 0, prefix: true, name: "US Dollar" },
  EUR: { code: "EUR", symbol: "€", rate: 0.0033, decimals: 0, prefix: false, name: "Euro" },
  GBP: { code: "GBP", symbol: "£", rate: 0.0028, decimals: 0, prefix: true, name: "British Pound" },
  AED: { code: "AED", symbol: "AED ", rate: 0.0132, decimals: 0, prefix: true, name: "UAE Dirham" }
};

// Valid promo discount rules
const VALID_PROMOS = {
  LUXE20: { code: "LUXE20", type: "percent", value: 20, description: "20% Sovereign Discount Applied" },
  ROYAL10: { code: "ROYAL10", type: "percent", value: 10, description: "10% Royal Privilège Applied" },
  VIP50: { code: "VIP50", type: "flat", value: 15000, description: "Rs. 15,000 Atelier Welcome Voucher Applied" }
};

// Minimum order amount in PKR to qualify for Complimentary White-Glove Global Shipping
const FREE_SHIPPING_THRESHOLD_PKR = 140000; // Rs. 140,000 (~$500)
const STANDARD_SHIPPING_PKR = 2500; // Rs. 2,500
const LUXURY_TAX_RATE = 0.05; // 5% luxury tax / duties

class Store {
  constructor() {
    this.cart = this.load(STORAGE_KEYS.CART, []);
    this.wishlist = this.load(STORAGE_KEYS.WISHLIST, []);
    // Default to PKR
    this.currentCurrency = this.load(STORAGE_KEYS.CURRENCY, "PKR");
    this.theme = this.load(STORAGE_KEYS.THEME, "dark");
    this.appliedPromo = this.load(STORAGE_KEYS.PROMO, null);
    this.listeners = [];

    // Ensure valid currency fallback
    if (!CURRENCIES[this.currentCurrency]) {
      this.currentCurrency = "PKR";
    }

    // Load custom store configuration if edited by user
    this.storeConfig = this.load(STORAGE_KEYS.STORE_CONFIG, {
      storeName: "AI WEB",
      tagline: "HAUTE MAISON & LUXURY ATELIER",
      announcement: "⚜️ Complimentary White-Glove Express Delivery across Pakistan on Orders over Rs. 140,000 • Code: LUXE20 for 20% Off",
      heroBadge: "The 2026 Sovereign Edition",
      heroHeadline: "Artisanal Perfection, Timeless Modernity.",
      heroSubtitle: "Explore meticulously handcrafted leather goods, rare botanical extraits de parfum, and certified high jewelry conceived in European and Pakistani ateliers.",
      freeShippingThreshold: FREE_SHIPPING_THRESHOLD_PKR
    });
  }

  // Generic localStorage reader with fallback
  load(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      console.warn("Storage load error:", e);
      return fallback;
    }
  }

  // Generic localStorage writer
  save(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn("Storage save error:", e);
    }
  }

  // Subscribe to state change events
  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  }

  notify(eventType, data) {
    this.listeners.forEach(cb => {
      try {
        cb(eventType, data);
      } catch (e) {
        console.error("Listener error:", e);
      }
    });
  }

  // ==========================================
  // PRODUCTS MANAGEMENT (User Editable)
  // ==========================================
  getProducts() {
    const custom = this.load(STORAGE_KEYS.CUSTOM_PRODUCTS, null);
    if (custom && Array.isArray(custom) && custom.length > 0) {
      return custom;
    }
    return LUXURY_PRODUCTS;
  }

  saveProducts(productsList) {
    this.save(STORAGE_KEYS.CUSTOM_PRODUCTS, productsList);
    this.notify("products_updated", productsList);
  }

  resetProductsToDefault() {
    localStorage.removeItem(STORAGE_KEYS.CUSTOM_PRODUCTS);
    this.notify("products_updated", LUXURY_PRODUCTS);
  }

  updateProduct(updatedProduct) {
    const list = this.getProducts().map(p => p.id === updatedProduct.id ? updatedProduct : p);
    this.saveProducts(list);
  }

  addProduct(newProduct) {
    const list = this.getProducts();
    list.unshift(newProduct);
    this.saveProducts(list);
  }

  deleteProduct(productId) {
    const list = this.getProducts().filter(p => p.id !== productId);
    this.saveProducts(list);
  }

  // ==========================================
  // STORE CONFIGURATION (User Editable)
  // ==========================================
  getStoreConfig() {
    return this.storeConfig;
  }

  updateStoreConfig(newConfig) {
    this.storeConfig = { ...this.storeConfig, ...newConfig };
    this.save(STORAGE_KEYS.STORE_CONFIG, this.storeConfig);
    this.notify("config_updated", this.storeConfig);
  }

  // ==========================================
  // CART OPERATIONS (Native PKR calculations)
  // ==========================================

  getCart() {
    return this.cart;
  }

  getCartCount() {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  getCartSubtotalPKR() {
    return this.cart.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
  }

  getPromoDiscountPKR(subtotal) {
    if (!this.appliedPromo) return 0;
    const promo = VALID_PROMOS[this.appliedPromo.code];
    if (!promo) return 0;

    if (promo.type === "percent") {
      return (subtotal * promo.value) / 100;
    } else if (promo.type === "flat") {
      return Math.min(subtotal, promo.value);
    }
    return 0;
  }

  getShippingCostPKR(subtotal) {
    const threshold = this.storeConfig.freeShippingThreshold || FREE_SHIPPING_THRESHOLD_PKR;
    if (subtotal >= threshold || subtotal === 0) {
      return 0;
    }
    return STANDARD_SHIPPING_PKR;
  }

  getTaxPKR(subtotalAfterDiscount) {
    return Math.round(subtotalAfterDiscount * LUXURY_TAX_RATE);
  }

  getCartTotals() {
    const subtotal = this.getCartSubtotalPKR();
    const discount = this.getPromoDiscountPKR(subtotal);
    const subtotalAfterDiscount = Math.max(0, subtotal - discount);
    const shipping = this.getShippingCostPKR(subtotal);
    const tax = this.getTaxPKR(subtotalAfterDiscount);
    const total = subtotalAfterDiscount + shipping + tax;

    const threshold = this.storeConfig.freeShippingThreshold || FREE_SHIPPING_THRESHOLD_PKR;
    const remainingForFreeShipping = Math.max(0, threshold - subtotal);
    const freeShippingProgress = Math.min(100, (subtotal / threshold) * 100);

    return {
      subtotal,
      discount,
      shipping,
      tax,
      total,
      remainingForFreeShipping,
      freeShippingProgress,
      appliedPromo: this.appliedPromo
    };
  }

  addToCart(product, options = {}) {
    const color = options.color || (product.colors && product.colors[0] ? product.colors[0].name : "Standard");
    const size = options.size || (product.sizes && product.sizes[0] ? product.sizes[0].name : "Standard");
    const quantity = Math.max(1, parseInt(options.quantity, 10) || 1);
    
    // Calculate modified price if size has price adjustment (in PKR)
    let sizeMod = 0;
    if (product.sizes) {
      const matchSize = product.sizes.find(s => s.name === size);
      if (matchSize && matchSize.priceMod) sizeMod = matchSize.priceMod;
    }
    const unitPrice = product.price + sizeMod;

    // Unique key per item + selected variants
    const itemKey = `${product.id}__${color}__${size}`;
    const existingIndex = this.cart.findIndex(item => item.itemKey === itemKey);

    if (existingIndex > -1) {
      this.cart[existingIndex].quantity += quantity;
    } else {
      this.cart.push({
        itemKey,
        id: product.id,
        name: product.name,
        category: product.category,
        image: product.images.primary,
        color,
        size,
        unitPrice,
        basePrice: product.price,
        quantity,
        sku: product.sku
      });
    }

    this.save(STORAGE_KEYS.CART, this.cart);
    this.notify("cart_updated", { cart: this.cart, addedProduct: product });
    return true;
  }

  updateQuantity(itemKey, newQuantity) {
    const index = this.cart.findIndex(i => i.itemKey === itemKey);
    if (index === -1) return;

    if (newQuantity <= 0) {
      this.removeFromCart(itemKey);
    } else {
      this.cart[index].quantity = newQuantity;
      this.save(STORAGE_KEYS.CART, this.cart);
      this.notify("cart_updated", { cart: this.cart });
    }
  }

  removeFromCart(itemKey) {
    const removedItem = this.cart.find(i => i.itemKey === itemKey);
    this.cart = this.cart.filter(item => item.itemKey !== itemKey);
    this.save(STORAGE_KEYS.CART, this.cart);
    this.notify("cart_updated", { cart: this.cart, removedItem });
  }

  clearCart() {
    this.cart = [];
    this.appliedPromo = null;
    this.save(STORAGE_KEYS.CART, this.cart);
    this.save(STORAGE_KEYS.PROMO, null);
    this.notify("cart_updated", { cart: this.cart });
  }

  // ==========================================
  // PROMO CODE SYSTEM
  // ==========================================

  applyPromo(codeString) {
    if (!codeString) return { success: false, message: "Please enter an invitation code." };
    const code = codeString.trim().toUpperCase();
    const promo = VALID_PROMOS[code];

    if (!promo) {
      return { success: false, message: "Invalid luxury invitation code." };
    }

    this.appliedPromo = promo;
    this.save(STORAGE_KEYS.PROMO, this.appliedPromo);
    this.notify("promo_applied", promo);
    return { success: true, message: promo.description, promo };
  }

  removePromo() {
    this.appliedPromo = null;
    this.save(STORAGE_KEYS.PROMO, null);
    this.notify("promo_removed", null);
  }

  // ==========================================
  // WISHLIST OPERATIONS
  // ==========================================

  getWishlist() {
    return this.wishlist;
  }

  isInWishlist(productId) {
    return this.wishlist.includes(productId);
  }

  toggleWishlist(productId) {
    const isPresent = this.isInWishlist(productId);
    if (isPresent) {
      this.wishlist = this.wishlist.filter(id => id !== productId);
    } else {
      this.wishlist.push(productId);
    }
    this.save(STORAGE_KEYS.WISHLIST, this.wishlist);
    this.notify("wishlist_updated", {
      wishlist: this.wishlist,
      productId,
      added: !isPresent
    });
    return !isPresent;
  }

  // ==========================================
  // CURRENCY & FORMATTING (Native PKR)
  // ==========================================

  getCurrency() {
    return CURRENCIES[this.currentCurrency] || CURRENCIES.PKR;
  }

  setCurrency(currencyCode) {
    if (CURRENCIES[currencyCode]) {
      this.currentCurrency = currencyCode;
      this.save(STORAGE_KEYS.CURRENCY, currencyCode);
      this.notify("currency_changed", this.getCurrency());
    }
  }

  formatPrice(pkrAmount) {
    const cur = this.getCurrency();
    const converted = pkrAmount * cur.rate;
    const rounded = Math.round(converted);
    const formatted = rounded.toLocaleString("en-PK");

    if (cur.prefix) {
      return `${cur.symbol}${formatted}`;
    } else {
      return `${formatted} ${cur.symbol}`;
    }
  }

  // ==========================================
  // THEME MANAGEMENT (Dark / Light)
  // ==========================================

  getTheme() {
    return this.theme;
  }

  setTheme(themeName) {
    this.theme = themeName === "light" ? "light" : "dark";
    this.save(STORAGE_KEYS.THEME, this.theme);
    this.applyThemeClass();
    this.notify("theme_changed", this.theme);
  }

  toggleTheme() {
    this.setTheme(this.theme === "dark" ? "light" : "dark");
  }

  applyThemeClass() {
    const root = document.documentElement;
    if (this.theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }

  // ==========================================
  // ORDERS & CHECKOUT PERSISTENCE
  // ==========================================

  saveShippingProfile(data) {
    this.save(STORAGE_KEYS.SAVED_SHIPPING, data);
  }

  getSavedShippingProfile() {
    return this.load(STORAGE_KEYS.SAVED_SHIPPING, null);
  }

  saveOrder(orderData) {
    this.save(STORAGE_KEYS.LAST_ORDER, orderData);
    const history = this.load(STORAGE_KEYS.ORDER_HISTORY, []);
    history.unshift(orderData);
    this.save(STORAGE_KEYS.ORDER_HISTORY, history);
  }

  getLastOrder() {
    return this.load(STORAGE_KEYS.LAST_ORDER, null);
  }
}

// Global Singleton Instance
window.store = new Store();
