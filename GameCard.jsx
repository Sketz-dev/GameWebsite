import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Play, Gamepad2 } from "lucide-react";
import { motion } from "framer-motion";

const categoryColors = {
  action: "bg-red-500/20 text-red-400 border-red-500/30",
  adventure: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  puzzle: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  racing: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  sports: "bg-green-500/20 text-green-400 border-green-500/30",
  strategy: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  rpg: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  shooter: "bg-rose-500/20 text-rose-400 border-rose-500/30",
  simulation: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  horror: "bg-gray-500/20 text-gray-400 border-gray-500/30"
};

export default function GameCard({ game, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className="group relative overflow-hidden bg-slate-900/50 border-slate-700/50 hover:border-purple-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/10">
        <div className="aspect-[4/3] relative overflow-hidden">
          {game.cover_image ? (
            <img 
              src={game.cover_image} 
              alt={game.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
              <Gamepad2 className="w-16 h-16 text-slate-600" />
            </div>
          )}
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
          
          {/* Featured badge */}
          {game.featured && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white border-0 shadow-lg">
                Featured
              </Badge>
            </div>
          )}
          
          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <Button 
              size="lg"
              className="bg-purple-600 hover:bg-purple-500 rounded-full w-14 h-14 p-0 shadow-xl shadow-purple-500/30"
              onClick={() => game.game_url && window.open(game.game_url, '_blank')}
              disabled={!game.game_url}
            >
              <Play className="w-6 h-6 fill-current" />
            </Button>
          </div>
        </div>
        
        <div className="p-4 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-white text-lg leading-tight line-clamp-1 group-hover:text-purple-300 transition-colors">
              {game.title}
            </h3>
            {game.rating && (
              <div className="flex items-center gap-1 text-yellow-400 shrink-0">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm font-medium">{game.rating.toFixed(1)}</span>
              </div>
            )}
          </div>
          
          {game.description && (
            <p className="text-slate-400 text-sm line-clamp-2 leading-relaxed">
              {game.description}
            </p>
          )}
          
          <Badge variant="outline" className={`${categoryColors[game.category]} capitalize text-xs`}>
            {game.category}
          </Badge>
        </div>
      </Card>
    </motion.div>
  );
}