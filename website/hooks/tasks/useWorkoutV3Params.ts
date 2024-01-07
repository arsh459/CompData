import { getQueryParamsForWorkoutPageV3 } from "@hooks/drawer/utils";
import { labelType } from "@models/Tasks/Task";
import { UserInterface } from "@models/User/User";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import mixpanel from "@config/mixpanel";

export type workoutTypes =
  | "select_workout"
  | "create_workout"
  | "connect_wearables"
  | "wearable_info"
  | "connect_your_wearable"
  | "wearable_connected"
  | "preview_workout"
  | "task_preview"
  | "post_workout";

export interface workoutV3Query {
  tab?: workoutTypes;
  summaryType?: labelType;
  taskId?: string;
  // parentId?: string;
  // coachKey?: string;
  // teamName?: string;
  // type?: string;
  postId?: string;
}

export type workoutV3QueryKeys =
  | "tab"
  | "taskId"
  | "summaryType"

  // day: string eg - "0" "1" "2"
  // browseBy: 'all' | 'program'
  // | "parentId"
  // | "coachKey"
  // | "teamName"
  | "postId";

export const useWorkoutV3Params = (
  pathCoachKey?: string,
  pathEventKey?: string,
  pathParentId?: string,
  user?: UserInterface
) => {
  const router = useRouter();
  const q = router.query as workoutV3Query;

  const [tab, setTab] = useState<workoutTypes>("select_workout");
  const [taskId, setTaskId] = useState<string>("");
  const [sType, setSummaryType] = useState<labelType | undefined>();
  const [postId, setPostId] = useState<string>("");

  useEffect(() => {
    if (router.isReady && q.tab && user?.uid) {
      setTaskId(q.taskId ? q.taskId : "");
      setTab(q.tab);
      setSummaryType(q.summaryType ? q.summaryType : undefined);
      setPostId(q.postId ? q.postId : "");
    } else if (router.isReady && !q.tab && user?.uid && user?.terraUser) {
      q.tab = "select_workout";
      router.push(getQueryParamsForWorkoutPageV3(q), undefined, {
        shallow: true,
      });
    } else if (router.isReady && !q.tab && user?.uid && !user?.terraUser) {
      q.tab = "select_workout";
      router.push(getQueryParamsForWorkoutPageV3(q), undefined, {
        shallow: true,
      });
    }
  }, [router, q, user?.uid, user?.terraUser]);

  const onNavChange = (newNav: workoutTypes, replace?: boolean) => {
    q.tab = newNav;
    if (replace) {
      router.replace(getQueryParamsForWorkoutPageV3(q), undefined, {
        shallow: true,
      });
    } else {
      router.push(getQueryParamsForWorkoutPageV3(q), undefined, {
        shallow: true,
      });
    }
  };

  const onNavReplace = (tab: workoutTypes) => {
    q.tab = tab;
    delete q.postId;
    router.push(getQueryParamsForWorkoutPageV3(q), undefined, {
      shallow: true,
    });
  };

  useEffect(() => {
    mixpanel.time_event("workout_time");
    return () => {
      mixpanel.track("workout_time");
    };
  }, []);

  const onWorkoutClick = (id: string) => {
    q.taskId = id;
    q.tab = "task_preview";
    router.push(getQueryParamsForWorkoutPageV3(q), undefined, {
      shallow: true,
    });
  };

  const onTerraWorkout = () => {
    q.taskId = "8102ff1a-d65a-42bf-9156-d21597aec944";
    q.tab = "post_workout";
    router.push(getQueryParamsForWorkoutPageV3(q), undefined, {
      shallow: true,
    });
  };

  const onSummaryClick = (summaryType: labelType) => {
    q.summaryType = summaryType;
    q.tab = "preview_workout";
    router.push(getQueryParamsForWorkoutPageV3(q), undefined, {
      shallow: true,
    });
  };

  const onGoToTeam = () => {
    if (pathCoachKey && pathEventKey) {
      // console.log("p", pathCoachKey, pathEventKey);

      window.location.replace(
        `/${encodeURI(pathCoachKey)}/${encodeURI(pathEventKey)}`
      );

      // router.push(`/${encodeURI(pathCoachKey)}/${encodeURI(pathEventKey)}`);
    }
    //else {
    //router.push(`/${coachKey}/${teamName}`);
    //}
  };

  const onBack = () => router.back();

  return {
    tab,
    onBack,
    taskId,
    setTaskId,
    onGoToTeam,
    onNavChange,
    onWorkoutClick,
    parentId: pathParentId,
    coachKey: pathCoachKey,
    teamName: pathEventKey,
    onSummaryClick,
    sType,
    onTerraWorkout,
    postId,
    onNavReplace,
  };
};
