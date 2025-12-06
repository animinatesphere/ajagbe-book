import React from "react";
import "animate.css";

import { Route, Routes } from "react-router-dom";
import { Navbar } from "./component/Navbar";
import { Home } from "./page/Home";
import WriterPortfolio from "./page/WriterPortfolio";
// import Footer from "./component/Footer";
import ContactPage from "./page/ContactPage";
import NotFound from "./page/NotFound";
import Shop from "./page/Shop";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<WriterPortfolio />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* <Footer /> */}
    </>
  );
};
export default App;
