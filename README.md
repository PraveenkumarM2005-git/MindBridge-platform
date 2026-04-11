# 🌿 MindBridge: Bridging the Generational Gap

**MindBridge** is an intergenerational reciprocity platform designed to connect the wisdom of seniors with the digital mastery of youth. Built for the modern age, it transforms human connection into a shared journey of growth, heritage preservation, and mutual respect.

---

## 🚀 Vision
In a world growing increasingly digital, our elders are being left behind, while our youth are losing touch with cultural heritage. **MindBridge** creates a "Neural Bridge" between these two worlds, allowing seniors to share life lessons and heritage skills in exchange for digital empowerment from younger generations.

## ✨ Core Features

### 🧠 Modern AI Matching (GPT-Powered)
- **Neural Heritage Engine**: Uses state-of-the-art reasoning to match users based on "Soul over Faces."
- **AI Reasoning Insights**: Transparent GPT-powered justification for why a match was made, analyzing 60+ years of context.

### 🛡️ Voice Guardian
- **Senior-First Security**: A voice-activated "Safe Mode" that creates a secure environment for elders, designed for maximum accessibility and peace of mind.

### 🪙 Reciprocity Token Engine
- **Wisdom Currency**: A unique token system where human value is the only currency. Seniors earn tokens by sharing legacy wisdom, which they can spend to receive digital help from "Digital Natives."

### 🎨 High-Fidelity Experience
- **Linen & Banyan Design**: A curated visual language inspired by sustainable living and ancient heritage, built with **React**, **Tailwind CSS v4**, and **Framer Motion**.
- **Intuitive Onboarding**: A seamless transition from landing to role selection, optimized for both mobile and desktop experiences.

---

## 🛠️ Tech Stack
- **Frontend**: React (Vite), Tailwind CSS v4, Framer Motion, Lucide React.
- **Backend & Auth**: Supabase (PostgreSQL, Real-time Auth, RLS Security).
- **AI Integration**: GPT-4 Architecture (OpenAI) for Neural Match Reasoning.
- **PWA**: Fully responsive, mobile-first Progressive Web App.

---

## 📂 Project Structure
```text
MindBridge2.o/
├── src/
│   ├── components/
│   │   ├── Guardian/     # Voice-first security components
│   │   ├── Match/        # AI-powered matching interface
│   │   ├── Session/      # Booking & session management
│   │   └── Layout/       # Dynamic navigation
│   ├── supabaseClient.js # Secure database integration
│   └── App.jsx           # Main routing & state engine
├── SUPABASE_SETUP.sql    # Database schema & RLS policies
└── tailwind.config.js    # Linen & Banyan design tokens
```

---

## ⚡ Quick Start

1. **Clone & Install**:
   ```bash
   git clone https://github.com/PraveenkumarM2005-git/MindBridge-platform.git
   cd MindBridge-platform
   npm install
   ```

2. **Environment Setup**:
   Create a `.env` file based on `.env.example`:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_key
   VITE_OPENAI_API_KEY=your_openai_key
   ```

3. **Database Setup**:
   Run the content of `SUPABASE_SETUP.sql` in your Supabase SQL Editor to initialize the `profiles`, `matches`, and `sessions` tables.

4. **Run Locally**:
   ```bash
   npm run dev
   ```

---

## 🏆 Hackathon Achievements
- **Seamless Auth Flow**: Optimized redirect engine that handles Google OAuth and Magic Links perfectly.
- **Accessibility**: Voice-first design considerations for senior users.
- **Zero-Friction UX**: Automated onboarding that guides users from landing to their first session in under 60 seconds.

---

## 👨‍💻 Author
**Praveen Kumar M**  
[GitHub](https://github.com/PraveenkumarM2005-git)

---

*“Every session is a leaf in the Banyan tree of our collective wisdom.”* 🌿
