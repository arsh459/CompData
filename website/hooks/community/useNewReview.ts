import { Activity } from "@models/Activities/Activity";
import { createNewReview } from "@models/Activities/createUtils";
import { useCallback, useEffect, useState } from "react";

export const useNewReview = (
  // communityId: string,

  // eventId: string,
  // parentId: string,
  gameId: string | undefined,
  postId: string,
  authorUID: string,

  isOpen: boolean,
  editFlag?: boolean,
  editReview?: Activity,
  cohortId?: string
) => {
  const [newReview, updateNewReview] = useState<Activity | undefined>(() =>
    editFlag ? editReview : undefined
  );
  const [sessionTime, setReviewTime] = useState<Date | null>(
    editFlag && editReview?.createdOn
      ? new Date(editReview?.createdOn)
      : new Date()
  );
  const [editingNow, setEditingNow] = useState<"datetime" | "text">("text");

  // console.log("newReview", sessionTime);

  useEffect(() => {
    if (isOpen && !editFlag && gameId) {
      updateNewReview(
        createNewReview(
          // communityId,
          // eventId,
          gameId,
          authorUID,
          postId,
          cohortId
        )
      );
    }
  }, [
    isOpen,
    editFlag,
    gameId,
    // communityId,
    authorUID,
    // eventId,
    // parentId,
    postId,
    cohortId,
  ]);

  const onUpdateCalories = (calories: number | undefined) => {
    updateNewReview((prev) => {
      if (prev)
        return {
          ...prev,
          // eventId: parentId,
          // coachEventId: eventId,
          // ...(cohortId ? { coachCohortId: cohortId } : {}),
          calories: calories,
        };
    });
  };

  const updateTaskId = (taskId: string) => {
    updateNewReview((prev) => {
      if (prev)
        return {
          ...prev,
          // eventId: parentId,
          // coachEventId: eventId,
          // ...(cohortId ? { coachCohortId: cohortId } : {}),
          taskId: taskId,
        };
    });
  };

  const onSelectName = useCallback((name: string) => {
    updateNewReview((prev) => {
      if (prev)
        return {
          ...prev,
          activityName: name,
        };
    });
  }, []);

  const onUpdateDistance = (distance: number | undefined) => {
    updateNewReview((prev) => {
      if (prev)
        return {
          ...prev,
          // eventId: parentId,
          // coachEventId: eventId,
          // ...(cohortId ? { coachCohortId: cohortId } : {}),
          distanceInMeters: distance,
        };
    });
  };

  const onUpdateTime = (time: number | undefined) => {
    updateNewReview((prev) => {
      if (prev)
        return {
          ...prev,
          // eventId: parentId,
          // coachEventId: eventId,
          // ...(cohortId ? { coachCohortId: cohortId } : {}),
          timeInSeconds: time,
        };
    });
  };

  const onUpdateFitPoints = (fitPoints: number | undefined) => {
    updateNewReview((prev) => {
      if (prev)
        return {
          ...prev,
          // eventId: parentId,
          // coachEventId: eventId,
          // ...(cohortId ? { coachCohortId: cohortId } : {}),
          fitPoints: fitPoints,
        };
    });
  };

  const updateNotify = (notFlag: boolean) => {
    updateNewReview((prev) => {
      if (prev)
        return {
          ...prev,
          notifyUser: notFlag ? "PENDING" : "TBD",
        };
    });
  };

  return {
    newReview,
    updateNewReview,
    onUpdateCalories,
    onUpdateFitPoints,
    sessionTime,
    setReviewTime,
    editingNow,
    setEditingNow,
    onUpdateDistance,
    onUpdateTime,
    updateNotify,
    updateTaskId,
    onSelectName,
  };
};
