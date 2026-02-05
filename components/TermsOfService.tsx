
import React from 'react';

interface TermsOfServiceProps {
  onNavigateHome?: () => void;
}

const TermsOfService: React.FC<TermsOfServiceProps> = ({ onNavigateHome }) => {
  const sections = [
    {
      id: '01',
      title: 'Agreement to Terms',
      content: 'By accessing or using the Veilux platform, you agree to be bound by these legal terms. Our system uses advanced neural heuristics; your continued interaction constitutes acceptance of the algorithmic governance described herein.'
    },
    {
      id: '02',
      title: 'Neural Integrity',
      content: 'Users are prohibited from attempting to reverse-engineer the Gemini-powered logic models. Any attempt to exploit or manipulate the AI-driven audit results will lead to immediate termination of service access.'
    },
    {
      id: '03',
      title: 'Data Governance',
      content: 'Your code artifacts are processed with AES-256 grade encryption. While we provide heuristic analysis, the security and performance responsibility of the deployed code remains with the architect.'
    },
    {
      id: '04',
      title: 'Subscription Scaling',
      content: 'Billing cycles are processed automatically via our enterprise grid. Custom enterprise licenses may involve separate SLA guarantees beyond these standard operational protocols.'
    },
    {
      id: '05',
      title: 'Limitation of Liability',
      content: 'Veilux provides "best-effort" heuristic audits. We do not guarantee bug-free deployments and shall not be liable for system failures resulting from code reviewed through our interface.'
    }
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-40 relative z-10">
        <div className="flex flex-col items-center text-center">
          <div className="text-label mb-8 inline-block">LEGAL_PROTOCOL // 04</div>
          <h1 className="text-6xl md:text-[10rem] font-display font-bold text-white tracking-tighter leading-[0.8] uppercase italic mb-12 stiff-shadow">
            TERMS OF <br /> <span className="gradient-text">SERVICE.</span>
          </h1>
          <p className="text-gray-400 text-xl md:text-2xl max-w-3xl font-light leading-relaxed tracking-tight">
            Last Updated: Solar Cycle 2024.03.12 // Version 2.0.4.
          </p>
        </div>
      </div>

      {/* Content Grid */}
      <div className="border-y border-white/5 bg-[#050505]/50 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-6 py-40">
          <div className="space-y-32">
            {sections.map((section, idx) => (
              <div key={idx} className="grid grid-cols-1 lg:grid-cols-12 gap-12 group">
                <div className="lg:col-span-4">
                  <div className="flex items-center gap-6">
                    <div className="text-3xl font-display font-bold text-indigo-500/40 group-hover:text-indigo-500 transition-colors">{section.id}</div>
                    <div className="h-px flex-1 bg-white/5" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white mt-4 uppercase tracking-tight italic">{section.title}</h3>
                </div>
                <div className="lg:col-span-8">
                  <p className="text-gray-500 text-lg font-light leading-relaxed">
                    {section.content}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-40 text-center">
             <button 
              onClick={onNavigateHome}
              className="px-12 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-sm font-black text-[10px] tracking-[0.4em] uppercase hover:scale-105 transition-all shadow-2xl shadow-indigo-500/20 active:scale-95"
            >
              ACKNOWLEDGE & RETURN
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Shards */}
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[140px] pointer-events-none" />
    </div>
  );
};

export default TermsOfService;
