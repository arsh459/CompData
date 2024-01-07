import { whatsappChannelId } from "../../../main/Https/messagebird/constants/identifiers";
import { sendHSM } from "../../Conversations/sendHSM";
import { getSbEventById } from "../../sbEvent/getUtils";
// import { getSbEventById } from "../../sbEvent/getUtils";
import { getUserById } from "../../User/Methods";
import { canMessageGo } from "./messageState";

export const userDemoMessage = async (uid: string, gameId: string) => {
  const sbEvent = await getSbEventById(gameId);
  // if (sbEvent) {
  // const coach = await getUserById(sbEvent.ownerUID);
  const user = await getUserById(uid);
  if (user && user.phone && sbEvent && canMessageGo(user)) {
    const kpis = sbEvent.configuration?.kpis;
    const workoutKPIs = kpis?.filter((item) => item.kpi === "nb_workouts");

    const kpiValue =
      workoutKPIs && workoutKPIs.length ? workoutKPIs[0].targetValue : 25;
    const prizesWorth = sbEvent.awardsWorth ? sbEvent.awardsWorth : 20000;

    await sendHSM(user.phone, whatsappChannelId, "user_demo_v3", [
      { default: user.name ? `${user.name.trim()}` : "there" },
      { default: sbEvent.name ? `${sbEvent.name.trim()}` : "SocialBoat" },
      { default: "https://youtube.com/shorts/AIksqwyUdVk" },
      { default: `${kpiValue}` },
      { default: `₹${prizesWorth}` },
    ]);

    return true;
  }
  // }

  return false;
};
