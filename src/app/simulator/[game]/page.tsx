"use client";

import { use } from "react";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Dices } from "lucide-react";
import { figtree } from "@/lib/fonts";
import { useRouter } from "next/navigation";
import transition from "@/lib/transition";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function CalculatorPage({
  params,
}: {
  params: Promise<{ game: GameType }>;
}) {
  const { game } = use(params);
  const router = useRouter();

  return (
    <div className="min-h-screen p-4 py-8 md:p-8 fade-in" id="calculator-page">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="relative">
          <button
            onClick={() => transition(router, "/", "calculator-page")}
            className="hover:bg-transparent cursor-pointer text-gray-100 drop-shadow-sm drop-shadow-gray-200/40 absolute z-20 top-2 transition-transform duration-200 hover:scale-105"
          >
            <ArrowLeft className="size-6" />
          </button>
          <h1
            className={`text-4xl font-semibold drop-shadow-emerald-600 drop-shadow-xs text-emerald-200 ${figtree.className} text-center`}
          >
            {game === "genshin"
              ? "Genshin Impact Wish"
              : game === "hsr"
              ? "Honkai Star Rail Warp"
              : "Zenless Zone Zero Wish"}{" "}
            Simulator
          </h1>
        </div>

        {/* Input Card */}
        <Card className="p-6 shadow-xl border-2 min-h-[400px]">
          <Tabs defaultValue="character">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className={`text-2xl font-bold ${figtree.className}`}>
                  Select Promotional & Featured Rewards
                </h3>
                <TabsList>
                  <TabsTrigger value="character">Character</TabsTrigger>
                  <TabsTrigger value="weapon">Weapon</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="character">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Select
                    // onValueChange={(value: string) => setGame(value as GameType)}
                    >
                      <Label className="text-black font-medium">
                        Promotional 5 ★
                      </Label>
                      <SelectTrigger className="w-full max-w-sm">
                        <SelectValue placeholder="Choose a reward..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="item">Reward</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Select
                    // onValueChange={(value: string) => setGame(value as GameType)}
                    >
                      <Label className="text-black font-medium">
                        Featured 4 ★
                      </Label>
                      <SelectTrigger className="w-full max-w-sm">
                        <SelectValue placeholder="Choose a reward..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="item">Reward</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Select
                    // onValueChange={(value: string) => setGame(value as GameType)}
                    >
                      <Label className="text-black font-medium">
                        Featured 4 ★
                      </Label>
                      <SelectTrigger className="w-full max-w-sm">
                        <SelectValue placeholder="Choose a reward..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="item">Reward</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Select
                    // onValueChange={(value: string) => setGame(value as GameType)}
                    >
                      <Label className="text-black font-medium">
                        Featured 4 ★
                      </Label>
                      <SelectTrigger className="w-full max-w-sm">
                        <SelectValue placeholder="Choose a reward..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="item">Reward</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="weapon">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Select
                    // onValueChange={(value: string) => setGame(value as GameType)}
                    >
                      <Label className="text-black font-medium">
                        Promotional 5 ★
                      </Label>
                      <SelectTrigger className="w-full max-w-sm">
                        <SelectValue placeholder="Choose a reward..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="item">Reward</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Select
                    // onValueChange={(value: string) => setGame(value as GameType)}
                    >
                      <Label className="text-black font-medium">
                        Promotional 5 ★
                      </Label>
                      <SelectTrigger className="w-full max-w-sm">
                        <SelectValue placeholder="Choose a reward..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="item">Reward</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Select
                    // onValueChange={(value: string) => setGame(value as GameType)}
                    >
                      <Label className="text-black font-medium">
                        Featured 4 ★
                      </Label>
                      <SelectTrigger className="w-full max-w-sm">
                        <SelectValue placeholder="Choose a reward..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="item">Reward</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Select
                    // onValueChange={(value: string) => setGame(value as GameType)}
                    >
                      <Label className="text-black font-medium">
                        Featured 4 ★
                      </Label>
                      <SelectTrigger className="w-full max-w-sm">
                        <SelectValue placeholder="Choose a reward..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="item">Reward</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Select
                    // onValueChange={(value: string) => setGame(value as GameType)}
                    >
                      <Label className="text-black font-medium">
                        Featured 4 ★
                      </Label>
                      <SelectTrigger className="w-full max-w-sm">
                        <SelectValue placeholder="Choose a reward..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="item">Reward</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Select
                    // onValueChange={(value: string) => setGame(value as GameType)}
                    >
                      <Label className="text-black font-medium">
                        Featured 4 ★
                      </Label>
                      <SelectTrigger className="w-full max-w-sm">
                        <SelectValue placeholder="Choose a reward..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="item">Reward</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </Card>

        {/* Pull Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            size="lg"
            // onClick={() => simulatePull(1)}
            className="h-16 text-lg gap-2 bg-primary hover:bg-primary/90"
          >
            <Dices className="size-5" />
            Pull ×1
          </Button>
          <Button
            size="lg"
            // onClick={() => simulatePull(10)}
            className="h-16 text-lg gap-2 bg-secondary hover:bg-secondary/90"
          >
            <Dices className="size-5" />
            Pull ×10
          </Button>
        </div>
      </div>
    </div>
  );
}
