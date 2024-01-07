import axios from "axios";

export const inviteMembersToEvent = async (
  communityId: string,
  members: { [memberId: string]: boolean },
  eventId: string
) => {
  const uidsToUpdate: string[] = Object.keys(members);
  //   console.log("uidsToUpdate", uidsToUpdate);
  await internalEventInviteRequest(communityId, eventId, uidsToUpdate);
};

export const addMembersToEvent = async (
  communityId: string,
  members: { [memberId: string]: boolean },
  eventId: string
) => {
  const uidsToUpdate: string[] = Object.keys(members);
  console.log("uidsToUpdate", uidsToUpdate);
  await internalEventAddRequest(communityId, eventId, uidsToUpdate);
};

// import { AuthTokenResponse } from "pages/api/zoom/utils/zoomToken";

const internalEventInviteRequest = async (
  communityId: string,
  eventId: string,
  uidsToUpdate: string[]
) => {
  await axios({
    url: "/api/invites/event",
    method: "POST",
    params: {
      eventId,
      uids: uidsToUpdate,
      communityId,
    },
  });

  return true;
};

const internalEventAddRequest = async (
  communityId: string,
  eventId: string,
  uidsToUpdate: string[]
) => {
  await axios({
    url: "/api/invites/event",
    method: "POST",
    params: {
      eventId,
      uids: uidsToUpdate,
      action: "add",
      communityId,
    },
  });

  return true;
};
