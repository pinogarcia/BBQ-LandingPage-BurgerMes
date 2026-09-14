<!-- Bodecatta Oxygen markup — HTML + PHP opcional en este mismo archivo. -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Hanken+Grotesk:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />

<!-- --- SECCIÓN 0: CONFIG BOTONES ---
     Edita SOLO esta sección para cambiar textos y URLs.
     - text → texto del botón
     - url  → enlace ("" = WhatsApp automático vía modal de sucursal)
     - logoUrl → destino del logo
-->
<script>
  window.BD_LANDING = {
    waMessage: "Hola! Quiero pedir el Combo Hamburguesa de Guacamole ($168). *Hamburguesa + Papas* ¿Me ayudan?",
    logoUrl: "https://bodecatta.com",
    branches: [
      { id: "park", name: "The Park", phone: "524446631924", hint: "Plaza The Park" },
      { id: "7b", name: "Container Park 7B", phone: "524444381505", hint: "Villa de Pozos" },
      { id: "wtc", name: "WTC", phone: "524445752279", hint: "La Pila" },
    ],
    buttons: {
      nav:       { text: "Pedir ahora", url: "" },
      hero:      { text: "Pedir por WhatsApp 🔥", url: "" },
      combo:     { text: "Lo quiero 🔥", url: "" },
      final:     { text: "Pedir por WhatsApp 🔥", url: "" },
      sticky:    { text: "Pedir por WhatsApp 🔥", url: "" },
      burgerCta: { text: "Pedir 🔥", url: "" },
      branch7b:  { text: "WhatsApp · 444 438 1505", url: "https://wa.me/524444381505" },
      branchWtc: { text: "WhatsApp · 444 575 2279", url: "https://wa.me/524445752279" },
      branchPark:{ text: "WhatsApp · 444 663 1924", url: "https://wa.me/524446631924" },
    },
  };
</script>

