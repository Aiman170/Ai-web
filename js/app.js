/**
 * AI WEB - Luxury Maison & E-Commerce Atelier
 * Core Application Controller, Event Router & Lifecycle Initialization
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Theme from persistent storage
  window.store.applyThemeClass();
  updateThemeButtonIcon();

  // 2. Initialize UI Engine
  window.UI.init();

  // 3. Bind Header Navigation & Search
  bindHeaderEvents();

  // 4. Bind Filter Bar Controls (Price slider, Sort, Category pills)
  bindFilterEvents();

  // 5. Handle initial URL Hash Routing (e.g. #product-bag-01)
  handleHashRouting();
  window.addEventListener("hashchange", handleHashRouting);

  // 6. Global Keybindings (Ctrl/Cmd + K for search)
  window.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      const searchInput = document.getElementById("search-input");
      if (searchInput) {
        searchInput.focus();
        searchInput.select();
      }
    }
  });

  console.log("⚜️ AI WEB Luxury Atelier initialized successfully.");
});

// ==========================================
// THEME TOGGLE HELPER
// ==========================================
function updateThemeButtonIcon() {
  const currentTheme = window.store.getTheme();
  const themeBtns = document.querySelectorAll(".theme-toggle-btn");
  
  themeBtns.forEach(btn => {
    if (currentTheme === "dark") {
      btn.innerHTML = `
        <svg class="w-5 h-5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
        </svg>
      `;
      btn.setAttribute("title", "Switch to Editorial Light Mode");
    } else {
      btn.innerHTML = `
        <svg class="w-5 h-5 text-stone-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
        </svg>
      `;
      btn.setAttribute("title", "Switch to Opulent Dark Mode");
    }
  });
}

// ==========================================
// HEADER EVENTS & LIVE SEARCH
// ==========================================
function bindHeaderEvents() {
  const searchInput = document.getElementById("search-input");
  const mobileSearchInput = document.getElementById("mobile-search-input");
  const searchResultsDropdown = document.getElementById("search-dropdown");
  const currencySelect = document.getElementById("currency-select");
  const themeToggle = document.getElementById("theme-toggle");
  const mobileThemeToggle = document.getElementById("mobile-theme-toggle");

  // Currency Switcher
  if (currencySelect) {
    currencySelect.addEventListener("change", (e) => {
      window.store.setCurrency(e.target.value);
      window.UI.showToast("Currency Updated", `Display prices converted to ${e.target.value}.`, "gold");
    });
  }

  // Theme Toggles
  const handleToggle = () => {
    window.store.toggleTheme();
    updateThemeButtonIcon();
    const mode = window.store.getTheme() === "dark" ? "Opulent Dark" : "Editorial Light";
    window.UI.showToast(`${mode} Activated`, "", "gold");
  };

  if (themeToggle) themeToggle.addEventListener("click", handleToggle);
  if (mobileThemeToggle) mobileThemeToggle.addEventListener("click", handleToggle);

  // Search autocomplete handler
  const handleSearchInput = (query) => {
    window.UI.searchQuery = query;
    window.UI.renderProductsGrid();

    if (!searchResultsDropdown) return;

    if (!query.trim()) {
      searchResultsDropdown.classList.add("hidden");
      return;
    }

    const matches = LUXURY_PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.categoryLabel.toLowerCase().includes(query.toLowerCase()) ||
      p.shortDesc.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 4);

    if (matches.length === 0) {
      searchResultsDropdown.innerHTML = `
        <div class="p-4 text-center text-xs text-stone-400">
          No luxury creations found for "<span class="text-white">${query}</span>"
        </div>
      `;
      searchResultsDropdown.classList.remove("hidden");
      return;
    }

    searchResultsDropdown.innerHTML = `
      <div class="p-2 border-b border-stone-200 dark:border-stone-800 text-[10px] uppercase font-semibold text-[#D4AF37] px-3">
        Suggested Creations
      </div>
      <div class="divide-y divide-stone-200/50 dark:divide-stone-800/50">
        ${matches.map(m => `
          <div 
            class="flex items-center gap-3 p-3 hover:bg-[#D4AF37]/10 cursor-pointer transition-colors"
            onclick="UI.openProductDetail('${m.id}'); document.getElementById('search-dropdown')?.classList.add('hidden');"
          >
            <img src="${m.images.primary}" alt="${m.name}" class="w-10 h-12 object-cover rounded bg-stone-800"/>
            <div class="flex-1 min-w-0">
              <h5 class="font-serif-luxury text-sm font-semibold text-stone-900 dark:text-stone-100 truncate">${m.name}</h5>
              <div class="flex items-center justify-between text-xs mt-0.5">
                <span class="text-[10px] uppercase text-[#B88E28] dark:text-[#D4AF37]">${m.categoryLabel}</span>
                <span class="font-semibold text-stone-900 dark:text-stone-100">${window.store.formatPrice(m.price)}</span>
              </div>
            </div>
          </div>
        `).join("")}
      </div>
    `;
    searchResultsDropdown.classList.remove("hidden");
  };

  if (searchInput) {
    searchInput.addEventListener("input", (e) => handleSearchInput(e.target.value));
    document.addEventListener("click", (e) => {
      if (!searchInput.contains(e.target) && searchResultsDropdown && !searchResultsDropdown.contains(e.target)) {
        searchResultsDropdown.classList.add("hidden");
      }
    });
  }

  if (mobileSearchInput) {
    mobileSearchInput.addEventListener("input", (e) => handleSearchInput(e.target.value));
  }

  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenuDrawer = document.getElementById("mobile-menu-drawer");
  const closeMobileMenuBtn = document.getElementById("close-mobile-menu");

  if (mobileMenuBtn && mobileMenuDrawer) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenuDrawer.classList.remove("hidden");
    });
  }
  if (closeMobileMenuBtn && mobileMenuDrawer) {
    closeMobileMenuBtn.addEventListener("click", () => {
      mobileMenuDrawer.classList.add("hidden");
    });
  }
}

// ==========================================
// FILTER BAR & SORTING CONTROLS
// ==========================================
function bindFilterEvents() {
  const priceSlider = document.getElementById("price-range-slider");
  const priceDisplay = document.getElementById("price-slider-display");
  const sortSelect = document.getElementById("sort-select");
  const inStockCheckbox = document.getElementById("in-stock-checkbox");

  if (priceSlider && priceDisplay) {
    priceSlider.addEventListener("input", (e) => {
      const val = parseInt(e.target.value, 10);
      window.UI.maxPriceFilter = val;
      priceDisplay.textContent = val >= 10000 ? "$10,000+" : window.store.formatPrice(val);
      window.UI.renderProductsGrid();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      window.UI.activeSort = e.target.value;
      window.UI.renderProductsGrid();
    });
  }

  if (inStockCheckbox) {
    inStockCheckbox.addEventListener("change", (e) => {
      window.UI.inStockOnly = e.target.checked;
      window.UI.renderProductsGrid();
    });
  }
}

// ==========================================
// HASH ROUTING (Deep-linking)
// ==========================================
function handleHashRouting() {
  const hash = window.location.hash.slice(1);
  if (!hash) return;

  if (hash.startsWith("product-")) {
    const productId = hash.replace("product-", "");
    window.UI.openProductDetail(productId);
  } else if (hash === "cart") {
    window.UI.openCartDrawer();
  } else if (hash === "checkout") {
    window.checkoutController.openCheckout();
  } else if (hash === "wishlist") {
    window.UI.openWishlistModal();
  } else if (hash.startsWith("category-")) {
    const cat = hash.replace("category-", "");
    window.UI.filterByCategory(cat);
  }
}
