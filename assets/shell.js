// Buzizi Foundation — shared shell (nav + footer) + helpers
// Lightweight, no React. Renders into [data-shell="nav"] and [data-shell="footer"].

(function () {
  const NAV_ITEMS = [
    { href: "/", label: "Home", key: "home" },
    { href: "/about", label: "About", key: "about" },
    { href: "/programs", label: "Programs", key: "programs" },
    { href: "/get-involved", label: "Get Involved", key: "involved" },
    {
      label: "Resources",
      key: "resources",
      dropdown: [
        { href: "/programs#fund", label: "Programs — What We Fund", desc: "Where every dollar goes" },
        { href: "/partners", label: "Our Partners", desc: "Organizations standing with us" },
        { href: "/reports", label: "Our Reports", desc: "Annual impact & financials" },
        { href: "/apply", label: "Claude Application", desc: "Apply for support or scholarship" },
      ],
    },
    { href: "/contact", label: "Contact", key: "contact" },
  ];

  function svg(d, viewBox = "0 0 24 24") {
    return `<svg viewBox="${viewBox}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
  }

  const ICONS = {
    chevron: svg(`<polyline points="6 9 12 15 18 9"/>`),
    arrowRight: svg(`<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>`),
    heart: svg(`<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>`),
    spark: svg(`<path d="M12 2v6m0 8v6m-10-10h6m8 0h6"/>`),
    mail: svg(`<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22 6 12 13 2 6"/>`),
    instagram: svg(`<rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>`),
    youtube: svg(`<path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>`),
    linkedin: svg(`<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>`),
    map: svg(`<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>`),
    phone: svg(`<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>`),
    book: svg(`<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>`),
    grad: svg(`<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>`),
    home: svg(`<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>`),
    hands: svg(`<path d="M2 12h6l2-3 2 3 2-3 2 3 2-3 2 3v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z"/>`),
    sun: svg(`<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>`),
    users: svg(`<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>`),
    play: svg(`<polygon points="6 4 20 12 6 20 6 4" fill="currentColor"/>`),
    check: svg(`<polyline points="20 6 9 17 4 12"/>`),
  };

  window.BFIcons = ICONS;

  function renderLogo() {
    // Option 01 — Archivo + Sun Mark. Small Rwandan sun glyph + bold all-caps wordmark.
    // Color split: orange "CLAUDE BUZIZI" / black "FOUNDATION" (auto-inverts in dark footer).
    const mark = `
      <svg class="bf-logo-svg" viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="16" r="5" class="bf-logo-disc"/>
        <g class="bf-logo-rays" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round">
          <line x1="16" y1="3"  x2="16" y2="6"/>
          <line x1="16" y1="26" x2="16" y2="29"/>
          <line x1="3"  y1="16" x2="6"  y2="16"/>
          <line x1="26" y1="16" x2="29" y2="16"/>
          <line x1="6.8"  y1="6.8"  x2="9"    y2="9"/>
          <line x1="23"   y1="23"   x2="25.2" y2="25.2"/>
          <line x1="6.8"  y1="25.2" x2="9"    y2="23"/>
          <line x1="23"   y1="9"    x2="25.2" y2="6.8"/>
        </g>
      </svg>`;
    return `
      <a href="/" class="bf-logo" aria-label="The Claude Buzizi Foundation home">
        <span class="bf-logo-mark">${mark}</span>
        <span class="bf-logo-text">
          <strong>Claude Buzizi</strong>
          <span>Foundation</span>
        </span>
      </a>`;
  }

  function renderNav(activeKey) {
    const links = NAV_ITEMS.map((item) => {
      const isActive = item.key === activeKey ? "active" : "";
      if (item.dropdown) {
        const isResourceActive =
          ["programs-fund", "partners", "reports", "application"].includes(activeKey)
            ? "active"
            : "";
        const items = item.dropdown
          .map(
            (d) =>
              `<a href="${d.href}">${d.label}<small>${d.desc}</small></a>`
          )
          .join("");
        return `
          <div class="bf-dropdown">
            <a class="bf-nav-link ${isResourceActive}" href="#" tabindex="0">
              ${item.label} ${ICONS.chevron}
            </a>
            <div class="bf-dropdown-menu">${items}</div>
          </div>`;
      }
      return `<a class="bf-nav-link ${isActive}" href="${item.href}">${item.label}</a>`;
    }).join("");

    return `
      <nav class="bf-nav">
        <div class="bf-nav-inner">
          ${renderLogo()}
          <div class="bf-nav-links">${links}</div>
          <a class="bf-btn bf-btn-primary bf-btn-sm" href="/giving">${ICONS.heart} Donate</a>
        </div>
      </nav>`;
  }

  function renderFooter() {
    const year = new Date().getFullYear();
    return `
      <footer class="bf-footer">
        <div class="bf-container">
          <div class="bf-footer-grid">
            <div class="bf-footer-brand">
              ${renderLogo()}
              <p>Turning business income into meals, scholarships, and income-building skills for the people who need them most. Feed. Educate. Equip.</p>
              <a class="bf-btn bf-btn-primary" href="/giving">${ICONS.heart} Make a Donation</a>
            </div>
            <div>
              <h4>Foundation</h4>
              <ul>
                <li><a href="/about">About Us</a></li>
                <li><a href="/programs">Programs</a></li>
                <li><a href="/reports">Annual Reports</a></li>
                <li><a href="/partners">Our Partners</a></li>
              </ul>
            </div>
            <div>
              <h4>Take Action</h4>
              <ul>
                <li><a href="/giving">Give</a></li>
                <li><a href="/get-involved">Volunteer</a></li>
                <li><a href="/apply">Apply for Support</a></li>
                <li><a href="/contact">Partner with Us</a></li>
              </ul>
            </div>
            <div>
              <h4>Connect</h4>
              <ul>
                <li><a href="mailto:hello@buzizifoundation.org">${ICONS.mail} hello@buzizifoundation.org</a></li>
                <li><a href="https://claudebuzizi.com" target="_blank" rel="noopener">${ICONS.spark} claudebuzizi.com</a></li>
                <li><a href="#">${ICONS.instagram} @buzizifoundation</a></li>
                <li><a href="#">${ICONS.youtube} YouTube</a></li>
              </ul>
            </div>
          </div>
          <div class="bf-footer-bottom">
            <span>© ${year} Buzizi Foundation. All rights reserved.</span>
            <div style="display:flex; gap: 24px;">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Use</a>
              <a href="#">Financials</a>
            </div>
            <span>Sister org of <a href="https://claudebuzizi.com" target="_blank" rel="noopener">claudebuzizi.com</a></span>
          </div>
        </div>
      </footer>`;
  }

  // Mount
  function mount() {
    const navMount = document.querySelector('[data-shell="nav"]');
    if (navMount) {
      const active = navMount.dataset.active || "";
      navMount.outerHTML = renderNav(active);
    }
    const footMount = document.querySelector('[data-shell="footer"]');
    if (footMount) {
      footMount.outerHTML = renderFooter();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
