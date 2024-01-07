export type linkType =
  | "invite"
  | "post"
  | "task"
  | "profile"
  | "referral"
  | "progress"
  | "gameInvite";

export interface DNLinkParams {
  type: linkType;
  uid?: string;
  postId?: string; // to go to post
  teamId?: string;
  gameId: string;
  taskId?: string; // to go to task
  sprintId?: string;
  captainId?: string;
}
