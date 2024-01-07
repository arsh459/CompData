import { Param, sendHSM } from "../../../models/Conversations/sendHSM";
import { getAllLives, getAllVideos } from "../../../models/Workout/getUtils";
import {
  LiveClass,
  Workout,
  WorkoutSeries,
} from "../../../models/Workout/Workout";
import { isLiveToday } from "../../FirestoreTriggers/onLiveWorkoutUpdate/utils";
import { whatsappChannelId } from "../../Https/messagebird/constants/identifiers";
import { getFormattedDateForUnix } from "../activityTracker/utils";

export const handlePaidDaily = async (
  toPhone: string,
  toName: string,
  challengeName: string,
  leaderKey: string,
  todayLives: { [seriesId: string]: LiveClass[] },
  todayWorks: { [seriesId: string]: Workout[] },
  seriesObj: { [serId: string]: WorkoutSeries },
  coachName: string,
  parentId: string,
) => {
  // get todays events
  for (const seriesId of Object.keys(todayLives)) {
    const todaysLives = todayLives[seriesId];
    const todaysWorks = todayWorks[seriesId];
    const currSeries = seriesObj[seriesId];

    // console.log("todaysLives", todaysLives);
    if (todaysLives.length > 0) {
      for (const live of todaysLives) {
        if (live.slots)
          for (const slot of live?.slots) {
            const time = new Date(slot).getTime();
            const dtString = getFormattedDateForUnix(time, "h:mmA");
            await sendPaidMessage(
              toPhone,
              toName,
              dtString,
              leaderKey,
              coachName,
              currSeries,
              parentId,
              live,
            );
          }
      }
    } else {
      const selectedWorkout = getSelectedWorkout(todaysLives, todaysWorks);
      await sendPaidMessage(
        toPhone,
        toName,
        "Anytime",
        leaderKey,
        coachName,
        currSeries,
        parentId,
        selectedWorkout,
      );
    }

    // send message for only one series and break
  }
};

export const sendPaidMessage = async (
  toPhone: string,
  toName: string,
  timeClass: string,
  leaderKey: string,
  coachName: string,
  currSeries: WorkoutSeries,
  parentId: string,
  selectedWorkout?: LiveClass | Workout,
) => {
  if (selectedWorkout?.calories) {
    try {
      await sendHSM(
        toPhone,
        whatsappChannelId,
        "workout_join_v3",
        generateParamsForClassV3(
          toName,
          selectedWorkout.name ? selectedWorkout.name : "Workout",
          selectedWorkout?.calories,
          timeClass,
          selectedWorkout.type === "live"
            ? `https://${leaderKey}.socialboat.live/workout/${currSeries.seriesKey}/live/${selectedWorkout.liveKey}?parentId=${parentId}`
            : `https://${leaderKey}.socialboat.live/workout/${currSeries.seriesKey}/exercises/${selectedWorkout.videoKey}`,
          coachName,
        ),
      );
    } catch (error) {
      console.log("error", error);
    }

    return;
  }
};

export const getTodaysWorkoutsForAllSeries = async (
  series: WorkoutSeries[],
) => {
  let classesToday: boolean = false;
  const seriesLives: { [seriesId: string]: LiveClass[] } = {};
  const seriesWorkouts: { [workoutId: string]: Workout[] } = {};
  const seriesObj: { [serId: string]: WorkoutSeries } = {};
  for (const ser of series) {
    const { livesToday, workouts } = await getTodaysWorkouts(ser);

    seriesLives[ser.id] = livesToday;
    seriesWorkouts[ser.id] = workouts;
    seriesObj[ser.id] = ser;

    if (livesToday.length > 0) {
      classesToday = true;
    }
  }

  return { seriesLives, seriesWorkouts, seriesObj, classesToday };
};

const getTodaysWorkouts = async (series: WorkoutSeries) => {
  const lives = await getAllLives(series.id);
  const livesToday: LiveClass[] = [];
  for (const live of lives) {
    const liveStatus = isLiveToday(live);

    if (liveStatus) {
      livesToday.push(live);
    }
  }

  const workouts = await getAllVideos(series.id);

  return { livesToday, workouts };
};

const getSelectedWorkout = (lives: LiveClass[], workouts: Workout[]) => {
  if (lives.length > 0) {
    for (const live of lives) {
      if (live.calories) {
        return live;
      }
    }
  }

  if (workouts.length > 0) {
    for (const work of workouts) {
      if (work.calories) {
        return work;
      }
    }
  }

  return undefined;
};

// const CaloiesBurnPotential = (lives: LiveClass[], workouts: Workout[]) => {
//   let calories: number = 0;
//   for (const live of lives) {
//     calories += live.calories ? live.calories : 0;
//   }

//   for (const work of workouts) {
//     calories += work.calories ? work.calories : 0;
//   }

//   return calories;
// };

// const generateParamsForClass = (
//   userName: string,
//   challengeName: string,
//   calories: number,
//   link: string,
//   coachName: string,
// ): Param[] => {
//   return [
//     {
//       default: userName ? `${userName.trim()}` : "there",
//     },
//     {
//       default: challengeName ? `*${challengeName.trim()}*` : "",
//     },
//     {
//       default: calories ? `${calories}` : "",
//     },
//     {
//       default: link ? `${link.trim()}` : "",
//     },
//     {
//       default: coachName ? `${coachName.trim()}` : "",
//     },
//   ];
// };

const generateParamsForClassV3 = (
  userName: string,
  workoutName: string,
  calories: number,
  timeClass: string,
  link: string,
  coachName: string,
): Param[] => {
  return [
    {
      default: userName ? `${userName.trim()}` : "there",
    },
    {
      default: workoutName ? `*${workoutName.trim()}*` : "",
    },
    {
      default: calories ? `*${Math.round(calories)}*` : "-",
    },
    {
      default: timeClass ? `${timeClass.trim()}` : "",
    },
    {
      default: link ? `${link.trim()}` : "",
    },
    {
      default: coachName ? `${coachName.trim()}` : "",
    },
  ];
};
