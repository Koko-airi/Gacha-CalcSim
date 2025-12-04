# 🔮 Gacha CalcSim - Gacha Pull Calculator & Simulator

A gacha simulation and probability calculator designed for multi-game support, user history tracking. Built for performance and clarity. Check out the deployment [here](https://gacha-calc-sim.vercel.app/)!

## 🎮 Supported Games

- Genshin Impact
- Honkai: Star Rail
- Zenless Zone Zero

## 🛠️ Tech Stack

- **React + Next.js** for fast development, load times, and URL routes
- **PostgreSQL (Supabase)** for storing game reward info and user data
- **shadcn/ui** for customizable, accessible UI components
- **Recharts** for graphing pull calculations

## ⚙️ Quick Start

Ensure you have [Node.js](https://nodejs.org/) installed. Follow these steps to run the project locally:

1. **Clone the repository:**

```
git clone https://github.com/Koko-airi/Gacha-CalcSim
cd Gacha-CalcSim
```

2. **Install dependencies:**

```
npm install
```

3. **Set up environment variables:** Copy .env.example to create a .env file in the root directory.

```
NEXT_PUBLIC_SUPABASE_URL="..."
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=""..."
```

4. **Run the development server:**

```
npm run dev
```
