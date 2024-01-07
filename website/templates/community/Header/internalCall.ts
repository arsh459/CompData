import axios from "axios";

export const internalTeamLeaveRequest = async (
  eventId: string,
  uid: string
) => {
  try {
    await axios({
      url: "/api/leaveTeam/leaveCoachTeam",
      // url:
      method: "POST",
      params: {
        eventId,
        uid,
      },
    });

    return "success";
  } catch (error) {
    console.log("error", error);
    return "failed";
  }
};
