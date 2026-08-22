import { useMemo, useState } from "react";
import { ArrowLeft, Globe2, UserCircle } from "lucide-react";
import PostCard from "../components/PostCard.jsx";
import SearchFilterBar from "../components/SearchFilterBar.jsx";

const posts = [
  {
    id: 1,
    initials: "JM",
    user: "Jordan Miller",
    date: "2 hours ago",
    location: "Kyoto, Japan",
    title: "The quiet side of Kyoto",
    body: "We skipped the packed routes this morning and followed a tiny lane behind Gion. The early light, a warm bowl of noodles, and a conversation with a shop owner became the highlight of our entire trip.",
    likes: 24,
    comments: 6,
    category: "Reviews",
  },
  {
    id: 2,
    initials: "SK",
    user: "Sofia Khan",
    date: "Yesterday",
    location: "Lisbon, Portugal",
    title: "Three days was just enough",
    body: "Lisbon is wonderfully walkable, but bring comfortable shoes. My favourite day was the tram out to Belém, followed by pastéis and a long sunset overlooking the river. Already planning the return trip.",
    likes: 41,
    comments: 12,
    category: "Experiences",
  },
  {
    id: 3,
    initials: "AN",
    user: "Avery Nguyen",
    date: "3 days ago",
    location: "Reykjavik, Iceland",
    title: "A reminder to leave space",
    body: "Our itinerary had every hour planned, until the weather changed everything. Leaving a free afternoon helped us find a geothermal pool and a view we would never have searched for online.",
    likes: 18,
    comments: 4,
    category: "Tips",
  },
];

function CommunityTab() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All posts");
  const [ascending, setAscending] = useState(true);
  const [likedPosts, setLikedPosts] = useState([]);
  const visiblePosts = useMemo(
    () =>
      posts
        .filter(
          (post) =>
            (!query ||
              `${post.user} ${post.title} ${post.body} ${post.location}`
                .toLowerCase()
                .includes(query.toLowerCase())) &&
            (filter === "All posts" || post.category === filter),
        )
        .sort((a, b) => (ascending ? a.id - b.id : b.id - a.id)),
    [ascending, filter, query],
  );

  function toggleLike(id) {
    setLikedPosts((current) =>
      current.includes(id)
        ? current.filter((postId) => postId !== id)
        : [...current, id],
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f3ed] text-[#1b2821]">
      <header className="border-b border-[#d8ddd6] bg-[#fbfaf6]">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 sm:px-8">
          <a className="flex items-center gap-2.5 text-sm font-bold" href="/">
            <span className="grid h-8 w-8 place-items-center rounded-[13px_13px_13px_3px] bg-[#1f5b45] text-[#f5f3ed]">
              <Globe2 size={17} />
            </span>
            GlobeTrotter
          </a>
          <a
            className="grid h-9 w-9 place-items-center rounded-full border border-[#ccd5ce] text-[#1f5b45]"
            href="/profile"
            aria-label="Open profile"
          >
            <UserCircle size={20} />
          </a>
        </div>
      </header>
      <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8 sm:py-11">
        <a
          className="mb-7 inline-flex items-center gap-2 text-xs font-bold text-[#637168] hover:text-[#1f5b45]"
          href="/"
        >
          <ArrowLeft size={14} /> Back home
        </a>
        <div className="mb-7">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[.18em] text-[#1f5b45]">
            Stories from the road
          </p>
          <h1 className="font-serif text-4xl font-normal tracking-tight sm:text-5xl">
            Community tab
          </h1>
          <p className="mt-3 max-w-xl text-sm text-[#68756c]">
            Read real experiences, practical tips, and the small discoveries
            that make a trip memorable.
          </p>
        </div>
        <SearchFilterBar
          query={query}
          onQueryChange={setQuery}
          filter={filter}
          onFilterChange={setFilter}
          filterOptions={["All posts", "Reviews", "Experiences", "Tips"]}
          onSort={() => setAscending((current) => !current)}
        />
        <div className="mx-auto mt-7 max-w-3xl space-y-4">
          {visiblePosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              liked={likedPosts.includes(post.id)}
              onLike={() => toggleLike(post.id)}
            />
          ))}
          {!visiblePosts.length && (
            <p className="rounded-lg border border-dashed border-[#bfcac1] p-10 text-center text-sm text-[#68756c]">
              No community posts match your search.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}

export default CommunityTab;
