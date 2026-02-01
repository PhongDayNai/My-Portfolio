import Sidebar from '@/components/Sidebar';
import ProjectCard from '@/components/ProjectCard';
import { PROJECTS, PERSONAL_INFO } from '@/constants';
import { MapPin, Mail, Phone, GraduationCap } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen pl-20 transition-all bg-[#0f172a] text-slate-200">
      <Sidebar />
      
      <div className="max-w-7xl mx-auto p-8">
        <header className="mb-12 py-10">
          <h2 className="text-blue-500 font-mono mb-2">/ hello_world</h2>
          <h1 className="text-6xl font-black tracking-tighter mb-4 bg-gradient-to-r from-white to-slate-500 bg-clip-text text-transparent">
            {PERSONAL_INFO.name}
          </h1>
          <div className="text-slate-400 text-lg max-w-3xl leading-relaxed space-y-4">
            <p>{PERSONAL_INFO.summary}</p>
            <div className="flex flex-wrap gap-6 text-sm text-slate-500 font-mono">
              <span className="flex items-center gap-2"><MapPin size={14} /> {PERSONAL_INFO.location}</span>
              <span className="flex items-center gap-2"><Mail size={14} /> {PERSONAL_INFO.email}</span>
              <span className="flex items-center gap-2"><Phone size={14} /> 0855576569</span>
            </div>
          </div>
        </header>

        <section id="projects" className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROJECTS.map((project, idx) => (
            <ProjectCard 
              key={idx} 
              project={project}
              size={idx === 0 || project.title.includes("ChillingStories") ? 'special' : 'normal'}
            />
          ))}
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="p-8 rounded-3xl border border-white/5 bg-gradient-to-br from-blue-600/10 to-transparent backdrop-blur-md">
                <h4 className="text-xl font-bold mb-4 text-white">Kỹ năng chuyên môn</h4>
                <div className="space-y-2 text-slate-400 text-sm">
                  <p>• Android: Kotlin, Jetpack Compose, MVVM, CameraX</p>
                  <p>• Backend: Node.js, Express, MySQL, Docker</p>
                  <p>• Infrastructure: CI/CD GitHub Actions, Cloudflare Tunnel</p>
                </div>
            </div>
            
            <div className="p-8 rounded-3xl border border-white/5 bg-[#1e293b]/30 flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 text-blue-500 mb-2">
                      <GraduationCap size={20} />
                      <span className="text-xs font-mono font-bold uppercase tracking-widest">Education</span>
                    </div>
                    <h4 className="text-xl font-bold mb-1 text-white">Thủy Lợi University</h4>
                    <p className="text-slate-500 text-sm">Bachelor of IT (2022 - Present)</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">GPA</p>
                  <div className="text-4xl font-black text-blue-500 tracking-tighter">3.17</div>
                </div>
            </div>
        </div>
      </div>
    </main>
  );
}