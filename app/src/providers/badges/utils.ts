import { RoundObject } from "@models/Event/Event";

export const getRoundsForHome = (
  currentRoundId?: string,
  rounds?: RoundObject[]
) => {
  let index: number = 0;
  if (rounds && currentRoundId) {
    for (const round of rounds) {
      if (round.id === currentRoundId) {
        return rounds.slice(index, rounds.length).map((item) => item.id);
      }

      index++;
    }
  }

  return [];
};
