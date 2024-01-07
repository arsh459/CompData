import { Cycle } from "@models/User/User";
import { Tool } from "@models/config/Tools";
import { useUserStore } from "@providers/user/store/useUserStore";
import firestore from "@react-native-firebase/firestore";
import { getTime } from "date-fns";
export interface get_period_cycle_data_interface {
  date: string;
}

export const get_period_cycle_data = async ({
  date,
}: get_period_cycle_data_interface): Promise<string | Cycle> => {
  const user = useUserStore.getState().user;
  const cycleDate = new Date(date);
  const cycleDateUnix = getTime(cycleDate);
  if (user?.uid) {
    const currentCycleDocs = await firestore()
      .collection("users")
      .doc(user?.uid)
      .collection("cycles")
      .where("startUnix", "<=", cycleDateUnix)
      .orderBy("startUnix", "desc")
      .limit(1)
      .get();
    if (currentCycleDocs.docs.length > 0) {
      const currentCycleData = currentCycleDocs.docs[0].data() as Cycle;
      return currentCycleData;
    } else {
      return `Current Did'nt found any cycle around the mentioned date`;
    }
  }

  return "Not able to get your period cycle data.";
};

export const get_period_cycle_data_tool: Tool = {
  type: "function",
  function: {
    name: "get_period_cycle_data",
    description:
      "This function is used to get the period cycles data for the user. it is only called when user want know about thier periods or period cycle. In this cycle data we have phaseSplits key which contain period phase name key with array of days number from the starting date, do not mention number of days in response always respond in date comparing with starting date. this function return shorter and precise response in bullet points and must bold out all dates or days mentioned.",
    parameters: {
      type: "object",
      properties: {
        date: {
          type: "string",
          description:
            "It is any one day of a period cycle, It is in format of YYYY-MM-DD. If user ask for current cycle then take user's todays Date. If any cycle date not porvided ask user do they want to know about thier current cycle or else give any date which is between or around user's desired cycle.",
        },
      },
      required: ["date"],
    },
  },
};
