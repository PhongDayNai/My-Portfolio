import Sidebar from '@/components/Sidebar';
import ProjectCard from '@/components/ProjectCard';
import { PROJECTS } from '@/constants';
import { GraduationCap } from 'lucide-react';
import HeroCard from '@/components/HeroCard';
import Timeline from '@/components/Timeline';
import ProfileCard from '@/components/ProfileCard';
import SocialGrid from '@/components/SocialGrid';

export default function Home() {
  return (
    <main className="min-h-screen pl-20 transition-all text-slate-200 bg-transparent">
      <Sidebar />
      
      <div id="home" className="max-w-7xl mx-auto p-8 space-y-32">
        
        <HeroCard />

        <section id="projects" className="scroll-mt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROJECTS.map((project, idx) => (
              <ProjectCard 
                key={idx} 
                project={project}
                size={idx === 0 || project.title.includes("ChillingStories") ? 'special' : 'normal'}
              />
            ))}
          </div>
        </section>

        <section id="experience" className="scroll-mt-20">
          <div className="flex flex-col items-center mb-16">
            <h2 className="text-3xl font-black text-white uppercase tracking-widest">Kinh nghiệm & Học vấn</h2>
            <div className="h-1 w-20 bg-blue-600 mt-2 rounded-full"></div>
          </div>
          <Timeline /> 
        </section>

        <section id="about" className="scroll-mt-20 pb-20">
          <div className="flex flex-col items-center mb-16">
            <h2 className="text-3xl font-black text-white uppercase tracking-widest">Cá nhân & Kỹ năng</h2>
            <div className="h-1 w-20 bg-blue-600 mt-2 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            <div className="lg:col-span-2 space-y-6">
              <ProfileCard />
              
              <div className="p-8 rounded-3xl border border-white/5 bg-gradient-to-br from-blue-600/10 to-transparent backdrop-blur-md">
                <h4 className="text-xl font-bold mb-4 text-white">Kỹ năng chuyên môn</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-slate-400 text-sm">
                  <div>
                    <p className="text-blue-500 font-bold mb-1">Android</p>
                    <p>Kotlin, Jetpack Compose, MVVM, CameraX</p>
                  </div>
                  <div>
                    <p className="text-blue-500 font-bold mb-1">Backend</p>
                    <p>Node.js, Express, MySQL, Docker</p>
                  </div>
                  <div>
                    <p className="text-blue-500 font-bold mb-1">Infrastructure</p>
                    <p>CI/CD GitHub Actions, Cloudflare Tunnel</p>
                  </div>
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

            <div className="lg:col-span-1">
              <SocialGrid />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}