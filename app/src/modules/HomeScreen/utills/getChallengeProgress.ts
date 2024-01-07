import { RoundInterface } from "@models/Rounds/interface";

const now = Date.now();

export const getChallengeProgress = (round?: RoundInterface) => {
  const progress =
    round?.end && round.start
      ? (now - round.start) / (round?.end - round?.start)
      : 0;

  if (progress >= 1) {
    return 100;
  } else if (progress <= 0) {
    return 0;
  }

  return Math.round(progress * 100);
};