<div id="bd-hamburguesa-de-guacamole">

  <!-- --- SECCIÓN 1: NAV --- -->
  <header class="nav">
    <div class="wrap nav__inner">
      <a href="https://bodecatta.com" class="brand" data-logo aria-label="Bodecatta BBQ">
        <img src="https://bodecatta.com/wp-content/uploads/2026/08/Bodecatta-MedioLogo-white.png" alt="Bodecatta BBQ" width="568" height="298" />
      </a>
      <a class="btn btn--primary" data-btn="nav" href="#">Pedir ahora</a>
    </div>
  </header>

  <main>
    <!-- --- SECCIÓN 2: HERO --- -->
    <section class="hero">
      <div class="wrap hero__grid">
        <div class="hero__copy reveal">
          <h1 class="hero__title">No es otra hamburguesa con guacamole</h1>
          <p class="hero__hook">Es guacamole real, carbón real y ese sabor que te hace volver.</p>
          <div class="price-anchor">
            <span class="label">Combo completo por</span>
            <span class="amount">$168</span>
          </div>
          <div class="hero__cta">
            <a class="btn btn--primary btn--lg" data-btn="hero" href="#">Pedir por WhatsApp 🔥</a>
          </div>
          <p class="micro">Guacamoles: la hamburguesa de temporada (Sep–Oct)</p>
        </div>
        <div class="hero__media">
          <img class="hero__img" src="https://bodecatta.com/wp-content/uploads/2026/09/Burger-Guacamole-UCG.jpeg" alt="Hamburguesa de Guacamole con guacamole, queso y pan de semillas" style="object-position: center;" />
        </div>
      </div>
    </section>

    <!-- --- SECCIÓN 3: SOCIAL --- -->
    <section class="social">
      <div class="wrap social__grid reveal">
        <div class="social__item">
          <div class="big">★ 4.7</div>
          <div class="sub">en Google</div>
        </div>
        <div class="social__item">
          <div class="big">+500</div>
          <div class="sub">pedidos este mes</div>
        </div>
        <div class="social__item">
          <div class="stars">★★★★★</div>
          <div class="sub">“La mejor Burger de Guacamole de la ciudad” — clientes reales</div>
        </div>
      </div>
    </section>

    <!-- --- SECCIÓN 4: COMBO --- -->
    <section class="combo">
      <div class="wrap">
        <div class="combo__head center reveal">
          <p class="eyebrow">El combo</p>
          <h2 class="section-title">Todo esto por <span class="hl">$168</span></h2>
        </div>
        <div class="combo__grid">
          <article class="card reveal">
            <img class="card__img" src="https://bodecatta.com/wp-content/uploads/2026/09/hero-guacamole.jpg" alt="Hamburguesa de Guacamole con guacamole, queso y pan de semillas" />
            <div class="card__body">
              <h3>Hamburguesa de guacamole</h3>
              <p>Carne Angun 100% res al Carbon y Guacamole Cremoso Real</p>
            </div>
          </article>
          <article class="card reveal">
            <img class="card__img" src="https://bodecatta.com/wp-content/uploads/2026/08/combo-papas.jpg" alt="Papas a la francesa crujientes" />
            <div class="card__body">
              <h3>Papas a elegir</h3>
              <p>A la francesa o gajo, tú decides. Crujientes por fuera, suaves por dentro. Porción generosa.</p>
            </div>
          </article>
        </div>
        <div class="combo__cta reveal">
          <div class="price-line">Combo Hamburguesa de Guacamole — <b>$168</b></div>
          <a class="btn btn--primary btn--lg" data-btn="combo" href="#">Lo quiero 🔥</a>
        </div>
      </div>
    </section>

    <!-- --- SECCIÓN 5: CARRUSEL --- -->
    <section class="burgers">
      <div class="wrap">
        <div class="center reveal">
          <p class="eyebrow">Del grill a tu mesa</p>
          <h2 class="section-title">Conoce nuestras <span class="hl">hamburguesas</span></h2>
        </div>
      </div>
      <div class="carousel reveal">
        <button type="button" class="carousel__nav carousel__nav--prev" aria-label="Anterior">‹</button>
        <div class="carousel__track" id="burgerTrack"></div>
        <button type="button" class="carousel__nav carousel__nav--next" aria-label="Siguiente">›</button>
      </div>
    </section>

    <!-- --- SECCIÓN 6: STEPS --- -->
    <section class="steps">
      <div class="wrap">
        <div class="center reveal">
          <p class="eyebrow">3 pasos</p>
          <h2 class="section-title">Pedir es así de <span class="hl">fácil</span></h2>
        </div>
        <div class="steps__grid" style="margin-top: var(--s-48);">
          <div class="step reveal"><div class="step__num">1</div><h3>Toca el botón</h3><p>Le das a “Pedir por WhatsApp”.</p></div>
          <div class="step reveal"><div class="step__num">2</div><h3>Confirmas tu pedido</h3><p>Nos escribes cuántos combos y tu dirección.</p></div>
          <div class="step reveal"><div class="step__num">3</div><h3>Lo recibes</h3><p>Recoges en sucursal o te lo enviamos calientito.</p></div>
        </div>
      </div>
    </section>

    <!-- --- SECCIÓN 7: TESTIMONIOS --- -->
    <section class="testi">
      <div class="wrap">
        <div class="center reveal">
          <p class="eyebrow">Clientes reales</p>
          <h2 class="section-title">Esto es lo que dicen de nuestra Burger de Guacamole</h2>
        </div>
        <div class="testi__grid">
          <figure class="quote reveal"><div class="stars">★★★★★</div><p>“Se deshace en la boca, la carne queda perfecta. Ya es mi pedido de cada viernes.”</p><cite>— Miguel A.</cite></figure>
          <figure class="quote reveal"><div class="stars">★★★★★</div><p>“Pedir por WhatsApp fue facilísimo. Llegó en minutos y el sabor estaba increíble.”</p><cite>— Karla R.</cite></figure>
          <figure class="quote reveal"><div class="stars">★★★★★</div><p>“El combo a $168 vale cada peso. Las papas gajo son otro nivel.”</p><cite>— Diego M.</cite></figure>
        </div>
      </div>
    </section>

    <!-- --- SECCIÓN 8: FAQ --- -->
    <section class="faq">
      <div class="wrap">
        <div class="center reveal">
          <p class="eyebrow">Dudas rápidas</p>
          <h2 class="section-title">Preguntas <span class="hl">frecuentes</span></h2>
        </div>
        <div class="faq__list reveal">
          <div class="faq__item">
            <button type="button" class="faq__q" aria-expanded="false">¿A qué zonas entregan? <span class="icon">+</span></button>
            <div class="faq__a"><p>Cubrimos la zona de cada sucursal (The Park, 7B y WTC). Al escribirnos confirmamos si llegamos a tu dirección.</p></div>
          </div>
          <div class="faq__item">
            <button type="button" class="faq__q" aria-expanded="false">¿En cuánto tiempo llega? <span class="icon">+</span></button>
            <div class="faq__a"><p>Normalmente entre 25 y 40 minutos, según tu zona y la hora.</p></div>
          </div>
          <div class="faq__item">
            <button type="button" class="faq__q" aria-expanded="false">¿Cómo pago? <span class="icon">+</span></button>
            <div class="faq__a"><p>Efectivo, tarjeta o transferencia. Lo acordamos por WhatsApp.</p></div>
          </div>
          <div class="faq__item">
            <button type="button" class="faq__q" aria-expanded="false">¿Qué horario tienen? <span class="icon">+</span></button>
            <div class="faq__a"><p>Todos los días de 1:00 pm a 10:00 pm.</p></div>
          </div>
        </div>
      </div>
    </section>

    <!-- --- SECCIÓN 9: CTA FINAL --- -->
    <section class="final">
      <div class="wrap reveal">
        <h2 class="final__title">Antójate.<br />Pide tu Hamburguesa de Guacamole hoy.</h2>
        <p class="final__price">Combo completo por <b>$168</b> — hamburguesa y papas.</p>
        <a class="btn btn--primary btn--lg" data-btn="final" href="#">Pedir por WhatsApp 🔥</a>
        <p class="final__micro">El fuego ya está listo. Solo faltas tú.</p>
      </div>
    </section>
  </main>

  <!-- --- SECCIÓN 10: FOOTER --- -->
  <footer class="footer">
    <div class="wrap">
      <a href="https://bodecatta.com" class="brand" data-logo aria-label="Bodecatta BBQ">
        <img src="https://bodecatta.com/wp-content/uploads/2026/08/Bodecatta-MedioLogo-white.png" alt="Bodecatta BBQ" width="568" height="298" />
      </a>
      <p class="footer__lead">Encuéntranos en nuestras sucursales de San Luis Potosí</p>
      <div class="branches">
        <div class="branch">
          <h4>📍 Container Park 7B</h4>
          <p>Carretera 57, Villa de Pozos, C.P. 78384, San Luis Potosí, S.L.P.</p>
          <a class="branch__wa" data-btn="branch7b" href="#">WhatsApp · 444 438 1505</a>
        </div>
        <div class="branch">
          <h4>📍 WTC</h4>
          <p>Eje 140, La Pila, C.P. 78422, San Luis Potosí, S.L.P.</p>
          <a class="branch__wa" data-btn="branchWtc" href="#">WhatsApp · 444 575 2279</a>
        </div>
        <div class="branch">
          <h4>📍 The Park</h4>
          <p>Antonio Rocha Cordero 157, Local G-206, Plaza The Park, San Luis Potosí, S.L.P.</p>
          <a class="branch__wa" data-btn="branchPark" href="#">WhatsApp · 444 663 1924</a>
        </div>
      </div>
      <p class="footer__copy">© 2026 Bodecatta BBQ</p>
    </div>
  </footer>

  <!-- --- SECCIÓN 11: STICKY CTA --- -->
  <div class="sticky-cta">
    <a class="btn btn--primary" data-btn="sticky" href="#">Pedir por WhatsApp 🔥</a>
  </div>

  <!-- --- SECCIÓN 12: MODAL SUCURSAL --- -->
  <div class="branch-modal" id="branchModal" hidden>
    <div class="branch-modal__backdrop" data-branch-close></div>
    <div
      class="branch-modal__panel"
      role="dialog"
      aria-modal="true"
      aria-labelledby="branchModalTitle"
    >
      <button type="button" class="branch-modal__x" data-branch-close aria-label="Cerrar">×</button>
      <h3 id="branchModalTitle" class="branch-modal__title">Elige tu sucursal</h3>
      <p class="branch-modal__sub">Te conectamos al WhatsApp correcto</p>
      <div class="branch-modal__list" id="branchModalList"></div>
    </div>
  </div>
</div>
