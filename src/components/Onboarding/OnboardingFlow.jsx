import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, CheckCircle2, ChevronRight, UserPlus, Sparkles, Plus, X, Zap } from 'lucide-react';
import { supabase } from '../../supabaseClient';
import VoiceInput from '../Common/VoiceInput';

const OnboardingFlow = ({ user, onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    full_name: '',
    role: '',
    bio: '',
    skills_know: [],
    skills_want: [],
  });
  const [customSkill, setCustomSkill] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const skillPresets = {
    Senior: {
      know: ["Vedic Math", "Rasam Cooking", "Storytelling", "Handloom Mastery", "Ayurvedic Health", "Local History"],
      want: ["UPI & Banking", "Video Calls", "Smart Home Ops", "Internet Safety", "Order Medicine", "Podcasts"]
    },
    Youth: {
      know: ["Python/JS", "Digital Payments", "Photography", "Social Media", "Modern Resume", "App Navigation"],
      want: ["Heritage Cooking", "Life Philosophy", "Traditional Art", "Classical Music", "Meditation", "Gardening"]
    }
  };

  const currentPresets = formData.role ? skillPresets[formData.role] : { know: [], want: [] };

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const toggleSkill = (type, skill) => {
    const list = type === 'know' ? 'skills_know' : 'skills_want';
    setFormData(prev => ({
      ...prev,
      [list]: prev[list].includes(skill) 
        ? prev[list].filter(s => s !== skill) 
        : [...prev[list], skill]
    }));
  };

  const addCustomSkill = (type) => {
    if (!customSkill.trim()) return;
    toggleSkill(type, customSkill.trim());
    setCustomSkill('');
  };

  const handleFinish = async () => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: formData.full_name,
          role: formData.role,
          bio: formData.bio,
          skills: formData.skills_know,
          interests: formData.skills_want,
          reciprocity_tokens: 10, // Starter tokens
        });

      if (error) {
        console.error('Error saving profile:', error);
        alert(`Failed to save profile: ${error.message || error.details || 'Database permission error'}`);
      } else {
        onComplete();
      }
    } catch (err) {
      console.error('Unexpected error saving profile:', err);
      alert(`Error: ${err.message || 'Failed to save profile'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const cardVariants = {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    enter: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -20, scale: 0.95 }
  };

  return (
    <div className="min-h-screen bg-linen selection:bg-terracotta/20 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-linen to-white/50">
      <div className="w-full max-w-2xl relative">
        {/* Progress Bar */}
        <div className="absolute top-[-40px] left-0 right-0 flex gap-2 h-1.5 px-10">
          {[1,2,3,4,5].map(i => (
            <div key={i} className={`flex-1 rounded-full transition-all duration-500 ${step >= i ? 'bg-terracotta' : 'bg-terracotta/10'}`} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="role" variants={cardVariants} initial="initial" animate="enter" exit="exit" className="bg-white p-10 md:p-16 rounded-[4rem] shadow-2xl space-y-12 border border-banyan-green/5 text-center">
               <div className="space-y-4">
                  <div className="w-20 h-20 bg-sage rounded-[2rem] flex items-center justify-center mx-auto text-linen shadow-xl shadow-sage/20"><UserPlus size={32} /></div>
                  <h2 className="text-4xl md:text-5xl font-heading font-black text-banyan-green">Who are you?</h2>
                  <p className="text-muted-clay text-lg font-medium">This helps us match you with the right peers.</p>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <button 
                  onClick={() => { setFormData({...formData, role: 'Senior'}); handleNext(); }}
                  className={`p-8 rounded-[3rem] border-4 transition-all flex flex-col items-center gap-4 ${formData.role === 'Senior' ? 'border-terracotta bg-terracotta/5' : 'border-linen bg-linen/20 hover:border-terracotta/20'}`}
                 >
                   <span className="text-5xl">👵</span>
                   <span className="font-black text-xl text-banyan-green">Senior</span>
                   <span className="text-xs text-muted-clay uppercase tracking-widest font-black">65+ Years</span>
                 </button>
                 <button 
                  onClick={() => { setFormData({...formData, role: 'Youth'}); handleNext(); }}
                  className={`p-8 rounded-[3rem] border-4 transition-all flex flex-col items-center gap-4 ${formData.role === 'Youth' ? 'border-sage bg-sage/5' : 'border-linen bg-linen/20 hover:border-sage/20'}`}
                 >
                   <span className="text-5xl">🧑‍🎓</span>
                   <span className="font-black text-xl text-banyan-green">Youth</span>
                   <span className="text-xs text-muted-clay uppercase tracking-widest font-black">18-30 Years</span>
                 </button>
               </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="name" variants={cardVariants} initial="initial" animate="enter" exit="exit" className="bg-white p-10 md:p-16 rounded-[4rem] shadow-2xl space-y-10 border border-banyan-green/5">
                <div className="space-y-2">
                  <h2 className="text-4xl font-heading font-black text-banyan-green">Introduce Yourself.</h2>
                  <p className="text-muted-clay text-lg font-medium">Hello there! What should we call you?</p>
                </div>
                <div className="space-y-6">
                  <div className="relative group">
                    <input 
                      type="text" 
                      placeholder="Your Full Name"
                      value={formData.full_name}
                      onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                      className="w-full p-8 bg-linen border-2 border-transparent focus:border-terracotta/30 rounded-[2.5rem] outline-none transition-all text-xl font-bold"
                    />
                    <div className="absolute right-6 top-1/2 -translate-y-1/2">
                      <div className="flex flex-col items-center gap-1">
                        <VoiceInput onResult={(res) => setFormData({...formData, full_name: res})} placeholder="Listening..." />
                        <span className="text-[10px] font-black text-terracotta uppercase tracking-tighter">Tap to Speak</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    disabled={!formData.full_name}
                    onClick={handleNext}
                    className="w-full p-6 bg-banyan-green text-linen rounded-3xl font-bold text-xl flex items-center justify-center gap-3 shadow-xl disabled:opacity-50"
                  >
                    Next <ArrowRight />
                  </button>
                  <button onClick={handleBack} className="w-full text-muted-clay font-bold text-sm uppercase tracking-widest">Back</button>
                </div>
            </motion.div>
          )}

          {step === 3 && (
             <motion.div key="know" variants={cardVariants} initial="initial" animate="enter" exit="exit" className="bg-white p-10 md:p-16 rounded-[4rem] shadow-2xl space-y-10 border border-banyan-green/5">
                <div className="space-y-4 text-center">
                  <div className="flex justify-center"><Zap className="text-terracotta animate-pulse" size={48} /></div>
                  <h2 className="text-4xl font-heading font-black text-terracotta leading-tight">I am a Master of...</h2>
                  <p className="text-muted-clay text-lg font-medium">Skills you are ready to share.</p>
                </div>
                
                <div className="flex flex-wrap justify-center gap-3 max-h-[300px] overflow-y-auto p-2">
                  {currentPresets.know.map(skill => (
                    <button 
                      key={skill}
                      onClick={() => toggleSkill('know', skill)}
                      className={`px-6 py-4 rounded-2xl font-bold transition-all border-2 ${formData.skills_know.includes(skill) ? 'bg-terracotta text-white border-terracotta shadow-lg' : 'bg-linen border-transparent hover:border-terracotta/30 text-banyan-green'}`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>

                <div className="flex gap-4">
                    <input 
                      type="text" 
                      placeholder="Add custom skill..."
                      value={customSkill}
                      onChange={(e) => setCustomSkill(e.target.value)}
                      className="flex-1 p-5 bg-linen rounded-2xl outline-none font-bold"
                      onKeyPress={(e) => e.key === 'Enter' && addCustomSkill('know')}
                    />
                    <button onClick={() => addCustomSkill('know')} className="p-5 bg-sage text-linen rounded-2xl font-bold"><Plus /></button>
                </div>

                <button 
                    disabled={formData.skills_know.length === 0}
                    onClick={handleNext}
                    className="w-full p-6 bg-banyan-green text-linen rounded-3xl font-bold text-xl shadow-xl disabled:opacity-50"
                  >
                    Set My Mastery <ArrowRight className="inline ml-2" />
                </button>
             </motion.div>
          )}

          {step === 4 && (
             <motion.div key="want" variants={cardVariants} initial="initial" animate="enter" exit="exit" className="bg-white p-10 md:p-16 rounded-[4rem] shadow-2xl space-y-10 border border-banyan-green/5">
                <div className="space-y-4 text-center">
                  <div className="flex justify-center"><Sparkles className="text-sage animate-float" size={48} /></div>
                  <h2 className="text-4xl font-heading font-black text-sage leading-tight">I am Curious About...</h2>
                  <p className="text-muted-clay text-lg font-medium">Skills you want to learn.</p>
                </div>
                
                <div className="flex flex-wrap justify-center gap-3 max-h-[300px] overflow-y-auto p-2">
                  {currentPresets.want.map(skill => (
                    <button 
                      key={skill}
                      onClick={() => toggleSkill('want', skill)}
                      className={`px-6 py-4 rounded-2xl font-bold transition-all border-2 ${formData.skills_want.includes(skill) ? 'bg-sage text-white border-sage shadow-lg' : 'bg-linen border-transparent hover:border-sage/30 text-banyan-green'}`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>

                <div className="flex gap-4">
                    <input 
                      type="text" 
                      placeholder="Add custom skill..."
                      value={customSkill}
                      onChange={(e) => setCustomSkill(e.target.value)}
                      className="flex-1 p-5 bg-linen rounded-2xl outline-none font-bold"
                      onKeyPress={(e) => e.key === 'Enter' && addCustomSkill('want')}
                    />
                    <button onClick={() => addCustomSkill('want')} className="p-5 bg-sage text-linen rounded-2xl font-bold"><Plus /></button>
                </div>

                <button 
                    disabled={formData.skills_want.length === 0}
                    onClick={handleNext}
                    className="w-full p-6 bg-banyan-green text-linen rounded-3xl font-bold text-xl shadow-xl disabled:opacity-50"
                  >
                    Set My Curiosities <ArrowRight className="inline ml-2" />
                </button>
             </motion.div>
          )}

          {step === 5 && (
             <motion.div key="bio" variants={cardVariants} initial="initial" animate="enter" exit="exit" className="bg-white p-10 md:p-16 rounded-[4rem] shadow-2xl space-y-10 border border-banyan-green/5">
                <div className="space-y-2 text-center">
                  <h2 className="text-4xl font-heading font-black text-banyan-green leading-tight">Your Legacy.</h2>
                  <p className="text-muted-clay text-lg font-medium">Share 1-2 lines about your journey.</p>
                </div>
                
                <div className="relative group">
                  <textarea 
                    rows={4}
                    placeholder="E.g., I'm a retired teacher from Jaipur with a passion for traditional textiles and a curiosity for modern tech."
                    value={formData.bio}
                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                    className="w-full p-8 bg-linen border-2 border-transparent focus:border-terracotta/30 rounded-[2.5rem] outline-none transition-all text-xl font-bold resize-none"
                  />
                  <div className="absolute right-6 bottom-6 flex flex-col items-center gap-1">
                    <VoiceInput onResult={(res) => setFormData({...formData, bio: res})} placeholder="Listening..." />
                    <span className="text-[10px] font-black text-terracotta uppercase tracking-tighter">Tap to Speak</span>
                  </div>
                </div>

                <button 
                    disabled={isSubmitting || !formData.bio}
                    onClick={handleFinish}
                    className="w-full p-6 bg-terracotta text-white rounded-3xl font-bold text-xl shadow-2xl shadow-terracotta/20 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Building your Bridge...' : 'Enter the Network'}
                </button>
             </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export { OnboardingFlow };
export default OnboardingFlow;
