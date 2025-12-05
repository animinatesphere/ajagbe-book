// import React, { useEffect, useState } from "react";
// images moved into their respective components; no direct imports needed here
import SubscribeModal from "../component/SubscribeModal";
import Best from "../component/Best";
import Favourite from "../component/Favourite";
import Footer from "../component/Footer";
import AwardsBanner from "../component/AwardsBanner";
import Realease from "../component/Realease";
import HeroSection from "../component/HeroSection";

// (hero variants removed — hero content is handled inside `HeroSection`)

export const Home = () => {
  return (
    <>
      {/* container */}
      <div className="bg-[#f4f3ec] w-full h-screen pt-50">
        {/* subscribe modal (appears on refresh) */}
        <SubscribeModal />
        {/* hero section */}
        <HeroSection />
        {/* end of hero section */}

        {/* main1 */}
        <Best />
        {/* end of main1 */}

        {/* main2 */}
        <Favourite />
        {/* main2 */}

        <AwardsBanner />

        <Realease />
        {/* footer */}
        <Footer />
        {/* footer */}
      </div>
    </>
  );
};
