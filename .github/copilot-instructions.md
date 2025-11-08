# Gacha CalcSim - AI Coding Instructions

## Project Overview

A Next.js 15 gacha probability calculator for multi-game support (Genshin Impact, Honkai Star Rail, ZZZ). Uses complex dynamic programming to calculate exact probability distributions for obtaining featured 5-star characters/weapons across constellation/refinement levels.

## Tech Stack

- **Framework**: Next.js 15 with App Router (`/src/app`), React 19
- **Styling**: Tailwind CSS v4, shadcn/ui components
- **Database**: Prisma + PostgreSQL (currently minimal schema)
- **Charts**: Recharts with custom shadcn chart components
- **Package Manager**: pnpm

## Development Commands

```bash
pnpm dev          # Start dev server on localhost:3000
pnpm build        # Production build
pnpm lint         # Run ESLint
```

## Architecture & Key Files

### Core Calculator Logic (`/src/lib/algorithms/calculator.ts`)

The heart of the app - implements a 3D dynamic programming algorithm to calculate **exact** probabilities:

- **State**: `dp[k][pity][state]` where k=copies obtained, pity=current pity counter (0-90), state=0/1 (50/50 or guarantee)
- **Pity System**: Pre-computed rates with soft pity (74 for character, 64 for weapon) and hard pity (90/80)
- **Pull String Format**: String like "CCCWW" represents sequence of pulls needed (3 character copies + 2 weapon copies)
  - The order doesn't matter for probability - "CCC" (one char c0→c2) has same probabilities as "C" + "CC" (two chars, c0→c0 and c0→c1)
- **Three key exports**:
  - `getExactFeaturedRates(maxN, pullString)`: Returns probability of having EXACTLY N copies after i pulls
  - `parseRatesForGraph(data, offset)`: Converts exact → cumulative probabilities for chart display
  - `findProbabilityForPullCount(data, targetPulls, offset)`: Gets probability at specific pull count

### State Management Pattern

- Uses **custom hooks** for complex state (see `/src/hooks/usePullPlan.ts`)
- `usePullPlan()` returns tuple: `[slots, addSlot, removeSlot, duplicateSlot, updateSlotType, updateSlotCurrent, updateSlotTarget]`
- Always destructure in order when consuming: `const pullPlanState = usePullPlan()` then pass to components

### Component Structure

```
/src/app/calculator/
  page.tsx              # Main calculator page (client component)
  _components/          # Underscore prefix = route-specific private components
    PullPlan.tsx        # Pull plan slot manager UI
    PullChart.tsx       # Recharts visualization
```

### Type System (`/src/lib/types.ts`)

Global types defined at module level (not exported interfaces):

- `PullSlot`: Core state shape with id, type (Character/Weapon), current, target
- Union types: `CharacterCurrent`, `CharacterTarget`, `WeaponCurrent`, `WeaponTarget`
- Types are available globally due to TypeScript module resolution

### UI Components (`/src/components/ui/`)

shadcn/ui components - **DO NOT manually edit** these files. Regenerate via shadcn CLI if changes needed:

```bash
pnpx shadcn@latest add [component-name]
```

## Important Patterns

### Styling Conventions

- Use `cn()` utility from `/src/lib/utils.ts` for conditional classes
- Custom font: `figtree` imported from `/src/lib/fonts.ts` - apply via `className={figtree.className}`
- Consistent spacing: `space-y-6` for vertical sections, `gap-4` for grids
- Card borders: `border-2` with `shadow-xl` for depth

### Client Components

All interactive pages/components use `"use client"` directive. Key indicators:

- Uses hooks (`useState`, `useEffect`, custom hooks)
- Event handlers (`onClick`, `onChange`)
- Browser APIs

### Constellation/Refinement Naming

- Characters: `c0` through `c6` (7 levels)
- Weapons: `r1` through `r5` (5 levels)
- **Offset logic**: Current "None" = offset 0; current "c2" = offset 3 (c2 + 1)
- Weapon offset starts at 1 when current="None" (weapons start at r1, not r0)
- **Multi-slot system**: Total copies across all slots determines probabilities
  - Example: 1 char (None→c2) = 3 copies, same probability as 2 chars (None→c0, None→c1) = 1+2 copies
  - Build pull string by concatenating type letters: "CCC", "CCWW", etc.

### Chart Data Format

Chart expects array of objects: `{ pulls: string, c0: number, c1: number, ... }`

- Pull counts as strings (for XAxis dataKey)
- Probabilities as percentages (0-100)
- Dynamic keys based on constellation/refinement levels

## Future Development Notes

- Prisma schema is minimal - expand when adding user history/auth features
- Game selection dropdown in `page.tsx` currently non-functional (TODO: URL params)
- Multi-game support planned via URL parameters to calculator routes
- Chart currently shows all data - TODO: slice based on user input pulls

## Common Tasks

### Adding a new constellation level

1. Update types in `/src/lib/types.ts` (CharacterTarget/WeaponTarget)
2. Update constants in `PullPlan.tsx` (CHAR_TARGETS/WEAPON_TARGETS)
3. Update chartConfig in `PullChart.tsx` with new color

### Modifying probability calculations

- Edit `/src/lib/algorithms/calculator.ts`
- Test with known edge cases (0 pulls, hard pity, guarantee states)
- Verify cumulative probabilities sum to ≤100%

### Adding database models

1. Update `/prisma/schema.prisma`
2. Run: `pnpx prisma generate` then `pnpx prisma migrate dev --name [description]`
3. Import client from `/lib/prisma.ts` (not direct from @prisma/client)
