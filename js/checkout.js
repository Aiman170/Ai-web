/**
 * AI WEB - Luxury Maison & E-Commerce Atelier
 * Checkout Controller, Card Formatter, Step Validation & Order Generation
 * Configured for Pakistani Rupees (PKR / Rs.) and Nationwide White-Glove Delivery
 */

class CheckoutController {
  constructor() {
    this.currentStep = 1; // Step 1: Shipping, Step 2: Delivery, Step 3: Payment
    this.selectedDelivery = {
      id: "standard",
      name: "Standard White-Glove (Pakistan & Global)",
      costPKR: 0,
      time: "3–5 Business Days"
    };
    this.selectedPaymentMethod = "card"; // "card", "cod", "wire"
  }

  openCheckout() {
    const cart = window.store.getCart();
    if (cart.length === 0) {
      window.UI.showToast("Your Shopping Bag is Empty", "Please select a luxury creation before checking out.", "error");
      return;
    }

    // Switch view
    const catalogView = document.getElementById("catalog-view");
    const pdpView = document.getElementById("product-detail-view");
    const checkoutView = document.getElementById("checkout-view");
    const confirmationView = document.getElementById("order-confirmation-view");

    if (catalogView) catalogView.classList.add("hidden");
    if (pdpView) pdpView.classList.add("hidden");
    if (confirmationView) confirmationView.classList.add("hidden");
    if (checkoutView) checkoutView.classList.remove("hidden");

    window.scrollTo({ top: 0, behavior: "smooth" });
    this.currentStep = 1;
    this.renderCheckout();
    this.prefillSavedAddress();
  }

