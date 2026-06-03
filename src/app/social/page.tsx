"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, MapPin, Link2, Calendar, Search, Bell, Video } from "lucide-react";

const instagramPosts = [
  {
    id: 1,
    image: "/images/swarthmore-college-Eric-Behrens-flickr-5706ffe35f9b581408d48cb3.jpg",
    likes: "1,204",
    caption: "Beautiful morning at the GVH College main campus! ☀️ Ready for another week of learning and innovation. #GVHCollege #CampusLife",
    time: "2 hours ago"
  },
  {
    id: 2,
    image: "/images/f4b83665-42eb-4514-93eb-afe1ce1f84e2.png",
    likes: "856",
    caption: "The Republic Day Cup 2026 preparations are in full swing! 🏆 Who are you cheering for this year? #Sports #GVHAthletics",
    time: "5 hours ago"
  },
  {
    id: 3,
    image: "/images/b465b6c6-83ea-4042-99ad-f907e1e65696.png",
    likes: "2,109",
    caption: "Massive congratulations to our Cricket Team for bringing home the State Championship trophy! 🥇🏏 #Champions #ProudMoment",
    time: "1 day ago"
  },
  {
    id: 4,
    image: "/images/52931d59-6890-4dd1-afc3-6cd109fe6d3b.png",
    likes: "943",
    caption: "Exploring the new state-of-the-art Digital Library. Over 100,000 resources now available at your fingertips! 📚💻 #Education #DigitalLearning",
    time: "2 days ago"
  },
  {
    id: 5,
    image: "/images/chatgpt-image.png",
    likes: "432",
    caption: "Our new AI assistant is helping students debug their code! 🤖 #Innovation #Tech",
    time: "3 days ago"
  },
  {
    id: 6,
    image: "/images/52931d59-6890-4dd1-afc3-6cd109fe6d3b.png",
    likes: "678",
    caption: "Another amazing view of the campus library. Studying here feels different. 📚 #Library",
    time: "4 days ago"
  },
  {
    id: 7,
    image: "/images/swarthmore-college-Eric-Behrens-flickr-5706ffe35f9b581408d48cb3.jpg",
    likes: "1,492",
    caption: "Throwback to orientation week! Can't wait to welcome the next batch of freshmen. 🎓🎉 #Freshman #TBT",
    time: "1 week ago"
  }
];

