import { ReviewMessage, reviewStatus } from "@models/Activities/Activity";
import { UserInterface } from "@models/User/User";
import { useEffect, useState } from "react";
import { createNewReviewMessage } from "@models/Activities/createUtils";
import { SystemKPIs } from "@models/Tasks/SystemKPIs";

export const useNewAdminReview = (
  user: UserInterface,
  editingReview?: ReviewMessage,
  editFlag?: Boolean
) => {
  const [newReview, updateDraftReview] = useState<ReviewMessage | undefined>(
    editingReview ? editingReview : undefined
  );

  //   console.log("n", newReview, editingReview);

  useEffect(() => {
    if (!editFlag) {
      // console.log("making new post");
      updateDraftReview(
        createNewReviewMessage(user.uid, user.name, user.profileImage)
      );
    } else {
      updateDraftReview(editingReview);
    }
  }, [
    editFlag,
    user.uid,
    user.name,
    user.profileImage,
    editingReview,
    // bs64Img,
  ]);

  const onUpdateTime = (newTime: Date | null) => {
    // console.log("newTime", newTime?.getTime());
    updateDraftReview((prev) => {
      if (prev)
        return {
          ...prev,
          activityTimeAdded: newTime ? newTime?.getTime() : null,
        };
    });
  };

  const onUpdateReviewMessage = (message: string) => {
    updateDraftReview((prev) => {
      if (prev)
        return {
          ...prev,
          text: message,
        };
    });
  };

  const onUpdateTaskId = (taskId: string) => {
    updateDraftReview((prev) => {
      if (prev)
        return {
          ...prev,
          taskId: taskId,
        };
    });
  };

  const onUpdateScore = (score: number) => {
    updateDraftReview((prev) => {
      if (prev)
        return {
          ...prev,
          score: Math.floor(score) * 300,
        };
    });
  };

  const onUpdateActivityValue = (
    goalScore: number,
    unit: SystemKPIs
    // taskId: string
  ) => {
    // console.log("goal", goalScore, unit);
    updateDraftReview((prev) => {
      if (prev && prev.goalScores) {
        return {
          ...prev,
          goalScores: {
            // [taskId]: {
            ...(prev.goalScores ? prev.goalScores : {}),
            [unit]: goalScore,
            // },
          },
        };
      } else if (prev) {
        return {
          ...prev,
          goalScores: {
            [unit]: goalScore,
          },
        };
      }

      return prev;

      // return prev
    });
  };

  const onChangeTags = (newTag: string) => {
    updateDraftReview((prev) => {
      if (prev && (!prev.tags || !prev?.tags[newTag])) {
        return {
          ...prev,
          tags: {
            ...(prev.tags ? prev.tags : {}),
            [newTag]: true,
          },
        };
      } else if (prev?.tags && prev.tags[newTag]) {
        const { [newTag]: _, ...rest } = prev.tags;

        return {
          ...prev,
          tags: rest,
        };
      }
    });
  };

  const onChangeReviewStatus = (review: reviewStatus) => {
    updateDraftReview((prev) => {
      if (prev)
        return {
          ...prev,
          reviewStatus: review,
        };
    });
  };

  // console.log(newPost);

  return {
    newReview,
    onUpdateReviewMessage,
    onUpdateScore,
    onChangeTags,
    onChangeReviewStatus,
    onUpdateTaskId,
    onUpdateTime,
    onUpdateActivityValue,
    // onUpdateTaskDay,
  };
};
