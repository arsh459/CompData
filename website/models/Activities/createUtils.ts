import {
  Activity,
  AlgoliaActivity,
  ReviewMessage,
  reviewStatus,
} from "./Activity";
import {
  doc,
  DocumentReference,
  setDoc,
  updateDoc,
  writeBatch,
  query,
  where,
  collection,
  getDocs,
  getDoc,
  deleteField,
} from "firebase/firestore";
import { db } from "@config/firebase";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { getTaskById, getUpdatedTaskProgress } from "@models/Tasks/createUtils";
// import { Task } from "@models/Tasks/Task";

export const notifyUser = async (uid: string, activityId: string) => {
  await updateDoc(doc(doc(db, "users", uid), "activities", activityId), {
    notifyUser: "PENDING",
  });
};

export const createNewReviewMessage = (
  judgeUID: string,
  judgeName?: string,
  judgeImage?: CloudinaryMedia | AWSMedia
): ReviewMessage => {
  const now = Date.now();
  return {
    id: uuidv4(),
    media: [],
    text: "",
    tags: {},
    createdOn: Date.now(),

    authorUID: judgeUID,
    ...(judgeName ? { authorName: judgeName } : {}),
    ...(judgeImage ? { authorImg: judgeImage } : {}),
    score: 0,
    activityTimeAdded: now,
  };
};

export const addNewJudge = async (
  activity: AlgoliaActivity | Activity,
  judge: LeaderBoard
) => {
  const newReview = createNewReviewMessage(
    judge.uid,
    judge.name,
    judge.profileImage
  );

  const batch = writeBatch(db);
  if (activity.id) {
    const userRef = doc(db, "users", activity.authorUID);
    const actRef = doc(userRef, "activities", activity.id);

    // update activity
    batch.update(actRef, {
      reviewStatus: "PENDING",
      activeMessage: newReview,
    });

    // save old message;
    const prevReview = activity.activeMessage;
    if (prevReview) {
      const oldReviewsRef = doc(actRef, "activityReviews", prevReview.id);
      batch.set(oldReviewsRef, prevReview);
    }

    await batch.commit();
  }
};

export const updateActivityState = async (
  activity: AlgoliaActivity | Activity,
  state: reviewStatus
) => {
  // const newReview = createNewReviewMesage(judge);
  if (activity.id) {
    const userRef = doc(db, "users", activity.authorUID);
    const actRef = doc(userRef, "activities", activity.id);

    updateDoc(actRef, {
      reviewStatus: state,
    });
  }
};

export const updateActivityTask = async (
  activity: Activity,
  taskId: string,
  taskName?: string
) => {
  if (activity.id) {
    const userRef = doc(db, "users", activity.authorUID);
    const actRef = doc(userRef, "activities", activity.id);

    updateDoc(actRef, {
      taskId: taskId,
      ...(taskName
        ? {
            taskName: taskName,
            activityName: taskName,
          }
        : {}),
    });
  }
};

export const updateActivityTaskDay = async (
  activity: Activity,
  taskDay: number
) => {
  if (activity.id) {
    const userRef = doc(db, "users", activity.authorUID);
    const actRef = doc(userRef, "activities", activity.id);

    if (typeof activity.taskDay === "number" && activity.taskDay === taskDay) {
      updateDoc(actRef, {
        taskDay: deleteField(),
      });
    } else {
      updateDoc(actRef, {
        taskDay: taskDay,
      });
    }
  }
};

export const createNewReview = (
  // communityId: string,
  // eventId: string,
  // parentId: string,
  gameId: string,
  authorUID: string,
  postId: string,
  cohortId?: string
): Activity => {
  const now = new Date();
  return {
    calories: 0,
    fitPoints: 0,
    date: format(now, "dd/MM/yyyyy"),
    activityName: "cycling",
    postId,
    id: uuidv4(),

    notifyUser: "TBD",

    games: [gameId],

    authorUID,
    updatedOn: now.getTime(),
    createdOn: now.getTime(),
    distanceInMeters: 0,
    timeInSeconds: 0,

    ...(cohortId ? { coachCohortId: cohortId } : {}),
  };
};

export const saveReview = async (
  newReview: Activity,
  createdOnDate: Date | null,
  postRef: DocumentReference
) => {
  if (newReview.id) {
    const docRef = doc(
      doc(db, "users", newReview.authorUID),
      "activities",
      newReview.id
    );
    await setDoc(
      docRef,
      {
        ...newReview,
        ...(createdOnDate
          ? {
              createdOn: createdOnDate.getTime(),
              date: format(createdOnDate, "dd/MM/yyyy"),
              postRef: postRef,
            }
          : {}),
      },
      { merge: true }
    );
  }
};

export const onSaveNewReviewToAct = async (
  actId: string,
  taskId: string | undefined,
  // goalId: string | undefined,
  activityAuthor: string,
  newReview: ReviewMessage,
  status: reviewStatus,
  notifyUser: boolean,
  // task: Task,
  activity: Activity
) => {
  // console.log("new", newReview);
  const batch = writeBatch(db);

  const actRef = doc(doc(db, "users", activityAuthor), "activities", actId);

  const updatedAct: Activity = {
    ...activity,
    reviewStatus: status,
    calories: newReview.score,
    activeMessage: newReview,
    // createdOn: newReview.activityTimeAdded
    //   ? newReview.activityTimeAdded
    //   : Date.now(),
    ...(typeof newReview.goalScores === "object"
      ? { goalScores: newReview.goalScores }
      : {}),
    ...(status === "REVIEWED"
      ? // || status === "TICKET_REVIEWED"
        { pointsSeen: false }
      : {}),
    ...(notifyUser ? { notifyUser: "PENDING" } : {}),
  };

  if (
    newReview.activityTimeAdded &&
    taskId &&
    typeof newReview.score === "number"
  ) {
    // goal update
    if (newReview.goalScores) {
      const goalToUpdate = await getTaskById(taskId);

      if (goalToUpdate) {
        const updatedProgress = await getUpdatedTaskProgress(
          goalToUpdate,
          activityAuthor,
          updatedAct
          // values
        );

        // console.log("updatedProgress", activityAuthor, updatedProgress);

        // throw new Error("paused");
        if (updatedProgress) {
          const taskProgressRef = doc(
            doc(db, "tasks", taskId),
            "taskProgress",
            activityAuthor
          );

          batch.set(taskProgressRef, updatedProgress, { merge: true });
        }
      }
    }

    // updatedAct;
    batch.update(actRef, { ...updatedAct });

    const newRevRef = doc(actRef, "activityReviews", newReview.id);
    batch.set(newRevRef, { ...newReview, taskId: taskId });

    await batch.commit();
  }
};

export const getActivityForPost = async (uid: string, postId: string) => {
  const q = query(
    collection(doc(db, "users", uid), "activities"),
    where("postId", "==", postId)
  );

  const activities = await getDocs(q);

  const relevantActs: Activity[] = [];
  for (const act of activities.docs) {
    relevantActs.push(act.data() as Activity);
  }

  if (relevantActs.length) {
    return relevantActs[0];
  }
};

export const getActivityById = async (uid: string, actId: string) => {
  const activity = (
    await getDoc(doc(doc(db, "users", uid), "activities", actId))
  ).data();

  if (activity) {
    return activity as Activity;
  }
  return undefined;
};
