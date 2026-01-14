// import React, { useState, useEffect } from "react";
// import { Play } from "lucide-react";

// const VideoEmbed = ({ url }) => {
//   const [previewData, setPreviewData] = useState(null);
//   const [loading, setLoading] = useState(false);

//   if (!url) return null;

//   // YouTube detection and embed
//   if (url.includes("youtube.com") || url.includes("youtu.be")) {
//     let videoId = "";
//     if (url.includes("youtube.com/watch?v=")) {
//       videoId = url.split("watch?v=")[1]?.split("&")[0];
//     } else if (url.includes("youtu.be/")) {
//       videoId = url.split("youtu.be/")[1]?.split("?")[0];
//     } else if (url.includes("youtube.com/embed/")) {
//       videoId = url.split("embed/")[1]?.split("?")[0];
//     }

//     if (videoId) {
//       return (
//         <div className="my-12 not-prose">
//           <div className="flex items-center space-x-3 mb-6">
//             <div className="p-2 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg shadow-md">
//               <Play className="w-5 h-5 text-white" fill="white" />
//             </div>
//             <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
//               Featured Video
//             </h3>
//           </div>
//           <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden shadow-2xl border-4 border-white ring-2 ring-gray-200">
//             <iframe
//               width="100%"
//               height="100%"
//               src={`https://www.youtube.com/embed/${videoId}`}
//               frameBorder="0"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//               className="w-full h-full"
//               title="YouTube video"
//             ></iframe>
//           </div>
//         </div>
//       );
//     }
//   }

//   // TikTok Preview with Thumbnail
//   if (url.includes("tiktok.com")) {
//     const TikTokPreview = () => {
//       const cleanUrl = url.split("?")[0];

//       return (
//         <div className="my-12 not-prose">
//           <div className="flex items-center space-x-3 mb-6">
//             <div className="p-2 bg-gradient-to-br from-black to-gray-800 rounded-lg shadow-md">
//               <Play className="w-5 h-5 text-white" fill="white" />
//             </div>
//             <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
//               TikTok Video
//             </h3>
//           </div>
//           <div className="relative mx-auto max-w-md">
//             <a
//               href={cleanUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="block group"
//             >
//               <div className="relative aspect-[9/16] bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden shadow-2xl border-4 border-white ring-2 ring-gray-200">
//                 {/* TikTok style preview */}
//                 <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
//                   <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
//                     <Play className="w-10 h-10 text-white" fill="white" />
//                   </div>
//                   <div className="space-y-3">
//                     <p className="text-white font-bold text-xl">
//                       Watch on TikTok
//                     </p>
//                     <p className="text-white/80 text-sm">
//                       Click to view this video
//                     </p>
//                   </div>
//                   {/* TikTok logo */}
//                   <svg
//                     className="w-8 h-8 mt-6 text-white/90"
//                     fill="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
//                   </svg>
//                 </div>
//                 {/* Gradient overlay */}
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
//               </div>
//             </a>
//             <p className="text-center text-xs text-gray-500 mt-4">
//               Click to watch this video on TikTok
//             </p>
//           </div>
//         </div>
//       );
//     };

//     return <TikTokPreview />;
//   }

//   // Facebook detection and embed
//   if (url.includes("facebook.com") || url.includes("fb.watch")) {
//     const encodedUrl = encodeURIComponent(url);
//     return (
//       <div className="my-12 not-prose">
//         <div className="flex items-center space-x-3 mb-6">
//           <div className="p-2 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg shadow-md">
//             <Play className="w-5 h-5 text-white" fill="white" />
//           </div>
//           <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
//             Facebook Video
//           </h3>
//         </div>
//         <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden shadow-2xl border-4 border-white ring-2 ring-gray-200">
//           <iframe
//             src={`https://www.facebook.com/plugins/video.php?href=${encodedUrl}&width=500&show_text=false&height=280&appId`}
//             width="100%"
//             height="100%"
//             style={{ border: "none", overflow: "hidden" }}
//             scrolling="no"
//             frameBorder="0"
//             allowFullScreen={true}
//             allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
//             title="Facebook video"
//           ></iframe>
//         </div>
//       </div>
//     );
//   }

//   // Instagram Preview with Card
//   if (url.includes("instagram.com")) {
//     const InstagramPreview = () => {
//       const cleanUrl = url.split("?")[0];

//       return (
//         <div className="my-12 not-prose">
//           <div className="flex items-center space-x-3 mb-6">
//             <div className="p-2 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg shadow-md">
//               <Play className="w-5 h-5 text-white" fill="white" />
//             </div>
//             <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
//               Instagram Post
//             </h3>
//           </div>
//           <div className="relative mx-auto max-w-md">
//             <a
//               href={cleanUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="block group"
//             >
//               <div className="relative aspect-square bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 rounded-2xl overflow-hidden shadow-2xl border-4 border-white ring-2 ring-gray-200">
//                 {/* Instagram style preview */}
//                 <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
//                   <div className="w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
//                     <svg
//                       className="w-16 h-16"
//                       fill="url(#instagram-gradient)"
//                       viewBox="0 0 24 24"
//                     >
//                       <defs>
//                         <linearGradient
//                           id="instagram-gradient"
//                           x1="0%"
//                           y1="0%"
//                           x2="100%"
//                           y2="100%"
//                         >
//                           <stop offset="0%" style={{ stopColor: "#833AB4" }} />
//                           <stop offset="50%" style={{ stopColor: "#FD1D1D" }} />
//                           <stop
//                             offset="100%"
//                             style={{ stopColor: "#FCAF45" }}
//                           />
//                         </linearGradient>
//                       </defs>
//                       <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
//                     </svg>
//                   </div>
//                   <div className="space-y-3">
//                     <p className="text-gray-900 font-bold text-xl">
//                       View on Instagram
//                     </p>
//                     <p className="text-gray-600 text-sm">
//                       Click to see this post
//                     </p>
//                   </div>
//                 </div>
//                 {/* Gradient overlay */}
//                 <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-orange-500/10 group-hover:from-purple-500/20 group-hover:via-pink-500/20 group-hover:to-orange-500/20 transition-all"></div>
//               </div>
//             </a>
//             <p className="text-center text-xs text-gray-500 mt-4">
//               Click to view this post on Instagram
//             </p>
//           </div>
//         </div>
//       );
//     };

//     return <InstagramPreview />;
//   }

//   // Fallback for unsupported URLs
//   return (
//     <div className="my-8 p-6 bg-yellow-50 border-2 border-yellow-200 rounded-xl">
//       <p className="text-sm text-yellow-800 font-medium">
//         Video link provided, but platform not yet supported. Link:{" "}
//         <a
//           href={url}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="underline"
//         >
//           {url}
//         </a>
//       </p>
//     </div>
//   );
// };

// export default VideoEmbed;
