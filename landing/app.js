/* =============================================================================
   Bodecatta BBQ — Landing Smash Burger Mex
   - Enlaza todos los CTA al mismo punto de conversión: WhatsApp con mensaje precargado.
   - Acordeón de FAQ.
   - Reveal on scroll.
   ============================================================================= */

// Número de WhatsApp de la sucursal (formato internacional, sin +).
// México: 52 + 10 dígitos.
const WA_PHONE = "524446631924";
// En WhatsApp, el texto entre asteriscos *...* se muestra en negrita.
const WA_MESSAGE = "Hola! Quiero pedir el Combo Smash Burger Mex ($148). *Smash Burger + Papas* ¿Me ayudan?";

const waHref = `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(WA_MESSAGE)}`;

// Aplica el enlace a todos los CTA marcados con data-wa.
document.querySelectorAll("[data-wa]").forEach((el) => {
  el.setAttribute("href", waHref);
  el.setAttribute("target", "_blank");
  el.setAttribute("rel", "noopener");
});

// Links de sucursal: cada uno usa su propio número (data-wa-phone) con el mismo mensaje precargado.
document.querySelectorAll("[data-wa-phone]").forEach((el) => {
  const phone = el.getAttribute("data-wa-phone");
  el.setAttribute("href", `https://wa.me/${phone}?text=${encodeURIComponent(WA_MESSAGE)}`);
  el.setAttribute("target", "_blank");
  el.setAttribute("rel", "noopener");
});

// FAQ acordeón ---------------------------------------------------------------
document.querySelectorAll(".faq__item").forEach((item) => {
  const q = item.querySelector(".faq__q");
  const a = item.querySelector(".faq__a");
  q.addEventListener("click", () => {
    const isOpen = item.classList.toggle("open");
    q.setAttribute("aria-expanded", String(isOpen));
    a.style.maxHeight = isOpen ? `${a.scrollHeight}px` : "0";
  });
});

// Reveal on scroll -----------------------------------------------------------
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

// Carrusel "Conoce nuestras hamburguesas" ------------------------------------
// Selección de 5 hamburguesas. Cada tarjeta abre WhatsApp (mismo número principal)
// con un mensaje precargado específico de esa hamburguesa.
const BURGERS = [
  { name: "Clásica", desc: "Carne 100% Angus + queso manchego y vegetales frescos.", price: 215, emoji: "🍔", img: "img/burger-clasica.jpg" },
  { name: "Tocino Queso", desc: "Carne 100% Angus, tocino + queso manchego, vegetales frescos.", price: 265, emoji: "🥓", img: "img/burger-tocino-queso.jpg" },
  { name: "Brisket", desc: "Carne de res 100% Angus ahumada a fuego lento, con un toque y sabor único.", price: 290, emoji: "🥩", img: "img/burger-brisket.jpg" },
  { name: "Pulled Pork", desc: "Pulled pork Bodecatta, ensalada de col y salsa especial de la casa.", price: 240, emoji: "🍖", img: "img/burger-pulled-pork.jpg", pos: "center 72%" },
  { name: "Mix BBQ", desc: "Una combinación de nuestras carnes ahumadas: brisket y pulled pork.", price: 270, emoji: "🔥", img: "img/burger-mix-bbq.jpg" },
];

const track = document.getElementById("burgerTrack");
if (track) {
  for (const b of BURGERS) {
    const msg = `Hola! Quiero pedir la Hamburguesa *${b.name}* ($${b.price}). ¿Me ayudan?`;
    const href = `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(msg)}`;
    const card = document.createElement("article");
    card.className = "bcard";
    card.innerHTML = `
      <div class="bcard__img">${b.img ? `<img src="${b.img}" alt="Hamburguesa ${b.name}" loading="lazy"${b.pos ? ` style="object-position:${b.pos}"` : ""} />` : `<span>${b.emoji}</span>`}</div>
      <div class="bcard__body">
        <h3>${b.name}</h3>
        <p>${b.desc}</p>
        <div class="bcard__foot">
          <span class="bcard__price">$${b.price}</span>
          <a class="btn btn--primary bcard__cta" href="${href}" target="_blank" rel="noopener">Pedir 🔥</a>
        </div>
      </div>`;
    track.appendChild(card);
  }

  // Navegación con flechas: desplaza el ancho de una tarjeta.
  const prev = document.querySelector(".carousel__nav--prev");
  const next = document.querySelector(".carousel__nav--next");
  const step = () => {
    const card = track.querySelector(".bcard");
    return card ? card.getBoundingClientRect().width + 16 : 300;
  };
  prev?.addEventListener("click", () => track.scrollBy({ left: -step(), behavior: "smooth" }));
  next?.addEventListener("click", () => track.scrollBy({ left: step(), behavior: "smooth" }));
}
