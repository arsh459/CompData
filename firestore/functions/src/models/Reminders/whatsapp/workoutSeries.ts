import { whatsappChannelId } from "../../../main/Https/messagebird/constants/identifiers";
import { Param, sendHSM } from "../../Conversations/sendHSM";
// import { LeaderBoard } from "../../LeaderBoard/interface";
import { getUserById, getUserGoalString } from "../../User/Methods";
import { UserInterface } from "../../User/User";
import { getWorkoutSeries } from "../../Workout/getUtils";
import { WorkoutSeries } from "../../Workout/Workout";

export const workoutSeriesMessage = async (uid: string, seriesId: string) => {
  const user = await getUserById(uid);
  if (user) {
    const series = await getWorkoutSeries(seriesId);

    if (series) {
      const leader = await getUserById(series.ownerUID);

      if (user.name && user.phone && leader?.userKey && leader?.name) {
        await sendHSM(
          user.phone,
          whatsappChannelId,
          "workout_series",
          getParamsForWorkoutSeries(
            user.name,
            series.name,
            series.cost,
            `https://${leader.userKey}.socialboat.live`,
            leader.name,
          ),
        );

        await handleCoachMessage(leader, user, series);

        return true;
      }
    }
  }

  return false;
};

const handleCoachMessage = async (
  leader: UserInterface,
  user: UserInterface,
  series: WorkoutSeries,
) => {
  if (leader.phone && leader.name && leader.userKey) {
    const userGoalString = getUserGoalString(user.fitnessGoals);
    await sendHSM(
      leader.phone,
      whatsappChannelId,
      "coach_new_client",
      getParamsForWorkoutSeries_coach(
        leader.name,
        series.name ? series.name : "",
        user.name ? user.name : "",
        user.phone ? user.phone : "",
        user.email ? user.email : "",
        userGoalString,
        series.cost,
        "",
      ),
    );
  }
};

const getParamsForWorkoutSeries = (
  userName: string,
  seriesName: string,
  seriesCost: number,
  seriesLink: string,
  coachName: string,
): Param[] => {
  return [
    {
      default: userName ? `${userName.trim()}` : "there",
    },
    {
      default: seriesName ? `*${seriesName.trim()}*` : "*Fitness Program*",
    },
    {
      default: seriesCost ? `*INR${seriesCost}*` : "INR 0",
    },
    {
      default: seriesLink ? `${seriesLink.trim()}` : "https://socialboat.live",
    },
    {
      default: coachName ? `*${coachName.trim()}*` : "*Coach*",
    },
    {
      default: coachName ? `${coachName.trim()}` : "SocialBoat",
    },
  ];
};

const getParamsForWorkoutSeries_coach = (
  coachName: string,
  eventName: string,
  customerName: string,
  customerPhone: string,
  customerEmail: string,
  fitnessGoals: string,
  seriesCost: number,
  seriesLink: string,
): Param[] => {
  return [
    {
      default: coachName ? `${coachName.trim()}` : "there",
    },
    {
      default: eventName ? `*${eventName.trim()}*` : "*Fitness Program*",
    },
    {
      default: customerName ? `*${customerName.trim()}*` : "-",
    },
    {
      default: customerPhone ? `*${customerPhone.trim()}*` : "-",
    },
    {
      default: customerEmail ? `*${customerEmail.trim()}*` : "-",
    },
    {
      default: fitnessGoals ? `*${fitnessGoals.trim()}*` : "-",
    },
    {
      default: seriesCost ? `*INR${seriesCost}*` : "INR 0",
    },
    {
      default: seriesLink ? `${seriesLink.trim()}` : "-",
    },
    {
      default: customerName ? `*${customerName.trim()}*` : "*Coach*",
    },
  ];
};
