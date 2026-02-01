'use client'
import { useState } from 'react';
import { PERSONAL_INFO } from '@/constants';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Dự án cá nhân", href: "#projects" },
    { name: "Kinh nghiệm làm việc", href: "#experience" },
    { name: "Kỹ năng đã có", href: "#skills" },
  ];

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-md md:hidden"
      >
        {isOpen ? '✕' : '☰'}
      </button>

      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="p-8 flex flex-col h-full">
          <div className="mb-10">
            <h1 className="text-xl font-bold text-blue-400">{PERSONAL_INFO.name}</h1>
            <p className="text-xs text-slate-400 uppercase tracking-widest mt-1">{PERSONAL_INFO.role}</p>
          </div>

          <nav className="flex-1 space-y-4">
            {menuItems.map((item) => (
              <a 
                key={item.name} 
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block text-slate-300 hover:text-white hover:translate-x-2 transition-all"
              >
                {item.name}
              </a>
            ))}
          </nav>

          <div className="text-xs text-slate-500 border-t border-slate-800 pt-4">
            {PERSONAL_INFO.email}
          </div>
        </div>
      </aside>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}