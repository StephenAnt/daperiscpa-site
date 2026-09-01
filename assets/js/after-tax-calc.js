(function () {
  var treasuryIn = document.getElementById("atc-treasury");
  var hysaIn = document.getElementById("atc-hysa");
  var tripleIn = document.getElementById("atc-triple");
  var federalIn = document.getElementById("atc-federal");
  var stateIn = document.getElementById("atc-state");
  var treasuryOut = document.getElementById("atc-treasury-result");
  var hysaOut = document.getElementById("atc-hysa-result");
  var tripleOut = document.getElementById("atc-triple-result");
  var verdict = document.getElementById("atc-verdict");

  if (!treasuryIn || !hysaIn || !tripleIn || !federalIn || !stateIn || !treasuryOut || !hysaOut || !tripleOut || !verdict) return;

  function num(el) {
    var v = parseFloat(el.value);
    return isFinite(v) ? v : null;
  }

  function calc() {
    var treasury = num(treasuryIn);
    var hysa = num(hysaIn);
    var triple = num(tripleIn);
    var federal = num(federalIn);
    var state = num(stateIn);

    var treasuryAfter = (treasury !== null && federal !== null)
      ? treasury * (1 - federal / 100) : null;
    var hysaAfter = (hysa !== null && federal !== null && state !== null)
      ? hysa * (1 - federal / 100 - state / 100) : null;
    // Triple tax-exempt: no federal, state, or local tax applies, so after-tax = yield entered.
    var tripleAfter = triple !== null ? triple : null;

    treasuryOut.textContent = treasuryAfter !== null ? treasuryAfter.toFixed(2) + "%" : "—";
    hysaOut.textContent = hysaAfter !== null ? hysaAfter.toFixed(2) + "%" : "—";
    tripleOut.textContent = tripleAfter !== null ? tripleAfter.toFixed(2) + "%" : "—";

    var options = [
      { name: "Treasury option", value: treasuryAfter },
      { name: "HYSA", value: hysaAfter },
      { name: "triple tax-exempt fund", value: tripleAfter }
    ].filter(function (o) { return o.value !== null; });

    if (options.length < 2) {
      verdict.textContent = "";
      return;
    }

    options.sort(function (a, b) { return b.value - a.value; });
    var best = options[0];
    var runnerUp = options[1];
    var diff = (best.value - runnerUp.value).toFixed(2);

    if (Number(diff) === 0 && options.every(function (o) { return o.value === best.value; })) {
      verdict.textContent = "With these numbers, every option entered comes out even after tax.";
    } else {
      verdict.textContent = "With these numbers, the " + best.name + " wins by " + diff + " points after tax.";
    }
  }

  [treasuryIn, hysaIn, tripleIn, federalIn, stateIn].forEach(function (el) {
    el.addEventListener("input", calc);
  });
  calc();
})();
