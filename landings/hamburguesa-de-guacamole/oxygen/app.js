/* =============================================================================
  Oxygen JS — Bodecatta Hamburguesa de Guacamole
   Cada bloque: --- SECCIÓN N ---
   Imágenes: https://bodecatta.com/wp-content/uploads/2026/08/
   ============================================================================= */

(function () {
  var root = document.getElementById("bd-hamburguesa-de-guacamole");
  if (!root) return;

  /* --- SECCIÓN 1: CONFIG / BOTONES --- */
  var cfg = window.BD_LANDING || {};
  var WA_MESSAGE = cfg.waMessage || "Hola! Quiero pedir el Combo Hamburguesa de Guacamole ($168). *Hamburguesa + Papas* ¿Me ayudan?";
  var buttons = cfg.buttons || {};
  var BRANCHES = cfg.branches && cfg.branches.length
    ? cfg.branches
    : [
        { id: "park", name: "The Park", phone: "524446631924", hint: "Plaza The Park" },
        { id: "7b", name: "Container Park 7B", phone: "524444381505", hint: "Villa de Pozos" },
        { id: "wtc", name: "WTC", phone: "524445752279", hint: "La Pila" },
      ];
  var IMG = "https://bodecatta.com/wp-content/uploads/2026/08/";
  var STORAGE_KEY = "bd_branch_id";
  var pendingMessage = WA_MESSAGE;

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

  /* --- SECCIÓN 1b: MODAL SUCURSAL --- */
  var modal = root.querySelector("#branchModal");
  var list = root.querySelector("#branchModalList");

  function openModal(message) {
    if (!modal) return;
    pendingMessage = message || WA_MESSAGE;
    var saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    if (list) {
      list.querySelectorAll("[data-branch-id]").forEach(function (btn) {
        btn.classList.toggle("is-selected", btn.getAttribute("data-branch-id") === saved);
      });
    }
    modal.hidden = false;
    document.body.classList.add("bd-modal-open");
  }

  function closeModal() {
    if (!modal) return;
    modal.hidden = true;
    document.body.classList.remove("bd-modal-open");
  }

  if (list) {
    list.innerHTML = "";
    BRANCHES.forEach(function (b) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "branch-modal__btn";
      btn.setAttribute("data-branch-id", b.id);
      btn.setAttribute("data-branch-phone", b.phone);
      btn.innerHTML =
        '<span class="branch-modal__name">' + b.name + "</span>" +
        '<span class="branch-modal__hint">' + (b.hint || "") + "</span>";
      btn.addEventListener("click", function () {
        try { localStorage.setItem(STORAGE_KEY, b.id); } catch (e) {}
        closeModal();
        window.open(
          "https://wa.me/" + b.phone + "?text=" + encodeURIComponent(pendingMessage),
          "_blank",
          "noopener"
        );
      });
      list.appendChild(btn);
    });
  }

  if (modal) {
    modal.querySelectorAll("[data-branch-close]").forEach(function (el) {
      el.addEventListener("click", closeModal);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !modal.hidden) closeModal();
    });
  }

  root.querySelectorAll("[data-btn]").forEach(function (el) {
    var key = el.getAttribute("data-btn") || "";
    if (key.indexOf("branch") === 0) return;
    el.addEventListener("click", function (e) {
      e.preventDefault();
      openModal(WA_MESSAGE);
    });
  });

  root.addEventListener("click", function (e) {
    var cta = e.target.closest(".bcard__cta");
    if (!cta || !root.contains(cta)) return;
    e.preventDefault();
    openModal(cta.getAttribute("data-wa-msg") || WA_MESSAGE);
  });

  window.bdOpenBranchModal = openModal;

  /* --- SECCIÓN 2: FAQ --- */
  root.querySelectorAll(".faq__item").forEach(function (item) {
    var q = item.querySelector(".faq__q");
    var a = item.querySelector(".faq__a");
    if (!q || !a) return;
    q.addEventListener("click", function () {
      var isOpen = item.classList.toggle("open");
      q.setAttribute("aria-expanded", String(isOpen));
      a.style.maxHeight = isOpen ? a.scrollHeight + "px" : "0";
    });
  });

  /* --- SECCIÓN 3: REVEAL --- */
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    root.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  } else {
    root.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
  }

  /* --- SECCIÓN 4: CARRUSEL --- */
  var burgerCta = buttons.burgerCta || { text: "Pedir 🔥", url: "" };
  var BURGERS = [
    { name: "Clásica", desc: "Carne 100% Angus + queso manchego y vegetales frescos.", price: 215, img: IMG + "burger-clasica.jpg" },
    { name: "Tocino Queso", desc: "Carne 100% Angus, tocino + queso manchego, vegetales frescos.", price: 265, img: IMG + "burger-tocino-queso.jpg" },
    { name: "Brisket", desc: "Carne de res 100% Angus ahumada a fuego lento, con un toque y sabor único.", price: 290, img: IMG + "burger-brisket.jpg" },
    { name: "Pulled Pork", desc: "Pulled pork Bodecatta, ensalada de col y salsa especial de la casa.", price: 240, img: IMG + "burger-pulled-pork.jpg", pos: "center 72%" },
    { name: "Mix BBQ", desc: "Una combinación de nuestras carnes ahumadas: brisket y pulled pork.", price: 270, img: IMG + "burger-mix-bbq.jpg" }
  ];

  var track = root.querySelector("#burgerTrack");
  if (track) {
    BURGERS.forEach(function (b) {
      var msg = "Hola! Quiero pedir la Hamburguesa *" + b.name + "* ($" + b.price + "). ¿Me ayudan?";
      var card = document.createElement("article");
      card.className = "bcard";
      var media = '<img src="' + b.img + '" alt="Hamburguesa ' + b.name + '" loading="lazy"' + (b.pos ? ' style="object-position:' + b.pos + '"' : "") + " />";
      card.innerHTML =
        '<div class="bcard__img">' + media + "</div>" +
        '<div class="bcard__body">' +
          "<h3>" + b.name + "</h3>" +
          "<p>" + b.desc + "</p>" +
          '<div class="bcard__foot">' +
            '<span class="bcard__price">$' + b.price + "</span>" +
            '<a class="btn btn--primary bcard__cta" href="#" data-wa-msg="' + msg.replace(/"/g, "&quot;") + '">' + (burgerCta.text || "Pedir 🔥") + "</a>" +
          "</div>" +
        "</div>";
      track.appendChild(card);
    });

    var prev = root.querySelector(".carousel__nav--prev");
    var next = root.querySelector(".carousel__nav--next");
    var step = function () {
      var card = track.querySelector(".bcard");
      return card ? card.getBoundingClientRect().width + 16 : 300;
    };
    if (prev) prev.addEventListener("click", function () { track.scrollBy({ left: -step(), behavior: "smooth" }); });
    if (next) next.addEventListener("click", function () { track.scrollBy({ left: step(), behavior: "smooth" }); });
  }
})();
