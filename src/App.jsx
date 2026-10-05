import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./Navbar";
import Home from "./Home";
import About from "./About";
import Menu from "./Menu";
import Reservation from "./Reservation";
import Gallery from "./Gallery";
import Contact from "./Contact";
import Footer from "./Footer";
import FullMenu from "./FullMenu";

import Reveal from "./Reveal";

import Logo from "./assets/logo.png";

const ScrollToHash = () => {
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);

      setTimeout(() => {
        const element = document.getElementById(id);

        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);
    }
  }, []);

  return null;
};

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);



  if (loading) {
    return (
      <div className="intro">
        <img src={Logo} style={{ width: "100px" }} alt="TableMannas logo" />

        <h1>The Mix</h1>

        <ul>
          <li>FINE DINING</li>
          <li>GRILL</li>
          <li>COCKTAILS</li>
          <li>LOUNGE</li>
        </ul>
      </div>
    );
  }

  return (
	  <>

    <ScrollToHash />
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Navbar />
	    
	    <Reveal>
            <Home />
	    </Reveal>

	    <Reveal>
            <About />
	    </Reveal>

	    <Reveal>
            <Menu />
	    </Reveal>

	    <Reveal>
            <Reservation />
	    </Reveal>

	    <Reveal>	
            <Gallery />
	    </Reveal>

	    <Reveal>
            <Contact />
	    </Reveal>

	    <Reveal>
            <Footer />
	    </Reveal>
          </>
        }
      />

      <Route
        path="/menu"
        element={<FullMenu />}
      />
    </Routes>
	  </>
  );
};

export default App;
