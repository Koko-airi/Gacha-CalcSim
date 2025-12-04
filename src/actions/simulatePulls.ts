"use server";

import { PullResult, runSimulation } from "@/lib/algorithms/simulator";
import { fetchRewards } from "@/lib/rewards";
import { createClient } from "@/utils/supabase/server";

type CharacterSimulation = {
  promo5Star: string;
  featured4Star1: string;
  featured4Star2: string;
  featured4Star3: string;
  bannerType: "character";
};

type WeaponSimulation = {
  promo5Star1: string;
  promo5Star2: string;
  featured4Star1: string;
  featured4Star2: string;
  featured4Star3: string;
  featured4Star4: string;
  bannerType: "weapon";
};

export type SimulationType = CharacterSimulation | WeaponSimulation;

/**
 * Server action to run the pull simulation.
 * Pull results are fetched from the database.
 * @param pulls Number of pulls to simulate.
 * @param game Game type.
 * @param type Simulation configuration.
 */
export default async function simulatePulls(
  pulls: number,
  game: GameType,
  type: SimulationType
) {
  const pullResults = runSimulation(pulls, game, type.bannerType);
  const supabase = await createClient();

  // Fetch all rewards for this game once
  const { data: allRewards } = await supabase
    .from("rewards")
    .select("*")
    .eq("game", game);

  if (!allRewards) return [];

  let rewardsByName, rewardsByRarity;

  // Lookup maps for O(1) access
  try {
    const res = await fetchRewards(game);
    rewardsByName = res.rewardsByName;
    rewardsByRarity = res.rewardsByRarity;
  } catch (error) {
    console.warn("Failed to fetch rewards:", error);
    return [];
  }

  // Helper to get random reward by rarity
  const getRandomReward = (rarity: number) => {
    const pool = rewardsByRarity[rarity as 3 | 4 | 5];
    return pool[Math.floor(Math.random() * pool.length)];
  };

  // Helper to pick random featured 4-star
  const getRandomFeatured4Star = () => {
    const featured =
      type.bannerType === "character"
        ? [type.featured4Star1, type.featured4Star2, type.featured4Star3]
        : [
            type.featured4Star1,
            type.featured4Star2,
            type.featured4Star3,
            type.featured4Star4,
          ];
    return featured[Math.floor(Math.random() * featured.length)];
  };

  const rewardItems: RewardItem[] = [];

  for (const result of pullResults) {
    let reward;

    if (result === PullResult.FEATURED_5_STAR) {
      const promoName =
        type.bannerType === "character"
          ? type.promo5Star
          : Math.random() < 0.5
          ? type.promo5Star1
          : type.promo5Star2;
      reward = rewardsByName.get(promoName)!;
      rewardItems.push({
        name: reward.name,
        type: reward.isCharacter ? "character" : "weapon",
        rarity: 5,
      });
    } else if (result === PullResult.STANDARD_5_STAR) {
      reward = getRandomReward(5);
      rewardItems.push({
        name: reward.name,
        type: reward.isCharacter ? "character" : "weapon",
        rarity: 5,
      });
    } else if (result === PullResult.FEATURED_4_STAR) {
      reward = rewardsByName.get(getRandomFeatured4Star())!;
      rewardItems.push({
        name: reward.name,
        type: reward.isCharacter ? "character" : "weapon",
        rarity: 4,
      });
    } else if (result === PullResult.STANDARD_4_STAR) {
      reward = getRandomReward(4);
      rewardItems.push({
        name: reward.name,
        type: reward.isCharacter ? "character" : "weapon",
        rarity: 4,
      });
    } else {
      reward = getRandomReward(3);
      rewardItems.push({
        name: reward.name,
        type: reward.isCharacter ? "character" : "weapon",
        rarity: 3,
      });
    }
  }
  /* For debugging: log pull results
    rewardItems.forEach((item, index) => {
      console.log(
        `Pull ${index + 1}: ${item.rarity}-star ${item.type} - ${item.name}`
      );
    });
  */

  return rewardItems;
}
