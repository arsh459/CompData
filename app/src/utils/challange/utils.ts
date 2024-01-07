import {
  FAT_BURNER_CHALLENGE,
  RUNNER_GAME,
  FAT_BURNER_GAME,
  CHALLENGE_ONE,
  WFH_CHALLENGE,
  WOMENS_GAME,
  ALPHABET_GAME,
  HEADSTART_GAME,
  BURPEE_GAME,
  GURGAON_FIT,
  TEAM_ALPHABET_GAME,
} from "@constants/gameStats";

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
  } else if (gameId === WOMENS_GAME) {
    return "WOMENS_GAME";
  } else if (gameId === ALPHABET_GAME) {
    return "ALPHABET_GAME";
  } else if (gameId === TEAM_ALPHABET_GAME) {
    return "TEAM_ALPHABET_GAME";
  } else if (gameId === HEADSTART_GAME) {
    return "HEADSTART_GAME";
  } else if (gameId === BURPEE_GAME) {
    return "BURPEE_GAME";
  } else if (gameId === GURGAON_FIT) {
    return "GURGAON_FIT";
  }

  return "Unknown name";
};

export const getGameNameReadable = (gameId?: string) => {
  if (!gameId) {
    return "";
  }

  if (gameId === FAT_BURNER_CHALLENGE) {
    return "Fat Burner Challenge";
  } else if (gameId === FAT_BURNER_GAME) {
    return "The Infinity Wars";
  } else if (gameId === RUNNER_GAME) {
    return "The Fittest Runner";
  } else if (gameId === CHALLENGE_ONE) {
    return "5k Calorie Challenge";
  } else if (gameId === WFH_CHALLENGE) {
    return "WFH Challenge";
  } else if (gameId === WOMENS_GAME) {
    return "The SuperWoman Game";
  } else if (gameId === ALPHABET_GAME) {
    return "The FITAlphabet";
  } else if (gameId === TEAM_ALPHABET_GAME) {
    return "Team Alphabet Game";
  } else if (gameId === HEADSTART_GAME) {
    return "Headstart Game";
  } else if (gameId === BURPEE_GAME) {
    return "Burpee Game";
  } else if (gameId === GURGAON_FIT) {
    return "Gurgaon Fit Game";
  }

  return "No Game";
};
