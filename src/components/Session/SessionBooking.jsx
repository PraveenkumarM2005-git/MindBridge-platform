import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Sparkles, Coins, CheckCircle, ChevronLeft, BellRing, ShieldCheck, ArrowRight, User } from 'lucide-react';
import { supabase } from '../../supabaseClient';

const SessionBooking = ({ onComplete, profile }) => {
  const [step, setStep] = useState('date');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(45);
  const [isProcessing, setIsProcessing] = useState(false);
  const [celebrating, setCelebrating] = useState(false);

  const dates = [
    { day: "Tomorrow", date: "12 Apr" },
    { day: "Mon", date: "13 Apr" },
    { day: "Tue", date: "14 Apr" },
    { day: "Wed", date: "15 Apr" },
  ];

  const durations = [30, 45, 60, 90];

  const handleBook = async () => {
    setIsProcessing(true);

    // 1. Create the session in Supabase
    const { error: sessionError } = await supabase
      .from('sessions')
      .insert({
        mentor_id: profile.role === 'Senior' ? profile.id : "00000000-0000-0000-0000-000000000000", // Dummy for demo if not present
        learner_id: profile.role === 'Youth' ? profile.id : "00000000-0000-0000-0000-000000000000",
        topic: profile.role === 'Senior' ? "Legacy Wisdom" : "Tech Empowerment",
        scheduled_at: new Date(new Date().setDate(new Date().getDate() + 1)), // Just tomorrow for demo
        status: 'scheduled'
      });

    if (sessionError) {
      console.error('Session error:', sessionError);
      alert(`Booking Error: ${sessionError.message}. Make sure you have run the latest SQL in Supabase.`);
      setIsProcessing(false);
      return;
    }

    // 2. Update tokens (+2 reward)
    const { error: tokenError } = await supabase
      .from('profiles')
      .update({ reciprocity_tokens: (profile.reciprocity_tokens || 0) + 2 })
      .eq('id', profile.id);

    if (tokenError) console.error('Token update error:', tokenError);

    // 3. Trigger Celebration & "Notification"
    setCelebrating(true);

    // Simulate family notification
    setTimeout(() => {
      console.log("NOTIFY_FAMILY_EVENT_TRIGGERED");
    }, 1000);

    setTimeout(() => {
      setCelebrating(false);
      onComplete();
    }, 4500);
  };

  if (celebrating) {
    return (
      <div className="min-h-screen bg-banyan-green flex flex-col items-center justify-center p-8 text-center overflow-hidden relative">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-sage/20 rounded-full blur-[120px]" />

        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", damping: 10, stiffness: 100 }}
          className="relative z-10 space-y-8"
        >
          <div className="bg-white/10 backdrop-blur-3xl w-64 h-64 rounded-[4rem] flex flex-col items-center justify-center mx-auto border border-white/20 shadow-2xl">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Coins size={80} className="text-terracotta mb-4 drop-shadow-[0_0_20px_rgba(201,77,56,0.6)]" />
            </motion.div>
            <div className="text-4xl font-heading font-black text-linen tracking-tighter">+2 Tokens</div>
          </div>

          <div className="space-y-4">
            <h2 className="text-6xl font-heading font-black text-linen tracking-tighter">SUCCESS.</h2>
            <div className="flex items-center justify-center gap-2 text-sage bg-sage/10 px-6 py-2 rounded-full font-bold">
              <BellRing size={20} className="animate-bounce" />
              <span>Family Notified!</span>
            </div>
            <p className="text-linen/60 text-xl font-medium max-w-sm mx-auto">
              You've successfully bridged the legacy gap. Your family has been notified of your upcoming session.
            </p>
          </div>
        </motion.div>

        {/* Particle Rain */}
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ top: "-10%", left: `${Math.random() * 100}%` }}
              animate={{ top: "110%", rotate: 360 }}
              transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, ease: "linear", delay: Math.random() * 2 }}
              className="absolute text-2xl opacity-40"
            >
              {i % 2 === 0 ? '✨' : '🌿'}
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linen p-8 md:p-16 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl bg-white rounded-[4rem] shadow-2xl overflow-hidden border border-banyan-green/5 flex flex-col md:flex-row"
      >
        {/* Left Side: Illustration / Context */}
        <div className="md:w-[40%] bg-banyan-green p-16 flex flex-col justify-between text-linen relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-sage/10 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="space-y-8 relative z-10">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-sage"><Calendar size={32} /></div>
            <h2 className="text-5xl font-heading font-black leading-none">The <br />Bridge <br />Waitlist.</h2>
            <p className="text-linen/60 text-lg font-medium leading-relaxed">Booking a session triggers our real-time notification engine to keep your loved ones in the loop.</p>
          </div>
          <div className="space-y-4 pt-10">
            <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/10">
              <ShieldCheck className="text-sage" />
              <span className="text-sm font-bold uppercase tracking-widest">End-to-End Secure</span>
            </div>
          </div>
        </div>

        {/* Right Side: Inputs */}
        <div className="md:w-[60%] p-12 md:p-20 space-y-12">
          <section className="space-y-6">
            <label className="text-xs font-black text-terracotta uppercase tracking-[0.4em] block">Select Your Window</label>
            <div className="grid grid-cols-2 gap-4">
              {dates.map((d, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedDate(d.date)}
                  className={`p-8 rounded-[2.5rem] flex flex-col items-center gap-1 border-4 transition-all duration-300 transform active:scale-95 ${selectedDate === d.date ? 'border-banyan-green bg-banyan-green/5 shadow-inner' : 'bg-linen border-transparent hover:border-banyan-green/20'
                    }`}
                >
                  <span className="text-sm opacity-40 font-black uppercase tracking-widest">{d.day}</span>
                  <span className="text-2xl font-black text-banyan-green">{d.date}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <label className="text-xs font-black text-terracotta uppercase tracking-[0.4em] block">Journey Duration</label>
            <div className="flex flex-wrap gap-4">
              {durations.map((dur) => (
                <button
                  key={dur}
                  onClick={() => setSelectedDuration(dur)}
                  className={`px-8 py-4 rounded-2xl border-4 font-black transition-all ${selectedDuration === dur ? 'bg-sage border-sage text-white shadow-xl shadow-sage/20' : 'bg-linen border-transparent text-banyan-green hover:border-sage/30'
                    }`}
                >
                  {dur} Minutes
                </button>
              ))}
            </div>
          </section>

          <div className="pt-8 space-y-6">
            <div className="p-8 bg-linen rounded-[2.5rem] border-2 border-dashed border-banyan-green/20 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-white p-3 rounded-2xl border border-banyan-green/5"><Coins className="text-terracotta" /></div>
                <div>
                  <div className="font-black text-banyan-green text-sm uppercase">Reciprocity Token Reward</div>
                  <div className="text-xs text-muted-clay font-bold italic">Tokens added locally after session.</div>
                </div>
              </div>
              <div className="text-3xl font-black text-terracotta">+2</div>
            </div>

            <button
              disabled={!selectedDate || isProcessing}
              onClick={handleBook}
              className="w-full py-8 bg-banyan-green text-linen rounded-[2.5rem] font-black font-heading text-2xl shadow-2xl shadow-banyan-green/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4 disabled:opacity-30 disabled:grayscale"
            >
              {isProcessing ? 'Connecting...' : <><CheckCircle /> Affirm Session</>}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SessionBooking;
