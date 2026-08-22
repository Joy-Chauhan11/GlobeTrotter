import { Heart, MapPin, MessageCircle } from "lucide-react";

function PostCard({ post, liked, onLike }) {
  return (
    <article className="rounded-lg border border-[#d8ddd6] bg-[#fbfaf6] p-5 sm:p-6">
      <div className="flex gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#d9e5d8] text-sm font-bold text-[#1f5b45]">
          {post.initials}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <h2 className="font-bold text-[#1b2821]">{post.user}</h2>
              <p className="mt-0.5 text-xs text-[#87928a]">{post.date}</p>
            </div>
            <span className="flex items-center gap-1 text-xs text-[#68756c]">
              <MapPin size={13} /> {post.location}
            </span>
          </div>
          <h3 className="mt-5 text-lg font-bold text-[#1b2821]">
            {post.title}
          </h3>
          <p className="mt-2 text-sm leading-6 text-[#536159]">{post.body}</p>
          <div className="mt-5 flex items-center gap-5 border-t border-[#e4e8e2] pt-4">
            <button
              className={`flex items-center gap-1.5 text-xs font-bold ${liked ? "text-[#b65d50]" : "text-[#7c8880]"}`}
              type="button"
              onClick={onLike}
            >
              <Heart size={15} fill={liked ? "currentColor" : "none"} />{" "}
              {post.likes + (liked ? 1 : 0)}
            </button>
            <span className="flex items-center gap-1.5 text-xs font-bold text-[#7c8880]">
              <MessageCircle size={15} /> {post.comments}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default PostCard;
