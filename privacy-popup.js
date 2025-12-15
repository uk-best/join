// privacy-popup.js
(function () {
  // Show only on Home (index). Remove `isHome` check to show on all pages.
  var path = (location.pathname || "").toLowerCase();
  var isHome = /(^\/$|index\.html$)/.test(path) || path.endsWith("/") || path === "";
  if (!isHome) return;

  // If already accepted earlier in this browser, don't show again
  if (localStorage.getItem("policyAccepted") === "1") return;

  // Only show once per tab/session
  if (sessionStorage.getItem("ageGateShown") === "1") return;
  sessionStorage.setItem("ageGateShown", "1");

  // --- Build modal ---
  var bd = document.createElement("div");
  bd.className = "modal-backdrop";
  bd.innerHTML = [
    '<div class="modal" role="dialog" aria-modal="true" aria-labelledby="pp-title" style="max-width:400px;text-align:center;">',
    '  <h3 id="pp-title">Welcome to ArcadeHub!</h3>',
    '  <p>By continuing to use our site, you acknowledge that you have read and agree to our <a href="terms.html">Terms</a> and <a href="privacy.html">Privacy Policy</a>. Enjoy the games!</p>',
    '  <div class="row">',
    '    <button class="btn" id="pp-yes">Yes, Accept</button>',
    '    <button class="btn ghost" id="pp-no">Close</button>',
    "  </div>",
    "</div>",
  ].join("");
  document.body.appendChild(bd);
  bd.style.display = "flex";

  function closeGate() {
    bd.style.display = "none";
    bd.remove();
  }

  // Close on outside click
  bd.addEventListener("click", function (e) {
    if (e.target === bd) closeGate();
  });

  // Close on ESC
  document.addEventListener(
    "keydown",
    function (e) {
      if (e.key === "Escape") closeGate();
    },
    { once: true }
  );

  // YES -> remember and close
  bd.querySelector("#pp-yes").addEventListener("click", function () {
    localStorage.setItem("policyAccepted", "1");
    closeGate();
  });

  // NO -> just close
  bd.querySelector("#pp-no").addEventListener("click", closeGate);
})();
