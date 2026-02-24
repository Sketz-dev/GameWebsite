import React from 'react';
import { Gamepad2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function Layout({ children, currentPageName }) {
  return (
    <div className="min-h-screen bg-[#0f0f2e]">
      {/* Top Nav */}
      <nav className="bg-[#0a0a20] border-b border-[#1a1a4e] px-4 py-3 flex items-center gap-3 sticky top-0 z-50">
        <Link to={createPageUrl("Home")} className="flex items-center gap-2">
          <div className="bg-[#4d9fff] p-1.5 rounded-lg">
            <Gamepad2 className="w-5 h-5 text-white" />
          </div>
          <span className="text-white font-extrabold text-lg tracking-tight">
            Study <span className="text-[#4d9fff]">9000</span>
          </span>
        </Link>
      </nav>

      <main>{children}</main>
    </div>
  );
}