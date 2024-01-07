import { ParsedUrlQuery } from "querystring";

export const parseInviteQuery = (query: ParsedUrlQuery) => {
  return {
    name: query.name && typeof query.name === "string" ? query.name : "",
    phone: query.phone && typeof query.phone === "string" ? query.phone : "",
    email: query.email && typeof query.email === "string" ? query.email : "",
    inviteCode:
      query.inviteCode && typeof query.inviteCode === "string"
        ? query.inviteCode
        : "",
    eventId:
      query.eventId && typeof query.eventId === "string" ? query.eventId : "",
    uid: query.uid && typeof query.uid === "string" ? query.uid : "",
    cohortId:
      query.cohortId && typeof query.cohortId === "string"
        ? query.cohortId
        : "",
    userUid:
      query.userUid && typeof query.userUid === "string" ? query.userUid : "",
  };
};

export const parseInviteEventQuery = (query: ParsedUrlQuery) => {
  return {
    action:
      query.action && typeof query.action === "string"
        ? query.action
        : "invite",
    eventId:
      query.eventId && typeof query.eventId === "string" ? query.eventId : "",
    communityId:
      query.communityId && typeof query.communityId === "string"
        ? query.communityId
        : "",
    uids:
      query[`uids[]`] && typeof query[`uids[]`] === "string"
        ? [query[`uids[]`]]
        : query[`uids[]`]
        ? (query[`uids[]`] as string[])
        : [],
  };
};

export const addUsersToEvent = async (
  communityId: string,
  eventId: string,
  uids: string[],
  action: "add" | "invite"
) => {
  // console.log("uids", uids);
  for (const uid of uids) {
    // console.log("uid", uid);
    const firebase = (await import("@config/adminFire")).default;
    const db = firebase.firestore();

    if (action === "invite") {
      await db
        .collection("users")
        .doc(uid)
        .update({
          inviteMessagesForEvents:
            firebase.firestore.FieldValue.arrayUnion(eventId),
        });
    } else {
      await db
        .collection("users")
        .doc(uid)
        .update({
          enrolledCommunities:
            firebase.firestore.FieldValue.arrayUnion(communityId),
          enrolledEvents: firebase.firestore.FieldValue.arrayUnion(eventId),
          enrolledEventsWithTime: firebase.firestore.FieldValue.arrayUnion({
            eventId: eventId,
            enrolledTime: Date.now(),
          }),
          welcomeMessagesForEvents:
            firebase.firestore.FieldValue.arrayUnion(eventId),
        });
    }
  }
};
