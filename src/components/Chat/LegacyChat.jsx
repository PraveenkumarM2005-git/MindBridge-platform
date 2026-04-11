import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Sparkles, MessageSquare, History, Phone, Video } from 'lucide-react';
import { supabase } from '../../supabaseClient';

const LegacyChat = ({ currentProfile, matchName = "Meera Sharma" }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef();

  useEffect(() => {
    // Initial mock messages for demo
    setMessages([
      { id: 1, sender: 'them', text: `Namaste ${currentProfile?.full_name?.split(' ')[0]}! I was just looking at your profile. Your interest in Vedic algorithms is fascinating.` },
      { id: 2, sender: 'me', text: "Thank you, Meera! I'd love to learn how they apply to traditional architecture." }
    ]);
  }, [currentProfile]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const myMessage = {
      id: Date.now(),
      sender: 'me',
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, myMessage]);
    setNewMessage('');
    
    // Simulate AI response/Real-time feel
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          sender: 'them',
          text: "That sounds like a beautiful way to bridge our knowledge. When should we start our first session?",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      }, 2000);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-[4rem] border border-banyan-green/5 shadow-2xl flex flex-col h-[700px] overflow-hidden">
      {/* Header */}
      <div className="p-8 bg-banyan-green text-linen flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-sage rounded-2xl flex items-center justify-center text-linen font-heading font-black text-xl shadow-xl">
            {matchName.charAt(0)}
          </div>
          <div>
            <h3 className="font-heading font-black text-2xl tracking-tighter">{matchName}</h3>
            <div className="flex items-center gap-2 opacity-60">
              <div className="w-2 h-2 bg-sage rounded-full animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest">Bridging Now</span>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all"><Phone size={20} /></button>
          <button className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all"><Video size={20} /></button>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 p-8 overflow-y-auto space-y-6 bg-linen/20"
      >
        <div className="text-center py-4">
          <span className="bg-linen text-muted-clay px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-banyan-green/5">Journey Started Today</span>
        </div>

        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, x: msg.sender === 'me' ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[70%] p-6 rounded-[2.5rem] shadow-sm relative ${
              msg.sender === 'me' 
                ? 'bg-banyan-green text-linen rounded-tr-none' 
                : 'bg-white text-banyan-green border border-banyan-green/5 rounded-tl-none'
            }`}>
              <p className="text-lg font-medium leading-relaxed">{msg.text}</p>
              <div className={`text-[10px] mt-2 font-black uppercase tracking-widest opacity-40 ${msg.sender === 'me' ? 'text-right' : 'text-left'}`}>
                {msg.timestamp || 'Just now'}
              </div>
            </div>
          </motion.div>
        ))}

        {isTyping && (
           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className="bg-white p-6 rounded-[2.5rem] rounded-tl-none border border-banyan-green/5 flex gap-1 items-center">
                 <div className="w-1.5 h-1.5 bg-sage rounded-full animate-bounce [animation-delay:-0.3s]" />
                 <div className="w-1.5 h-1.5 bg-sage rounded-full animate-bounce [animation-delay:-0.15s]" />
                 <div className="w-1.5 h-1.5 bg-sage rounded-full animate-bounce" />
              </div>
           </motion.div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="p-8 bg-white border-t border-banyan-green/5">
        <div className="relative">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Share some wisdom or ask a question..."
            className="w-full py-6 pl-8 pr-24 bg-linen/30 rounded-[2.5rem] border-2 border-transparent focus:border-banyan-green/20 outline-none font-medium text-lg text-banyan-green transition-all"
          />
          <button 
            type="submit"
            className="absolute right-3 top-3 bottom-3 px-8 bg-banyan-green text-linen rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-terracotta hover:scale-105 active:scale-95 transition-all shadow-xl"
          >
            <Send size={18} /> Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default LegacyChat;
