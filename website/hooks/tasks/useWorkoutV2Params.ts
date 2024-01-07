import { getQueryParamsForWorkoutPageV2 } from "@hooks/drawer/utils";
import { taskType } from "@models/Tasks/Task";
import { UserInterface } from "@models/User/User";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export type workoutTypes =
  | "wearable_prompt"
  | "select_workout"
  | "inprogress_workout"
  | "workout_summary"
  | "capture_media"
  | "media_task"
  | "post_workout";

export interface workoutV2Query {
  tab?: workoutTypes;
  taskId?: string;
  streamId?: string;
  parentId?: string;
  teamName?: string;
  coachKey?: string;
  type?: string;
}

export type workoutV2QueryKeys =
  | "tab"
  | "taskId"
  | "streamId"
  | "parentId"
  | "coachKey"
  | "teamName";

// export type taskQueryKeys = "eventKey" | "leaderKey" | "id";

export const useWorkoutV2Params = (
  pathCoachKey?: string,
  pathEventKey?: string,
  pathParentId?: string,
  user?: UserInterface,
  authStatus?: "PENDING" | "SUCCESS" | "FAILED"
) => {
  const router = useRouter();
  const q = router.query as workoutV2Query;

  const [tab, setTab] = useState<workoutTypes>("select_workout");
  const [taskId, setTaskId] = useState<string>("");
  const [streamId, setStreamId] = useState<string>("");

  useEffect(() => {
    if (router.isReady && q.tab && user?.uid) {
      setTaskId(q.taskId ? q.taskId : "");
      setTab(q.tab);
      setStreamId(q.streamId ? q.streamId : "");
    } else if (router.isReady && !q.tab && user?.uid && user?.terraUser) {
      q.tab = "select_workout";
      router.push(getQueryParamsForWorkoutPageV2(q), undefined, {
        shallow: true,
      });
    } else if (router.isReady && !q.tab && user?.uid && !user?.terraUser) {
      // console.log("user", user.uid, user.terraUser);
      q.tab = "wearable_prompt";
      router.push(getQueryParamsForWorkoutPageV2(q), undefined, {
        shallow: true,
      });
    }
  }, [router, q, user?.uid, user?.terraUser]);

  const onNavChange = (newNav: workoutTypes) => {
    q.tab = newNav;
    router.push(getQueryParamsForWorkoutPageV2(q), undefined, {
      shallow: true,
    });
  };

  const onWorkoutClick = (id: string, type?: taskType) => {
    // if (user?.terraUser) {
    //   q.taskId = id;
    //   q.tab = "inprogress_workout";

    //   router.push(getQueryParamsForWorkoutPageV2(q), undefined, {
    //     shallow: true,
    //   });
    // } else {
    //   q.taskId = id;
    //   q.tab = "capture_media";
    //   router.push(getQueryParamsForWorkoutPageV2(q), undefined, {
    //     shallow: true,
    //   });
    // }
    if (type === "mediaTask") {
      q.taskId = id;
      q.tab = "media_task";
      router.push(getQueryParamsForWorkoutPageV2(q), undefined, {
        shallow: true,
      });
    } else {
      q.taskId = id;
      q.tab = "capture_media";
      router.push(getQueryParamsForWorkoutPageV2(q), undefined, {
        shallow: true,
      });
    }
  };

  const onStreamIdUpdate = (streamId: string) => {
    q.streamId = streamId;
    router.push(getQueryParamsForWorkoutPageV2(q), undefined, {
      shallow: true,
    });
  };

  const onSelfieRequest = (streamId: string) => {
    q.streamId = streamId;

    q.tab = "capture_media";
    router.push(getQueryParamsForWorkoutPageV2(q), undefined, {
      shallow: true,
    });
  };

  const onGoToTeam = () => {
    if (pathCoachKey && pathEventKey) {
      router.push(`/${pathCoachKey}/${pathEventKey}`);
    }
    //else {
    //router.push(`/${coachKey}/${teamName}`);
    //}
  };

  const onBack = () => router.back();

  return {
    tab,
    onNavChange,
    onGoToTeam,
    streamId,
    coachKey: pathCoachKey,
    onBack,
    taskId,
    setTaskId,
    onSelfieRequest,
    onWorkoutClick,
    parentId: pathParentId,
    teamName: pathEventKey,
    onStreamIdUpdate,
  };
};
