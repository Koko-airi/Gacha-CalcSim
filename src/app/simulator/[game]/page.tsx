import SimulatorPage from "./_components/SimulatorPage";
import { fetchRewards } from "@/lib/rewards";

export default async function Simulator({
  params,
}: {
  params: Promise<{ game: GameType }>;
}) {
  const game = (await params).game;
  const { rewardsByRarity } = await fetchRewards(game);
  // const rewardList = { four: rewardsByRarity[4], five: rewardsByRarity[5] };
  const rewardList = {
    four: {
      character: rewardsByRarity[4].filter(r => r.isCharacter).map(r => r.name),
      weapon: rewardsByRarity[4].filter(r => !r.isCharacter).map(r => r.name),
    },
    five: {
      character: rewardsByRarity[5].filter(r => r.isCharacter).map(r => r.name),
      weapon: rewardsByRarity[5].filter(r => !r.isCharacter).map(r => r.name),
    },
  };
  return <SimulatorPage game={game} rewardList={rewardList} />;
}
