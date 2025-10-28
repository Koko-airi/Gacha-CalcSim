import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Calculator, ToolCase } from "lucide-react";
import { figtree } from "@/lib/fonts";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 fade-in">
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
        <Card className="px-8 py-6 drop-shadow-xl drop-shadow-gray-900 border-2 border-gray-600">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Select Game
            </label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose a game..." />
              </SelectTrigger>
              <SelectContent className="p-1.5">
                <SelectItem value="one">Genshin Impact</SelectItem>
                <SelectItem value="two">Honkai Star Rail</SelectItem>
                <SelectItem value="three">Zenless Zone Zero</SelectItem>
                {/* NOTE TO SELF:
                use a link with a url parameter to pass the selected game to the calculator/simulator pages
                */}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/calculator" className="w-full">
              <Button
                size="lg"
                className="w-full h-12 text-lg gap-2 bg-primary hover:bg-primary/90 cursor-pointer font-medium"
              >
                <Calculator className="size-5" />
                Calculate
              </Button>
            </Link>
            <Link href="/simulator" className="w-full">
              <Button
                size="lg"
                variant="secondary"
                className="w-full h-12 text-lg gap-2 bg-secondary hover:bg-secondary/90 cursor-pointer font-medium"
              >
                <ToolCase className="size-5" />
                Gacha Simulator
              </Button>
            </Link>
          </div>
        </Card>
        <p className="text-center text-gray-300 drop-shadow-xs text-sm">
          Created by Null Pointer Exception
        </p>
      </div>
    </div>
  );
}
