import axios from "axios";

export const endLiveWorkout = async (
  seriesId: string,
  streamId: string,
  liveId: string,
  authorId: string,
  workoutType: "lives" | "exercises",
  parentId: string,
  communityId: string
) => {
  await axios({
    url: "/api/endWorkout/sendMessage",
    method: "POST",
    params: {
      seriesId,
      streamId,
      liveId,
      authorId,
      workoutType,
      parentId,
      communityId,
    },
  });

  return true;
};
