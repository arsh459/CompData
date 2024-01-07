// import { updateSocialBoatCommunityUser } from "@models/User/createUtils";
import { useEffect } from "react";

export const useAddToCommunity = (
  add: boolean,
  eventId?: string,
  cohortId?: string,
  ownerUID?: string,
  userId?: string
) => {
  useEffect(() => {}, [userId, ownerUID, eventId, cohortId, add]);
};
