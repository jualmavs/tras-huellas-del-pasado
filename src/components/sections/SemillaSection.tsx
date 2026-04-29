import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft, MapPin } from 'lucide-react'
import AnimatedSection from '../ui/AnimatedSection'

// ─── Types ─────────────────────────────────────────────────────────────────
interface ZoomLevel {
  id: string
  emoji: string
  label: string
  sublabel: string
  fact: string
  MapArt: () => JSX.Element
}

// ─────────────────────────────────────────────────────────────────────────────
// SVG helper: all maps share viewBox="0 0 320 320"
// A clipPath named "globe" (r=130 at 160,160) is declared once per SVG
// so geography never bleeds outside the display circle.
// ─────────────────────────────────────────────────────────────────────────────

// ─── Level 0 — Mundo ────────────────────────────────────────────────────────
function MundoSVG() {
  return (
    <svg viewBox="0 0 320 320" className="w-full h-full" aria-label="Planeta Tierra">
      <defs>
        {/* Main clip: everything inside the globe circle */}
        <clipPath id="globe-clip-0">
          <circle cx="160" cy="160" r="130" />
        </clipPath>
        {/* Radial gradient: ocean depth effect */}
        <radialGradient id="ocean-0" cx="45%" cy="40%" r="60%">
          <stop offset="0%"  stopColor="#0A3D5C" />
          <stop offset="100%" stopColor="#041828" />
        </radialGradient>
      </defs>

      {/* Stars background (outside globe) */}
      {[
        [12,14],[38,8],[68,22],[95,12],[130,5],[200,10],[240,18],[275,8],
        [300,22],[310,45],[305,80],[295,120],[8,90],[18,130],[5,160],
        [15,200],[10,240],[28,275],[48,305],[80,312],[120,308],[165,315],
        [210,310],[255,308],[285,295],[308,270],[315,230],[312,190],[308,150],
        [315,110],[310,70],[290,40],[260,20],[230,8],[190,3],[155,6]
      ].map(([cx,cy],i) => (
        <circle key={i} cx={cx} cy={cy} r={i%4===0?1.2:0.7}
          fill="#C9A84C" opacity={0.2+((i*7)%4)*0.08}/>
      ))}

      {/* Ocean fill — clipped to globe */}
      <circle cx="160" cy="160" r="130" fill="url(#ocean-0)" />

      {/* All land clipped to globe circle */}
      <g clipPath="url(#globe-clip-0)">

        {/* Grid lines */}
        {/* Equator */}
        <line x1="30" y1="160" x2="290" y2="160" stroke="#1A5A7A" strokeWidth="0.5" opacity="0.4"/>
        {/* Tropics + polar */}
        {[136,184,112,208].map((y,i)=>(
          <line key={i} x1="30" y1={y} x2="290" y2={y}
            stroke="#1A5A7A" strokeWidth="0.3" strokeDasharray="3,4" opacity="0.25"/>
        ))}
        {/* Meridians (vertical, simplified) */}
        {[100,130,160,190,220].map((x,i)=>(
          <line key={i} x1={x} y1="30" x2={x} y2="290"
            stroke="#1A5A7A" strokeWidth="0.3" strokeDasharray="3,4" opacity="0.2"/>
        ))}

        {/* ─── NORTH AMERICA ─── */}
        {/* Alaska */}
        <path d="M 34,68 L 58,58 L 78,64 L 82,78 L 68,88 L 42,85 Z"
          fill="#1E5A2A" opacity="0.85"/>
        {/* Main NA */}
        <path d="M 72,80 L 128,55 L 155,60 L 162,80 L 152,100
                 L 138,120 L 125,138 L 110,150 L 90,148
                 L 74,130 L 64,108 Z"
          fill="#1E5A2A" opacity="0.85"/>
        {/* Mexico */}
        <path d="M 84,148 L 108,150 L 118,165 L 110,178 L 92,175 L 80,162 Z"
          fill="#1E5A2A" opacity="0.85"/>
        {/* Caribbean (hint) */}
        <rect x="118" y="163" width="12" height="6" rx="2" fill="#1E5A2A" opacity="0.6"/>

        {/* ─── SOUTH AMERICA ─── (Columbus's landmass, northwest top) */}
        <path d="M 108,178 L 130,170 L 148,172 L 162,178
                 L 170,192 L 174,212 L 170,234 L 160,254
                 L 148,268 L 134,272 L 118,264 L 106,246
                 L 98,224 L 96,202 L 100,186 Z"
          fill="#2A6E30" opacity="0.9"/>
        {/* Colombia (NW of SA) */}
        <path d="M 108,178 L 126,172 L 136,176 L 138,188
                 L 126,194 L 112,192 L 104,184 Z"
          fill="#4A8E40" stroke="#D4890A" strokeWidth="0.8" opacity="0.95"/>

        {/* ─── EUROPE ─── */}
        <path d="M 172,74 L 196,68 L 210,76 L 212,90 L 200,100
                 L 186,98 L 175,88 Z"
          fill="#1E5A2A" opacity="0.75"/>
        {/* Iberian peninsula */}
        <path d="M 164,95 L 178,90 L 182,102 L 172,112 L 160,108 Z"
          fill="#1E5A2A" opacity="0.75"/>
        {/* Scandinavia */}
        <path d="M 186,56 L 198,50 L 205,62 L 196,72 L 183,68 Z"
          fill="#1E5A2A" opacity="0.65"/>

        {/* ─── AFRICA ─── */}
        <path d="M 178,104 L 208,98 L 220,112 L 224,134 L 218,158
                 L 210,178 L 196,196 L 180,200 L 168,188
                 L 164,168 L 166,144 L 170,122 Z"
          fill="#1E5A2A" opacity="0.8"/>
        {/* Madagascar */}
        <rect x="224" y="172" width="8" height="18" rx="3" fill="#1E5A2A" opacity="0.7"/>

        {/* ─── ASIA ─── (right portion visible) */}
        <path d="M 212,68 L 268,58 L 288,72 L 285,100 L 268,118
                 L 242,124 L 218,116 L 208,98 L 210,80 Z"
          fill="#1E5A2A" opacity="0.72"/>
        {/* India */}
        <path d="M 234,118 L 248,115 L 252,134 L 242,146 L 228,138 Z"
          fill="#1E5A2A" opacity="0.7"/>
        {/* SE Asia */}
        <path d="M 258,118 L 282,112 L 288,128 L 270,136 L 254,130 Z"
          fill="#1E5A2A" opacity="0.65"/>
        {/* Japan (hint) */}
        <ellipse cx="286" cy="96" rx="5" ry="10" fill="#1E5A2A" opacity="0.7"
          transform="rotate(-20,286,96)"/>

        {/* ─── AUSTRALIA ─── */}
        <path d="M 258,198 L 288,194 L 292,216 L 282,234 L 260,236 L 248,220 Z"
          fill="#1E5A2A" opacity="0.68"/>

        {/* ─── GREENLAND ─── */}
        <path d="M 150,40 L 168,32 L 180,42 L 174,58 L 156,60 Z"
          fill="#1E5A2A" opacity="0.6"/>

      </g>

      {/* Globe outer border + shine */}
      <circle cx="160" cy="160" r="130" fill="none" stroke="#2A7A9A" strokeWidth="1.5"/>
      <ellipse cx="130" cy="120" rx="22" ry="38" fill="white" opacity="0.04"
        transform="rotate(-35,130,120)"/>

      {/* Colombia PULSE (on top, outside clip so it's always visible) */}
      <circle cx="121" cy="184" r="18" fill="#D4890A" opacity="0.08"/>
      <circle cx="121" cy="184" r="10" fill="#D4890A" opacity="0.18"/>
      <circle cx="121" cy="184" r="5"  fill="#D4890A" opacity="0.6"/>
      <circle cx="121" cy="184" r="2"  fill="#FFC84A"/>

      {/* Label strip */}
      <text x="160" y="305" textAnchor="middle" fill="#C9A84C" fontSize="10"
        fontFamily="'Playfair Display',Georgia,serif" letterSpacing="4">PLANETA TIERRA</text>
    </svg>
  )
}

