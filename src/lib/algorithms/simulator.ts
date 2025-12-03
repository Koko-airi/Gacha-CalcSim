import {
  pityRatePerPull,
  pityRatePerPull4Star,
  RATE_5050,
} from "./lib/pityRates";

/**
 * Tracks simulator state between pulls.
 */
interface SimulatorState {
  currentPity5: number;
  currentPity4: number;
  fiveStar5050: boolean;
  fourStar5050: boolean;
}

export enum PullResult {
  FEATURED_5_STAR,
  STANDARD_5_STAR,
  FEATURED_4_STAR,
  STANDARD_4_STAR,
  WEAPON_3_STAR,
}

/**
 * Helper function to determine if a 5-star is won based on pity.
 * @param currentPity Current 5 star pity.
 * @param game Game type.
 * @param type Pull type ("character" or "weapon").
 * @returns Boolean indicating if a 5-star is won.
 */
const win5Star = (
  currentPity: number,
  game: GameType,
  type: "character" | "weapon"
): boolean => {
  return Math.random() <= pityRatePerPull[game][type][currentPity];
};

/**
 * Helper function to determine if a 4-star is won based on pity.
 * @param currentPity Current 4 star pity.
 * @param game Game type.
 * @param type Pull type ("character" or "weapon").
 * @returns Boolean indicating if a 4-star is won.
 */
const win4Star = (currentPity: number, game: GameType): boolean => {
  return Math.random() <= pityRatePerPull4Star[game][currentPity];
};

/**
 * Performs one pull and updates the simulator state accordingly.
 * @param state Current simulator state.
 * @param game Game type.
 * @param type Pull type ("character" or "weapon").
 * @returns Tuple containing the pull result and updated simulator state.
 */
export const performPull = (
  state: SimulatorState,
  game: GameType,
  type: "character" | "weapon"
): [PullResult, SimulatorState] => {
  const adjustedPity4 = Math.min(state.currentPity4, 10);

  const won5Star = win5Star(state.currentPity5, game, type);
  const won4Star = win4Star(adjustedPity4, game);

  if (won5Star) {
    if (state.fiveStar5050) {
      return [
        PullResult.FEATURED_5_STAR,
        {
          ...state,
          currentPity5: 0,
          currentPity4: adjustedPity4 + 1,
          fiveStar5050: false,
        },
      ];
    }

    if (Math.random() < RATE_5050[game][type]) {
      return [
        PullResult.FEATURED_5_STAR,
        {
          ...state,
          currentPity5: 0,
          currentPity4: adjustedPity4 + 1,
          fiveStar5050: false,
        },
      ];
    }

    return [
      PullResult.STANDARD_5_STAR,
      {
        ...state,
        currentPity5: 0,
        currentPity4: adjustedPity4 + 1,
        fiveStar5050: true,
      },
    ];
  }

  if (won4Star) {
    if (state.fourStar5050) {
      return [
        PullResult.FEATURED_4_STAR,
        {
          ...state,
          currentPity5: state.currentPity5 + 1,
          currentPity4: 0,
          fourStar5050: false,
        },
      ];
    }
    // TODO: Modify the rates for 4-star based on game type.
    if (Math.random() < RATE_5050[game][type]) {
      return [
        PullResult.FEATURED_4_STAR,
        {
          ...state,
          currentPity5: state.currentPity5 + 1,
          currentPity4: 0,
          fourStar5050: false,
        },
      ];
    }

    return [
      PullResult.STANDARD_4_STAR,
      {
        ...state,
        currentPity5: state.currentPity5 + 1,
        currentPity4: 0,
        fourStar5050: true,
      },
    ];
  }

  return [
    PullResult.WEAPON_3_STAR,
    {
      ...state,
      currentPity5: state.currentPity5 + 1,
      currentPity4: adjustedPity4 + 1,
    },
  ];
};

/**
 * Initializes the simulator state.
 * @returns Initial simulator state.
 */
export const createSimulatorState = (): SimulatorState => ({
  currentPity5: 0,
  currentPity4: 0,
  fiveStar5050: false,
  fourStar5050: false,
});

/**
 * Simulates a series of pulls and returns the results.
 * @param pulls Number of pulls to simulate.
 * @param game Game type.
 * @param type Pull type ("character" or "weapon").
 * @returns Array of pull results.
 */
export const runSimulation = (
  pulls: number,
  game: GameType,
  type: "character" | "weapon"
): PullResult[] => {
  let state = createSimulatorState();
  const results: PullResult[] = [];

  for (let i = 0; i < pulls; i++) {
    const [result, newState] = performPull(state, game, type);
    results.push(result);
    state = newState;
  }

  return results;
};
