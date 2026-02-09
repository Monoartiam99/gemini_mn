
import React, { useState, useEffect } from 'react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess?: () => void;
  initialMode?: 'login' | 'signup';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onAuthSuccess, initialMode = 'login' }) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    company: ''
  });

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      // Prevent scrolling when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Authenticating via ${mode}:`, formData);
    onAuthSuccess?.();
  };

  const handleGoogleSignIn = () => {
    console.log('Initiating Google OAuth Protocol');
    onAuthSuccess?.();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-xl transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-lg transition-all duration-300 transform scale-100 opacity-100">
        {/* Colorful Glow Effect for Signup */}
        <div className={`absolute -inset-1 rounded-2xl blur opacity-30 transition-all duration-700 ${mode === 'signup' ? 'bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500' : 'bg-indigo-500'}`} />
        
        <div className="relative iso-card rounded-2xl overflow-hidden border-white/10 shadow-[0_0_100px_rgba(99,102,241,0.2)] bg-[#0a0a0a]">
          
          {/* Header */}
          <div className="bg-white/5 px-10 py-8 border-b border-white/5 flex items-center justify-between">
            <div>
              <div className={`text-label mb-2 ${mode === 'signup' ? 'text-purple-400' : 'text-indigo-500'}`}>
                {mode === 'login' ? 'ACCESS_TERMINAL // 01' : 'CORE_REGISTRATION // 02'}
              </div>
              <h2 className="text-3xl font-display font-bold text-white uppercase tracking-tighter italic">
                {mode === 'login' ? 'Welcome Back' : 'Join Platform'}
              </h2>
            </div>
            <button 
              onClick={onClose}
              className="w-10 h-10 rounded-sm border border-white/10 flex items-center justify-center text-gray-500 hover:text-white transition-all hover:bg-white/5 hover:border-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50"
              aria-label="Close Modal"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Form Content */}
          <div className="p-10 space-y-8">
            {/* Social Authentication */}
            <div className="space-y-4">
              <button 
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center gap-4 bg-white/5 border border-white/10 hover:border-indigo-500/50 hover:bg-indigo-500/5 text-white py-4 rounded-sm transition-all group relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <svg className="w-5 h-5 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] group-hover:text-indigo-400">Continue with Google</span>
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-white/5" />
              <span className="text-[8px] font-black text-gray-700 tracking-[0.4em] uppercase">OR_SUBMIT_CREDENTIALS</span>
              <div className="h-px flex-1 bg-white/5" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                {mode === 'signup' && (
                  <div className="space-y-2 group">
                    <label className="text-label text-gray-500 text-[8px] group-focus-within:text-purple-400 transition-colors">FULL_NAME</label>
                    <input 
                      type="text"
                      required
                      placeholder="Enter full identity..."
                      className="w-full bg-white/5 border border-white/10 rounded-sm px-5 py-4 text-sm text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 focus:bg-purple-500/10 transition-all placeholder:text-gray-800"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                )}

                <div className="space-y-2 group">
                  <label className={`text-label text-gray-500 text-[8px] transition-colors ${mode === 'signup' ? 'group-focus-within:text-purple-400' : 'group-focus-within:text-indigo-400'}`}>EMAIL_ADDRESS</label>
                  <input 
                    type="email"
                    required
                    placeholder="name@company.com"
                    className={`w-full bg-white/5 border border-white/10 rounded-sm px-5 py-4 text-sm text-white focus:outline-none transition-all placeholder:text-gray-800 ${mode === 'signup' ? 'focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 focus:bg-purple-500/10' : 'focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 focus:bg-indigo-500/10'}`}
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                <div className="space-y-2 group">
                  <div className="flex justify-between items-center">
                    <label className={`text-label text-gray-500 text-[8px] transition-colors ${mode === 'signup' ? 'group-focus-within:text-purple-400' : 'group-focus-within:text-indigo-400'}`}>SECURE_PASSWORD</label>
                    {mode === 'login' && (
                      <button type="button" className="text-[8px] font-black text-indigo-500/60 uppercase tracking-widest hover:text-indigo-400 focus:outline-none focus:text-indigo-400">Recovery?</button>
                    )}
                  </div>
                  <input 
                    type="password"
                    required
                    placeholder="••••••••••••"
                    className={`w-full bg-white/5 border border-white/10 rounded-sm px-5 py-4 text-sm text-white focus:outline-none transition-all placeholder:text-gray-800 ${mode === 'signup' ? 'focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 focus:bg-purple-500/10' : 'focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 focus:bg-indigo-500/10'}`}
                    value={formData.password}
                    onChange={e => setFormData({...formData, password: e.target.value})}
                  />
                </div>
              </div>

              <div className="relative group">
                <div className={`absolute -inset-1 rounded-sm blur opacity-20 group-hover:opacity-60 transition-opacity ${mode === 'signup' ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-indigo-600'}`} />
                <button 
                  type="submit"
                  className={`relative w-full py-5 rounded-sm font-black text-[10px] tracking-[0.4em] uppercase transition-all shadow-xl active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-black ${
                    mode === 'signup' 
                      ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-purple-500/20' 
                      : 'bg-gradient-to-r from-indigo-700 to-indigo-600 text-white shadow-indigo-500/20'
                  }`}
                >
                  {mode === 'login' ? 'ESTABLISH_CONNECTION' : 'INITIALIZE_ACCOUNT'}
                </button>
              </div>

              <div className="text-center">
                <button 
                  type="button"
                  onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                  className={`text-[9px] font-black uppercase tracking-[0.2em] transition-colors focus:outline-none focus:ring-1 focus:ring-white/20 rounded-sm px-2 py-1 ${mode === 'signup' ? 'text-indigo-400 hover:text-indigo-300 underline underline-offset-4' : 'text-purple-400 hover:text-purple-300 underline underline-offset-4'}`}
                >
                  {mode === 'login' ? "Don't have an account? Join Now" : "Already a member? Login"}
                </button>
              </div>
            </form>
          </div>

          {/* Footer branding */}
          <div className="px-10 py-6 bg-black border-t border-white/5 flex items-center justify-center gap-2">
            <div className={`w-4 h-4 border rounded-sm flex items-center justify-center text-[7px] font-bold shadow-[0_0_5px_rgba(99,102,241,0.3)] ${mode === 'signup' ? 'border-purple-500/40 text-purple-400' : 'border-indigo-500/40 text-indigo-400'}`}>V</div>
            <span className="text-[8px] font-black text-gray-700 tracking-[0.3em] uppercase">VEILUX_ENCRYPTION_LAYER_ACTIVE</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