// ─── Level 1 — Suramérica ────────────────────────────────────────────────────
function AmericaSVG() {
  return (
    <svg viewBox="0 0 320 320" className="w-full h-full" aria-label="Suramérica">
      <defs>
        <clipPath id="sa-clip">
          <rect x="20" y="20" width="280" height="275" rx="12"/>
        </clipPath>
        <linearGradient id="sa-ocean" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#061420"/>
          <stop offset="100%" stopColor="#041018"/>
        </linearGradient>
      </defs>

      <rect x="20" y="20" width="280" height="275" rx="12" fill="url(#sa-ocean)"/>

      <g clipPath="url(#sa-clip)">
        {/* Ocean grid */}
        {[60,100,140,180,220,260].map((y,i)=>(
          <line key={i} x1="20" y1={y} x2="300" y2={y}
            stroke="#0A2A40" strokeWidth="0.4" opacity="0.5"/>
        ))}
        {[80,130,180,230].map((x,i)=>(
          <line key={i} x1={x} y1="20" x2={x} y2="295"
            stroke="#0A2A40" strokeWidth="0.4" opacity="0.4"/>
        ))}

        {/* ── Hint: Central America + Mexico (north, faded) ── */}
        <path d="M 58,22 L 95,20 L 115,28 L 118,40 L 100,50 L 80,50 L 60,40 Z"
          fill="#194A20" opacity="0.35"/>

        {/* ── SOUTH AMERICA main body ──
             Based on accurate proportions:
             - NW (Colombia/Venezuela): wide and squarish
             - NE (Brazil): huge bulge eastward
             - Center: narrows slightly (Peru/Bolivia)
             - South: Patagonia narrows dramatically
             - SE tip: Tierra del Fuego ~50°S
        ── */}
        <path d="
          M 85,50
          C 100,44 120,42 140,43
          C 160,44 175,46 190,52
          C 210,60 225,70 232,84
          C 238,95 238,108 232,120
          C 244,128 252,138 254,152
          C 256,166 250,180 240,192
          C 228,205 215,215 204,228
          C 195,240 190,252 185,265
          C 180,276 172,285 160,288
          C 148,291 136,288 126,280
          C 116,272 108,258 100,244
          C 90,228 82,210 76,190
          C 70,170 68,148 70,128
          C 72,108 76,90 82,72
          Z
        " fill="#1A4A22" stroke="#2A6A30" strokeWidth="0.8"/>

        {/* Amazon Basin (darker green, interior) */}
        <path d="
          M 130,85 L 180,80 L 220,100 L 228,125 L 215,145
          L 190,158 L 160,162 L 135,155 L 118,135 L 115,110 Z
        " fill="#123A18" opacity="0.5"/>

        {/* Andes mountain range (west coast ridge) */}
        {[0,1,2,3,4,5,6,7,8].map(i=>(
          <path key={i}
            d={`M ${82+i*2},${68+i*22} L ${88+i*2},${54+i*22} L ${94+i*2},${68+i*22} Z`}
            fill="#245A28" opacity="0.4"/>
        ))}

        {/* Patagonia area (lighter, windswept) */}
        <path d="M 115,240 L 138,235 L 155,242 L 158,260 L 148,278
                 L 130,280 L 112,268 L 108,252 Z"
          fill="#152F18" opacity="0.9"/>

        {/* Tierra del Fuego hint */}
        <path d="M 125,280 L 145,278 L 148,290 L 130,292 Z"
          fill="#0F2012" opacity="0.8"/>

        {/* ── VENEZUELA (north coast, east of Colombia) ── */}
        <path d="M 140,43 L 190,38 L 205,48 L 195,60 L 168,62 L 140,58 Z"
          fill="#204A28" opacity="0.7"/>

        {/* ── COLOMBIA — highlighted northwest ── */}
        <path d="
          M 85,50
          C 100,44 120,42 140,43
          L 140,58 L 120,65 L 108,78
          L 96,82 L 84,72
          Z
        " fill="#3A7A2A" stroke="#D4890A" strokeWidth="1.2"/>

        {/* Colombia glow */}
        <circle cx="108" cy="60" r="14" fill="#D4890A" opacity="0.12"/>
        <circle cx="108" cy="60" r="7"  fill="#D4890A" opacity="0.35"/>
        <circle cx="108" cy="60" r="3"  fill="#FFC84A" opacity="0.95"/>

        {/* Country labels */}
        <text x="108" y="58" textAnchor="middle" fill="#FFC84A" fontSize="7.5"
          fontFamily="sans-serif" fontWeight="bold">Colombia</text>
        <text x="180" y="130" textAnchor="middle" fill="#3A7A40" fontSize="9"
          fontFamily="sans-serif" opacity="0.7">Brasil</text>
        <text x="88" y="155" textAnchor="middle" fill="#3A7A40" fontSize="7"
          fontFamily="sans-serif" opacity="0.65">Perú</text>
        <text x="138" y="200" textAnchor="middle" fill="#3A7A40" fontSize="7"
          fontFamily="sans-serif" opacity="0.6">Bolivia</text>
        <text x="140" y="250" textAnchor="middle" fill="#3A7A40" fontSize="7"
          fontFamily="sans-serif" opacity="0.65">Argentina</text>
        <text x="192" y="200" textAnchor="middle" fill="#3A7A40" fontSize="7"
          fontFamily="sans-serif" opacity="0.55">Paraguay</text>
        <text x="178" y="255" textAnchor="middle" fill="#3A7A40" fontSize="7"
          fontFamily="sans-serif" opacity="0.6">Uruguay</text>

        {/* Pacific Ocean label */}
        <text x="42" y="170" textAnchor="middle" fill="#1A6A9A" fontSize="7"
          fontFamily="sans-serif" opacity="0.7"
          transform="rotate(-90,42,170)">Pacífico</text>
        {/* Atlantic Ocean label */}
        <text x="278" y="170" textAnchor="middle" fill="#1A6A9A" fontSize="7"
          fontFamily="sans-serif" opacity="0.7"
          transform="rotate(90,278,170)">Atlántico</text>

        {/* Ecuador line */}
        <line x1="20" y1="86" x2="300" y2="86" stroke="#D4890A" strokeWidth="0.5"
          strokeDasharray="4,6" opacity="0.3"/>
        <text x="280" y="84" fill="#D4890A" fontSize="6" opacity="0.5">Ecuador</text>
      </g>

      {/* Border */}
      <rect x="20" y="20" width="280" height="275" rx="12"
        fill="none" stroke="#1A4A5A" strokeWidth="1"/>
      <text x="160" y="307" textAnchor="middle" fill="#C9A84C" fontSize="10"
        fontFamily="'Playfair Display',Georgia,serif" letterSpacing="4">SURAMÉRICA</text>
    </svg>
  )
}

