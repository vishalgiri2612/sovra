import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
import Collections from './pages/Collections'
import Magazine from './pages/Magazine'
import Login from './pages/Login'
import Signup from './pages/Signup'
import OTPVerification from './pages/OTPVerification'
import ForgotPassword from './pages/ForgotPassword'
import Checkout from './pages/Checkout'
import OrderDetail from './pages/OrderDetail'
import PrivateRoute from './components/PrivateRoute'
import { ShopProvider } from './context/ShopContext'

const ScrollToTop = () => {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

const AppBody = () => {
  const location = useLocation();
  const isAdminPage = location.pathname === '/admin';

  return (
    <>
      <ScrollToTop />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <Navbar />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:category" element={<Shop />} />
          <Route path="/magazine" element={<Magazine />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/bag" element={<Bag />} />
          <Route path="/story" element={<Story />} />
          <Route path="/craftsmanship" element={<Craftsmanship />} />
          <Route path="/ethics" element={<Ethics />} />
          
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-otp" element={<OTPVerification />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Private Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/account" element={<Account />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order/:id" element={<OrderDetail />} />
            <Route path="/admin" element={<Admin />} />
          </Route>
        </Routes>
      </main>
      {!isAdminPage && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <ShopProvider>
        <AppBody />
      </ShopProvider>
    </Router>
  )
}

export default App
