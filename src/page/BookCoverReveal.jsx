import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Tag,
  Sparkles,
  BookOpen,
  Heart,
} from "lucide-react";
import Footer from "../component/Footer";

export default function BookCoverReveal() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const eventDate = new Date("2025-12-23T19:00:00");

    const timer = setInterval(() => {
      const now = new Date();
      const difference = eventDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br z-[1] pt-30 from-amber-50 via-orange-50 to-red-50 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-300/20 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-red-300/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 w-64 h-64 bg-amber-300/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        {/* Header */}

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-6 py-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div
              className={`lg:col-span-2 transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              {/* Hero Section */}
              <div className="bg-gradient-to-br from-orange-600 via-red-600 to-pink-600 rounded-3xl p-12 text-white shadow-2xl mb-8 relative overflow-hidden group hover:shadow-orange-500/50 transition-all duration-500 hover:scale-[1.02]">
                {/* Animated shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                {/* Floating sparkles */}
                <Sparkles className="absolute top-8 right-8 w-6 h-6 animate-pulse opacity-70" />
                <Sparkles
                  className="absolute bottom-12 left-12 w-4 h-4 animate-pulse opacity-50"
                  style={{ animationDelay: "0.5s" }}
                />
                <Sparkles
                  className="absolute top-1/2 right-1/4 w-5 h-5 animate-pulse opacity-60"
                  style={{ animationDelay: "1s" }}
                />

                <div className="relative z-10">
                  <div className="text-sm font-semibold mb-4 tracking-wider flex items-center gap-2 animate-bounce">
                    <Calendar className="w-4 h-4" />
                    DECEMBER 23
                  </div>
                  <h2 className="text-[20px] sm:text-[25px] md:text-[30px] lg:text-[40px] font-bold mb-6 leading-tight animate-fade-in">
                    Upcoming
                    <br />
                    Book Cover
                    <br />
                    Reveal
                  </h2>

                  {/* Countdown Timer */}
                  <div className="grid grid-cols-4 gap-4 mt-8">
                    {[
                      { value: timeLeft.days, label: "Days" },
                      { value: timeLeft.hours, label: "Hours" },
                      { value: timeLeft.minutes, label: "Mins" },
                      { value: timeLeft.seconds, label: "Secs" },
                    ].map((item, idx) => (
                      <div
                        key={item.label}
                        className="bg-white/20 backdrop-blur-sm rounded-xl p-5 text-center hover:bg-white/30 transition-all duration-300 hover:scale-110 cursor-pointer transform"
                        style={{ animationDelay: `${idx * 0.1}s` }}
                      >
                        <div className="text-[8px] sm:text-[10px] md:text-[12px]  lg:text-[14px] font-bold tabular-nums">
                          {String(item.value).padStart(2, "0")}
                        </div>
                        <div className="text-[6px] sm:text-[8px] md:text-[10px] lg:text-[12px] uppercase mt-2 opacity-90 font-semibold tracking-wider">
                          {item.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* About The Event */}
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:translate-y-[-4px] border border-orange-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-1 w-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
                  <h3 className="text-3xl font-bold text-gray-900">
                    About The Event
                  </h3>
                  <div className="h-1 flex-1 bg-gradient-to-r from-red-500 to-transparent rounded-full"></div>
                </div>

                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-5">
                  <p className="hover:text-gray-900 transition-colors duration-300">
                    As a published author, I have been waiting years for this
                    day – to be able to announce that Tuesday, December 23rd
                    2025 – I will be revealing my book cover in anticipation of
                    the release of my upcoming novel in summer of 2026 with Dawn
                    Woven Books in Bristol, England.
                  </p>

                  <p className="hover:text-gray-900 transition-colors duration-300">
                    For the last seven weeks, I have been trying to find the
                    best cover possible to match my vision of my next book. I am
                    so excited to say that I was successful but it was far from
                    easy. In every industry, there are things that go smoothly
                    and things that require better planning, management, and
                    follow-through. Regardless of circumstance, communication is
                    the key to finding a good product, a good team, and help
                    from those with more experience.
                  </p>

                  <p className="hover:text-gray-900 transition-colors duration-300">
                    When I started, I wasn't sure what I wanted my book to look
                    like. Much like my first draft of the writing, I just went
                    with the flow. As the process unfolded, I began receiving
                    ideas and pictures that helped shape my vision of what I
                    wanted the cover to look like. It took weeks to finally find
                    the right illustration and become satisfied with the
                    results.
                  </p>

                  <p className="hover:text-gray-900 transition-colors duration-300">
                    Last week, when I opened my email with several different
                    book cover illustrations, I almost ran out of my mind and
                    started jumping in the air. All options were perfect and it
                    was difficult to just pick one. After all the ups and downs,
                    I feel that I have found the perfect cover for my book. I
                    know I am an indie author – with a small following – but I
                    hope you can get slightly excited for me along the way.
                    Thanks for joining in this adventure.
                  </p>

                  <p className="font-semibold text-gray-900 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-500 animate-pulse" />
                    Thank you to all those beta readers, editors, formatting
                    experts, those who reviewed by the back of book blurb, and
                    more. This has been an awesome ride.
                  </p>

                  <p className="text-orange-600 font-bold text-2xl animate-pulse">
                    Stay tuned.
                  </p>
                </div>

                {/* Author Info */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform duration-300 group-hover:shadow-orange-500/50">
                      AA
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-lg group-hover:text-orange-600 transition-colors">
                        Ajagbe Ayodeji
                      </div>
                      <div className="text-sm text-gray-600">
                        Author / Speaker
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div
              className={`space-y-6 transition-all duration-1000 delay-300 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              {/* Event Details Card */}
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border-t-4 border-orange-500 hover:shadow-2xl transition-all duration-500 hover:translate-y-[-4px]">
                <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-orange-500" />
                  Details
                </h4>

                <div className="space-y-5">
                  {[
                    {
                      icon: Calendar,
                      label: "Date",
                      value: "December 23, 2025",
                      color: "text-orange-600",
                    },
                    {
                      icon: Clock,
                      label: "Time",
                      value: "7:00 pm - 8:00 pm",
                      color: "text-red-600",
                    },
                    {
                      icon: MapPin,
                      label: "Location",
                      value: "Virtual Event",
                      color: "text-pink-600",
                    },
                    {
                      icon: Tag,
                      label: "Category",
                      value: "Book Introduction",
                      color: "text-amber-600",
                    },
                  ].map((item, idx) => (
                    <div
                      key={item.label}
                      className="flex items-start gap-3 group hover:bg-orange-50 p-3 rounded-xl transition-all duration-300 cursor-pointer"
                      style={{ animationDelay: `${idx * 0.1}s` }}
                    >
                      <item.icon
                        className={`w-5 h-5 ${item.color} mt-1 flex-shrink-0 group-hover:scale-125 transition-transform duration-300`}
                      />
                      <div>
                        <div className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                          {item.label}
                        </div>
                        <div className="text-sm text-gray-600">
                          {item.value}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <a
                    href="https://www.ajagbeayodeji.com"
                    className="text-sm text-orange-600 hover:text-orange-700 font-semibold flex items-center gap-2 group"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>www.ajagbeayodeji.com</span>
                    <span className="group-hover:translate-x-2 transition-transform duration-300">
                      →
                    </span>
                  </a>
                </div>
              </div>

              {/* Schedule Card */}
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:translate-y-[-4px] border border-orange-200">
                <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-orange-500" />
                  Schedule
                </h4>

                <div className="space-y-4">
                  {[
                    {
                      title: "Introduction",
                      author: "By Ajagbe Ayodeji",
                      time: "7:00 pm",
                    },
                    {
                      title: "Event Content",
                      author: "By Ajagbe Ayodeji",
                      time: "7:15 pm",
                    },
                    {
                      title: "Closing and Thanks",
                      author: "By Ajagbe Ayodeji",
                      time: "7:45 pm",
                    },
                  ].map((item, idx) => (
                    <div
                      key={item.title}
                      className="border-l-4 border-orange-500 pl-4 py-3 bg-white/60 rounded-r-xl hover:bg-white transition-all duration-300 hover:translate-x-2 cursor-pointer group"
                      style={{ animationDelay: `${idx * 0.15}s` }}
                    >
                      <div className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                        {item.title}
                      </div>
                      <div className="text-sm text-gray-600">{item.author}</div>
                      <div className="text-xs text-orange-600 font-semibold mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {item.time}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags Card */}
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500">
                <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Tag className="w-5 h-5 text-orange-500" />
                  Event Tags
                </h4>
                <div className="flex flex-wrap gap-2">
                  {["ajagbeayodeji", "book launch", "Introduction"].map(
                    (tag, idx) => (
                      <span
                        key={tag}
                        className="px-4 py-2 bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 rounded-full text-sm font-medium hover:from-orange-200 hover:to-red-200 transition-all duration-300 cursor-pointer hover:scale-110 shadow-sm hover:shadow-md"
                        style={{ animationDelay: `${idx * 0.1}s` }}
                      >
                        #{tag}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>

        <style jsx>{`
          @keyframes fade-in {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fade-in {
            animation: fade-in 1s ease-out;
          }
        `}</style>
      </div>
      <Footer />
    </>
  );
}
