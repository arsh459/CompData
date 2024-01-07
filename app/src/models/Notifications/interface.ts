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
export interface TeamRequest {
  id: string;
  teamId: string;
  requestedTo: string;
  requestedBy: string; // can fetch person who requested

  createdOn: number;

  state: "PENDING" | "ACCEPTED" | "REJECTED" | "EXPIRED";
}

/**
 * 1 Team 1 Team
 * 2 Team 2 Team
 * 1 Team 2 Team
 * 2 Team 1 Team
 * 1 Team 0 Team
 */