// ─── Level 2 — Colombia ──────────────────────────────────────────────────────
function ColombiaSVG() {
  return (
    <svg viewBox="0 0 320 320" className="w-full h-full" aria-label="Colombia">
      <defs>
        <clipPath id="col-clip">
          <rect x="20" y="20" width="280" height="275" rx="12"/>
        </clipPath>
        <linearGradient id="col-ocean" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#061420"/>
          <stop offset="100%" stopColor="#041018"/>
        </linearGradient>
      </defs>

      <rect x="20" y="20" width="280" height="275" rx="12" fill="url(#col-ocean)"/>

      <g clipPath="url(#col-clip)">
        {/* Ocean grid */}
        {[70,120,170,220].map((y,i)=>(
          <line key={i} x1="20" y1={y} x2="300" y2={y}
            stroke="#0A2A40" strokeWidth="0.35" opacity="0.45"/>
        ))}

        {/* ── COLOMBIA ──
            Accurate shape: Colombia has a distinctive form —
            wide Caribbean coast (NW to NE), Pacific coast (W, shorter),
            large eastern llanos/Amazon region (flat, right side),
            Andes in center-west
        ── */}
        <path d="
          M 68,52
          L 100,40
          L 140,36
          L 175,38
          L 195,48
          L 208,62
          L 210,78
          L 228,80
          L 242,90
          L 248,108
          L 238,124
          L 240,140
          L 232,158
          L 218,170
          L 200,178
          L 195,195
          L 178,208
          L 165,218
          L 148,222
          L 132,215
          L 118,205
          L 105,195
          L 92,180
          L 78,168
          L 65,155
          L 55,138
          L 50,118
          L 50,95
          L 55,72
          Z
        " fill="#1A4A1E" stroke="#2A6A28" strokeWidth="0.8"/>

        {/* ── Andes mountain ranges (3 cordilleras) ── */}
        {/* Cordillera Occidental */}
        {[0,1,2,3,4,5].map(i=>(
          <path key={i}
            d={`M ${72+i*3},${65+i*26} L ${78+i*3},${50+i*26} L ${84+i*3},${65+i*26} Z`}
            fill="#2A5A25" opacity="0.45"/>
        ))}
        {/* Cordillera Central */}
        {[0,1,2,3,4,5].map(i=>(
          <path key={i}
            d={`M ${105+i*3},${60+i*24} L ${111+i*3},${46+i*24} L ${117+i*3},${60+i*24} Z`}
            fill="#2A5A25" opacity="0.4"/>
        ))}
        {/* Cordillera Oriental */}
        {[0,1,2,3,4,5].map(i=>(
          <path key={i}
            d={`M ${138+i*3},${58+i*22} L ${144+i*3},${44+i*22} L ${150+i*3},${58+i*22} Z`}
            fill="#2A5A25" opacity="0.35"/>
        ))}

        {/* Amazon / Llanos (eastern plains — flatter, lighter) */}
        <path d="M 185,70 L 242,90 L 248,130 L 230,165 L 195,180
                 L 178,165 L 182,130 L 188,100 Z"
          fill="#0F2E12" opacity="0.5"/>

        {/* Pacific coast strip */}
        <path d="M 55,72 L 68,65 L 72,145 L 64,150 L 52,125 Z"
          fill="#0A3A50" opacity="0.6"/>

        {/* Caribbean coast strip (top) */}
        <path d="M 68,52 L 175,38 L 195,48 L 190,58 L 80,60 Z"
          fill="#0A3A50" opacity="0.5"/>

        {/* Río Magdalena (main river, center) */}
        <path d="M 148,220 L 142,190 L 136,158 L 132,128 L 130,98 L 128,72 L 132,48"
          fill="none" stroke="#1A7A5A" strokeWidth="1.8" opacity="0.75"/>

        {/* Río Cauca */}
        <path d="M 120,205 L 116,175 L 112,145 L 108,115 L 104,85 L 100,60"
          fill="none" stroke="#1A7A5A" strokeWidth="1.2" opacity="0.6"/>

        {/* ── RISARALDA — highlighted (Eje Cafetero, center-west) ── */}
        <path d="M 96,118 L 116,112 L 128,120 L 126,138 L 112,146 L 94,140 L 88,128 Z"
          fill="#4A8A2A" stroke="#D4890A" strokeWidth="1.5"/>

        {/* Risaralda / Pereira glow */}
        <circle cx="108" cy="128" r="14" fill="#D4890A" opacity="0.12"/>
        <circle cx="108" cy="128" r="7"  fill="#D4890A" opacity="0.4"/>
        <circle cx="108" cy="128" r="2.5" fill="#FFC84A" opacity="0.95"/>

        {/* City labels */}
        <text x="108" y="125" textAnchor="middle" fill="#FFC84A" fontSize="7"
          fontFamily="sans-serif" fontWeight="bold">Risaralda</text>

        {/* Key cities */}
        {[
          [128,52,"Barranquilla"],
          [175,55,"Bogotá",true],
          [65,100,"Buenaventura"],
          [200,145,"Villavicencio"],
          [90,200,"Cali"],
        ].map(([x,y,name,bold],i)=>(
          <g key={i}>
            <circle cx={x as number} cy={y as number} r="2.5"
              fill={bold?"#8B9A6A":"#5A7A5A"} opacity="0.8"/>
            <text x={(x as number)+6} y={(y as number)+4} fill="#6A9A6A"
              fontSize="6" fontFamily="sans-serif" opacity="0.75"
              fontWeight={bold?"bold":"normal"}>{name as string}</text>
          </g>
        ))}

        {/* Ocean labels */}
        <text x="36" y="140" textAnchor="middle" fill="#1A6A9A" fontSize="6.5"
          fontFamily="sans-serif" opacity="0.7"
          transform="rotate(-90,36,140)">Pacífico</text>
        <text x="260" y="100" textAnchor="middle" fill="#1A6A9A" fontSize="6.5"
          fontFamily="sans-serif" opacity="0.7"
          transform="rotate(90,260,100)">Llanos</text>
        <text x="155" y="33" textAnchor="middle" fill="#1A6A9A" fontSize="6.5"
          fontFamily="sans-serif" opacity="0.65">Mar Caribe</text>

        {/* Equator line */}
        <line x1="20" y1="220" x2="300" y2="210" stroke="#D4890A" strokeWidth="0.5"
          strokeDasharray="4,6" opacity="0.3"/>
        <text x="240" y="207" fill="#D4890A" fontSize="5.5" opacity="0.45">Ecuador</text>
      </g>

      <rect x="20" y="20" width="280" height="275" rx="12"
        fill="none" stroke="#1A4A5A" strokeWidth="1"/>
      <text x="160" y="307" textAnchor="middle" fill="#C9A84C" fontSize="10"
        fontFamily="'Playfair Display',Georgia,serif" letterSpacing="4">COLOMBIA</text>
    </svg>
  )
}

