import { TEAM_ALPHABET_GAME } from "@constants/gameStats";
import { DNLinkParams } from "@models/DynamicLink/interface";
import { FirebaseDynamicLinksTypes } from "@react-native-firebase/dynamic-links";
import { NavigationProp } from "@react-navigation/native";
import { RouteKeys } from "@routes/MainStack";
import { BlogParamsProps } from "@screens/BlogScreen";
import { RecipeeDetailScreenParams } from "@screens/RecipeeDetailScreen";
import { PostDetailsParams } from "@screens/Community/PostDetails";
import { GameInviteScreenProps } from "@screens/GameInvite/GameInvite";
import { InviteScreenProps } from "@screens/Invite";
import { TeamProgParams } from "@screens/ProgressScrean";
import { ReelViewParams } from "@screens/ReelView";
import { UserParams } from "@screens/User";
import { WorkoutParams } from "@screens/Workout";
import { NutritionParams } from "@screens/NutritionScreen";
import { TaskPreviewParamsTypes } from "@screens/Workout/TaskPreviewScreen";
import { WorkoutHistoryExpanderScreenParamsTypes } from "@screens/WorkoutHistoryExpander";
import { format } from "date-fns";
import { BranchSubscriptionEventSocialBoat } from "./useDynamicLinks";
import { UploadTaskParams } from "@screens/Workout/UploadTask";
import { BootCampParams } from "@screens/BootCamp";
import { AwardWonParams } from "@screens/Awards/AwardWon";
import { AppointmentsScreenProps } from "@screens/AppointmentsScreen";
import { ReplyParams } from "@screens/Reply";
import { ChallengeDetailScreenProps } from "@screens/ChallengeDetailScreen";
import { MealScreenTypes } from "@screens/MealScreen";
const queryString = require("query-string");

export const handleNavigation = (
  parsed: DNParseResult,
  navigation: NavigationProp<ReactNavigation.RootParamList>
) => {
  if (
    parsed.route === "InviteScreen" &&
    parsed.params?.InviteScreen?.gameId &&
    parsed.params?.InviteScreen?.teamId
  ) {
    navigation.navigate(parsed.route, parsed.params.InviteScreen);
  } else if (parsed.route === "PostDetails" && parsed.params.PostDetails) {
    navigation.navigate(parsed.route, parsed.params.PostDetails);
  } else if (parsed.route === "User" && parsed.params.User) {
    navigation.navigate(parsed.route, parsed.params.User);
  } else if (
    parsed.route === "GameInviteScreen" &&
    parsed.params.GameInviteScreenProps
  ) {
    // navigate to Game Universe selector
    navigation.navigate(parsed.route, parsed.params.GameInviteScreenProps);
  } else if (
    parsed.route === "ProgressScreen" &&
    parsed.params.ProgressScreen
  ) {
    navigation.navigate(parsed.route, parsed.params.ProgressScreen);
  } else if (parsed.route === "Ranking") {
    navigation.navigate("Ranking");
  } else if (
    parsed.route === "WorkoutHistoryExpanderScreen" &&
    parsed.params.WorkoutHistoryExpanderScreen
  ) {
    navigation.navigate(
      "WorkoutHistoryExpanderScreen",
      parsed.params.WorkoutHistoryExpanderScreen
    );
  } else if (parsed.route === "BlogScreen" && parsed.params.BlogScreenProps) {
    navigation.navigate("BlogScreen", parsed.params.BlogScreenProps);
  } else if (
    parsed.route === "RecipeeDetailScreen" &&
    parsed.params.RecipeeScreenProps
  ) {
    navigation.navigate(
      "RecipeeDetailScreen",
      parsed.params.RecipeeScreenProps
    );
  } else if (parsed.route === "ReelView" && parsed.params.ReelScreenProps) {
    navigation.navigate("ReelView", parsed.params.ReelScreenProps);
  } else if (parsed.route === "Workout" && parsed.params.Workout) {
    navigation.navigate("Workout", parsed.params.Workout);
  } else if (parsed.route === "UploadTask" && parsed.params.UploadTask) {
    navigation.navigate("UploadTask", parsed.params.UploadTask);
  } else if (
    parsed.route === "NutritionScreen" &&
    parsed.params.NutritionScreen
  ) {
    navigation.navigate("NutritionScreen", parsed.params.NutritionScreen);
  } else if (parsed.route === "MealScreen" && parsed.params.MealScreen) {
    navigation.navigate("MealScreen", parsed.params.MealScreen);
  } else if (parsed.route === "SakhiExplainer") {
    navigation.navigate("SakhiExplainer", {});
  } else if (parsed.route === "StartNewChat") {
    navigation.navigate("StartNewChat");
  } else if (parsed.route === "ChatRoom") {
    navigation.navigate("ChatRoom");
  } else if (parsed.route === "BootCamp" && parsed.params.BootCampParams) {
    navigation.navigate("BootCamp", parsed.params.BootCampParams);
  } else if (parsed.route === "Period") {
    navigation.navigate("Period");
  } else if (parsed.route === "Shop") {
    navigation.navigate("Shop");
  } else if (parsed.route === "AllWorkouts") {
    navigation.navigate("AllWorkouts");
  } else if (parsed.route === "AwardWon" && parsed.params.AwardWon) {
    navigation.navigate("AwardWon", parsed.params.AwardWon);
  } else if (parsed.route === "Progress") {
    navigation.navigate("Progress");
  } else if (parsed.route === "UpgradeScreen") {
    navigation.navigate("UpgradeScreen");
  } else if (parsed.route === "AppointmentsScreen") {
    navigation.navigate("AppointmentsScreen", {
      initState: parsed.params.AppointmentsScreenProps?.initState
        ? parsed.params.AppointmentsScreenProps?.initState
        : "DEFAULT",
    });
  } else if (parsed.route === "FreeHealthConsulation") {
    navigation.navigate("FreeHealthConsulation");
  } else if (
    parsed.route === "ChallengeDetailScreen" &&
    parsed.params.ChallengeDetailScreen
  ) {
    navigation.navigate(
      "ChallengeDetailScreen",
      parsed.params.ChallengeDetailScreen
    );
  } else if (parsed.route === "Reply" && parsed.params.Reply) {
    navigation.navigate("Reply", parsed.params.Reply);
  } else if (parsed.route === "User" && parsed.params.User) {
    navigation.navigate("User", parsed.params.User);
  }
};

