import axios from "axios";
import { API_BASE_URL } from "react-native-dotenv";
import crashlytics from "@react-native-firebase/crashlytics";

export const internalTeamLeaveRequest = async (
  eventId: string,
  uid: string
) => {
  try {
    await axios({
      url: `${API_BASE_URL}/api/leaveTeam/leaveCoachTeam`,
      method: "POST",
      params: {
        eventId,
        uid,
      },
    });

    return "success";
  } catch (error: any) {
    console.log("error in team leave", error);
    crashlytics().recordError(error);
    return "failed";
  }
};
