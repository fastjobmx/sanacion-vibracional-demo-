import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { CartDrawer } from './components/layout/CartDrawer'
import { Footer } from './components/layout/Footer'
import { Nav } from './components/layout/Nav'
import { WhatsAppButton } from './components/layout/WhatsAppButton'
import { ScrollTrigger } from './lib/motion'
import { Checkout } from './pages/Checkout'
import { Confirmation } from './pages/Confirmation'
import { Home } from './pages/Home'
import { Personalize } from './pages/Personalize'

function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }
    // Espera a que ScrollTrigger recalcule el espacio del pin antes de medir.
    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
      document.querySelector(hash)?.scrollIntoView()
    }, 60)
    return () => clearTimeout(timer)
  }, [pathname, hash])
  return null
}

export function App() {
  return (
    <>
      <ScrollManager />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/personalizar/:id" element={<Personalize />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/pedido/:id" element={<Confirmation />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
      <CartDrawer />
      <WhatsAppButton />
    </>
  )
}