// ─── Level 3 — Risaralda ────────────────────────────────────────────────────
function RisaraldaSVG() {
  return (
    <svg viewBox="0 0 320 320" className="w-full h-full" aria-label="Risaralda">
      <defs>
        <clipPath id="ris-clip">
          <rect x="20" y="20" width="280" height="275" rx="12"/>
        </clipPath>
      </defs>

      {/* Background — surrounding departments (muted) */}
      <rect x="20" y="20" width="280" height="275" rx="12" fill="#07120A"/>

      <g clipPath="url(#ris-clip)">
        {/* Surrounding departments (greyed out) */}
        {/* Chocó (west) */}
        <path d="M 20,40 L 90,35 L 95,80 L 88,150 L 90,200 L 85,250 L 20,250 Z"
          fill="#0E1E10" opacity="0.9"/>
        {/* Antioquia (north) */}
        <path d="M 88,20 L 300,20 L 300,85 L 230,90 L 180,88 L 140,92 L 100,88 L 88,80 Z"
          fill="#0E1E10" opacity="0.9"/>
        {/* Caldas (northeast) */}
        <path d="M 205,88 L 300,85 L 300,165 L 245,168 L 215,158 L 208,130 L 210,105 Z"
          fill="#0E1E10" opacity="0.9"/>
        {/* Quindío (southeast) */}
        <path d="M 175,195 L 245,195 L 248,268 L 175,270 Z"
          fill="#0E1E10" opacity="0.9"/>
        {/* Valle del Cauca (south) */}
        <path d="M 20,220 L 178,218 L 178,295 L 20,295 Z"
          fill="#0E1E10" opacity="0.9"/>

        {/* ── RISARALDA department boundary ──
            Real shape: roughly trapezoidal, wider at north (Apía, Quinchía),
            narrower at south. Bordered by Chocó (W), Antioquia (N), 
            Caldas (NE/E), Quindío (SE), Valle (S/SW)
        ── */}
        <path d="
          M 92,88
          L 145,86
          L 200,90
          L 210,108
          L 208,130
          L 205,152
          L 195,168
          L 180,178
          L 165,185
          L 148,188
          L 128,184
          L 108,174
          L 92,158
          L 88,136
          L 86,112
          Z
        " fill="#1A4A1E" stroke="#2A7A25" strokeWidth="1.5"/>

        {/* Cordillera Occidental (mountains, western side) */}
        {[0,1,2,3,4,5,6].map(i=>(
          <path key={i}
            d={`M ${95+i*4},${155-i*10} L ${101+i*4},${140-i*10} L ${107+i*4},${155-i*10} Z`}
            fill="#2A5A25" opacity="0.5"/>
        ))}

        {/* Cordillera Central (mountains, eastern side) */}
        {[0,1,2,3,4,5,6].map(i=>(
          <path key={i}
            d={`M ${172+i*4},${158-i*10} L ${178+i*4},${143-i*10} L ${184+i*4},${158-i*10} Z`}
            fill="#2A5A22" opacity="0.45"/>
        ))}

        {/* Río Cauca (runs N-S through center-east) */}
        <path d="M 178,88 C 174,110 170,130 168,152 C 166,168 162,178 158,190"
          fill="none" stroke="#1A8A5A" strokeWidth="2.5" opacity="0.85"/>

        {/* Río San Juan (west, into Chocó) */}
        <path d="M 95,115 C 80,118 70,125 55,130"
          fill="none" stroke="#1A8A5A" strokeWidth="1.5" opacity="0.6"/>

        {/* Coffee farms (characteristic of Eje Cafetero) */}
        {[
          [115,130],[125,140],[135,132],[145,138],[130,122],
          [150,125],[158,135],[140,148],[120,148],[155,148]
        ].map(([cx,cy],i)=>(
          <path key={i} d={`M ${cx},${cy-4} L ${cx+4},${cy+3} L ${cx-4},${cy+3} Z`}
            fill="#4A8A20" opacity="0.5"/>
        ))}

        {/* ── Municipalities ── */}
        {/* Pereira (capital, center) */}
        <circle cx="148" cy="150" r="16" fill="#D4890A" opacity="0.12"/>
        <circle cx="148" cy="150" r="8"  fill="#D4890A" opacity="0.4"/>
        <circle cx="148" cy="150" r="3"  fill="#FFC84A" opacity="0.95"/>
        <text x="160" y="148" fill="#FFC84A" fontSize="8.5"
          fontFamily="sans-serif" fontWeight="bold">Pereira</text>
        <text x="160" y="158" fill="#C9A84C" fontSize="6.5"
          fontFamily="sans-serif" opacity="0.8">(capital)</text>

        {/* Dosquebradas */}
        <circle cx="162" cy="128" r="4" fill="#5A8A40" opacity="0.75"/>
        <text x="170" y="131" fill="#5A8A40" fontSize="6.5"
          fontFamily="sans-serif" opacity="0.85">Dosquebradas</text>

        {/* Santa Rosa de Cabal */}
        <circle cx="170" cy="108" r="3.5" fill="#5A8A40" opacity="0.7"/>
        <text x="178" y="111" fill="#5A8A40" fontSize="6"
          fontFamily="sans-serif" opacity="0.8">Santa Rosa</text>

        {/* Marsella */}
        <circle cx="120" cy="118" r="3" fill="#5A8A40" opacity="0.65"/>
        <text x="106" y="116" fill="#5A8A40" fontSize="6"
          fontFamily="sans-serif" opacity="0.75">Marsella</text>

        {/* Apía */}
        <circle cx="108" cy="108" r="3" fill="#5A8A40" opacity="0.6"/>
        <text x="95" y="106" fill="#5A8A40" fontSize="6"
          fontFamily="sans-serif" opacity="0.7">Apía</text>

        {/* La Virginia */}
        <circle cx="130" cy="168" r="3" fill="#5A8A40" opacity="0.65"/>
        <text x="118" y="182" fill="#5A8A40" fontSize="6"
          fontFamily="sans-serif" opacity="0.75">La Virginia</text>

        {/* Guática */}
        <circle cx="120" cy="98" r="3" fill="#5A8A40" opacity="0.6"/>

        {/* Compass */}
        <g transform="translate(52,50)">
          <circle cx="0" cy="0" r="14" fill="#050E07" stroke="#2A4A2A" strokeWidth="0.8"/>
          <text x="0" y="-5" textAnchor="middle" fill="#C9A84C" fontSize="7" fontWeight="bold">N</text>
          <line x1="0" y1="-12" x2="0" y2="12" stroke="#C9A84C" strokeWidth="0.6" opacity="0.6"/>
          <line x1="-12" y1="0" x2="12" y2="0" stroke="#C9A84C" strokeWidth="0.6" opacity="0.6"/>
          <polygon points="0,-10 3,-2 -3,-2" fill="#C9A84C" opacity="0.8"/>
        </g>

        {/* Neighboring dept labels */}
        <text x="42" y="140" textAnchor="middle" fill="#3A5A3A" fontSize="7"
          fontFamily="sans-serif" opacity="0.5"
          transform="rotate(-90,42,140)">Chocó</text>
        <text x="160" y="38" textAnchor="middle" fill="#3A5A3A" fontSize="7"
          fontFamily="sans-serif" opacity="0.5">Antioquia</text>
        <text x="270" y="130" textAnchor="middle" fill="#3A5A3A" fontSize="7"
          fontFamily="sans-serif" opacity="0.5"
          transform="rotate(90,270,130)">Caldas</text>
        <text x="210" y="250" textAnchor="middle" fill="#3A5A3A" fontSize="7"
          fontFamily="sans-serif" opacity="0.5">Quindío</text>
        <text x="95" y="260" textAnchor="middle" fill="#3A5A3A" fontSize="7"
          fontFamily="sans-serif" opacity="0.5">Valle del Cauca</text>
      </g>

      <rect x="20" y="20" width="280" height="275" rx="12"
        fill="none" stroke="#1A4A5A" strokeWidth="1"/>
      <text x="160" y="307" textAnchor="middle" fill="#C9A84C" fontSize="10"
        fontFamily="'Playfair Display',Georgia,serif" letterSpacing="4">RISARALDA</text>
    </svg>
  )
}

