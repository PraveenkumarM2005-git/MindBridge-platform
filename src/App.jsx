import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogIn, User, Mail, Sparkles, Plus, AlertCircle, LogOut, Search, Calendar, History, ShieldCheck, MessageSquare } from 'lucide-react';
import { supabase } from './supabaseClient';

// Components
import LandingPage from './components/Landing/LandingPage';
import OnboardingFlow from './components/Onboarding/OnboardingFlow';
import MatchScreen from './components/Match/MatchScreen';
import SessionBooking from './components/Session/SessionBooking';
import VoiceGuardian from './components/Guardian/VoiceGuardian';
import BottomNav from './components/Layout/BottomNav';
import LegacyChat from './components/Chat/LegacyChat';

const App = () => {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [screen, setScreen] = useState('landing'); 
  const [activeTab, setActiveTab] = useState('home');
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      
      if (session) {
        await fetchProfile(session.user.id);
      }
      setLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      
      if (session) {
        await fetchProfile(session.user.id);
      } else if (event === 'SIGNED_OUT') {
        setProfile(null);
        setScreen('landing');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error || !data || !data.role) {
        setScreen('onboarding');
      } else {
        setProfile(data);
        setScreen('dashboard');
      }
    } catch (err) {
      console.error("Profile fetch error:", err);
      setScreen('onboarding');
    }
  };

  const handleMagicLink = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    const redirectUrl = window.location.origin;
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectUrl },
    });
    if (error) {
      setMessage({ type: 'error', text: error.message });
    } else {
      setMessage({ type: 'success', text: 'Check your email for the magic link!' });
    }
    setAuthLoading(false);
  };

  const handleGoogleLogin = async () => {
    const redirectUrl = window.location.origin;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { 
        redirectTo: redirectUrl,
        queryParams: { 
          prompt: 'select_account'
        } 
      },
    });
    if (error) {
      setMessage({ type: 'error', text: error.message });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return <div className="min-h-screen bg-linen flex items-center justify-center"><Sparkles className="text-banyan-green animate-pulse" size={48} /></div>;
  }

  const renderHome = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-sage/10 p-8 rounded-[2.5rem] border border-sage/20 shadow-sm transition-all hover:bg-sage/20">
            <div className="text-4xl font-bold text-banyan-green">12</div>
            <div className="text-sm font-bold text-sage uppercase tracking-widest mt-1">Sessions</div>
          </div>
          <div className="bg-terracotta/10 p-8 rounded-[2.5rem] border border-terracotta/20 shadow-sm transition-all hover:bg-terracotta/20">
            <div className="text-4xl font-bold text-terracotta">{profile?.reciprocity_tokens || 0}</div>
            <div className="text-sm font-bold text-terracotta uppercase tracking-widest mt-1">Tokens</div>
          </div>
          <div onClick={() => setScreen('booking')} className="bg-white p-8 rounded-[2.5rem] border-2 border-dashed border-banyan-green/20 flex flex-col items-center justify-center group hover:border-terracotta/40 transition-all cursor-pointer">
             <Plus className="text-banyan-green group-hover:text-terracotta transition-colors" />
             <div className="text-xs font-bold text-banyan-green uppercase mt-2">New Session</div>
          </div>
        </div>

        <section>
          <h3 className="text-sm font-bold text-muted-clay uppercase tracking-[0.2em] mb-6">Live Opportunities</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <button onClick={() => setActiveTab('discover')} className="p-8 bg-white rounded-[2.5rem] border border-banyan-green/5 shadow-sm flex items-center gap-6 text-left group hover:border-terracotta/30 transition-all">
              <div className="bg-sage/10 p-5 rounded-2xl text-sage group-hover:bg-sage group-hover:text-white transition-all"><Search size={28} /></div>
              <div><div className="font-bold text-xl text-banyan-green">Find Mentor</div><div className="text-muted-clay font-medium">Browse skilled peers</div></div>
            </button>
            {profile?.role === 'Senior' && (
              <button onClick={() => setScreen('guardian')} className="p-8 bg-banyan-green text-linen rounded-[2.5rem] flex items-center gap-6 text-left shadow-2xl shadow-banyan-green/30 hover:scale-[1.02] transition-transform">
                <div className="bg-white/10 p-5 rounded-2xl"><ShieldCheck className="text-sage" size={28} /></div>
                <div><div className="font-bold text-xl">Voice Guardian</div><div className="text-linen/70 font-medium">Secure mode enabled</div></div>
              </button>
            )}
          </div>
        </section>
      </div>

      <div className="bg-white p-8 rounded-[3.5rem] border border-banyan-green/5 shadow-xl h-fit sticky top-24">
         <div className="flex items-center gap-3 mb-6">
           <div className="w-12 h-12 bg-sage/10 rounded-2xl flex items-center justify-center text-sage"><Sparkles size={24} /></div>
           <h3 className="text-xl font-heading font-bold text-banyan-green">AI Recommendation</h3>
         </div>
         <p className="text-muted-clay leading-loose italic text-lg">"Based on your recent interest in local history, we recommend matching with <b>Meera Sharma</b> to explore Tanjore Painting techniques."</p>
         <button onClick={() => setActiveTab('discover')} className="mt-8 w-full py-5 bg-banyan-green text-white rounded-2xl font-bold shadow-lg hover:bg-terracotta transition-all">Match Now</button>
      </div>
    </div>
  );

  const renderDiscover = () => (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-5xl font-heading font-black text-banyan-green tracking-tighter">Discover.</h2>
        <div className="flex gap-4">
          <span className="bg-sage/10 text-sage px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest">Heritage</span>
          <span className="bg-linen text-banyan-green px-6 py-2 rounded-full text-sm font-bold border border-banyan-green/10 uppercase tracking-widest">Tech</span>
        </div>
      </div>
      <MatchScreen role={profile?.role} onAccept={() => setActiveTab('chat')} embedded />
    </div>
  );

  const renderSessions = () => (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-5xl font-heading font-black text-banyan-green tracking-tighter">Your Journey.</h2>
        <button onClick={() => setScreen('booking')} className="px-8 py-4 bg-terracotta text-white rounded-2xl font-bold hover:scale-105 active:scale-95 transition-all shadow-lg shadow-terracotta/20">Book New Session</button>
      </div>

      <div className="bg-white p-10 mt-8 rounded-[3rem] border border-banyan-green/5 shadow-xl">
        <h3 className="font-heading font-bold text-2xl text-banyan-green mb-8">Upcoming Sessions</h3>
        <div className="space-y-4">
          <div className="p-6 bg-linen/50 border border-banyan-green/10 rounded-[2rem] flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-sage/5 transition-colors">
             <div className="flex items-center gap-6">
                <div className="w-16 h-16 shrink-0 bg-sage/20 text-sage rounded-2xl flex flex-col items-center justify-center font-bold">
                  <span className="text-xl">14</span><span className="text-[10px] uppercase tracking-widest">Apr</span>
                </div>
                <div>
                   <h4 className="text-xl font-bold text-banyan-green mb-1">Meera Sharma</h4>
                   <p className="text-muted-clay font-medium text-sm">Topic: Introduction to Tanjore Painting</p>
                </div>
             </div>
             <div className="flex gap-3">
                <button className="px-8 py-3 bg-banyan-green text-white rounded-full font-bold text-sm shadow-md hover:bg-terracotta transition-colors">Join Video</button>
             </div>
          </div>
          
          <div className="p-6 bg-linen/30 border border-banyan-green/5 rounded-[2rem] flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-white transition-colors">
             <div className="flex items-center gap-6">
                <div className="w-16 h-16 shrink-0 bg-terracotta/10 text-terracotta rounded-2xl flex flex-col items-center justify-center font-bold">
                  <span className="text-xl">16</span><span className="text-[10px] uppercase tracking-widest">Apr</span>
                </div>
                <div>
                   <h4 className="text-xl font-bold text-banyan-green mb-1">Arjun Patel</h4>
                   <p className="text-muted-clay font-medium text-sm">Topic: Setting up Secure Online Banking</p>
                </div>
             </div>
             <div className="flex gap-3">
                <button className="px-8 py-3 bg-white border border-banyan-green/20 text-banyan-green hover:bg-linen rounded-full font-bold text-sm transition-colors">Reschedule</button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTokens = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="bg-terracotta p-12 md:p-16 rounded-[4rem] text-white shadow-2xl relative overflow-hidden group">
        <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all" />
        <div className="flex items-center gap-3 mb-6 opacity-80"><History size={24} /> <span className="text-sm font-black uppercase tracking-[0.3em]">Reciprocity Balance</span></div>
        <div className="text-9xl font-heading font-black mb-6">{profile?.reciprocity_tokens || 20}</div>
        <p className="text-white/70 text-lg italic max-w-xs leading-relaxed">Pure currency of respect. Earned by sharing, spent by growing.</p>
      </div>
      <div className="bg-white p-10 md:p-12 rounded-[4rem] border border-banyan-green/5 shadow-xl flex flex-col">
        <h3 className="font-heading font-black text-3xl text-banyan-green mb-10 tracking-tighter">Legacy Activity</h3>
        <div className="space-y-6 flex-1">
          <div className="flex justify-between items-center border-b border-banyan-green/5 pb-6">
             <div>
                <div className="font-bold text-banyan-green text-xl mb-1">Guided Meera Sharma</div>
                <div className="text-xs text-sage font-black uppercase tracking-widest">Heritage Hub Mentorship</div>
             </div>
             <div className="text-3xl font-black text-sage">+10</div>
          </div>
          
          <div className="flex justify-between items-center border-b border-banyan-green/5 pb-6">
             <div>
                <div className="font-bold text-banyan-green text-xl mb-1">Learned from Rahul</div>
                <div className="text-xs text-muted-clay font-black uppercase tracking-widest">Digital Literacy Session</div>
             </div>
             <div className="text-3xl font-black text-terracotta">-5</div>
          </div>

          <div className="flex justify-between items-center pb-2">
             <div>
                <div className="font-bold text-banyan-green text-xl mb-1">Welcome Bonus</div>
                <div className="text-xs text-sage font-black uppercase tracking-widest">MindBridge Onboarding</div>
             </div>
             <div className="text-3xl font-black text-sage">+15</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="bg-white rounded-[4rem] border border-banyan-green/5 shadow-2xl overflow-hidden">
      <div className="h-64 bg-banyan-green relative">
         <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
      <div className="px-12 md:px-20 pb-20 -mt-24 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-16">
          <div className="w-48 h-48 rounded-[3.5rem] border-[12px] border-white overflow-hidden shadow-2xl relative group bg-linen flex items-center justify-center">
            {profile?.full_name ? (
              <span className="text-7xl font-heading font-black text-banyan-green uppercase drop-shadow-sm">
                {profile.full_name.charAt(0)}
              </span>
            ) : (
              <User size={80} className="text-banyan-green/20" />
            )}
          </div>
          <div className="flex gap-4">
             <button onClick={handleLogout} className="px-10 py-4 rounded-3xl border-2 border-terracotta/20 text-terracotta font-bold hover:bg-terracotta/5 transition-all">Sign Out</button>
             <button className="px-10 py-4 rounded-3xl bg-banyan-green text-white font-bold shadow-xl hover:scale-105 active:scale-95 transition-all">Edit Journey</button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 text-left">
          <div className="space-y-10">
            <div><h2 className="text-6xl font-heading font-black text-banyan-green tracking-tighter mb-2">{profile?.full_name}</h2><p className="text-2xl text-muted-clay font-bold tracking-tight">{profile?.role} • {profile?.city || 'India'}</p></div>
            <div className="space-y-4"><label className="text-xs font-black text-terracotta uppercase tracking-[0.4em] block">My Soul Story</label><p className="text-2xl text-muted-clay font-medium leading-relaxed italic">"{profile?.bio || 'Waiting to share my legacy story...'}"</p></div>
          </div>
          <div className="space-y-12">
            <div className="space-y-6">
               <label className="text-xs font-black text-sage uppercase tracking-[0.4em] block">Known Mastery</label>
               <div className="flex flex-wrap gap-3">
                 {profile?.skills?.map((s, i) => <span key={i} className="px-6 py-3 bg-sage/10 text-banyan-green rounded-2xl text-lg font-bold border border-sage/20 shadow-sm">{s}</span>) || <span className="text-muted-clay italic">No masters yet.</span>}
               </div>
            </div>
            <div className="space-y-6">
               <label className="text-xs font-black text-terracotta uppercase tracking-[0.4em] block">Future Curiosity</label>
               <div className="flex flex-wrap gap-3">
                 {profile?.interests?.map((s, i) => <span key={i} className="px-6 py-3 bg-terracotta/5 text-terracotta rounded-2xl text-lg font-bold border border-terracotta/20 shadow-sm">{s}</span>) || <span className="text-muted-clay italic">No curiosities yet.</span>}
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderChat = () => (
    <div className="space-y-8">
      <h2 className="text-5xl font-heading font-black text-banyan-green tracking-tighter mb-8">Legacy Hub.</h2>
      <LegacyChat currentProfile={profile} />
    </div>
  );

  const renderDashboard = () => (
    <div className="min-h-screen bg-linen flex flex-col pt-12 md:pt-16 pb-40">
      <div className="max-w-7xl mx-auto w-full px-8 md:px-12">
        <header className="flex justify-between items-center mb-16 md:mb-24">
          <div className="flex items-center gap-4">
             <div className="w-14 h-14 bg-banyan-green rounded-2xl flex items-center justify-center text-sage shadow-2xl shadow-banyan-green/30"><Sparkles size={32} /></div>
             <h1 className="text-4xl font-heading font-black text-banyan-green tracking-tighter">MindBridge</h1>
          </div>
          <motion.div 
            onClick={() => setActiveTab('profile')}
            whileHover={{ scale: 1.05 }} 
            className="flex items-center gap-4 bg-white/60 backdrop-blur-xl p-2.5 pl-6 pr-6 rounded-full border border-white/60 shadow-xl shadow-banyan-green/5 cursor-pointer"
          >
             <div className="w-10 h-10 bg-banyan-green rounded-xl flex items-center justify-center text-linen font-heading font-black">
                {profile?.full_name?.charAt(0)}
             </div>
             <span className="text-sm font-black text-banyan-green uppercase tracking-widest hidden md:block">{profile?.full_name}</span>
          </motion.div>
        </header>

        <main>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease: "circOut" }}
            >
              {activeTab === 'home' && renderHome()}
              {activeTab === 'discover' && renderDiscover()}
              {activeTab === 'sessions' && renderSessions()}
              {activeTab === 'tokens' && renderTokens()}
              {activeTab === 'profile' && renderProfile()}
              {activeTab === 'chat' && renderChat()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );

  const handleStart = () => {
    setScreen('login');
  };

  return (
    <div className="min-h-screen bg-linen font-sans selection:bg-terracotta/20">
      <AnimatePresence mode="wait">
        {screen === 'landing' && <LandingPage onStart={handleStart} />}
        {screen === 'login' && (
          <div className="min-h-screen bg-linen flex items-center justify-center p-8 relative overflow-hidden">
             {session && (
               <motion.div 
                 initial={{ opacity: 0, scale: 0.8 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="absolute top-10 right-10 bg-white/40 backdrop-blur-3xl p-6 rounded-[2.5rem] border border-white/40 shadow-2xl z-[100] flex items-center gap-6"
               >
                 <div className="w-12 h-12 bg-banyan-green/10 rounded-2xl flex items-center justify-center text-banyan-green"><User size={24} /></div>
                 <div>
                    <div className="text-[10px] font-black text-banyan-green/40 uppercase tracking-[0.2em]">Active Session</div>
                    <div className="text-sm font-black text-banyan-green">Ready to resume</div>
                 </div>
                 <button onClick={() => fetchProfile(session.user.id)} className="px-8 py-3 bg-banyan-green text-linen rounded-2xl font-black text-sm hover:bg-terracotta transition-all shadow-lg shadow-banyan-green/20">Proceed</button>
               </motion.div>
             )}
             
             {/* Dynamic background shapes */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sage/5 rounded-full blur-[120px] pointer-events-none" />
             <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-terracotta/5 rounded-full blur-[100px] pointer-events-none" />

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-2xl bg-white rounded-[5rem] shadow-[0_50px_100px_-20px_rgba(33,54,49,0.15)] border border-banyan-green/5 overflow-hidden relative z-10 p-16 md:p-24 text-center"
            >
                <div className="space-y-6 mb-16">
                  <div className="w-24 h-24 bg-banyan-green rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl shadow-banyan-green/30 relative">
                     <div className="absolute inset-0 bg-white/20 rounded-[2.5rem] animate-ping opacity-40" />
                     <Sparkles className="text-sage relative z-10" size={48} />
                  </div>
                  <h2 className="text-6xl font-heading font-black text-banyan-green tracking-tighter">Unified Access.</h2>
                  <p className="text-muted-clay text-xl font-medium max-w-md mx-auto">Join the most secure intergenerational network. Choose your key to enter.</p>
                </div>

                <div className="space-y-8 max-w-sm mx-auto">
                  <button onClick={handleGoogleLogin} className="w-full p-8 bg-white border-4 border-linen rounded-[2.5rem] font-black text-xl flex items-center justify-center gap-4 hover:border-terracotta/20 transition-all shadow-xl group active:scale-95">
                    <img src="https://www.gstatic.com/images/branding/product/2x/googleg_48dp.png" className="w-10 h-10 group-hover:scale-110 transition-transform" alt="Google" />
                    Continue with Google
                  </button>
                  
                  <div className="flex items-center gap-6 text-muted-clay/30 uppercase text-[10px] font-black tracking-[0.5em]">
                    <div className="h-[2px] bg-linen flex-1" />
                    <span>OR USE MAGIC LINK</span>
                    <div className="h-[2px] bg-linen flex-1" />
                  </div>

                  <form onSubmit={handleMagicLink} className="space-y-6">
                    <input 
                      type="email" 
                      required 
                      placeholder="e.g. arjun@mindbridge.in" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      className="w-full p-8 bg-linen rounded-[2.5rem] outline-none text-xl font-bold border-4 border-transparent focus:border-terracotta/20 transition-all shadow-inner text-center placeholder:text-muted-clay/40" 
                    />
                    <button disabled={authLoading} className="w-full p-8 bg-banyan-green text-linen rounded-[2.5rem] font-black text-2xl flex items-center justify-center gap-4 shadow-3xl shadow-banyan-green/20 hover:bg-terracotta hover:scale-[1.02] active:scale-95 transition-all">
                      {authLoading ? 'Verifying...' : <><Mail size={28} /> Send Magic Key</>}
                    </button>
                  </form>
                  {message.text && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }} 
                      animate={{ opacity: 1, scale: 1 }} 
                      className={`p-6 rounded-[2rem] font-bold text-lg ${message.type === 'error' ? 'bg-terracotta/10 text-terracotta border border-terracotta/20' : 'bg-sage/10 text-banyan-green border border-sage/20'}`}
                    >
                      {message.text}
                    </motion.div>
                  )}
                </div>

                {/* Secure Badge */}
                <div className="mt-16 pt-8 border-t border-linen flex items-center justify-center gap-3 text-muted-clay/40 font-black uppercase text-[10px] tracking-widest">
                   <ShieldCheck size={16} /> End-to-End Encryption Enabled
                </div>
            </motion.div>
          </div>
        )}
        {screen === 'dashboard' && renderDashboard()}
        {screen === 'booking' && <SessionBooking profile={profile} onComplete={() => { fetchProfile(session.user.id); setScreen('dashboard'); }} />}
        {screen === 'matching' && <MatchScreen role={profile?.role} onAccept={() => setActiveTab('home')} />}
        {screen === 'guardian' && <VoiceGuardian onBack={() => setScreen('dashboard')} />}
        {screen === 'onboarding' && (
          <OnboardingFlow user={session.user} onComplete={() => fetchProfile(session.user.id)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
