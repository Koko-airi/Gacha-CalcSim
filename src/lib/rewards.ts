"use server";

import { createClient } from "@/utils/supabase/server";

export async function fetchRewards(game: GameType) {
  const supabase = await createClient();

  // Fetch all rewards for this game once
  const { data: allRewards } = await supabase
    .from("rewards")
    .select("*")
    .eq("game", game);

  if (!allRewards) throw new Error("Failed to fetch rewards");

  // Lookup maps for O(1) access
  const rewardsByName = new Map(allRewards.map(r => [r.name, r]));
  const rewardsByRarity = {
    5: allRewards.filter(r => r.rarity === 5),
    4: allRewards.filter(r => r.rarity === 4),
    3: allRewards.filter(r => r.rarity === 3),
  };

  return { rewardsByName, rewardsByRarity };
}
