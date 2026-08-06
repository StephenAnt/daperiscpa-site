// ============================================================
// CPA Service Tiers — pricing calculator
// Figures are rendered server-side into static HTML (see build.py /
// PRICING_CALC) so search engines and AI crawlers see real prices
// without executing JS. This script only toggles which pre-rendered
// panel is visible — it no longer builds any DOM.
// ============================================================

function setupSegmented(attr) {
  document.querySelectorAll(`[data-${attr}]`).forEach(btn => {
    btn.addEventListener("click", () => {
      const value = btn.dataset[attr];

      document.querySelectorAll(`[data-${attr}]`).forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      document.querySelectorAll(".pricing-panel").forEach(panel => {
        panel.style.display = panel.dataset.panel === value ? "" : "none";
      });
    });
  });
}

setupSegmented("entity");
