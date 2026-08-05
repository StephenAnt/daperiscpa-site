// ============================================================
// CPA Service Tiers — pricing calculator
// ============================================================

// ============================================================
// TIER SUBHEADINGS — identical across individual and business
// ============================================================
const TIER_DESC = {
  compliant: "Just the return, filed right",
  proactive: "Plan ahead, not just file",
  strategic: "Books and taxes, fully handled",
};

// ============================================================
// SCOPE LINE — sits under the toggle, sets expectations before
// anyone reads the cards or compares the two prices.
// ============================================================
const SCOPE_LINE = {
  individual: {
    who:  "For Individuals and Single-Member LLCs",
    form: "Form 1040 with Schedule C",
    tag:  "Individual / Single-Member LLC",
  },
  business: {
    who:  "For S-Corporations and Partnerships",
    form: "Form 1120-S or 1065, plus K-1s",
    tag:  "S-Corp / Partnership",
  },
};

// ============================================================
// FEATURE LIST — one list, shared by both ladders.
// Every row is identical across both ladders. Entity scope — and
// therefore the price difference — is carried entirely by the
// scope line above the cards.
// ============================================================
const FEATURES = [
  { label: "Federal &amp; State Tax Return Preparation" },
  { label: "Quarterly Tax Estimates" },
  { label: "Tax Return Review Video" },
  { label: "Secure Online Portal &amp; Document Storage" },
  { label: "Year-Round Access — Questions About Your Filed Return" },
  { label: "Tax Notice Review &amp; Explanation" },
  { label: "Tax Notice Response Drafted &amp; Sent" },
  { label: "Forward-Looking Tax Advice &amp; Planning Questions" },
  { label: "Annual Tax Forecasting / Planning Meeting" },
  { label: "Payroll Setup with ADP" },
  { label: "Bookkeeping &amp; Monthly Financials" },
  { label: "Forms 1099 Filing" },
  { label: "KPI Analysis &amp; Financial Statement Insights" },
];

// ============================================================
// PRICING DATA
// Prices are FLOORS — the simplest engagement that clears each tier.
// includedThrough = feature rows checked, counting from the top.
// ============================================================
const PRICING = {
  individual: {
    compliant: { base: 500,  billing: "onetime", includedThrough: 6 },
    proactive: { base: 250,  billing: "monthly", includedThrough: 10, featured: true },
    strategic: { base: 850,  billing: "monthly", includedThrough: 13 },
  },
  business: {
    compliant: { base: 2000, billing: "onetime", includedThrough: 6 },
    proactive: { base: 650,  billing: "monthly", includedThrough: 10, featured: true },
    strategic: { base: 1250, billing: "monthly", includedThrough: 13 },
  },
};

const TIER_ORDER = ["compliant", "proactive", "strategic"];
const TIER_LABELS = {
  compliant: "Compliant",
  proactive: "Proactive",
  strategic: "Strategic",
};

// ============================================================
// STATE
// ============================================================
let state = {
  entity: "individual",
};

// ============================================================
// RENDERING
// ============================================================
function formatMoney(n) {
  return "$" + Math.round(n).toLocaleString("en-US");
}

function render() {
  const sc = SCOPE_LINE[state.entity];
  document.getElementById("scopeLine").innerHTML =
    `${sc.who}<span class="scope-form">${sc.form}</span>`;
  const tiersEl = document.getElementById("tiers");
  tiersEl.innerHTML = "";

  TIER_ORDER.forEach(tierKey => {
    const tier = PRICING[state.entity][tierKey];
    const card = document.createElement("div");
    card.className = "tier" + (tier.featured ? " featured" : "");

    // Price logic — all prices are starting points
    const priceMain = formatMoney(tier.base);
    const priceSuffix = tier.billing === "onetime" ? "one-time" : "/ month";

    // Features from the shared list; cut line = includedThrough
    const featuresHtml = FEATURES
      .map((f, i) => `<li class="${i < tier.includedThrough ? "" : "muted"}">${f.label}</li>`)
      .join("");

    card.innerHTML = `
      <div class="entity-tag">${SCOPE_LINE[state.entity].tag}</div>
      <div class="tier-name">${TIER_LABELS[tierKey]}</div>
      <div class="tier-desc">${TIER_DESC[tierKey]}</div>
      <div class="price-block">
        <span class="price-lead">Starting at</span>
        <span class="price">${priceMain}</span><span class="price-suffix">${priceSuffix}</span>
      </div>
      <div class="divider"></div>
      <ul class="features">${featuresHtml}</ul>
      <a href="/Schedule-a-Strategy-Session/" class="card-btn">Get Started</a>
    `;
    tiersEl.appendChild(card);
  });
}

// ============================================================
// EVENT HANDLERS
// ============================================================
function setupSegmented(attr, key) {
  document.querySelectorAll(`[data-${attr}]`).forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(`[data-${attr}]`).forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state[key] = btn.dataset[attr];
      render();
    });
  });
}

setupSegmented("entity", "entity");

// Initial render
render();
