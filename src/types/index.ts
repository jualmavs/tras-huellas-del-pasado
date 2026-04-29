// ─── Recuerdo (Memory) ───────────────────────────────────────────────────────
export interface Recuerdo {
  id: string;
  categoria: string;
  icono: string;
  titulo: string;
  subtitulo: string;
  citas: string[];
  colorAccent: string;
  colorBg: string;
}

// ─── Protagonista (Person honoured) ─────────────────────────────────────────
export interface Protagonista {
  id: string;
  nombre: string;
  rol: string;
  descripcion: string;
  aporte: string;
  iniciales: string;
  colorBg: string;
  colorText: string;
  destacado?: boolean;
}

// ─── Hito histórico (Timeline event) ─────────────────────────────────────────
export interface HitoHistorico {
  id: string;
  epoca: string;
  titulo: string;
  descripcion: string;
  icono: string;
  color: string;
}

// ─── Comentario de la comunidad ───────────────────────────────────────────────
export interface Comentario {
  id: string;
  nombre: string;
  mensaje: string;
  fecha: string;
  categoria?: string;
}

// ─── Navigation link ─────────────────────────────────────────────────────────
export interface NavLink {
  href: string;
  label: string;
}
