import {
  CHALLENGE_ONE,
  FAT_BURNER_CHALLENGE,
  FAT_BURNER_GAME,
  RUNNER_GAME,
  WFH_CHALLENGE,
} from "../../../constants/challenge";

export const getGameName = (gameId: string) => {
  if (gameId === FAT_BURNER_CHALLENGE) {
    return "FAT_BURNER_CHALLENGE";
  } else if (gameId === FAT_BURNER_GAME) {
    return "FAT_BURNER_GAME";
  } else if (gameId === RUNNER_GAME) {
    return "RUNNER_GAME";
  } else if (gameId === CHALLENGE_ONE) {
    return "CHALLENGE_ONE";
  } else if (gameId === WFH_CHALLENGE) {
    return "WFH_CHALLENGE";
  }

  return "Unknown name";
};