// ─── Level 4 — Pereira ──────────────────────────────────────────────────────
function PereiraSVG() {
  return (
    <svg viewBox="0 0 320 320" className="w-full h-full" aria-label="Pereira">
      <defs>
        <clipPath id="per-clip">
          <rect x="20" y="20" width="280" height="275" rx="12"/>
        </clipPath>
      </defs>

      <rect x="20" y="20" width="280" height="275" rx="12" fill="#07120A"/>

      <g clipPath="url(#per-clip)">
        {/* Background terrain */}
        <rect x="20" y="20" width="280" height="275" fill="#0A180C" rx="12"/>

        {/* Hills / topography (darker contour fills) */}
        <ellipse cx="230" cy="100" rx="60" ry="45" fill="#0E2210" opacity="0.7"/>
        <ellipse cx="75" cy="200" rx="50" ry="40" fill="#0E2210" opacity="0.6"/>
        <ellipse cx="260" cy="220" rx="45" ry="35" fill="#0E2210" opacity="0.55"/>
        <ellipse cx="160" cy="60" rx="80" ry="35" fill="#0E2210" opacity="0.6"/>

        {/* ── Pereira municipality boundary ── */}
        <path d="
          M 65,65
          L 110,52
          L 160,50
          L 200,58
          L 238,72
          L 260,92
          L 265,118
          L 258,148
          L 245,172
          L 228,192
          L 205,208
          L 178,218
          L 148,222
          L 118,215
          L 90,200
          L 68,178
          L 52,155
          L 46,128
          L 48,100
          L 55,78
          Z
        " fill="#132A15" stroke="#1E4A20" strokeWidth="1.2"/>

        {/* ── Río Otún (runs E-W, through north of city) ── */}
        <path d="M 260,85 C 230,90 200,95 170,98 C 145,100 115,96 85,92 C 65,90 45,88 25,86"
          fill="none" stroke="#1A8A6A" strokeWidth="3" opacity="0.9"/>
        <text x="148" y="86" textAnchor="middle" fill="#1AAA7A" fontSize="7.5"
          fontFamily="sans-serif" opacity="0.9" fontStyle="italic">Río Otún</text>

        {/* ── Río Consota (runs E-W, through south of city) ── */}
        <path d="M 48,195 C 75,190 105,185 135,183 C 165,181 195,185 225,188 C 245,190 262,192 278,190"
          fill="none" stroke="#1A8A6A" strokeWidth="2.2" opacity="0.85"/>
        <text x="148" y="199" textAnchor="middle" fill="#1AAA7A" fontSize="7.5"
          fontFamily="sans-serif" opacity="0.85" fontStyle="italic">Río Consota</text>

        {/* ── Pereira urban area ── */}
        {/* Urban grid blocks (centro) */}
        <rect x="130" y="105" width="70" height="65" rx="3" fill="#1E4A20" opacity="0.7"/>
        {[0,1,2].map(i=>(
          <line key={i} x1="130" y1={120+i*18} x2="200" y2={120+i*18}
            stroke="#2A6A25" strokeWidth="0.5" opacity="0.5"/>
        ))}
        {[0,1,2].map(i=>(
          <line key={i} x1={148+i*18} y1="105" x2={148+i*18} y2="170"
            stroke="#2A6A25" strokeWidth="0.5" opacity="0.5"/>
        ))}

        {/* Dosquebradas (north, across Otún) */}
        <path d="M 165,52 L 215,58 L 232,72 L 220,90 L 185,92 L 162,85 L 160,70 Z"
          fill="#1A3A1C" stroke="#2A5A22" strokeWidth="0.8" opacity="0.8"/>
        <text x="195" y="76" textAnchor="middle" fill="#4A8A40" fontSize="7"
          fontFamily="sans-serif" opacity="0.9">Dosquebradas</text>

        {/* ── CERRITOS — western zone, highlighted ── */}
        <path d="M 48,100 L 90,95 L 100,110 L 98,140 L 90,158 L 72,165 L 52,155 L 44,135 L 46,115 Z"
          fill="#2A5A20" stroke="#D4890A" strokeWidth="1.8"/>

        {/* Cerritos glow + dot */}
        <circle cx="72" cy="128" r="18" fill="#D4890A" opacity="0.12"/>
        <circle cx="72" cy="128" r="9"  fill="#D4890A" opacity="0.35"/>
        <circle cx="72" cy="128" r="3.5" fill="#FFC84A" opacity="0.95"/>

        <text x="72" y="118" textAnchor="middle" fill="#FFC84A" fontSize="8.5"
          fontFamily="sans-serif" fontWeight="bold">Cerritos</text>

        {/* Pereira city center dot */}
        <circle cx="162" cy="138" r="6" fill="#4A8A40" opacity="0.8"/>
        <text x="162" y="153" textAnchor="middle" fill="#8ACA60" fontSize="8"
          fontFamily="sans-serif" fontWeight="bold">Centro</text>

        {/* Airport */}
        <g transform="translate(235,245)">
          <rect x="-18" y="-12" width="36" height="24" rx="4"
            fill="#061008" stroke="#2A5A40" strokeWidth="0.8" opacity="0.8"/>
          <text x="0" y="3" textAnchor="middle" fill="#4A8A9A" fontSize="12">✈</text>
        </g>
        <text x="235" y="262" textAnchor="middle" fill="#3A6A7A" fontSize="6.5"
          fontFamily="sans-serif" opacity="0.85">Aeropuerto</text>

        {/* Vía a Cerritos (main road west) */}
        <path d="M 130,138 L 100,132 L 72,128"
          fill="none" stroke="#3A5A30" strokeWidth="2.5" strokeDasharray="5,3" opacity="0.6"/>

        {/* Av. 30 de agosto (main north-south av) */}
        <path d="M 162,52 L 162,215"
          fill="none" stroke="#3A5A30" strokeWidth="1.5" opacity="0.4"/>

        {/* Compass */}
        <g transform="translate(270,52)">
          <circle cx="0" cy="0" r="14" fill="#050E07" stroke="#2A4A2A" strokeWidth="0.8"/>
          <text x="0" y="-5" textAnchor="middle" fill="#C9A84C" fontSize="7" fontWeight="bold">N</text>
          <line x1="0" y1="-11" x2="0" y2="11" stroke="#C9A84C" strokeWidth="0.6" opacity="0.6"/>
          <line x1="-11" y1="0" x2="11" y2="0" stroke="#C9A84C" strokeWidth="0.6" opacity="0.6"/>
          <polygon points="0,-9 2,-2 -2,-2" fill="#C9A84C" opacity="0.8"/>
        </g>
      </g>

      <rect x="20" y="20" width="280" height="275" rx="12"
        fill="none" stroke="#1A4A5A" strokeWidth="1"/>
      <text x="160" y="307" textAnchor="middle" fill="#C9A84C" fontSize="10"
        fontFamily="'Playfair Display',Georgia,serif" letterSpacing="4">PEREIRA</text>
    </svg>
  )
}

