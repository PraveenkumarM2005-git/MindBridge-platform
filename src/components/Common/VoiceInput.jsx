import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Sparkles } from 'lucide-react';

const VoiceInput = ({ onResult, placeholder = "Speak now..." }) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && (window.webkitSpeechRecognition || window.SpeechRecognition)) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recog = new SpeechRecognition();
      recog.continuous = false;
      recog.interimResults = false;
      recog.lang = 'en-IN'; // Optimized for Indian accent

      recog.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        onResult(transcript);
        setIsListening(false);
      };

      recog.onerror = () => {
        setIsListening(false);
      };

      recog.onend = () => {
        setIsListening(false);
      };

      setRecognition(recog);
    }
  }, [onResult]);

  const toggleListening = () => {
    if (isListening) {
      recognition?.stop();
    } else {
      recognition?.start();
      setIsListening(true);
    }
  };

  return (
    <button
      type="button"
      onClick={toggleListening}
      className={`relative p-5 rounded-full transition-all duration-500 hover:scale-110 active:scale-90 flex items-center justify-center ${
        isListening 
          ? 'bg-terracotta text-white shadow-[0_0_30px_rgba(201,77,56,0.5)] animate-pulse' 
          : 'bg-white text-banyan-green shadow-xl border border-banyan-green/5'
      }`}
    >
      {isListening ? (
        <div className="flex items-center gap-2">
          <Mic size={24} />
          <span className="text-xs font-black uppercase tracking-widest">{placeholder}</span>
        </div>
      ) : (
        <Mic size={24} />
      )}
      {isListening && (
        <div className="absolute inset-0 rounded-full border-4 border-terracotta/30 animate-ping" />
      )}
    </button>
  );
};

export default VoiceInput;
