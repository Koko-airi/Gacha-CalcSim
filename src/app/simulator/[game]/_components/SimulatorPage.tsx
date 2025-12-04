"use client";

import { useTransition, useState } from "react";
import { Card } from "@/components/ui/card";
import { Dices, Loader2 } from "lucide-react";
import { figtree } from "@/lib/fonts";
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
import simulatePulls, { SimulationType } from "@/actions/simulatePulls";
import ResultDialog from "./ResultDialog";
import ReturnHome from "@/components/ReturnHome";

export default function SimulatorPage({
  game,
  rewardList,
}: {
  game: GameType;
  rewardList: {
    four: { character: string[]; weapon: string[] };
    five: { character: string[]; weapon: string[] };
  };
}) {
  const [isLoading, startTransition] = useTransition();
  const [promoState, setPromoState] = useState<SimulationType>({
    promo5Star: "",
    featured4Star1: "",
    featured4Star2: "",
    featured4Star3: "",
    bannerType: "character",
  });
  const [pullResults, setPullResults] = useState<RewardItem[]>([]);

  return (
    <div className="min-h-screen p-4 py-8 md:p-8 fade-in" id="calculator-page">
      <div className="max-w-6xl mx-auto space-y-6">
        <ResultDialog
          pullResults={pullResults}
          clearResults={() => setPullResults([])}
        />

        {/* Header */}
        <div className="relative">
          <ReturnHome />
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
          <Tabs
            defaultValue="character"
            value={promoState.bannerType}
            onValueChange={value =>
              setPromoState(
                value === "character"
                  ? {
                      promo5Star: "",
                      featured4Star1: "",
                      featured4Star2: "",
                      featured4Star3: "",
                      bannerType: "character",
                    }
                  : {
                      promo5Star1: "",
                      promo5Star2: "",
                      featured4Star1: "",
                      featured4Star2: "",
                      featured4Star3: "",
                      featured4Star4: "",
                      bannerType: "weapon",
                    }
              )
            }
          >
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
                      value={
                        promoState.bannerType === "character"
                          ? promoState.promo5Star
                          : ""
                      }
                      onValueChange={value =>
                        promoState.bannerType === "character" &&
                        setPromoState({ ...promoState, promo5Star: value })
                      }
                    >
                      <Label className="text-black font-medium">
                        Promotional 5 ★
                      </Label>
                      <SelectTrigger className="w-full max-w-sm">
                        <SelectValue placeholder="Choose a reward..." />
                      </SelectTrigger>
                      <SelectContent>
                        <ItemOptions
                          type={promoState.bannerType}
                          rarity={"five"}
                          rewardList={rewardList}
                        />
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Select
                      value={
                        promoState.bannerType === "character"
                          ? promoState.featured4Star1
                          : ""
                      }
                      onValueChange={value =>
                        promoState.bannerType === "character" &&
                        setPromoState({ ...promoState, featured4Star1: value })
                      }
                    >
                      <Label className="text-black font-medium">
                        Featured 4 ★
                      </Label>
                      <SelectTrigger className="w-full max-w-sm">
                        <SelectValue placeholder="Choose a reward..." />
                      </SelectTrigger>
                      <SelectContent>
                        <ItemOptions
                          type={promoState.bannerType}
                          rarity={"four"}
                          rewardList={rewardList}
                        />
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Select
                      value={
                        promoState.bannerType === "character"
                          ? promoState.featured4Star2
                          : ""
                      }
                      onValueChange={value =>
                        promoState.bannerType === "character" &&
                        setPromoState({ ...promoState, featured4Star2: value })
                      }
                    >
                      <Label className="text-black font-medium">
                        Featured 4 ★
                      </Label>
                      <SelectTrigger className="w-full max-w-sm">
                        <SelectValue placeholder="Choose a reward..." />
                      </SelectTrigger>
                      <SelectContent>
                        <ItemOptions
                          type={promoState.bannerType}
                          rarity={"four"}
                          rewardList={rewardList}
                        />
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Select
                      value={
                        promoState.bannerType === "character"
                          ? promoState.featured4Star3
                          : ""
                      }
                      onValueChange={value =>
                        promoState.bannerType === "character" &&
                        setPromoState({ ...promoState, featured4Star3: value })
                      }
                    >
                      <Label className="text-black font-medium">
                        Featured 4 ★
                      </Label>
                      <SelectTrigger className="w-full max-w-sm">
                        <SelectValue placeholder="Choose a reward..." />
                      </SelectTrigger>
                      <SelectContent>
                        <ItemOptions
                          type={promoState.bannerType}
                          rarity={"four"}
                          rewardList={rewardList}
                        />
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="weapon">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Select
                      value={
                        promoState.bannerType === "weapon"
                          ? promoState.promo5Star1
                          : ""
                      }
                      onValueChange={value =>
                        promoState.bannerType === "weapon" &&
                        setPromoState({ ...promoState, promo5Star1: value })
                      }
                    >
                      <Label className="text-black font-medium">
                        Promotional 5 ★
                      </Label>
                      <SelectTrigger className="w-full max-w-sm">
                        <SelectValue placeholder="Choose a reward..." />
                      </SelectTrigger>
                      <SelectContent>
                        <ItemOptions
                          type={promoState.bannerType}
                          rarity={"five"}
                          rewardList={rewardList}
                        />
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Select
                      value={
                        promoState.bannerType === "weapon"
                          ? promoState.promo5Star2
                          : ""
                      }
                      onValueChange={value =>
                        promoState.bannerType === "weapon" &&
                        setPromoState({ ...promoState, promo5Star2: value })
                      }
                    >
                      <Label className="text-black font-medium">
                        Promotional 5 ★
                      </Label>
                      <SelectTrigger className="w-full max-w-sm">
                        <SelectValue placeholder="Choose a reward..." />
                      </SelectTrigger>
                      <SelectContent>
                        <ItemOptions
                          type={promoState.bannerType}
                          rarity={"five"}
                          rewardList={rewardList}
                        />
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Select
                      value={
                        promoState.bannerType === "weapon"
                          ? promoState.featured4Star1
                          : ""
                      }
                      onValueChange={value =>
                        promoState.bannerType === "weapon" &&
                        setPromoState({ ...promoState, featured4Star1: value })
                      }
                    >
                      <Label className="text-black font-medium">
                        Featured 4 ★
                      </Label>
                      <SelectTrigger className="w-full max-w-sm">
                        <SelectValue placeholder="Choose a reward..." />
                      </SelectTrigger>
                      <SelectContent>
                        <ItemOptions
                          type={promoState.bannerType}
                          rarity={"four"}
                          rewardList={rewardList}
                        />
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Select
                      value={
                        promoState.bannerType === "weapon"
                          ? promoState.featured4Star2
                          : ""
                      }
                      onValueChange={value =>
                        promoState.bannerType === "weapon" &&
                        setPromoState({ ...promoState, featured4Star2: value })
                      }
                    >
                      <Label className="text-black font-medium">
                        Featured 4 ★
                      </Label>
                      <SelectTrigger className="w-full max-w-sm">
                        <SelectValue placeholder="Choose a reward..." />
                      </SelectTrigger>
                      <SelectContent>
                        <ItemOptions
                          type={promoState.bannerType}
                          rarity={"four"}
                          rewardList={rewardList}
                        />
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Select
                      value={
                        promoState.bannerType === "weapon"
                          ? promoState.featured4Star3
                          : ""
                      }
                      onValueChange={value =>
                        promoState.bannerType === "weapon" &&
                        setPromoState({ ...promoState, featured4Star3: value })
                      }
                    >
                      <Label className="text-black font-medium">
                        Featured 4 ★
                      </Label>
                      <SelectTrigger className="w-full max-w-sm">
                        <SelectValue placeholder="Choose a reward..." />
                      </SelectTrigger>
                      <SelectContent>
                        <ItemOptions
                          type={promoState.bannerType}
                          rarity={"four"}
                          rewardList={rewardList}
                        />
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Select
                      value={
                        promoState.bannerType === "weapon"
                          ? promoState.featured4Star4
                          : ""
                      }
                      onValueChange={value =>
                        promoState.bannerType === "weapon" &&
                        setPromoState({ ...promoState, featured4Star4: value })
                      }
                    >
                      <Label className="text-black font-medium">
                        Featured 4 ★
                      </Label>
                      <SelectTrigger className="w-full max-w-sm">
                        <SelectValue placeholder="Choose a reward..." />
                      </SelectTrigger>
                      <SelectContent>
                        <ItemOptions
                          type={promoState.bannerType}
                          rarity={"four"}
                          rewardList={rewardList}
                        />
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
            onClick={() =>
              startTransition(async () => {
                setPullResults(await simulatePulls(1, game, promoState));
              })
            }
            className="h-16 text-lg gap-2 bg-primary hover:bg-primary/90"
            disabled={
              isLoading ||
              (promoState.bannerType === "character"
                ? promoState.featured4Star3 == ""
                : promoState.bannerType === "weapon" &&
                  promoState.featured4Star4 == "")
            }
          >
            <Dices className="size-5" />
            Pull ×1
          </Button>
          <Button
            size="lg"
            onClick={() =>
              startTransition(async () => {
                setPullResults(await simulatePulls(10, game, promoState));
              })
            }
            className="h-16 text-lg gap-2 bg-secondary hover:bg-secondary/90"
            disabled={
              isLoading ||
              (promoState.bannerType === "character"
                ? promoState.featured4Star3 == ""
                : promoState.bannerType === "weapon" &&
                  promoState.featured4Star4 == "")
            }
          >
            <Dices className="size-5" />
            Pull ×10
          </Button>
        </div>
        {isLoading && (
          <div className="text-white flex items-center justify-center gap-2">
            <Loader2 className="animate-spin" /> <span>Pulling...</span>
          </div>
        )}
      </div>
    </div>
  );
}

function ItemOptions({
  type,
  rarity,
  rewardList,
}: {
  type: "character" | "weapon";
  rarity: "four" | "five";
  rewardList: {
    four: { character: string[]; weapon: string[] };
    five: { character: string[]; weapon: string[] };
  };
}) {
  return (
    <>
      {rewardList[rarity][type].map(name => (
        <SelectItem key={name} value={name}>
          {name}
        </SelectItem>
      ))}
    </>
  );
}
