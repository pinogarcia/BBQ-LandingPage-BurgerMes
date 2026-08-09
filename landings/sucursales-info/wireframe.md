# Wireframe — Página `sucursales-info`

> **Objetivo**
>
> Crear una página donde el usuario pueda encontrar rápidamente la sucursal que desea visitar, conocer horarios, ubicación y realizar una acción inmediata (WhatsApp, Menú, Pedido o Información).

---

# Información general

**Slug**

```
/sucursales-info
```

**Título SEO**

```
Sucursales | Bodecatta BBQ
```

**Meta descripción**

```
Encuentra la sucursal de Bodecatta BBQ más cercana. Consulta horarios, ubicación, menú, pedidos y formas de contacto.
```

---

# Estructura del Wireframe

```
┌─────────────────────────────────────────────┐
│                 HEADER                      │
│                  Logo                       │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│            PROMOS DE LA SEMANA              │
│                                             │
│ Lunes | Martes | Miércoles                  │
│                                             │
│ Promo │ Promo │ Promo                       │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│         SUCURSAL THE PARK                   │
│──────────────────────────────┬──────────────│
│ Logo                         │ WhatsApp     │
│ Nombre                       │ Uber Eats    │
│ Dirección                    │ Rappi        │
│ Horarios                     │ Pedido Web   │
│ Botón Información            │ Menú         │
└──────────────────────────────┴──────────────┘

┌─────────────────────────────────────────────┐
│          SUCURSAL 7B                        │
│──────────────────────────────┬──────────────│
│ Logo                         │ WhatsApp     │
│ Nombre                       │ Uber Eats    │
│ Dirección                    │ Pedido Web   │
│ Horarios                     │ Menú         │
│ Botón Información            │              │
└──────────────────────────────┴──────────────┘

┌─────────────────────────────────────────────┐
│          SUCURSAL WTC                       │
│──────────────────────────────┬──────────────│
│ Logo                         │ WhatsApp     │
│ Nombre                       │ Menú         │
│ Dirección                    │              │
│ Horarios                     │              │
│ Botón Información            │              │
└──────────────────────────────┴──────────────┘

┌─────────────────────────────────────────────┐
│         CLUB DE BENEFICIOS                  │
│──────────────────────────────┬──────────────│
│ Texto + Beneficios           │ QR           │
│ Botón                        │ Mockup       │
└──────────────────────────────┴──────────────┘

┌─────────────────────────────────────────────┐
│                  FOOTER                     │
└─────────────────────────────────────────────┘
```

---

# 1. Header

## Objetivo

Reforzar identidad de marca.

## Componentes

- Logo centrado
- Fondo blanco
- Mucho espacio en blanco

## Contenido

```
LOGO BODECATTA BBQ

Carnes a fuego lento
```

---

# 2. Promos de la Semana

## Objetivo

Mostrar promociones vigentes antes de que el usuario elija sucursal.

## Layout

```
┌─────────────────────────────────────────────┐
│ LUNES │ MARTES │ MIÉRCOLES                  │
├───────┼────────┼────────────────────────────┤
│Promo  │Promo   │Promo                       │
│Imagen │Imagen  │Imagen                      │
│Precio │Precio  │Precio                      │
└─────────────────────────────────────────────┘
```

## Columnas

### Lunes

- Día
- Imagen
- Nombre Promo

### Martes

- Día
- Producto
- Imagen
- Precio

### Miércoles

- Día
- Producto
- Imagen
- Precio

---

# 3. Tarjeta de Sucursal (Componente Reutilizable)

Esta tarjeta se reutiliza para todas las sucursales.

---

## Layout Desktop

```
┌────────────────────────────────────────────────────────────┐
│                                                            │
│ Logo      SUCURSAL                                         │
│           Nombre                                           │
│                                                            │
│ 📍 Dirección                           WhatsApp            │
│                                       Uber Eats            │
│ HORARIOS                              Rappi                │
│ Lunes...                              Pedido Online        │
│ Viernes...                            Menú                 │
│ Domingo...                            Teléfono             │
│                                                            │
│ [ Información de la sucursal ]                             │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

## Layout Mobile

```
Logo

Sucursal

Nombre

Dirección

Horarios

Botón Información

──────────────

WhatsApp

Uber Eats

Pedido Online

Menú
```

---

# Componentes

## Logo

- Logo circular pequeño

---

## Encabezado

```
SUCURSAL

BODECATTA BBQ THE PARK
```

---

## Dirección

Incluye:

- icono ubicación
- enlace Google Maps

Formato

```
📍

Antonio Rocha Cordero 157
Desarrollo del Pedregal
San Luis Potosí
```

---

## Horarios

```
HORARIO

Lunes a Jueves

13:00 - 21:30

Viernes a Sábado

13:00 - 22:00

