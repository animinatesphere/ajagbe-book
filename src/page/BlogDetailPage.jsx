// BlogDetailPage.jsx - Enhanced Detail page with Open Graph meta tags
import React, { useState, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  Bookmark,
  ThumbsUp,
  MessageCircle,
  Sparkles,
  Copy,
  Check,
  X,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
} from "lucide-react";

// Mock supabase for demo - replace with your actual supabase client
const supabase = {
  from: () => ({
    select: () => ({
      eq: () => ({
        single: async () => ({
          data: {
            id: "1",
            title: "The Future of Web Development in 2025",
            excerpt:
              "Discover the latest trends and technologies shaping the future of web development.",
            content:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
            featured_image:
              "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=630&fit=crop",
            author: "John Doe",
            created_at: new Date().toISOString(),
            status: "published",
          },
          error: null,
        }),
        neq: () => ({
          order: () => ({
            limit: async () => ({
              data: [
                {
                  id: "2",
                  title: "Understanding React Hooks",
                  excerpt:
                    "A comprehensive guide to React Hooks and how to use them effectively.",
                  featured_image:
                    "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
                  author: "Jane Smith",
                  created_at: new Date().toISOString(),
                },
                {
                  id: "3",
                  title: "CSS Grid vs Flexbox",
                  excerpt:
                    "When to use CSS Grid and when to use Flexbox in your layouts.",
                  featured_image:
                    "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800",
                  author: "Mike Johnson",
                  created_at: new Date().toISOString(),
                },
              ],
              error: null,
            }),
          }),
        }),
      }),
    }),
  }),
};

