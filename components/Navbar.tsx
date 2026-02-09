
import React from 'react';

interface NavbarProps {
  isScrolled: boolean;
  isAuthenticated: boolean;
  onLogout?: () => void;
  onNavigateHome?: () => void;
  onNavigateContact?: () => void;
  onNavigateSection?: (id: string) => void;
  onOpenAuth?: (mode: 'login' | 'signup') => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  isAuthenticated, 
  onLogout, 
  onNavigateHome, 
  onNavigateContact,
  onNavigateSection,
  onOpenAuth
}) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-white/10 bg-black/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={onNavigateHome}
        >
          <div className="w-6 h-6 border-2 border-indigo-600 flex items-center justify-center font-black text-[10px] text-white group-hover:bg-indigo-600 transition-all shadow-[0_0_10px_rgba(99,102,241,0.5)]">V</div>
          <span className="text-sm font-display font-bold tracking-[0.3em] text-white uppercase group-hover:text-indigo-400 transition-colors">VEILUX</span>
        </div>

        {!isAuthenticated && (
          <div className="hidden md:flex items-center gap-10">
            <button 
              onClick={onNavigateHome} 
              className="text-[10px] font-black text-gray-500 hover:text-white uppercase tracking-widest transition-colors"
            >
              Home
            </button>
            {['Features', 'Pricing'].map(item => (
              <button 
                key={item} 
                onClick={() => onNavigateSection?.(item.toLowerCase())}
                className="text-[10px] font-black text-gray-500 hover:text-white uppercase tracking-widest transition-colors"
              >
                {item}
              </button>
            ))}
            <button 
              onClick={onNavigateContact} 
              className="text-[10px] font-black text-gray-500 hover:text-white uppercase tracking-widest transition-colors"
            >
              Contact
            </button>
          </div>
        )}

        <div className="flex items-center gap-6">
          {!isAuthenticated ? (
            <>
              <button 
                onClick={() => onOpenAuth?.('login')}
                className="group relative px-6 py-2 rounded-sm overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/5 transition-colors group-hover:bg-white/10" />
                <div className="absolute inset-0 border border-white/10 group-hover:border-indigo-500/50 transition-colors" />
                <span className="relative text-[10px] font-black text-gray-400 group-hover:text-white uppercase tracking-widest transition-colors">
                  Login
                </span>
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </button>

              <button 
                onClick={() => onOpenAuth?.('signup')}
                className="relative group px-8 py-2.5 rounded-sm overflow-hidden"
              >
                {/* Vibrant Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 group-hover:scale-110 transition-transform duration-500" />
                
                {/* Glow Effect */}
                <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(255,255,255,0.2)]" />
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-pink-500 blur-md opacity-40 group-hover:opacity-100 transition-opacity" />
                
                <span className="relative text-[10px] font-black text-white uppercase tracking-[0.2em] drop-shadow-sm">
                  Join Platform
                </span>
                
                {/* Animated Shine */}
                <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] group-hover:left-full transition-all duration-700 ease-in-out" />
              </button>
            </>
          ) : (
            <>
              <div className="hidden md:flex items-center gap-8 mr-4">
                <span className="text-[9px] font-black text-indigo-500 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1 h-1 bg-indigo-500 rounded-full animate-pulse" />
                  Architect Mode Active
                </span>
              </div>
              <button 
                onClick={onLogout}
                className="text-[10px] font-black text-gray-500 hover:text-red-400 uppercase tracking-widest transition-colors"
              >
                Log Out
              </button>
              <div className="w-10 h-10 rounded-full border border-indigo-500/30 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center text-[10px] font-bold text-white shadow-[0_0_15px_rgba(99,102,241,0.2)]">JD</div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