Domingo

13:00 - 21:30
```

---

## CTA Primario

```
Información Sucursal
```

Destino

```
/sucursales/the-park
```

---

## Columna de acciones

Cada botón es independiente.

### WhatsApp

Texto

```
444 XXX XXXX
```

Acción

Abrir conversación.

---

### Pedido Uber Eats

Botón

```
Pedido Uber Eats
```

---

### Pedido Rappi

Solo cuando exista.

---

### Pedido Online

Botón

```
Pedido Online
```

---

### Menú

Botón

```
Menú
```

---

# 4. Sucursal The Park

## Información

**Nombre**

```
Bodecatta BBQ The Park
```

**Dirección**

Antonio Rocha Cordero 157
Desarrollo del Pedregal
San Luis Potosí

**Horario**

Lunes–Jueves

13:00–21:30

Viernes–Sábado

13:00–22:00

Domingo

13:00–21:30

## Botones

- WhatsApp
- Uber Eats
- Rappi
- Pedido Online
- Menú

---

# 5. Sucursal 7B

## Información

Nombre

```
Bodecatta BBQ 7B
```

Dirección

Av. Benito Juárez 4055

Pozos

Horario

Martes–Jueves

13:00–21:00

Viernes–Sábado

13:00–22:30

Domingo

13:00–20:00

## Botones

- WhatsApp
- Uber Eats
- Pedido Online
- Menú

---

# 6. Sucursal WTC

## Información

Nombre

```
Bodecatta WTC
```

Horario

Lunes–Viernes

11:00–16:30

## Botones

- WhatsApp
- Menú

---

# 7. Club de Beneficios

## Objetivo

Capturar registros al programa de fidelización.

---

## Layout

```
┌───────────────────────────────────────────────┐
│                                               │
│ Registra tus visitas                          │
│                                               │
│ • Papas gratis                                │
│ • Segunda hamburguesa al 50%                  │
│ • Refill gratis                               │
│ • Beneficios exclusivos                       │
│                                               │
│ [ Club de Beneficios ]     📱 QR              │
│                                               │
└───────────────────────────────────────────────┘
```

---

## Copy

### Título

```
Registra tus visitas y obtén beneficios exclusivos
```

### Beneficios

- Papas gratis
- Segunda hamburguesa al 50%
- Refill gratis
- Más beneficios exclusivos

### CTA

```
Club de Beneficios
```

---

# 8. Footer

## Contenido

Izquierda

- Términos y ayuda
- Política de privacidad

Derecha

```
Diseñado por Bodecatta BBQ
```

---

# Componentes reutilizables

## Card

- Fondo #2D2D2D
- Border Radius 18 px
- Padding 32 px

---

## Botón Pill

- Altura 42 px
- Radius 999 px
- Fondo #B8E4EC
- Texto oscuro
- Hover con sombra ligera

---

## Badge Precio

- Circular
- Azul claro
- Texto negro

---

## Tipografía

### Headings

Oswald Bold

Mayúsculas

Tracking +3%

### Body

Barlow Regular

---

# Paleta

| Elemento | Color |
|-----------|--------|
| Fondo | `#F5F5F5` |
| Cards | `#2D2D2D` |
| Beige | `#F5F5DC` |
| Azul botones | `#B8E4EC` |
| Negro | `#000000` |
| Blanco | `#FFFFFF` |

---

# Flujo del Usuario

```text
Landing

↓

Ve promociones

↓

Selecciona sucursal

↓

Consulta ubicación y horarios

↓

Hace clic en una acción

├── WhatsApp
├── Pedido Online
├── Uber Eats
├── Menú
└── Información de la sucursal

↓

(Opcional)

Se registra al Club de Beneficios
```

---

# Prioridad Visual

1. Logo
2. Promociones de la semana
3. Tarjetas de sucursales
4. Botones de acción (WhatsApp / Pedido / Menú)
5. Club de Beneficios
6. Footer

---

# Mejoras recomendadas para la nueva versión

Además de replicar la estructura actual, se recomienda incorporar:

- **Hero introductorio** con el título "Encuentra tu sucursal favorita" y un breve texto de apoyo.
- **Mapa interactivo** con marcadores de las tres sucursales y opción de abrir Google Maps.
- **Estado de sucursal** (Abierta ahora / Cierra en X minutos) calculado según el horario.
- **CTA fijo en móvil** con botones rápidos de WhatsApp y Cómo llegar.
- **Galería de fotos** de cada sucursal accesible desde "Información Sucursal".
- **Indicadores visuales** de servicios disponibles (🍔 Comedor, 🚗 Pickup, 🛵 Delivery, 🍺 Cerveza artesanal).
- **Microanimaciones** en los botones tipo pill y efecto hover sobre las tarjetas para reforzar la experiencia premium de la marca.