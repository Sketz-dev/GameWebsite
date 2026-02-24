import React from 'react';
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SearchBar({ value, onChange, placeholder = "Search games..." }) {
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
      <div className="relative flex items-center">
        <Search className="absolute left-4 w-5 h-5 text-slate-400 group-focus-within:text-purple-400 transition-colors" />
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-6 bg-slate-800/50 border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:border-purple-500/50 focus:ring-purple-500/20 transition-all duration-300"
        />
        {value && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onChange('')}
            className="absolute right-2 h-8 w-8 p-0 text-slate-400 hover:text-white hover:bg-slate-700"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}