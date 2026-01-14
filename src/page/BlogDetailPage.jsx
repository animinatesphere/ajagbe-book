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
  Download,
  ExternalLink,
  Image as ImageIcon,
  Play,
} from "lucide-react";

// VideoEmbed Component - FIXED

// import { Play } from "lucide-react";

const VideoEmbed = ({ url }) => {
  // const [previewData, setPreviewData] = useState(null);
  // const [loading, setLoading] = useState(false);

  if (!url) return null;

  // YouTube detection and embed
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    let videoId = "";
    if (url.includes("youtube.com/watch?v=")) {
      videoId = url.split("watch?v=")[1]?.split("&")[0];
    } else if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1]?.split("?")[0];
    } else if (url.includes("youtube.com/embed/")) {
      videoId = url.split("embed/")[1]?.split("?")[0];
    }

    if (videoId) {
      return (
        <div className="my-12 not-prose">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg shadow-md">
              <Play className="w-5 h-5 text-white" fill="white" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
              Featured Video
            </h3>
          </div>
          <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden shadow-2xl border-4 border-white ring-2 ring-gray-200">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoId}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
              title="YouTube video"
            ></iframe>
          </div>
        </div>
      );
    }
  }

  // TikTok Preview with Thumbnail
  if (url.includes("tiktok.com")) {
    const TikTokPreview = () => {
      const cleanUrl = url.split("?")[0];

      return (
        <div className="my-12 not-prose">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-black to-gray-800 rounded-lg shadow-md">
              <Play className="w-5 h-5 text-white" fill="white" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
              TikTok Video
            </h3>
          </div>
          <div className="relative mx-auto max-w-md">
            <a
              href={cleanUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <div className="relative aspect-[9/16] bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden shadow-2xl border-4 border-white ring-2 ring-gray-200">
                {/* TikTok style preview */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Play className="w-10 h-10 text-white" fill="white" />
                  </div>
                  <div className="space-y-3">
                    <p className="text-white font-bold text-xl">
                      Watch on TikTok
                    </p>
                    <p className="text-white/80 text-sm">
                      Click to view this video
                    </p>
                  </div>
                  {/* TikTok logo */}
                  <svg
                    className="w-8 h-8 mt-6 text-white/90"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                </div>
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>
            </a>
            <p className="text-center text-xs text-gray-500 mt-4">
              Click to watch this video on TikTok
            </p>
          </div>
        </div>
      );
    };
  }

  // Facebook detection and embed
  if (url.includes("facebook.com") || url.includes("fb.watch")) {
    const encodedUrl = encodeURIComponent(url);
    return (
      <div className="my-12 not-prose">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg shadow-md">
            <Play className="w-5 h-5 text-white" fill="white" />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
            Facebook Video
          </h3>
        </div>
        <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden shadow-2xl border-4 border-white ring-2 ring-gray-200">
          <iframe
            src={`https://www.facebook.com/plugins/video.php?href=${encodedUrl}&width=500&show_text=false&height=280&appId`}
            width="100%"
            height="100%"
            style={{ border: "none", overflow: "hidden" }}
            scrolling="no"
            frameBorder="0"
            allowFullScreen={true}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            title="Facebook video"
          ></iframe>
        </div>
      </div>
    );
  }

  // Instagram Preview with Card
  if (url.includes("instagram.com")) {
    const InstagramPreview = () => {
      const cleanUrl = url.split("?")[0];

      return (
        <div className="my-12 not-prose">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg shadow-md">
              <Play className="w-5 h-5 text-white" fill="white" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
              Instagram Post
            </h3>
          </div>
          <div className="relative mx-auto max-w-md">
            <a
              href={cleanUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <div className="relative aspect-square bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 rounded-2xl overflow-hidden shadow-2xl border-4 border-white ring-2 ring-gray-200">
                {/* Instagram style preview */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  <div className="w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <svg
                      className="w-16 h-16"
                      fill="url(#instagram-gradient)"
                      viewBox="0 0 24 24"
                    >
                      <defs>
                        <linearGradient
                          id="instagram-gradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop offset="0%" style={{ stopColor: "#833AB4" }} />
                          <stop offset="50%" style={{ stopColor: "#FD1D1D" }} />
                          <stop
                            offset="100%"
                            style={{ stopColor: "#FCAF45" }}
                          />
                        </linearGradient>
                      </defs>
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-900 font-bold text-xl">
                      View on Instagram
                    </p>
                    <p className="text-gray-600 text-sm">
                      Click to see this post
                    </p>
                  </div>
                </div>
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-orange-500/10 group-hover:from-purple-500/20 group-hover:via-pink-500/20 group-hover:to-orange-500/20 transition-all"></div>
              </div>
            </a>
            <p className="text-center text-xs text-gray-500 mt-4">
              Click to view this post on Instagram
            </p>
          </div>
        </div>
      );
    };

    // return <InstagramPreview />;
  }

  // Fallback for unsupported URLs
  return (
    <div className="my-8 p-6 bg-yellow-50 border-2 border-yellow-200 rounded-xl">
      <p className="text-sm text-yellow-800 font-medium">
        Video link provided, but platform not yet supported. Link:{" "}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          {url}
        </a>
      </p>
    </div>
  );
};

export default function BlogDetailPage({ postId, onBack }) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  // Helper function to safely parse additional images
  const parseAdditionalImages = (imagesJson) => {
    try {
      if (!imagesJson) return [];
      const parsed = JSON.parse(imagesJson);
      return Array.isArray(parsed) ? parsed.filter((url) => url) : [];
    } catch (error) {
      console.error("Error parsing additional images:", error);
      return [];
    }
  };

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

  const baseUrl = window.location.origin;
  const shareUrl = `${baseUrl}/blog?post=${post?.slug}`;
  const shareTitle = post?.title || "Check out this article";
  const shareText = post?.excerpt || "Read this amazing article";
  const shareImage =
    post?.featured_image ||
    "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200";

  useEffect(() => {
    if (post) {
      document.title = `${post.title} - More Than Just Writing`;

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

      updateMetaTag("og:title", post.title);
      updateMetaTag(
        "og:description",
        post.excerpt || "Read this amazing article"
      );
      updateMetaTag("og:image", shareImage);
      updateMetaTag("og:url", shareUrl);
      updateMetaTag("og:type", "article");

      updateMetaTag("twitter:title", post.title, false);
      updateMetaTag(
        "twitter:description",
        post.excerpt || "Read this amazing article",
        false
      );
      updateMetaTag("twitter:image", shareImage, false);
      updateMetaTag("twitter:card", "summary_large_image", false);

      updateMetaTag(
        "description",
        post.excerpt || "Read this amazing article",
        false
      );
    }

    return () => {
      document.title = "More Than Just Writing";
    };
  }, [post, shareUrl, shareImage]);

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
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&via=YourTwitterHandle`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      email: `mailto:?subject=${encodedTitle}&body=${encodedText}%0A%0A${encodedUrl}`,
    };

    window.open(urls[platform], "_blank", "width=600,height=400");
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

  const additionalImages = parseAdditionalImages(post.additional_images);

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
      <div className="relative h-[75vh] md:h-[85vh] overflow-hidden">
        <img
          src={shareImage}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80"></div>

        {/* Floating Content Card - Improved positioning */}
        <div className="absolute bottom-0 left-0 right-0 pb-6 md:pb-8 lg:pb-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white/98 backdrop-blur-xl rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-8 lg:p-10 border border-white/30">
              <div className="flex items-center flex-wrap gap-2 md:gap-3 mb-3 md:mb-4">
                <span className="inline-flex items-center px-2.5 py-1 md:px-3 md:py-1 bg-indigo-100 text-indigo-700 font-semibold text-xs md:text-sm rounded-full">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Featured
                </span>
                <div className="flex items-center space-x-1.5 md:space-x-2 text-gray-600 text-xs md:text-sm">
                  <Calendar size={12} className="md:w-3.5 md:h-3.5" />
                  <span>{formatDate(post.created_at)}</span>
                </div>
                <span className="text-gray-400 hidden sm:inline">•</span>
                <div className="flex items-center space-x-1.5 md:space-x-2 text-gray-600 text-xs md:text-sm">
                  <Clock size={12} className="md:w-3.5 md:h-3.5" />
                  <span>{getReadTime(post.content)}</span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 leading-tight mb-3 md:mb-4 lg:mb-6">
                {post.title}
              </h1>

              <p className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed mb-4 md:mb-6 line-clamp-2 md:line-clamp-none">
                {post.excerpt}
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 md:pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-3 md:space-x-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-base md:text-lg lg:text-xl shadow-lg flex-shrink-0">
                    {(post.author || "A")[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm md:text-base lg:text-lg">
                      {post.author || "Anonymous"}
                    </p>
                    <p className="text-gray-500 text-xs md:text-sm">
                      Article Author
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 md:space-x-4">
                  <button className="flex items-center space-x-1.5 md:space-x-2 px-3 py-1.5 md:px-4 md:py-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <ThumbsUp className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
                    <span className="text-gray-700 font-semibold text-sm md:text-base">
                      124
                    </span>
                  </button>
                  <button className="flex items-center space-x-1.5 md:space-x-2 px-3 py-1.5 md:px-4 md:py-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <MessageCircle className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
                    <span className="text-gray-700 font-semibold text-sm md:text-base">
                      28
                    </span>
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
            {/* Main Content with HTML rendering */}
            <div
              className="text-gray-800 leading-relaxed text-lg space-y-6 prose-headings:font-bold prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-p:text-gray-700 prose-strong:text-gray-900 prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline prose-ul:list-disc prose-ol:list-decimal prose-li:marker:text-indigo-600"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* YouTube Video Section */}
            {post.youtube_link && (
              <div className="my-12 not-prose">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg shadow-md">
                    <Play className="w-5 h-5 text-white" fill="white" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Featured Video
                  </h3>
                </div>
                <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden shadow-2xl border-4 border-white ring-2 ring-gray-200">
                  <iframe
                    width="100%"
                    height="100%"
                    src={post.youtube_link.replace("watch?v=", "embed/")}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
              </div>
            )}

            {/* Additional Images Gallery */}
            {additionalImages.length > 0 && (
              <div className="my-12 not-prose">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-md">
                    <ImageIcon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Image Gallery
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {additionalImages.map((imageUrl, index) => (
                    <div
                      key={index}
                      className="relative group overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border-4 border-white ring-2 ring-gray-200"
                    >
                      <img
                        src={imageUrl}
                        alt={`Gallery image ${index + 1}`}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                        <div className="p-4 w-full">
                          <p className="text-white font-semibold text-sm">
                            Image {index + 1}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Attachment Download */}
            {post.attachment_url && (
              <div className="my-12 not-prose">
                <div className="p-8 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl border-2 border-indigo-200 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-4 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl shadow-lg flex-shrink-0">
                        <Download className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">
                          Download Attachment
                        </h4>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          Additional resources and materials for this article
                        </p>
                      </div>
                    </div>
                    <a
                      href={post.attachment_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      <Download className="w-5 h-5" />
                      <span>Download</span>
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* External Link Button */}
            {post.external_link && (
              <div className="my-12 text-center not-prose">
                <div className="inline-block">
                  <a
                    href={post.external_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center space-x-3 px-10 py-5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold text-lg rounded-2xl transition-all transform hover:scale-105 shadow-2xl hover:shadow-3xl overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-white/20 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-700"></span>
                    <span className="relative flex items-center space-x-3">
                      <span>Click Me</span>
                      <ExternalLink className="w-6 h-6 group-hover:rotate-45 transition-transform duration-300" />
                    </span>
                  </a>
                  <p className="text-sm text-gray-500 mt-4 font-medium">
                    Visit external resource
                  </p>
                </div>
              </div>
            )}
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
