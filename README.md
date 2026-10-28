# Datum — the compliant data marketplace

A static website for a two-sided data marketplace:

- **Buyers** access datasets through a usage-based API, license complete datasets, or request custom data collection.
- **Data partners** list their datasets and earn a share of the revenue they generate.

It's plain HTML, CSS and JavaScript with no build step, so it runs on GitHub Pages as-is.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home: access options, API overview, process, categories, featured datasets, compliance, partner program, FAQ |
| `datasets.html` | Catalog with search, category filters and sorting |
| `dataset.html?id=…` | Dataset detail: overview, schema preview, API and licence pricing |
| `pricing.html` | Plans, monthly cost calculator, per-dataset rates |
| `request.html` | Buyer request form (custom data, API access, full licence, sample) with compliance questions |
| `partners.html` | Data Partner Program: models, integration methods, revenue estimator, application form |
| `compliance.html` | Principles, review criteria, frameworks, prohibited data, buyer obligations |
| `privacy.html`, `terms.html` | **Draft** legal templates. Have a lawyer review them before launch |

## Customise

All business settings are in **`assets/js/config.js`**:

- Brand name, contact email, company legal name and address.
- `formEndpoint`: where form submissions are sent (see below).
- `api.freeRequests` (currently 100 a month) and `api.volumeTiers` (15% off from 100K requests, 30% off from 1M).
- `partnerRevenueShare` (currently 70%) and `partnerPayoutTerms`.

Catalog listings live in **`assets/js/datasets.js`** and are currently **sample data**. Each dataset has an `apiPrice` (USD per request) and a `price` (full licence). Add a `buyUrl`, such as a Stripe Payment Link, to show a "Buy now" button.

Design tokens (colours, fonts, radius) are at the top of **`assets/css/styles.css`**. The header and footer are in **`assets/js/layout.js`**.

## Receiving form submissions

GitHub Pages can't run server code, so the request and partner forms need a form service:

1. Create a free form at [formspree.io](https://formspree.io), or a similar service.
2. Paste the endpoint URL into `formEndpoint` in `assets/js/config.js`.

Until you do this, both forms open the visitor's email client with the submission pre-filled and addressed to `contactEmail`.

> The API shown on the site (`api.datum.example`), API keys, usage billing and partner payouts are **marketing content only**. They need a real backend before launch.

## Run locally

Open `index.html` directly in a browser, or serve the folder:

```bash
npx serve .
```

## Deploy to GitHub Pages

1. Push this folder to a GitHub repository.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, then branch **`main`** and folder **`/ (root)`**.
4. The site goes live at `https://<username>.github.io/<repo>/` within a minute or two.

All links are relative, so the site works under a repository sub-path.
