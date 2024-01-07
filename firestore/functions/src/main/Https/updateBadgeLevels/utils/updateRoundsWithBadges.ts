import { getRoundByWithBadgeId } from "../../../../models/Rounds/getUserRankV2";
import { updateRoundMain } from "../../challenges/updateRound/main";

export const updateRoundsWithBadges = async (badgeId: string) => {
  const rounds = await getRoundByWithBadgeId(badgeId);

  for (const round of rounds) {
    await updateRoundMain(round.id);
  }
};
