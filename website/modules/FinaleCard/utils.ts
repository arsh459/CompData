import { RoundObject } from "@models/Event/Event";

export const getFinaleDetails = (
  rounds: RoundObject[],
  challengeStarts: number
) => {
  let roundStarts = challengeStarts;

  // const now = Date.now();

  for (const round of rounds) {
    const roundEnds = roundStarts + round.length * 24 * 60 * 60 * 1000;

    // console.log("r", round);

    if (round.isFinale) {
      return {
        finaleStarts: roundStarts,
        name: round.name,
      };
    }

    roundStarts = roundEnds;
  }

  return {
    finaleStarts: -1,
    name: "",
  };
};
