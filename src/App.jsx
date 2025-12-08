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
import Cart from "./page/Cart";
import BookDetails from "./page/BookDetails";
import PageLoader from "./component/PageLoader";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import InterviewPage from "./page/InterviewPage";
import BookCoverReveal from "./page/BookCoverReveal";
import GiveawayPage from "./page/GiveawayPage";
import SignedBooksPage from "./page/SignedBooksPage";

const App = () => {
  return (
    <>
      <Navbar />
      <PageLoader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<WriterPortfolio />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/book/:slug" element={<BookDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/interview" element={<InterviewPage />} />
        <Route path="/event" element={<BookCoverReveal />} />
        <Route path="/giveaway" element={<GiveawayPage />} />
        <Route path="/signed-book" element={<SignedBooksPage />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* <Footer /> */}
    </>
  );
};
export default App;
