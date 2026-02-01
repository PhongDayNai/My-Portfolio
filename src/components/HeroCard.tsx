import { PERSONAL_INFO } from '@/constants';

export default function HeroCard() {
  return (
    <section className="relative min-h-[600px] flex flex-col justify-center px-8 md:px-20 bg-[#030712] overflow-hidden rounded-[2.5rem] border border-white/5 mx-4 my-8">
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(30, 41, 59, 0.5) 2px, transparent 2px),
            linear-gradient(to bottom, rgba(30, 41, 59, 0.5) 2px, transparent 2px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-transparent to-[#030712] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#030712] via-transparent to-[#030712] pointer-events-none" />

      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 max-w-5xl">
        <h2 className="text-blue-500 font-mono text-sm mb-6 tracking-[0.3em] uppercase">
          / hello_world
        </h2>

        <h1 className="text-white text-7xl md:text-[6rem] font-black leading-[0.95] tracking-tighter mb-10 uppercase select-none">
          DƯƠNG <br /> HÙNG PHONG
        </h1>

        <p className="text-slate-400 text-lg md:text-xl max-w-2xl leading-relaxed mb-12">
          {PERSONAL_INFO.summary}
        </p>

        <div className="flex flex-wrap gap-5">
          <button className="bg-[#135bec] hover:bg-blue-700 text-white px-10 py-5 rounded-2xl font-bold text-sm transition-all shadow-xl shadow-blue-500/20 active:scale-95">
            View Portfolio
          </button>
          <button className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-10 py-5 rounded-2xl font-bold text-sm transition-all backdrop-blur-md active:scale-95">
            Contact Me
          </button>
        </div>
      </div>
    </section>
  );
}