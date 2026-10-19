(function () {
  var RATES = { 2025: 0.145, 2026: 0.1525, 2027: 0.16, 2028: 0.17 };
  var $ = function (id) { return document.getElementById(id); };
  var fmt = function (n) { return "$" + Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); };
  var pct = function (r) { return (r * 100).toFixed(2).replace(/\.?0+$/, "").replace(".", ",") + "%"; };
  function calc() {
    var rate = RATES[$("c-year").value] || 0.17;
    var raw = parseInt(String($("c-amount").value).replace(/[^\d]/g, ""), 10) || 0;
    var gross, ret, net;
    if ($("c-mode").value === "gross") { gross = raw; ret = Math.round(gross * rate); net = gross - ret; }
    else { net = raw; gross = Math.round(net / (1 - rate)); ret = gross - net; }
    $("c-out").innerHTML = "<div><span>Bruto</span><b>" + fmt(gross) + "</b></div>" +
      "<div><span>Retención (" + pct(rate) + ")</span><b>" + fmt(ret) + "</b></div>" +
      "<div class='is-net'><span>Líquido</span><b>" + fmt(net) + "</b></div>";
  }
  function reformat() {
    var el = $("c-amount"), d = String(el.value).replace(/[^\d]/g, "");
    el.value = d ? d.replace(/\B(?=(\d{3})+(?!\d))/g, ".") : "";
    calc();
  }
  document.addEventListener("DOMContentLoaded", function () {
    ["c-year", "c-mode"].forEach(function (id) { $(id).addEventListener("change", calc); });
    $("c-amount").addEventListener("input", reformat);
    $("y").textContent = new Date().getFullYear();
    calc();
  });
})();
