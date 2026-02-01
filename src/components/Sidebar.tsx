'use client';
import { Home, FolderCode, User, Briefcase, Settings, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export default function Sidebar() {
  const menu = [
    { name: 'Trang chủ', icon: Home, href: '#' },
    { name: 'Dự án', icon: FolderCode, href: '#projects' },
    { name: 'Kinh nghiệm', icon: Briefcase, href: '#experience' },
    { name: 'Cá nhân', icon: User, href: '#about' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-20 hover:w-64 bg-[#1e293b]/50 backdrop-blur-xl border-r border-white/5 transition-all duration-300 group z-50 overflow-hidden">
      <div className="flex flex-col h-full p-4">
        <div className="flex items-center gap-4 mb-10 px-2">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex-shrink-0 flex items-center justify-center font-bold text-white">P</div>
          <span className="font-bold text-xl opacity-0 group-hover:opacity-100 transition-opacity">Phong.Dev</span>
        </div>

        <nav className="flex-1 space-y-2">
          {menu.map((item) => (
            <a key={item.name} href={item.href} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 text-slate-400 hover:text-blue-400 transition-all">
              <item.icon size={24} />
              <span className="font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{item.name}</span>
            </a>
          ))}
        </nav>

        <div className="p-2 bg-white/5 rounded-xl flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-500" />
          <div className="opacity-0 group-hover:opacity-100 transition-opacity overflow-hidden">
            <p className="text-xs font-bold truncate">Hùng Phong</p>
            <p className="text-[10px] text-slate-500">Full-stack</p>
          </div>
        </div>
      </div>
    </aside>
  );
}