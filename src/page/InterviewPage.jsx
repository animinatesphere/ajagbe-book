import React, { useState } from "react";
import {
  ExternalLink,
  Play,
  FileText,
  Mic,
  Calendar,
  Award,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../component/Footer";

const InterviewPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const interviews = [
    {
      id: 1,
      title: "Reflection: Rulers and Preys",
      platform: "Instagram Video",
      date: "August 29, 2020",
      description: "An inside look at Ayodeji's political thriller book",
      url: "https://www.instagram.com/tv/CdQ5E6EoeXi/?igshid=YmMyMTA2M2Y=",
      type: "video",
      featured: true,
    },
    {
      id: 2,
      title: "Agnes Kaye's Author2Author",
      platform: "Instagram Reel",
      date: "2024",
      description: "Exclusive author conversation",
      url: "https://www.instagram.com/reel/C8PveRxoFle/?igsh=MThyaTJ3ZGNnZG1xZg==",
      type: "video",
      featured: true,
    },
    {
      id: 3,
      title: "A.H Mohammed Is My Biggest Inspiration",
      platform: "A2Sats Blog",
      date: "May 2022",
      description: "Discussing literary influences and creative inspiration",
      url: "https://www.a2satsblog.com/2022/05/ah-mohammed-is-my-biggest-inspiration.html?m=1",
      type: "article",
    },
    {
      id: 4,
      title: "I Published My First Book During ASUU Strike",
      platform: "Budoz The Informant",
      date: "2022",
      description: "The journey of publishing amidst challenges",
      url: "https://www.budoztheinformant.com/i-published-my-first-book-during-asuu-strike-ayodeji-ajagbe/",
      type: "article",
    },
    {
      id: 5,
      title: "Weekly Author Spotlight",
      platform: "Reader Central",
      date: "March 8, 2021",
      description: "Featured author interview and spotlight",
      url: "https://readercentral.co/author-spotlights/08/ajagbe-ayodeji-weekly-author-spotlight-8-march-2021/",
      type: "article",
      featured: true,
    },
    {
      id: 6,
      title: "Author Interview — Romania",
      platform: "Romelia Lungu Blog",
      date: "November 30, 2020",
      description: "International feature on writing and craft",
      url: "https://romelialungu.home.blog/2020/11/30/author-interview-28/amp/",
      type: "article",
    },
    {
      id: 7,
      title: "Everything in Between",
      platform: "The Nation Newspaper",
      date: "2023",
      description: "National media feature",
      url: "https://fb.watch/dEtAXw4XlR/",
      type: "video",
    },
    {
      id: 8,
      title: "Young and Booked Series",
      platform: "Tale of The Book",
      date: "June 7, 2022",
      description: "Episode 8 with Obe Keno",
      url: "http://taleofthebook.art.blog/2022/06/07/young-and-booked-series-1-episode-8/",
      type: "podcast",
    },
    {
      id: 9,
      title: "Art With Purpose Magazine",
      platform: "Amazon Publication",
      date: "June 2022",
      description: "Featured in international arts magazine",
      url: "https://www.amazon.com/dp/B0B5S4PZVH",
      type: "magazine",
    },
    {
      id: 10,
      title: "Artistically Bent",
      platform: "BTR Weekly",
      date: "2022",
      description: "Exploring the artistic side of writing",
      url: "https://www.tumblr.com/blog/view/bookstoreadbtr/689893203792592896?source=share",
      type: "article",
    },
    {
      id: 11,
      title: "Award-Winning Nigerian Author Embracing Hard-Work",
      platform: "Blue Star Insider",
      date: "July 28, 2022",
      description: "Profile on dedication and success",
      url: "https://thebluestarinsider.news.blog/2022/07/28/ayodeji-ajagbe-an-award-winning-nigerian-author-who-is-embracing-hard-work/",
      type: "article",
    },
    {
      id: 12,
      title: "The Heart of Under the Milky Way",
      platform: "Apple Podcasts",
      date: "2024",
      description: "Reflecting on poetry, collaboration, and community",
      url: "https://podcasts.apple.com/ng/podcast/outside-the-pages-with-moroti/id1500281922?i=1000724353732",
      type: "podcast",
      featured: true,
    },
    {
      id: 13,
      title: "The Heart of Under the Milky Way",
      platform: "Spotify",
      date: "2024",
      description: "Reflecting on poetry, collaboration, and community",
      url: "https://open.spotify.com/episode/10fC6E21mJdQjHWerF9Rek?si=snULt9TMTYiDulRTw6KrrQ",
      type: "podcast",
      featured: true,
    },
    {
      id: 14,
      title: "Author Interview with Ayodeji Ajagbe",
      platform: "Rebecca Crunden",
      date: "February 21, 2025",
      description: "Recent conversation on craft and creativity",
      url: "https://rebeccacrunden.com/2025/02/21/author-interview-with-ayodeji-ajagbe/",
      type: "article",
      featured: true,
    },
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case "video":
        return <Play className="w-4 h-4" />;
      case "podcast":
        return <Mic className="w-4 h-4" />;
      case "magazine":
        return <Award className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getTypeBadgeColor = (type) => {
    switch (type) {
      case "video":
        return "bg-rose-50 text-rose-700 border-rose-200";
      case "podcast":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "magazine":
        return "bg-amber-50 text-amber-700 border-amber-200";
      default:
        return "bg-blue-50 text-blue-700 border-blue-200";
    }
  };

  const filteredInterviews =
    activeCategory === "all"
      ? interviews
      : interviews.filter((i) => i.type === activeCategory);

  const featuredInterviews = interviews.filter((i) => i.featured);

  return (
    <>
      <div className="min-h-screen bg-white pt-30">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-white border-b border-gray-100">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50 opacity-60"></div>

          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-30"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-indigo-100 to-pink-100 rounded-full blur-3xl opacity-30"></div>

          <div className="relative max-w-7xl mx-auto px-6 py-24 sm:py-32">
            <div className="text-center space-y-8">
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-white rounded-full border border-gray-200 shadow-sm">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span className="text-sm font-semibold text-gray-700">
                  Award-Winning Author
                </span>
              </div>

              <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-gray-900">
                Interviews & <span className="text-indigo-600">Features</span>
              </h1>

              <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Conversations on literature, creativity, and the craft of
                storytelling with Ayodeji Ajagbe
              </p>

              <div className="flex items-center justify-center gap-12 pt-8">
                <div className="text-center">
                  <div className="text-5xl font-bold text-gray-900">
                    {interviews.length}+
                  </div>
                  <div className="text-sm text-gray-500 mt-1 font-medium">
                    Interviews
                  </div>
                </div>
                <div className="w-px h-16 bg-gray-200"></div>
                <div className="text-center">
                  <div className="text-5xl font-bold text-gray-900">6+</div>
                  <div className="text-sm text-gray-500 mt-1 font-medium">
                    Platforms
                  </div>
                </div>
                <div className="w-px h-16 bg-gray-200"></div>
                <div className="text-center">
                  <div className="text-5xl font-bold text-gray-900">5</div>
                  <div className="text-sm text-gray-500 mt-1 font-medium">
                    Years
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Interviews */}
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="space-y-10">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full">
                <Award className="w-4 h-4 text-indigo-600" />
                <span className="text-sm font-semibold text-indigo-600">
                  Featured
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
                Highlighted Conversations
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                A curated selection of notable interviews and feature articles
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredInterviews.map((interview) => (
                <a
                  key={interview.id}
                  href={interview.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-indigo-500 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
                >
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                      <ExternalLink className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  <div
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border mb-5 ${getTypeBadgeColor(
                      interview.type
                    )}`}
                  >
                    {getTypeIcon(interview.type)}
                    {interview.type.charAt(0).toUpperCase() +
                      interview.type.slice(1)}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors leading-tight">
                    {interview.title}
                  </h3>

                  <p className="text-sm text-gray-600 mb-5 leading-relaxed">
                    {interview.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-xs text-gray-700 font-semibold">
                      {interview.platform}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <Calendar className="w-3.5 h-3.5" />
                      {interview.date}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* All Interviews Section */}
        <div className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Complete Archive
              </h2>
              <p className="text-lg text-gray-600">
                Explore all interviews and features
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-3 mb-12 justify-center">
              {["all", "video", "article", "podcast", "magazine"].map(
                (category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-8 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
                      activeCategory === category
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                        : "bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                )
              )}
            </div>

            {/* Interview Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredInterviews.map((interview) => (
                <a
                  key={interview.id}
                  href={interview.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-indigo-400 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-semibold border ${getTypeBadgeColor(
                        interview.type
                      )}`}
                    >
                      {getTypeIcon(interview.type)}
                      {interview.type.charAt(0).toUpperCase() +
                        interview.type.slice(1)}
                    </div>

                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 transition-colors" />
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors line-clamp-2">
                    {interview.title}
                  </h3>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                    {interview.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-xs text-gray-700 font-semibold truncate pr-2">
                      {interview.platform}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-gray-500 shrink-0">
                      <Calendar className="w-3 h-3" />
                      {interview.date}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="relative overflow-hidden bg-white border-2 border-gray-200 rounded-3xl p-12 sm:p-16 text-center shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 opacity-50"></div>

            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-full mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>

              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
                Interested in an Interview?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                For media inquiries, podcast appearances, or feature
                opportunities, feel free to reach out
              </p>

              <div className="pt-6">
                <Link to="/contact">
                  <button className="px-10 py-4 bg-indigo-600 text-white rounded-full font-bold text-lg hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300">
                    Get in Touch
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default InterviewPage;
