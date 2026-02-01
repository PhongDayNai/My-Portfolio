import Sidebar from '@/components/Sidebar';
import { PERSONAL_INFO, PROJECTS } from '@/constants';

export default function Home() {
  return (
    <div className="flex min-h-screen bg-white text-slate-900">
      <Sidebar />
      
      <main className="flex-1 md:ml-64">
        <section className="px-8 py-24 bg-slate-50">
          <div className="max-w-4xl">
            <h2 className="text-blue-600 font-semibold mb-2">Xin chào, tôi là</h2>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              {PERSONAL_INFO.name}
            </h1>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl">
              {PERSONAL_INFO.summary}
            </p>
          </div>
        </section>

        <section id="projects" className="px-8 py-20 max-w-6xl">
          <h2 className="text-3xl font-bold mb-12 flex items-center gap-4">
            Dự án cá nhân
            <span className="h-px bg-slate-200 flex-1"></span>
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {PROJECTS.map((project, idx) => (
              <div key={idx} className="group border border-slate-200 rounded-2xl p-6 hover:shadow-xl transition-all">
                <div className="flex flex-col h-full">
                  <h3 className="text-xl font-bold group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-500 text-sm my-4 flex-1">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map(t => (
                      <span key={t} className="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase rounded-md">
                        {t}
                      </span>
                    ))}
                  </div>
                  <a 
                    href={project.link} 
                    target="_blank"
                    className="text-sm font-bold text-blue-600 inline-flex items-center gap-2 hover:gap-4 transition-all"
                  >
                    GITHUB REPO <span>→</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}