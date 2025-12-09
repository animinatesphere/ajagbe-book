import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import {
  Search,
  Calendar,
  User,
  ChevronRight,
  Loader2,
  X,
  Clock,
  ArrowRight,
  Sparkles,
  Tag,
} from "lucide-react";

export default function WordPressBlog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

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

  const featuredPost = filteredPosts[0];
  const regularPosts = filteredPosts.slice(1);

  return (
    <div className="min-h-screen bg-gradient-to-br  pt-35 from-gray-50 via-white to-gray-50">
      {/* Hero Header with Animated Background */}
      <header className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHpNMTIgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="flex items-center space-x-2 mb-4">
            <Sparkles className="w-5 h-5 text-yellow-300" />
            <span className="text-sm font-semibold tracking-wide uppercase text-indigo-200">
              Our Blog
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            Stories & Insights
          </h1>
          <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl leading-relaxed">
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
            className="w-full"
          >
            <path
              d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z"
              fill="rgb(249, 250, 251)"
            />
          </svg>
        </div>
      </header>

      {/* Search Bar with Enhanced Design */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
          <div className="relative">
            <Search
              className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={22}
            />
            <input
              type="text"
              placeholder="Search for articles, topics, or authors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-14 pr-6 py-4 text-lg rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 focus:outline-none transition-all"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 className="animate-spin text-indigo-600 mb-4" size={56} />
            <p className="text-gray-500 text-lg">Loading amazing content...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-32">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-3">
              No posts found
            </h3>
            <p className="text-gray-500 text-lg">
              Try adjusting your search terms
            </p>
          </div>
        ) : (
          <>
            {/* Featured Post */}
            {featuredPost && (
              <div className="mb-20">
                <div className="flex items-center space-x-2 mb-6">
                  <div className="h-1 w-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"></div>
                  <span className="text-sm font-bold text-indigo-600 uppercase tracking-wider">
                    Featured Article
                  </span>
                </div>

                <article
                  onClick={() => setSelectedPost(featuredPost)}
                  className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer"
                >
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative h-80 md:h-full overflow-hidden">
                      <img
                        src={
                          featuredPost.featured_image ||
                          "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800"
                        }
                        alt={featuredPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                      <div className="absolute bottom-6 left-6">
                        <span className="inline-flex items-center px-4 py-2 bg-white/90 backdrop-blur-sm text-indigo-600 font-bold text-sm rounded-full">
                          <Sparkles className="w-4 h-4 mr-2" />
                          Latest
                        </span>
                      </div>
                    </div>

                    <div className="p-10 md:p-12 flex flex-col justify-center">
                      <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-2">
                          <Calendar size={16} />
                          <span>{formatDate(featuredPost.created_at)}</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center space-x-2">
                          <Clock size={16} />
                          <span>{getReadTime(featuredPost.content)}</span>
                        </div>
                      </div>

                      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-indigo-600 transition-colors">
                        {featuredPost.title}
                      </h2>

                      <p className="text-gray-600 text-lg mb-6 leading-relaxed line-clamp-3">
                        {featuredPost.excerpt}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {(featuredPost.author || "A")[0].toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">
                              {featuredPost.author || "Anonymous"}
                            </p>
                            <p className="text-sm text-gray-500">Author</p>
                          </div>
                        </div>

                        <div className="flex items-center text-indigo-600 font-semibold group-hover:translate-x-2 transition-transform">
                          Read Article
                          <ArrowRight className="ml-2 w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            )}

            {/* Regular Posts Grid */}
            {regularPosts.length > 0 && (
              <>
                <div className="flex items-center space-x-2 mb-8">
                  <div className="h-1 w-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"></div>
                  <span className="text-sm font-bold text-indigo-600 uppercase tracking-wider">
                    More Articles
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {regularPosts.map((post, index) => {
                    const featuredImage =
                      post.featured_image ||
                      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800";
                    const author = post.author || "Anonymous";

                    return (
                      <article
                        key={post.id}
                        className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer border border-gray-100"
                        onClick={() => setSelectedPost(post)}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="relative h-56 overflow-hidden">
                          <img
                            src={featuredImage}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                          <div className="absolute top-4 right-4">
                            <span className="inline-flex items-center px-3 py-1 bg-white/90 backdrop-blur-sm text-indigo-600 font-semibold text-xs rounded-full">
                              <Clock className="w-3 h-3 mr-1" />
                              {getReadTime(post.content)}
                            </span>
                          </div>
                        </div>

                        <div className="p-6">
                          <div className="flex items-center space-x-2 mb-3 text-xs text-gray-500">
                            <Calendar size={14} />
                            <span>{formatDate(post.created_at)}</span>
                          </div>

                          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors leading-tight">
                            {post.title}
                          </h3>

                          <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
                            {post.excerpt}
                          </p>

                          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                                {author[0].toUpperCase()}
                              </div>
                              <span className="text-sm font-medium text-gray-700">
                                {author}
                              </span>
                            </div>

                            <ChevronRight
                              className="text-indigo-600 group-hover:translate-x-1 transition-transform"
                              size={20}
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

      {/* Enhanced Modal for Full Post */}
      {selectedPost && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-80 md:h-[28rem] overflow-hidden">
              <img
                src={
                  selectedPost.featured_image ||
                  "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800"
                }
                alt={selectedPost.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-xl hover:bg-white transition-all hover:scale-110"
              >
                <X size={24} className="text-gray-800" />
              </button>

              <div className="absolute bottom-8 left-8 right-8">
                <div className="flex items-center space-x-3 mb-4 text-white/90 text-sm">
                  <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <Calendar size={14} />
                    <span>{formatDate(selectedPost.created_at)}</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <Clock size={14} />
                    <span>{getReadTime(selectedPost.content)}</span>
                  </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight drop-shadow-lg">
                  {selectedPost.title}
                </h1>
              </div>
            </div>

            <div className="p-8 md:p-12">
              <div className="flex items-center space-x-4 pb-8 mb-8 border-b border-gray-200">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                  {(selectedPost.author || "A")[0].toUpperCase()}
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">
                    {selectedPost.author || "Anonymous"}
                  </p>
                  <p className="text-gray-500">Article Author</p>
                </div>
              </div>

              <div className="prose prose-lg max-w-none">
                <div className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap">
                  {selectedPost.content}
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-gray-200">
                <button
                  onClick={() => setSelectedPost(null)}
                  className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all hover:scale-105"
                >
                  Close Article
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-3">Stay Updated</h3>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest articles and insights
              delivered straight to your inbox.
            </p>
            <div className="flex justify-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-1 flex items-center max-w-md w-full">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-transparent px-4 py-3 text-white placeholder-gray-400 focus:outline-none"
                />
                <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg font-semibold hover:shadow-lg transition-all">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>
              © 2024 Your Company. Powered by Supabase + React + Tailwind CSS
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}
