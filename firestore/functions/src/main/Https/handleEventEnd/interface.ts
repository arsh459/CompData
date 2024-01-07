export interface handleWorkoutEventInterface {
  id: string;
  seriesId: string;
  liveId: string;
  streamId: string;
  workoutType: "lives" | "exercises";
  parentId: string;
  authorId: string;
  communityId: string;
}
