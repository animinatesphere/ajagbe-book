import React, { useEffect, useState } from "react";
import ch from "../assets/ChatGPT_Image_Dec_4__2025__12_54_10_AM-removebg-preview.png";
import medal from "../assets/IMG_7974.WEBP";
import medal2 from "../assets/IMG_7975.WEBP";

// HERO CONTENT VARIANTS
// Add or edit entries in `heroVariants` to have the hero automatically rotate
// between different content blocks. The UI/styling will remain the same.
const heroVariants = [
  {
    preTitle: "For author & writer",
    titleLines: ["Meet Your next", "favourite book."],
    buttonText: "Purchase",
    medals: [medal, medal2],
    heroImage: ch,
    heroAlt: "Author portrait",
  },
  // Example of another variant you can copy/paste and customize:
  {
    preTitle: "New release",
    titleLines: ["Discover the", "latest novel."],
    buttonText: "Learn more",
    medals: [medal],
    heroImage: ch,
    heroAlt: "New release image",
  },
];
// (no single heroContent — we pick from `heroVariants` below)

export const Home = () => {
  const [imgAnim, setImgAnim] = useState("animate__bounceIn");
  const [current, setCurrent] = useState(0); // index into heroVariants

  // rotate hero variant every 10s
  useEffect(() => {
    if (!heroVariants || heroVariants.length <= 1) return;
    const id = setInterval(() => {
      setCurrent((s) => (s + 1) % heroVariants.length);
    }, 10000);
    return () => clearInterval(id);
  }, []);

  // update image animation each time the variant changes
  useEffect(() => {
    const options = [
      "animate__bounceIn",
      "animate__fadeInLeft",
      "animate__fadeInRight",
      "animate__zoomIn",
      "animate__fadeInUpBig",
    ];
    const choice = options[Math.floor(Math.random() * options.length)];
    const t = setTimeout(() => setImgAnim(choice), 50);
    return () => clearTimeout(t);
  }, [current]);

  // the currently displayed content object
  const displayed =
    heroVariants && heroVariants.length
      ? heroVariants[current]
      : {
          preTitle: "",
          titleLines: [""],
          buttonText: "",
          medals: [],
          heroImage: ch,
          heroAlt: "",
        };

  return (
    <>
      {/* container */}
      <div className="bg-[#f4f3ec] h-screen pt-50">
        {/* hero section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 px-6 md:px-16 lg:px-32 py-12 md:py-20">
          {/* text */}
          <div className="w-full md:w-1/2">
            <p className="text-lg md:text-xl non text-[#696969] uppercase tracking-wide">
              {displayed.preTitle}
            </p>
            <p className="mt-4 text-3xl md:text-5xl lg:text-6xl lib text-[#333333] uppercase font-normal leading-tight">
              {displayed.titleLines.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </p>

            {/* medal */}
            <div className="flex items-center gap-4 md:gap-6 mt-6">
              {displayed.medals.map((m, idx) => (
                <img
                  key={idx}
                  src={m}
                  alt={`medal-${idx}`}
                  className="w-20 md:w-36 h-auto object-contain"
                />
              ))}
            </div>
            {/* medal */}

            <button className="mt-6 inline-block uppercase bg-[#e4573d] non text-[#fff] px-5 py-3 rounded-md shadow-md hover:scale-105 transform transition">
              {displayed.buttonText}
            </button>
          </div>

          {/* image */}
          <div className="w-full md:w-1/2 flex items-center justify-center">
            <img
              src={displayed.heroImage}
              alt={displayed.heroAlt}
              className={`animate__animated ${imgAnim} w-full max-w-[420px] md:max-w-[640px] lg:max-w-[820px] object-cover drop-shadow-lg transition-transform duration-500 hover:scale-105`}
              style={{
                // slightly larger visual scale on desktop by default
                transformOrigin: "center",
              }}
            />
          </div>
        </div>
        {/* end of hero section */}
      </div>
    </>
  );
};
