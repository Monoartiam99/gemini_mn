
import React from 'react';

const PricingCard: React.FC<{
  title: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}> = ({ title, price, description, features, isPopular }) => (
  <div className={`relative iso-card p-12 rounded-2xl flex flex-col h-full transition-all duration-700 hover:-translate-y-4 ${isPopular ? 'border-indigo-500/40 shadow-[0_20px_80px_rgba(99,102,241,0.1)]' : ''}`}>
    {isPopular && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-6 py-2 rounded-full text-[9px] font-black tracking-[0.3em] uppercase shadow-[0_10px_40px_rgba(79,70,229,0.4)] z-20">
        BEST VALUE
      </div>
    )}
    
    <div className="mb-12 relative z-10">
      <h3 className="text-3xl font-display font-bold text-white mb-3 tracking-tighter uppercase italic">{title}</h3>
      <p className="text-gray-500 text-[14px] leading-relaxed font-light">{description}</p>
    </div>

    <div className="mb-12 flex items-baseline gap-3 relative z-10">
      <span className="text-6xl font-display font-extrabold text-white tracking-[-0.08em] italic">{price}</span>
      <span className="text-label text-gray-600">{price === 'Custom' ? '' : '/ MO'}</span>
    </div>

    <div className="h-px w-full bg-white/10 mb-12" />

    <ul className="space-y-5 mb-16 flex-grow relative z-10">
      {features.map((feature, idx) => (
        <li key={idx} className="flex items-start gap-4 text-[13px] text-gray-400 group">
          <div className="w-5 h-5 border border-indigo-500/30 flex items-center justify-center mt-0.5 rounded-sm transition-all group-hover:bg-indigo-500/10">
            <svg className="w-3 h-3 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <span className="font-light tracking-tight">{feature}</span>
        </li>
      ))}
    </ul>

    <button className={`w-full py-5 rounded-sm font-black text-[10px] tracking-[0.3em] uppercase transition-all transform active:scale-95 z-10 ${
      isPopular ? 'bg-white text-black hover:bg-indigo-600 hover:text-white' : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
    }`}>
      {price === 'Custom' ? 'CONTACT SALES' : 'START FREE TRIAL'}
    </button>
  </div>
);

export default function Pricing() {
  return (
    <div className="max-w-7xl mx-auto px-6 relative py-40">
      <div className="text-center mb-32 relative z-10">
        <div className="text-label mb-8 inline-block">FLEXIBLE_PLANS // 03</div>
        <h2 className="text-5xl md:text-[8rem] font-display font-bold mb-12 text-white tracking-[-0.06em] leading-[0.8] uppercase stiff-shadow">
          READY TO <br/> <span className="gradient-text">GROW?</span>
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto text-xl font-light leading-relaxed tracking-tight">
          Choose the perfect plan for your business. <br/> From solo developers to massive engineering teams.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
        <PricingCard 
          title="BASIC"
          price="$0"
          description="Everything you need to get started with your first project."
          features={[
            "Standard Gemini Review",
            "Up to 5 Projects",
            "Core Security Audit",
            "Community Support",
            "Weekly Reports"
          ]}
        />
        <PricingCard 
          title="BUSINESS"
          isPopular
          price="$49"
          description="Scale your SaaS with powerful team management and advanced audits."
          features={[
            "Pro Gemini Intelligence",
            "Unlimited Projects",
            "Advanced Team Roles",
            "Deep Performance Tuning",
            "Priority Support",
            "Custom Rule Sets"
          ]}
        />
        <PricingCard 
          title="ULTIMATE"
          price="Custom"
          description="The complete solution for large scale systems and enterprise security."
          features={[
            "Dedicated Support",
            "Custom AI Training",
            "White-label Reports",
            "SLA Guarantees",
            "SSO Integration",
            "Expert Audit Review"
          ]}
        />
      </div>
    </div>
  );
}
