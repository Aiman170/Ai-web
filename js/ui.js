/**
 * AI WEB - Luxury Maison & E-Commerce Atelier
 * UI Components, Modals, Drawers, Search & In-Browser Atelier Customizer
 * Native Currency: Pakistani Rupees (PKR / Rs.)
 */

const UI = {
  activeCategory: "all",
  activeSort: "featured",
  maxPriceFilter: 3000000, // Rs. 3,000,000 max price filter
  inStockOnly: false,
  searchQuery: "",
  activeQuickViewProduct: null,
  activeDetailProduct: null,

  init() {
    this.applyStoreConfig();
    this.renderProductsGrid();
    this.updateCartBadge();
    this.updateWishlistBadge();
    this.renderCartDrawer();
    this.renderCurrencyOptions();
    this.bindGlobalEvents();
  },

  // Apply customizable store configuration to the DOM
  applyStoreConfig() {
    const config = window.store.getStoreConfig();
    const announcementEl = document.getElementById("top-announcement-text");
    const brandNameEls = document.querySelectorAll(".store-brand-name");
    const heroBadgeEl = document.getElementById("hero-badge-text");
    const heroHeadlineEl = document.getElementById("hero-headline-text");
    const heroSubtitleEl = document.getElementById("hero-subtitle-text");

    if (announcementEl && config.announcement) announcementEl.textContent = config.announcement;
    if (heroBadgeEl && config.heroBadge) heroBadgeEl.textContent = config.heroBadge;
    if (heroHeadlineEl && config.heroHeadline) heroHeadlineEl.innerHTML = config.heroHeadline;
    if (heroSubtitleEl && config.heroSubtitle) heroSubtitleEl.textContent = config.heroSubtitle;
    brandNameEls.forEach(el => {
      if (config.storeName) el.textContent = config.storeName;
    });
  },

  // ==========================================
  // TOAST NOTIFICATION SYSTEM
  // ==========================================
  showToast(title, message = "", type = "gold") {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast-animate-in flex items-start gap-3 p-4 rounded-xl shadow-2xl border backdrop-blur-xl max-w-sm w-full pointer-events-auto transition-all ${
      type === "gold"
        ? "bg-stone-900/95 text-stone-100 border-[#D4AF37]/50 shadow-[0_10px_30px_rgba(212,175,55,0.2)]"
        : "bg-red-950/95 text-red-100 border-red-500/40"
    }`;

    const iconSvg = type === "gold"
      ? `<svg class="w-5 h-5 text-[#D4AF37] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>`
      : `<svg class="w-5 h-5 text-red-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>`;

    toast.innerHTML = `
      ${iconSvg}
      <div class="flex-1 min-w-0">
        <h4 class="text-sm font-semibold tracking-wide text-white">${title}</h4>
        ${message ? `<p class="text-xs text-stone-300 mt-0.5 leading-relaxed">${message}</p>` : ""}
      </div>
      <button class="text-stone-400 hover:text-white p-1" onclick="this.parentElement.remove()">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("opacity-0", "translate-y-2");
      setTimeout(() => toast.remove(), 400);
    }, 3800);
  },

  // ==========================================
  // PRODUCTS FILTER & GRID RENDERING
  // ==========================================
  getFilteredProducts() {
    const products = window.store.getProducts();

    return products.filter(product => {
      if (this.activeCategory !== "all" && product.category !== this.activeCategory) {
        return false;
      }
      if (product.price > this.maxPriceFilter) {
        return false;
      }
      if (this.inStockOnly && product.stock <= 0) {
        return false;
      }
      if (this.searchQuery.trim()) {
        const query = this.searchQuery.toLowerCase().trim();
        const matchTitle = (product.name || "").toLowerCase().includes(query);
        const matchCategory = (product.categoryLabel || "").toLowerCase().includes(query);
        const matchDesc = (product.shortDesc || "").toLowerCase().includes(query);
        const matchSku = (product.sku || "").toLowerCase().includes(query);
        if (!matchTitle && !matchCategory && !matchDesc && !matchSku) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (this.activeSort === "price-asc") return a.price - b.price;
      if (this.activeSort === "price-desc") return b.price - a.price;
      if (this.activeSort === "rating") return (b.rating || 5) - (a.rating || 5);
      if (this.activeSort === "reviews") return (b.reviewCount || 0) - (a.reviewCount || 0);
      return 0;
    });
  },

  renderProductsGrid() {
    const grid = document.getElementById("products-grid");
    const countEl = document.getElementById("products-count-badge");
    if (!grid) return;

    const products = this.getFilteredProducts();

    if (countEl) {
      countEl.textContent = `${products.length} Creation${products.length === 1 ? "" : "s"}`;
    }

    if (products.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full py-20 text-center">
          <div class="w-16 h-16 mx-auto mb-4 rounded-full border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </div>
          <h3 class="font-serif-luxury text-2xl text-stone-900 dark:text-stone-100">No creations match your refined criteria</h3>
          <p class="text-sm text-stone-500 dark:text-stone-400 mt-2 max-w-md mx-auto">Try loosening your search terms or expanding your price parameters.</p>
          <button onclick="UI.resetFilters()" class="mt-6 px-6 py-2.5 rounded-full border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black text-xs font-semibold tracking-wider uppercase transition-all">
            Reset All Filters
          </button>
        </div>
      `;
      return;
    }

    grid.innerHTML = products.map(product => this.createProductCardHtml(product)).join("");
  },

  createProductCardHtml(product) {
    const isWishlisted = window.store.isInWishlist(product.id);
    const formattedPrice = window.store.formatPrice(product.price);
    const originalFormatted = product.originalPrice ? window.store.formatPrice(product.originalPrice) : null;

    const fullStars = Math.floor(product.rating || 5);
    const starsHtml = Array.from({ length: 5 }, (_, i) => `
      <svg class="w-3.5 h-3.5 ${i < fullStars ? "text-[#D4AF37] fill-[#D4AF37]" : "text-stone-300 dark:text-stone-600 fill-transparent"}" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    `).join("");

    const colorsHtml = (product.colors || []).slice(0, 4).map(c => `
      <span class="w-2.5 h-2.5 rounded-full border border-black/20 dark:border-white/20 inline-block shadow-sm" style="background-color: ${c.hex};" title="${c.name}"></span>
    `).join("");

    return `
      <div class="product-card group relative flex flex-col rounded-2xl bg-stone-50/70 dark:bg-[#141416]/90 border border-stone-200/80 dark:border-stone-800/80 hover:border-[#D4AF37]/50 dark:hover:border-[#D4AF37]/60 transition-all duration-500 shadow-sm hover:shadow-2xl overflow-hidden">
        
        <!-- Image Container with Hover Angle Switch -->
        <div class="product-card-image-wrap aspect-[4/5] w-full bg-stone-100 dark:bg-stone-900/60 overflow-hidden relative cursor-pointer" onclick="UI.openProductDetail('${product.id}')">
          <img 
            src="${product.images.primary}" 
            alt="${product.name}" 
            loading="lazy"
            class="product-card-image-primary w-full h-full object-cover object-center"
          />
          <img 
            src="${product.images.secondary || product.images.primary}" 
            alt="${product.name} alternate angle" 
            loading="lazy"
            class="product-card-image-secondary w-full h-full object-cover object-center"
          />

          <!-- Luxury Tag Badge -->
          ${product.tag ? `
            <div class="absolute top-3.5 left-3.5 z-10">
              <span class="px-3 py-1 rounded-full text-[10px] font-semibold tracking-widest uppercase bg-stone-900/85 dark:bg-black/85 text-[#D4AF37] border border-[#D4AF37]/40 backdrop-blur-md shadow-md">
                ${product.tag}
              </span>
            </div>
          ` : ""}

          <!-- Wishlist Heart Button -->
          <button 
            type="button" 
            aria-label="Save to Wishlist"
            onclick="event.stopPropagation(); UI.handleWishlistToggle('${product.id}', this)"
            class="absolute top-3.5 right-3.5 z-10 w-9 h-9 rounded-full bg-white/90 dark:bg-stone-900/90 backdrop-blur-md border border-stone-200 dark:border-stone-700/80 flex items-center justify-center text-stone-700 dark:text-stone-200 hover:text-[#D4AF37] dark:hover:text-[#D4AF37] transition-transform active:scale-90 shadow-md"
          >
            <svg class="w-4 h-4 ${isWishlisted ? "text-red-500 fill-red-500" : "fill-none"}" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
          </button>

          <!-- Quick View Hover Overlay Button -->
          <div class="absolute inset-x-3 bottom-3 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <button 
              type="button"
              onclick="event.stopPropagation(); UI.openQuickView('${product.id}')"
              class="w-full py-2.5 px-4 rounded-xl bg-stone-900/90 dark:bg-white/95 text-white dark:text-stone-900 text-xs font-semibold tracking-wider uppercase backdrop-blur-md border border-white/20 shadow-xl hover:bg-[#D4AF37] hover:text-black dark:hover:bg-[#D4AF37] transition-all flex items-center justify-center gap-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
              Quick View
            </button>
          </div>
        </div>

        <!-- Product Information Content -->
        <div class="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between gap-2 mb-1.5">
              <span class="text-[11px] uppercase tracking-widest text-[#B88E28] dark:text-[#D4AF37] font-medium">
                ${product.categoryLabel || product.category}
              </span>
              <div class="flex items-center gap-1.5">
                ${colorsHtml}
              </div>
            </div>

            <h3 
              onclick="UI.openProductDetail('${product.id}')" 
              class="font-serif-luxury text-lg font-medium text-stone-900 dark:text-stone-100 group-hover:text-[#B88E28] dark:group-hover:text-[#D4AF37] transition-colors line-clamp-1 cursor-pointer"
            >
              ${product.name}
            </h3>

            <div class="flex items-center gap-1.5 mt-1.5">
              <div class="flex items-center gap-0.5">
                ${starsHtml}
              </div>
              <span class="text-[11px] text-stone-500 dark:text-stone-400 font-medium">(${product.reviewCount || 12})</span>
            </div>

            <p class="text-xs text-stone-600 dark:text-stone-400 mt-2 line-clamp-2 leading-relaxed">
              ${product.shortDesc}
            </p>
          </div>

          <!-- Bottom Price in PKR and Quick Add -->
          <div class="pt-4 mt-4 border-t border-stone-200/60 dark:border-stone-800/60 flex items-center justify-between gap-3">
            <div>
              <div class="flex items-baseline gap-2">
                <span class="text-base font-bold text-stone-900 dark:text-stone-50 font-sans tracking-tight">
                  ${formattedPrice}
                </span>
                ${originalFormatted ? `
                  <span class="text-xs text-stone-400 line-through">
                    ${originalFormatted}
                  </span>
                ` : ""}
              </div>
              <span class="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium tracking-wide">
                ${product.stock > 0 ? (product.stock <= 3 ? `Only ${product.stock} in atelier` : "White-Glove Delivery") : "Sold Out"}
              </span>
            </div>

            <button 
              type="button"
              onclick="UI.handleQuickAddToCart('${product.id}', this)"
              ${product.stock <= 0 ? "disabled" : ""}
              class="px-3.5 py-2 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 text-xs font-semibold hover:bg-[#D4AF37] dark:hover:bg-[#D4AF37] dark:hover:text-black transition-all flex items-center gap-1.5 shadow-sm active:scale-95 disabled:opacity-40"
              title="Add to Shopping Bag"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
              <span>Add</span>
            </button>
          </div>
        </div>

      </div>
    `;
  },

  handleQuickAddToCart(productId, btnEl) {
    const product = getProductById(productId);
    if (!product) return;

    window.store.addToCart(product, { quantity: 1 });
    this.triggerCartBounce();
    this.showToast("Added to Shopping Bag", `${product.name} has been added.`, "gold");

    if (btnEl) {
      const origHtml = btnEl.innerHTML;
      btnEl.innerHTML = `<svg class="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg> Added`;
      setTimeout(() => {
        btnEl.innerHTML = origHtml;
      }, 1400);
    }
  },

  handleWishlistToggle(productId, btnEl) {
    const product = getProductById(productId);
    if (!product) return;

    const added = window.store.toggleWishlist(productId);
    if (added) {
      this.showToast("Saved to Private Wishlist", `${product.name} added to your wishlist.`);
    } else {
      this.showToast("Removed from Wishlist", `${product.name} removed.`);
    }

    if (btnEl) {
      btnEl.classList.add("animate-heart-pulse");
      setTimeout(() => btnEl.classList.remove("animate-heart-pulse"), 450);
      const svg = btnEl.querySelector("svg");
      if (svg) {
        if (added) {
          svg.classList.add("text-red-500", "fill-red-500");
          svg.classList.remove("fill-none");
        } else {
          svg.classList.remove("text-red-500", "fill-red-500");
          svg.classList.add("fill-none");
        }
      }
    }
    this.updateWishlistBadge();
  },

  triggerCartBounce() {
    const icon = document.getElementById("header-cart-icon");
    if (icon) {
      icon.classList.remove("animate-cart-bounce");
      void icon.offsetWidth;
      icon.classList.add("animate-cart-bounce");
    }
    this.updateCartBadge();
  },

  updateCartBadge() {
    const count = window.store.getCartCount();
    const badges = document.querySelectorAll(".cart-count-badge");
    badges.forEach(b => {
      b.textContent = count;
      if (count > 0) {
        b.classList.remove("hidden");
      } else {
        b.classList.add("hidden");
      }
    });
  },

  updateWishlistBadge() {
    const wishlist = window.store.getWishlist();
    const count = wishlist.length;
    const badges = document.querySelectorAll(".wishlist-count-badge");
    badges.forEach(b => {
      b.textContent = count;
      if (count > 0) {
        b.classList.remove("hidden");
      } else {
        b.classList.add("hidden");
      }
    });
  },

  // ==========================================
  // QUICK VIEW MODAL
  // ==========================================
  openQuickView(productId) {
    const product = getProductById(productId);
    if (!product) return;
    this.activeQuickViewProduct = product;

    const modal = document.getElementById("quick-view-modal");
    const content = document.getElementById("quick-view-content");
    if (!modal || !content) return;

    let selectedColor = product.colors && product.colors[0] ? product.colors[0].name : "Standard";
    let selectedSize = product.sizes && product.sizes[0] ? product.sizes[0].name : "Standard";
    let selectedQty = 1;
    let activeImage = product.images.primary;

    const renderModalContent = () => {
      let sizePriceMod = 0;
      if (product.sizes) {
        const sz = product.sizes.find(s => s.name === selectedSize);
        if (sz && sz.priceMod) sizePriceMod = sz.priceMod;
      }
      const currentPrice = product.price + sizePriceMod;
      const formattedPrice = window.store.formatPrice(currentPrice);

      content.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <div class="aspect-[4/5] rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 relative">
              <img id="qv-main-image" src="${activeImage}" alt="${product.name}" class="w-full h-full object-cover transition-opacity duration-300"/>
              ${product.tag ? `
                <span class="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-semibold tracking-widest uppercase bg-black/80 text-[#D4AF37] border border-[#D4AF37]/40">
                  ${product.tag}
                </span>
              ` : ""}
            </div>

            <div class="flex items-center gap-3 mt-4 overflow-x-auto pb-1">
              ${(product.images.angles || [product.images.primary, product.images.secondary]).map((imgUrl, idx) => `
                <button 
                  type="button" 
                  onclick="UI.setQuickViewImage('${imgUrl}', this)"
                  class="w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${imgUrl === activeImage ? "border-[#D4AF37] scale-105" : "border-transparent opacity-70 hover:opacity-100"}"
                >
                  <img src="${imgUrl}" alt="angle ${idx+1}" class="w-full h-full object-cover"/>
                </button>
              `).join("")}
            </div>
          </div>

          <div class="flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between gap-2">
                <span class="text-xs uppercase tracking-widest text-[#B88E28] dark:text-[#D4AF37] font-semibold">${product.categoryLabel || product.category}</span>
                <span class="text-xs text-stone-400 font-mono">SKU: ${product.sku}</span>
              </div>

              <h2 class="font-serif-luxury text-3xl font-medium text-stone-900 dark:text-stone-50 mt-1">${product.name}</h2>

              <div class="flex items-center gap-3 mt-3">
                <span class="text-2xl font-bold text-stone-900 dark:text-stone-100 font-sans tracking-tight">${formattedPrice}</span>
                <span class="px-2.5 py-0.5 rounded-full text-[11px] font-medium ${product.stock > 0 ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30" : "bg-red-500/10 text-red-500"}">
                  ${product.stock > 0 ? `In Atelier (${product.stock} remaining)` : "Sold Out"}
                </span>
              </div>

              <p class="text-sm text-stone-600 dark:text-stone-400 mt-4 leading-relaxed">${product.shortDesc}</p>

              ${product.colors && product.colors.length > 0 ? `
                <div class="mt-6">
                  <label class="block text-xs font-semibold tracking-wider uppercase text-stone-500 dark:text-stone-400 mb-2">
                    Shade / Leather: <span class="text-stone-900 dark:text-stone-100 normal-case font-medium" id="qv-color-label">${selectedColor}</span>
                  </label>
                  <div class="flex items-center gap-3">
                    ${product.colors.map(col => `
                      <button 
                        type="button"
                        onclick="UI.setQuickViewColor('${col.name}')"
                        class="w-8 h-8 rounded-full border-2 transition-transform ${col.name === selectedColor ? "border-[#D4AF37] scale-110 ring-2 ring-[#D4AF37]/30" : "border-stone-300 dark:border-stone-700 hover:scale-105"}"
                        style="background-color: ${col.hex}"
                        title="${col.name}"
                      ></button>
                    `).join("")}
                  </div>
                </div>
              ` : ""}

              ${product.sizes && product.sizes.length > 0 ? `
                <div class="mt-5">
                  <label class="block text-xs font-semibold tracking-wider uppercase text-stone-500 dark:text-stone-400 mb-2">
                    Size / Volume: <span class="text-stone-900 dark:text-stone-100 normal-case font-medium" id="qv-size-label">${selectedSize}</span>
                  </label>
                  <div class="flex flex-wrap gap-2">
                    ${product.sizes.map(s => `
                      <button 
                        type="button"
                        onclick="UI.setQuickViewSize('${s.name}')"
                        class="px-4 py-2 rounded-xl text-xs font-medium border transition-all ${s.name === selectedSize ? "bg-[#D4AF37] text-black border-[#D4AF37] shadow-md font-semibold" : "border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:border-[#D4AF37]"}"
                      >
                        ${s.name} ${s.priceMod ? `(+${window.store.formatPrice(s.priceMod)})` : ""}
                      </button>
                    `).join("")}
                  </div>
                </div>
              ` : ""}

              <div class="mt-6 flex items-center gap-4">
                <span class="text-xs font-semibold tracking-wider uppercase text-stone-500 dark:text-stone-400">Quantity</span>
                <div class="flex items-center border border-stone-300 dark:border-stone-700 rounded-xl overflow-hidden bg-stone-100/50 dark:bg-stone-800/50">
                  <button type="button" onclick="UI.changeQuickViewQty(-1)" class="w-9 h-9 flex items-center justify-center text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors">-</button>
                  <span id="qv-qty-display" class="w-10 text-center font-medium text-sm text-stone-900 dark:text-stone-100">${selectedQty}</span>
                  <button type="button" onclick="UI.changeQuickViewQty(1)" class="w-9 h-9 flex items-center justify-center text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors">+</button>
                </div>
              </div>
            </div>

            <div class="mt-8 pt-6 border-t border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row items-center gap-3">
              <button 
                type="button"
                onclick="UI.submitQuickViewCart()"
                class="w-full sm:flex-1 py-3.5 px-6 rounded-xl gold-gradient-bg font-semibold text-xs uppercase tracking-widest shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 btn-shimmer"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
                Add to Shopping Bag
              </button>

              <button 
                type="button"
                onclick="UI.openProductDetail('${product.id}'); UI.closeQuickView();"
                class="w-full sm:w-auto py-3.5 px-6 rounded-xl border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:border-[#D4AF37] hover:text-[#D4AF37] text-xs font-semibold uppercase tracking-widest transition-all"
              >
                Full Details
              </button>
            </div>
          </div>
        </div>
      `;
    };

    this._qvState = {
      product,
      get color() { return selectedColor; },
      set color(val) { selectedColor = val; renderModalContent(); },
      get size() { return selectedSize; },
      set size(val) { selectedSize = val; renderModalContent(); },
      get qty() { return selectedQty; },
      set qty(val) { selectedQty = Math.max(1, Math.min(product.stock, val)); renderModalContent(); },
      get image() { return activeImage; },
      set image(val) { activeImage = val; renderModalContent(); }
    };

    renderModalContent();
    modal.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
  },

  setQuickViewImage(imgUrl) {
    if (this._qvState) this._qvState.image = imgUrl;
  },

  setQuickViewColor(colorName) {
    if (this._qvState) this._qvState.color = colorName;
  },

  setQuickViewSize(sizeName) {
    if (this._qvState) this._qvState.size = sizeName;
  },

  changeQuickViewQty(delta) {
    if (this._qvState) this._qvState.qty += delta;
  },

  submitQuickViewCart() {
    if (!this._qvState) return;
    const { product, color, size, qty } = this._qvState;
    window.store.addToCart(product, { color, size, quantity: qty });
    this.triggerCartBounce();
    this.showToast("Added to Shopping Bag", `${qty}× ${product.name} (${color}, ${size}) added.`, "gold");
    this.closeQuickView();
  },

  closeQuickView() {
    const modal = document.getElementById("quick-view-modal");
    if (modal) modal.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
    this._qvState = null;
  },

  // ==========================================
  // DEDICATED PRODUCT DETAIL VIEW (PDP)
  // ==========================================
  openProductDetail(productId) {
    const product = getProductById(productId);
    if (!product) return;
    this.activeDetailProduct = product;

    const catalogView = document.getElementById("catalog-view");
    const pdpView = document.getElementById("product-detail-view");
    const checkoutView = document.getElementById("checkout-view");
    const confirmationView = document.getElementById("order-confirmation-view");

    if (catalogView) catalogView.classList.add("hidden");
    if (checkoutView) checkoutView.classList.add("hidden");
    if (confirmationView) confirmationView.classList.add("hidden");
    if (pdpView) pdpView.classList.remove("hidden");

    window.scrollTo({ top: 0, behavior: "smooth" });
    this.renderProductDetailPage(product);
    window.location.hash = `product-${product.id}`;
  },

  closeProductDetail() {
    const catalogView = document.getElementById("catalog-view");
    const pdpView = document.getElementById("product-detail-view");
    if (pdpView) pdpView.classList.add("hidden");
    if (catalogView) catalogView.classList.remove("hidden");
    window.location.hash = "";
    window.scrollTo({ top: 0, behavior: "smooth" });
  },

  renderProductDetailPage(product) {
    const container = document.getElementById("pdp-container");
    if (!container) return;

    let selectedColor = product.colors && product.colors[0] ? product.colors[0].name : "Standard";
    let selectedSize = product.sizes && product.sizes[0] ? product.sizes[0].name : "Standard";
    let selectedQty = 1;
    let activeImage = product.images.primary;
    let activeTab = "description";

    const isWishlisted = window.store.isInWishlist(product.id);

    const renderPDP = () => {
      let sizePriceMod = 0;
      if (product.sizes) {
        const sz = product.sizes.find(s => s.name === selectedSize);
        if (sz && sz.priceMod) sizePriceMod = sz.priceMod;
      }
      const currentPrice = product.price + sizePriceMod;
      const formattedPrice = window.store.formatPrice(currentPrice);
      const originalFormatted = product.originalPrice ? window.store.formatPrice(product.originalPrice + sizePriceMod) : null;

      const related = window.store.getProducts()
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 3);

      container.innerHTML = `
        <nav class="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mb-8 overflow-x-auto whitespace-nowrap">
          <a href="#" onclick="UI.closeProductDetail(); return false;" class="hover:text-[#D4AF37] transition-colors">Home</a>
          <span>/</span>
          <a href="#" onclick="UI.closeProductDetail(); UI.filterByCategory('${product.category}'); return false;" class="hover:text-[#D4AF37] transition-colors">${product.categoryLabel || product.category}</a>
          <span>/</span>
          <span class="text-stone-900 dark:text-stone-100 font-medium">${product.name}</span>
        </nav>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div class="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            <div class="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto shrink-0 md:w-20">
              ${(product.images.angles || [product.images.primary, product.images.secondary]).map((img, idx) => `
                <button 
                  type="button" 
                  onclick="UI.setPDPImage('${img}')"
                  class="w-16 h-20 md:w-20 md:h-24 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${img === activeImage ? "border-[#D4AF37] shadow-md scale-105" : "border-stone-200 dark:border-stone-800 opacity-60 hover:opacity-100"}"
                >
                  <img src="${img}" alt="Thumbnail ${idx+1}" class="w-full h-full object-cover"/>
                </button>
              `).join("")}
            </div>

            <div class="flex-1 relative aspect-[4/5] rounded-3xl overflow-hidden bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xl group cursor-crosshair" id="pdp-zoom-box">
              <img 
                id="pdp-main-image" 
                src="${activeImage}" 
                alt="${product.name}" 
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-125 origin-center"
              />
              ${product.tag ? `
                <span class="absolute top-6 left-6 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-black/85 text-[#D4AF37] border border-[#D4AF37]/40 backdrop-blur-md">
                  ${product.tag}
                </span>
              ` : ""}
            </div>
          </div>

          <div class="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between">
                <span class="text-xs uppercase tracking-widest text-[#B88E28] dark:text-[#D4AF37] font-semibold">${product.categoryLabel || product.category}</span>
                <span class="text-xs font-mono text-stone-400">SKU: ${product.sku}</span>
              </div>

              <h1 class="font-serif-luxury text-4xl sm:text-5xl font-medium text-stone-900 dark:text-stone-50 mt-2 leading-tight">
                ${product.name}
              </h1>

              <div class="flex items-center gap-3 mt-4">
                <div class="flex items-center gap-1">
                  ${Array.from({ length: 5 }, (_, i) => `
                    <svg class="w-4 h-4 ${i < Math.floor(product.rating || 5) ? "text-[#D4AF37] fill-[#D4AF37]" : "text-stone-300 dark:text-stone-600 fill-transparent"}" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  `).join("")}
                </div>
                <span class="text-sm font-semibold text-stone-800 dark:text-stone-200">${product.rating || 5}</span>
                <span class="text-xs text-stone-400">(${product.reviewCount || 12} client testimonials)</span>
              </div>

              <div class="flex items-baseline gap-4 mt-6">
                <span class="text-3xl font-bold text-stone-900 dark:text-stone-100 font-sans tracking-tight">${formattedPrice}</span>
                ${originalFormatted ? `<span class="text-base text-stone-400 line-through">${originalFormatted}</span>` : ""}
                <span class="text-xs px-3 py-1 rounded-full font-medium ${product.stock > 0 ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20" : "bg-red-500/10 text-red-500"}">
                  ${product.stock > 0 ? `In Stock (${product.stock} in atelier)` : "Exhausted"}
                </span>
              </div>

              <p class="text-sm text-stone-600 dark:text-stone-300 mt-5 leading-relaxed">
                ${product.fullDesc || product.shortDesc}
              </p>

              ${product.colors && product.colors.length > 0 ? `
                <div class="mt-8">
                  <div class="flex items-center justify-between mb-3">
                    <span class="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                      Selection: <span class="text-stone-900 dark:text-stone-100 font-medium normal-case">${selectedColor}</span>
                    </span>
                  </div>
                  <div class="flex items-center gap-3">
                    ${product.colors.map(c => `
                      <button 
                        type="button" 
                        onclick="UI.setPDPColor('${c.name}')"
                        class="w-9 h-9 rounded-full border-2 transition-transform ${c.name === selectedColor ? "border-[#D4AF37] scale-110 ring-2 ring-[#D4AF37]/40" : "border-stone-300 dark:border-stone-700 hover:scale-105"}"
                        style="background-color: ${c.hex}"
                        title="${c.name}"
                      ></button>
                    `).join("")}
                  </div>
                </div>
              ` : ""}

              ${product.sizes && product.sizes.length > 0 ? `
                <div class="mt-6">
                  <div class="flex items-center justify-between mb-3">
                    <span class="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                      Format / Dimension: <span class="text-stone-900 dark:text-stone-100 font-medium normal-case">${selectedSize}</span>
                    </span>
                  </div>
                  <div class="flex flex-wrap gap-2.5">
                    ${product.sizes.map(s => `
                      <button 
                        type="button" 
                        onclick="UI.setPDPSize('${s.name}')"
                        class="px-4 py-2.5 rounded-xl text-xs font-medium border transition-all ${s.name === selectedSize ? "bg-[#D4AF37] text-black border-[#D4AF37] shadow-lg font-semibold" : "border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:border-[#D4AF37]"}"
                      >
                        ${s.name} ${s.priceMod ? `(+${window.store.formatPrice(s.priceMod)})` : ""}
                      </button>
                    `).join("")}
                  </div>
                </div>
              ` : ""}

              <div class="mt-8 flex items-center gap-4">
                <span class="text-xs font-semibold tracking-wider uppercase text-stone-500 dark:text-stone-400">Pieces</span>
                <div class="flex items-center border border-stone-300 dark:border-stone-700 rounded-xl overflow-hidden bg-stone-100/60 dark:bg-stone-800/60">
                  <button type="button" onclick="UI.changePDPQty(-1)" class="w-10 h-10 flex items-center justify-center text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors">-</button>
                  <span class="w-12 text-center font-semibold text-sm text-stone-900 dark:text-stone-100">${selectedQty}</span>
                  <button type="button" onclick="UI.changePDPQty(1)" class="w-10 h-10 flex items-center justify-center text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors">+</button>
                </div>
              </div>

              <div class="mt-8 flex flex-col sm:flex-row items-center gap-3">
                <button 
                  type="button"
                  onclick="UI.submitPDPCart(false)"
                  class="w-full sm:flex-1 py-4 px-6 rounded-2xl gold-gradient-bg font-semibold text-xs uppercase tracking-widest shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 btn-shimmer"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
                  Add to Shopping Bag
                </button>

                <button 
                  type="button"
                  onclick="UI.submitPDPCart(true)"
                  class="w-full sm:w-auto py-4 px-6 rounded-2xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:bg-black dark:hover:bg-white text-xs font-semibold uppercase tracking-widest shadow-lg transition-all"
                >
                  Direct Checkout
                </button>

                <button 
                  type="button" 
                  onclick="UI.handleWishlistToggle('${product.id}', this)"
                  class="w-12 h-12 rounded-2xl border border-stone-300 dark:border-stone-700 flex items-center justify-center text-stone-700 dark:text-stone-300 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all shrink-0"
                  title="Save to Wishlist"
                >
                  <svg class="w-5 h-5 ${isWishlisted ? "text-red-500 fill-red-500" : "fill-none"}" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                  </svg>
                </button>
              </div>

              <div class="mt-8 pt-6 border-t border-stone-200/80 dark:border-stone-800/80 space-y-3">
                <div class="flex items-center gap-3 text-xs text-stone-600 dark:text-stone-400">
                  <svg class="w-4 h-4 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                  <span>Numbered Certificate of Authenticity and registered serial dossier.</span>
                </div>
                <div class="flex items-center gap-3 text-xs text-stone-600 dark:text-stone-400">
                  <svg class="w-4 h-4 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/></svg>
                  <span>Handcrafted wooden presentation case with wax seal.</span>
                </div>
                <div class="flex items-center gap-3 text-xs text-stone-600 dark:text-stone-400">
                  <svg class="w-4 h-4 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                  <span>Nationwide express delivery across Karachi, Lahore, Islamabad & all Pakistan.</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div class="mt-16 pt-12 border-t border-stone-200 dark:border-stone-800">
          <div class="flex border-b border-stone-200 dark:border-stone-800 gap-8 overflow-x-auto">
            <button 
              type="button"
              onclick="UI.setPDPTab('description')"
              class="pb-4 text-sm font-semibold tracking-wider uppercase transition-colors relative ${activeTab === "description" ? "text-[#D4AF37] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#D4AF37]" : "text-stone-500 hover:text-stone-900 dark:hover:text-stone-100"}"
            >
              Craftsmanship & Heritage
            </button>
            <button 
              type="button"
              onclick="UI.setPDPTab('specs')"
              class="pb-4 text-sm font-semibold tracking-wider uppercase transition-colors relative ${activeTab === "specs" ? "text-[#D4AF37] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#D4AF37]" : "text-stone-500 hover:text-stone-900 dark:hover:text-stone-100"}"
            >
              ${product.olfactory ? "Olfactory Pyramid" : "Technical Specifications"}
            </button>
            <button 
              type="button"
              onclick="UI.setPDPTab('shipping')"
              class="pb-4 text-sm font-semibold tracking-wider uppercase transition-colors relative ${activeTab === "shipping" ? "text-[#D4AF37] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#D4AF37]" : "text-stone-500 hover:text-stone-900 dark:hover:text-stone-100"}"
            >
              White-Glove Delivery
            </button>
            <button 
              type="button"
              onclick="UI.setPDPTab('reviews')"
              class="pb-4 text-sm font-semibold tracking-wider uppercase transition-colors relative ${activeTab === "reviews" ? "text-[#D4AF37] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#D4AF37]" : "text-stone-500 hover:text-stone-900 dark:hover:text-stone-100"}"
            >
              Client Reviews (${(product.reviews || []).length})
            </button>
          </div>

          <div class="py-8">
            ${activeTab === "description" ? `
              <div class="prose dark:prose-invert max-w-3xl">
                <p class="text-base text-stone-700 dark:text-stone-300 leading-relaxed font-serif-luxury text-xl italic mb-6">
                  "${product.shortDesc}"
                </p>
                <p class="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                  ${product.fullDesc || product.shortDesc}
                </p>
              </div>
            ` : ""}

            ${activeTab === "specs" ? `
              <div class="max-w-2xl">
                ${product.olfactory ? `
                  <div class="space-y-4 mb-8">
                    <h4 class="font-serif-luxury text-2xl text-stone-900 dark:text-stone-100">The Olfactory Architecture</h4>
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                      <div class="p-4 rounded-xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
                        <span class="text-xs uppercase font-semibold text-[#D4AF37] tracking-wider">Top Notes</span>
                        <p class="text-xs text-stone-700 dark:text-stone-300 mt-1">${product.olfactory.topNotes}</p>
                      </div>
                      <div class="p-4 rounded-xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
                        <span class="text-xs uppercase font-semibold text-[#D4AF37] tracking-wider">Heart Notes</span>
                        <p class="text-xs text-stone-700 dark:text-stone-300 mt-1">${product.olfactory.heartNotes}</p>
                      </div>
                      <div class="p-4 rounded-xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
                        <span class="text-xs uppercase font-semibold text-[#D4AF37] tracking-wider">Base Notes</span>
                        <p class="text-xs text-stone-700 dark:text-stone-300 mt-1">${product.olfactory.baseNotes}</p>
                      </div>
                    </div>
                  </div>
                ` : ""}

                <dl class="divide-y divide-stone-200 dark:divide-stone-800 text-sm">
                  ${Object.entries(product.specs || {}).map(([key, value]) => `
                    <div class="py-3 flex justify-between gap-4">
                      <dt class="font-medium text-stone-500 dark:text-stone-400">${key}</dt>
                      <dd class="text-stone-900 dark:text-stone-100 font-semibold text-right">${value}</dd>
                    </div>
                  `).join("")}
                </dl>
              </div>
            ` : ""}

            ${activeTab === "shipping" ? `
              <div class="max-w-2xl space-y-4 text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                <p>
                  Every order placed with <strong>AI WEB</strong> is prepared with extreme discretion within our European and local ateliers, accompanied by an authenticity certificate and wax-sealed packaging.
                </p>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div class="p-4 rounded-xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
                    <h5 class="font-semibold text-stone-900 dark:text-stone-100">Standard White-Glove (Pakistan)</h5>
                    <p class="text-xs text-stone-500 mt-1">3–5 business days. Complimentary on all orders above Rs. 140,000.</p>
                  </div>
                  <div class="p-4 rounded-xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
                    <h5 class="font-semibold text-stone-900 dark:text-stone-100">Armored Vault Air Courier</h5>
                    <p class="text-xs text-stone-500 mt-1">Guaranteed 24-hour delivery to Karachi, Lahore, and Islamabad with private courier sign-off.</p>
                  </div>
                </div>
              </div>
            ` : ""}

            ${activeTab === "reviews" ? `
              <div class="max-w-3xl space-y-6">
                ${(product.reviews || []).map(rev => `
                  <div class="p-6 rounded-2xl bg-stone-50 dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800">
                    <div class="flex items-center justify-between">
                      <div>
                        <div class="flex items-center gap-2">
                          <span class="font-semibold text-stone-900 dark:text-stone-100 text-sm">${rev.author}</span>
                          ${rev.verified ? `<span class="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#D4AF37]/20 text-[#D4AF37]">Verified Collector</span>` : ""}
                        </div>
                        <span class="text-xs text-stone-400">${rev.location} • ${rev.date}</span>
                      </div>
                      <div class="flex text-[#D4AF37]">
                        ${Array.from({ length: rev.rating || 5 }, () => `
                          <svg class="w-4 h-4 fill-[#D4AF37]" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                        `).join("")}
                      </div>
                    </div>
                    <h5 class="font-serif-luxury text-base font-semibold text-stone-900 dark:text-stone-100 mt-3">${rev.title}</h5>
                    <p class="text-xs text-stone-600 dark:text-stone-300 mt-1 leading-relaxed">${rev.content}</p>
                  </div>
                `).join("")}
              </div>
            ` : ""}
          </div>
        </div>

        ${related.length > 0 ? `
          <div class="mt-20 pt-16 border-t border-stone-200 dark:border-stone-800">
            <div class="text-center max-w-xl mx-auto mb-10">
              <span class="text-xs uppercase tracking-widest text-[#B88E28] dark:text-[#D4AF37] font-semibold">Curated Pairings</span>
              <h3 class="font-serif-luxury text-3xl font-medium text-stone-900 dark:text-stone-50 mt-1">You May Also Admire</h3>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              ${related.map(p => this.createProductCardHtml(p)).join("")}
            </div>
          </div>
        ` : ""}
      `;
    };

    this._pdpState = {
      product,
      get color() { return selectedColor; },
      set color(v) { selectedColor = v; renderPDP(); },
      get size() { return selectedSize; },
      set size(v) { selectedSize = v; renderPDP(); },
      get qty() { return selectedQty; },
      set qty(v) { selectedQty = Math.max(1, Math.min(product.stock, v)); renderPDP(); },
      get image() { return activeImage; },
      set image(v) { activeImage = v; renderPDP(); },
      get tab() { return activeTab; },
      set tab(v) { activeTab = v; renderPDP(); }
    };

    renderPDP();
  },

  setPDPImage(url) {
    if (this._pdpState) this._pdpState.image = url;
  },

  setPDPColor(c) {
    if (this._pdpState) this._pdpState.color = c;
  },

  setPDPSize(s) {
    if (this._pdpState) this._pdpState.size = s;
  },

  changePDPQty(delta) {
    if (this._pdpState) this._pdpState.qty += delta;
  },

  setPDPTab(tab) {
    if (this._pdpState) this._pdpState.tab = tab;
  },

  submitPDPCart(instantCheckout = false) {
    if (!this._pdpState) return;
    const { product, color, size, qty } = this._pdpState;
    window.store.addToCart(product, { color, size, quantity: qty });
    this.triggerCartBounce();
    this.showToast("Added to Shopping Bag", `${qty}× ${product.name} added.`, "gold");

    if (instantCheckout) {
      this.closeProductDetail();
      window.checkoutController.openCheckout();
    } else {
      this.openCartDrawer();
    }
  },

  // ==========================================
  // CART DRAWER (Native PKR)
  // ==========================================
  openCartDrawer() {
    const drawer = document.getElementById("cart-drawer");
    const panel = document.getElementById("cart-drawer-panel");
    const backdrop = document.getElementById("cart-drawer-backdrop");
    if (!drawer) return;

    this.renderCartDrawer();
    drawer.classList.remove("hidden");
    setTimeout(() => {
      if (backdrop) backdrop.classList.remove("opacity-0");
      if (panel) panel.classList.remove("translate-x-full");
    }, 10);
    document.body.classList.add("overflow-hidden");
  },

  closeCartDrawer() {
    const drawer = document.getElementById("cart-drawer");
    const panel = document.getElementById("cart-drawer-panel");
    const backdrop = document.getElementById("cart-drawer-backdrop");
    if (!drawer) return;

    if (panel) panel.classList.add("translate-x-full");
    if (backdrop) backdrop.classList.add("opacity-0");
    setTimeout(() => {
      drawer.classList.add("hidden");
      document.body.classList.remove("overflow-hidden");
    }, 350);
  },

  renderCartDrawer() {
    const itemsContainer = document.getElementById("cart-items-container");
    const totalsContainer = document.getElementById("cart-totals-container");
    const emptyState = document.getElementById("cart-empty-state");
    const freeShippingBar = document.getElementById("free-shipping-progress");
    const freeShippingText = document.getElementById("free-shipping-text");
    if (!itemsContainer || !totalsContainer) return;

    const cart = window.store.getCart();
    const totals = window.store.getCartTotals();

    if (freeShippingBar && freeShippingText) {
      freeShippingBar.style.width = `${totals.freeShippingProgress}%`;
      if (totals.remainingForFreeShipping <= 0) {
        freeShippingText.innerHTML = `⚜️ You have unlocked <strong>Complimentary White-Glove Shipping across Pakistan</strong>!`;
      } else {
        const remainingFormatted = window.store.formatPrice(totals.remainingForFreeShipping);
        freeShippingText.innerHTML = `Add <strong>${remainingFormatted}</strong> more to qualify for <strong>Complimentary White-Glove Shipping</strong>`;
      }
    }

    if (cart.length === 0) {
      if (emptyState) emptyState.classList.remove("hidden");
      itemsContainer.classList.add("hidden");
      totalsContainer.classList.add("hidden");
      return;
    }

    if (emptyState) emptyState.classList.add("hidden");
    itemsContainer.classList.remove("hidden");
    totalsContainer.classList.remove("hidden");

    itemsContainer.innerHTML = cart.map(item => {
      const lineTotal = item.unitPrice * item.quantity;
      return `
        <div class="flex gap-4 p-4 rounded-2xl bg-stone-100/60 dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800/80 relative group">
          <div class="w-20 h-24 rounded-xl overflow-hidden bg-stone-200 dark:bg-stone-800 shrink-0">
            <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover"/>
          </div>

          <div class="flex-1 flex flex-col justify-between min-w-0">
            <div>
              <div class="flex items-start justify-between gap-2">
                <h4 class="font-serif-luxury text-base font-semibold text-stone-900 dark:text-stone-100 truncate">${item.name}</h4>
                <button 
                  type="button" 
                  onclick="window.store.removeFromCart('${item.itemKey}')"
                  class="text-stone-400 hover:text-red-500 transition-colors p-1"
                  title="Remove item"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                </button>
              </div>
              <p class="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                ${item.color !== "Standard" ? `<span class="inline-block mr-2">${item.color}</span>` : ""}
                ${item.size !== "Standard" ? `<span>${item.size}</span>` : ""}
              </p>
            </div>

            <div class="flex items-center justify-between mt-3">
              <div class="flex items-center border border-stone-300 dark:border-stone-700 rounded-lg overflow-hidden bg-white dark:bg-stone-800">
                <button type="button" onclick="window.store.updateQuantity('${item.itemKey}', ${item.quantity - 1})" class="w-7 h-7 flex items-center justify-center text-xs text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700">-</button>
                <span class="w-8 text-center text-xs font-semibold text-stone-900 dark:text-stone-100">${item.quantity}</span>
                <button type="button" onclick="window.store.updateQuantity('${item.itemKey}', ${item.quantity + 1})" class="w-7 h-7 flex items-center justify-center text-xs text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700">+</button>
              </div>
              <span class="text-sm font-bold text-stone-900 dark:text-stone-100 font-sans">
                ${window.store.formatPrice(lineTotal)}
              </span>
            </div>
          </div>
        </div>
      `;
    }).join("");

    const appliedPromo = totals.appliedPromo;
    totalsContainer.innerHTML = `
      <div class="p-4 rounded-xl bg-stone-100 dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800 mb-4">
        ${appliedPromo ? `
          <div class="flex items-center justify-between text-xs">
            <div class="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <span>${appliedPromo.code} (${appliedPromo.description})</span>
            </div>
            <button type="button" onclick="window.store.removePromo()" class="text-stone-400 hover:text-red-500 text-xs underline">Remove</button>
          </div>
        ` : `
          <div class="flex gap-2">
            <input 
              type="text" 
              id="promo-input" 
              placeholder="Invitation / Promo Code" 
              class="flex-1 px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 uppercase tracking-wider focus:outline-none focus:border-[#D4AF37]"
            />
            <button 
              type="button" 
              onclick="UI.handleApplyPromo()"
              class="px-4 py-2 rounded-lg bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-semibold hover:bg-[#D4AF37] dark:hover:bg-[#D4AF37] transition-colors"
            >
              Apply
            </button>
          </div>
          <div class="flex items-center gap-2 mt-2 text-[10px] text-stone-400">
            <span>Try code:</span>
            <button type="button" onclick="UI.fillPromo('LUXE20')" class="font-mono underline hover:text-[#D4AF37]">LUXE20 (20% Off)</button>
            <span>•</span>
            <button type="button" onclick="UI.fillPromo('VIP50')" class="font-mono underline hover:text-[#D4AF37]">VIP50 (Rs. 15,000 Off)</button>
          </div>
        `}
      </div>

      <div class="space-y-2.5 text-xs text-stone-600 dark:text-stone-400 mb-6">
        <div class="flex justify-between">
          <span>Bag Subtotal</span>
          <span class="font-semibold text-stone-900 dark:text-stone-100">${window.store.formatPrice(totals.subtotal)}</span>
        </div>
        ${totals.discount > 0 ? `
          <div class="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
            <span>Privilège Discount</span>
            <span>-${window.store.formatPrice(totals.discount)}</span>
          </div>
        ` : ""}
        <div class="flex justify-between">
          <span>White-Glove Shipping</span>
          <span>${totals.shipping === 0 ? `<span class="text-emerald-600 dark:text-emerald-400 font-semibold uppercase tracking-wider">Complimentary</span>` : window.store.formatPrice(totals.shipping)}</span>
        </div>
        <div class="flex justify-between">
          <span>Luxury Duties & Packaging (5%)</span>
          <span class="font-semibold text-stone-900 dark:text-stone-100">${window.store.formatPrice(totals.tax)}</span>
        </div>
        <div class="pt-3 border-t border-stone-200 dark:border-stone-800 flex justify-between text-base font-semibold text-stone-900 dark:text-stone-50">
          <span>Estimated Total</span>
          <span class="font-sans text-xl font-bold text-[#B88E28] dark:text-[#D4AF37]">${window.store.formatPrice(totals.total)}</span>
        </div>
      </div>

      <button 
        type="button" 
        onclick="UI.closeCartDrawer(); window.checkoutController.openCheckout();"
        class="w-full py-4 px-6 rounded-2xl gold-gradient-bg font-semibold text-xs uppercase tracking-widest text-black shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 btn-shimmer"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
        Proceed to Secure Checkout
      </button>
    `;
  },

  handleApplyPromo() {
    const input = document.getElementById("promo-input");
    if (!input) return;
    const res = window.store.applyPromo(input.value);
    if (res.success) {
      this.showToast("Privilège Code Applied", res.message, "gold");
      this.renderCartDrawer();
    } else {
      this.showToast("Invalid Invitation Code", res.message, "error");
    }
  },

  fillPromo(code) {
    const input = document.getElementById("promo-input");
    if (input) {
      input.value = code;
      this.handleApplyPromo();
    }
  },

  // ==========================================
  // WISHLIST DRAWER / MODAL
  // ==========================================
  openWishlistModal() {
    const modal = document.getElementById("wishlist-modal");
    const container = document.getElementById("wishlist-items-container");
    if (!modal || !container) return;

    const wishlistIds = window.store.getWishlist();
    const items = wishlistIds.map(id => getProductById(id)).filter(Boolean);

    if (items.length === 0) {
      container.innerHTML = `
        <div class="py-16 text-center">
          <div class="w-14 h-14 mx-auto mb-3 rounded-full border border-stone-300 dark:border-stone-700 flex items-center justify-center text-stone-400">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
          </div>
          <h4 class="font-serif-luxury text-xl text-stone-900 dark:text-stone-100">Your Private Wishlist is Empty</h4>
          <p class="text-xs text-stone-500 mt-1 max-w-xs mx-auto">Explore the collections and select the heart icon to curate your personal archive.</p>
        </div>
      `;
    } else {
      container.innerHTML = items.map(product => `
        <div class="flex items-center gap-4 p-4 rounded-2xl bg-stone-100/60 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800">
          <div class="w-16 h-20 rounded-xl overflow-hidden bg-stone-200 dark:bg-stone-800 shrink-0 cursor-pointer" onclick="UI.openProductDetail('${product.id}'); UI.closeWishlistModal();">
            <img src="${product.images.primary}" alt="${product.name}" class="w-full h-full object-cover"/>
          </div>

          <div class="flex-1 min-w-0">
            <h4 class="font-serif-luxury text-base font-semibold text-stone-900 dark:text-stone-100 truncate cursor-pointer hover:text-[#D4AF37]" onclick="UI.openProductDetail('${product.id}'); UI.closeWishlistModal();">
              ${product.name}
            </h4>
            <span class="text-xs font-bold text-stone-900 dark:text-stone-100">${window.store.formatPrice(product.price)}</span>
            <div class="text-[11px] text-emerald-600 dark:text-emerald-400 mt-0.5">In Atelier Reserve</div>
          </div>

          <div class="flex items-center gap-2">
            <button 
              type="button" 
              onclick="UI.handleQuickAddToCart('${product.id}'); UI.closeWishlistModal();"
              class="px-3 py-2 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-semibold hover:bg-[#D4AF37] dark:hover:bg-[#D4AF37] transition-all"
            >
              Move to Bag
            </button>
            <button 
              type="button" 
              onclick="window.store.toggleWishlist('${product.id}'); UI.openWishlistModal(); UI.renderProductsGrid();"
              class="p-2 text-stone-400 hover:text-red-500 transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
        </div>
      `).join("");
    }

    modal.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
  },

  closeWishlistModal() {
    const modal = document.getElementById("wishlist-modal");
    if (modal) modal.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
  },

  // ==========================================
  // CURRENCY SELECTION
  // ==========================================
  renderCurrencyOptions() {
    const select = document.getElementById("currency-select");
    if (!select) return;

    select.innerHTML = Object.values(CURRENCIES).map(curr => `
      <option value="${curr.code}" ${curr.code === window.store.currentCurrency ? "selected" : ""}>
        ${curr.code} (${curr.symbol.trim()})
      </option>
    `).join("");
  },

  // ==========================================
  // FILTER / SEARCH CONTROLS
  // ==========================================
  filterByCategory(cat) {
    this.activeCategory = cat;
    
    document.querySelectorAll(".category-filter-btn").forEach(btn => {
      if (btn.dataset.category === cat) {
        btn.classList.add("bg-[#D4AF37]", "text-black", "border-[#D4AF37]", "font-semibold");
        btn.classList.remove("border-stone-300", "dark:border-stone-700", "text-stone-700", "dark:text-stone-300");
      } else {
        btn.classList.remove("bg-[#D4AF37]", "text-black", "border-[#D4AF37]", "font-semibold");
        btn.classList.add("border-stone-300", "dark:border-stone-700", "text-stone-700", "dark:text-stone-300");
      }
    });

    this.renderProductsGrid();
  },

  resetFilters() {
    this.activeCategory = "all";
    this.activeSort = "featured";
    this.maxPriceFilter = 3000000;
    this.inStockOnly = false;
    this.searchQuery = "";

    const searchInput = document.getElementById("search-input");
    const mobileSearch = document.getElementById("mobile-search-input");
    const priceSlider = document.getElementById("price-range-slider");
    const priceDisplay = document.getElementById("price-slider-display");
    const sortSelect = document.getElementById("sort-select");

    if (searchInput) searchInput.value = "";
    if (mobileSearch) mobileSearch.value = "";
    if (priceSlider) priceSlider.value = 3000000;
    if (priceDisplay) priceDisplay.textContent = "Rs. 3,000,000+";
    if (sortSelect) sortSelect.value = "featured";

    this.filterByCategory("all");
  },

  // =========================================================================
  // ATELIER CUSTOMIZER & IN-BROWSER ADMIN STUDIO (Self-Editing System)
  // =========================================================================
  openCustomizerModal() {
    const modal = document.getElementById("admin-customizer-modal");
    if (!modal) return;

    this.renderCustomizerGeneralTab();
    this.renderCustomizerProductsList();
    modal.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
  },

  closeCustomizerModal() {
    const modal = document.getElementById("admin-customizer-modal");
    if (modal) modal.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
  },

  switchCustomizerTab(tabId) {
    document.querySelectorAll(".customizer-tab-btn").forEach(b => {
      b.classList.toggle("border-[#D4AF37]", b.dataset.tab === tabId);
      b.classList.toggle("text-[#D4AF37]", b.dataset.tab === tabId);
    });

    const generalTab = document.getElementById("customizer-tab-general");
    const productsTab = document.getElementById("customizer-tab-products");
    const exportTab = document.getElementById("customizer-tab-export");

    if (generalTab) generalTab.classList.toggle("hidden", tabId !== "general");
    if (productsTab) productsTab.classList.toggle("hidden", tabId !== "products");
    if (exportTab) exportTab.classList.toggle("hidden", tabId !== "export");

    if (tabId === "export") {
      this.generateCodeExport();
    }
  },

  renderCustomizerGeneralTab() {
    const config = window.store.getStoreConfig();
    const nameInput = document.getElementById("custom-store-name");
    const announceInput = document.getElementById("custom-store-announcement");
    const headlineInput = document.getElementById("custom-hero-headline");
    const subtitleInput = document.getElementById("custom-hero-subtitle");
    const thresholdInput = document.getElementById("custom-shipping-threshold");

    if (nameInput) nameInput.value = config.storeName || "AI WEB";
    if (announceInput) announceInput.value = config.announcement || "";
    if (headlineInput) headlineInput.value = config.heroHeadline || "";
    if (subtitleInput) subtitleInput.value = config.heroSubtitle || "";
    if (thresholdInput) thresholdInput.value = config.freeShippingThreshold || 140000;
  },

  saveCustomizerGeneralSettings() {
    const nameInput = document.getElementById("custom-store-name");
    const announceInput = document.getElementById("custom-store-announcement");
    const headlineInput = document.getElementById("custom-hero-headline");
    const subtitleInput = document.getElementById("custom-hero-subtitle");
    const thresholdInput = document.getElementById("custom-shipping-threshold");

    window.store.updateStoreConfig({
      storeName: nameInput?.value.trim() || "AI WEB",
      announcement: announceInput?.value.trim() || "",
      heroHeadline: headlineInput?.value.trim() || "",
      heroSubtitle: subtitleInput?.value.trim() || "",
      freeShippingThreshold: parseInt(thresholdInput?.value, 10) || 140000
    });

    this.applyStoreConfig();
    this.renderCartDrawer();
    this.showToast("Settings Updated", "Store content has been saved and applied live!", "gold");
  },

  renderCustomizerProductsList() {
    const container = document.getElementById("customizer-products-table-body");
    if (!container) return;

    const products = window.store.getProducts();

    container.innerHTML = products.map((p, index) => `
      <tr class="border-b border-stone-200/50 dark:border-stone-800/50 text-xs hover:bg-stone-50 dark:hover:bg-stone-800/40">
        <td class="py-3 px-3">
          <div class="flex items-center gap-3">
            <img src="${p.images.primary}" alt="${p.name}" class="w-10 h-12 object-cover rounded bg-stone-700 shrink-0"/>
            <div>
              <span class="font-semibold text-stone-900 dark:text-stone-100 block">${p.name}</span>
              <span class="text-[10px] text-stone-400 uppercase">${p.categoryLabel || p.category} • SKU: ${p.sku}</span>
            </div>
          </div>
        </td>
        <td class="py-3 px-3 font-semibold text-stone-900 dark:text-stone-100 font-sans whitespace-nowrap">
          Rs. ${p.price.toLocaleString("en-PK")}
        </td>
        <td class="py-3 px-3">
          <span class="px-2 py-0.5 rounded text-[10px] font-semibold ${p.stock > 0 ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" : "bg-red-500/15 text-red-500"}">
            ${p.stock} in stock
          </span>
        </td>
        <td class="py-3 px-3 text-right whitespace-nowrap">
          <button 
            type="button" 
            onclick="UI.openEditProductForm('${p.id}')"
            class="px-2.5 py-1 rounded-lg bg-stone-200 dark:bg-stone-800 hover:bg-[#D4AF37] hover:text-black text-[11px] font-semibold mr-1 transition-colors"
          >
            Edit
          </button>
          <button 
            type="button" 
            onclick="UI.handleDeleteProduct('${p.id}')"
            class="px-2 py-1 rounded-lg text-red-500 hover:bg-red-500/10 text-[11px] transition-colors"
          >
            Delete
          </button>
        </td>
      </tr>
    `).join("");
  },

  openAddProductForm() {
    const formContainer = document.getElementById("customizer-product-form-container");
    if (!formContainer) return;

    formContainer.innerHTML = `
      <div class="p-5 rounded-2xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 mb-6">
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-stone-200 dark:border-stone-800">
          <h4 class="font-serif-luxury text-lg font-semibold text-stone-900 dark:text-stone-100">Add New Luxury Creation</h4>
          <button type="button" onclick="document.getElementById('customizer-product-form-container').innerHTML = ''" class="text-xs text-stone-400 hover:text-white">Cancel</button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label class="block font-semibold uppercase text-stone-400 mb-1">Creation Title *</label>
            <input id="new-prod-name" type="text" placeholder="e.g. Royal Emerald Velvet Crossbody" class="w-full px-3 py-2 rounded-lg bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100"/>
          </div>

          <div>
            <label class="block font-semibold uppercase text-stone-400 mb-1">Category *</label>
            <select id="new-prod-category" class="w-full px-3 py-2 rounded-lg bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100">
              <option value="bags">Bags & Leather</option>
              <option value="perfumes">Haute Parfumerie</option>
              <option value="accessories">Fine Accessories</option>
            </select>
          </div>

          <div>
            <label class="block font-semibold uppercase text-stone-400 mb-1">Price in Pakistani Rupees (PKR) *</label>
            <input id="new-prod-price" type="number" placeholder="e.g. 450000" class="w-full px-3 py-2 rounded-lg bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100"/>
          </div>

          <div>
            <label class="block font-semibold uppercase text-stone-400 mb-1">Stock Available in Atelier *</label>
            <input id="new-prod-stock" type="number" value="5" class="w-full px-3 py-2 rounded-lg bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100"/>
          </div>

          <div>
            <label class="block font-semibold uppercase text-stone-400 mb-1">Luxury Tag Badge</label>
            <input id="new-prod-tag" type="text" placeholder="e.g. Limited Edition / Atelier Exclusive" class="w-full px-3 py-2 rounded-lg bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100"/>
          </div>

          <div>
            <label class="block font-semibold uppercase text-stone-400 mb-1">Primary Image URL *</label>
            <input id="new-prod-image" type="url" placeholder="https://images.unsplash.com/..." class="w-full px-3 py-2 rounded-lg bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100"/>
          </div>

          <div class="sm:col-span-2">
            <label class="block font-semibold uppercase text-stone-400 mb-1">Short Narrative Description *</label>
            <textarea id="new-prod-desc" rows="2" placeholder="Handcrafted with select materials and bespoke finishing..." class="w-full px-3 py-2 rounded-lg bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100"></textarea>
          </div>
        </div>

        <button 
          type="button" 
          onclick="UI.saveNewProduct()"
          class="mt-4 px-6 py-2.5 rounded-xl gold-gradient-bg text-black font-semibold text-xs uppercase tracking-widest"
        >
          Publish Creation to Catalog
        </button>
      </div>
    `;
  },

  saveNewProduct() {
    const name = document.getElementById("new-prod-name")?.value.trim();
    const category = document.getElementById("new-prod-category")?.value || "bags";
    const price = parseInt(document.getElementById("new-prod-price")?.value, 10);
    const stock = parseInt(document.getElementById("new-prod-stock")?.value, 10) || 3;
    const tag = document.getElementById("new-prod-tag")?.value.trim() || "New Season";
    const image = document.getElementById("new-prod-image")?.value.trim() || "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80";
    const desc = document.getElementById("new-prod-desc")?.value.trim() || "Exquisite artisanal craftsmanship.";

    if (!name || isNaN(price)) {
      this.showToast("Incomplete Creation", "Please provide a valid title and PKR price.", "error");
      return;
    }

    const categoryLabels = {
      bags: "Bags & Leather",
      perfumes: "Haute Parfumerie",
      accessories: "Fine Accessories"
    };

    const newProd = {
      id: `custom-${Date.now()}`,
      name,
      category,
      categoryLabel: categoryLabels[category] || "Luxury Goods",
      tag,
      price,
      originalPrice: null,
      rating: 5.0,
      reviewCount: 1,
      stock,
      sku: `AIW-CUS-${Math.floor(100 + Math.random() * 900)}`,
      images: {
        primary: image,
        secondary: image,
        angles: [image]
      },
      colors: [{ name: "Noir Classic", hex: "#111111" }],
      sizes: [{ name: "Standard", priceMod: 0 }],
      shortDesc: desc,
      fullDesc: desc,
      specs: {
        "Origin": "Atelier Exclusive",
        "Material": "Artisanal Selection"
      },
      reviews: [{
        author: "Atelier Client",
        location: "Pakistan",
        rating: 5,
        date: "Today",
        verified: true,
        title: "Perfection in every detail",
        content: "Outstanding finish and presentation."
      }]
    };

    window.store.addProduct(newProd);
    this.renderCustomizerProductsList();
    this.renderProductsGrid();
    document.getElementById("customizer-product-form-container").innerHTML = "";
    this.showToast("Creation Added", `${name} is now live in your store!`, "gold");
  },

  openEditProductForm(productId) {
    const product = getProductById(productId);
    if (!product) return;

    const formContainer = document.getElementById("customizer-product-form-container");
    if (!formContainer) return;

    formContainer.innerHTML = `
      <div class="p-5 rounded-2xl bg-stone-100 dark:bg-stone-900 border border-[#D4AF37]/50 mb-6">
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-stone-200 dark:border-stone-800">
          <h4 class="font-serif-luxury text-lg font-semibold text-stone-900 dark:text-stone-100">Edit Creation: ${product.name}</h4>
          <button type="button" onclick="document.getElementById('customizer-product-form-container').innerHTML = ''" class="text-xs text-stone-400 hover:text-white">Cancel</button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label class="block font-semibold uppercase text-stone-400 mb-1">Title</label>
            <input id="edit-prod-name" type="text" value="${product.name}" class="w-full px-3 py-2 rounded-lg bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100"/>
          </div>

          <div>
            <label class="block font-semibold uppercase text-stone-400 mb-1">Price in Pakistani Rupees (PKR)</label>
            <input id="edit-prod-price" type="number" value="${product.price}" class="w-full px-3 py-2 rounded-lg bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 font-bold"/>
          </div>

          <div>
            <label class="block font-semibold uppercase text-stone-400 mb-1">Original / Strikethrough Price (PKR)</label>
            <input id="edit-prod-orig-price" type="number" value="${product.originalPrice || ""}" placeholder="Leave empty if none" class="w-full px-3 py-2 rounded-lg bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100"/>
          </div>

          <div>
            <label class="block font-semibold uppercase text-stone-400 mb-1">Stock in Atelier</label>
            <input id="edit-prod-stock" type="number" value="${product.stock}" class="w-full px-3 py-2 rounded-lg bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100"/>
          </div>

          <div>
            <label class="block font-semibold uppercase text-stone-400 mb-1">Luxury Tag Badge</label>
            <input id="edit-prod-tag" type="text" value="${product.tag || ""}" class="w-full px-3 py-2 rounded-lg bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100"/>
          </div>

          <div>
            <label class="block font-semibold uppercase text-stone-400 mb-1">Primary Image URL</label>
            <input id="edit-prod-image" type="url" value="${product.images.primary}" class="w-full px-3 py-2 rounded-lg bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100"/>
          </div>

          <div class="sm:col-span-2">
            <label class="block font-semibold uppercase text-stone-400 mb-1">Description</label>
            <textarea id="edit-prod-desc" rows="2" class="w-full px-3 py-2 rounded-lg bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100">${product.shortDesc}</textarea>
          </div>
        </div>

        <div class="mt-4 flex gap-3">
          <button 
            type="button" 
            onclick="UI.saveEditedProduct('${product.id}')"
            class="px-6 py-2.5 rounded-xl gold-gradient-bg text-black font-semibold text-xs uppercase tracking-widest"
          >
            Save Changes Live
          </button>
        </div>
      </div>
    `;
    formContainer.scrollIntoView({ behavior: "smooth" });
  },

  saveEditedProduct(productId) {
    const product = getProductById(productId);
    if (!product) return;

    product.name = document.getElementById("edit-prod-name")?.value.trim() || product.name;
    product.price = parseInt(document.getElementById("edit-prod-price")?.value, 10) || product.price;
    const origPriceVal = parseInt(document.getElementById("edit-prod-orig-price")?.value, 10);
    product.originalPrice = isNaN(origPriceVal) ? null : origPriceVal;
    product.stock = parseInt(document.getElementById("edit-prod-stock")?.value, 10) || 0;
    product.tag = document.getElementById("edit-prod-tag")?.value.trim() || product.tag;
    const newImg = document.getElementById("edit-prod-image")?.value.trim();
    if (newImg) {
      product.images.primary = newImg;
    }
    product.shortDesc = document.getElementById("edit-prod-desc")?.value.trim() || product.shortDesc;

    window.store.updateProduct(product);
    this.renderCustomizerProductsList();
    this.renderProductsGrid();
    document.getElementById("customizer-product-form-container").innerHTML = "";
    this.showToast("Product Updated", `${product.name} updated in Pakistani Rupees!`, "gold");
  },

  handleDeleteProduct(productId) {
    if (confirm("Are you sure you wish to remove this luxury creation from your store?")) {
      window.store.deleteProduct(productId);
      this.renderCustomizerProductsList();
      this.renderProductsGrid();
      this.showToast("Product Removed", "The creation has been removed from catalog.");
    }
  },

  handleResetProducts() {
    if (confirm("Reset all products back to the original 12 factory luxury creations in Pakistani Rupees?")) {
      window.store.resetProductsToDefault();
      this.renderCustomizerProductsList();
      this.renderProductsGrid();
      this.showToast("Catalog Reset", "Catalog restored to default Pakistani Rupee goods.", "gold");
    }
  },

  generateCodeExport() {
    const exportBox = document.getElementById("customizer-export-code");
    if (!exportBox) return;

    const products = window.store.getProducts();
    const jsCode = `/**\n * AI WEB - Master Product Catalog (Pakistani Rupees - PKR / Rs.)\n * Exported from Atelier Customizer Studio\n */\n\nconst LUXURY_PRODUCTS = ${JSON.stringify(products, null, 2)};\n\nfunction getProductById(id) {\n  const catalog = (window.store && typeof window.store.getProducts === 'function') ? window.store.getProducts() : LUXURY_PRODUCTS;\n  return catalog.find(p => p.id === id) || null;\n}\n`;

    exportBox.value = jsCode;
  },

  copyExportCode() {
    const exportBox = document.getElementById("customizer-export-code");
    if (exportBox) {
      exportBox.select();
      navigator.clipboard.writeText(exportBox.value);
      this.showToast("Copied to Clipboard", "Ready to paste into js/products.js!", "gold");
    }
  },

  // ==========================================
  // GLOBAL LISTENERS & SHORTCUTS
  // ==========================================
  bindGlobalEvents() {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeQuickView();
        this.closeCartDrawer();
        this.closeWishlistModal();
        this.closeCustomizerModal();
        if (window.checkoutController) window.checkoutController.closeCheckout();
      }
    });

    window.store.subscribe((event, data) => {
      this.updateCartBadge();
      this.updateWishlistBadge();
      this.renderCartDrawer();
      if (event === "currency_changed" || event === "products_updated") {
        this.renderProductsGrid();
        if (this.activeDetailProduct) {
          const fresh = getProductById(this.activeDetailProduct.id);
          if (fresh) this.renderProductDetailPage(fresh);
        }
      }
      if (event === "wishlist_updated") {
        this.renderProductsGrid();
      }
    });
  }
};

window.UI = UI;
