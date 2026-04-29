
# Tras las Huellas del Pasado · Cerritos – Pereira

Sitio web de memoria histórica del corregimiento de Cerritos, Pereira.  
Proyecto liderado por la docente **María Alejandra Alzate Toro** y desarrollado por **Juan Manuel Arbeláez**.

---

## 🌐 Live Demo

🔗 https://cerritos-memoriaviva.vercel.app/

---

## 📖 Descripción

Este proyecto digital busca preservar la memoria histórica, cultural y social de la comunidad de Cerritos mediante relatos, protagonistas, imágenes y testimonios.

Inspirado en el libro **Tras las Huellas del Pasado de Cerritos-Pereira by María Alejandra Alzate Toro**, este sitio continuará creciendo a medida que se recopilen nuevas historias de la comunidad.

Nuestro propósito es dejar un legado para futuras generaciones y fortalecer la identidad cultural del territorio.

---

## 🚀 Inicio Rápido

### Requisitos

- Node.js 18+
- npm 9+

### Instalación

```bash
# Entrar al proyecto
cd cerritos-web

# Instalar dependencias
npm install

# Ejecutar servidor local
npm run dev
````

Luego abre en tu navegador:

```txt
http://localhost:5173
```

---

## 🏗️ Build de Producción

```bash
npm run build
npm run preview
```

---

## 📁 Estructura del Proyecto

```txt
src/
├── App.tsx
├── main.tsx
├── index.css
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   │
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── HistoriaSection.tsx
│   │   ├── RecuerdosSection.tsx
│   │   ├── ProtagonistasSection.tsx
│   │   ├── GaleriaSection.tsx
│   │   └── ComunidadSection.tsx
│   │
│   └── ui/
│       ├── AnimatedSection.tsx
│       ├── ScrollProgress.tsx
│       └── SectionHeader.tsx
│
├── data/
│   ├── recuerdos.ts
│   ├── protagonistas.ts
│   └── historia.ts
│
├── hooks/
│   └── useIntersection.ts
│
└── types/
    └── index.ts
```

---

## 🎨 Personalización

| Elemento              | Archivo                     |
| --------------------- | --------------------------- |
| Colores y tipografías | `tailwind.config.js`        |
| Estilos globales      | `src/index.css`             |
| Contenido histórico   | `src/data/recuerdos.ts`     |
| Protagonistas         | `src/data/protagonistas.ts` |
| Línea del tiempo      | `src/data/historia.ts`      |

---

## 📦 Dependencias Principales

| Tecnología    | Uso                   |
| ------------- | --------------------- |
| React 18      | Interfaz de usuario   |
| Vite          | Entorno de desarrollo |
| Tailwind CSS  | Estilos modernos      |
| Framer Motion | Animaciones           |
| TypeScript    | Tipado estático       |
| Lucide React  | Iconografía           |

---

## 🔒 Licencia

Copyright (c) 2026-present Juan Manuel Arbeláez Alzate.
Colombia, Risaralda, Pereira.
Todos los derechos reservados.

Este proyecto y todo su contenido (código fuente, diseño, estructura, textos, imágenes y recursos relacionados) son propiedad exclusiva del titular.

No se concede permiso para copiar, modificar, distribuir, reutilizar, vender, publicar o explotar este proyecto total o parcialmente sin autorización previa y por escrito del autor.

La visualización pública del repositorio no implica cesión de derechos ni licencia de uso.

Para permisos especiales o colaboraciones, contactar al titular.

---

## 🤝 Reconocimientos

Proyecto basado en la obra:

**Tras las Huellas del Pasado de Cerritos-Pereira de María Alejandra Alzate Toro**

Gracias a la comunidad de Cerritos por mantener viva su memoria histórica.

---

## 📌 Estado del Proyecto

🟢 En desarrollo activo.
El contenido continuará ampliándose con nuevos testimonios, archivos históricos y aportes comunitarios.
Aún no se muestran imágenes, debido a que esta en fase de maquetación y aprobación de la autora de la obra. 

```
```
