import React from "react";

import Hero from './Components/Hero/Hero'
import Header from './Components/Header/Header'
import About from './Components/About/About'
import Product from './Components/Product/Product'
import Manufacturing from './Components/Manu/Manufacturing'
import Mission from './Components/Mission/Mission'
import Corevalues from './Components/Mission/Corevalues'
import Contact from './Components/Contact/Contact'
import Footer from './Components/Footer/Footer'
import Career from "./Components/Carrer/Carrer";
import FloatingSocials from "./Components/Floating/Floating";

import { Routes, Route, Navigate, useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant"
    });
  }, [pathname]);
  return null;
}

function App() {
  return (
    <div>
      <Header />
      <ScrollToTop />

      {/* Fixed header offset */}
      <div className="pt-24">
        <Routes>

          {/* Home page */}
          <Route path="/" element={
            <>
              <Hero />
              <FloatingSocials />
              <About />
              <Mission />
              <Corevalues />
            </>
          } />

          {/* Individual Pages */}
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Product />} />
          <Route path="/manufacturing" element={<Manufacturing />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/core-values" element={<Corevalues />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/career" element={<Career />} />

          {/* 404 Redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>

        {/* Footer — shown on every page */}
        <Footer />
      </div>
    </div>
  );
}

export default App;