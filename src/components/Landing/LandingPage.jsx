import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Users, Brain, Shield, Sparkles, Star, Zap, Globe } from 'lucide-react';

const LandingPage = ({ onStart }) => {
  const stats = [
    { label: "Wisdom Shared", value: "48,000 hrs", icon: <Star className="text-terracotta" /> },
    { label: "Active Mentors", value: "12,000+", icon: <Users className="text-sage" /> },
    { label: "Reciprocity Tokens", value: "850K+", icon: <Zap className="text-yellow-500" /> },
  ];

  return (
    <div className="min-h-screen relative bg-linen overflow-x-hidden selection:bg-terracotta/20">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sage/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-terracotta/5 rounded-full blur-[150px]" />
        <div className="absolute top-[20%] right-[5%] w-[30%] h-[30%] bg-banyan-green/5 rounded-full blur-[100px]" />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex justify-between items-center px-8 md:px-16 py-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-banyan-green rounded-2xl flex items-center justify-center shadow-xl shadow-banyan-green/20">
            <Sparkles className="text-sage" size={24} />
          </div>
          <span className="font-heading font-black text-banyan-green text-2xl tracking-tighter">MindBridge</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-bold text-banyan-green/60 px-8 py-3 bg-white/40 backdrop-blur-md rounded-full border border-white/40">
           <a href="#mission" className="hover:text-terracotta transition-colors">Mission</a>
           <a href="#impact" className="hover:text-terracotta transition-colors">Impact</a>
           <a href="#how" className="hover:text-terracotta transition-colors">How it Works</a>
        </div>
        <button 
          onClick={() => onStart()}
          className="px-8 py-3 bg-banyan-green text-linen rounded-full font-bold text-sm shadow-xl hover:scale-105 active:scale-95 transition-all"
        >
          Join Network
        </button>
      </nav>

      {/* Hero Content */}
      <main className="relative z-10 px-6 pt-12 md:pt-24 pb-32 max-w-7xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-xl shadow-banyan-green/5 border border-banyan-green/10 mb-8"
        >
          <div className="flex -space-x-2">
            {[1,2,3].map(i => <img key={i} src={`https://i.pravatar.cc/100?u=${i+50}`} className="w-6 h-6 rounded-full border-2 border-white" alt="user" />)}
          </div>
          <span className="text-xs font-black text-banyan-green uppercase tracking-widest pl-2">Join 12,000+ members</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className="text-center space-y-8"
        >
          <h1 className="text-6xl md:text-8xl font-heading font-black text-center leading-[0.9] tracking-tight text-banyan-green">
            Where <span className="text-terracotta italic">Wisdom</span><br />
            Meets <span className="text-sage">Tomorrow</span>.
          </h1>
          
          <p className="max-w-2xl mx-auto text-xl md:text-2xl text-muted-clay font-medium leading-relaxed">
            India's first intergenerational ecosystem. We bridge the gap between 60 years of lived experience and 60 years of future potential.
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center pt-8">
            <button 
              onClick={() => onStart()}
              className="px-12 py-6 bg-terracotta text-white rounded-[2.5rem] font-bold text-xl shadow-2xl shadow-terracotta/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              Get Started Now <ArrowRight size={24} />
            </button>
            <div className="flex items-center gap-4 px-8 py-4 bg-white rounded-full border border-banyan-green/5 shadow-lg">
               <Globe className="text-sage" />
               <span className="text-sm font-bold text-banyan-green">Available in 12 Indian Languages</span>
            </div>
          </div>
        </motion.div>

        {/* Floating Icons */}
        <motion.div 
          animate={{ y: [0, -20, 0] }} 
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute left-10 top-1/2 hidden lg:block bg-white p-6 rounded-[2.5rem] shadow-2xl border border-sage/20"
        >
           <Brain size={48} className="text-sage" />
        </motion.div>
        
        <motion.div 
          animate={{ y: [0, 20, 0] }} 
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute right-10 top-[40%] hidden lg:block bg-white p-6 rounded-[2.5rem] shadow-2xl border border-terracotta/20"
        >
           <Zap size={48} className="text-terracotta" />
        </motion.div>
      </main>

      {/* Social Proof / Stats */}
      <section className="relative z-10 bg-banyan-green px-6 py-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center space-y-4"
            >
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto text-white">
                {stat.icon}
              </div>
              <div className="text-5xl font-heading font-black text-linen">{stat.value}</div>
              <div className="text-sage font-bold uppercase tracking-widest text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-32 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div className="space-y-12">
          <div className="space-y-4 text-left">
            <span className="text-terracotta font-black uppercase tracking-[0.3em] text-xs">Proprietary Tech</span>
            <h2 className="text-5xl font-heading font-black text-banyan-green leading-tight">The AI-Powered <br/>Legacy Bridge.</h2>
            <p className="text-xl text-muted-clay font-medium leading-relaxed">
              We use a specialized LLM trained on Indian cultural contexts to match mentors and mentees based on complementary skill gaps and emotional resonance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="p-8 bg-white rounded-[3rem] border border-banyan-green/5 shadow-xl hover:border-terracotta/20 transition-all">
               <Shield size={32} className="text-terracotta mb-4" />
               <h3 className="font-bold text-xl text-banyan-green mb-2">Safe Harbor</h3>
               <p className="text-muted-clay text-sm font-medium">Verified intergenerational spaces with family monitoring.</p>
            </div>
            <div className="p-8 bg-white rounded-[3rem] border border-banyan-green/5 shadow-xl hover:border-sage/20 transition-all">
               <Heart size={32} className="text-sage mb-4" />
               <h3 className="font-bold text-xl text-banyan-green mb-2">Soul Connect</h3>
               <p className="text-muted-clay text-sm font-medium">Focus on emotional health through purpose-driven skill exchange.</p>
            </div>
          </div>
        </div>

        <div className="relative">
           <div className="aspect-square bg-sage/20 rounded-[5rem] rotate-6 absolute inset-0 -z-10" />
           <img 
            src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2098&auto=format&fit=crop" 
            className="rounded-[4rem] shadow-2xl object-cover h-[600px] w-full"
            alt="Impact"
           />
        </div>
      </section>

      <footer className="py-20 text-center border-t border-banyan-green/5 opacity-40">
        <p className="font-bold text-banyan-green">MindBridge © 2026 • Building the Future of Bharat</p>
      </footer>
    </div>
  );
};

export default LandingPage;
