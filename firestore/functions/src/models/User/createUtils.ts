import { EnrolledEventWithTime, ParticipatingWithTeamObj } from "./User";

export const createParticipatingWith = (
  teamId: string,
  ownerUID: string,
  enrolledTime: number,
): ParticipatingWithTeamObj => {
  return {
    teamId,
    ownerUID,
    enrolledTime,
  };
};

export const createEnrolledWithTime = (
  eventId: string,
  // gameId: string,
  enrolledTime: number,
  // ownerUID: string
): EnrolledEventWithTime => {
  return {
    eventId,
    // gameId,
    enrolledTime,
    // ownerUID,
  };
};
