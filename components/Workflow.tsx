
import React, { useState, useEffect, useRef } from 'react';

const WorkflowStep: React.FC<{
  num: string;
  title: string;
  desc: string;
  isActive: boolean;
  onHover: () => void;
  icon: React.ReactNode;
  progress: number;
}> = ({ num, title, desc, isActive, onHover, icon, progress }) => {
  // Calculate a 3D rotation based on position in the scroll
  const tilt = (progress - 0.5) * 20; 
  const scale = isActive ? 1.05 : 0.9;
  const opacity = isActive ? 1 : 0.3;

  return (
    <div 
      onMouseEnter={onHover}
      className="relative shrink-0 w-[85vw] md:w-[500px] h-[450px] transition-all duration-700 ease-out preserve-3d"
      style={{ 
        transform: `perspective(1000px) rotateY(${tilt}deg) scale(${scale})`,
        opacity: opacity,
        zIndex: isActive ? 50 : 10
      }}
    >
      <div className={`iso-card h-full p-10 rounded-3xl border-white/5 flex flex-col justify-between overflow-hidden group/card ${isActive ? 'border-indigo-500/40 shadow-[0_0_50px_rgba(99,102,241,0.15)]' : ''}`}>
        {/* Animated Scanner Line for active step */}
        {isActive && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent absolute top-0 animate-[scan_3s_linear_infinite]" />
          </div>
        )}

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-10">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/40' : 'bg-white/5 text-gray-600'}`}>
              {icon}
            </div>
            <div className="text-[10px] font-black text-indigo-500/40 tracking-[0.4em]">PHASE_{num}</div>
          </div>
          
          <h4 className="text-3xl font-display font-bold text-white uppercase italic tracking-tighter mb-6 group-hover/card:text-indigo-400 transition-colors">
            {title}
          </h4>
          <p className="text-gray-500 text-lg font-light leading-relaxed">
            {desc}
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-4">
          <div className={`h-1 flex-1 rounded-full overflow-hidden bg-white/5`}>
            <div className={`h-full bg-indigo-500 transition-all duration-1000 ${isActive ? 'w-full' : 'w-0'}`} />
          </div>
          <span className="text-[8px] font-black text-gray-700 tracking-widest">READY</span>
        </div>

        {/* Decorative corner elements */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-indigo-500/5 to-transparent pointer-events-none" />
        <div className="absolute bottom-4 right-4 opacity-10">
          <div className="w-8 h-8 border-r border-b border-indigo-500" />
        </div>
      </div>
    </div>
  );
};

const Workflow: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollY = -rect.top;
      const height = rect.height - window.innerHeight;
      const progress = Math.min(Math.max(scrollY / height, 0), 1);
      setScrollProgress(progress);
      
      const stepIndex = Math.min(Math.floor(progress * 6), 5);
      setActiveStep(stepIndex);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const steps = [
    {
      num: '01',
      title: 'Structural Digest',
      desc: 'Our engine parses abstract syntax trees, breaking down your logic into quantifiable nodes for deep semantic inspection.',
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
    },
    {
      num: '02',
      title: 'Neural Mapping',
      desc: 'Gemini models contextualize your artifacts, cross-referencing with global security databases and performance benchmarks.',
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 20l-5.447-2.724A2 2 0 013 15.485V5.515a2 2 0 011.553-1.943L9 2l5.447 2.724A2 2 0 0116 6.669V16.33a2 2 0 01-1.553 1.943L9 20zm0 0V9" /></svg>
    },
    {
      num: '03',
      title: 'Risk Filtration',
      desc: 'Automated triage isolates false positives, highlighting only critical architectural flaws that require immediate human oversight.',
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
    },
    {
      num: '04',
      title: 'Refactor Synth',
      desc: 'Intelligence-driven suggestions offer line-by-line optimizations, rewriting modules for maximum concurrency and scale.',
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
    },
    {
      num: '05',
      title: 'Compliance Check',
      desc: 'A rigorous verification layer ensures your code meets ISO, SOC2, and proprietary organizational standards automatically.',
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04" /></svg>
    },
    {
      num: '06',
      title: 'Final Inception',
      desc: 'The optimized codebase is signed with a neural checksum, ready for deployment into your production clusters.',
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7" /></svg>
    }
  ];

  // The horizontal movement range
  const translateX = scrollProgress * -75;

  return (
    <div ref={containerRef} className="relative h-[500vh]">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden bg-black/40">
        
        {/* Parallax Background Grid Elements */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div 
            className="absolute top-0 left-0 w-[200%] h-full flex"
            style={{ transform: `translateX(${scrollProgress * -20}%)` }}
          >
            {[...Array(20)].map((_, i) => (
              <div key={i} className="flex-1 border-r border-indigo-500/10 h-full flex items-center justify-center">
                <span className="text-[150px] font-black text-indigo-500/5 select-none">{i.toString().padStart(2, '0')}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 w-full relative z-10 mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <div className="text-label text-indigo-500 mb-6 flex items-center gap-4">
                <span className="w-12 h-[1px] bg-indigo-500/30" />
                SYSTEM_PIPELINE // AUDIT_FLOW
              </div>
              <h2 className="text-6xl md:text-8xl font-display font-bold text-white uppercase tracking-tighter italic leading-[0.8]">
                NEURAL <br /> <span className="gradient-text">PROCESSING.</span>
              </h2>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="text-[10px] font-black text-gray-600 tracking-[0.5em] uppercase">Status: Automated</div>
              <div className="flex gap-1">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className={`w-12 h-1 rounded-full transition-all duration-500 ${activeStep === i ? 'bg-indigo-500' : 'bg-white/10'}`} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* The Pipeline Strip */}
        <div className="relative py-12 w-full perspective-[2000px]">
          {/* Data Flow Line Background */}
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-indigo-500/20 -translate-y-1/2" />
          
          <div 
            className="flex gap-16 px-[10vw] transition-transform duration-500 ease-out will-change-transform preserve-3d"
            style={{ transform: `translateX(${translateX}%)` }}
          >
            {steps.map((step, i) => {
              // Calculate specific progress for this card to handle its tilt/scale
              const cardOffset = (i / (steps.length - 1));
              const localProgress = Math.abs(scrollProgress - cardOffset);
              const isActive = activeStep === i;

              return (
                <WorkflowStep 
                  key={i}
                  {...step}
                  isActive={isActive}
                  onHover={() => setActiveStep(i)}
                  progress={1 - Math.min(localProgress * 3, 1)}
                />
              );
            })}
          </div>
        </div>

        {/* Global Progress Legend */}
        <div className="max-w-7xl mx-auto px-6 w-full mt-24 relative z-10 flex items-center justify-between">
          <div className="group cursor-help">
            <div className="text-[10px] font-black text-indigo-500/60 uppercase tracking-widest mb-2 group-hover:text-indigo-400">Pipeline_Integrity</div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-display font-bold text-white tracking-tighter italic">99<span className="text-indigo-500 text-lg">.9%</span></span>
            </div>
          </div>
          <div className="text-right">
             <div className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-2">Current_Phase</div>
             <div className="text-xl font-display font-bold text-white uppercase italic tracking-tight">
               {steps[activeStep].title}
             </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { top: 0; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default Workflow;
