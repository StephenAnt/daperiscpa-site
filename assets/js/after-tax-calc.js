(function () {
  var treasuryIn = document.getElementById("atc-treasury");
  var hysaIn = document.getElementById("atc-hysa");
  var federalIn = document.getElementById("atc-federal");
  var stateIn = document.getElementById("atc-state");
  var treasuryOut = document.getElementById("atc-treasury-result");
  var hysaOut = document.getElementById("atc-hysa-result");
  var verdict = document.getElementById("atc-verdict");

  if (!treasuryIn || !hysaIn || !federalIn || !stateIn || !treasuryOut || !hysaOut || !verdict) return;

  function num(el) {
    var v = parseFloat(el.value);
    return isFinite(v) ? v : null;
  }

  function calc() {
    var treasury = num(treasuryIn);
    var hysa = num(hysaIn);
    var federal = num(federalIn);
    var state = num(stateIn);

    var treasuryAfter = (treasury !== null && federal !== null)
      ? treasury * (1 - federal / 100) : null;
    var hysaAfter = (hysa !== null && federal !== null && state !== null)
      ? hysa * (1 - federal / 100 - state / 100) : null;

    treasuryOut.textContent = treasuryAfter !== null ? treasuryAfter.toFixed(2) + "%" : "—";
    hysaOut.textContent = hysaAfter !== null ? hysaAfter.toFixed(2) + "%" : "—";

    if (treasuryAfter === null || hysaAfter === null) {
      verdict.textContent = "";
      return;
    }
    var diff = Math.abs(treasuryAfter - hysaAfter).toFixed(2);
    if (treasuryAfter > hysaAfter) {
      verdict.textContent = "With these numbers, the Treasury option wins by " + diff + " points after tax.";
    } else if (hysaAfter > treasuryAfter) {
      verdict.textContent = "With these numbers, the HYSA wins by " + diff + " points after tax.";
    } else {
      verdict.textContent = "With these numbers, both options come out even after tax.";
    }
  }

  [treasuryIn, hysaIn, federalIn, stateIn].forEach(function (el) {
    el.addEventListener("input", calc);
  });
  calc();
})();
