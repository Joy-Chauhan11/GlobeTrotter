import { useEffect, useState } from "react";
import Header from "../components/Header";
import { getCommunityPosts } from "../lib/api";
import { MessageSquare, Heart, Share2, MapPin } from "lucide-react";

export default function Community() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCommunityPosts()
      .then(data => setPosts(Array.isArray(data) ? data : []))
      .catch(err => console.error("Failed to fetch community posts", err))
      .finally(() => setLoading(false));
  }, []);

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
            posts.map(post => (
              <article key={post.id} className="bg-white rounded-xl border border-[#d8ddd6] p-6 shadow-sm hover:shadow-md transition">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold text-[#1f5b45]">{post.title}</h2>
                    <p className="text-xs text-[#8b968e] font-bold uppercase tracking-wider mt-1">{post.category || "Trip Report"}</p>
                  </div>
                  {post.trip && (
                    <div className="flex items-center gap-1 bg-[#edf3ed] text-[#1f5b45] px-3 py-1 rounded-full text-xs font-bold">
                      <MapPin size={12} /> {post.trip.title}
                    </div>
                  )}
                </div>
                <p className="mt-4 text-[#526159] leading-relaxed">{post.content}</p>
                <div className="mt-6 flex items-center gap-6 border-t border-[#f5f3ed] pt-4">
                  <button className="flex items-center gap-2 text-sm font-medium text-[#68756c] hover:text-[#1f5b45] transition">
                    <Heart size={16} /> {post.likes || 0}
                  </button>
                  <button className="flex items-center gap-2 text-sm font-medium text-[#68756c] hover:text-[#1f5b45] transition">
                    <MessageSquare size={16} /> Comments
                  </button>
                  <button className="flex items-center gap-2 text-sm font-medium text-[#68756c] hover:text-[#1f5b45] transition ml-auto">
                    <Share2 size={16} /> Share
                  </button>
                </div>
              </article>
            ))
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
