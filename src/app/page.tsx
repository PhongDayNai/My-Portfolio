"use client";
import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import ProjectCard from '@/components/ProjectCard';
import { PROJECTS } from '@/constants';
import { GraduationCap } from 'lucide-react';
import HeroCard from '@/components/HeroCard';
import Timeline from '@/components/Timeline';
import ProfileCard from '@/components/ProfileCard';
import SocialGrid from '@/components/SocialGrid';
import SkillsCard from '@/components/SkillsCard';
import EducationCard from '@/components/EducationCard';
import PhotoStack from '@/components/PhotoStack';
import PhotoSphere from '@/components/PhotoSphere';
import SpotlightPhoto from '@/components/SpotlightPhoto';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/constants/translations';

export default function Home() {
  const { lang } = useLanguage();
  const t = translations[lang].sections;

  const [randomComponent, setRandomComponent] = useState<React.ReactNode>(null);

  useEffect(() => {
    const components = [
      <PhotoStack key="stack" />,
      <PhotoSphere key="sphere" />,
      <SpotlightPhoto key="spotlight" />
    ];

    const randomIndex = Math.floor(Math.random() * components.length);
    setRandomComponent(components[randomIndex]);
  }, []);
  
  return (
    <main className="min-h-screen pl-0 lg:pl-10 transition-all text-slate-200 bg-transparent">
      <Sidebar />
      
      <div id="home" className="max-w-7xl mx-auto p-8 space-y-32">
        
        <HeroCard />

        <section id="projects" className="scroll-mt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROJECTS.map((project, idx) => (
              <ProjectCard 
                key={idx} 
                project={project}
                idx={idx}
                size={idx === 0 || project.title.includes("ChillingStories") ? 'special' : 'normal'}
              />
            ))}
          </div>
        </section>

        <section id="experience" className="scroll-mt-20">
          <div className="flex flex-col items-center mb-16">
            <h2 className="text-3xl font-black text-white uppercase tracking-widest">
              {t.experience}
            </h2>
            <div className="h-1 w-20 bg-blue-600 mt-2 rounded-full"></div>
          </div>
          <Timeline /> 
        </section>

        <section id="about" className="scroll-mt-20 pb-20">
          <div className="flex flex-col items-center mb-16">
            <h2 className="text-3xl font-black text-white uppercase tracking-widest">
              {t.about}
            </h2>
            <div className="h-1 w-20 bg-blue-600 mt-2 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            <div className="lg:col-span-2 space-y-6">
              <ProfileCard />
              {/* <PhotoStack /> */}
              {randomComponent}
              <SkillsCard />
              <EducationCard />
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