/**
 * Site-wide settings. Edit these before going live.
 *
 * formEndpoint — GitHub Pages can't run server code, so form submissions go to
 * a form backend. Create a free form at https://formspree.io (or Basin, Getform,
 * etc.) and paste its endpoint URL here, e.g. "https://formspree.io/f/abcdwxyz".
 * If left empty, the request form falls back to opening the user's email client
 * with the request pre-filled and addressed to contactEmail.
 */
window.DATUM_CONFIG = {
  brand: "Datum",
  tagline: "Compliant data, on demand.",
  contactEmail: "requests@example.com",
  formEndpoint: "",
  companyLegalName: "Datum Data Services",
  companyAddress: "Your registered address",

  // Share of gross sales paid to data partners (partners.html), and payout terms.
  partnerRevenueShare: 0.7,
  partnerPayoutTerms: "monthly, net 30",

  // API pricing shown on dataset pages and the pricing calculator.
  // Each dataset sets its own per-request rate (apiPrice in datasets.js);
  // volume discounts apply to the part of monthly usage inside each tier.
  api: {
    baseUrl: "https://api.datum.example/v1",
    freeRequests: 100,
    volumeTiers: [
      { upTo: 100000, discount: 0 },
      { upTo: 1000000, discount: 0.15 },
      { upTo: Infinity, discount: 0.3 },
    ],
  },
};