// ─── Level 5 — Cerritos ─────────────────────────────────────────────────────
function CerritosSVG() {
  return (
    <svg viewBox="0 0 320 320" className="w-full h-full" aria-label="Cerritos">
      <defs>
        <clipPath id="cer-clip">
          <rect x="20" y="20" width="280" height="275" rx="12"/>
        </clipPath>
      </defs>

      <rect x="20" y="20" width="280" height="275" rx="12" fill="#07120A"/>

      <g clipPath="url(#cer-clip)">

        {/* Base terrain — rolling hills, green valleys */}
        <rect x="20" y="20" width="280" height="275" fill="#091508" rx="12"/>

        {/* Hills silhouettes */}
        <path d="M 20,120 C 60,100 100,108 140,105 C 180,102 220,110 270,105 L 300,120 Z"
          fill="#0D2010" opacity="0.6"/>
        <path d="M 20,200 C 55,188 95,192 135,190 C 175,188 220,195 300,192 L 300,220 L 20,220 Z"
          fill="#0D2010" opacity="0.5"/>

        {/* ── Río La Vieja (western boundary, N-S) ── */}
        <path d="M 42,22 C 45,55 44,90 42,125 C 40,155 38,185 40,215 C 41,235 42,255 44,280"
          fill="none" stroke="#1A8A6A" strokeWidth="4" opacity="0.9"/>
        <text x="32" y="155" textAnchor="middle" fill="#1AAA7A" fontSize="6.5"
          fontFamily="sans-serif" opacity="0.9" fontStyle="italic"
          transform="rotate(-90,32,155)">Río La Vieja</text>

        {/* ── Río Consota (southern boundary) ── */}
        <path d="M 40,240 C 80,235 120,232 160,230 C 200,228 240,232 285,230"
          fill="none" stroke="#1A8A6A" strokeWidth="3" opacity="0.9"/>
        <text x="162" y="225" textAnchor="middle" fill="#1AAA7A" fontSize="7"
          fontFamily="sans-serif" opacity="0.9" fontStyle="italic">Río Consota</text>

        {/* ── Río Otún (northern boundary, hint) ── */}
        <path d="M 40,58 C 80,55 130,52 180,50 C 220,48 260,52 285,50"
          fill="none" stroke="#1A8A6A" strokeWidth="2" opacity="0.75"/>
        <text x="155" y="45" textAnchor="middle" fill="#1AAA7A" fontSize="7"
          fontFamily="sans-serif" opacity="0.75" fontStyle="italic">Río Otún</text>

        {/* ── Carretera Nacional (main road, N-S) ── */}
        <path d="M 175,22 L 172,295" stroke="#2A4A28" strokeWidth="6" opacity="0.55"/>
        <path d="M 175,22 L 172,295" stroke="#3A6A35" strokeWidth="2" opacity="0.35"
          strokeDasharray="8,6"/>
        <text x="185" y="78" fill="#3A6A35" fontSize="6.5" fontFamily="sans-serif"
          opacity="0.75">Vía Nacional</text>

        {/* ── Antigua carrilera del ferrocarril ── */}
        <path d="M 42,148 L 285,140" stroke="#5A3A1A" strokeWidth="2.5"
          strokeDasharray="7,5" opacity="0.7"/>
        {/* Rieles (sleepers) */}
        {[58,80,102,124,146,168,190,212,234,256,278].map((x,i)=>(
          <rect key={i} x={x-3} y="144" width="6" height="8" rx="1"
            fill="#3A2A1A" opacity="0.65"/>
        ))}
        <text x="108" y="165" fill="#8B6914" fontSize="6.5" fontFamily="sans-serif"
          opacity="0.8" fontStyle="italic">Antigua carrilera</text>

        {/* Coffee farms (Galicia Alta area) */}
        {[
          [210,90],[225,95],[215,108],[235,100],[220,115],
          [240,110],[230,125],[212,120],[245,118]
        ].map(([cx,cy],i)=>(
          <path key={i}
            d={`M ${cx},${cy-5} C ${cx+3},${cy-2} ${cx+5},${cy+3} ${cx},${cy+5} C ${cx-5},${cy+3} ${cx-3},${cy-2} ${cx},${cy-5} Z`}
            fill="#3A7A18" opacity="0.55"/>
        ))}

        {/* ── Sectors / Barrios ── */}
        {/* Galicia Alta */}
        <path d="M 195,72 L 258,68 L 268,105 L 248,130 L 195,128 L 182,100 Z"
          fill="#122A10" stroke="#1E4A18" strokeWidth="0.8" opacity="0.7"/>
        <text x="228" y="100" textAnchor="middle" fill="#4A8A30" fontSize="6.5"
          fontFamily="sans-serif" opacity="0.85">Galicia Alta</text>

        {/* Belmonte */}
        <path d="M 114,108 L 155,105 L 165,130 L 152,150 L 115,148 L 102,128 Z"
          fill="#122A10" stroke="#1E4A18" strokeWidth="0.8" opacity="0.7"/>
        <text x="135" y="130" textAnchor="middle" fill="#4A8A30" fontSize="6.5"
          fontFamily="sans-serif" opacity="0.85">Belmonte</text>

        {/* Las Colonias */}
        <path d="M 60,110 L 104,108 L 108,140 L 98,165 L 60,165 L 50,140 Z"
          fill="#122A10" stroke="#1E4A18" strokeWidth="0.8" opacity="0.6"/>
        <text x="80" y="140" textAnchor="middle" fill="#4A8A30" fontSize="6"
          fontFamily="sans-serif" opacity="0.8">Las Colonias</text>

        {/* Castilla */}
        <path d="M 195,170 L 268,165 L 272,200 L 250,215 L 195,210 L 188,188 Z"
          fill="#122A10" stroke="#1E4A18" strokeWidth="0.8" opacity="0.65"/>
        <text x="232" y="192" textAnchor="middle" fill="#4A8A30" fontSize="6.5"
          fontFamily="sans-serif" opacity="0.85">Castilla</text>

        {/* ── ESTACIÓN VILLEGAS — hero location ── */}
        {/* Glow rings */}
        <circle cx="130" cy="142" r="30" fill="#D4890A" opacity="0.06"/>
        <circle cx="130" cy="142" r="20" fill="#D4890A" opacity="0.12"/>
        <circle cx="130" cy="142" r="12" fill="#D4890A" opacity="0.25"/>
        <circle cx="130" cy="142" r="6"  fill="#D4890A" opacity="0.6"/>
        <circle cx="130" cy="142" r="2.5" fill="#FFC84A" opacity="0.98"/>

        <text x="130" y="118" textAnchor="middle" fill="#FFC84A" fontSize="8.5"
          fontFamily="'Playfair Display',Georgia,serif" fontWeight="bold">Estación</text>
        <text x="130" y="130" textAnchor="middle" fill="#FFC84A" fontSize="8.5"
          fontFamily="'Playfair Display',Georgia,serif" fontWeight="bold">Villegas</text>

        {/* UKUMARÍ */}
        <circle cx="248" cy="148" r="5" fill="#4A8A30" opacity="0.75"/>
        <text x="257" y="152" fill="#4A8A30" fontSize="6.5" fontFamily="sans-serif"
          opacity="0.9">UKUMARÍ</text>

        {/* Compass rose */}
        <g transform="translate(268,52)">
          <circle cx="0" cy="0" r="15" fill="#050E07" stroke="#2A4A2A" strokeWidth="0.8"/>
          <text x="0" y="-5" textAnchor="middle" fill="#C9A84C" fontSize="8" fontWeight="bold">N</text>
          <text x="0" y="11" textAnchor="middle" fill="#C9A84C" fontSize="6" opacity="0.6">S</text>
          <text x="-10" y="3" textAnchor="middle" fill="#C9A84C" fontSize="6" opacity="0.6">O</text>
          <text x="10" y="3" textAnchor="middle" fill="#C9A84C" fontSize="6" opacity="0.6">E</text>
          <line x1="0" y1="-12" x2="0" y2="12" stroke="#C9A84C" strokeWidth="0.6" opacity="0.5"/>
          <line x1="-12" y1="0" x2="12" y2="0" stroke="#C9A84C" strokeWidth="0.6" opacity="0.5"/>
          <polygon points="0,-10 2.5,-2 -2.5,-2" fill="#C9A84C" opacity="0.9"/>
        </g>

        {/* Scale bar */}
        <g transform="translate(50,278)">
          <line x1="0" y1="0" x2="60" y2="0" stroke="#C9A84C" strokeWidth="1.2" opacity="0.6"/>
          <line x1="0" y1="-4" x2="0" y2="4" stroke="#C9A84C" strokeWidth="1" opacity="0.6"/>
          <line x1="60" y1="-4" x2="60" y2="4" stroke="#C9A84C" strokeWidth="1" opacity="0.6"/>
          <text x="30" y="-6" textAnchor="middle" fill="#C9A84C" fontSize="6" opacity="0.7">~ 5 km</text>
        </g>
      </g>

      <rect x="20" y="20" width="280" height="275" rx="12"
        fill="none" stroke="#1A4A5A" strokeWidth="1"/>
      <text x="160" y="307" textAnchor="middle" fill="#C9A84C" fontSize="10"
        fontFamily="'Playfair Display',Georgia,serif" letterSpacing="4">CERRITOS</text>
    </svg>
  )
}

