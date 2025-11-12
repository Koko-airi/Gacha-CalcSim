import { figtree } from "@/lib/fonts";
import HomeCard from "./_components/HomeCard";

export default function HomePage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6 fade-in"
      id="home-page"
    >
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center space-y-3">
          <h1
            className={`text-5xl font-semibold drop-shadow-emerald-700 drop-shadow-xs text-emerald-300 ${figtree.className}`}
          >
            Gacha CalcSim
          </h1>
          <p className="text-gray-300 drop-shadow-gray-700 drop-shadow-xs text-lg">
            Simulate and calculate gacha pulls with ease!
          </p>
        </div>
        <HomeCard />
        <p className="text-center text-gray-300 drop-shadow-xs text-sm">
          Created by Null Pointer Exception
        </p>
      </div>
    </div>
  );
}
