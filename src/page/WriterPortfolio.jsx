import React, { useState, useEffect, useRef } from "react";
import {
  BookOpen,
  Award,
  Feather,
  Camera,
  Quote,
  Sparkles,
  Star,
  TrendingUp,
} from "lucide-react";
import hel from "../assets/IMG_7972.JPG";
import mil from "../assets/IMG_3230.JPG";
import me from "../assets/IMG_2952.JPG";
import me1 from "../assets/IMG_0397.JPG";
import me2 from "../assets/IMG_0240.JPG";
// import me3 from "../assets/IMG_2950.JPG";
// import me4 from "../assets/IMG_2956.JPG";
// import me5 from "../assets/IMG_8145.JPG";
import me6 from "../assets/IMG_8144.JPG";
import me7 from "../assets/IMG_8143.JPG";
import me8 from "../assets/IMG_0396.JPG";
import v1 from "../assets/VID-20251206-WA0125.mp4";
import v2 from "../assets/VID-20251206-WA0126.mp4";
import v3 from "../assets/VID-20251207-WA0027.mp4";
import Footer from "../component/Footer";
export default function WriterPortfolio() {
  const [, setScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedVideo, setSelectedVideo] = useState(null);
  const videoRef = useRef(null);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [videoError, setVideoError] = useState(null);
  const [showPlayCTA, setShowPlayCTA] = useState(false);
  // const [isPiP, setIsPiP] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // keyboard controls for video modal
  useEffect(() => {
    const onKey = async (e) => {
      if (!selectedVideo || !videoRef.current) return;
      if (e.key === " ") {
        // space -> toggle play/pause
        e.preventDefault();
        if (videoRef.current.paused) await videoRef.current.play();
        else videoRef.current.pause();
      }
      if (e.key === "Escape") {
        setSelectedVideo(null);
      }
      if (e.key.toLowerCase() === "p") {
        try {
          if (document.pictureInPictureElement)
            await document.exitPictureInPicture();
          else if (videoRef.current.requestPictureInPicture)
            await videoRef.current.requestPictureInPicture();
        } catch (e) {
          console.debug(e);
        }
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedVideo]);

  // when a new video is selected, try to play it (with muted fallback for autoplay policies)
  useEffect(() => {
    if (!selectedVideo) return;
    setIsVideoLoading(true);
    setVideoError(null);
    setShowPlayCTA(false);
    const tryPlay = async () => {
      if (!videoRef.current) return setIsVideoLoading(false);
      try {
        // try normal play first
        await videoRef.current.play();
        videoRef.current.muted = false; // ensure unmuted if allowed
        setShowPlayCTA(false);
      } catch (e) {
        // autoplay blocked: try muted playback then let user unmute
        console.debug("Autoplay failed, retrying muted:", e);
        try {
          videoRef.current.muted = true;
          await videoRef.current.play();
          // muted autoplay worked — show CTA so user can unmute/start with sound
          setShowPlayCTA(true);
        } catch (e2) {
          console.error("Playback failed:", e2);
          setVideoError("Playback failed — click play to try again.");
          setShowPlayCTA(true);
        }
      } finally {
        setIsVideoLoading(false);
      }
    };

    const t = setTimeout(tryPlay, 60);
    return () => clearTimeout(t);
  }, [selectedVideo]);

  const books = [
    {
      title: "What Happened to Helen",
      year: "2023",
      pic: hel,
      genre: "Psychological Thriller",
      color: "from-rose-100 to-pink-100",
      achievements: [
        "#1 Bambooks Bestseller",
        "Litireso Africa's Top Rated Books",
        "OLA Reading List - Top Genre Novels",
        "Alákòwé's Top 10 Romances",
        "Louisiana Channel's Red Hot Read",
        "Kenya Bestseller",
        "Legacy of Literature Award Nominee (India)",
      ],
    },
    {
      title: "Under the Milky Way",
      year: "2023",
      pic: mil,
      genre: "Poetry Anthology",
      color: "from-blue-100 to-indigo-100",
      achievements: ["International Poetry Collection", "Curator & Editor"],
    },
  ];

  const gallery = [
    // { id: 1, caption: "Realease of letter of ife", pic: me3 },
    { id: 2, caption: "With Fellow Authors", pic: me1 },

    { id: 3, caption: "Realease of letter of ife", pic: me2 },

    // { id: 3, caption: "with fellow friends", pic: me5 },
    { id: 7, caption: "with fellow friend", pic: me6 },
    { id: 7, caption: "with fellow friends", pic: me7 },
    { id: 2, caption: "With Fellow Authors", pic: me8 },
    // video items (click to play)
    { id: 11, caption: "Event clip 1", video: v1 },
    { id: 12, caption: "Event clip 2", video: v2 },
    { id: 13, caption: "Event clip 3", video: v3 },
  ];

  return (
    <div className="min-h-screen z-[1] pt-12 bg-white text-gray-900 overflow-hidden">
      {/* Video player modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setSelectedVideo(null)}
          />
          <div className="relative z-10 w-full max-w-4xl bg-black rounded-lg overflow-hidden">
            {/* loading spinner */}
            {isVideoLoading && (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40">
                <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin" />
              </div>
            )}

            <video
              ref={videoRef}
              poster={selectedVideo.poster}
              controls
              autoPlay
              preload="metadata"
              onWaiting={() => setIsVideoLoading(true)}
              onPlaying={() => setIsVideoLoading(false)}
              onLoadedData={() => setIsVideoLoading(false)}
              onError={(e) => {
                console.error("Video element error:", e);
                setVideoError("There was an error loading the video.");
                setIsVideoLoading(false);
              }}
              className="w-full h-auto max-h-[80vh] bg-black"
            >
              <source src={selectedVideo.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Play CTA / Error overlay for autoplay blocked or errors */}
            {(showPlayCTA || videoError) && (
              <div className="absolute inset-0 z-30 flex items-center justify-center">
                <div className="bg-black/60 inset-0 absolute" />
                <div className="relative z-40 flex flex-col items-center gap-4">
                  {videoError && (
                    <div className="text-white bg-red-600 px-4 py-2 rounded">
                      {videoError}
                    </div>
                  )}

                  <button
                    onClick={async () => {
                      if (!videoRef.current) return;
                      setIsVideoLoading(true);
                      setVideoError(null);
                      try {
                        // Try unmuting and play (user gesture)
                        videoRef.current.muted = false;
                        await videoRef.current.play();
                        setShowPlayCTA(false);
                      } catch (err) {
                        console.debug("User play failed:", err);
                        // If unmuted play fails, try muted play so at least video shows
                        try {
                          videoRef.current.muted = true;
                          await videoRef.current.play();
                          setShowPlayCTA(true);
                        } catch (err2) {
                          console.error("Play retry failed:", err2);
                          setVideoError("Playback failed — please try again.");
                        }
                      } finally {
                        setIsVideoLoading(false);
                      }
                    }}
                    className="px-6 py-3 bg-white text-black rounded-full font-semibold shadow-lg"
                  >
                    ▶ Play
                  </button>
                </div>
              </div>
            )}

            {/* control buttons: PiP + close */}
            <div className="absolute top-3 right-3 flex items-center gap-2 z-30">
              <button
                onClick={async () => {
                  if (!videoRef.current) return;
                  try {
                    if (document.pictureInPictureElement) {
                      await document.exitPictureInPicture();
                    } else if (videoRef.current.requestPictureInPicture) {
                      await videoRef.current.requestPictureInPicture();
                    }
                  } catch (e) {
                    console.debug(e);
                  }
                }}
                title="Toggle Picture-in-Picture (P)"
                className="bg-white/90 rounded-full p-2 shadow"
              >
                PiP
              </button>

              <button
                onClick={() => setSelectedVideo(null)}
                className="bg-white/90 rounded-full p-2 shadow"
                aria-label="Close video"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Floating Elements Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-purple-100/30 to-pink-100/30 rounded-full blur-3xl"
          style={{
            top: "10%",
            left: "5%",
            transform: `translate(${mousePosition.x * 0.02}px, ${
              mousePosition.y * 0.02
            }px)`,
          }}
        />
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-100/30 to-cyan-100/30 rounded-full blur-3xl"
          style={{
            bottom: "10%",
            right: "5%",
            transform: `translate(${mousePosition.x * -0.02}px, ${
              mousePosition.y * -0.02
            }px)`,
          }}
        />
      </div>

      {/* Hero Section */}
      <section className=" z-[1] relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-stone-50"></div>
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-10 w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
            <div className="absolute top-40 right-20 w-3 h-3 bg-gray-300 rounded-full animate-pulse delay-100"></div>
            <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-200"></div>
            <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-gray-300 rounded-full animate-pulse delay-300"></div>
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
            {/* Writer Image */}
            <div className="w-full lg:w-1/2 flex justify-center animate-float">
              <div className="relative group">
                {/* Glow effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-200 via-pink-200 to-rose-200 rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition duration-700 animate-pulse-slow"></div>

                {/* Main image container */}
                <div className="relative bg-white p-3 rounded-3xl shadow-2xl transform group-hover:scale-105 transition-all duration-500">
                  <div className="w-80  lg:w-96  bg-gradient-to-br from-slate-100 via-stone-100 to-zinc-100 rounded-2xl flex items-center justify-center overflow-hidden relative group-hover:shadow-inner">
                    <img
                      src={me}
                      alt=""
                      className="w-full h-130 object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full blur-xl opacity-60"></div>
                <div className="absolute -top-6 -left-6 w-20 h-20 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-xl opacity-60"></div>
              </div>
            </div>

            {/* Hero Text */}
            <div className="w-full lg:w-1/2 space-y-8 text-center lg:text-left">
              <div className="space-y-6 animate-slide-up">
                <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mb-4">
                  <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Star className="w-4 h-4 text-amber-500" />
                    Award-Winning Author
                  </span>
                </div>

                <h1 className="text-6xl lg:text-8xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 bg-clip-text text-transparent leading-tight">
                  Ayodeji
                </h1>
                <h2 className="text-5xl lg:text-7xl font-bold text-gray-500 -mt-4">
                  Ajagbe
                </h2>

                <div className="flex flex-wrap gap-3 justify-center lg:justify-start pt-4">
                  <span className="px-5 py-2.5 bg-gradient-to-r from-slate-100 to-zinc-100 text-gray-700 rounded-full text-sm font-semibold shadow-sm hover:shadow-md transition-shadow">
                    📚 Novelist
                  </span>
                  <span className="px-5 py-2.5 bg-gradient-to-r from-blue-50 to-indigo-50 text-gray-700 rounded-full text-sm font-semibold shadow-sm hover:shadow-md transition-shadow">
                    ✍️ Poet
                  </span>
                  <span className="px-5 py-2.5 bg-gradient-to-r from-purple-50 to-pink-50 text-gray-700 rounded-full text-sm font-semibold shadow-sm hover:shadow-md transition-shadow">
                    🎯 Literary Agent
                  </span>
                </div>
              </div>

              <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed animate-slide-up animation-delay-200 font-light">
                My books are meant as sweet escapes where the passionate, yet tender love is undeniable.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up animation-delay-400 pt-4">
                <button
                  onClick={() =>
                    document
                      .getElementById("about")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                  className="group px-8 py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl font-semibold hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden"
                >
                  <span className="relative z-10">Discover My Story</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                </button>
                <button
                  onClick={() =>
                    document
                      .getElementById("books")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                  className="px-8 py-4 bg-white text-gray-900 border-2 border-gray-200 rounded-xl font-semibold hover:border-gray-900 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  View Published Works
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Elegant Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-12 border-2 border-gray-300 rounded-full flex justify-center p-2">
              <div className="w-1.5 h-3 bg-gray-400 rounded-full animate-scroll"></div>
            </div>
            <span className="text-xs text-gray-400 font-medium">Scroll</span>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 bg-gradient-to-r from-gray-50 via-stone-50 to-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <Quote className="w-96 h-96 absolute -top-20 -left-20 text-gray-900" />
          <Quote className="w-96 h-96 absolute -bottom-20 -right-20 text-gray-900 rotate-180" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <blockquote className="text-2xl lg:text-3xl text-center text-gray-700 font-light italic max-w-4xl mx-auto">
            “It’s rare to read anything that feels this unique. A richly
            imagined, ambitious, and suspenseful novel that is striking for its
            deft juxtaposition of small, human moments with larger concerns
            about decision making.” <br /> — A.H Mohammed, author of The Last
            Days at Forcados High School BOOKS
          </blockquote>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white relative">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-block p-4 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl mb-6 shadow-lg">
              <Feather className="w-12 h-12 text-gray-700" />
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              About Me
            </h2>
            <div className="flex items-center justify-center gap-4">
              <div className="w-16 h-1 bg-gradient-to-r from-transparent via-gray-900 to-transparent"></div>
              <Sparkles className="w-6 h-6 text-amber-500" />
              <div className="w-16 h-1 bg-gradient-to-r from-transparent via-gray-900 to-transparent"></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-stone-50 rounded-3xl p-8 lg:p-12 shadow-xl">
            <div className="prose prose-lg max-w-none space-y-6 text-gray-700 leading-relaxed">
              <p className="animate-slide-up text-lg">
                <strong className="text-gray-900 text-xl">
                  Ayodeji Ajagbe
                </strong>{" "}
                is a Nigerian novelist, poet, and literary agent whose work
                spans poetry, contemporary romance, political thrillers, and
                psychological thrillers. He began his writing journey while
                studying Plant Biology at the University of Ilorin, where
                articles and short stories gradually became the center of his
                creative life.
              </p>

              <p className="animate-slide-up animation-delay-200 text-lg">
                After receiving encouraging feedback from friends and beta
                readers, he committed fully to a career as a writer. His debut
                novel,{" "}
                <em className="text-rose-700 font-semibold">
                  What Happened to Helen
                </em>
                , became a #1 Bambooks bestseller and went on to be listed among
                Litireso Africa's Top Rated Books of the Year, the Open Library
                Association's Reading List for Top Genre Novels, and Alákòwé's
                Top 10 Romances of the Year.
              </p>

              <p className="animate-slide-up animation-delay-400 text-lg">
                The novel was also featured as a Louisiana Channel's Red Hot
                Read, earned bestseller status in Kenya, and was nominated for
                the Legacy of Literature Award in India.
              </p>

              <p className="animate-slide-up animation-delay-600 text-lg">
                Ayodeji is the author and curator of{" "}
                <em className="text-indigo-700 font-semibold">
                  Under the Milky Way
                </em>
                , an international poetry anthology featuring writers from
                different parts of the world. In July 2023, he received the{" "}
                <strong className="text-amber-700">
                  AfriCAN Honoree Authors' Award
                </strong>{" "}
                in Johannesburg, South Africa, recognizing his contribution to
                African literature and emerging voices.
              </p>

              <p className="animate-slide-up animation-delay-800 text-lg">
                Alongside writing, Ayodeji works as a literary agent, connecting
                authors with readers, and amplifying new and established voices
                within the literary community. His passion for writing extends
                beyond the page as he actively supports authors through media
                features and creative collaborations.
              </p>

              <p className="animate-slide-up animation-delay-1000 text-lg">
                He lives with his family in Ibadan, Oyo State, where he is
                currently working on his next book.
              </p>
            </div>
          </div>

          {/* Award Highlight */}
          <div className="mt-12 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-200 via-yellow-200 to-orange-200 rounded-3xl blur opacity-30 group-hover:opacity-50 transition"></div>
            <div className="relative p-8 lg:p-10 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl shadow-xl">
              <div className="flex flex-col lg:flex-row items-center gap-6">
                <div className="flex-shrink-0 p-4 bg-white rounded-2xl shadow-lg">
                  <Award className="w-16 h-16 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                    International Recognition
                  </h3>
                  <p className="text-gray-700 text-lg">
                    <span className="font-semibold">
                      AfriCAN Honoree Authors' Award 2023
                    </span>{" "}
                    — Johannesburg, South Africa
                  </p>
                  <p className="text-gray-600 mt-2">
                    Honoring contributions to African literature and emerging
                    voices
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Books Section */}
      <section
        id="books"
        className="py-24 bg-gradient-to-b z-[1] from-gray-50 to-white relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-5">
          <BookOpen className="w-96 h-96 absolute top-20 right-10 text-gray-900 transform rotate-12" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20 animate-fade-in">
            <div className="inline-block p-4 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl mb-6 shadow-lg">
              <BookOpen className="w-12 h-12 text-gray-700" />
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              Published Works
            </h2>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-1 bg-gradient-to-r from-transparent via-gray-900 to-transparent"></div>
              <TrendingUp className="w-6 h-6 text-emerald-500" />
              <div className="w-16 h-1 bg-gradient-to-r from-transparent via-gray-900 to-transparent"></div>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Critically acclaimed works that have touched readers across
              continents
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
            {books.map((book, index) => (
              <div
                key={index}
                className="group relative animate-slide-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Glow effect */}
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-200 to-pink-200 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition duration-500"></div>

                {/* Card */}
                <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden transform group-hover:-translate-y-3 transition-all duration-500 group-hover:shadow-2xl">
                  <div
                    className={`h-72 bg-gradient-to-br ${book.color} flex items-center justify-center relative overflow-hidden`}
                  >
                    <img src={book.pic} alt="" />
                    <div className="absolute top-4 right-4 px-4 py-2 bg-white/90 backdrop-blur rounded-full shadow-lg">
                      <span className="text-sm font-bold text-gray-700">
                        {book.year}
                      </span>
                    </div>
                    {/* Decorative elements */}
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/10 to-transparent"></div>
                  </div>

                  <div className="p-8">
                    <div className="mb-4">
                      <h3 className="text-3xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text transition-all">
                        {book.title}
                      </h3>
                      <p className="text-gray-600 font-semibold text-lg inline-block px-4 py-1 bg-gray-100 rounded-full">
                        {book.genre}
                      </p>
                    </div>

                    <div className="space-y-3 mt-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Star className="w-5 h-5 text-amber-500" />
                        <h4 className="font-bold text-gray-900 text-lg">
                          Achievements
                        </h4>
                      </div>
                      {book.achievements.map((achievement, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 group/item"
                        >
                          <span className="flex-shrink-0 w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mt-2"></span>
                          <span className="text-gray-700 group-hover/item:text-gray-900 transition-colors">
                            {achievement}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 animate-fade-in">
            <div className="inline-block p-4 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-2xl mb-6 shadow-lg">
              <Camera className="w-12 h-12 text-gray-700" />
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              Gallery
            </h2>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-1 bg-gradient-to-r from-transparent via-gray-900 to-transparent"></div>
              <Camera className="w-6 h-6 text-cyan-500" />
              <div className="w-16 h-1 bg-gradient-to-r from-transparent via-gray-900 to-transparent"></div>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Moments captured along my literary journey around the world
            </p>
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gallery.map((item, index) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 animate-fade-in "
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Glow effect */}

                {/* Image or video thumbnail container */}
                {item.video ? (
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() =>
                      setSelectedVideo({ src: item.video, poster: item.pic })
                    }
                    onKeyDown={(e) =>
                      e.key === "Enter" &&
                      setSelectedVideo({ src: item.video, poster: item.pic })
                    }
                    className="w-full h-80 bg-black/5 flex items-center justify-center cursor-pointer relative"
                  >
                    <img
                      src={item.pic}
                      alt={item.caption}
                      className="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                        <svg
                          className="w-8 h-8 text-gray-800"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path d="M5 3v18l15-9L5 3z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ) : (
                  <img
                    src={item.pic}
                    alt=""
                    className=" w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end">
                  <div className="p-6 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-white font-semibold text-lg mb-2">
                      {item.caption}
                    </p>
                    <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-400"></div>
                  </div>
                </div>

                {/* Border glow */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/20 rounded-2xl transition-colors duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes scroll {
          0% { transform: translateY(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(16px); opacity: 0; }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.6; }
        }

        .animate-fade-in {
          animation: fadeIn 1.2s ease-out forwards;
        }

        .animate-slide-up {
          animation: slideUp 1s ease-out forwards;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-scroll {
          animation: scroll 2s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce 3s ease-in-out infinite;
        }

        .animation-delay-100 { animation-delay: 100ms; opacity: 0; }
        .animation-delay-200 { animation-delay: 200ms; opacity: 0; }
        .animation-delay-300 { animation-delay: 300ms; opacity: 0; }
        .animation-delay-400 { animation-delay: 400ms; opacity: 0; }
        .animation-delay-600 { animation-delay: 600ms; opacity: 0; }
        .animation-delay-800 { animation-delay: 800ms; opacity: 0; }
        .animation-delay-1000 { animation-delay: 1000ms; opacity: 0; }

        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }

        .prose p strong {
          color: #111827;
          font-weight: 700;
        }

        .prose p em {
          font-style: italic;
        }
      `}</style>
      <Footer />
    </div>
  );
}