  closeCheckout() {
    const catalogView = document.getElementById("catalog-view");
    const checkoutView = document.getElementById("checkout-view");
    if (checkoutView) checkoutView.classList.add("hidden");
    if (catalogView) catalogView.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  prefillSavedAddress() {
    const saved = window.store.getSavedShippingProfile();
    if (!saved) return;

    const fields = ["fullName", "email", "phone", "address", "suite", "city", "postalCode", "country"];
    fields.forEach(f => {
      const el = document.getElementById(`checkout-${f}`);
      if (el && saved[f]) el.value = saved[f];
    });
  }

  setDeliveryMethod(id, costPKR, name, time) {
    this.selectedDelivery = { id, costPKR, name, time };
    this.renderOrderSummary();
    this.updateDeliveryCardsUI();
  }

  updateDeliveryCardsUI() {
    document.querySelectorAll(".delivery-option-card").forEach(card => {
      if (card.dataset.id === this.selectedDelivery.id) {
        card.classList.add("border-[#D4AF37]", "bg-[#D4AF37]/10", "shadow-md");
        card.classList.remove("border-stone-200", "dark:border-stone-800");
      } else {
        card.classList.remove("border-[#D4AF37]", "bg-[#D4AF37]/10", "shadow-md");
        card.classList.add("border-stone-200", "dark:border-stone-800");
      }
    });
  }

  setPaymentMethod(method) {
    this.selectedPaymentMethod = method;
    document.querySelectorAll(".payment-method-btn").forEach(btn => {
      if (btn.dataset.method === method) {
        btn.classList.add("border-[#D4AF37]", "bg-[#D4AF37]/15", "text-[#D4AF37]");
        btn.classList.remove("border-stone-300", "dark:border-stone-700", "text-stone-600", "dark:text-stone-400");
      } else {
        btn.classList.remove("border-[#D4AF37]", "bg-[#D4AF37]/15", "text-[#D4AF37]");
        btn.classList.add("border-stone-300", "dark:border-stone-700", "text-stone-600", "dark:text-stone-400");
      }
    });

    const cardPanel = document.getElementById("card-payment-panel");
    const codPanel = document.getElementById("cod-payment-panel");
    const wirePanel = document.getElementById("wire-payment-panel");

    if (cardPanel) cardPanel.classList.toggle("hidden", method !== "card");
    if (codPanel) codPanel.classList.toggle("hidden", method !== "cod");
    if (wirePanel) wirePanel.classList.toggle("hidden", method !== "wire");
  }

  goToStep(stepNumber) {
    if (stepNumber > this.currentStep) {
      if (!this.validateStep(this.currentStep)) return;
    }
    this.currentStep = stepNumber;
    this.updateStepDisplay();
    window.scrollTo({ top: 150, behavior: "smooth" });
  }

  validateStep(step) {
    let isValid = true;
    if (step === 1) {
      const required = [
        { id: "checkout-fullName", name: "Full Name" },
        { id: "checkout-email", name: "Email Address", email: true },
        { id: "checkout-phone", name: "Phone Number" },
        { id: "checkout-address", name: "Delivery Address" },
        { id: "checkout-city", name: "City" },
        { id: "checkout-postalCode", name: "Postal Code" }
      ];

      required.forEach(item => {
        const el = document.getElementById(item.id);
        if (!el || !el.value.trim()) {
          isValid = false;
          if (el) el.classList.add("border-red-500", "ring-1", "ring-red-500");
        } else {
          if (el) el.classList.remove("border-red-500", "ring-1", "ring-red-500");
          if (item.email && !this.isValidEmail(el.value.trim())) {
            isValid = false;
            el.classList.add("border-red-500", "ring-1", "ring-red-500");
          }
        }
      });

      if (!isValid) {
        window.UI.showToast("Incomplete Shipping Details", "Please verify all required recipient fields.", "error");
      } else {
        // Save to cache
        window.store.saveShippingProfile({
          fullName: document.getElementById("checkout-fullName").value.trim(),
          email: document.getElementById("checkout-email").value.trim(),
          phone: document.getElementById("checkout-phone").value.trim(),
          address: document.getElementById("checkout-address").value.trim(),
          suite: document.getElementById("checkout-suite")?.value.trim() || "",
          city: document.getElementById("checkout-city").value.trim(),
          postalCode: document.getElementById("checkout-postalCode").value.trim(),
          country: document.getElementById("checkout-country")?.value || "Pakistan"
        });
      }
    } else if (step === 2) {
      isValid = true;
    } else if (step === 3) {
      if (this.selectedPaymentMethod === "card") {
        const cardNum = document.getElementById("card-number-input")?.value.replace(/\s+/g, "") || "";
        const cardName = document.getElementById("card-holder-input")?.value.trim() || "";
        const cardExp = document.getElementById("card-expiry-input")?.value.trim() || "";
        const cardCvc = document.getElementById("card-cvc-input")?.value.trim() || "";

        if (cardNum.length < 13 || !cardName || cardExp.length < 5 || cardCvc.length < 3) {
          isValid = false;
          window.UI.showToast("Payment Validation Error", "Please provide complete card credentials.", "error");
        }
      }
    }
    return isValid;
  }

  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  updateStepDisplay() {
    for (let i = 1; i <= 3; i++) {
      const stepContent = document.getElementById(`step-content-${i}`);
      const stepIndicator = document.getElementById(`step-indicator-${i}`);
      const stepTitle = document.getElementById(`step-title-${i}`);

      if (stepContent) {
        stepContent.classList.toggle("hidden", i !== this.currentStep);
      }
      if (stepIndicator) {
        if (i === this.currentStep) {
          stepIndicator.className = "w-8 h-8 rounded-full bg-[#D4AF37] text-black font-semibold flex items-center justify-center text-xs shadow-md";
        } else if (i < this.currentStep) {
          stepIndicator.className = "w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs";
          stepIndicator.innerHTML = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>`;
        } else {
          stepIndicator.className = "w-8 h-8 rounded-full border border-stone-300 dark:border-stone-700 text-stone-400 flex items-center justify-center text-xs";
          stepIndicator.textContent = i;
        }
      }
      if (stepTitle) {
        if (i === this.currentStep) {
          stepTitle.className = "text-xs font-semibold uppercase tracking-wider text-[#D4AF37]";
        } else if (i < this.currentStep) {
          stepTitle.className = "text-xs font-semibold uppercase tracking-wider text-stone-900 dark:text-stone-200";
        } else {
          stepTitle.className = "text-xs font-semibold uppercase tracking-wider text-stone-400";
        }
      }
    }
  }

  renderCheckout() {
    this.updateStepDisplay();
    this.renderOrderSummary();
    this.bindCardInputFormatting();
  }

  renderOrderSummary() {
    const summaryContainer = document.getElementById("checkout-order-summary-items");
    const summaryFinancials = document.getElementById("checkout-order-summary-financials");
    if (!summaryContainer || !summaryFinancials) return;

    const cart = window.store.getCart();
    const totals = window.store.getCartTotals();

    // Adjust shipping based on selected method (in PKR)
    let deliveryCostPKR = this.selectedDelivery.costPKR;
    const freeShippingThreshold = window.store.getStoreConfig().freeShippingThreshold || 140000;
    if (totals.subtotal >= freeShippingThreshold && this.selectedDelivery.id === "standard") {
      deliveryCostPKR = 0;
    }

    const grandTotal = Math.max(0, totals.subtotal - totals.discount) + deliveryCostPKR + totals.tax;

    summaryContainer.innerHTML = cart.map(item => `
      <div class="flex items-center gap-3 py-3 border-b border-stone-200/60 dark:border-stone-800/60">
        <div class="w-12 h-14 rounded-lg bg-stone-100 dark:bg-stone-800 overflow-hidden shrink-0 relative">
          <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover"/>
          <span class="absolute top-0 right-0 w-4 h-4 bg-[#D4AF37] text-black text-[10px] font-bold rounded-bl flex items-center justify-center">${item.quantity}</span>
        </div>
        <div class="flex-1 min-w-0">
          <h5 class="font-serif-luxury text-sm font-semibold text-stone-900 dark:text-stone-100 truncate">${item.name}</h5>
          <p class="text-[11px] text-stone-400">${item.color !== "Standard" ? item.color : ""} ${item.size !== "Standard" ? `• ${item.size}` : ""}</p>
        </div>
        <span class="text-xs font-semibold text-stone-900 dark:text-stone-100">${window.store.formatPrice(item.unitPrice * item.quantity)}</span>
      </div>
    `).join("");

    summaryFinancials.innerHTML = `
      <div class="space-y-2 text-xs text-stone-600 dark:text-stone-400">
        <div class="flex justify-between">
          <span>Subtotal</span>
          <span class="font-semibold text-stone-900 dark:text-stone-100">${window.store.formatPrice(totals.subtotal)}</span>
        </div>
        ${totals.discount > 0 ? `
          <div class="flex justify-between text-emerald-600 dark:text-emerald-400">
            <span>Privilège Discount (${totals.appliedPromo?.code})</span>
            <span>-${window.store.formatPrice(totals.discount)}</span>
          </div>
        ` : ""}
        <div class="flex justify-between">
          <span>Delivery (${this.selectedDelivery.name})</span>
          <span>${deliveryCostPKR === 0 ? `<span class="text-emerald-600 dark:text-emerald-400 font-semibold uppercase tracking-wider">Complimentary</span>` : window.store.formatPrice(deliveryCostPKR)}</span>
        </div>
        <div class="flex justify-between">
          <span>Luxury Duties & Packaging (5%)</span>
          <span class="font-semibold text-stone-900 dark:text-stone-100">${window.store.formatPrice(totals.tax)}</span>
        </div>
        <div class="pt-3 border-t border-stone-200 dark:border-stone-800 flex justify-between text-base font-semibold text-stone-900 dark:text-stone-50">
          <span>Final Total</span>
          <span class="font-sans text-xl text-[#B88E28] dark:text-[#D4AF37] font-bold">${window.store.formatPrice(grandTotal)}</span>
        </div>
      </div>
    `;

    this._computedCheckoutTotal = grandTotal;
    this._computedDeliveryCost = deliveryCostPKR;
  }

  // ==========================================
  // VIRTUAL CREDIT CARD FORMATTING & ANIMATION
  // ==========================================
  bindCardInputFormatting() {
    const cardNumInput = document.getElementById("card-number-input");
    const cardNameInput = document.getElementById("card-holder-input");
    const cardExpInput = document.getElementById("card-expiry-input");
    const cardCvcInput = document.getElementById("card-cvc-input");

    const vcNum = document.getElementById("vc-number");
    const vcName = document.getElementById("vc-name");
    const vcExp = document.getElementById("vc-expiry");
    const vcBrand = document.getElementById("vc-brand-logo");

    if (cardNumInput) {
      cardNumInput.oninput = (e) => {
        let val = e.target.value.replace(/\D/g, "").slice(0, 16);
        let formatted = val.replace(/(.{4})/g, "$1 ").trim();
        e.target.value = formatted;

        if (vcNum) {
          vcNum.textContent = formatted || "•••• •••• •••• ••••";
        }

        if (vcBrand) {
          if (val.startsWith("4")) {
            vcBrand.innerHTML = `<span class="font-bold text-blue-400 italic text-sm">VISA</span>`;
          } else if (/^5[1-5]/.test(val)) {
            vcBrand.innerHTML = `<span class="font-bold text-amber-500 text-sm">Mastercard</span>`;
          } else if (/^3[47]/.test(val)) {
            vcBrand.innerHTML = `<span class="font-bold text-cyan-400 text-sm">AMEX</span>`;
          } else if (/^60/.test(val)) {
            vcBrand.innerHTML = `<span class="font-bold text-green-400 text-sm">PayPak</span>`;
          } else {
            vcBrand.innerHTML = `<span class="text-xs text-stone-400">CREDIT</span>`;
          }
        }
      };
    }

    if (cardNameInput) {
      cardNameInput.oninput = (e) => {
        if (vcName) {
          vcName.textContent = e.target.value.toUpperCase() || "CARDHOLDER NAME";
        }
      };
    }

    if (cardExpInput) {
      cardExpInput.oninput = (e) => {
        let val = e.target.value.replace(/\D/g, "").slice(0, 4);
        if (val.length > 2) {
          val = `${val.slice(0, 2)}/${val.slice(2)}`;
        }
        e.target.value = val;
        if (vcExp) {
          vcExp.textContent = val || "MM/YY";
        }
      };
    }
  }

  // ==========================================
  // PLACE ORDER & GENERATE INVOICE
  // ==========================================
  submitFinalOrder() {
    if (!this.validateStep(3)) return;

    const cart = window.store.getCart();
    if (cart.length === 0) return;

    const totals = window.store.getCartTotals();
    const shippingProfile = window.store.getSavedShippingProfile() || {
      fullName: "Esteemed Client",
      email: "client@aiweb.com",
      city: "Islamabad",
      country: "Pakistan"
    };

    const randomHex = Math.floor(10000 + Math.random() * 90000);
    const orderId = `AIW-${randomHex}-PKR`;

    const now = new Date();
    const deliveryDate = new Date(now.getTime() + (3 * 24 * 60 * 60 * 1000));
    const deliveryFormatted = deliveryDate.toLocaleDateString("en-PK", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric"
    });

    const orderData = {
      orderId,
      date: now.toLocaleDateString("en-PK", { month: "long", day: "numeric", year: "numeric" }),
      estimatedDelivery: deliveryFormatted,
      client: shippingProfile,
      deliveryMethod: this.selectedDelivery,
      paymentMethod: this.selectedPaymentMethod === "card" ? "Credit/Debit Card (Encrypted Vault)" : (this.selectedPaymentMethod === "cod" ? "White-Glove Cash on Delivery (Pakistan Nationwide)" : "Bank Alfalah / HBL Direct Remittance"),
      items: [...cart],
      financials: {
        subtotalPKR: totals.subtotal,
        discountPKR: totals.discount,
        taxPKR: totals.tax,
        deliveryCostPKR: this._computedDeliveryCost || 0,
        totalPKR: this._computedCheckoutTotal || totals.total,
        currencyUsed: window.store.getCurrency()
      }
    };

    window.store.saveOrder(orderData);
    window.store.clearCart();
    this.renderOrderConfirmation(orderData);
  }

  renderOrderConfirmation(order) {
    const checkoutView = document.getElementById("checkout-view");
    const confirmationView = document.getElementById("order-confirmation-view");
    const container = document.getElementById("order-confirmation-container");

    if (checkoutView) checkoutView.classList.add("hidden");
    if (confirmationView) confirmationView.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (!container) return;

    container.innerHTML = `
      <div class="max-w-3xl mx-auto bg-stone-50 dark:bg-[#141416] rounded-3xl border border-stone-200 dark:border-stone-800 p-8 sm:p-12 shadow-2xl">
        
        <!-- Header with animated gold badge -->
        <div class="text-center pb-8 border-b border-stone-200 dark:border-stone-800">
          <div class="w-16 h-16 rounded-full bg-[#D4AF37]/15 border-2 border-[#D4AF37] mx-auto flex items-center justify-center text-[#D4AF37] mb-4 shadow-[0_0_30px_rgba(212,175,55,0.3)]">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
          </div>
          <span class="text-xs uppercase tracking-widest text-[#B88E28] dark:text-[#D4AF37] font-semibold">Communique Officiel</span>
          <h2 class="font-serif-luxury text-3xl sm:text-4xl font-medium text-stone-900 dark:text-stone-50 mt-1">Order Confirmed in Pakistani Rupees</h2>
          <p class="text-sm text-stone-600 dark:text-stone-400 mt-2">
            Order Reference: <strong class="font-mono text-stone-900 dark:text-stone-100">${order.orderId}</strong>
          </p>
          <p class="text-xs text-stone-500 mt-1">An official consignment dispatch dossier has been sent to <strong>${order.client.email}</strong>.</p>
        </div>

        <!-- Order Meta Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 py-8 border-b border-stone-200 dark:border-stone-800 text-xs">
          <div>
            <span class="text-stone-400 uppercase tracking-wider font-semibold block mb-1">Estimated Arrival</span>
            <span class="font-semibold text-stone-900 dark:text-stone-100 text-sm">${order.estimatedDelivery}</span>
            <span class="text-stone-500 block mt-0.5">${order.deliveryMethod.name}</span>
          </div>
          <div>
            <span class="text-stone-400 uppercase tracking-wider font-semibold block mb-1">Destination</span>
            <span class="font-semibold text-stone-900 dark:text-stone-100 block text-sm">${order.client.fullName}</span>
            <span class="text-stone-500 block truncate">${order.client.address}, ${order.client.city}</span>
            <span class="text-stone-500 block">${order.client.country}</span>
          </div>
          <div>
            <span class="text-stone-400 uppercase tracking-wider font-semibold block mb-1">Payment Status</span>
            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/20 text-xs">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Confirmed / Authorized
            </span>
            <span class="text-stone-500 block mt-1">${order.paymentMethod}</span>
          </div>
        </div>

        <!-- Line Items Invoice Breakdown -->
        <div class="py-8 border-b border-stone-200 dark:border-stone-800">
          <h4 class="font-serif-luxury text-xl font-medium text-stone-900 dark:text-stone-100 mb-4">Artisanal Acquisitions</h4>
          <div class="space-y-4">
            ${order.items.map(item => `
              <div class="flex items-center justify-between gap-4 text-xs">
                <div class="flex items-center gap-3">
                  <img src="${item.image}" alt="${item.name}" class="w-12 h-14 object-cover rounded-lg bg-stone-200 dark:bg-stone-800 shrink-0"/>
                  <div>
                    <h5 class="font-semibold text-stone-900 dark:text-stone-100 text-sm">${item.name}</h5>
                    <p class="text-stone-400 text-[11px]">${item.color !== "Standard" ? item.color : ""} ${item.size !== "Standard" ? `• ${item.size}` : ""} • Qty: ${item.quantity}</p>
                  </div>
                </div>
                <span class="font-semibold text-stone-900 dark:text-stone-100 text-sm">
                  ${window.store.formatPrice(item.unitPrice * item.quantity)}
                </span>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- Financial Breakdown in PKR -->
        <div class="py-6 border-b border-stone-200 dark:border-stone-800 text-xs space-y-2">
          <div class="flex justify-between text-stone-600 dark:text-stone-400">
            <span>Subtotal</span>
            <span>${window.store.formatPrice(order.financials.subtotalPKR)}</span>
          </div>
          ${order.financials.discountPKR > 0 ? `
            <div class="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
              <span>Privilège Reduction</span>
              <span>-${window.store.formatPrice(order.financials.discountPKR)}</span>
            </div>
          ` : ""}
          <div class="flex justify-between text-stone-600 dark:text-stone-400">
            <span>White-Glove Shipping</span>
            <span>${order.financials.deliveryCostPKR === 0 ? "Complimentary" : window.store.formatPrice(order.financials.deliveryCostPKR)}</span>
          </div>
          <div class="flex justify-between text-stone-600 dark:text-stone-400">
            <span>Packaging & Duties (5%)</span>
            <span>${window.store.formatPrice(order.financials.taxPKR)}</span>
          </div>
          <div class="pt-3 border-t border-stone-200 dark:border-stone-800 flex justify-between text-base font-semibold text-stone-900 dark:text-stone-50">
            <span>Total Invoiced</span>
            <span class="text-2xl font-sans text-[#B88E28] dark:text-[#D4AF37] font-bold">${window.store.formatPrice(order.financials.totalPKR)}</span>
          </div>
        </div>

        <!-- WhatsApp Instant Order Confirmation Button for Direct Merchant Dispatch -->
        <div class="pt-6 no-print">
          <a 
            href="${(() => {
              const itemsList = order.items.map(it => `• ${it.name} (${it.color !== 'Standard' ? it.color : ''} ${it.size !== 'Standard' ? it.size : ''}) x${it.quantity} - Rs. ${(it.unitPrice * it.quantity).toLocaleString()}`).join('%0A');
              const msg = `*⚜️ NAYI ORDER CONFIRMATION (%23${order.orderId})*%0A%0A*Customer Name:* ${encodeURIComponent(order.client.fullName)}%0A*Phone:* ${encodeURIComponent(order.client.phone)}%0A*Address:* ${encodeURIComponent(order.client.address + ', ' + order.client.city)}%0A*Payment Method:* ${encodeURIComponent(order.paymentMethod)}%0A%0A*Products Ordered:*%0A${itemsList}%0A%0A*Total Amount:* Rs. ${order.financials.totalPKR.toLocaleString()}%0A%0A_Assalam-o-Alaikum! Please confirm my order dispatch._`;
              return `https://api.whatsapp.com/send?text=${msg}`;
            })()}" 
            target="_blank" 
            rel="noopener noreferrer"
            class="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm tracking-wide flex items-center justify-center gap-3 shadow-xl hover:shadow-emerald-600/30 transition-all transform hover:-translate-y-0.5"
          >
            <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
            <span>📲 Send Order Copy to WhatsApp</span>
          </a>
        </div>

        <!-- Actions -->
        <div class="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 no-print">
          <button 
            type="button" 
            onclick="window.print()"
            class="w-full sm:w-auto px-6 py-3 rounded-xl border border-stone-300 dark:border-stone-700 hover:border-[#D4AF37] text-stone-800 dark:text-stone-200 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
            Print Luxury Invoice
          </button>

          <button 
            type="button" 
            onclick="window.checkoutController.finishAndContinueShopping()"
            class="w-full sm:w-auto px-8 py-3.5 rounded-xl gold-gradient-bg text-black font-semibold text-xs uppercase tracking-widest shadow-xl transition-all btn-shimmer"
          >
            Continue Exploring Collections
          </button>
        </div>

      </div>
    `;
  }

  finishAndContinueShopping() {
    const confirmationView = document.getElementById("order-confirmation-view");
    const catalogView = document.getElementById("catalog-view");
    if (confirmationView) confirmationView.classList.add("hidden");
    if (catalogView) catalogView.classList.remove("hidden");
    window.location.hash = "";
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.UI.renderProductsGrid();
  }
}

window.checkoutController = new CheckoutController();
