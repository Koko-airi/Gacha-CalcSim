// --- Constants ---
const MAX_PULLS = 5000;
const CHARACTER_HARD_PITY = 90;
const WEAPON_HARD_PITY = 77;
const CHARACTER_SOFT_PITY_START = 74;
const WEAPON_SOFT_PITY_START = 63;
const CHARACTER_BASE_RATE = 0.006;
const WEAPON_BASE_RATE = 0.007;
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

const pityRatePerPull: number[] = computePityRates(
  CHARACTER_HARD_PITY,
  CHARACTER_SOFT_PITY_START,
  CHARACTER_BASE_RATE
);
const weaponPityRatePerPull: number[] = computePityRates(
  WEAPON_HARD_PITY,
  WEAPON_SOFT_PITY_START,
  WEAPON_BASE_RATE
);

/**
 * Creates a 3D array initialized with zeros.
 * @param d1 - Dimension 1 size
 * @param d2 - Dimension 2 size
 * @param d3 - Dimension 3 size
 * @returns A new d1 x d2 x d3 array filled with 0.
 */
function create3DArray(d1: number, d2: number, d3: number): number[][][] {
  return Array.from({ length: d1 }, () =>
    Array.from({ length: d2 }, () => new Array(d3).fill(0))
  );
}

/**
 * Calculates the probability of having EXACTLY 'N' featured 5-stars after 'i' pulls.
 * @param maxN The maximum number of featured 5-stars to track (1-7 inclusive).
 * @param pullString A string representing the pull plan (e.g., "C3W2C1" for 3 character copies, 2 weapon copies, 1 character copy).
 * @returns An array of objects with pulls and constellation probabilities (c0, c1, etc.)
 */
export function getExactFeaturedRates(
  maxN: number,
  pullString: string
): Array<Record<string, string | number>> {
  // if (maxN < 1 || maxN > 7) {
  //   throw new Error("maxN must be between 1 and 7 inclusive");
  // }

  // dp[k][pity][state]: Probability of having k copies, at 'pity', on 'state' after pull (i-1).
  // Note: k goes from 0 up to maxN.
  // state: 0 for 50/50, 1 for guarantee.
  let dp: number[][][] = create3DArray(maxN + 1, CHARACTER_HARD_PITY + 1, 2);

  // results[i][j]: P(exactly j copies after i pulls)
  const results: number[][] = Array.from({ length: MAX_PULLS + 1 }, () =>
    new Array(maxN + 1).fill(0)
  );

  // Initialization: At 0 pulls, we have 0 featured 5-stars, 0 pity, on 50/50.
  dp[0][0][0] = 1.0;
  results[0][0] = 1.0;

  // Iterate for each pull i from 1 to MAX_PULLS
  for (let i = 1; i <= MAX_PULLS; i++) {
    const next_dp: number[][][] = create3DArray(
      maxN + 1,
      CHARACTER_HARD_PITY + 1,
      2
    );

    // Iterate through all current states (k, pity, state) from the previous pull (i-1)
    for (let k = 0; k <= maxN; k++) {
      for (let pity = 0; pity < CHARACTER_HARD_PITY; pity++) {
        const nextPity = pity + 1;
        let pullRate;

        // Determine which type of item we're pulling for based on current k value
        // pullString[k] tells us the type of the (k+1)th copy we're trying to get
        const currentPullType =
          k < pullString.length ? pullString.charAt(k) : pullString.charAt(0);
        if (currentPullType === "C") pullRate = pityRatePerPull[nextPity];
        else pullRate = weaponPityRatePerPull[nextPity];
        const noPullRate = 1.0 - pullRate;

        // --- 1. Transition from 50/50 (state 0) ---
        const prob5050 = dp[k][pity][0];
        if (prob5050 > 0) {
          // Case 1a: No 5-star pull. Stay at k, pity increases.
          next_dp[k][nextPity][0] += prob5050 * noPullRate;

          // Case 1b: 5-star pulled, lost 50/50. Stay at k, pity resets, move to guarantee (state 1).
          next_dp[k][0][1] += prob5050 * pullRate * 0.5;

          // Case 1c: 5-star pulled, won 50/50. Move to k+1.
          const nextK = Math.min(k + 1, maxN); // Cap at maxN
          next_dp[nextK][0][0] += prob5050 * pullRate * 0.5;
        }

        // --- 2. Transition from Guarantee (state 1) ---
        const probGuar = dp[k][pity][1];
        if (probGuar > 0) {
          // Case 2a: No 5-star pull. Stay at k, pity increases.
          next_dp[k][nextPity][1] += probGuar * noPullRate;

          // Case 2b: 5-star pulled (guaranteed featured). Move to k+1.
          const nextK = Math.min(k + 1, maxN); // Cap at maxN
          next_dp[nextK][0][0] += probGuar * pullRate;
        }
      }
    }
    // Update the main DP table for the next pull
    dp = next_dp;

    // --- Finalize Result for Pull 'i' ---
    // Sum up the probabilities for each 'k' to get the total chance of having EXACTLY k copies after i pulls.
    for (let j = 0; j <= maxN; j++) {
      let totalProb = 0.0;
      for (let p = 0; p <= CHARACTER_HARD_PITY; p++) {
        totalProb += dp[j][p][0]; // Sum 50/50 states
        totalProb += dp[j][p][1]; // Sum Guarantee states
      }
      results[i][j] = totalProb;
    }
  }

  // Format the results into the desired output structure
  const output: Array<Record<string, string | number>> = [];

  // Find the last pull where the highest constellation probability is < 1.0 (or ~100%)
  let lastPull = MAX_PULLS;
  for (let i = 1; i <= MAX_PULLS; i++) {
    // Calculate the probability for N >= maxN
    let probNPlus = 0;
    for (let n = maxN; n <= maxN; n++) {
      probNPlus += results[i][n];
    }

    // Stop when the highest constellation reaches ~100%
    if (probNPlus >= 0.99999) {
      lastPull = i;
      break;
    }
  }

  // Build the output array
  for (let i = 1; i <= lastPull; i++) {
    const entry: Record<string, string | number> = {
      pulls: i.toString(),
    };

    // Add c0 through c(maxN-2) with exact probabilities for N=1 through N=maxN-1, as a percentage
    for (let n = 1; n < maxN; n++) {
      const cKey = `${pullString.charAt(0) === "C" ? "c" : "r"}${n - 1}`;
      entry[cKey] = results[i][n] * 100;
    }

    // Add the last constellation with N >= maxN, as a percentage
    const lastCKey = `${pullString.charAt(0) === "C" ? "c" : "r"}${maxN - 1}`;
    let probNPlus = 0;
    for (let n = maxN; n <= maxN; n++) {
      probNPlus += results[i][n];
    }
    entry[lastCKey] = probNPlus * 100;

    output.push(entry);
  }

  return output;
}