export default function BlogDetailPage({ postId = "1", onBack = () => {} }) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(124);
  const [hasLiked, setHasLiked] = useState(false);

  const fetchPost = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("id", postId)
        .single();

      if (error) throw error;
      setPost(data);
    } catch (error) {
      console.error("Error fetching post:", error);
    } finally {
      setLoading(false);
    }
  }, [postId]);

  const fetchRelatedPosts = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("status", "published")
        .neq("id", postId)
        .order("created_at", { ascending: false })
        .limit(3);

      if (error) throw error;
      setRelatedPosts(data || []);
    } catch (error) {
      console.error("Error fetching related posts:", error);
    }
  }, [postId]);

  useEffect(() => {
    if (postId) {
      fetchPost();
      fetchRelatedPosts();
    }
  }, [postId, fetchPost, fetchRelatedPosts]);

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

  // Generate share URL - use absolute URL
  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://ajagbeayodeji.com";
  const shareUrl = `${baseUrl}/blog/${postId}`;
  const shareTitle = post?.title || "Check out this article";
  const shareText = post?.excerpt || "Read this amazing article";
  const shareImage =
    post?.featured_image ||
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=630&fit=crop";

  const handleShare = async () => {
    if (isSharing) return;

    if (navigator.share) {
      try {
        setIsSharing(true);
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error sharing:", error);
          setShowShareModal(true);
        }
      } finally {
        setTimeout(() => setIsSharing(false), 1000);
      }
    } else {
      setShowShareModal(true);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const shareToSocial = (platform) => {
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(shareTitle);
    const encodedText = encodeURIComponent(shareText);

    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      email: `mailto:?subject=${encodedTitle}&body=${encodedText}%0A%0A${encodedUrl}`,
    };

    window.open(urls[platform], "_blank", "width=600,height=400");
  };

  const handleLike = () => {
    if (hasLiked) {
      setLikes(likes - 1);
      setHasLiked(false);
    } else {
      setLikes(likes + 1);
      setHasLiked(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Article not found
          </h2>
          <button
            onClick={onBack}
            className="text-indigo-600 hover:text-indigo-700 font-semibold"
          >
            ← Back to blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Open Graph Meta Tags for Social Media Preview */}
      <Helmet>
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={shareUrl} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={shareImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={shareUrl} />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={shareImage} />

        {/* Article specific */}
        <meta property="article:author" content={post.author} />
        <meta property="article:published_time" content={post.created_at} />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
        {/* Navigation Bar - Improved responsive design */}
        <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-14 sm:h-16">
              <button
                onClick={onBack}
                className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 font-semibold transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="hidden sm:inline">Back to Blog</span>
                <span className="sm:hidden">Back</span>
              </button>

              <div className="flex items-center space-x-2 sm:space-x-4">
                <button
                  onClick={handleShare}
                  disabled={isSharing}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                  title="Share this article"
                >
                  <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                </button>
                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Bookmark"
                >
                  <Bookmark
                    className={`w-4 h-4 sm:w-5 sm:h-5 ${
                      isBookmarked
                        ? "fill-indigo-600 text-indigo-600"
                        : "text-gray-600"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Image Section - Improved responsive design */}
        <div className="relative h-[50vh] sm:h-[60vh] lg:h-[70vh] overflow-hidden">
          <img
            src={post.featured_image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

          {/* Floating Content Card - Improved responsive */}
          <div className="absolute bottom-0 left-0 right-0 pb-6 sm:pb-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-10 border border-white/20">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <span className="inline-flex items-center px-2 sm:px-3 py-1 bg-indigo-100 text-indigo-700 font-semibold text-xs sm:text-sm rounded-full">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Featured
                  </span>
                  <div className="flex items-center space-x-2 text-gray-600 text-xs sm:text-sm">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">
                      {formatDate(post.created_at)}
                    </span>
                    <span className="sm:hidden">
                      {new Date(post.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <span className="text-gray-400 hidden sm:inline">•</span>
                  <div className="flex items-center space-x-2 text-gray-600 text-xs sm:text-sm">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>{getReadTime(post.content)}</span>
                  </div>
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-3 sm:mb-6">
                  {post.title}
                </h1>

                <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed mb-4 sm:mb-6">
                  {post.excerpt}
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 sm:pt-6 border-t border-gray-200">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-xl shadow-lg">
                      {(post.author || "A")[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm sm:text-lg">
                        {post.author || "Anonymous"}
                      </p>
                      <p className="text-gray-500 text-xs sm:text-sm">
                        Article Author
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 sm:space-x-4">
                    <button
                      onClick={handleLike}
                      className="flex items-center space-x-2 px-3 sm:px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <ThumbsUp
                        className={`w-4 h-4 sm:w-5 sm:h-5 ${
                          hasLiked
                            ? "fill-indigo-600 text-indigo-600"
                            : "text-gray-600"
                        }`}
                      />
                      <span className="text-gray-700 font-semibold text-sm sm:text-base">
                        {likes}
                      </span>
                    </button>
                    <button className="flex items-center space-x-2 px-3 sm:px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                      <span className="text-gray-700 font-semibold text-sm sm:text-base">
                        28
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Article Content - Improved responsive */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 md:p-12 border border-gray-100">
            <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
              <div className="text-gray-800 leading-relaxed space-y-4 sm:space-y-6 whitespace-pre-wrap">
                {post.content}
              </div>
            </div>

            {/* Article Footer - Improved responsive */}
            <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t-2 border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <span className="text-gray-600 font-semibold text-sm sm:text-base">
                    Was this helpful?
                  </span>
                  <button className="flex items-center justify-center sm:justify-start space-x-2 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-lg transition-colors font-semibold text-sm sm:text-base">
                    <ThumbsUp className="w-4 h-4" />
                    <span>Yes</span>
                  </button>
                </div>

                <div className="flex items-center justify-between sm:justify-end space-x-2">
                  <span className="text-gray-600 text-xs sm:text-sm">
                    Share this article:
                  </span>
                  <button
                    onClick={handleShare}
                    disabled={isSharing}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Related Articles - Improved responsive */}
        {relatedPosts.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
            <div className="flex items-center space-x-3 mb-6 sm:mb-8">
              <div className="h-1 w-8 sm:w-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"></div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Related Articles
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {relatedPosts.map((relatedPost) => (
                <article
                  key={relatedPost.id}
                  className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer border border-gray-100"
                >
                  <div className="relative h-40 sm:h-48 overflow-hidden">
                    <img
                      src={relatedPost.featured_image}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>

                  <div className="p-4 sm:p-6">
                    <div className="flex items-center space-x-2 text-xs text-gray-500 mb-2 sm:mb-3">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{formatDate(relatedPost.created_at)}</span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                      {relatedPost.title}
                    </h3>

                    <p className="text-gray-600 text-sm line-clamp-2 mb-3 sm:mb-4">
                      {relatedPost.excerpt}
                    </p>

                    <div className="flex items-center space-x-2 pt-3 sm:pt-4 border-t border-gray-100">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                        {(relatedPost.author || "A")[0].toUpperCase()}
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-gray-700">
                        {relatedPost.author || "Anonymous"}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* CTA Section - Improved responsive */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 text-center shadow-2xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
              Stay Updated
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-indigo-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter and never miss our latest insights and
              articles.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder-white/70 focus:outline-none focus:border-white transition-all text-sm sm:text-base"
              />
              <button className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-indigo-600 font-bold rounded-lg sm:rounded-xl hover:shadow-xl transition-all hover:scale-105 text-sm sm:text-base">
                Subscribe
              </button>
            </div>
          </div>
        </section>

        {/* Share Modal - Improved responsive */}
        {showShareModal && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowShareModal(false)}
          >
            <div
              className="bg-white rounded-2xl sm:rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl transform transition-all"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Share this article
                </h3>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Social Share Buttons */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <button
                  onClick={() => shareToSocial("facebook")}
                  className="flex items-center justify-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg sm:rounded-xl transition-colors font-semibold text-sm sm:text-base"
                >
                  <Facebook
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="currentColor"
                  />
                  <span>Facebook</span>
                </button>
                <button
                  onClick={() => shareToSocial("twitter")}
                  className="flex items-center justify-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2.5 sm:py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-lg sm:rounded-xl transition-colors font-semibold text-sm sm:text-base"
                >
                  <Twitter
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="currentColor"
                  />
                  <span>Twitter</span>
                </button>
                <button
                  onClick={() => shareToSocial("linkedin")}
                  className="flex items-center justify-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2.5 sm:py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-lg sm:rounded-xl transition-colors font-semibold text-sm sm:text-base"
                >
                  <Linkedin
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="currentColor"
                  />
                  <span>LinkedIn</span>
                </button>
                <button
                  onClick={() => shareToSocial("email")}
                  className="flex items-center justify-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-700 hover:bg-gray-800 text-white rounded-lg sm:rounded-xl transition-colors font-semibold text-sm sm:text-base"
                >
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Email</span>
                </button>
              </div>

              {/* Copy Link */}
              <div className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border-2 border-gray-200">
                <label className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 block">
                  Or copy link
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={shareUrl}
                    readOnly
                    className="flex-1 px-3 sm:px-4 py-2 bg-white border border-gray-300 rounded-lg text-xs sm:text-sm text-gray-600 focus:outline-none"
                  />
                  <button
                    onClick={copyToClipboard}
                    className={`px-3 sm:px-4 py-2 rounded-lg font-semibold transition-all ${
                      copied
                        ? "bg-green-500 text-white"
                        : "bg-indigo-600 hover:bg-indigo-700 text-white"
                    }`}
                  >
                    {copied ? (
                      <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      <Copy className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </button>
                </div>
                {copied && (
                  <p className="text-xs sm:text-sm text-green-600 mt-2 font-semibold">
                    ✓ Link copied to clipboard!
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
