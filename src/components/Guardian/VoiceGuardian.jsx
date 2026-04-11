import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Phone, Home, Shield, ChevronLeft, Volume2 } from 'lucide-react';

const VoiceGuardian = ({ onBack }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [status, setStatus] = useState('tap-to-speak'); // 'tap-to-speak', 'listening', 'processing'

  const toggleListening = () => {
    if (!isListening) {
      setIsListening(true);
      setStatus('listening');
      // Simulated Speech API
      setTranscript("Listening for your wisdom...");
      setTimeout(() => {
        setTranscript("I want to teach Arjun how to make my special Masala Chai tomorrow at 4 PM.");
        setStatus('processing');
        setTimeout(() => setStatus('done'), 1500);
      }, 3000);
    } else {
      setIsListening(false);
      setStatus('tap-to-speak');
      setTranscript('');
    }
  };

  return (
    <div className="min-h-screen bg-[#1E3A35] text-linen p-6 flex flex-col">
      <header className="flex items-center gap-4 mb-20 pt-4">
        <button onClick={onBack} className="p-3 bg-white/10 rounded-full"><ChevronLeft size={24} /></button>
        <div>
          <h2 className="text-2xl font-heading font-bold">Voice Guardian</h2>
          <div className="flex items-center gap-1 text-sage text-sm font-bold">
            <Shield size={14} /> Active Protection
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-12">
        <div className="space-y-4 max-w-xs">
          <h3 className="text-3xl font-heading font-bold text-white">
            {status === 'listening' ? "Go ahead, I'm listening..." : "Need help setting up a session?"}
          </h3>
          <p className="text-linen/60 text-lg">Just speak naturally in your mother tongue.</p>
        </div>

        {/* Pulsing Mic Button */}
        <div className="relative">
          <AnimatePresence>
            {isListening && (
              <>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 2, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute inset-0 bg-terracotta rounded-full -z-10"
                />
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                  className="absolute inset-0 bg-sage rounded-full -z-10"
                />
              </>
            )}
          </AnimatePresence>
          
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleListening}
            className={`w-32 h-32 rounded-full flex items-center justify-center shadow-2xl relative z-10 transition-all duration-500 ${
              isListening ? 'bg-terracotta shadow-terracotta/40' : 'bg-white text-banyan-green'
            }`}
          >
            {isListening ? <Mic size={48} className="text-linen" /> : <Mic size={48} />}
          </motion.button>
        </div>

        {/* Live Transcript Display */}
        <AnimatePresence>
          {(isListening || transcript) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="w-full bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] mt-12"
            >
              <div className="flex items-center gap-2 text-sage text-xs font-bold uppercase tracking-widest mb-4">
                <Volume2 size={14} /> Live Transcription
              </div>
              <p className={`text-2xl font-medium leading-relaxed ${status === 'listening' ? 'animate-pulse' : ''}`}>
                "{transcript || "..."}"
              </p>
              
              {status === 'done' && (
                <motion.div 
                  initial={{ scale: 0 }} 
                  animate={{ scale: 1 }}
                  className="mt-6 flex items-center justify-center gap-2 text-sage font-bold"
                >
                  <Home size={20} /> Booking Added Successfully
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-auto pt-10 grid grid-cols-2 gap-4 pb-10">
        <button className="bg-white/5 tap-target rounded-2xl font-bold flex flex-col items-center justify-center gap-1 border border-white/10">
          <Phone size={20} className="text-sage" /> Emergency Call
        </button>
        <button className="bg-white/5 tap-target rounded-2xl font-bold flex flex-col items-center justify-center gap-1 border border-white/10">
          <Home size={20} className="text-terracotta" /> Call Family
        </button>
      </div>
    </div>
  );
};

export default VoiceGuardian;