function SocialHubContent() {
  const [activeNetwork, setActiveNetwork] = useState("home");
    const [instaView, setInstaView] = useState<"profile" | "feed">("profile");
  const [likedInstaPosts, setLikedInstaPosts] = useState<Record<number, boolean>>({});
  const [heartAnimations, setHeartAnimations] = useState<Record<number, boolean>>({});
  const [likedTwitter, setLikedTwitter] = useState<Record<number, boolean>>({});
    const [likedFacebook, setLikedFacebook] = useState<Record<number, boolean>>({});
  const [likedLinkedin, setLikedLinkedin] = useState<Record<number, boolean>>({});
  const [likedYoutube, setLikedYoutube] = useState<Record<number, boolean>>({});
  const [youtubeHeartAnimations, setYoutubeHeartAnimations] = useState<Record<number, boolean>>({});
  const [isSubscribed, setIsSubscribed] = useState(false);
  const searchParams = useSearchParams();

  const handleDoubleTapYoutube = (videoId: number) => {
    setLikedYoutube(prev => ({ ...prev, [videoId]: true }));
    setYoutubeHeartAnimations(prev => ({ ...prev, [videoId]: true }));
    setTimeout(() => {
      setYoutubeHeartAnimations(prev => ({ ...prev, [videoId]: false }));
    }, 1000);
  };

  const handleDoubleTapLike = (postId: number) => {
    setLikedInstaPosts(prev => ({ ...prev, [postId]: true }));
    setHeartAnimations(prev => ({ ...prev, [postId]: true }));
    setTimeout(() => {
      setHeartAnimations(prev => ({ ...prev, [postId]: false }));
    }, 1000);
  };
  
  const toggleLike = (postId: number) => {
    setLikedInstaPosts(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  
  // Update if URL changes
  useEffect(() => {
    const network = searchParams.get("network");
    if (network) {
      setActiveNetwork(network);
    }
  }, [searchParams]);

    const renderPhoneScreen = (isBackground: boolean) => (
    <div className={`rounded-[2rem] overflow-hidden w-full h-full bg-white relative flex flex-col ${isBackground ? "pointer-events-none" : ""}`}>
                  
                  {/* === iOS HOME SCREEN MOCKUP === */}
                  <motion.div 
                    className="w-full h-full absolute inset-0 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#FF9A9E] via-[#FECFEF] to-[#A18CD1] z-0"
                    animate={{ scale: activeNetwork === "home" ? 1 : 0.95, filter: activeNetwork === "home" ? "blur(0px)" : "blur(4px)" }}
                    transition={{ duration: 0.15, ease: [0.32, 0.72, 0, 1] }}
                  >
                      {/* Status Bar */}
                      <div className="absolute top-0 w-full h-10 z-10 flex justify-between items-center px-6 text-white text-xs font-medium">
                        <span>9:41</span>
                        <div className="flex gap-1.5 items-center">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M2 22h20V2z"/></svg>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/></svg>
                        </div>
                      </div>
    
                      {/* Open Folder UI */}
                      <div className="flex flex-col items-center justify-center z-20 -mt-10">
                        <h2 className="text-white text-3xl font-light mb-8 drop-shadow-md">Social Media</h2>
                        
                        <div className="w-[260px] bg-white/30 backdrop-blur-xl rounded-[2.5rem] p-6 grid grid-cols-3 gap-x-4 gap-y-6 shadow-xl border border-white/20">
                          {/* Apps inside folder */}
                          <div className="flex flex-col items-center gap-1 cursor-pointer group" onClick={() => setActiveNetwork("instagram")}>
                            <div className="w-[60px] h-[60px]">
                              {activeNetwork !== "instagram" && (
                                <motion.div className="w-full h-full rounded-[1.4rem] bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-90">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                                </motion.div>
                              )}
                            </div>
                            <span className="text-white text-[11px] font-medium tracking-tight">Instagram</span>
                          </div>
                          
                          <div className="flex flex-col items-center gap-1 cursor-pointer group" onClick={() => setActiveNetwork("twitter")}>
                            <div className="w-[60px] h-[60px]">
                              {activeNetwork !== "twitter" && (
                                <motion.div className="w-full h-full rounded-[1.4rem] bg-black flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-90">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                                </motion.div>
                              )}
                            </div>
                            <span className="text-white text-[11px] font-medium tracking-tight">Twitter</span>
                          </div>
    
                          <div className="flex flex-col items-center gap-1 cursor-pointer group" onClick={() => setActiveNetwork("facebook")}>
                            <div className="w-[60px] h-[60px]">
                              {activeNetwork !== "facebook" && (
                                <motion.div className="w-full h-full rounded-[1.4rem] bg-[#1877F2] flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-90">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                                </motion.div>
                              )}
                            </div>
                            <span className="text-white text-[11px] font-medium tracking-tight">Facebook</span>
                          </div>
    
                          <div className="flex flex-col items-center gap-1 cursor-pointer group" onClick={() => setActiveNetwork("linkedin")}>
                            <div className="w-[60px] h-[60px]">
                              {activeNetwork !== "linkedin" && (
                                <motion.div className="w-full h-full rounded-[1.4rem] bg-[#0a66c2] flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-90">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                                </motion.div>
                              )}
                            </div>
                            <span className="text-white text-[11px] font-medium tracking-tight">LinkedIn</span>
                          </div>
    
                          <div className="flex flex-col items-center gap-1 cursor-pointer group" onClick={() => setActiveNetwork("youtube")}>
                            <div className="w-[60px] h-[60px]">
                              {activeNetwork !== "youtube" && (
                                <motion.div className="w-full h-full rounded-[1.4rem] bg-white flex items-center justify-center shadow-sm transition-transform group-hover:scale-90">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#FF0000] fill-[#FF0000]"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z" fill="white" stroke="white"/></svg>
                                </motion.div>
                              )}
                            </div>
                            <span className="text-white text-[11px] font-medium tracking-tight">YouTube</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
    
                  <AnimatePresence>
                  {/* === INSTAGRAM MOCK PROFILE === */}
                  {activeNetwork === "instagram" && (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.15, ease: "easeInOut" }} className="absolute inset-0 z-20 bg-[#000000] h-full text-white flex flex-col w-full rounded-[2rem] overflow-hidden">
                      {/* Insta Header (Fixed to Top) */}
                      <div className="bg-[#000000] z-10 px-4 pt-10 pb-3 flex items-center justify-between border-b border-gray-900 flex-shrink-0">
                        <div className="flex items-center gap-4 cursor-pointer" onClick={() => {
                            if (instaView === "feed") {
                               setInstaView("profile");
                            } else {
                               setActiveNetwork("home");
                            }
                        }}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                          <span className="font-bold text-lg">{instaView === "feed" ? "Posts" : "gvh_college_official"}</span>
                        </div>
                        {instaView === "profile" ? <MoreHorizontal className="w-6 h-6" /> : <div className="w-6" />}
                      </div>
                      
                      {/* Scrollable Content */}
                      <div id="insta-scroll-container" className="flex-1 overflow-y-auto scrollbar-hide pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        {instaView === "profile" ? (
                          <>
                            {/* Profile Info */}
                            <div className="px-4 py-3">
                              <div className="flex items-center justify-between mb-4">
                                {/* Avatar */}
                                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[2px] flex-shrink-0">
                                  <div className="w-full h-full bg-black rounded-full flex items-center justify-center font-bold text-lg border-2 border-black overflow-hidden">
                                    <Image src="/images/swarthmore-college-Eric-Behrens-flickr-5706ffe35f9b581408d48cb3.jpg" alt="Profile" width={80} height={80} className="object-cover h-full w-full opacity-80" />
                                  </div>
                                </div>
                                
                                {/* Stats */}
                                <div className="flex gap-4 text-center flex-1 justify-end ml-2">
                                  <div>
                                    <p className="font-bold text-lg leading-tight">{instagramPosts.length}</p>
                                    <p className="text-xs text-gray-300">posts</p>
                                  </div>
                                  <div>
                                    <p className="font-bold text-lg leading-tight">3.2K</p>
                                    <p className="text-xs text-gray-300">followers</p>
                                  </div>
                                  <div>
                                    <p className="font-bold text-lg leading-tight">108</p>
                                    <p className="text-xs text-gray-300">following</p>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Bio */}
                              <div className="mb-4">
                                <h2 className="font-bold text-sm">GVH College Official ?????</h2>
                                <p className="text-sm mt-1 text-gray-100 leading-snug">
                                  Empowering students through innovation, critical thinking, and academic excellence. ??<br/>
                                  Building the leaders of tomorrow. ??
                                </p>
                                <a href="#" className="text-sm text-blue-300 font-semibold mt-1 block">www.gvhcollege.edu</a>
                              </div>
                              
                              {/* Buttons */}
                              <div className="flex gap-2 mb-2">
                                <button className="flex-1 bg-[#0095f6] hover:bg-[#1877f2] text-white font-bold py-1.5 rounded-lg text-sm transition-colors">
                                  Follow
                                </button>
                                <button className="bg-[#262626] hover:bg-[#363636] px-4 rounded-lg transition-colors flex items-center justify-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
                                </button>
                              </div>
                            </div>
                            
                            {/* Tabs */}
                            <div className="flex border-t border-gray-900 mt-2">
                              <div className="flex-1 flex justify-center py-3 border-t border-white -mt-[1px]">
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M3 9h18"/><path d="M3 15h18"/><path d="M9 3v18"/><path d="M15 3v18"/></svg>
                              </div>
                              <div className="flex-1 flex justify-center py-3 text-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m10 8 6 4-6 4Z"/><rect width="20" height="20" x="2" y="2" rx="2.18" ry="2.18"/><line x1="7" x2="7" y1="2" y2="22"/><line x1="17" x2="17" y1="2" y2="22"/><line x1="2" x2="7" y1="12" y2="12"/><line x1="2" x2="7" y1="7" y2="7"/><line x1="2" x2="7" y1="17" y2="17"/><line x1="17" x2="22" y1="12" y2="12"/><line x1="17" x2="22" y1="7" y2="7"/><line x1="17" x2="22" y1="17" y2="17"/></svg>
                              </div>
                              <div className="flex-1 flex justify-center py-3 text-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                              </div>
                            </div>
                            
                            {/* Grid */}
                            <div className="grid grid-cols-3 gap-0.5">
                              {instagramPosts.map((post) => (
                                <div 
                                  key={post.id} 
                                  className="relative aspect-square bg-gray-900 group cursor-pointer"
                                  onClick={() => {
                                    setInstaView("feed");
                                    setTimeout(() => {
                                      const container = document.getElementById("insta-scroll-container"); const postEl = document.getElementById(`insta-post-${post.id}`); if (container && postEl) { container.scrollTop = postEl.offsetTop; }
                                    }, 10);
                                  }}
                                >
                                  <Image src={post.image} alt="Grid post" fill className="object-cover" />
                                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <Heart className="w-5 h-5 text-white fill-white" />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </>
                        ) : (
                          <div className="flex flex-col">
                             {instagramPosts.map((post) => (
                               <div key={post.id} id={`insta-post-${post.id}`} className="mb-6">
                                 {/* Post Header */}
                                 <div className="flex items-center justify-between px-3 py-2">
                                    <div className="flex items-center gap-2">
                                      <div className="w-8 h-8 rounded-full bg-gray-800 overflow-hidden relative border border-gray-800">
                                        <Image src="/images/swarthmore-college-Eric-Behrens-flickr-5706ffe35f9b581408d48cb3.jpg" alt="Profile" fill className="object-cover" />
                                      </div>
                                      <span className="font-bold text-sm">gvh_college_official</span>
                                    </div>
                                    <MoreHorizontal className="w-5 h-5 text-gray-500" />
                                 </div>
                                 {/* Image */}
                                 <div className="relative w-full aspect-square bg-gray-900 select-none" onDoubleClick={() => handleDoubleTapLike(post.id)}>
                                    <Image src={post.image} alt="Post image" fill className="object-cover" />
                                    <AnimatePresence>
                                      {heartAnimations[post.id] && (
                                        <motion.div
                                          initial={{ scale: 0, opacity: 0 }}
                                          animate={{ scale: 1.2, opacity: 1 }}
                                          exit={{ scale: 0, opacity: 0 }}
                                          transition={{ type: "spring", bounce: 0.5, duration: 0.6 }}
                                          className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
                                        >
                                          <Heart className="w-28 h-28 text-white fill-white drop-shadow-2xl opacity-90" />
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                 </div>
                                 {/* Actions */}
                                 <div className="flex items-center justify-between px-3 py-3">
                                    <div className="flex items-center gap-4">
                                      <motion.button 
                                        whileTap={{ scale: 0.8 }} 
                                        onClick={() => toggleLike(post.id)}
                                        className="cursor-pointer focus:outline-none"
                                      >
                                        <Heart className={`w-7 h-7 transition-colors ${likedInstaPosts[post.id] ? "text-red-500 fill-red-500" : "text-white"}`} />
                                      </motion.button>
                                      <MessageCircle className="w-7 h-7" />
                                      <Send className="w-7 h-7" />
                                    </div>
                                    <Bookmark className="w-7 h-7" />
                                 </div>
                                 {/* Details */}
                                 <div className="px-3">
                                    <p className="font-bold text-sm mb-1">{post.likes} likes</p>
                                    <p className="text-sm"><span className="font-bold mr-2">gvh_college_official</span>{post.caption}</p>
                                    <p className="text-[10px] text-gray-500 mt-1 uppercase">{post.time}</p>
                                 </div>
                               </div>
                             ))}
                          </div>
                        )}
                      </div>
                      
                      {/* Bottom Navigation Bar (Fixed to Bottom) */}
                      <div className="bg-[#000000] border-t border-gray-900 flex justify-around items-center pt-3 pb-6 flex-shrink-0 z-20">
                        <svg onClick={() => {setInstaView("feed"); setTimeout(() => { const container = document.getElementById("insta-scroll-container"); const postEl = document.getElementById("insta-post-1"); if (container && postEl) container.scrollTop = postEl.offsetTop; }, 10);}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cursor-pointer text-gray-400 hover:text-white"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="8" x2="16" y1="12" y2="12"/><line x1="12" x2="12" y1="8" y2="16"/></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                        <div onClick={() => setInstaView("profile")} className={`w-6 h-6 rounded-full bg-white flex items-center justify-center text-black overflow-hidden border cursor-pointer ${instaView === "profile" ? "border-white" : "border-gray-600"}`}>
                          <Image src="/images/swarthmore-college-Eric-Behrens-flickr-5706ffe35f9b581408d48cb3.jpg" alt="Profile" width={24} height={24} className="object-cover h-full w-full" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                  {/* === TWITTER MOCK PROFILE === */}
                  {activeNetwork === "twitter" && (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.15, ease: "easeInOut" }} className="absolute inset-0 z-20 bg-black text-white h-full flex flex-col w-full rounded-[2rem] overflow-hidden">
                      {/* Header */}
                      <div className="bg-black/80 backdrop-blur-md z-10 px-4 pt-10 pb-2 flex items-center gap-4 flex-shrink-0 border-b border-gray-800">
                        <svg onClick={() => setActiveNetwork("home")} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cursor-pointer hover:text-gray-300"><path d="m15 18-6-6 6-6"/></svg>
                        <div>
                          <h1 className="font-bold text-lg leading-tight">GVH College</h1>
                          <p className="text-[10px] text-gray-500">12.4K posts</p>
                        </div>
                      </div>
                      
                      <div className="flex-1 overflow-y-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        {/* Cover & Avatar */}
                        <div className="h-28 bg-gray-800 w-full relative">
                          <Image src="/images/b465b6c6-83ea-4042-99ad-f907e1e65696.png" alt="Cover" fill className="object-cover opacity-70" />
                          <div className="absolute -bottom-8 left-4 w-16 h-16 rounded-full border-4 border-black bg-white overflow-hidden">
                            <Image src="/images/swarthmore-college-Eric-Behrens-flickr-5706ffe35f9b581408d48cb3.jpg" alt="Profile" fill className="object-cover" />
                          </div>
                        </div>
                        
                        {/* Follow Button */}
                        <div className="flex justify-end p-3">
                          <button className="bg-white text-black font-bold px-4 py-1.5 rounded-full text-sm">Follow</button>
                        </div>
                        
                        {/* Bio */}
                        <div className="px-4">
                          <h1 className="font-bold text-xl leading-tight">GVH College</h1>
                          <p className="text-gray-500 text-sm">@gvh_college</p>
                          <p className="text-sm mt-3 leading-snug">
                            Leading educational institution dedicated to academic excellence, innovation, and holistic development. 🎓📚
                          </p>
                          
                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-gray-500 text-xs mt-3">
                            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> Karnataka, India</span>
                            <span className="flex items-center gap-1"><Link2 className="w-3 h-3" /> <a href="#" className="text-blue-400">gvhcollege.edu</a></span>
                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Joined May 2012</span>
                          </div>
                          
                          <div className="flex gap-4 mt-3 text-sm">
                            <p><span className="font-bold text-white">124</span> <span className="text-gray-500">Following</span></p>
                            <p><span className="font-bold text-white">45.2K</span> <span className="text-gray-500">Followers</span></p>
                          </div>
                        </div>
                        
                        {/* Tabs */}
                        <div className="flex border-b border-gray-800 mt-4 text-sm font-medium text-gray-500">
                          <div className="flex-1 text-center py-3 text-white border-b-2 border-blue-500">Posts</div>
                          <div className="flex-1 text-center py-3 hover:bg-gray-900 transition-colors">Replies</div>
                          <div className="flex-1 text-center py-3 hover:bg-gray-900 transition-colors">Media</div>
                        </div>
                        
                        {/* Tweets */}
                        <div className="divide-y divide-gray-800 pb-16">
                          {[1, 2].map((i) => (
                            <div key={i} className="p-4 flex gap-3 hover:bg-gray-900 cursor-pointer transition-colors">
                              <div className="w-10 h-10 rounded-full border border-gray-800 overflow-hidden flex-shrink-0 relative">
                                <Image src="/images/swarthmore-college-Eric-Behrens-flickr-5706ffe35f9b581408d48cb3.jpg" alt="Avatar" fill className="object-cover" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-1 mb-1">
                                  <span className="font-bold text-sm">GVH College</span>
                                  <span className="text-blue-400"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" /></svg></span>
                                  <span className="text-gray-500 text-sm">@gvh_college · {i}h</span>
                                </div>
                                <p className="text-sm mb-3 text-gray-100">
                                  {i === 1 ? "Excited to announce our new Computer Science curriculum starting next semester! 🚀 Prepare for the future with courses in AI and Machine Learning." : "Reminder: The annual college festival begins this Friday! Don't forget to register your teams for the hackathon. 💻🎉"}
                                </p>
                                {i === 1 && (
                                  <div className="relative w-full h-32 rounded-xl overflow-hidden mb-3 border border-gray-800">
                                    <Image src="/images/52931d59-6890-4dd1-afc3-6cd109fe6d3b.png" alt="Tweet Image" fill className="object-cover" />
                                  </div>
                                )}
                                <div className="flex justify-between text-gray-500 pr-8 text-xs">
                                  <span className="flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5" /> 24</span>
                                  <motion.span whileTap={{ scale: 0.8 }} onClick={() => setLikedTwitter(prev => ({ ...prev, [i]: !prev[i] }))} className={`flex items-center gap-1 cursor-pointer transition-colors ${likedTwitter[i] ? "text-pink-500" : ""}`}><Heart className={`w-3.5 h-3.5 ${likedTwitter[i] ? "fill-pink-500" : ""}`} /> {likedTwitter[i] ? 183 : 182}</motion.span>
                                  <span className="flex items-center gap-1"><Send className="w-3.5 h-3.5" /></span>
                                              </div>
              </div>
            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Bottom Bar */}
                      <div className="bg-black border-t border-gray-800 flex justify-around items-center pt-3 pb-6 flex-shrink-0 z-20">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                        <Search className="w-6 h-6 text-gray-500" />
                        <Bell className="w-6 h-6 text-gray-500" />
                        <MessageCircle className="w-6 h-6 text-gray-500" />
                      </div>
                    </motion.div>
                  )}
    
                  {/* === FACEBOOK MOCK PROFILE === */}
                  {activeNetwork === "facebook" && (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.15, ease: "easeInOut" }} className="absolute inset-0 z-20 bg-[#f0f2f5] h-full flex flex-col w-full rounded-[2rem] overflow-hidden">
                      {/* Header */}
                      <div className="bg-white z-10 px-4 pt-10 pb-2 flex items-center gap-4 shadow-sm flex-shrink-0">
                        <svg onClick={() => setActiveNetwork("home")} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600 cursor-pointer"><path d="m15 18-6-6 6-6"/></svg>
                        <div className="flex-1 relative">
                          <div className="bg-gray-100 rounded-full py-1.5 px-3 flex items-center gap-2">
                            <Search className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-500 text-sm">GVH College</span>
                                        </div>
              </div>
            </div>
                      
                      <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide pb-6" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        {/* Cover & Profile Section */}
                        <div className="bg-white pb-4 shadow-sm">
                          <div className="relative h-32 bg-gray-200">
                            <Image src="/images/b465b6c6-83ea-4042-99ad-f907e1e65696.png" alt="Cover" fill className="object-cover" />
                            <div className="absolute -bottom-8 left-4 w-24 h-24 rounded-full border-4 border-white bg-white overflow-hidden shadow-md">
                              <Image src="/images/swarthmore-college-Eric-Behrens-flickr-5706ffe35f9b581408d48cb3.jpg" alt="Profile" fill className="object-cover" />
                            </div>
                          </div>
                          
                          <div className="pt-10 px-4">
                            <h1 className="font-bold text-2xl tracking-tight">GVH College</h1>
                            <p className="text-gray-500 text-sm">College & University</p>
                            
                            <div className="flex items-center gap-2 mt-2 text-sm font-medium text-gray-600">
                              <span className="font-bold text-black">15K</span> likes • <span className="font-bold text-black">16K</span> followers
                            </div>
                            
                            {/* Action Buttons */}
                            <div className="flex gap-2 mt-4">
                              <button className="flex-1 bg-[#1877f2] hover:bg-[#166fe5] text-white font-semibold py-2 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>
                                Liked
                              </button>
                              <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-black font-semibold py-2 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors">
                                <MessageCircle className="w-4 h-4" />
                                Message
                              </button>
                              <button className="bg-gray-200 hover:bg-gray-300 px-3 rounded-lg transition-colors">
                                <MoreHorizontal className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                          
                          {/* Tabs */}
                          <div className="flex gap-6 px-4 mt-4 text-sm font-semibold text-gray-500 overflow-x-auto scrollbar-hide border-t border-gray-100 pt-2">
                            <span className="text-blue-600 border-b-2 border-blue-600 pb-2 whitespace-nowrap">Home</span>
                            <span className="pb-2 whitespace-nowrap">About</span>
                            <span className="pb-2 whitespace-nowrap">Photos</span>
                            <span className="pb-2 whitespace-nowrap">Videos</span>
                          </div>
                        </div>
                        
                        {/* Posts Section */}
                        <div className="mt-3 space-y-3">
                          {[1, 2].map((i) => (
                            <div key={i} className="bg-white p-4 shadow-sm">
                              <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-full overflow-hidden relative flex-shrink-0">
                                  <Image src="/images/swarthmore-college-Eric-Behrens-flickr-5706ffe35f9b581408d48cb3.jpg" alt="Avatar" fill className="object-cover" />
                                </div>
                                <div>
                                  <p className="font-bold text-sm">GVH College</p>
                                  <p className="text-xs text-gray-500 flex items-center gap-1">2 hours ago · <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z"/><path d="M12 6a1 1 0 0 0-1 1v5a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V7a1 1 0 0 0-1-1z"/></svg></p>
                                </div>
                              </div>
                              <p className="text-sm mb-3 text-gray-800">
                                {i === 1 ? "Join us for an open day this weekend! Tour the campus, meet the faculty, and discover why GVH College is the right choice for your future." : "Happy holidays from everyone at GVH College! The campus will be closed from Dec 24 to Jan 2."}
                              </p>
                              {i === 1 && (
                                <div className="relative w-full h-48 bg-gray-100 -mx-4 mb-3 border-y border-gray-100" style={{ width: 'calc(100% + 32px)' }}>
                                  <Image src="/images/52931d59-6890-4dd1-afc3-6cd109fe6d3b.png" alt="FB Post" fill className="object-cover" />
                                </div>
                              )}
                              <div className="flex border-t border-gray-200 pt-2 text-gray-500 font-semibold text-xs justify-between">
                                <motion.span whileTap={{ scale: 0.9 }} onClick={() => setLikedFacebook(prev => ({ ...prev, [i]: !prev[i] }))} className={`flex items-center gap-1.5 hover:bg-gray-100 py-1.5 px-2 rounded-md cursor-pointer ${likedFacebook[i] ? "text-[#1877f2]" : ""}`}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={likedFacebook[i] ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg> Like</motion.span>
                                <span className="flex items-center gap-1.5 hover:bg-gray-100 py-1.5 px-2 rounded-md cursor-pointer"><MessageCircle className="w-4 h-4" /> Comment</span>
                                <span className="flex items-center gap-1.5 hover:bg-gray-100 py-1.5 px-2 rounded-md cursor-pointer"><Send className="w-4 h-4" /> Share</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
    
                  {/* === LINKEDIN MOCK PROFILE === */}
                  {activeNetwork === "linkedin" && (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.15, ease: "easeInOut" }} className="absolute inset-0 z-20 bg-[#e9e5df] h-full flex flex-col w-full rounded-[2rem] overflow-hidden">
                      {/* Header */}
                      <div className="bg-white z-10 px-4 pt-10 pb-2 flex items-center gap-4 shadow-sm flex-shrink-0">
                        <svg onClick={() => setActiveNetwork("home")} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600 cursor-pointer"><path d="m15 18-6-6 6-6"/></svg>
                        <div className="flex-1 relative">
                          <div className="bg-[#eef3f8] rounded-sm py-1.5 px-3 flex items-center gap-2">
                            <Search className="w-4 h-4 text-gray-600" />
                            <span className="text-gray-600 text-sm">Search</span>
                                        </div>
              </div>
            </div>
                      
                      <div className="flex-1 overflow-y-auto scrollbar-hide pb-6" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        {/* Cover & Profile Section */}
                        <div className="bg-white pb-4 shadow-sm">
                          <div className="relative h-24 bg-gray-300">
                            <Image src="/images/b465b6c6-83ea-4042-99ad-f907e1e65696.png" alt="Cover" fill className="object-cover" />
                          </div>
                          <div className="px-4 relative">
                            <div className="absolute -top-10 w-20 h-20 rounded-md shadow-sm bg-white overflow-hidden border-2 border-white">
                              <Image src="/images/swarthmore-college-Eric-Behrens-flickr-5706ffe35f9b581408d48cb3.jpg" alt="Logo" fill className="object-cover" />
                            </div>
                            <div className="pt-12">
                              <h1 className="font-bold text-xl leading-tight">GVH College</h1>
                              <p className="text-gray-600 text-xs mt-1">Higher Education • Hosaritti, Karnataka • 10K followers</p>
                              <div className="flex items-center gap-1 text-xs text-gray-500 mt-2">
                                <div className="w-6 h-6 rounded-full overflow-hidden relative">
                                   <Image src="/images/chatgpt-image.png" alt="Connection" fill className="object-cover" />
                                </div>
                                <span>Sarah and 15 other connections work here</span>
                              </div>
                              
                              {/* Action Buttons */}
                              <div className="flex gap-2 mt-4">
                                <button className="flex-1 bg-[#0a66c2] hover:bg-[#004182] text-white font-semibold py-1.5 rounded-full text-sm transition-colors flex items-center justify-center gap-1">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg> Follow
                                </button>
                                <button className="flex-1 bg-white border border-[#0a66c2] text-[#0a66c2] font-semibold py-1.5 rounded-full text-sm hover:bg-blue-50 transition-colors">
                                  Visit website <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
                                </button>
                                <button className="border border-gray-500 text-gray-600 px-3 rounded-full hover:bg-gray-100 transition-colors">
                                  <MoreHorizontal className="w-5 h-5" />
                                </button>
                                            </div>
              </div>
            </div>
                          
                          {/* Tabs */}
                          <div className="flex gap-6 px-4 mt-2 text-sm font-semibold text-gray-500 overflow-x-auto scrollbar-hide border-t border-gray-200 pt-2">
                            <span className="text-[#0a66c2] border-b-2 border-[#0a66c2] pb-2 whitespace-nowrap">Home</span>
                            <span className="pb-2 whitespace-nowrap">About</span>
                            <span className="pb-2 whitespace-nowrap">Posts</span>
                            <span className="pb-2 whitespace-nowrap">Jobs</span>
                          </div>
                        </div>
                        
                        {/* About snippet */}
                        <div className="mt-2 bg-white p-4 shadow-sm">
                          <h2 className="font-bold text-sm mb-2 text-gray-900">About</h2>
                          <p className="text-sm text-gray-600 line-clamp-3">
                            GVH College is a premier educational institution committed to providing quality education, fostering innovation, and shaping the future leaders of tomorrow. Our campus boasts state-of-the-art facilities...
                          </p>
                        </div>
                        
                        {/* Posts Section */}
                        <div className="mt-2 space-y-2">
                          {[1].map((i) => (
                            <div key={i} className="bg-white pt-3 pb-2 shadow-sm">
                              <div className="flex items-center gap-3 px-4 mb-2">
                                <div className="w-10 h-10 rounded-md overflow-hidden relative flex-shrink-0 border border-gray-200">
                                  <Image src="/images/swarthmore-college-Eric-Behrens-flickr-5706ffe35f9b581408d48cb3.jpg" alt="Logo" fill className="object-cover" />
                                </div>
                                <div>
                                  <p className="font-bold text-sm leading-tight">GVH College</p>
                                  <p className="text-xs text-gray-500 leading-tight">10K followers</p>
                                  <p className="text-xs text-gray-500 flex items-center gap-1 leading-tight">1w • <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg></p>
                                </div>
                              </div>
                              <p className="text-sm px-4 mb-2 text-gray-800">
                                We are thrilled to announce that our students won 1st place in the National Robotics Competition! 🤖🏆 A testament to our dedication to STEM education.
                              </p>
                              <div className="relative w-full h-48 bg-gray-100 mb-2">
                                <Image src="/images/52931d59-6890-4dd1-afc3-6cd109fe6d3b.png" alt="LinkedIn Post" fill className="object-cover" />
                              </div>
                              <div className="px-4 flex items-center justify-between border-b border-gray-100 pb-2 text-xs text-gray-500">
                                <span className="flex items-center gap-1"><Heart className="w-3 h-3 text-red-500 fill-red-500"/> 245</span>
                                <span>12 comments • 8 reposts</span>
                              </div>
                              <div className="flex pt-1 gap-2 text-gray-500 font-semibold text-xs justify-around px-2">
                                <motion.span whileTap={{ scale: 0.9 }} onClick={() => setLikedLinkedin(prev => ({ ...prev, [i]: !prev[i] }))} className={`flex flex-col items-center gap-1 hover:bg-gray-100 p-2 rounded-md cursor-pointer flex-1 ${likedLinkedin[i] ? "text-[#0a66c2]" : ""}`}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill={likedLinkedin[i] ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg> Like</motion.span>
                                <span className="flex flex-col items-center gap-1 hover:bg-gray-100 p-2 rounded-md cursor-pointer flex-1"><MessageCircle className="w-[18px] h-[18px]" /> Comment</span>
                                <span className="flex flex-col items-center gap-1 hover:bg-gray-100 p-2 rounded-md cursor-pointer flex-1"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 3v18l-5-5-5 5V3z"/></svg> Repost</span>
                                <span className="flex flex-col items-center gap-1 hover:bg-gray-100 p-2 rounded-md cursor-pointer flex-1"><Send className="w-[18px] h-[18px]" /> Send</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
    
                  {/* === YOUTUBE MOCK PROFILE === */}
                  {activeNetwork === "youtube" && (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.15, ease: "easeInOut" }} className="absolute inset-0 z-20 bg-[#0f0f0f] h-full flex flex-col w-full rounded-[2rem] overflow-hidden text-white">
                      {/* Header */}
                      <div className="bg-[#0f0f0f] z-10 px-4 pt-10 pb-2 flex items-center justify-between flex-shrink-0">
                        <div className="flex items-center gap-2">
                          <svg onClick={() => setActiveNetwork("home")} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cursor-pointer hover:text-gray-300 text-white mr-1"><path d="m15 18-6-6 6-6"/></svg>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600 fill-red-600"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z" fill="white"/></svg>
                          <span className="font-bold text-lg tracking-tighter">YouTube</span>
                        </div>
                        <div className="flex gap-4">
                          <Search className="w-5 h-5" />
                          <MoreHorizontal className="w-5 h-5" />
                        </div>
                      </div>
                      
                      <div className="flex-1 overflow-y-auto scrollbar-hide pb-6" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        {/* Channel Banner */}
                        <div className="relative h-24 bg-gray-800 w-full">
                          <Image src="/images/b465b6c6-83ea-4042-99ad-f907e1e65696.png" alt="Banner" fill className="object-cover opacity-80" />
                        </div>
                        
                        {/* Channel Info */}
                        <div className="px-4 py-4 flex flex-col items-center text-center">
                          <div className="w-16 h-16 rounded-full overflow-hidden mb-3">
                            <Image src="/images/swarthmore-college-Eric-Behrens-flickr-5706ffe35f9b581408d48cb3.jpg" alt="Logo" width={64} height={64} className="object-cover w-full h-full" />
                          </div>
                          <h1 className="font-bold text-xl">GVH College Official</h1>
                          <p className="text-gray-400 text-sm mt-1">@gvhcollege • 5.2K subscribers • 120 videos</p>
                          
                          <div className="flex gap-1 items-center mt-2 text-sm text-gray-400 cursor-pointer">
                            <span className="line-clamp-1">Welcome to the official channel of GVH College...</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                          </div>
                          
                          <button className="w-full bg-white text-black font-bold py-2 rounded-full mt-4 transition-transform hover:scale-[1.02]">
                            Subscribe
                          </button>
                        </div>
                        
                        {/* Tabs */}
                        <div className="flex border-b border-gray-800 text-sm font-medium text-gray-400">
                          <div className="flex-1 text-center py-3 text-white border-b-2 border-white">HOME</div>
                          <div className="flex-1 text-center py-3">VIDEOS</div>
                          <div className="flex-1 text-center py-3">SHORTS</div>
                        </div>
                        
                        {/* Videos Grid */}
                        <div className="p-2 space-y-4 mt-2 pb-12">
                          {[
                            { title: "Campus Tour 2026 | Aerial View", views: "1.2K views", time: "2 weeks ago", img: "/images/52931d59-6890-4dd1-afc3-6cd109fe6d3b.png" },
                            { title: "Annual Sports Meet Highlights", views: "856 views", time: "1 month ago", img: "/images/chatgpt-image.png" },
                            { title: "Convocation Ceremony", views: "3.4K views", time: "6 months ago", img: "/images/b465b6c6-83ea-4042-99ad-f907e1e65696.png" }
                          ].map((video, i) => (
                            <div key={i} className="flex flex-col gap-2">
                              <div className="relative w-full aspect-video bg-gray-800 rounded-xl overflow-hidden">
                                <Image src={video.img} alt="Video Thumbnail" fill className="object-cover" />
                                <div className="absolute bottom-1.5 right-1.5 bg-black/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                                  4:32
                                </div>
                              </div>
                              <div className="flex gap-3 px-1">
                                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 mt-1">
                                  <Image src="/images/swarthmore-college-Eric-Behrens-flickr-5706ffe35f9b581408d48cb3.jpg" alt="Logo" width={32} height={32} className="object-cover w-full h-full" />
                                </div>
                                <div>
                                  <h3 className="font-semibold text-sm line-clamp-2 leading-tight">{video.title}</h3>
                                  <p className="text-xs text-gray-400 mt-1">GVH College Official</p>
                                  <p className="text-xs text-gray-400">{video.views} • {video.time}</p>
                                </div>
                                <MoreHorizontal className="w-4 h-4 text-gray-400 ml-auto flex-shrink-0" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Bottom Navigation Bar */}
                      <div className="bg-[#0f0f0f] border-t border-gray-800 flex justify-around items-center pt-2 pb-5 flex-shrink-0 z-20 text-[10px] text-gray-400">
                        <div className="flex flex-col items-center gap-1 text-white"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="m12 21.35-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" className="hidden"/><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>Home</div>
                        <div className="flex flex-col items-center gap-1"><Video className="w-5 h-5" />Shorts</div>
                        <div className="flex flex-col items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-white"><circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="M8 12h8"/></svg></div>
                        <div className="flex flex-col items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="14" x="2" y="3" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>Subs</div>
                        <div className="flex flex-col items-center gap-1"><div className="w-5 h-5 rounded-full overflow-hidden"><Image src="/images/swarthmore-college-Eric-Behrens-flickr-5706ffe35f9b581408d48cb3.jpg" alt="You" width={20} height={20} className="object-cover h-full w-full"/></div>You</div>
                      </div>
                    </motion.div>
                  )}
    
                  </AnimatePresence>
              </div>
  );

return (
    <div className="pt-20 min-h-screen bg-gray-50 flex flex-col overflow-x-hidden relative">


      {/* Header */}
      <div className="bg-navbar py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">GVH Social Hub</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Stay connected with campus life. Scroll through our live social feeds below!
          </p>
        </div>
      </div>

      <div className="flex-grow max-w-5xl mx-auto w-full px-4 py-12 flex flex-col items-center justify-center gap-12 relative z-10">
        
        {/* Realistic Phone Mockup Frame */}
        <div className="relative mx-auto border-blue-950 bg-blue-950 border-[14px] rounded-[2.5rem] h-[650px] w-[320px] shadow-2xl flex-shrink-0 ring-4 ring-gray-200 z-10">
          {/* Notch */}
          <div className="w-[120px] h-[21px] bg-black -top-[1px] rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute z-[60]"></div>
          
          {/* Side Buttons */}
          <div className="h-[46px] w-[3px] bg-slate-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
          <div className="h-[46px] w-[3px] bg-slate-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
          <div className="h-[64px] w-[3px] bg-slate-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
          
          {/* Phone Screen / Content Area */}
          {renderPhoneScreen(false)}

      </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
      `}} />
    </div>
  );
}

export default function SocialHubPage() {
  return (
    <Suspense fallback={<div className="w-full h-screen bg-black flex items-center justify-center text-white text-sm">Loading...</div>}>
      <SocialHubContent />
    </Suspense>
  );
}



















