import { taskType } from "@models/Tasks/Task";

const secFormatter = (nSeconds: number) => {
  if (nSeconds < 10) {
    return `0${nSeconds}`;
  }

  return nSeconds;
};

export const getTimerSecondsString = (seconds?: number) => {
  if (seconds)
    return `${secFormatter(Math.floor(seconds / 3600))}:${secFormatter(
      Math.floor((seconds % 3600) / 60)
    )}:${secFormatter(Math.floor((seconds % 3600) % 60))}`;
  else {
    return `00:00:00`;
  }
};

export const getElapsedSecondsString = (seconds?: number) => {
  if (seconds)
    return `${Math.floor((seconds % 3600) / 60)}:${secFormatter(
      Math.floor((seconds % 3600) % 60)
    )}`;
  else {
    return `00:00`;
  }
};

export const getFitPointString = (
  points?: number,
  duration?: number,
  type?: taskType
) => {
  if (type === "mediaTask") {
    return `${points ? points : 0} ${
      points && points > 1 ? "points" : "point"
    }`;
  } else if (points && duration) {
    return `${points} ${points > 1 ? "points" : "point"} / ${duration} mins`;
  } else if (points) {
    return `${points} ${points > 1 ? "points" : "point"}`;
  } else {
    return "";
  }
};

export const getProgressFitPoint = (seconds?: number, duration?: number) => {
  if (seconds && duration) {
    if (seconds < duration * 60) {
      return {
        prog: `${Math.floor((seconds / (duration * 60)) * 100)}`,
        round: 0,
      };
    } else {
      const round = Math.floor(seconds / (duration * 60));
      const delta = seconds - round * duration * 60;

      //   console.log("round", round);
      //   console.log("seconds", seconds);
      //   console.log("du", duration * 60);
      //   console.log("delta", delta);

      return { prog: `${Math.floor((delta / (duration * 60)) * 100)}`, round };
    }
  }

  return { prog: "0", round: 0 };
};
