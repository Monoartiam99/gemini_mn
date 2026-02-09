
import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="mb-40">
        <div className="text-label mb-8 inline-block">OUR_STORY // 01</div>
        <h2 className="text-5xl md:text-[10rem] font-display font-bold mb-16 text-white tracking-[-0.06em] leading-[0.8] uppercase stiff-shadow">
          INNOVATE <br /> 
          <span className="gradient-text">TOGETHER.</span>
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <p className="text-gray-300 text-2xl font-light leading-snug tracking-tight">
            We started with a simple goal: to help SaaS businesses grow by making code review accessible, intelligent, and incredibly fast.
          </p>
          <div className="border-l border-white/10 pl-10">
            <p className="text-gray-500 text-lg font-normal leading-relaxed mb-6">
              Veilux is built by developers, for developers. We believe that great software shouldn't be held back by slow processes. Our platform empowers teams to maintain high standards without sacrificing velocity.
            </p>
            <div className="text-label text-indigo-500/60">MADE FOR SCALE // BUILT FOR TEAMS</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 border border-white/10 rounded-xl overflow-hidden mb-40">
        <div className="bg-black/40 backdrop-blur-sm p-14 group hover:bg-indigo-500/[0.03] transition-all duration-500">
          <div className="text-label text-indigo-500/40 mb-8">01. EMPOWER</div>
          <h4 className="text-3xl font-display font-bold text-white mb-6 uppercase tracking-tighter italic">TEAM GROWTH</h4>
          <p className="text-gray-500 text-base leading-relaxed font-light">
            We give your developers the tools they need to mentor each other through automated, high-quality feedback loops.
          </p>
        </div>
        <div className="bg-black/40 backdrop-blur-sm p-14 group hover:bg-indigo-500/[0.03] transition-all duration-500">
          <div className="text-label text-indigo-500/40 mb-8">02. SCALE</div>
          <h4 className="text-3xl font-display font-bold text-white mb-6 uppercase tracking-tighter italic">FUTURE READY</h4>
          <p className="text-gray-500 text-base leading-relaxed font-light">
            Whether you're a startup or an enterprise, our infrastructure scales with you, handling millions of lines with ease.
          </p>
        </div>
        <div className="bg-black/40 backdrop-blur-sm p-14 group hover:bg-indigo-500/[0.03] transition-all duration-500">
          <div className="text-label text-indigo-500/40 mb-8">03. SUCCEED</div>
          <h4 className="text-3xl font-display font-bold text-white mb-6 uppercase tracking-tighter italic">ONE SOLUTION</h4>
          <p className="text-gray-500 text-base leading-relaxed font-light">
            Consolidate your stack. One platform for security, performance, and style audits across all your repositories.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-16 border-t border-white/10 pt-32">
        <div>
          <div className="text-6xl font-display font-bold text-white mb-3 tracking-tighter italic">10K<span className="text-indigo-500 text-4xl leading-none">+</span></div>
          <div className="text-label text-gray-600">TEAMS_MANAGED</div>
        </div>
        <div>
          <div className="text-6xl font-display font-bold text-white mb-3 tracking-tighter italic">98<span className="text-indigo-500 text-4xl leading-none">%</span></div>
          <div className="text-label text-gray-600">CLIENT_RETENTION</div>
        </div>
        <div>
          <div className="text-6xl font-display font-bold text-white mb-3 tracking-tighter italic">24/7</div>
          <div className="text-label text-gray-600">GLOBAL_SUPPORT</div>
        </div>
        <div>
          <div className="text-6xl font-display font-bold text-white mb-3 tracking-tighter italic">1.2B<span className="text-indigo-500 text-4xl leading-none">+</span></div>
          <div className="text-label text-gray-600">SUCCESSFUL_BUILDS</div>
        </div>
      </div>

      <div className="absolute top-1/2 -right-64 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[160px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 -left-64 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[160px] -z-10 pointer-events-none" />
    </div>
  );
};

export default AboutUs;
