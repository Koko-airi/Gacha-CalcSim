"use client";

import { useState } from "react";
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
import { useRouter } from "next/navigation";
import transition from "@/lib/transition";

export default function HomeCard() {
  const [game, setGame] = useState<GameType | "">("");
  const router = useRouter();

  return (
    <Card className="px-8 py-6 drop-shadow-xl drop-shadow-gray-900 border-2 border-gray-600">
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          Select Game
        </label>
        <Select
          value={game}
          onValueChange={(value: string) => setGame(value as GameType)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Choose a game..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="genshin">Genshin Impact</SelectItem>
            <SelectItem value="hsr">Honkai Star Rail</SelectItem>
            <SelectItem value="zzz">Zenless Zone Zero</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button
          size="lg"
          className={`w-full h-12 text-lg gap-2 bg-primary hover:bg-primary/90 font-medium ${
            game != "" && "cursor-pointer"
          }`}
          disabled={!game}
          onClick={() => {
            if (game != "")
              transition(router, `/calculator/${game}`, "home-page");
          }}
        >
          <Calculator className="size-5" />
          Calculate
        </Button>
        <Button
          size="lg"
          variant="secondary"
          className={`w-full h-12 text-lg gap-2 bg-secondary hover:bg-secondary/90 font-medium ${
            game != "" && "cursor-pointer"
          }`}
          disabled={!game}
          onClick={() => {
            if (game != "")
              transition(router, `/simulator/${game}`, "homepage");
          }}
        >
          <ToolCase className="size-5" />
          Gacha Simulator
        </Button>
      </div>
    </Card>
  );
}
