// --- Constants ---
const SUPPORTED_GAMES: readonly GameType[] = ["genshin", "hsr", "zzz"];
export const HARD_PITY = {
  genshin: {
    character: 90,
    weapon: 77,
  },
  hsr: {
    character: 90,
    weapon: 80,
  },
  zzz: {
    character: 90,
    weapon: 80,
  },
};
const SOFT_PITY_START = {
  genshin: {
    character: 74,
    weapon: 63,
  },
  hsr: {
    character: 74,
    weapon: 66,
  },
  zzz: {
    character: 74,
    weapon: 65,
  },
};
const BASE_RATE = {
  genshin: {
    character: 0.006,
    weapon: 0.007,
  },
  hsr: {
    character: 0.006,
    weapon: 0.008,
  },
  zzz: {
    character: 0.006,
    weapon: 0.01,
  },
};
export const RATE_5050 = {
  genshin: {
    character: 0.5,
    weapon: 0.375,
  },
  hsr: {
    character: 0.5625,
    weapon: 0.78125,
  },
  zzz: {
    character: 0.5,
    weapon: 0.75,
  },
};
const GUARANTEED_RATE = 1.0;

// --- Pre-computed Pity Rates ---
/**
 * Computes pity rates for a given hard pity and soft pity start.
 */
function computePityRates(
  hardPity: number,
  softPityStart: number,
  baseRate: number
): number[] {
  const rates: number[] = new Array(hardPity + 1).fill(0);
  const softPityIncrement =
    (GUARANTEED_RATE - baseRate) / (hardPity - (softPityStart - 1));

  for (let i = 1; i <= hardPity; i++) {
    if (i < softPityStart) {
      rates[i] = baseRate;
    } else if (i < hardPity) {
      rates[i] = baseRate + (i - (softPityStart - 1)) * softPityIncrement;
    } else {
      rates[i] = GUARANTEED_RATE;
    }
  }

  return rates;
}

/**
 * Pre-computed pity rates for all supported games.
 */
export const pityRatePerPull = Object.fromEntries(
  SUPPORTED_GAMES.map(game => [
    game,
    Object.fromEntries(
      (["character", "weapon"] as const).map(type => [
        type,
        computePityRates(
          HARD_PITY[game][type],
          SOFT_PITY_START[game][type],
          BASE_RATE[game][type]
        ),
      ])
    ),
  ])
) as {
  [key in GameType]: {
    character: number[];
    weapon: number[];
  };
};

/**
 * Pre-computed 4 star pity rates for all supported games.
 */
export const pityRatePerPull4Star = Object.fromEntries(
  SUPPORTED_GAMES.map(game => [
    game,
    game == "zzz"
      ? [
          0.0, 0.072, 0.072, 0.072, 0.072, 0.072, 0.072, 0.072, 0.072, 0.072,
          1.0,
        ]
      : [
          0.0, 0.051, 0.051, 0.051, 0.051, 0.051, 0.051, 0.051, 0.051, 0.051,
          1.0,
        ],
  ])
) as {
  [key in GameType]: number[];
};
