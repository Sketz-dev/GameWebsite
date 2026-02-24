import React from 'react';
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { 
  Swords, Compass, Puzzle, Car, Trophy, 
  Brain, Shield, Target, Monitor, Ghost, Layers
} from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  { id: 'all', label: 'All Games', icon: Layers },
  { id: 'action', label: 'Action', icon: Swords },
  { id: 'adventure', label: 'Adventure', icon: Compass },
  { id: 'puzzle', label: 'Puzzle', icon: Puzzle },
  { id: 'racing', label: 'Racing', icon: Car },
  { id: 'sports', label: 'Sports', icon: Trophy },
  { id: 'strategy', label: 'Strategy', icon: Brain },
  { id: 'rpg', label: 'RPG', icon: Shield },
  { id: 'shooter', label: 'Shooter', icon: Target },
  { id: 'simulation', label: 'Simulation', icon: Monitor },
  { id: 'horror', label: 'Horror', icon: Ghost },
];

export default function CategoryFilter({ selected, onSelect }) {
  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex gap-2 pb-4">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selected === cat.id;
          
          return (
            <motion.div
              key={cat.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant={isSelected ? "default" : "outline"}
                onClick={() => onSelect(cat.id)}
                className={`
                  flex items-center gap-2 rounded-full px-5 py-2 h-auto transition-all duration-300
                  ${isSelected 
                    ? 'bg-gradient-to-r from-purple-600 to-cyan-600 border-0 text-white shadow-lg shadow-purple-500/25' 
                    : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-700/50 hover:text-white hover:border-slate-600'
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{cat.label}</span>
              </Button>
            </motion.div>
          );
        })}
      </div>
      <ScrollBar orientation="horizontal" className="invisible" />
    </ScrollArea>
  );
}