// sbEvents/gameId/joinRequests/requestId
export interface TeamRequest {
  id: string;
  requestedTo: string;
  requestedBy: string; // can fetch person who requested

  teamId: string;
  createdOn: number;

  state: "PENDING" | "ACCEPTED" | "REJECTED" | "EXPIRED";
}
