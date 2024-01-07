import { whatsappChannelId } from "../../../main/Https/messagebird/constants/identifiers";
import { getUserRankForUID } from "../../Activity/getUtils";
import { Param, sendHSM } from "../../Conversations/sendHSM";
import { getUserById } from "../../User/Methods";
import { getExercise } from "../../Workout/getUtils";
import { LiveClass, Workout } from "../../Workout/Workout";
import { getStream } from "../../WorkoutActivity/getUtils";

export const handleWorkoutFinish = async (
  parentId: string,
  uid: string,
  coachId: string,
  seriesId: string,
  liveId: string,
  streamId: string,
  streamType: "exercises" | "lives",
) => {
  const user = await getUserById(uid);
  const coach = await getUserById(coachId);
  const myUserRank = await getUserRankForUID(parentId, uid);

  // const workoutSeries = await getWorkoutSeries(seriesId)

  const remoteStream = await getStream(seriesId, liveId, streamType, streamId);

  const workout = await getExercise(seriesId, liveId, streamType);
  if (workout && user?.name && coach?.name) {
    const duration = getWorkoutDurationInSeconds(workout);

    if (
      remoteStream &&
      duration &&
      duration > -1 &&
      workout.calories &&
      coach.userKey &&
      user.phone
    ) {
      const calsLogged = getCalories(
        remoteStream?.streamedSeconds,
        duration,
        workout?.calories,
      );

      const params = createParamsForWorkoutFinish(
        user?.name,
        calsLogged,
        myUserRank?.rank ? myUserRank.rank : 0,
        myUserRank?.totalCalories ? myUserRank.totalCalories : 0,
        myUserRank?.streakScore ? myUserRank.streakScore : 0,
        `https://${coach.userKey}.socialboat.live`,
        coach?.name,
      );

      await sendHSM(
        user.phone,
        whatsappChannelId,
        "post_workout_finish",
        params,
      );

      return true;
    }
  }

  return false;
};

const getWorkoutDurationInSeconds = (workout: Workout | LiveClass) => {
  if (workout.type === "live") {
    return workout.duration ? workout.duration * 60 : -1;
  } else if (workout.type === "workout" && workout.media) {
    return workout.media.duration;
  }

  return -1;
};

const getCalories = (
  streamed: number,
  duration: number,
  totalCalories: number,
) => {
  if (streamed) {
    return (streamed / duration) * totalCalories;
  }

  return 0;
};

const createParamsForWorkoutFinish = (
  userName: string,
  caloriesBurnt: number,
  rank: number,
  totalCalories: number,
  streakScore: number,
  link: string,
  coachName: string,
): Param[] => {
  return [
    {
      default: userName ? `${userName.trim()}` : "there",
    },
    {
      default: caloriesBurnt ? `*${Math.round(caloriesBurnt)}*` : "0",
    },
    {
      default: rank ? `*${rank}*` : "-",
    },
    {
      default: totalCalories ? `*${Math.round(totalCalories)}*` : "-",
    },
    {
      default: streakScore ? `*${streakScore}*` : "-",
    },
    {
      default: link ? `${link}` : "-",
    },
    {
      default: coachName ? `${coachName}` : "-",
    },
  ];
};