// export const handleNavigationOnLoading = (
//   parsed: DNParseResult,
//   navigation: NavigationProp<ReactNavigation.RootParamList>
// ) => {
//   if (
//     parsed.route === "InviteScreen" &&
//     parsed.params?.InviteScreen?.gameId &&
//     parsed.params?.InviteScreen?.teamId
//   ) {
//     navigation.dispatch((state) => {
//       const routes = state.routes.filter((r) => r.name !== "Loading");
//       routes.push({
//         key: `${parsed.route}-${Math.round(Math.random() * 1000)}`,
//         name: parsed.route,
//         params: parsed.params.InviteScreen,
//       });

//       return CommonActions.reset({
//         ...state,
//         routes,
//         index: routes.length - 1,
//       });
//     });
//   } else if (parsed.route === "PostDetails" && parsed.params.PostDetails) {
//     navigation.dispatch((state) => {
//       const routes = state.routes.filter((r) => r.name !== "Loading");
//       routes.push({
//         key: `${parsed.route}-${Math.round(Math.random() * 1000)}`,
//         name: parsed.route,
//         params: parsed.params.PostDetails,
//       });

//       return CommonActions.reset({
//         ...state,
//         routes,
//         index: routes.length - 1,
//       });
//     });
//   } else if (parsed.route === "User" && parsed.params.User) {
//     navigation.dispatch((state) => {
//       const routes = state.routes.filter((r) => r.name !== "Loading");
//       routes.push({
//         key: `${parsed.route}-${Math.round(Math.random() * 1000)}`,
//         name: parsed.route,
//         params: parsed.params.User,
//       });

//       return CommonActions.reset({
//         ...state,
//         routes,
//         index: routes.length - 1,
//       });
//     });
//   } else if (
//     parsed.route === "GameInviteScreen" &&
//     parsed.params.GameInviteScreenProps
//   ) {
//     navigation.dispatch((state) => {
//       const routes = state.routes.filter((r) => r.name !== "Loading");
//       routes.push({
//         key: `${parsed.route}-${Math.round(Math.random() * 1000)}`,
//         name: parsed.route,
//         params: parsed.params.GameInviteScreenProps,
//       });

//       return CommonActions.reset({
//         ...state,
//         routes,
//         index: routes.length - 1,
//       });
//     });
//   }
// };

export interface DNParseResult {
  route: RouteKeys; // "InviteScreen" | "GameInviteScreen" | "PostDetails" | "User" | "Home";
  params: {
    InviteScreen?: InviteScreenProps;
    PostDetails?: PostDetailsParams;
    User?: UserParams;
    GameInviteScreenProps?: GameInviteScreenProps;
    ProgressScreen?: TeamProgParams;
    WorkoutHistoryExpanderScreen?: WorkoutHistoryExpanderScreenParamsTypes;
    BlogScreenProps?: BlogParamsProps;
    ReelScreenProps?: ReelViewParams;
    RecipeeScreenProps?: RecipeeDetailScreenParams;
    UploadTask?: UploadTaskParams;
    Workout?: WorkoutParams;
    NutritionScreen?: NutritionParams;
    BootCampParams?: BootCampParams;
    AwardWon?: AwardWonParams;
    AppointmentsScreenProps?: AppointmentsScreenProps;
    Reply?: ReplyParams;
    ChallengeDetailScreen?: ChallengeDetailScreenProps;
    MealScreen?: MealScreenTypes;
  };
}

