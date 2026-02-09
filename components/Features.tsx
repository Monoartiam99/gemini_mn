
import React from 'react';

const FeatureCard: React.FC<{ title: string; description: string; delay: string }> = ({ title, description, delay }) => (
  <div 
    className="iso-card p-10 rounded-lg group hover:border-indigo-500/50 transition-all duration-500"
    style={{ animationDelay: delay }}
  >
    <div className="w-8 h-8 border border-indigo-500/40 text-indigo-400 flex items-center justify-center mb-10 group-hover:bg-indigo-500/10 transition-colors">
      <div className="w-1.5 h-1.5 bg-indigo-500" />
    </div>
    <h3 className="text-xl font-display font-bold mb-4 text-white uppercase tracking-tight">{title}</h3>
    <p className="text-gray-500 text-sm leading-relaxed font-light">{description}</p>
  </div>
);

const Features: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
        <div className="max-w-xl">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 uppercase tracking-tighter">Manage Your Success</h2>
          <p className="text-gray-500 leading-relaxed font-light">The all-in-one platform to track, audit, and improve your code. Build better products by focusing on what matters most while we handle the complexity.</p>
        </div>
        <div className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.4em] mb-4">
          POWERFUL TOOLS [03]
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard 
          delay="0s"
          title="Team Management"
          description="Scale your engineering team with centralized quality standards and seamless collaborative feedback."
        />
        <FeatureCard 
          delay="0.1s"
          title="Growth Analytics"
          description="Track your code quality metrics over time and identify key areas for systemic improvement and scale."
        />
        <FeatureCard 
          delay="0.2s"
          title="Smart Automation"
          description="Automate repetitive review tasks so your developers can stay in the flow and ship features faster."
        />
      </div>
    </div>
  );
};

export default Features;
