/* Data request form: prefill from URL, conditional fields, and submission. */
(function () {
  const cfg = window.DATUM_CONFIG;
  const U = window.DATUM_UTIL;
  const form = document.getElementById("request-form");
  const datasetField = document.getElementById("dataset-field");
  const datasetSel = document.getElementById("dataset");
  const categorySel = document.getElementById("category");
  const pdNotice = document.getElementById("pd-notice");

  datasetSel.innerHTML =
    '<option value="">Select a dataset</option>' +
    window.DATUM_DATASETS.map((d) => `<option value="${U.escape(d.id)}">${U.escape(d.title)}</option>`).join("");
  categorySel.innerHTML =
    '<option value="">Select a category</option>' +
    window.DATUM_CATEGORIES.map((c) => `<option>${U.escape(c.name)}</option>`).join("") +
    "<option>Other</option>";

  document.getElementById("deadline").min = new Date().toISOString().slice(0, 10);

  // Catalog orders must name a dataset; custom requests must describe the data.
  function syncType() {
    const t = form.request_type.value;
    datasetField.hidden = t === "Custom data";
    datasetSel.required = t === "Catalog dataset";
    form.description.required = t === "Custom data";
  }

  function syncPersonal() {
    const v = form.personal_data.value;
    pdNotice.hidden = !(v === "Yes" || v === "Not sure");
  }

  // Prefill from query string (links from catalog, dataset and pricing pages).
  const p = new URLSearchParams(location.search);
  const ds = window.DATUM_DATASETS.find((d) => d.id === p.get("dataset"));
  if (p.get("type") === "api") form.request_type.value = "API access";
  if (ds) {
    if (p.get("sample")) form.request_type.value = "Free sample";
    else if (p.get("type") !== "api") form.request_type.value = "Catalog dataset";
    datasetSel.value = ds.id;
    categorySel.value = ds.category;
  }
  if (p.get("category")) categorySel.value = p.get("category");
  if (p.get("topic")) form.description.value = p.get("topic");
  syncType();
  syncPersonal();

  form.addEventListener("change", (e) => {
    if (e.target.name === "request_type") syncType();
    if (e.target.name === "personal_data") syncPersonal();
    if (e.target === datasetSel) {
      const d = window.DATUM_DATASETS.find((x) => x.id === datasetSel.value);
      if (d) categorySel.value = d.category;
    }
  });

  function collect() {
    const fd = new FormData(form);
    const data = { form: "Data request" };
    for (const [k, v] of fd.entries()) {
      if (k === "_gotcha" || k.startsWith("attest_")) continue;
      data[k] = data[k] ? `${data[k]}, ${v}` : v;
    }
    const d = window.DATUM_DATASETS.find((x) => x.id === data.dataset);
    if (d) data.dataset = `${d.title} (${d.id})`;
    data.attestations = "Lawful purpose; no re-identification or resale; agreed to Terms & Privacy";
    data.submitted_at = new Date().toISOString();
    return data;
  }

  const LABELS = {
    reference: "Reference", name: "Name", email: "Email", company: "Company", country: "Country",
    request_type: "Request type", dataset: "Dataset", category: "Category", coverage: "Coverage",
    description: "Description", volume: "Volume", timerange: "Time range", formats: "Formats",
    frequency: "Frequency", budget: "Budget", deadline: "Needed by", purpose: "Intended use",
    purpose_detail: "Use details", personal_data: "Personal data", jurisdictions: "Jurisdictions",
    needs_dpa: "Needs NDA/DPA", attestations: "Attestations", submitted_at: "Submitted",
  };

  function showSuccess(ref, viaEmail) {
    form.hidden = true;
    document.getElementById("ref").textContent = ref;
    if (viaEmail) {
      document.getElementById("success-msg").textContent =
        `Your email client should now open with your request pre-filled. Please send the message to complete your submission. If it does not open, contact ${cfg.contactEmail} quoting your reference number.`;
    }
    const s = document.getElementById("success");
    s.classList.add("show");
    s.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (form._gotcha.value) return; // bot
    if (!U.validateForm(form)) return;

    const ref = U.makeRef("DR");
    const data = { reference: ref, ...collect() };
    const btn = document.getElementById("submit");
    btn.disabled = true;
    btn.textContent = "Submitting…";
    try {
      const how = await U.submit(data, `Data request ${ref} — ${data.company}`, LABELS);
      showSuccess(ref, how === "email");
    } catch (err) {
      btn.disabled = false;
      btn.textContent = "Submit request";
      alert(`We were unable to submit your request. Please try again or contact ${cfg.contactEmail}.`);
    }
  });
})();
