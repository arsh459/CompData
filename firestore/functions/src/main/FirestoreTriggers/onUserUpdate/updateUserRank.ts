import { updateNameImageInRank } from "../../../models/Activity/createUtils";
import { getUserRankForUID } from "../../../models/Activity/getUtils";
import { getSbEventById } from "../../../models/sbEvent/getUtils";
import { UserInterface } from "../../../models/User/User";

export const updateUserRankNameImg = async (
  now: UserInterface,
  prev: UserInterface,
) => {
  if (
    now.enrolledEvents &&
    now.name &&
    (now.name !== prev.name || now.profileImage !== prev.profileImage)
  ) {
    for (const enrolledEventId of now.enrolledEvents) {
      const remoteEvent = await getSbEventById(enrolledEventId);

      if (remoteEvent?.parentId) {
        const parentEvent = await getSbEventById(remoteEvent.parentId);

        if (parentEvent) {
          const remoteUserRank = await getUserRankForUID(
            remoteEvent?.parentId,
            now.uid,
          );

          if (remoteUserRank)
            await updateNameImageInRank(
              remoteEvent.parentId,
              now.uid,
              now.name,
              now.profileImage,
              now.userKey,
            );
        }
      }
    }
  }
};
