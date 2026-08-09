(function () {
  var root = document.getElementById("bd-sucursales-info");
  if (!root) return;

  var cfg = window.BD_LANDING || {};
  var WA_MESSAGE = cfg.waMessage || "Hola! Quiero información de la sucursal.";
  var buttons = cfg.buttons || {};
  var BRANCHES = cfg.branches && cfg.branches.length
    ? cfg.branches
    : [
        { id: "park", name: "The Park", phone: "524446631924", hint: "Plaza The Park" },
        { id: "7b", name: "Container Park 7B", phone: "524444381505", hint: "Villa de Pozos" },
        { id: "wtc", name: "WTC", phone: "524445752279", hint: "La Pila" },
      ];

  root.querySelectorAll("[data-logo]").forEach(function (el) {
    if (cfg.logoUrl) el.setAttribute("href", cfg.logoUrl);
  });

  root.querySelectorAll("[data-btn]").forEach(function (el) {
    var key = el.getAttribute("data-btn");
    var btn = buttons[key];
    if (!btn) return;
    if (btn.text != null && btn.text !== "") el.textContent = btn.text;
    if (key.indexOf("branch") === 0) {
      var href = btn.url && String(btn.url).trim() ? String(btn.url).trim() : "#";
      el.setAttribute("href", href);
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    } else {
      el.setAttribute("href", "#");
      el.removeAttribute("target");
    }
  });

  /* Modal */
  var modal = root.querySelector("#branchModal");
  var list = root.querySelector("#branchModalList");
  var pendingMessage = WA_MESSAGE;

  function openModal(message) {
    if (!modal) return;
    pendingMessage = message || WA_MESSAGE;
    modal.hidden = false;
    document.body.classList.add("bd-modal-open");
  }
  function closeModal() { if (!modal) return; modal.hidden = true; document.body.classList.remove("bd-modal-open"); }

  if (list) {
    list.innerHTML = "";
    BRANCHES.forEach(function (b) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "branch-modal__btn";
      btn.setAttribute("data-branch-id", b.id);
      btn.setAttribute("data-branch-phone", b.phone);
      btn.innerHTML = '<span class="branch-modal__name">' + b.name + '</span>' + '<span class="branch-modal__hint">' + (b.hint || '') + '</span>';
      btn.addEventListener("click", function () {
        closeModal();
        window.open("https://wa.me/" + b.phone + "?text=" + encodeURIComponent(pendingMessage), "_blank", "noopener");
      });
      list.appendChild(btn);
    });
  }

  if (modal) {
    modal.querySelectorAll("[data-branch-close]").forEach(function (el) { el.addEventListener("click", closeModal); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !modal.hidden) closeModal(); });
  }

  root.querySelectorAll("[data-btn]").forEach(function (el) {
    var key = el.getAttribute("data-btn") || "";
    if (key.indexOf("branch") === 0) return;
    el.addEventListener("click", function (e) { e.preventDefault(); openModal(WA_MESSAGE); });
  });

  /* Render branch cards */
  var branchesList = root.querySelector("#branchesList");
  if (branchesList) {
    BRANCHES.forEach(function (b) {
      var div = document.createElement("div");
      div.className = "branch-card reveal";
      div.innerHTML = '<div><strong>' + b.name + '</strong><div class="hint">' + (b.hint||'') + '</div><div class="addr">Dirección disponible</div><div class="hours">Horario disponible</div></div>' + '<div class="actions"><a class="btn btn--primary" href="#" data-btn="branch' + b.id + '">' + (buttons['branch' + (b.id==='7b'?'7b':b.id==='wtc'?'Wtc':'Park') ] ? (buttons['branch' + b.id]||{}).text || 'WhatsApp' : 'WhatsApp') + '</a></div>';
      branchesList.appendChild(div);
    });
  }

})();
