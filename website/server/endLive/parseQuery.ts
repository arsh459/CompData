import { ParsedUrlQuery } from "querystring";

export const parseEndLiveQuery = (query: ParsedUrlQuery) => {
  return {
    seriesId:
      query.seriesId && typeof query.seriesId === "string"
        ? query.seriesId
        : "",
    liveId:
      query.liveId && typeof query.liveId === "string" ? query.liveId : "",
    streamId:
      query.streamId && typeof query.streamId === "string"
        ? query.streamId
        : "",
    workoutType:
      query.workoutType && typeof query.workoutType === "string"
        ? query.workoutType
        : "",
    parentId:
      query.parentId && typeof query.parentId === "string"
        ? query.parentId
        : "",
    uid: query.uid && typeof query.uid === "string" ? query.uid : "",
    authorId:
      query.authorId && typeof query.authorId === "string"
        ? query.authorId
        : "",
    communityId:
      query.communityId && typeof query.communityId === "string"
        ? query.communityId
        : "",
  };
};
