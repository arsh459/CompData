export interface antResponse {
  action?: "vodReady" | "liveStreamStarted" | "liveStreamEnded";
  id?: string;
  vodId?: string;
  vodName?: string;
}
