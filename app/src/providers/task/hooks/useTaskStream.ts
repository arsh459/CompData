import { useState } from "react";
import firestore from "@react-native-firebase/firestore";
// import { useAuthContext } from "@providers/auth/AuthProvider";
import { getSelectedActivityV2 } from "@utils/task/taskProgress";
import { Activity } from "@models/Activity/Activity";
// import {
// getTeamCaptainIdFromParticipating,
// getTeamIdFromParticipating,
// } from "@utils/utills";
// import { useUserContext } from "@providers/user/UserProvider";
// import {
//   createVideoPost,
//   saveNewPostWithActivityWithTaskParamsV2,
// } from "@utils/post/createUtils";
// import { usePlainTaskContext } from "../PlainTaskProvider";
// import {
//   onWorkoutDoneOnboardDone,
//   onWorkoutProgOnboardDone,
// } from "@modules/HomeScreen/utills/guidedOnboardUtils";
// import { useWorkoutVideoStore } from "@modules/Workout/ProgramDetails/TaskSubmitV3/utils/useWorkoutVideoStore";

const dayMS = 24 * 60 * 60 * 1000;
export const MIN_FP_TH = 0.2;
export const MIN_FP_PROG_TH = 0.03;

const getStartUnixForDateString = (dateSt: string) => {
  if (dateSt) {
    const splitStrings = dateSt.split("-");
    if (splitStrings.length === 3) {
      return new Date(
        parseInt(splitStrings[0]),
        parseInt(splitStrings[1]) - 1,
        parseInt(splitStrings[2]),
        0,
        0,
        0,
        0
      ).getTime();
    }
  }

  const now = new Date();
  return new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    0,
    0,
    0,
    0
  ).getTime();
};

export const getActivityForTask = async (
  uid: string,
  taskId: string,
  attemptedDate: string
) => {
  const selectedUnix = getStartUnixForDateString(attemptedDate);

  const userRelevantActsDocs = await firestore()
    .collection("users")
    .doc(uid)
    .collection("activities")
    .where("createdOn", ">=", selectedUnix)
    .where("createdOn", "<=", selectedUnix + dayMS)
    .where("taskId", "==", taskId)
    .get();

  if (userRelevantActsDocs && userRelevantActsDocs.docs.length) {
    const userRelevantActs: Activity[] = [];
    for (const doc of userRelevantActsDocs.docs) {
      const remoteDoc = doc.data() as Activity | null;

      if (remoteDoc) {
        userRelevantActs.push(remoteDoc);
      }
    }

    const selectedAct = getSelectedActivityV2(userRelevantActs);

    return selectedAct;
  }
};

export const calculateFPFromCalories = (calories?: number) => {
  if (calories) {
    return Math.round(calories / 300);
  }

  return 0;
};

export const calculateFPFromProgress = (storeProgress: number, fp?: number) => {
  let fpAward: number = 0;
  if (fp && storeProgress > MIN_FP_TH && storeProgress < 0.95) {
    fpAward = Math.round(storeProgress * fp);
  } else if (fp && storeProgress > 0.95) {
    fpAward = fp;
  }

  return {
    fpAward,
    visibleProgress: storeProgress < MIN_FP_PROG_TH ? 0 : storeProgress,
  };
};

export const useTaskStream = (attemptedDate: string) => {
  const [
    fpProgress,
    //  setFpProgress
  ] = useState<number>(0);
  const [
    selectedActivity,
    // setSelectedActivity
  ] = useState<Activity>();

  // const { setSelectedActivity } = useWorkoutVideoStore((state) => {
  //   return { setSelectedActivity: state.setSelectedActivity };
  // });
  const [
    checked,
    // setIsChecked
  ] = useState<boolean>(false);

  // const { state } = useAuthContext();
  // const { user } = useUserContext();
  // const { task } = usePlainTaskContext();

  // useEffect(() => {
  //   const getTaskState = async () => {
  //     if (task?.id && state.uid) {
  //       const selectedAct = await getActivityForTask(
  //         state.uid,
  //         task.id,
  //         attemptedDate
  //       );
  //       if (selectedAct) {
  //         setSelectedActivity(selectedAct);
  //       }

  //       setIsChecked(true);
  //     }
  //   };

  //   getTaskState();
  // }, [task?.id, state.uid, attemptedDate]);

  const onInitActivity = async () => {
    // console.log("hi", selectedActivity?.progress);
    // if (!selectedActivity?.id && state.uid && task?.id) {
    //   const leaderId = getTeamCaptainIdFromParticipating(
    //     user?.participatingInGameWithTeam,
    //     state.gameId
    //   );
    //   const teamId = getTeamIdFromParticipating(
    //     user?.participatingInGameWithTeam,
    //     state.gameId
    //   );
    //   const post = createVideoPost(
    //     [],
    //     state.uid,
    //     state.gameId,
    //     leaderId,
    //     teamId,
    //     task.id,
    //     attemptedDate,
    //     user?.name,
    //     user?.profileImage
    //     // antSt.id
    //     // true
    //   );
    //   const act = await saveNewPostWithActivityWithTaskParamsV2(
    //     teamId ? teamId : state.gameId,
    //     post,
    //     state.gameId,
    //     task.id,
    //     0,
    //     task?.name,
    //     task?.thumbnails,
    //     undefined,
    //     undefined,
    //     "task",
    //     0,
    //     "REVIEWED"
    //   );
    //   if (act) {
    //     setSelectedActivity(act);
    //     return act;
    //   }
    // }
  };

  const onUpdateProgress = async (progress: number, storeProgress: number) => {
    // if (state.uid && selectedActivity?.id) {
    //   const fp = task?.fitPoints;
    //   const { fpAward } = calculateFPFromProgress(storeProgress, fp);
    //   // let fpAward: number = 0;
    //   // if (fp && storeProgress > MIN_FP_TH && storeProgress < 0.95) {
    //   //   fpAward = Math.round(storeProgress * fp);
    //   // } else if (fp && storeProgress > 0.95) {
    //   //   fpAward = fp;
    //   // }
    //   const calories = fpAward * 300;
    //   // console.log(
    //   //   "progress",
    //   //   progress,
    //   //   "store",
    //   //   storeProgress,
    //   //   "calories",
    //   //   calories,
    //   //   "fp",
    //   //   fpAward
    //   // );
    //   setFpProgress(storeProgress > 1 ? 1 : storeProgress);
    //   firestore()
    //     .collection("users")
    //     .doc(state.uid)
    //     .collection("activities")
    //     .doc(selectedActivity.id)
    //     .update({
    //       progress: progress,
    //       fpProgress: storeProgress > 1 ? 1 : storeProgress,
    //       ...(calories ? { calories: calories, reviewStatus: "REVIEWED" } : {}),
    //     });
    //   if (
    //     !user?.flags?.workoutProgOnboard &&
    //     task?.id &&
    //     storeProgress > MIN_FP_TH &&
    //     storeProgress < 0.95
    //   ) {
    //     onWorkoutProgOnboardDone(user?.uid, task.id);
    //   }
    //   if (
    //     !user?.flags?.workoutDoneOnboard &&
    //     task?.id &&
    //     storeProgress > 0.95
    //   ) {
    //     onWorkoutDoneOnboardDone(user?.uid, task.id);
    //   }
    // }
  };

  return {
    selectedActivity,
    onUpdateProgress,
    onInitActivity,
    checked,
    fpProgress,
  };
};