/**
 * Parses the rates data to convert exact probabilities into cumulative probabilities.
 * This is the chance of obtaining a constellation, NOT the chance of ending up with exactly that constellation.
 * Example: P(c1) = P(c1) + P(c2) + P(c3) + ...
 * @param data The rates data from getExactFeaturedRates
 * @param offset The offset to apply based on current constellation
 * @returns An array of objects with pulls and constellation probabilities (c0, c1, etc.)
 */
export function parseRatesForGraph(
  data: Record<string, string | number>[],
  offset: number
): Record<string, string | number>[] {
  // Calculate offset from current
  return data.map(entry => {
    const result: Record<string, string | number> = { pulls: entry.pulls };

    // Find all constellation keys and sort them in descending order
    const constellationKeys = Object.keys(entry)
      .filter(key => key.startsWith("c") || key.startsWith("r"))
      .sort((a, b) => Number(b.slice(1)) - Number(a.slice(1)));

    // Calculate cumulative sums from highest to lowest
    let cumulativeSum = 0;
    for (const key of constellationKeys) {
      cumulativeSum += entry[key] as number;

      // Apply offset to the key
      const keyNumber = Number(key.slice(1));
      const newKey = `${key.charAt(0)}${keyNumber + offset}`;
      result[newKey] = cumulativeSum;
    }

    return result;
  });
}

function convertEntryToPercentages(
  entry: Record<string, string | number>,
  offset: number
): Record<string, string | number> {
  const newEntry: Record<string, string | number> = {};

  // Apply offset to constellation keys
  for (const [key, value] of Object.entries(entry)) {
    const firstChar = key.charAt(0);
    if (key !== "pulls" && (firstChar === "c" || firstChar === "r")) {
      const keyNumber = Number(key.slice(1));
      const newKey = `${firstChar}${keyNumber + offset}`;
      newEntry[newKey] = value;
    }
  }

  newEntry.None =
    100 -
    Object.values(newEntry).reduce(
      (acc: number, val) => (acc as number) + (val as number),
      0
    );
  return newEntry;
}

export function findProbabilityForPullCount(
  data: Record<string, string | number>[],
  targetPulls: string,
  offset: number
) {
  if (data.length === 0) return null;
  const lastEntry = data[data.length - 1];
  if (Number(lastEntry.pulls) < Number(targetPulls))
    return convertEntryToPercentages(lastEntry, offset); // If targetPulls exceeds max pulls, return the last entry
  for (const entry of data) {
    if (entry.pulls === targetPulls) {
      return convertEntryToPercentages(entry, offset);
    }
  }
  return null; // Return null if not found
}