// ─── Zoom levels ─────────────────────────────────────────────────────────────
const ZOOM_LEVELS: ZoomLevel[] = [
  {
    id: 'mundo',     emoji: '🌍', label: 'El Mundo',    sublabel: 'Planeta Tierra',
    fact: 'Un punto luminoso en el hemisferio occidental marca el comienzo de este viaje.',
    MapArt: MundoSVG,
  },
  {
    id: 'suramerica', emoji: '🌎', label: 'Suramérica', sublabel: 'Continente',
    fact: 'En el extremo noroccidental del continente, entre el Pacífico y el Caribe, aguarda Colombia.',
    MapArt: AmericaSVG,
  },
  {
    id: 'colombia',  emoji: '🇨🇴', label: 'Colombia',   sublabel: 'País',
    fact: 'La única nación de Suramérica con costas en dos océanos. En su corazón andino, el Eje Cafetero.',
    MapArt: ColombiaSVG,
  },
  {
    id: 'risaralda', emoji: '☕',  label: 'Risaralda',  sublabel: 'Departamento',
    fact: 'Corazón del Eje Cafetero. Tierra de montañas, café y el Río Cauca. Capital: Pereira.',
    MapArt: RisaraldaSVG,
  },
  {
    id: 'pereira',   emoji: '🏙️', label: 'Pereira',    sublabel: 'Municipio',
    fact: 'La ciudad sin puertas. Al occidente de su área urbana, junto al Río Consota, se extiende Cerritos.',
    MapArt: PereiraSVG,
  },
  {
    id: 'cerritos',  emoji: '🌿', label: 'Cerritos',   sublabel: 'Corregimiento',
    fact: 'Entre los ríos Otún, Consota y La Vieja. Antigua carrilera, Estación Villegas y memoria viva.',
    MapArt: CerritosSVG,
  },
]

// ─── Info tabs ────────────────────────────────────────────────────────────────
const INFO_TABS = [
  {
    id: 'ubicacion', label: 'Ubicación',
    content: `Cerritos es un corregimiento del municipio de Pereira, capital de Risaralda en Colombia, 
    ubicado en la región del Eje Cafetero. Se sitúa en el sector occidental de la ciudad, a una altitud 
    aproximada de 1.190 m.s.n.m., cerca del río La Vieja y colinas como el Alto Cerrito. Forma parte 
    del área metropolitana y tiene fácil acceso por la Paralela Sur.`,
  },
  {
    id: 'caracteristicas', label: 'Características',
    content: `Cerritos destaca por su clima privilegiado, entorno natural protegido con montañas, 
    bosques y plantaciones de café. Cuenta con unos 8.000 habitantes, seis barrios y unas 200 empresas. 
    Su desarrollo incluye proyectos residenciales de lujo, torres empresariales y atractivos turísticos 
    como el Bioparque Ukumarí y el Parque Consotá.`,
  },
  {
    id: 'zonas', label: 'Puntos de interés',
    content: `Entre sus barrios y zonas destacan: Estación Villegas (corazón de este proyecto), 
    Galicia Alta, Belmonte, Esperanza Galicia, Las Colonias y Castilla. Puntos de interés incluyen 
    el Bioparque Ukumarí, el Parque Consotá y su Granja de Noé, la antigua carrilera del ferrocarril, 
    el museo arqueológico y la Institución Educativa Comunitario Cerritos.`,
  },
]

