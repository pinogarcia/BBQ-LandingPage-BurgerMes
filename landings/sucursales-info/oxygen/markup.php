<!-- Bodecatta Oxygen markup — generated from smash-burger-mex as reference -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Hanken+Grotesk:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />

<script>
  window.BD_LANDING = {
    waMessage: "Hola! Quiero información de la sucursal.",
    logoUrl: "https://bodecatta.com",
    branches: [
      { id: "park", name: "The Park", phone: "524446631924", hint: "Plaza The Park" },
      { id: "7b", name: "Container Park 7B", phone: "524444381505", hint: "Villa de Pozos" },
      { id: "wtc", name: "WTC", phone: "524445752279", hint: "La Pila" },
    ],
    buttons: {
      nav:       { text: "Sucursales", url: "" },
      hero:      { text: "Ver sucursales", url: "" },
      final:     { text: "Contactar por WhatsApp", url: "" },
      sticky:    { text: "Sucursales", url: "" },
      branch7b:  { text: "WhatsApp · 444 438 1505", url: "https://wa.me/524444381505" },
      branchWtc: { text: "WhatsApp · 444 575 2279", url: "https://wa.me/524445752279" },
      branchPark:{ text: "WhatsApp · 444 663 1924", url: "https://wa.me/524446631924" },
    },
  };
</script>

<div id="bd-sucursales-info">

  <!-- --- SECCIÓN 1: NAV --- -->
  <header class="nav">
    <div class="wrap nav__inner">
      <a href="https://bodecatta.com" class="brand" data-logo aria-label="Bodecatta BBQ">
        <img src="../../shared/assets/logos/logo-bodecatta.png" alt="Bodecatta BBQ" width="568" height="298" />
      </a>
      <a class="btn btn--primary" data-btn="nav" href="#">Sucursales</a>
    </div>
  </header>

  <main>
    <!-- --- SECCIÓN 2: HERO --- -->
    <section class="hero">
      <div class="wrap hero__grid">
        <div class="hero__copy reveal">
          <h1 class="hero__title">Encuentra tu <span class="hl">sucursal</span></h1>
          <p class="hero__hook">Consulta horarios, ubicación, contacto y pide por WhatsApp en segundos.</p>
          <div class="hero__cta">
            <a class="btn btn--primary btn--lg" data-btn="hero" href="#">Ver sucursales</a>
          </div>
          <p class="micro">Sin app · Rápido · Local</p>
        </div>
        <div class="hero__media">
          <img class="hero__img" src="../../smash-burger-mex/assets/images/opti/burger-pulled-pork.jpg" alt="Sucursales Bodecatta BBQ" />
        </div>
      </div>
    </section>

    <!-- --- SECCIÓN 3: SUCURSALES (tarjetas) --- -->
    <section class="branches">
      <div class="wrap">
        <div class="center reveal">
          <p class="eyebrow">Sucursales</p>
          <h2 class="section-title">Elige tu <span class="hl">sucursal</span></h2>
        </div>
        <div class="branches__grid">
          <!-- Branch cards will be rendered by JS -->
          <div id="branchesList"></div>
        </div>
      </div>
    </section>

    <!-- --- SECCIÓN 4: CTA FINAL --- -->
    <section class="final">
      <div class="wrap reveal">
        <h2 class="final__title">¿Listo para ordenar?</h2>
        <a class="btn btn--primary btn--lg" data-btn="final" href="#">Contactar por WhatsApp</a>
        <p class="final__micro">Selecciona tu sucursal y te conectamos al WhatsApp correcto.</p>
      </div>
    </section>
  </main>

  <!-- --- SECCIÓN 5: FOOTER --- -->
  <footer class="footer">
    <div class="wrap">
      <a href="https://bodecatta.com" class="brand" data-logo aria-label="Bodecatta BBQ">
        <img src="../../shared/assets/logos/logo-bodecatta.png" alt="Bodecatta BBQ" width="568" height="298" />
      </a>
      <p class="footer__lead">Encuéntranos en nuestras sucursales de San Luis Potosí</p>
      <p class="footer__copy">© 2026 Bodecatta BBQ</p>
    </div>
  </footer>

  <!-- --- SECCIÓN 6: MODAL SUCURSAL --- -->
  <div class="branch-modal" id="branchModal" hidden>
    <div class="branch-modal__backdrop" data-branch-close></div>
    <div class="branch-modal__panel" role="dialog" aria-modal="true" aria-labelledby="branchModalTitle">
      <button type="button" class="branch-modal__x" data-branch-close aria-label="Cerrar">×</button>
      <h3 id="branchModalTitle" class="branch-modal__title">Elige tu sucursal</h3>
      <p class="branch-modal__sub">Te conectamos al WhatsApp correcto</p>
      <div class="branch-modal__list" id="branchModalList"></div>
    </div>
  </div>
</div>
