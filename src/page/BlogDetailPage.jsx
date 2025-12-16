// BlogDetailPage.jsx - Detail page component with Enhanced Share Functionality
import React, { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabaseClient";
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

export default function BlogDetailPage({ postId, onBack }) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  // ⭐ Use useCallback to memoize the functions
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

  // ⭐ Enhanced Share functionality - uses static HTML pages for social crawlers
  const baseUrl = window.location.origin;

  // Use static share page for social media (these are pre-generated HTML files)
  const shareUrl = `${baseUrl}/share/${postId}.html`;

  const shareTitle = post?.title || "Check out this article";
  const shareText = post?.excerpt || "Read this amazing article";
  const shareImage =
    post?.featured_image ||
    "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200";

  // Update document meta tags dynamically for social sharing
  useEffect(() => {
    if (post) {
      // Update page title
      document.title = `${post.title} - More Than Just Writing`;

      // Update or create meta tags for social sharing
      const updateMetaTag = (property, content, isProperty = true) => {
        const attribute = isProperty ? "property" : "name";
        let meta = document.querySelector(`meta[${attribute}="${property}"]`);
        if (!meta) {
          meta = document.createElement("meta");
          meta.setAttribute(attribute, property);
          document.head.appendChild(meta);
        }
        meta.setAttribute("content", content);
      };

      // Open Graph tags
      updateMetaTag("og:title", post.title);
      updateMetaTag(
        "og:description",
        post.excerpt || "Read this amazing article"
      );
      updateMetaTag("og:image", shareImage);
      updateMetaTag("og:url", shareUrl);
      updateMetaTag("og:type", "article");

      // Twitter tags
      updateMetaTag("twitter:title", post.title, false);
      updateMetaTag(
        "twitter:description",
        post.excerpt || "Read this amazing article",
        false
      );
      updateMetaTag("twitter:image", shareImage, false);
      updateMetaTag("twitter:card", "summary_large_image", false);

      // Standard meta tags
      updateMetaTag(
        "description",
        post.excerpt || "Read this amazing article",
        false
      );
    }

    // Cleanup function to restore default title
    return () => {
      document.title = "More Than Just Writing";
    };
  }, [post, shareUrl, shareImage]);

  const handleShare = async () => {
    // Prevent multiple simultaneous share attempts
    if (isSharing) return;

    // Try native Web Share API first (mobile devices)
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
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&via=YourTwitterHandle`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      email: `mailto:?subject=${encodedTitle}&body=${encodedText}%0A%0A${encodedUrl}`,
    };

    window.open(urls[platform], "_blank", "width=600,height=400");

    // After sharing, suggest to refresh the link on social media
    setTimeout(() => {
      console.log(
        "Tip: If image doesnt show, use Facebook Debugger or Twitter Card Validator to refresh the cache"
      );
    }, 1000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center">
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Navigation Bar */}
      <nav className="z-10 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 font-semibold transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Blog</span>
            </button>

            <div className="flex items-center space-x-3">
              <button
                onClick={handleShare}
                disabled={isSharing}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg transition-all transform hover:scale-105 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                title="Share this article"
              >
                <Share2 className="w-5 h-5" />
                <span className="font-semibold hidden sm:inline">Share</span>
              </button>
              <button
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Bookmark"
              >
                <Bookmark className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Image Section */}
      <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <img
          src={shareImage}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

        {/* Floating Content Card */}
        <div className="absolute bottom-0 left-0 right-0 pb-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-10 border border-white/20">
              <div className="flex items-center space-x-3 mb-4 flex-wrap">
                <span className="inline-flex items-center px-3 py-1 bg-indigo-100 text-indigo-700 font-semibold text-sm rounded-full">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Featured
                </span>
                <div className="flex items-center space-x-2 text-gray-600 text-sm">
                  <Calendar size={14} />
                  <span>{formatDate(post.created_at)}</span>
                </div>
                <span className="text-gray-400">•</span>
                <div className="flex items-center space-x-2 text-gray-600 text-sm">
                  <Clock size={14} />
                  <span>{getReadTime(post.content)}</span>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                {post.title}
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {(post.author || "A")[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">
                      {post.author || "Anonymous"}
                    </p>
                    <p className="text-gray-500 text-sm">Article Author</p>
                  </div>
                </div>

                <div className="hidden md:flex items-center space-x-4">
                  <button className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <ThumbsUp className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700 font-semibold">124</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <MessageCircle className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700 font-semibold">28</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
          <div className="prose prose-lg max-w-none">
            <div className="text-gray-800 leading-relaxed text-lg space-y-6 whitespace-pre-wrap">
              {post.content}
            </div>
          </div>

          {/* Article Footer */}
          <div className="mt-12 pt-8 border-t-2 border-gray-200">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <span className="text-gray-600 font-semibold">
                  Was this helpful?
                </span>
                <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-lg transition-colors font-semibold">
                  <ThumbsUp className="w-4 h-4" />
                  <span>Yes</span>
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-gray-600 text-sm font-medium">
                  Share this article:
                </span>
                <button
                  onClick={handleShare}
                  disabled={isSharing}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg transition-all transform hover:scale-105 shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <Share2 className="w-4 h-4" />
                  <span className="font-semibold">Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center space-x-3 mb-8">
            <div className="h-1 w-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"></div>
            <h2 className="text-3xl font-bold text-gray-900">
              Related Articles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((relatedPost) => (
              <article
                key={relatedPost.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer border border-gray-100"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={
                      relatedPost.featured_image ||
                      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800"
                    }
                    alt={relatedPost.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>

                <div className="p-6">
                  <div className="flex items-center space-x-2 text-xs text-gray-500 mb-3">
                    <Calendar size={14} />
                    <span>{formatDate(relatedPost.created_at)}</span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                    {relatedPost.title}
                  </h3>

                  <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                    {relatedPost.excerpt}
                  </p>

                  <div className="flex items-center space-x-2 pt-4 border-t border-gray-100">
                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                      {(relatedPost.author || "A")[0].toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {relatedPost.author || "Anonymous"}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-center shadow-2xl">
          <h2 className="text-4xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and never miss our latest insights and
            articles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder-white/70 focus:outline-none focus:border-white transition-all"
            />
            <button className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-xl hover:shadow-xl transition-all hover:scale-105">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Enhanced Share Modal */}
      {showShareModal && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowShareModal(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl transform transition-all animate-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Share this article
                </h3>
                <p className="text-sm text-gray-500 mt-1">Spread the word!</p>
              </div>
              <button
                onClick={() => setShowShareModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Article Preview */}
            <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="flex items-start space-x-3">
                <img
                  src={shareImage}
                  alt={post.title}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-gray-900 text-sm line-clamp-2 mb-1">
                    {post.title}
                  </h4>
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
              </div>
            </div>

            {/* Social Share Buttons */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                onClick={() => shareToSocial("facebook")}
                className="flex items-center justify-center space-x-3 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all transform hover:scale-105 font-semibold shadow-md"
              >
                <Facebook className="w-5 h-5" fill="currentColor" />
                <span>Facebook</span>
              </button>
              <button
                onClick={() => shareToSocial("twitter")}
                className="flex items-center justify-center space-x-3 px-4 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-xl transition-all transform hover:scale-105 font-semibold shadow-md"
              >
                <Twitter className="w-5 h-5" fill="currentColor" />
                <span>Twitter</span>
              </button>
              <button
                onClick={() => shareToSocial("linkedin")}
                className="flex items-center justify-center space-x-3 px-4 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-xl transition-all transform hover:scale-105 font-semibold shadow-md"
              >
                <Linkedin className="w-5 h-5" fill="currentColor" />
                <span>LinkedIn</span>
              </button>
              <button
                onClick={() => shareToSocial("email")}
                className="flex items-center justify-center space-x-3 px-4 py-3 bg-gray-700 hover:bg-gray-800 text-white rounded-xl transition-all transform hover:scale-105 font-semibold shadow-md"
              >
                <Mail className="w-5 h-5" />
                <span>Email</span>
              </button>
            </div>

            {/* Copy Link */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 border-2 border-indigo-200">
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Or copy link
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  onClick={copyToClipboard}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all transform hover:scale-105 ${
                    copied
                      ? "bg-green-500 text-white"
                      : "bg-indigo-600 hover:bg-indigo-700 text-white"
                  }`}
                >
                  {copied ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>
              </div>
              {copied && (
                <p className="text-sm text-green-600 mt-2 font-semibold flex items-center">
                  <Check className="w-4 h-4 mr-1" />
                  Link copied to clipboard!
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