const getRouteParamKey = (route: RouteKeys) => {
  if (route === "BlogScreen") {
    return "BlogScreenProps";
  } else if (route === "ReelView") {
    return "ReelScreenProps";
  } else if (route === "RecipeeDetailScreen") {
    return "RecipeeScreenProps";
  } else {
    return route;
  }
};

export const handleDNSNotification = (
  navigationTo: RouteKeys,
  navigationParams: { [key: string]: string }
) => {
  const key = getRouteParamKey(navigationTo);
  return {
    route: navigationTo as RouteKeys,
    params: {
      [key]: navigationParams,
    },
  };
};

export const getCleanLink = (source: string) => {
  let lk = source;
  const headerPresent = source.includes("?noHeader");
  const queryPresent = source.includes("?");

  if (queryPresent && !headerPresent) {
    lk = `${lk}&noHeader=true`;
  } else if (!queryPresent && !headerPresent) {
    lk = `${lk}?noHeader=true`;
  }

  return lk;
};

export const handleBranchLink = (
  branchParams: BranchSubscriptionEventSocialBoat
): DNParseResult => {
  if (branchParams.navTo) {
    const key = getRouteParamKey(branchParams.navTo);

    if (
      branchParams.navTo === "WorkoutHistoryExpanderScreen" &&
      branchParams.actId
    ) {
      const params: WorkoutHistoryExpanderScreenParamsTypes = {
        actId: branchParams.actId,
        attemptedDate: branchParams.attemptedDate
          ? branchParams.attemptedDate
          : format(new Date(), "yyyy-MM-dd"),
      };
      return {
        route: "WorkoutHistoryExpanderScreen",
        params: { [key]: params },
      };
    } else if (branchParams.navTo === "BlogScreen" && branchParams.blogSource) {
      if (branchParams.blogSource) {
        const lk = getCleanLink(branchParams.blogSource);

        const params: BlogParamsProps = {
          source: lk,
          name: "deeplink",
        };
        return {
          route: "BlogScreen",
          params: { [key]: params },
        };
      }
    } else if (branchParams.navTo === "ReelView" && branchParams.taskId) {
      const params: ReelViewParams = {
        taskId: branchParams.taskId,
      };
      return {
        route: "ReelView",
        params: { [key]: params },
      };
    } else if (
      branchParams.navTo === "RecipeeDetailScreen" &&
      branchParams.taskId
    ) {
      const params: RecipeeDetailScreenParams = {
        taskId: branchParams.taskId,
      };
      return {
        route: "RecipeeDetailScreen",
        params: { [key]: params },
      };
    } else if (branchParams.navTo === "SakhiExplainer") {
      return {
        route: "SakhiExplainer",
        params: {},
      };
    } else if (branchParams.navTo === "StartNewChat") {
      return {
        route: "StartNewChat",
        params: {},
      };
    } else if (branchParams.navTo === "ChatRoom") {
      return {
        route: "ChatRoom",
        params: {},
      };
    } else if (branchParams.navTo === "Workout") {
      return {
        route: "Workout",
        params: {
          Workout: {
            badgeId: branchParams.badgeId ? branchParams.badgeId : "",
          },
        },
      };
    } else if (
      branchParams.navTo === "NutritionScreen" &&
      branchParams.badgeId
    ) {
      return {
        route: "NutritionScreen",
        params: {
          NutritionScreen: { badgeId: branchParams.badgeId },
        },
      };
    } else if (branchParams.navTo === "BootCamp" && branchParams.bootcampId) {
      return {
        route: "BootCamp",
        params: {
          BootCampParams: {
            id: branchParams.bootcampId,
          },
        },
      };
    } else if (branchParams.navTo === "Period") {
      return {
        route: "Period",
        params: {},
      };
    } else if (branchParams.navTo === "AllWorkouts") {
      return {
        route: "AllWorkouts",
        params: {},
      };
    } else if (branchParams.navTo === "AppointmentsScreen") {
      return {
        route: "AppointmentsScreen",
        params: {
          AppointmentsScreenProps: {
            initState: "OPEN",
          },
        },
      };
    } else if (branchParams.navTo === "User" && branchParams.userId) {
      return {
        route: "User",
        params: {
          User: {
            userId: branchParams.userId,
          },
        },
      };
    } else if (branchParams.navTo === "Reply" && branchParams.path) {
      return {
        route: "Reply",
        params: {
          Reply: {
            path: branchParams.path,
            viewLevel: branchParams.viewLevel
              ? branchParams.viewLevel
              : "session",
          },
        },
      };
    } else if (
      branchParams.navTo === "ChallengeDetailScreen" &&
      branchParams.roundId
    ) {
      return {
        route: "ChallengeDetailScreen",
        params: {
          ChallengeDetailScreen: {
            roundId: branchParams.roundId,
          },
        },
      };
    } else if (branchParams.navTo === "Knowledge") {
      return {
        route: "Knowledge",
        params: {},
      };
    } else if (branchParams.navTo === "Shop") {
      return {
        route: "Shop",
        params: {},
      };
    } else if (branchParams.navTo === "Progress") {
      return {
        route: "Progress",
        params: {},
      };
    }
  }

  return {
    route: "Home",
    params: {},
  };
};