// ─── Map panel ───────────────────────────────────────────────────────────────
function MapZoom() {
  const [current, setCurrent] = useState(0)
  const level = ZOOM_LEVELS[current]

  const goNext = () => setCurrent(i => Math.min(i + 1, ZOOM_LEVELS.length - 1))
  const goPrev = () => setCurrent(i => Math.max(i - 1, 0))

  const variants = {
    enter:  { opacity: 0, scale: 0.84, filter: 'blur(8px)' },
    center: { opacity: 1, scale: 1,    filter: 'blur(0px)',
              transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
    exit:   { opacity: 0, scale: 1.10, filter: 'blur(6px)',
              transition: { duration: 0.28, ease: 'easeIn' } },
  }

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1 flex-wrap" aria-label="Nivel de zoom">
        {ZOOM_LEVELS.map((lvl, i) => (
          <button key={lvl.id} onClick={() => setCurrent(i)} aria-label={`Ir a ${lvl.label}`}
            className={`flex items-center gap-1 transition-all duration-300 ${i <= current ? 'opacity-100' : 'opacity-25'}`}>
            <span className={`font-sans text-[10px] uppercase tracking-wider transition-colors ${i === current ? 'text-amber' : 'text-cream/50'}`}>
              {lvl.label}
            </span>
            {i < ZOOM_LEVELS.length - 1 && <ChevronRight size={10} className="text-sepia/40"/>}
          </button>
        ))}
      </div>

      {/* Map */}
      <div className="relative rounded-2xl overflow-hidden border border-green-moss/30 bg-[#07120A] aspect-square max-w-sm mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div key={level.id} variants={variants} initial="enter" animate="center" exit="exit"
            className="absolute inset-0">
            <level.MapArt />
          </motion.div>
        </AnimatePresence>

        <div className="absolute top-3 right-3 bg-ink/80 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1.5">
          <MapPin size={10} className="text-amber"/>
          <span className="font-sans text-[10px] text-amber uppercase tracking-wider">
            {current + 1}/{ZOOM_LEVELS.length}
          </span>
        </div>
      </div>

      {/* Level info */}
      <AnimatePresence mode="wait">
        <motion.div key={`info-${level.id}`}
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.2 } }}
          exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
          className="text-center px-2">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="text-2xl" aria-hidden="true">{level.emoji}</span>
            <h4 className="font-display text-xl text-cream">{level.label}</h4>
            <span className="font-sans text-xs text-green-light uppercase tracking-widest">{level.sublabel}</span>
          </div>
          <p className="font-body italic text-sm text-cream/55 max-w-xs mx-auto leading-relaxed">{level.fact}</p>
        </motion.div>
      </AnimatePresence>

      {/* Nav dots */}
      <div className="flex items-center justify-center gap-4 mt-1">
        <button onClick={goPrev} disabled={current === 0} aria-label="Nivel anterior"
          className="p-2 rounded-full border border-green-moss/30 text-cream/50 hover:border-amber/50 hover:text-amber transition-all disabled:opacity-20 disabled:cursor-not-allowed">
          <ChevronLeft size={16}/>
        </button>
        <div className="flex gap-2" role="tablist">
          {ZOOM_LEVELS.map((lvl, i) => (
            <button key={lvl.id} role="tab" aria-selected={i === current} aria-label={lvl.label}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-300 ${i === current ? 'w-5 h-2 bg-amber' : 'w-2 h-2 bg-cream/20 hover:bg-cream/40'}`}/>
          ))}
        </div>
        <button onClick={goNext} disabled={current === ZOOM_LEVELS.length - 1} aria-label="Siguiente nivel"
          className="p-2 rounded-full border border-green-moss/30 text-cream/50 hover:border-amber/50 hover:text-amber transition-all disabled:opacity-20 disabled:cursor-not-allowed">
          <ChevronRight size={16}/>
        </button>
      </div>

      {current === ZOOM_LEVELS.length - 1 && (
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <span className="font-sans text-xs text-amber/70 tracking-widest uppercase">✦ ¡Llegaste a Cerritos! ✦</span>
        </motion.div>
      )}
    </div>
  )
}

// ─── Info panel ───────────────────────────────────────────────────────────────
function CerritosInfo() {
  const [activeTab, setActiveTab] = useState('ubicacion')
  const tab = INFO_TABS.find(t => t.id === activeTab)!

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-2 mb-1">
        <MapPin size={16} className="text-amber shrink-0"/>
        <h3 className="font-display text-2xl text-cream">Cerritos, Pereira</h3>
      </div>
      <p className="font-sans text-xs uppercase tracking-[0.2em] text-green-light">
        Corregimiento · Risaralda · Colombia · 1.190 m.s.n.m.
      </p>
      <div className="flex gap-1 bg-ink/50 rounded-xl p-1" role="tablist">
        {INFO_TABS.map(t => (
          <button key={t.id} role="tab" aria-selected={t.id === activeTab} onClick={() => setActiveTab(t.id)}
            className={`flex-1 py-2 px-2 rounded-lg font-sans text-xs transition-all duration-200 ${t.id === activeTab ? 'bg-green-moss text-cream' : 'text-cream/40 hover:text-cream/70'}`}>
            {t.label}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.p key={activeTab}
          initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.35 } }} exit={{ opacity: 0 }}
          className="font-body text-base text-cream/70 leading-[1.9]">
          {tab.content}
        </motion.p>
      </AnimatePresence>
      <div className="grid grid-cols-3 gap-3 mt-2">
        {[
          { value: '~8.000', label: 'habitantes' },
          { value: '6',      label: 'barrios'    },
          { value: '~200',   label: 'empresas'   },
        ].map(s => (
          <div key={s.label} className="text-center bg-ink/40 rounded-xl py-3 border border-green-moss/20">
            <div className="font-display text-xl text-amber">{s.value}</div>
            <div className="font-sans text-[10px] text-cream/40 uppercase tracking-wider mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Main section export ──────────────────────────────────────────────────────
export default function SemillaSection() {
  return (
    <section
      id="semilla"
      className="bg-gradient-to-b from-[#071510] via-[#0D1F0D] to-[#071510] py-24 md:py-32 overflow-hidden"
      aria-label="Semilla — nuestra historia contada a voces"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Bloque narrativo ──────────────────────────────────── */}
        <AnimatedSection className="mb-20 md:mb-28">
          <div className="max-w-4xl mx-auto text-center">

            {/* Eyebrow */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-green-moss/60"/>
              <span className="font-sans text-xs uppercase tracking-[0.3em] text-green-light">
                Origen del proyecto
              </span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-green-moss/60"/>
            </div>

            {/* Título */}
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl
                           text-cream leading-[1.08] text-shadow-warm mb-6">
              Semilla,
              <br />
              <em className="text-green-light not-italic">nuestra historia</em>
              <br />
              <span className="text-amber">contada a voces</span>
            </h2>

            {/* Línea ornamental */}
            <div className="flex items-center justify-center gap-3 mb-10">
              <div className="h-px flex-1 max-w-24 bg-gradient-to-r from-transparent to-green-moss/50"/>
              <span className="text-green-light text-xs" aria-hidden="true">✦</span>
              <div className="h-px flex-1 max-w-24 bg-gradient-to-l from-transparent to-green-moss/50"/>
            </div>

            {/* Párrafo con comillas correctas: " y " */}
            <div className="relative">
              {/* Comilla de apertura — correcta " */}
              <span
                className="absolute -top-4 -left-2 font-accent text-8xl text-green-moss/35
                           leading-none select-none pointer-events-none"
                aria-hidden="true"
              >
                &#8220;
              </span>

              <p className="relative font-body text-lg md:text-xl lg:text-2xl text-cream/75
                            leading-[2] max-w-3xl mx-auto text-left md:text-justify px-6 md:px-10">
                Este proyecto es un tejido colectivo que nace en el aula, pero florece en la comunidad,
                rescatando la memoria viva de Cerritos a través del encuentro con sus adultos mayores.
                Mediante la investigación-acción-participación y una mirada{' '}
                <em className="text-green-light not-italic">sentipensante</em>, se entrelazan datos
                históricos, geográficos y culturales con las emociones y vivencias de quienes han
                convertido sus recuerdos en el corazón de este relato. Es una invitación a conectar
                mente y corazón frente a un libro abierto y en constante construcción, que inicia en
                Estación Villegas, pero busca extenderse por todo el territorio para honrar su legado
                e identidad.
              </p>

              {/* Comilla de cierre — correcta " */}
              <span
                className="block text-right font-accent text-6xl text-green-moss/35
                           leading-none select-none -mt-4 pr-6 md:pr-10"
                aria-hidden="true"
              >
                &#8221;
              </span>
            </div>

          </div>
        </AnimatedSection>

        {/* Divisor */}
        <AnimatedSection delay={100}>
          <div className="flex items-center gap-6 mb-20">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-green-moss/40 to-transparent"/>
            <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-green-light/60">
              Nuestra ubicación
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-green-moss/40 to-transparent"/>
          </div>
        </AnimatedSection>

        {/* ── Mapa interactivo + info ───────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          <AnimatedSection direction="left" delay={200}>
            <div className="bg-[#060F06]/80 rounded-2xl border border-green-moss/25 p-6">
              <div className="flex items-center gap-2 mb-5">
                <span className="font-sans text-xs uppercase tracking-widest text-green-light">
                  Zoom interactivo
                </span>
                <div className="h-px flex-1 bg-green-moss/20"/>
                <span className="font-sans text-[10px] text-cream/30">
                  Haz clic en → para acercarte
                </span>
              </div>
              <MapZoom />
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right" delay={350}>
            <div className="bg-[#060F06]/80 rounded-2xl border border-green-moss/25 p-8 h-full">
              <CerritosInfo />
            </div>
          </AnimatedSection>

        </div>
      </div>
    </section>
  )
}