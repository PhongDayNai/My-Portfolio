import { Github, ExternalLink } from 'lucide-react';
import { Project } from '@/constants';

interface ProjectCardProps {
  project: Project;
  size?: 'normal' | 'special';
}

export default function ProjectCard({ project, size = 'normal' }: ProjectCardProps) {
  const isSpecial = size === 'special';

  return (
    <a href={project.link} target="_blank" rel="noopener noreferrer" className={`group relative overflow-hidden rounded-3xl border border-white/5 bg-[#1e293b]/30 p-8 hover:bg-[#1e293b]/50 transition-all shadow-xl
      ${isSpecial ? 'md:col-span-2 md:row-span-1 border-blue-500/30' : 'col-span-1'}
    `}>
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">
            {isSpecial ? 'Featured Project' : 'Project'}
          </span>
          <div className="flex gap-3">
            <div className="hover:text-blue-400 transition-colors">
              <Github size={20} />
            </div>
          </div>
        </div>

        <h3 className={`font-bold mb-3 ${isSpecial ? 'text-3xl' : 'text-xl'}`}>
          {project.title}
        </h3>
        
        <p className="text-slate-400 text-sm mb-6 flex-1 leading-relaxed">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tech.map(t => (
            <span key={t} className="px-3 py-1 bg-white/5 rounded-full text-[10px] text-slate-300 border border-white/5">
              {t}
            </span>
          ))}
        </div>
      </div>

      {isSpecial && (
        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-blue-600/10 blur-[100px] group-hover:bg-blue-600/20 transition-all" />
      )}
    </a>
  );
}