export const handleDNLink = (
  link: FirebaseDynamicLinksTypes.DynamicLink
): DNParseResult => {
  if (link.url) {
    const paramsObj = getParamsObj(link.url);

    if (paramsObj) {
      const paramType = paramsObj.type;

      if (paramType === "progress") {
        const { captainId, teamId, sprintId } = handleProgressLink(paramsObj);
        return {
          route: "ProgressScreen",
          params: {
            ProgressScreen: {
              teamId,
              captainId,
              sprintId,
            },
          },
        };
      } else if (paramType === "invite") {
        const { gameId, teamId } = handleInviteLink(paramsObj);
        return {
          route: "InviteScreen",
          params: {
            InviteScreen: {
              teamId,
              gameId,
            },
          },
        };
      } else if (paramType === "gameInvite") {
        if (paramsObj.gameId)
          return {
            route: "GameInviteScreen",
            params: {
              GameInviteScreenProps: {
                gameId: paramsObj.gameId,
              },
            },
          };
        // const {gameId} = handleGameLink(paramsObj);
        // handle gameInvite screen
      } else if (paramType === "post") {
        const retParams = handlePostLink(paramsObj);
        if (retParams) {
          return {
            route: "PostDetails",
            params: {
              PostDetails: retParams,
            },
          };
        }
      } else if (paramType === "profile") {
        const retParams = handleProfileLink(paramsObj);
        if (retParams) {
          return {
            route: "User",
            params: {
              User: retParams,
            },
          };
        }
      } else if (paramType === "referral") {
        handleReferralLink(paramsObj);
      } else if (paramType === "task") {
        handleTaskLink(paramsObj);
      } else if (paramType === "") {
      }
    }
  }

  return {
    route: "Home",
    params: {},
  };
};

const getParamsObj = (link: string) => {
  const query = link.split("?");
  if (query.length === 2) {
    const resp = queryString.parse(query[1]);
    if (resp.type && resp.gameId && resp.teamId) {
      return resp as DNLinkParams;
    } else if (resp.type && resp.gameId) {
      return resp as DNLinkParams;
    }
  }
};

const handleInviteLink = (params: DNLinkParams) => {
  //   const teamId = params.teamId

  return {
    gameId: params.gameId ? params.gameId : "",
    teamId: params.teamId ? params.teamId : "",
  };
};

const handleProgressLink = (params: DNLinkParams) => {
  //   const teamId = params.teamId

  return {
    captainId: params.captainId ? params.captainId : "",
    sprintId: params.sprintId ? params.sprintId : "",
    teamId: params.teamId ? params.teamId : "",
  };
};

const handlePostLink = (
  params: DNLinkParams
): PostDetailsParams | undefined => {
  const postId = params.postId;
  const gameId = params.gameId;
  const teamId = params.teamId;
  if (postId) {
    return {
      gameId: gameId ? gameId : TEAM_ALPHABET_GAME,
      postId: postId,
      teamId: teamId ? teamId : "",
    };
  }
};
// const handleGameLink = (params: DNLinkParams) => {
//   // const gameId = params.gameId;
//   // if (gameId) {
//   //   return {
//   //     gameId: gameId ? gameId : TEAM_ALPHABET_GAME,
//   //   }
//   // }
// };

const handleProfileLink = (params: DNLinkParams): UserParams | undefined => {
  const uid = params.uid;
  if (uid) {
    return {
      userId: uid,
    };
  }
};
const handleReferralLink = (params: DNLinkParams) => {
  //   const uid = params.get("uid") as string | undefined;
  return undefined;
};
const handleTaskLink = (
  params: DNLinkParams
): TaskPreviewParamsTypes | undefined => {
  //   const taskId = params.get("taskId") as string | undefined;
  //   const gameId = params.get("gameId") as string | undefined;
  //   const teamId = params.get("teamId") as string | undefined;
  //   const selectedDayNumber = params.get("selectedDayNumber") as
  //     | string
  //     | undefined;
  //     const selectedDayNumber = params.get("selectedDayNumber") as
  //       | string
  //       | undefined;

  return undefined;
};
