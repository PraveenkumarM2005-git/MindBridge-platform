import React from 'react';
import { Home, Compass, Calendar, Coins, User } from 'lucide-react';

const BottomNav = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'discover', icon: Compass, label: 'Discover' },
    { id: 'sessions', icon: Calendar, label: 'Sessions' },
    { id: 'tokens', icon: Coins, label: 'Tokens' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-banyan-green/5 flex justify-center items-center px-4 py-4 z-50 rounded-t-[3rem] shadow-[0_-15px_40px_rgba(0,0,0,0.08)]">
      <div className="flex justify-around items-center w-full max-w-7xl">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className="flex flex-col items-center gap-1 group"
          >
            <div className={`p-2 rounded-2xl transition-all duration-300 ${isActive ? 'bg-terracotta text-white shadow-lg shadow-terracotta/20 scale-110' : 'text-muted-clay hover:bg-muted-clay/5'}`}>
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            </div>
            <span className={`text-[10px] font-bold uppercase tracking-tighter transition-all duration-300 ${isActive ? 'text-terracotta opacity-100' : 'text-muted-clay opacity-60'}`}>
              {tab.label}
            </span>
          </button>
        );
      })}
      </div>
    </nav>
  );
};

export default BottomNav;
