/* Data Partner Program page: revenue-share text, revenue estimator, partner application. */
(function () {
  const cfg = window.DATUM_CONFIG;
  const U = window.DATUM_UTIL;
  const share = cfg.partnerRevenueShare;
  const pct = Math.round(share * 100) + "%";

  document.querySelectorAll("[data-share]").forEach((el) => (el.textContent = pct));
  document.querySelectorAll("[data-share-text]").forEach((el) => (el.textContent = `${pct} partner share`));
  document.querySelectorAll("[data-terms]").forEach((el) => {
    const t = cfg.partnerPayoutTerms;
    el.textContent = t.charAt(0).toUpperCase() + t.slice(1);
  });

  // Estimator. Sliders are logarithmic so small and large partners both get useful resolution.
  const reqEl = document.getElementById("est-req");
  const rateEl = document.getElementById("est-rate");
  const dlEl = document.getElementById("est-dl");
  const dlpEl = document.getElementById("est-dlp");
  const round2 = (x) => {
    const mag = Math.pow(10, Math.floor(Math.log10(x)) - 1);
    return Math.round(x / mag) * mag;
  };
  const records = () => round2(Math.pow(10, 3 + (reqEl.value / 100) * 4));
  const rate = () => round2(Math.pow(100, rateEl.value / 100));

  function update() {
    const req = records(), r = rate(), dls = Number(dlEl.value), dlp = Math.max(0, Number(dlpEl.value) || 0);
    const apiGross = (req / cfg.api.recordsPerUnit) * r, dlGross = dls * dlp;
    const payout = (apiGross + dlGross) * share;
    reqEl.style.setProperty("--fill", reqEl.value + "%");
    rateEl.style.setProperty("--fill", rateEl.value + "%");
    dlEl.style.setProperty("--fill", (dlEl.value / dlEl.max) * 100 + "%");
    document.getElementById("est-req-out").textContent = req.toLocaleString("en-US");
    document.getElementById("est-rate-out").textContent = U.money(r);
    document.getElementById("est-dl-out").textContent = dls;
    document.getElementById("est-api").textContent = U.money(apiGross);
    document.getElementById("est-dls").textContent = U.money(dlGross);
    document.getElementById("est-total").textContent = U.money(payout);
    document.getElementById("est-year").textContent = `≈ ${U.money(payout * 12)} per year`;
  }
  [reqEl, rateEl, dlEl, dlpEl].forEach((el) => el.addEventListener("input", update));
  update();

  // Application form.
  const form = document.getElementById("partner-form");
  document.getElementById("s-cat").innerHTML =
    '<option value="">Select a category</option>' +
    window.DATUM_CATEGORIES.map((c) => `<option>${U.escape(c.name)}</option>`).join("") +
    "<option>Other</option>";

  const LABELS = {
    reference: "Reference", name: "Name", email: "Email", company: "Company", country: "Country",
    provider_type: "Partner type", dataset_name: "Dataset", category: "Category", description: "Description",
    source: "Collection method", volume: "Volume", frequency: "Update frequency", personal_data: "Personal data",
    sample_url: "Sample / docs", delivery: "Integration", earning_model: "Partnership model",
    price_expectation: "Price expectation", attestations: "Attestations", submitted_at: "Submitted",
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (form._gotcha.value) return;
    if (!U.validateForm(form)) return;

    const ref = U.makeRef("DP");
    const data = { reference: ref, form: "Partner application" };
    for (const [k, v] of new FormData(form).entries()) {
      if (k === "_gotcha" || k.startsWith("attest_")) continue;
      data[k] = data[k] ? `${data[k]}, ${v}` : v;
    }
    data.attestations = "Holds licensing rights; lawfully collected; accepted Terms & Privacy Policy";
    data.submitted_at = new Date().toISOString();

    const btn = document.getElementById("partner-submit");
    btn.disabled = true;
    btn.textContent = "Submitting…";
    try {
      const how = await U.submit(data, `Partner application ${ref} — ${data.dataset_name}`, LABELS);
      form.hidden = true;
      document.getElementById("partner-ref").textContent = ref;
      if (how === "email") {
        document.getElementById("partner-msg").textContent =
          `Your email client should now open with your application pre-filled. Please send the message to complete your submission. If it does not open, contact ${cfg.contactEmail} quoting your reference number.`;
      }
      const s = document.getElementById("partner-success");
      s.classList.add("show");
      s.scrollIntoView({ behavior: "smooth", block: "center" });
    } catch (err) {
      btn.disabled = false;
      btn.textContent = "Submit application";
      alert(`We were unable to submit your application. Please try again or contact ${cfg.contactEmail}.`);
    }
  });
})();
