/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";

import { Route, Routes, useLocation } from "react-router-dom";

/* Style */
import "./App.css";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../../style/Global";
import { theme } from "../../style/Theme";
/* Layouts */
import NavBar from "../../Layouts/Navbar/Navbar";
import Footer from "../../Layouts/Footer/Footer";
/* Pages */
import Home from "../Home/Home";
import Contact from "../Contact/Contact";
import Auth from "../Auth/Auth";
import Profile from "../Auth/Profile/Profile";
import Admin from "../Auth/Admin/Admin";
import Shop from "../Shop/Shop";
import Cart from "../Cart/Cart";
import Checkout from "../Cart/Checkout/Checkout";
/* Auth */

function App() {
  useEffect(() => {}, []);

  const ScrollToTop: React.FC = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />

        <div className="App">
          <ScrollToTop />

          <NavBar />

          <Routes>
            {/* Home */}
            <Route path="/" element={<Home />} />
            {/* Contact */}
            <Route path="/nous-contactez" element={<Contact />} />
            {/* shop */}
            <Route path="/shop/:category" element={<Shop />} />

            <Route path="/mon-panier/:step" element={<Cart />}>
              <Route path="commander" element={<Checkout />} />
            </Route>

            <Route path="/connexion/:access" element={<Auth />}>
              <Route path="mon-profile" element={<Profile />} />
              <Route path="admin" element={<Admin />} />
            </Route>

            <Route path="*" element={<Home />} />
          </Routes>

          <Footer />
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
