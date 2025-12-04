"use client";

import { figtree } from "@/lib/fonts";
import HomeCard from "./_components/HomeCard";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import transition from "@/lib/transition";

export default function HomePage() {
  const router = useRouter();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6 fade-in"
      id="home-page"
    >
      <div className="w-full max-w-2xl space-y-8">
        <Button
          variant="secondary"
          className="absolute font-semibold text-white top-4 right-4 cursor-pointer drop-shadow-emerald-700 drop-shadow-xs"
          onClick={() => {
            transition(router, `/login`, "home-page");
          }}
        >
          <LogIn />
          Sign in to save your pulls!
        </Button>
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
          Created by{" "}
          <a
            href="https://github.com/Koko-airi/Gacha-CalcSim/"
            className="text-blue-300 font-medium hover:underline"
            target="_blank"
          >
            Null Pointer Exception
          </a>
        </p>
      </div>
    </div>
  );
}
