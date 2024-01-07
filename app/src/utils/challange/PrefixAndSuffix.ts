import { ROUND_LENGTH } from "@constants/gameStats";
import { format } from "date-fns";

export const getPrefixAndSuffix = (
  after?: number,
  challengeLength?: number,
  sprintLength?: number,
  roundLength?: number
) => {
  const now = Date.now();

  if (after && now > after && challengeLength) {
    const ends = after + challengeLength * 24 * 60 * 60 * 1000;
    return {
      prefix: ends > now ? "Game ends" : "Game ended",
      suffix: format(new Date(ends), "h:mmaaa d MMM"),
    };
  } else if (after && now > after && !challengeLength) {
    const secondsToNow = now - after;
    const secondsInRound =
      (roundLength ? roundLength : ROUND_LENGTH) * 24 * 60 * 60 * 1000;

    const roundsFinished = secondsToNow / secondsInRound;
    const roundsCeil = Math.ceil(roundsFinished);
    const deltaRounds = roundsCeil - roundsFinished;

    const deltaSeconds = deltaRounds * secondsInRound;

    return {
      prefix: "Next round starts",
      suffix: format(new Date(now + deltaSeconds), "h:mmaaa d MMM"),
    };
  } else if (after && now < after) {
    return {
      prefix: "Game starts",
      suffix: format(new Date(after), "h:mmaaa d MMM"),
    };
  }

  return {
    prefix: "",
    suffix: "",
  };
};
