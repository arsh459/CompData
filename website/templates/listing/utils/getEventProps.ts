import { EventInterface } from "@models/Event/Event";
import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import { listingTemplateV1Props } from "../listingTemplateV1";

export const getEventProps = (
  event: EventInterface,
  leader: LeaderBoard
): listingTemplateV1Props => {
  return {
    cta: "Join",
    id: event.id,
    live: false,
    program: event?.program ? event.program : [],
    faq: event.faq,
    viewStyle: "mobile",
    courseGoal: event.courseGoal,
    eventType: event.eventType,
    whoIsItFor: event.whoIsItFor,
    programDetails: event.programDetails,
    aboutCreator: leader?.tagline,
    bio: leader?.bio,
    profileImg: leader?.profileImage,
    profileName: leader?.name,
    cohorts: [],
    userKey: leader?.userKey,
    socialMediaIcons: {
      linkedIn: leader?.linkedInLink,
      facebook: leader?.facebookProfile,
      instagram: leader?.instagramLink,
      youtube: leader?.youtubeLink,
      external: leader?.externalLink,
    },
    eventKey: event.eventKey,
    totalSold: 2,
    totalLeft: 10,
    acceptInvites: event.acceptInvites,
    editing: false,
    heading: event.name,
    ownerUID: event.ownerUID,
    media: event.media,
    currency: event.currency,
    price: event.cost,
    about: event.description,
    soldOut: event.soldOut,
  };
};
