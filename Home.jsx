import React, { useState } from 'react';
import { Gamepad2, Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

// ============================================================
// 🎮 ADD YOUR GAMES HERE — just copy a block and fill it in!
// ============================================================
export const ALL_GAMES = [
  // Example (delete this and add your own):
  // {
  //   title: "My Game",
  //   category: "Action",           // category label — creates a new row automatically
  //   image: "https://...",         // thumbnail image URL
  //   url: "https://game-site.com", // the URL that loads inside the game player
  // },
];
// ============================================================

const CATEGORIES = [...new Set(ALL_GAMES.map(g => g.category))];

function GameCard({ game }) {
  const navigate = useNavigate();

  const handleClick = () => {
    const params = new URLSearchParams({
      title: game.title,
      url: game.url,
      image: game.image || '',
    });
    navigate(createPageUrl('Play') + '?' + params.toString());
  };

  return (
    <div
      className="flex flex-col items-center cursor-pointer group"
      onClick={handleClick}
    >
      <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#1a1a3e] border-2 border-transparent group-hover:border-[#4d9fff] transition-all duration-200 shadow-md">
        {game.image ? (
          <img
            src={game.image}
            alt={game.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Gamepad2 className="w-10 h-10 text-[#4d9fff]/40" />
          </div>
        )}
      </div>
      <p className="mt-2 text-center text-sm font-semibold text-[#4d9fff] group-hover:text-white transition-colors leading-tight px-1 line-clamp-2">
        {game.title}
      </p>
    </div>
  );
}

function GameRow({ category, games }) {
  return (
    <section className="mb-10">
      <h2 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
        <span className="w-1 h-6 bg-[#4d9fff] rounded-full inline-block" />
        {category}
      </h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {games.map((game, i) => (
          <GameCard key={i} game={game} />
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = ALL_GAMES.filter(g => {
    const matchSearch = g.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === 'All' || g.category === activeCategory;
    return matchSearch && matchCat;
  });

  const groupedByCategory = CATEGORIES.reduce((acc, cat) => {
    const games = filtered.filter(g => g.category === cat);
    if (games.length > 0) acc[cat] = games;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-[#0f0f2e] text-white">
      {/* Hero / Search */}
      <div className="bg-gradient-to-b from-[#1a1a4e] to-[#0f0f2e] pt-10 pb-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-2 tracking-tight">
            <span className="text-white">Study </span>
            <span className="text-[#4d9fff]">9000</span>
          </h1>
          <p className="text-[#8888cc] mb-6 text-lg">Play anything. Explore everything.</p>

          {/* Search */}
          <div className="relative max-w-xl mx-auto mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8888cc] w-5 h-5" />
            <Input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search games..."
              className="pl-12 pr-10 py-6 rounded-xl bg-[#1a1a4e] border-[#2a2a6e] text-white placeholder:text-[#8888cc] focus:border-[#4d9fff] text-base"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8888cc] hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Pills */}
          {CATEGORIES.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2">
              {['All', ...CATEGORIES].map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                    activeCategory === cat
                      ? 'bg-[#4d9fff] text-white shadow-lg shadow-[#4d9fff]/30'
                      : 'bg-[#1a1a4e] text-[#8888cc] hover:bg-[#2a2a6e] hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Game Rows */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {ALL_GAMES.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Gamepad2 className="w-16 h-16 text-[#4d9fff]/30 mb-4" />
            <p className="text-white text-2xl font-bold mb-2">No games yet</p>
            <p className="text-[#8888cc]">Open <code className="bg-[#1a1a4e] px-2 py-0.5 rounded text-[#4d9fff]">pages/Home.jsx</code> and add games to the <code className="bg-[#1a1a4e] px-2 py-0.5 rounded text-[#4d9fff]">ALL_GAMES</code> array.</p>
          </div>
        ) : Object.keys(groupedByCategory).length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Gamepad2 className="w-16 h-16 text-[#4d9fff]/30 mb-4" />
            <p className="text-[#8888cc] text-lg">No games found for "{search}"</p>
          </div>
        ) : (
          Object.entries(groupedByCategory).map(([cat, games]) => (
            <GameRow key={cat} category={cat} games={games} />
          ))
        )}
      </div>
    </div>
  );
}