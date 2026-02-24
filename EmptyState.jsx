import React from 'react';
import { Gamepad2, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";

export default function EmptyState({ type = "no-games", searchQuery = "" }) {
  if (type === "no-results") {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-20 text-center"
      >
        <div className="w-20 h-20 rounded-full bg-slate-800/50 flex items-center justify-center mb-6">
          <Search className="w-10 h-10 text-slate-500" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">No games found</h3>
        <p className="text-slate-400 max-w-md">
          No games match "{searchQuery}". Try a different search term or browse by category.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full blur-2xl opacity-20" />
        <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center">
          <Gamepad2 className="w-12 h-12 text-slate-500" />
        </div>
      </div>
      <h3 className="text-2xl font-bold text-white mb-3">No games yet</h3>
      <p className="text-slate-400 max-w-md mb-8">
        Your game library is empty. Start building your collection by adding your first game.
      </p>
      <Link to={createPageUrl("Admin")}>
        <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white border-0 px-6 py-5 h-auto rounded-xl font-semibold shadow-lg shadow-purple-500/25">
          <Plus className="w-5 h-5 mr-2" />
          Add Your First Game
        </Button>
      </Link>
    </motion.div>
  );
}