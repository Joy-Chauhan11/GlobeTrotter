import { useEffect, useState } from "react";
import Header from "../components/Header";
import { getCommunityPosts, toggleLikePost, addCommentPost } from "../lib/api";
import { MessageSquare, Heart, Share2, MapPin, Send } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Community() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openComments, setOpenComments] = useState({});
  const [commentInputs, setCommentInputs] = useState({});

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const data = await getCommunityPosts();
      setPosts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch community posts", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (postId) => {
    try {
      await toggleLikePost(postId);
      fetchPosts(); // Refresh to get updated likes
    } catch (err) {
      console.error("Failed to toggle like", err);
    }
  };

  const toggleCommentSection = (postId) => {
    setOpenComments(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleCommentChange = (postId, text) => {
    setCommentInputs(prev => ({ ...prev, [postId]: text }));
  };

  const submitComment = async (postId) => {
    const text = commentInputs[postId];
    if (!text || text.trim() === "") return;
    
    try {
      await addCommentPost(postId, text);
      setCommentInputs(prev => ({ ...prev, [postId]: "" }));
      fetchPosts(); // Refresh to show new comment
    } catch (err) {
      console.error("Failed to add comment", err);
    }
  };

  const hasLiked = (post) => {
    if (!user || !post.likes) return false;
    return post.likes.some(like => like.userId === user.id);
  };

  return (
    <main className="min-h-screen bg-[#fbfaf6] text-[#1b2821]">
      <Header />
      <div className="mx-auto max-w-4xl px-5 py-10">
        <h1 className="text-3xl font-serif font-bold">Community</h1>
        <p className="mt-2 text-sm text-[#526159]">Discover and share public trips from travelers around the world.</p>

        <div className="mt-8 space-y-6">
          {loading ? (
            <p className="text-[#68756c] font-medium animate-pulse">Loading posts...</p>
          ) : posts.length > 0 ? (
            posts.map(post => {
              const liked = hasLiked(post);
              const likeCount = post.likes ? post.likes.length : 0;
              const commentCount = post.comments ? post.comments.length : 0;
              
              return (
                <article key={post.id} className="bg-white rounded-xl border border-[#d8ddd6] p-6 shadow-sm hover:shadow-md transition">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      {post.user?.profilePictureUrl ? (
                         <img src={post.user.profilePictureUrl} alt="author" className="w-10 h-10 rounded-full object-cover border border-[#e2e8e4]" />
                      ) : (
                         <div className="w-10 h-10 rounded-full bg-[#1f5b45] text-white flex items-center justify-center font-bold text-sm">
                           {post.user?.firstName?.charAt(0) || "U"}
                         </div>
                      )}
                      <div>
                        <h2 className="text-xl font-bold text-[#1f5b45]">{post.title}</h2>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-xs text-[#8b968e] font-bold uppercase tracking-wider">{post.category || "Trip Report"}</p>
                          <span className="text-xs text-[#d8ddd6]">|</span>
                          <p className="text-xs text-[#68756c]">by {post.user?.firstName} {post.user?.lastName}</p>
                        </div>
                      </div>
                    </div>
                    {post.trip && (
                      <div className="flex items-center gap-1 bg-[#edf3ed] text-[#1f5b45] px-3 py-1 rounded-full text-xs font-bold">
                        <MapPin size={12} /> {post.trip.title}
                      </div>
                    )}
                  </div>
                  
                  <p className="mt-5 text-[#526159] leading-relaxed">{post.content}</p>
                  
                  {post.imageUrl && (
                    <div className="mt-4 rounded-xl overflow-hidden max-h-96">
                      <img src={post.imageUrl} alt="Post image" className="w-full h-full object-cover" />
                    </div>
                  )}
                  
                  <div className="mt-6 flex items-center gap-6 border-y border-[#f5f3ed] py-3">
                    <button 
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-2 text-sm font-medium transition ${liked ? 'text-red-500 hover:text-red-600' : 'text-[#68756c] hover:text-[#1f5b45]'}`}
                    >
                      <Heart size={16} fill={liked ? "currentColor" : "none"} /> {likeCount}
                    </button>
                    <button 
                      onClick={() => toggleCommentSection(post.id)}
                      className="flex items-center gap-2 text-sm font-medium text-[#68756c] hover:text-[#1f5b45] transition"
                    >
                      <MessageSquare size={16} /> {commentCount} Comments
                    </button>
                    <button className="flex items-center gap-2 text-sm font-medium text-[#68756c] hover:text-[#1f5b45] transition ml-auto">
                      <Share2 size={16} /> Share
                    </button>
                  </div>

                  {openComments[post.id] && (
                    <div className="mt-4 space-y-4">
                      {post.comments && post.comments.length > 0 ? (
                        post.comments.map(comment => (
                          <div key={comment.id} className="flex gap-3 text-sm">
                            <div className="font-bold text-[#1f5b45] min-w-[max-content]">{comment.user?.firstName}:</div>
                            <div className="text-[#526159]">{comment.text}</div>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-[#8b968e]">No comments yet. Be the first!</p>
                      )}
                      
                      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[#f5f3ed]">
                        <input 
                          type="text" 
                          value={commentInputs[post.id] || ""}
                          onChange={(e) => handleCommentChange(post.id, e.target.value)}
                          placeholder="Add a comment..."
                          className="flex-1 bg-[#f5f3ed] rounded-full px-4 py-2 text-sm outline-none border border-transparent focus:border-[#d8ddd6]"
                          onKeyDown={(e) => e.key === 'Enter' && submitComment(post.id)}
                        />
                        <button 
                          onClick={() => submitComment(post.id)}
                          className="p-2 bg-[#1f5b45] text-white rounded-full hover:bg-[#164634] transition"
                        >
                          <Send size={16} />
                        </button>
                      </div>
                    </div>
                  )}
                </article>
              );
            })
          ) : (
            <div className="text-center py-12 bg-white rounded-xl border border-dashed border-[#bfcac1]">
              <p className="text-[#68756c] font-medium">No community posts yet. Be the first to share your trip!</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
