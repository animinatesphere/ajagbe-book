import React, { useState, useEffect } from "react";
import {
  Search,
  Calendar,
  User,
  Tag,
  ChevronRight,
  Loader2,
} from "lucide-react";

export default function WordPressBlog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);

  // Replace with your WordPress.com site URL (without the https://)
  // Example: 'yoursite.wordpress.com' or 'yourdomain.com' if you have a custom domain
  const YOUR_SITE = "techcrunch.com"; // Change this to your site!
  const WP_API_URL = `https://public-api.wordpress.com/wp/v2/sites/${YOUR_SITE}`;

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${WP_API_URL}/posts?per_page=12&_embed`);
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      // Fallback demo data
      setPosts([
        {
          id: 1,
          title: { rendered: "Getting Started with React and WordPress" },
          excerpt: {
            rendered:
              "Learn how to build modern web applications combining React with WordPress REST API...",
          },
          date: "2024-12-01",
          _embedded: {
            author: [{ name: "John Doe" }],
            "wp:featuredmedia": [
              {
                source_url:
                  "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
              },
            ],
          },
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = posts.filter((post) =>
    post.title.rendered.toLowerCase().includes(search.toLowerCase())
  );

  const stripHtml = (html) => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Header */}
      <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in">
            Our Blog
          </h1>
          <p className="text-xl text-indigo-100 max-w-2xl">
            Discover insights, tutorials, and stories from our team
          </p>
        </div>
      </header>

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white rounded-2xl shadow-xl p-4">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:outline-none transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin text-indigo-600" size={48} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => {
              const featuredImage =
                post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800";
              const author = post._embedded?.author?.[0]?.name || "Anonymous";

              return (
                <article
                  key={post.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group"
                  onClick={() => setSelectedPost(post)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={featuredImage}
                      alt={stripHtml(post.title.rendered)}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                      {stripHtml(post.title.rendered)}
                    </h2>

                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {stripHtml(post.excerpt.rendered)}
                    </p>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <User size={16} />
                          <span>{author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar size={16} />
                          <span>{formatDate(post.date)}</span>
                        </div>
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
        )}

        {!loading && filteredPosts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-500">No posts found</p>
          </div>
        )}
      </main>

      {/* Modal for Full Post */}
      {selectedPost && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-64 md:h-96">
              <img
                src={
                  selectedPost._embedded?.["wp:featuredmedia"]?.[0]
                    ?.source_url ||
                  "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800"
                }
                alt={stripHtml(selectedPost.title.rendered)}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {stripHtml(selectedPost.title.rendered)}
              </h1>

              <div className="flex items-center space-x-6 text-gray-600 mb-8 pb-8 border-b">
                <div className="flex items-center space-x-2">
                  <User size={18} />
                  <span>
                    {selectedPost._embedded?.author?.[0]?.name || "Anonymous"}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar size={18} />
                  <span>{formatDate(selectedPost.date)}</span>
                </div>
              </div>

              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{
                  __html:
                    selectedPost.content?.rendered ||
                    selectedPost.excerpt.rendered,
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <p className="text-gray-400">
            Powered by WordPress REST API + React + Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
}
