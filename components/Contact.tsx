
import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
        
        {/* Left Column: Info & Context */}
        <div className="lg:col-span-5 space-y-12">
          <div>
            <div className="text-label text-indigo-500 mb-6">ESTABLISH_COMMUNICATION // 04</div>
            <h2 className="text-5xl md:text-7xl font-display font-bold text-white tracking-tighter uppercase leading-[0.9] italic mb-8">
              GET IN <br /><span className="gradient-text">TOUCH.</span>
            </h2>
            <p className="text-gray-500 text-lg font-light leading-relaxed max-w-md">
              Have a question about our neural review protocols? Our team of architects is standing by to assist with your integration.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-6 p-6 iso-card rounded-xl border-white/5 hover:border-indigo-500/30 transition-all group">
              <div className="w-12 h-12 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              </div>
              <div>
                <div className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1">EMAIL_ENVOY</div>
                <div className="text-white font-medium">support@veilux.io</div>
              </div>
            </div>

            <div className="flex items-center gap-6 p-6 iso-card rounded-xl border-white/5 hover:border-purple-500/30 transition-all group">
              <div className="w-12 h-12 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.048-.32 13.572.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>
              </div>
              <div>
                <div className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1">DISCORD_NODE</div>
                <div className="text-white font-medium">Veilux HQ</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="lg:col-span-7 relative">
          <div className="absolute -inset-1 bg-gradient-to-br from-indigo-500/20 to-purple-600/20 rounded-2xl blur-2xl opacity-50" />
          
          <div className="relative iso-card rounded-2xl p-10 border-white/10">
            {submitted ? (
              <div className="py-20 text-center animate-in zoom-in-95 duration-500">
                <div className="w-20 h-20 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
                  <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                </div>
                <h3 className="text-3xl font-display font-bold text-white mb-4 italic uppercase">Message Received</h3>
                <p className="text-gray-500 font-light">Your transmission has been logged. Expect a response within one stellar cycle.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2 group">
                    <label className="text-label text-gray-600 group-focus-within:text-indigo-400 transition-colors">IDENTIFIER</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Your Name"
                      className="w-full bg-white/5 border border-white/10 rounded-sm px-6 py-4 text-white focus:outline-none focus:border-indigo-500/50 focus:bg-indigo-500/5 transition-all placeholder:text-gray-800"
                    />
                  </div>
                  <div className="space-y-2 group">
                    <label className="text-label text-gray-600 group-focus-within:text-indigo-400 transition-colors">RETURN_ADDRESS</label>
                    <input 
                      type="email" 
                      required 
                      placeholder="email@example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-sm px-6 py-4 text-white focus:outline-none focus:border-indigo-500/50 focus:bg-indigo-500/5 transition-all placeholder:text-gray-800"
                    />
                  </div>
                </div>

                <div className="space-y-2 group">
                  <label className="text-label text-gray-600 group-focus-within:text-purple-400 transition-colors">SUBJECT_TAG</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-sm px-6 py-4 text-white focus:outline-none focus:border-purple-500/50 focus:bg-purple-500/5 transition-all appearance-none cursor-pointer">
                    <option className="bg-black">Technical Integration</option>
                    <option className="bg-black">Enterprise Licensing</option>
                    <option className="bg-black">Security Bounty</option>
                    <option className="bg-black">General Inquiry</option>
                  </select>
                </div>

                <div className="space-y-2 group">
                  <label className="text-label text-gray-600 group-focus-within:text-indigo-400 transition-colors">MESSAGE_PAYLOAD</label>
                  <textarea 
                    required 
                    rows={6}
                    placeholder="Briefly describe your requirements..."
                    className="w-full bg-white/5 border border-white/10 rounded-sm px-6 py-4 text-white focus:outline-none focus:border-indigo-500/50 focus:bg-indigo-500/5 transition-all placeholder:text-gray-800 resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-6 rounded-sm bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black text-[11px] tracking-[0.4em] uppercase hover:from-indigo-500 hover:to-purple-500 transition-all shadow-xl shadow-indigo-500/10 active:scale-[0.98]"
                >
                  SEND_TRANSMISSION
                </button>

                <div className="flex items-center justify-center gap-4 py-4 opacity-30">
                  <div className="w-2 h-2 rounded-full bg-indigo-500" />
                  <span className="text-[9px] font-black tracking-widest text-gray-500 uppercase">ENCRYPTION: AES-256 ACTIVE</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
