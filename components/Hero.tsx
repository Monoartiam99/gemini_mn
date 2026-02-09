
import React, { useState, useRef, useEffect } from 'react';

interface HeroProps {
  onGetStarted?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -y * 15, y: x * 15 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="pt-48 pb-64 px-6 relative overflow-hidden flex flex-col items-center"
    >
      {/* Parallax Background Blobs */}
      <div 
        className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none z-0"
        style={{ 
          transform: `translateY(${scrollY * 0.15}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      />
      <div 
        className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none z-0"
        style={{ 
          transform: `translateY(${scrollY * -0.1}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      />
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-indigo-500/5 rounded-full blur-[180px] pointer-events-none z-0"
        style={{ 
          transform: `translate(-50%, calc(-50% + ${scrollY * 0.05}px))`,
          transition: 'transform 0.1s ease-out'
        }}
      />

      <div className="max-w-7xl w-full text-center relative z-10 mb-32">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-label animate-in fade-in slide-in-from-top-2 duration-700">
          <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
          ULTIMATE WORKFLOW SOLUTION // v2.0
        </div>

        <h1 className="text-6xl md:text-[9rem] font-display font-bold mb-8 tracking-[-0.05em] leading-[0.85] text-white animate-in fade-in slide-in-from-bottom-2 duration-500 stiff-shadow">
          BOOST YOUR <br />
          <span className="gradient-text">CODE FLOW.</span>
        </h1>
        
        <p className="text-gray-400 text-lg md:text-xl max-w-xl mx-auto mb-16 leading-relaxed font-normal tracking-tight">
          One-stop automated review platform for scaling teams. <br className="hidden md:block" /> 
          Optimize your development cycle with precision intelligence.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button 
            onClick={onGetStarted}
            className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-12 py-5 rounded-sm font-extrabold text-[10px] tracking-[0.3em] uppercase transition-all hover:from-indigo-500 hover:to-purple-500 border border-transparent shadow-2xl shadow-indigo-500/20"
          >
            GET STARTED FREE
          </button>
          <button className="w-full sm:w-auto px-12 py-5 rounded-sm border border-white/10 text-white font-extrabold text-[10px] tracking-[0.3em] uppercase hover:bg-white/5 transition-all">
            VIEW DASHBOARD
          </button>
        </div>
      </div>

      <div className="relative w-full max-w-5xl perspective-3000 preserve-3d z-10">
        <div 
          className="relative w-full aspect-video transition-transform duration-700 ease-out preserve-3d"
          style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
        >
          <div className="absolute inset-0 iso-card rounded-xl border-white/10 overflow-hidden preserve-3d">
            <div className="bg-white/5 px-8 py-5 border-b border-white/10 flex items-center justify-between">
              <div className="flex gap-2.5">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <div className="text-label text-gray-500 font-mono tracking-[0.5em]">WORKFLOW_MANAGER</div>
              <div className="w-12" />
            </div>
            <div className="p-14 font-mono text-base leading-loose tracking-tight selection:bg-indigo-500/30">
              <span className="text-pink-500 font-bold italic drop-shadow-[0_0_8px_rgba(236,72,153,0.4)]">feature</span> 
              <span className="text-yellow-400"> "scaling/automation"</span><br/><br/>
              
              <span className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]">optimize</span> 
              <span className="text-white"> </span>
              <span className="text-indigo-400 font-bold underline underline-offset-4 decoration-indigo-500/30">ReleasePipeline</span>
              <span className="text-gray-400">(build </span>
              <span className="text-emerald-400">*Standard</span>
              <span className="text-gray-400">) &#123;</span><br/>
              
              <span className="text-gray-400">&nbsp;&nbsp;review := veilux.</span>
              <span className="text-purple-400 italic">ProcessAudit</span>
              <span className="text-gray-400">(build)</span><br/>
              
              <span className="text-gray-400">&nbsp;&nbsp;review.</span>
              <span className="text-orange-400">ApplyOptimizations</span>
              <span className="text-gray-400">(</span>
              <span className="text-pink-400">Full_Scale</span>
              <span className="text-gray-400">)</span><br/>
              
              <span className="text-gray-400">&#125;</span>
            </div>
          </div>

          <div 
            className="absolute -top-12 -right-12 w-64 iso-card p-8 rounded-xl border-indigo-500/20 preserve-3d"
            style={{ transform: 'translateZ(80px)' }}
          >
            <div className="text-label text-indigo-400 mb-6">PRODUCTIVITY_METRICS</div>
            <div className="flex items-end gap-1.5 h-14 mb-6">
              {[60, 40, 80, 50, 95, 70, 85, 90].map((h, i) => (
                <div key={i} className="flex-1 bg-indigo-500/10 border border-indigo-500/30" style={{ height: `${h}%` }} />
              ))}
            </div>
            <div className="text-4xl font-display font-bold text-white tracking-tighter">4.5<span className="text-indigo-500">x</span></div>
          </div>

          <div 
            className="absolute -bottom-12 -left-20 w-80 iso-card p-8 rounded-xl border-purple-500/20 preserve-3d"
            style={{ transform: 'translateZ(120px) rotate(-1deg)' }}
          >
            <div className="flex items-center gap-5 mb-6">
              <div className="w-12 h-12 bg-indigo-500/5 border border-indigo-500/20 flex items-center justify-center rounded-lg">
                <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div>
                <div className="text-label text-gray-500 mb-1">SYSTEM_EFFICIENCY</div>
                <div className="text-sm font-bold text-white tracking-tight uppercase">TURBO MODE ACTIVE</div>
              </div>
            </div>
            <div className="h-1.5 w-full bg-white/5 overflow-hidden rounded-full">
               <div className="h-full w-[98%] bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.8)]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
