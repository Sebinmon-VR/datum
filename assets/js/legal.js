/* Fill company details on legal pages from config.js. */
(function () {
  const cfg = window.DATUM_CONFIG;
  document.querySelectorAll("[data-company]").forEach((el) => (el.textContent = cfg.companyLegalName));
  document.querySelectorAll("[data-address]").forEach((el) => (el.textContent = cfg.companyAddress));
  document.querySelectorAll("[data-email]").forEach((el) => {
    el.textContent = cfg.contactEmail;
    el.href = "mailto:" + cfg.contactEmail;
  });
})();
