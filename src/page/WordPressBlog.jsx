// WordPressBlog.jsx - Improved with title slugs and better responsive design
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

  // ✨ NEW: Helper function to create URL-friendly slug from title
  const createSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric chars with dash
      .replace(/^-+|-+$/g, ""); // Remove leading/trailing dashes
  };

  // ✨ NEW: Helper function to find post by slug
  const findPostBySlug = (slug) => {
    return posts.find((post) => createSlug(post.title) === slug);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // ✨ NEW: Check URL for post slug after posts are loaded
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

  // ✨ UPDATED: Now uses title slug instead of ID
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
      {/* Hero Header - Improved responsive design */}
      <header className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHpNMTIgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24">
          <div className="flex items-center space-x-2 mb-3 sm:mb-4">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300" />
            <span className="text-xs sm:text-sm font-semibold tracking-wide uppercase text-indigo-200">
              Our Blog
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 sm:mb-6 leading-tight">
            Stories & Insights
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-indigo-100 max-w-3xl leading-relaxed">
            Explore our latest thoughts on technology, design, and innovation.
            Discover insights that matter.
          </p>
        </div>

        {/* Decorative Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-16 sm:h-20 md:h-24"
          >
            <path
              d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z"
              fill="rgb(248, 250, 252)"
            />
          </svg>
        </div>
      </header>

      {/* Search Bar - Improved responsive */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 sm:-mt-14 md:-mt-16 relative z-10">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 border border-gray-100">
          <div className="relative">
            <Search
              className="absolute left-3 sm:left-5 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 sm:pl-14 pr-4 sm:pr-6 py-3 sm:py-4 text-sm sm:text-base lg:text-lg rounded-lg sm:rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 focus:outline-none transition-all"
            />
          </div>
        </div>
      </div>

      {/* Main Content - Improved responsive */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 sm:py-32">
            <Loader2 className="animate-spin text-indigo-600 mb-4" size={48} />
            <p className="text-gray-500 text-base sm:text-lg">
              Loading amazing content...
            </p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-20 sm:py-32">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full mb-4 sm:mb-6">
              <Search className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
              No posts found
            </h3>
            <p className="text-gray-500 text-base sm:text-lg">
              Try adjusting your search terms
            </p>
          </div>
        ) : (
          <>
            {/* Featured Post - Improved responsive */}
            {featuredPost && (
              <div className="mb-12 sm:mb-16 md:mb-20">
                <div className="flex items-center space-x-2 mb-4 sm:mb-6">
                  <div className="h-1 w-8 sm:w-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"></div>
                  <span className="text-xs sm:text-sm font-bold text-indigo-600 uppercase tracking-wider">
                    Featured Article
                  </span>
                </div>

                <article
                  onClick={() => handlePostClick(featuredPost)}
                  className="group relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                    <div className="relative h-64 sm:h-80 md:h-full overflow-hidden">
                      <img
                        src={
                          featuredPost.featured_image ||
                          "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800"
                        }
                        alt={featuredPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
                        <span className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-white/90 backdrop-blur-sm text-indigo-600 font-bold text-xs sm:text-sm rounded-full">
                          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                          Latest
                        </span>
                      </div>
                    </div>

                    <div className="p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-3 sm:mb-4 text-xs sm:text-sm text-gray-500">
                        <div className="flex items-center space-x-1 sm:space-x-2">
                          <Calendar size={14} className="sm:w-4 sm:h-4" />
                          <span className="hidden sm:inline">
                            {formatDate(featuredPost.created_at)}
                          </span>
                          <span className="sm:hidden">
                            {new Date(
                              featuredPost.created_at
                            ).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <span className="hidden sm:inline">•</span>
                        <div className="flex items-center space-x-1 sm:space-x-2">
                          <Clock size={14} className="sm:w-4 sm:h-4" />
                          <span>{getReadTime(featuredPost.content)}</span>
                        </div>
                      </div>

                      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight group-hover:text-indigo-600 transition-colors">
                        {featuredPost.title}
                      </h2>

                      <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-4 sm:mb-6 leading-relaxed line-clamp-2 sm:line-clamp-3">
                        {featuredPost.excerpt}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg">
                            {(featuredPost.author || "A")[0].toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 text-sm sm:text-base">
                              {featuredPost.author || "Anonymous"}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-500">
                              Author
                            </p>
                          </div>
                        </div>

                        <div className="hidden sm:flex items-center text-indigo-600 font-semibold group-hover:translate-x-2 transition-transform text-sm sm:text-base">
                          Read Article
                          <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            )}

            {/* Regular Posts Grid - Improved responsive */}
            {regularPosts.length > 0 && (
              <>
                <div className="flex items-center space-x-2 mb-6 sm:mb-8">
                  <div className="h-1 w-8 sm:w-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"></div>
                  <span className="text-xs sm:text-sm font-bold text-indigo-600 uppercase tracking-wider">
                    More Articles
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                  {regularPosts.map((post, index) => {
                    const featuredImage =
                      post.featured_image ||
                      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800";
                    const author = post.author || "Anonymous";

                    return (
                      <article
                        key={post.id}
                        className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer border border-gray-100"
                        onClick={() => handlePostClick(post)}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="relative h-48 sm:h-52 md:h-56 overflow-hidden">
                          <img
                            src={featuredImage}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                          <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                            <span className="inline-flex items-center px-2 sm:px-3 py-1 bg-white/90 backdrop-blur-sm text-indigo-600 font-semibold text-xs rounded-full">
                              <Clock className="w-3 h-3 mr-1" />
                              {getReadTime(post.content)}
                            </span>
                          </div>
                        </div>

                        <div className="p-4 sm:p-5 md:p-6">
                          <div className="flex items-center space-x-2 mb-2 sm:mb-3 text-xs text-gray-500">
                            <Calendar size={12} className="sm:w-3.5 sm:h-3.5" />
                            <span className="hidden sm:inline">
                              {formatDate(post.created_at)}
                            </span>
                            <span className="sm:hidden">
                              {new Date(post.created_at).toLocaleDateString(
                                "en-US",
                                { month: "short", day: "numeric" }
                              )}
                            </span>
                          </div>

                          <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors leading-tight">
                            {post.title}
                          </h3>

                          <p className="text-gray-600 mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3 text-xs sm:text-sm leading-relaxed">
                            {post.excerpt}
                          </p>

                          <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-100">
                            <div className="flex items-center space-x-2">
                              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                                {author[0].toUpperCase()}
                              </div>
                              <span className="text-xs sm:text-sm font-medium text-gray-700 truncate max-w-[120px] sm:max-w-none">
                                {author}
                              </span>
                            </div>

                            <ChevronRight
                              className="text-indigo-600 group-hover:translate-x-1 transition-transform flex-shrink-0"
                              size={18}
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

      {/* Scroll to top button - Mobile friendly */}
      {filteredPosts.length > 3 && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 bg-indigo-600 text-white p-3 sm:p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-all transform hover:scale-110 z-50"
          aria-label="Scroll to top"
        >
          <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      )}
    </div>
  );
}
