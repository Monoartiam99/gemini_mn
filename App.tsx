
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import AboutUs from './components/AboutUs';
import Reviewer from './components/Reviewer';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import Contact from './components/Contact';
import Background3D from './components/Background3D';
import AuthModal from './components/AuthModal';
import TermsOfService from './components/TermsOfService';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<'home' | 'contact' | 'about' | 'terms'>('home');
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [authModal, setAuthModal] = useState<{ open: boolean; mode: 'login' | 'signup' }>({
    open: false,
    mode: 'login'
  });

  // Scroll to top when toggling views
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [isAuthenticated, currentView]);

  // Handle scroll visibility for the scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const navigateToSection = (id: string) => {
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const openAuth = (mode: 'login' | 'signup') => setAuthModal({ open: true, mode });
  const closeAuth = () => setAuthModal(prev => ({ ...prev, open: false }));

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => setIsAuthenticated(false);

  const ScrollTopButton = () => (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-10 right-10 z-[150] w-14 h-14 iso-card rounded-full border-indigo-500/30 flex items-center justify-center text-white transition-all duration-500 hover:scale-110 active:scale-95 group ${
        showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
      }`}
      aria-label="Scroll to top"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
      <svg className="w-6 h-6 transition-transform group-hover:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );

  return (
    <div className="min-h-screen bg-black selection:bg-indigo-500/30 relative">
      <Background3D />
      <Navbar 
        isScrolled={true} 
        isAuthenticated={isAuthenticated} 
        onLogout={handleLogout} 
        onNavigateHome={() => setCurrentView('home')}
        onNavigateContact={() => setCurrentView('contact')}
        onNavigateSection={(id) => {
           if (id === 'about') setCurrentView('about');
           else if (id === 'terms') setCurrentView('terms');
           else navigateToSection(id);
        }}
        onOpenAuth={openAuth}
      />
      
      <main className="relative z-10">
        {isAuthenticated ? (
          <div className="pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-6 mb-12">
              <div className="text-label mb-4">ACTIVE_SESSION // 01</div>
              <h1 className="text-4xl md:text-6xl font-display font-bold text-white uppercase tracking-tighter italic">
                CENTRAL <span className="gradient-text">COMMAND.</span>
              </h1>
              <p className="text-gray-500 mt-4 max-w-2xl font-light">
                Neural interface active. Code artifacts are ready for multi-dimensional heuristic analysis.
              </p>
            </div>
            <Reviewer />
          </div>
        ) : currentView === 'home' ? (
          <>
            <section id="hero" className="border-b border-white/5">
              <Hero onGetStarted={() => openAuth('signup')} />
            </section>
            <section id="features" className="py-32 border-b border-white/5 bg-[#050505]/50 backdrop-blur-sm">
              <Features />
            </section>
            <section id="about" className="py-32 border-b border-white/5">
              <AboutUs />
            </section>
            <section id="pricing" className="py-32 bg-[#050505]/50 backdrop-blur-sm">
              <Pricing />
            </section>
          </>
        ) : currentView === 'about' ? (
          <section id="about-page" className="py-24 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <AboutUs onNavigateHome={() => setCurrentView('home')} />
          </section>
        ) : currentView === 'terms' ? (
          <section id="terms-page" className="py-24 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <TermsOfService onNavigateHome={() => setCurrentView('home')} />
          </section>
        ) : (
          <section id="contact" className="py-24 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <Contact />
          </section>
        )}
      </main>

      <ScrollTopButton />
      <Footer 
        onNavigateContact={() => setCurrentView('contact')} 
        onNavigateAbout={() => setCurrentView('about')}
        onNavigateTerms={() => setCurrentView('terms')}
      />

      <AuthModal 
        isOpen={authModal.open} 
        onClose={closeAuth} 
        initialMode={authModal.mode}
        onAuthSuccess={() => {
          handleLogin();
          closeAuth();
        }}
      />
    </div>
  );
};

export default App;
