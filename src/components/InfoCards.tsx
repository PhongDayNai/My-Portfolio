import { PERSONAL_INFO } from '@/constants';
import { GraduationCap, MapPin, Mail, Phone } from 'lucide-react';

export default function InfoCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      <div className="md:col-span-2 p-8 rounded-3xl border border-white/5 bg-[#1e293b]/30 backdrop-blur-md">
        <h4 className="text-blue-500 font-mono text-sm mb-4">/ about_me</h4>
        <p className="text-slate-300 leading-relaxed text-lg">
          {PERSONAL_INFO.summary}
        </p>
        <div className="grid grid-cols-2 gap-4 mt-6 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-blue-500" /> {PERSONAL_INFO.location}
          </div>
          <div className="flex items-center gap-2">
            <Mail size={16} className="text-blue-500" /> {PERSONAL_INFO.email}
          </div>
        </div>
      </div>

      <div className="p-8 rounded-3xl border border-white/5 bg-[#1e293b]/30 flex flex-col justify-between">
        <div>
          <GraduationCap className="text-blue-500 mb-4" size={32} />
          <h4 className="font-bold text-xl text-white">Thủy Lợi University</h4>
          <p className="text-slate-500 text-sm">Bachelor of IT (2022 - Present)</p>
        </div>
        <div className="mt-6">
          <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Current GPA</p>
          <p className="text-5xl font-black text-blue-500">3.17<span className="text-xl text-slate-600">/4.0</span></p>
        </div>
      </div>
    </div>
  );
}