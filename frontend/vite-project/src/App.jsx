import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import Bag from './pages/Bag'
import Account from './pages/Account'
import Story from './pages/Story'
import Craftsmanship from './pages/Craftsmanship'
import Ethics from './pages/Ethics'
import Admin from './pages/Admin'
import CustomCursor from './components/CustomCursor'

const ScrollToTop = () => {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function App() {
  return (
    <Router>
      <CustomCursor />
      <ScrollToTop />
      <Navbar />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:category" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/bag" element={<Bag />} />
          <Route path="/account" element={<Account />} />
          <Route path="/story" element={<Story />} />
          <Route path="/craftsmanship" element={<Craftsmanship />} />
          <Route path="/ethics" element={<Ethics />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  )
}

export default App
