export const getChallengeStartString = (
  challengeStarts?: number,
  challengeLength?: number
) => {
  if (!challengeStarts) {
    return {
      stringOne: "",
      stringTwo: "",
    };
  }

  const now = Date.now();
  const end =
    challengeStarts +
    24 * 60 * 60 * 1000 * (challengeLength ? challengeLength : 0);

  if (now > end) {
    return {
      stringOne: "Challenge ended on",
      dayToday: "",
      stringTwo: new Date(end).toLocaleString("default", {
        month: "short",
        hour: "numeric",
        day: "numeric",
        hour12: true,
        minute: "2-digit",
      }),
    };
  } else if (now >= challengeStarts) {
    return {
      stringOne: "Challenge is ending on",
      dayToday: Math.floor((now - challengeStarts) / (24 * 60 * 60 * 1000)),
      stringTwo: new Date(end).toLocaleString("default", {
        month: "short",
        hour: "numeric",
        day: "numeric",
        hour12: true,
        minute: "2-digit",
      }),
    };
  } else {
    return {
      stringOne: "Challenge is starting on",
      dayToday: "",
      stringTwo: new Date(challengeStarts).toLocaleString("default", {
        month: "short",
        hour: "numeric",
        day: "numeric",
        hour12: true,
        minute: "2-digit",
      }),
    };
  }
};
