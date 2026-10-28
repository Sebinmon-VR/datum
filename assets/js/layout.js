/* Shared header, footer and icons — injected on every page so they're edited in one place. */
(function () {
  const cfg = window.DATUM_CONFIG;

  const ICONS = {
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    arrow: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    menu: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    close: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>',
    doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/></svg>',
    eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3l18 18"/><path d="M10.6 5.1A10 10 0 0 1 12 5c6 0 10 7 10 7a17 17 0 0 1-3.1 3.9M6.6 6.6A17 17 0 0 0 2 12s4 7 10 7a9.7 9.7 0 0 0 5.4-1.6"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/></svg>',
    layers: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 2 10 5-10 5L2 7z"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/></svg>',
    zap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9z"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>',
  };
  window.DATUM_ICONS = ICONS;

  const NAV = [
    { href: "datasets.html", label: "Datasets" },
    { href: "pricing.html", label: "Pricing" },
    { href: "index.html#api", label: "API" },
    { href: "partners.html", label: "Partner with us" },
    { href: "compliance.html", label: "Compliance" },
  ];

  const page = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  const brand = `<a class="brand" href="index.html" aria-label="${cfg.brand} home"><span class="brand-mark"><span></span></span>${cfg.brand}</a>`;

  const header = document.getElementById("site-header");
  if (header) {
    header.className = "site-header";
    header.innerHTML = `
      <nav class="container nav" aria-label="Main">
        ${brand}
        <ul class="nav-links" id="nav-links">
          ${NAV.map((n) => `<li><a href="${n.href}"${n.href === page ? ' aria-current="page"' : ""}>${n.label}</a></li>`).join("")}
        </ul>
        <div class="nav-actions">
          <a class="btn btn-ghost btn-sm" href="pricing.html">Get API key</a>
          <a class="btn btn-primary btn-sm" href="request.html">Request data</a>
          <button class="menu-btn" id="menu-btn" aria-label="Open menu" aria-expanded="false" aria-controls="nav-links">${ICONS.menu}</button>
        </div>
      </nav>`;

    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const btn = document.getElementById("menu-btn");
    const links = document.getElementById("nav-links");
    btn.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(open));
      btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      btn.innerHTML = open ? ICONS.close : ICONS.menu;
    });
    links.addEventListener("click", (e) => {
      if (e.target.closest("a") && links.classList.contains("open")) btn.click();
    });
  }

  const footer = document.getElementById("site-footer");
  if (footer) {
    footer.className = "site-footer";
    footer.innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <div class="footer-about">
            ${brand}
            <p>The compliant data marketplace. Access datasets through our API, license complete datasets, or commission custom data collection.</p>
          </div>
          <div>
            <h4>Product</h4>
            <ul>
              <li><a href="datasets.html">Dataset catalog</a></li>
              <li><a href="index.html#api">Data API</a></li>
              <li><a href="pricing.html">Pricing</a></li>
              <li><a href="request.html">Custom requests</a></li>
            </ul>
          </div>
          <div>
            <h4>Partners</h4>
            <ul>
              <li><a href="partners.html">Data Partner Program</a></li>
              <li><a href="partners.html#how">Program overview</a></li>
              <li><a href="partners.html#apply">Apply to partner</a></li>
            </ul>
          </div>
          <div>
            <h4>Trust</h4>
            <ul>
              <li><a href="compliance.html">Compliance</a></li>
              <li><a href="compliance.html#prohibited">Prohibited data</a></li>
              <li><a href="privacy.html">Privacy policy</a></li>
              <li><a href="terms.html">Terms of service</a></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:${cfg.contactEmail}">${cfg.contactEmail}</a></li>
              <li><a href="request.html">Submit a request</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© ${new Date().getFullYear()} ${cfg.companyLegalName}. All rights reserved.</span>
          <span class="mono">GDPR · CCPA · DPDP · EU AI Act</span>
        </div>
      </div>`;
  }

  // Replace <i data-icon="name"></i> placeholders with inline SVG.
  document.querySelectorAll("[data-icon]").forEach((el) => {
    el.outerHTML = ICONS[el.dataset.icon] || "";
  });
})();

window.DATUM_UTIL = {
  escape(s) {
    return String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  },
  // Money with enough decimals for sub-cent API rates ($0.0015, $0.015) but none for whole amounts.
  money(n) {
    if (n === 0) return "$0";
    if (n < 1 && Math.round(n * 100) !== n * 100) {
      const [i, d] = n.toFixed(4).replace(/0+$/, "").split(".");
      return "$" + i + "." + d.padEnd(2, "0");
    }
    if (n < 100) return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return "$" + Math.round(n).toLocaleString("en-US");
  },
  formatPrice(ds) {
    if (ds.price == null) return "Custom quote";
    return this.money(ds.price);
  },
  // The lowest entry price for a dataset: per-request API rate if it has one, else the download price.
  startingPrice(ds) {
    return ds.apiPrice ?? ds.price ?? Infinity;
  },
  // Monthly API cost after the free allowance, with tiered volume discounts.
  apiCost(rate, requests) {
    const api = window.DATUM_CONFIG.api;
    let billable = Math.max(0, requests - api.freeRequests), from = 0, total = 0;
    for (const t of api.volumeTiers) {
      const n = Math.min(billable, t.upTo - from);
      if (n <= 0) break;
      total += n * rate * (1 - t.discount);
      billable -= n;
      from = t.upTo;
    }
    return total;
  },
  makeRef(prefix) {
    const n = crypto.getRandomValues(new Uint32Array(1))[0].toString(36).toUpperCase().padStart(6, "0").slice(0, 6);
    return `${prefix}-${n}`;
  },
  // Send a form to config.formEndpoint, or fall back to a pre-filled email.
  // Resolves "sent" or "email"; rejects if the endpoint returns an error.
  async submit(data, subject, labels) {
    const cfg = window.DATUM_CONFIG;
    if (cfg.formEndpoint) {
      const res = await fetch(cfg.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...data, _subject: subject, _replyto: data.email }),
      });
      if (!res.ok) throw new Error("HTTP " + res.status);
      return "sent";
    }
    const body = Object.keys(labels).filter((k) => data[k]).map((k) => `${labels[k]}: ${data[k]}`).join("\n");
    location.href = `mailto:${cfg.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    return "email";
  },
  // Shared validation for .field blocks inside a form; returns true when all visible required fields pass.
  validateForm(form) {
    const check = (field) => {
      const inputs = [...field.querySelectorAll("input, select, textarea")].filter((i) => i.name !== "_gotcha");
      let ok;
      if (field.dataset.allChecked !== undefined) {
        ok = inputs.every((i) => i.checked);
      } else if (inputs.length && inputs[0].type === "radio") {
        ok = !inputs.some((i) => i.required) || inputs.some((i) => i.checked);
      } else if (inputs.length && inputs[0].type === "checkbox" && field.dataset.minOne !== undefined) {
        ok = inputs.some((i) => i.checked);
      } else {
        // Browsers skip minlength for script-set values, so check it explicitly.
        ok = inputs.every((i) => i.checkValidity() && !(i.required && i.minLength > 0 && i.value.trim().length < i.minLength));
      }
      field.classList.toggle("invalid", !ok);
      return ok;
    };
    if (!form._validationWired) {
      form._validationWired = true;
      const recheck = (e) => {
        const f = e.target.closest(".field");
        if (f && f.classList.contains("invalid")) check(f);
      };
      form.addEventListener("input", recheck);
      form.addEventListener("change", recheck);
    }
    const fields = [...form.querySelectorAll(".field")].filter(
      (f) => !f.closest("[hidden]") && (f.querySelector("[required]") || f.dataset.minOne !== undefined)
    );
    const bad = fields.filter((f) => !check(f));
    if (bad.length) {
      bad[0].scrollIntoView({ behavior: "smooth", block: "center" });
      const first = bad[0].querySelector("input, select, textarea");
      if (first) first.focus({ preventScroll: true });
    }
    return bad.length === 0;
  },
  datasetCard(ds) {
    const e = this.escape;
    const price = ds.apiPrice != null
      ? `<span class="price"><small>from</small> ${this.money(ds.apiPrice)} <small>/ request</small></span>`
      : `<span class="price">${this.formatPrice(ds)}</span>`;
    return `
      <a class="card card-link ds-card" href="dataset.html?id=${encodeURIComponent(ds.id)}">
        <div class="ds-top">
          <span class="tag">${e(ds.category)}</span>
          ${ds.apiPrice != null ? '<span class="tag tag-accent">API</span>' : '<span class="tag tag-ok">Licensed</span>'}
        </div>
        <h3>${e(ds.title)}</h3>
        <p class="muted">${e(ds.summary)}</p>
        <dl class="ds-meta">
          <div><dt>Records</dt><dd>${e(ds.records)}</dd></div>
          <div><dt>Coverage</dt><dd>${e(ds.coverage)}</dd></div>
          <div><dt>Refresh</dt><dd>${e(ds.refresh)}</dd></div>
        </dl>
        <div class="ds-foot">
          ${price}
          <span class="subtle">View details →</span>
        </div>
      </a>`;
  },
};
