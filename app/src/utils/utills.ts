import { ParticipatingWithTeamObj } from "@models/User/User";

export const getTeamId = (
  participatingInGameWithTeam?: {
    [gameId: string]: ParticipatingWithTeamObj;
  },
  selectedGameId?: string
) => {
  if (
    selectedGameId &&
    participatingInGameWithTeam &&
    participatingInGameWithTeam[selectedGameId]
  ) {
    return participatingInGameWithTeam[selectedGameId].teamId;
  }
  return "";
};

export const getTeamCaptainId = (
  participatingInGameWithTeam?: {
    [gameId: string]: ParticipatingWithTeamObj;
  },
  selectedGameId?: string
) => {
  if (
    selectedGameId &&
    participatingInGameWithTeam &&
    participatingInGameWithTeam[selectedGameId]
  ) {
    return participatingInGameWithTeam[selectedGameId].ownerUID;
  }
  return "";
};

export const getTeamCaptainIdFromParticipating = (
  participatingWithObj?: { [gameId: string]: ParticipatingWithTeamObj },
  selectedGameId?: string
) => {
  if (
    participatingWithObj &&
    selectedGameId &&
    participatingWithObj[selectedGameId]
  ) {
    return participatingWithObj[selectedGameId].ownerUID;
  }
  return "";
};

export const getTeamIdFromParticipating = (
  participatingWithObj?: { [gameId: string]: ParticipatingWithTeamObj },
  selectedGameId?: string
) => {
  if (
    participatingWithObj &&
    selectedGameId &&
    participatingWithObj[selectedGameId]
  ) {
    return participatingWithObj[selectedGameId].teamId;
  }
  return "";
};

export const getNextDayUnix = () => {
  const currentDateTime = new Date();

  // Get the timezone of the current time.
  const timezone = currentDateTime.getTimezoneOffset();

  // Create a new Date object for the next day.
  const nextDay = new Date(currentDateTime.getFullYear(), currentDateTime.getMonth(), currentDateTime.getDate() + 1);

  // Check if the next day is during daylight saving time.
  const isDst = nextDay.getTimezoneOffset() !== timezone;

  // If daylight saving time is in effect, add an hour to the Unix timestamp for the end of the next day.
  const endOfNextDayUnix = nextDay.getTime() + (isDst ? 3600 : 0);

  return endOfNextDayUnix;
}

