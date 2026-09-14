/* =============================================================================
  Bodecatta BBQ — Landing Hamburguesa de Guacamole
   Cada bloque está marcado como --- SECCIÓN N --- para reemplazar por partes.
   ============================================================================= */

/* --- SECCIÓN 1: CONFIG / BOTONES --- */
const cfg = window.BD_LANDING || {};
const WA_PHONE = cfg.waPhone || "524446631924";
const WA_MESSAGE =
  cfg.waMessage ||
  "Hola! Quiero pedir el Combo Hamburguesa de Guacamole ($168). *Hamburguesa + Papas* ¿Me ayudan?";
const buttons = cfg.buttons || {};
const waHref = `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(WA_MESSAGE)}`;

function resolveUrl(url) {
  return url && String(url).trim() ? String(url).trim() : waHref;
}

document.querySelectorAll("[data-logo]").forEach((el) => {
  if (cfg.logoUrl) el.setAttribute("href", cfg.logoUrl);
});

document.querySelectorAll("[data-btn]").forEach((el) => {
  const key = el.getAttribute("data-btn");
  const btn = buttons[key];
  if (!btn) return;
  if (btn.text != null && btn.text !== "") el.textContent = btn.text;
  el.setAttribute("href", resolveUrl(btn.url));
  el.setAttribute("target", "_blank");
  el.setAttribute("rel", "noopener");
});

/* --- SECCIÓN 2: FAQ --- */
document.querySelectorAll(".faq__item").forEach((item) => {
  const q = item.querySelector(".faq__q");
  const a = item.querySelector(".faq__a");
  q.addEventListener("click", () => {
    const isOpen = item.classList.toggle("open");
    q.setAttribute("aria-expanded", String(isOpen));
    a.style.maxHeight = isOpen ? `${a.scrollHeight}px` : "0";
  });
});

/* --- SECCIÓN 3: REVEAL --- */
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 },
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

/* --- SECCIÓN 4: CARRUSEL --- */
const burgerCta = buttons.burgerCta || { text: "Pedir 🔥", url: "" };
const BURGERS = [
  { name: "Clásica", desc: "Carne 100% Angus + queso manchego y vegetales frescos.", price: 215, emoji: "🍔", img: "../assets/images/burger-clasica.jpg" },
  { name: "Tocino Queso", desc: "Carne 100% Angus, tocino + queso manchego, vegetales frescos.", price: 265, emoji: "🥓", img: "../assets/images/burger-tocino-queso.jpg" },
  { name: "Brisket", desc: "Carne de res 100% Angus ahumada a fuego lento, con un toque y sabor único.", price: 290, emoji: "🥩", img: "../assets/images/burger-brisket.jpg" },
  { name: "Pulled Pork", desc: "Pulled pork Bodecatta, ensalada de col y salsa especial de la casa.", price: 240, emoji: "🍖", img: "../assets/images/burger-pulled-pork.jpg", pos: "center 72%" },
  { name: "Mix BBQ", desc: "Una combinación de nuestras carnes ahumadas: brisket y pulled pork.", price: 270, emoji: "🔥", img: "../assets/images/burger-mix-bbq.jpg" },
];

const track = document.getElementById("burgerTrack");
if (track) {
  for (const b of BURGERS) {
    const msg = `Hola! Quiero pedir la Hamburguesa *${b.name}* ($${b.price}). ¿Me ayudan?`;
    const href = burgerCta.url && String(burgerCta.url).trim()
      ? String(burgerCta.url).trim()
      : `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(msg)}`;
    const card = document.createElement("article");
    card.className = "bcard";
    card.innerHTML = `
      <div class="bcard__img">${b.img ? `<img src="${b.img}" alt="Hamburguesa ${b.name}" loading="lazy"${b.pos ? ` style="object-position:${b.pos}"` : ""} />` : `<span>${b.emoji}</span>`}</div>
      <div class="bcard__body">
        <h3>${b.name}</h3>
        <p>${b.desc}</p>
        <div class="bcard__foot">
          <span class="bcard__price">$${b.price}</span>
          <a class="btn btn--primary bcard__cta" href="${href}" target="_blank" rel="noopener">${burgerCta.text || "Pedir 🔥"}</a>
        </div>
      </div>`;
    track.appendChild(card);
  }

  const prev = document.querySelector(".carousel__nav--prev");
  const next = document.querySelector(".carousel__nav--next");
  const step = () => {
    const card = track.querySelector(".bcard");
    return card ? card.getBoundingClientRect().width + 16 : 300;
  };
  prev?.addEventListener("click", () => track.scrollBy({ left: -step(), behavior: "smooth" }));
  next?.addEventListener("click", () => track.scrollBy({ left: step(), behavior: "smooth" }));
}
