import ScrollProgress        from './components/ui/ScrollProgress'
import Navbar                from './components/layout/Navbar'
import Footer                from './components/layout/Footer'
import HeroSection           from './components/sections/HeroSection'
import SemillaSection        from './components/sections/SemillaSection'
import HistoriaSection       from './components/sections/HistoriaSection'
import RecuerdosSection      from './components/sections/RecuerdosSection'
import ProtagonistasSection  from './components/sections/ProtagonistasSection'
import GaleriaSection        from './components/sections/GaleriaSection'
import ComunidadSection      from './components/sections/ComunidadSection'

/**
 * Root application component.
 * Composes all page sections in vertical order.
 * Each section is self-contained and independently scrollable.
 */
export default function App() {
  return (
    <>
      {/* Reading-progress bar fixed at top */}
      <ScrollProgress />

      {/* Sticky navigation */}
      <Navbar />

      {/* Main content */}
      <main id="main-content">
        <HeroSection />
        <SemillaSection />
        <HistoriaSection />
        <RecuerdosSection />
        <ProtagonistasSection />
        <GaleriaSection />
        <ComunidadSection />
      </main>

      <Footer />
    </>
  )
}