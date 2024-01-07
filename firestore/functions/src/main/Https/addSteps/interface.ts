export interface sevenDaySteps {
  [day: string]: number;
}

export interface StepsResponse {
  steps?: sevenDaySteps;
  uid?: string;
  sessionId?: string;
}
