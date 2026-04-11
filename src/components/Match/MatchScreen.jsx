import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MapPin, Star, Heart, X, Check, Brain, Zap, MessageCircle } from 'lucide-react';

const MatchScreen = ({ role, onAccept, embedded = false }) => {
  const [loading, setLoading] = useState(true);

  // Soul-based matches (Souls over Faces)
  const matchData = role === 'Senior' 
    ? { 
        name: "Arjun Mehta", 
        age: 24, 
        city: "Pune", 
        bio: "An aspiring engineer fascinated by the architectural secrets of Tanjore temples and Vedic algorithms. I help peers set up their digital identities.", 
        score: 94, 
        gradient: "from-blue-400 to-indigo-600",
        special: "Top 1% Digital Helper"
      }
    : { 
        name: "Meera Sharma", 
        age: 68, 
        city: "Chennai", 
        bio: "Former educator with a lifetime of experience in traditional Carnatic music and sustainable living. Looking for someone to help me navigate the world of podcasts.", 
        score: 98, 
        gradient: "from-terracotta to-orange-400",
        special: "Legacy Legend"
      };

  const [matched, setMatched] = useState(false);
  const [aiReason, setAiReason] = useState("");

  const generateMatchInsight = async () => {
    // This is where you would plug in your OpenAI API Key in .env
    // VITE_OPENAI_API_KEY=sk-....
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    
    if (apiKey) {
      try {
        // Real GPT-4.5/OpenAI API Call logic would go here
        // For now, we simulate a High-Fidelity GPT Response
        const mockPrompt = `Analyze the match between a ${role} and ${matchData.name} based on their skills and bio.`;
        setAiReason("Synthesized commonalities: Legacy carnatic history aligns with Vedic algorithm logic. Neural sync detected potential for high-reciprocity knowledge transfer.");
      } catch (err) {
        setAiReason("AI Reasoning active: Connecting traditional education with modern digital tools for high-impact knowledge exchange.");
      }
    } else {
      // Mock GPT Response for Hackathon Demo
      setAiReason("Found a Neural Link: Traditional heritage mastery perfectly complements current curiosty patterns. High probability of reciprocal value exchange.");
    }
  };

  const handleAccept = () => {
    setMatched(true);
    console.log("MATCH_REQUEST_SENT");
    setTimeout(() => {
      onAccept();
    }, 2500);
  };

  useEffect(() => {
    generateMatchInsight();
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (matched) {
    return (
      <div className={`${embedded ? 'h-[500px]' : 'min-h-screen'} bg-banyan-green flex flex-col items-center justify-center p-8 text-center relative overflow-hidden`}>
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-sage/20 rounded-full blur-[120px]" />
        
        <motion.div
           initial={{ scale: 0, rotate: -180 }}
           animate={{ scale: 1, rotate: 0 }}
           className="relative z-10 space-y-8"
        >
          <div className="bg-white/10 backdrop-blur-3xl w-48 h-48 rounded-[3rem] flex flex-col items-center justify-center mx-auto border border-white/20 shadow-2xl">
              <Sparkles size={64} className="text-sage mb-4 drop-shadow-[0_0_20px_rgba(110,138,101,0.6)]" />
              <div className="text-2xl font-heading font-black text-linen tracking-tighter">BRIDGED!</div>
          </div>

          <div className="space-y-4">
             <h2 className="text-6xl font-heading font-black text-linen tracking-tighter">MATCHED.</h2>
             <div className="flex items-center justify-center gap-2 text-terracotta bg-terracotta/10 px-6 py-2 rounded-full font-bold">
                <Zap size={20} className="animate-pulse" fill="currentColor" />
                <span>Neural Sync Complete</span>
             </div>
             <p className="text-linen/60 text-xl font-medium max-w-sm mx-auto mt-6">
               Connection established with {matchData.name}. You are now ready to bridge the gap together.
             </p>
          </div>
        </motion.div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={`${embedded ? 'h-[500px]' : 'min-h-screen'} bg-linen flex flex-col items-center justify-center p-8 text-center`}>
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 180, 270, 360] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-32 h-32 rounded-[2.5rem] border-8 border-dashed border-banyan-green/20 flex items-center justify-center mb-10"
        >
          <Brain className="text-terracotta" size={56} />
        </motion.div>
        <h2 className="text-3xl font-heading font-black text-banyan-green mb-4">Neural Heritage Matching</h2>
        <p className="text-muted-clay text-lg font-medium animate-pulse">Analyzing 60 years of context...</p>
      </div>
    );
  }

  return (
    <div className={`${embedded ? '' : 'min-h-screen p-8'} flex flex-col items-center justify-center`}>
      {!embedded && (
        <header className="w-full mb-12 pt-4 text-center">
          <h2 className="text-5xl font-heading font-black text-banyan-green tracking-tighter">Perfect Mirror Found.</h2>
        </header>
      )}

      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="w-full max-w-6xl bg-white rounded-[5rem] overflow-hidden shadow-2xl border border-banyan-green/5 flex flex-col lg:row-span-2 lg:flex-row relative"
      >
        {/* Soul Mirror (Abstract Gradient representation instead of photo) */}
        <div className={`lg:w-1/2 bg-gradient-to-br ${matchData.gradient} p-20 flex flex-col justify-between text-white relative group overflow-hidden`}>
           <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
           <div className="space-y-8 relative z-10">
              <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-xl px-8 py-3 rounded-full font-black text-sm uppercase tracking-[0.3em] border border-white/20 shadow-2xl">
                <Sparkles size={20} className="text-white" /> {matchData.special}
              </div>
              <h3 className="text-8xl font-heading font-black leading-[0.8] tracking-tighter">
                {matchData.name.split(' ')[0]} <br/>
                <span className="text-white/30">{matchData.name.split(' ')[1]}</span>
              </h3>
              <div className="flex items-center gap-4 text-white/60 font-black uppercase text-xs tracking-[0.5em]">
                <MapPin size={20} /> {matchData.city}
              </div>
           </div>
           
           <div className="relative z-10">
              <div className="bg-white p-10 rounded-[4rem] shadow-3xl border border-white/20 flex flex-col items-center gap-6">
                 <div className="text-xs font-black text-banyan-green uppercase tracking-[0.4em] opacity-40">Compatibility Intelligence</div>
                 <div className="relative w-40 h-40 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-banyan-green/5" />
                      <motion.circle 
                        cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" 
                        strokeDasharray={440}
                        initial={{ strokeDashoffset: 440 }}
                        animate={{ strokeDashoffset: 440 - (440 * matchData.score) / 100 }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        className="text-terracotta"
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                       <span className="text-4xl font-black text-banyan-green">{matchData.score}%</span>
                       <span className="text-[10px] font-black text-muted-clay uppercase">Fit</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Story Section */}
        <div className="p-12 md:p-20 lg:w-1/2 flex flex-col justify-center space-y-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-muted-clay font-black uppercase text-xs tracking-[0.4em]">
              <MapPin size={18} className="text-terracotta" /> {matchData.city} • {matchData.age} Years Old
            </div>
            <p className="text-3xl font-medium text-banyan-green leading-snug">
               "{matchData.bio}"
            </p>

            <div className="bg-linen p-8 rounded-[2.5rem] border border-sage/20 relative group">
               <div className="absolute top-4 right-6 text-sage animate-pulse"><Sparkles size={20} /></div>
               <label className="text-[10px] font-black text-sage uppercase tracking-[0.4em] block mb-3">GPT Neural Insight</label>
               <p className="text-muted-clay font-medium italic text-lg leading-relaxed">
                 {aiReason || "Calculating reasoning paths..."}
               </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="p-6 bg-linen rounded-3xl border border-banyan-green/5 space-y-2">
                <div className="flex items-center gap-2 text-sage mb-2">
                   <Zap size={20} fill="currentColor" />
                   <span className="text-[10px] font-black uppercase tracking-widest">Mastery</span>
                </div>
                <div className="text-lg font-bold text-banyan-green">{role === 'Senior' ? 'Vedic Algorithms' : 'Digital Native'}</div>
             </div>
             <div className="p-6 bg-linen rounded-3xl border border-banyan-green/5 space-y-2">
                <div className="flex items-center gap-2 text-terracotta mb-2">
                   <Heart size={20} fill="currentColor" />
                   <span className="text-[10px] font-black uppercase tracking-widest">Focus</span>
                </div>
                <div className="text-lg font-bold text-banyan-green">{role === 'Senior' ? 'Innovation' : 'Heritage'}</div>
             </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={embedded ? onAccept : undefined}
              className="flex-1 py-8 bg-linen text-muted-clay rounded-[2.5rem] font-bold text-xl flex items-center justify-center gap-3 hover:bg-white hover:border-muted-clay/20 border-4 border-transparent transition-all"
            >
              <X size={28} /> Skip
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
              onClick={handleAccept}
              className="flex-[2] py-8 bg-banyan-green text-linen rounded-[2.5rem] font-black font-heading text-2xl flex items-center justify-center gap-4 shadow-2xl shadow-banyan-green/30 hover:bg-terracotta hover:shadow-terracotta/20 transition-all"
            >
              <Check size={28} /> Confirm Match
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MatchScreen;
