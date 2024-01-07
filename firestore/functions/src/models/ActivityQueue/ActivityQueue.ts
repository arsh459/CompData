export interface ActivityQueueItem {
  id: string;

  // to fetch queue state
  state: "PENDING" | "FAILED" | "SUCCESS";
  processedOn?: number;
  createdOn: number;

  previousCalories: number;
  nowCalories: number;

  effectiveUnix: number;

  gameId: string;
  uid: string;
  activityId: string;
  action: "UPDATE_ACTIVITY" | "RECONCILE_USER";
}

// ADD_ACTIVITY (0 -> +k)
// add in the time period of activity created

// UPDATE_ACTIVITY (+k1 -> +k2)
// reconcile user

// date change
// calorie change
// date
