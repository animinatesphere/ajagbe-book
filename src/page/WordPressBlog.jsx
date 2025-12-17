// WordPressBlog.jsx - Enhanced Ultra Responsive Design
import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import BlogDetailPage from "./BlogDetailPage";
import {
  Search,
  Calendar,
  ChevronRight,
  Loader2,
  Clock,
  ArrowRight,
  Sparkles,
  TrendingUp,
} from "lucide-react";

export default function WordPressBlog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);

  const createSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const findPostBySlug = (slug) => {
    return posts.find((post) => createSlug(post.title) === slug);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (posts.length > 0) {
      const urlParams = new URLSearchParams(window.location.search);
      const postSlug = urlParams.get("post");

      if (postSlug) {
        const post = findPostBySlug(postSlug);
        if (post) {
          setSelectedPost(post);
        }
      }
    }
  }, [posts]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("status", "published")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getReadTime = (content) => {
    if (!content) return "5 min read";
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
    const slug = createSlug(post.title);
    window.history.pushState({}, "", `?post=${slug}`);
  };

  if (selectedPost) {
    return (
      <BlogDetailPage
        postId={selectedPost.id}
        onBack={() => {
          setSelectedPost(null);
          window.history.pushState({}, "", window.location.pathname);
        }}
      />
    );
  }

  const featuredPost = filteredPosts[0];
  const regularPosts = filteredPosts.slice(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Enhanced Hero Header */}
      <header className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600 text-white">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHpNMTIgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] animate-pulse"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-28">
          <div className="flex items-center space-x-2 mb-3 sm:mb-4 animate-fade-in">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300 animate-pulse" />
            <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-indigo-200">
              Our Blog
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold mb-4 sm:mb-6 leading-tight tracking-tight animate-slide-up">
            Stories & Insights
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-indigo-100 max-w-3xl leading-relaxed animate-slide-up-delay">
            Explore our latest thoughts on technology, design, and innovation.
            Discover insights that matter.
          </p>
        </div>

        {/* Enhanced Wave with gradient */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-12 sm:h-16 md:h-20 lg:h-24"
          >
            <defs>
              <linearGradient
                id="waveGradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  stopColor="rgb(248, 250, 252)"
                  stopOpacity="0.1"
                />
                <stop
                  offset="100%"
                  stopColor="rgb(248, 250, 252)"
                  stopOpacity="1"
                />
              </linearGradient>
            </defs>
            <path
              d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z"
              fill="url(#waveGradient)"
            />
          </svg>
        </div>
      </header>

      {/* Enhanced Search Bar with Animation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-12 md:-mt-14 lg:-mt-16 relative z-10">
        <div className="bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-2xl hover:shadow-3xl  duration-300 p-4 sm:p-6 lg:p-8 border border-gray-100 transform hover:scale-[1.01] transition-transform">
          <div className="relative">
            <Search
              className="absolute left-4 sm:left-6 top-1/2 transform -translate-y-1/2 text-gray-400 transition-colors"
              size={20}
            />
            <input
              type="text"
              placeholder="Search articles by title, topic, or keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 sm:pl-16 pr-4 sm:pr-6 py-3 sm:py-4 lg:py-5 text-sm sm:text-base lg:text-lg rounded-lg sm:rounded-xl border-2 border-transparent bg-gray-50 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 focus:outline-none transition-all duration-300"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-16 lg:py-20">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 sm:py-32 lg:py-40">
            <Loader2 className="animate-spin text-indigo-600 mb-6" size={56} />
            <p className="text-gray-500 text-lg sm:text-xl font-medium">
              Loading amazing content...
            </p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-24 sm:py-32 lg:py-40">
            <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mb-6 sm:mb-8">
              <Search className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              No posts found
            </h3>
            <p className="text-gray-500 text-base sm:text-lg lg:text-xl">
              Try adjusting your search terms or browse all articles
            </p>
          </div>
        ) : (
          <>
            {/* Enhanced Featured Post */}
            {featuredPost && (
              <div className="mb-14 sm:mb-20 lg:mb-24 animate-fade-in">
                <div className="flex items-center space-x-3 mb-6 sm:mb-8">
                  <div className="h-1 w-10 sm:w-14 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full"></div>
                  <span className="text-xs sm:text-sm lg:text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 uppercase tracking-widest">
                    Featured Article
                  </span>
                </div>

                <article
                  onClick={() => handlePostClick(featuredPost)}
                  className="group relative bg-white rounded-2xl sm:rounded-3xl lg:rounded-[2rem] overflow-hidden shadow-xl hover:shadow-3xl transition-all duration-700 cursor-pointer border border-gray-100 transform hover:scale-[1.01]"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    {/* Featured Image */}
                    <div className="relative h-72 sm:h-96 lg:h-full overflow-hidden">
                      <img
                        src={
                          featuredPost.featured_image ||
                          "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200"
                        }
                        alt={featuredPost.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                      {/* Floating Badge */}
                      <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 lg:bottom-8 lg:left-8">
                        <span className="inline-flex items-center px-4 sm:px-5 py-2 sm:py-2.5 bg-white/95 backdrop-blur-md text-indigo-600 font-bold text-xs sm:text-sm rounded-full shadow-lg transform group-hover:scale-110 transition-transform">
                          <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
                          Latest Story
                        </span>
                      </div>
                    </div>

                    {/* Featured Content */}
                    <div className="p-6 sm:p-8 md:p-10 lg:p-12 xl:p-14 flex flex-col justify-center bg-gradient-to-br from-white to-gray-50">
                      <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4 sm:mb-5 text-xs sm:text-sm text-gray-500">
                        <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1.5 rounded-full">
                          <Calendar size={14} />
                          <span className="font-medium hidden sm:inline">
                            {formatDate(featuredPost.created_at)}
                          </span>
                          <span className="font-medium sm:hidden">
                            {new Date(
                              featuredPost.created_at
                            ).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-full">
                          <Clock size={14} />
                          <span className="font-semibold">
                            {getReadTime(featuredPost.content)}
                          </span>
                        </div>
                      </div>

                      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-900 mb-4 sm:mb-5 lg:mb-6 leading-[1.1] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 transition-all duration-300">
                        {featuredPost.title}
                      </h2>

                      <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed line-clamp-2 sm:line-clamp-3">
                        {featuredPost.excerpt}
                      </p>

                      <div className="flex items-center justify-between pt-6 border-t-2 border-gray-200">
                        <div className="flex items-center space-x-3 sm:space-x-4">
                          <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-lg">
                            {(featuredPost.author || "A")[0].toUpperCase()}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 text-sm sm:text-base lg:text-lg">
                              {featuredPost.author || "Anonymous"}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-500">
                              Article Author
                            </p>
                          </div>
                        </div>

                        <div className="hidden sm:flex items-center text-indigo-600 font-bold group-hover:text-purple-600 group-hover:translate-x-2 transition-all text-sm sm:text-base lg:text-lg">
                          Read Full Article
                          <ArrowRight className="ml-2 w-5 h-5 lg:w-6 lg:h-6" />
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            )}

            {/* Enhanced Regular Posts Grid */}
            {regularPosts.length > 0 && (
              <>
                <div className="flex items-center space-x-3 mb-8 sm:mb-10 lg:mb-12">
                  <div className="h-1 w-10 sm:w-14 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full"></div>
                  <span className="text-xs sm:text-sm lg:text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 uppercase tracking-widest">
                    More Articles
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
                  {regularPosts.map((post, index) => {
                    const featuredImage =
                      post.featured_image ||
                      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800";
                    const author = post.author || "Anonymous";

                    return (
                      <article
                        key={post.id}
                        className="group bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg hover:shadow-3xl transition-all duration-700 transform hover:-translate-y-3 cursor-pointer border border-gray-100 animate-fade-in-up"
                        onClick={() => handlePostClick(post)}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        {/* Card Image */}
                        <div className="relative h-52 sm:h-56 md:h-60 lg:h-64 overflow-hidden">
                          <img
                            src={featuredImage}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                          {/* Read Time Badge */}
                          <div className="absolute top-4 right-4">
                            <span className="inline-flex items-center px-3 py-1.5 bg-white/95 backdrop-blur-md text-indigo-600 font-bold text-xs rounded-full shadow-lg">
                              <Clock className="w-3.5 h-3.5 mr-1.5" />
                              {getReadTime(post.content)}
                            </span>
                          </div>
                        </div>

                        {/* Card Content */}
                        <div className="p-5 sm:p-6 lg:p-7">
                          <div className="flex items-center space-x-2 mb-3 text-xs text-gray-500">
                            <Calendar size={14} />
                            <span className="font-medium hidden sm:inline">
                              {formatDate(post.created_at)}
                            </span>
                            <span className="font-medium sm:hidden">
                              {new Date(post.created_at).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </span>
                          </div>

                          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 transition-all duration-300 leading-tight">
                            {post.title}
                          </h3>

                          <p className="text-gray-600 mb-4 sm:mb-5 line-clamp-2 sm:line-clamp-3 text-sm sm:text-base leading-relaxed">
                            {post.excerpt}
                          </p>

                          <div className="flex items-center justify-between pt-4 border-t-2 border-gray-100">
                            <div className="flex items-center space-x-2.5">
                              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                                {author[0].toUpperCase()}
                              </div>
                              <span className="text-sm sm:text-base font-semibold text-gray-700 truncate max-w-[120px] sm:max-w-[150px]">
                                {author}
                              </span>
                            </div>

                            <ChevronRight
                              className="text-indigo-600 group-hover:text-purple-600 group-hover:translate-x-1 transition-all flex-shrink-0"
                              size={22}
                            />
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </>
            )}
          </>
        )}
      </main>

      {/* Enhanced Scroll to Top Button */}
      {filteredPosts.length > 3 && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 lg:bottom-10 lg:right-10 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 sm:p-5 rounded-full shadow-2xl hover:shadow-3xl hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-110 z-50 group"
          aria-label="Scroll to top"
        >
          <TrendingUp className="w-6 h-6 group-hover:animate-bounce" />
        </button>
      )}

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

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }

        .animate-slide-up-delay {
          animation: slide-up 0.8s ease-out 0.2s backwards;
        }

        .animate-fade-in-up {
          animation: fade-in 0.6s ease-out backwards;
        }

        .shadow-3xl {
          box-shadow: 0 35px 60px -15px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
}
