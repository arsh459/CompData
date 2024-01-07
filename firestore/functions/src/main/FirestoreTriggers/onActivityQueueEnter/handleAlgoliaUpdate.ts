import { Activity, AlgoliaActivity } from "../../../models/Activity/Activity";
import { addActivityToSBAlgolia } from "../algolia/sbAlgoliaUtils";

export const handleAlgoliaUpdate = async (now: Activity) => {
  const algoliaAct: AlgoliaActivity = {
    ...now,
    objectID: now.id ? now.id : now.postId,
    postRef: now.postRef ? now.postRef.path : "",
  };

  // console.log("algoliaAct", algoliaAct.reviewStatus);

  await addActivityToSBAlgolia(algoliaAct);
};
