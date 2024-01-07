// users/uid/notifications/notifId
export type notificationTypes = "team_accept";
export interface NotificationInterface {
  id: string;
  createdOn: number;
  text: string;
  heading?: string;
  type: notificationTypes;
}
// kuldeep
// team1
// team2
// team3
// req1 -> TeamLeader1
// req2 -> TeamLeader2
// req3 -> TeamLeader3
// sbEvents/gameId/joinRequests/requestId
