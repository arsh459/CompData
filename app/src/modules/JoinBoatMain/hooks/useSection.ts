import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";
import { addUserToTeam } from "@models/User/createUtils";
import {
  updateUserListValues,
  updateUserStringValue,
  updateUserTextFields,
} from "@models/User/updateUtils";
import {
  achievementPace,
  fitnessGoalTypes,
  UserInterface,
  workoutLocation,
} from "@models/User/User";
import { updateUserBriefFields } from "@modules/UserProfile/utils";
import { useAuthContext } from "@providers/auth/AuthProvider";
// import { useAuthContext } from "@providers/auth/AuthProvider";
import { useGameContext } from "@providers/game/GameProvider";
// import { useSubscriptionContext } from "@providers/subscription/SubscriptionProvider";
import { useTeamContext } from "@providers/team/TeamProvider";
// import {  useNavigation } from "@react-navigation/native";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import { RootStackParamList } from "@routes/MainStack";
import { useEffect, useState } from "react";
import {
  createNewTeam,
  // sectionBeforeSubscription,
  userHasTeam,
} from "../utils/teamUtils";

export type sectionTypes =
  | "profileBrief"
  | "fitnessGoal"
  | "goalPace"
  | "goalLocation"
  | "teamName"
  | "join"
  | "userKey"
  | "loading"
  | "has_team"
  | "";

const useSection = (selectedSection: sectionTypes, user?: UserInterface) => {
  // const navigation =
  //   useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [section, setSection] = useState<sectionTypes>(selectedSection);
  // const [navProps, setNavProps] = useState<{
  //   gameId: string;
  //   teamId: string;
  // }>();

  const { game } = useGameContext();
  const { team: eventToJoin, teamLeader } = useTeamContext();
  const { onChangeGameId } = useAuthContext();
  const [teamName, setTeamName] = useState<string>("");

  const teamPresent = userHasTeam(
    user?.enrolledEvents,
    user?.participatingInGameWithTeam,
    game ? game.id : ""
  );

  // const { onToggleStatus } = useAuthContext();

  useEffect(() => {
    if (section === "") {
      // if (subStatus === "PENDING") {
      //   return;
      // }

      if (teamPresent !== "NEEDS_TEAM") {
        setSection("has_team");
      } else if (!user?.userKey) {
        setSection("userKey");
      } else if (
        !isProfileComplete(
          user.name,
          user.profileImage,
          user.email,
          user.instagramHandle
        )
      ) {
        setSection("profileBrief");
      } else if (!user.fitnessGoal) {
        setSection("fitnessGoal");
      } else if (!user.paceOfAchievement) {
        setSection("goalPace");
      } else if (!user.preferredWorkoutLocation) {
        setSection("goalLocation");
      } else if (eventToJoin && !eventToJoin.parentId) {
        setSection("teamName");
      } else {
        // const section = sectionBeforeSubscription(
        //   res.currentStatus,
        //   // res.basePlanStatus,
        //   game?.freeGame
        // );
        setSection("join");
      }
    }
    // else {
    // setSection("");
    // }
  }, [
    eventToJoin?.parentId,
    user?.name,
    user?.enrolledEvents,
    // res.currentStatus,
    // res.basePlanStatus,
    game?.id,
    game?.freeGame,
    user?.participatingInGameWithTeam,
    user?.fitnessGoal,
    user?.paceOfAchievement,
    user?.preferredWorkoutLocation,
    user?.userKey,
    user?.profileImage,
    user?.email,
    user?.instagramHandle,
    teamPresent,
    // subStatus,
  ]);

  const onSubscribeCallback = async () => {
    if (user) {
      if (eventToJoin?.parentId && teamLeader) {
        await addUserToTeam(
          user.uid,
          teamLeader?.uid,
          eventToJoin.parentId,
          eventToJoin.id,
          user,
          eventToJoin
        );

        // onSuccessSub();
        // setNavProps({ gameId: game ? game.id : "", teamId: eventToJoin.id });
      } else if (game) {
        // create team
        await createNewTeam(
          game,
          user,
          "",
          teamName,
          user.name,
          user.profileImage,
          user.uid
        );

        // onSuccessSub();
        // setNavProps({ gameId: game ? game.id : "", teamId: toCopyEvent.id });
      }
    }
  };

  const onNavOut = () => {
    // if (navProps) {
    // navigation.navigate("Community");
    // } else {
    // navigation.dispatch((state) => {
    //   const routes = state.routes.filter(
    //     (r) => r.name !== "JoinBoat" && r.name !== "InviteScreen"
    //   );
    //   routes.push({
    //     key: `Home-${Math.round(Math.random() * 1000)}`,
    //     name: "Home",
    //   });
    //   return CommonActions.reset({
    //     ...state,
    //     routes,
    //     index: routes.length - 1,
    //   });
    // });
    // navigation.navigate("Home");
    // }
  };

  const onJoin = async () => {
    if (game?.id) {
      onChangeGameId(game?.id);
      await onSubscribeCallback();
      onNavOut();
    }
  };

  const onUserKeySave = async (val: string) => {
    if (user && game) {
      await updateUserTextFields(user.uid, "userKey", val);
      await updateUserTextFields(user.uid, "name", val);
      // navigation.push("JoinBoat", {
      //   section: "profileBrief",
      //   gameId: game?.id,
      //   teamId: eventToJoin?.id,
      // });
    }
  };

  const onProfileUpdate = async (
    name?: string,
    instagramHandle?: string,
    email?: string,
    img?: AWSMedia | CloudinaryMedia,
    bio?: string
  ) => {
    if (user && game) {
      await updateUserBriefFields(
        user.uid,
        name,
        instagramHandle,
        email,
        img,
        bio
      );
      // navigation.push("JoinBoat", {
      //   section: "fitnessGoal",
      //   gameId: game.id,
      //   teamId: eventToJoin?.id,
      // });
    }
  };

  // goal update
  const onFitnessGoalUpdate = async (goals: fitnessGoalTypes[]) => {
    if (user && game) {
      await updateUserListValues(user.uid, goals, "fitnessGoal");
      // navigation.push("JoinBoat", {
      //   section: "goalPace",
      //   gameId: game?.id,
      //   teamId: eventToJoin?.id,
      // });
    }
  };

  // pace update
  const onFitnessPaceUpdate = async (pace: achievementPace) => {
    if (user && game?.id) {
      await updateUserStringValue(user.uid, pace, "paceOfAchievement");
      // navigation.push("JoinBoat", {
      //   section: "goalLocation",
      //   gameId: game?.id,
      //   teamId: eventToJoin?.id,
      // });
    }
  };

  // location update
  const onPreferredLocationUpdate = async (location: workoutLocation[]) => {
    if (user && game?.id) {
      await updateUserListValues(
        user.uid,
        location,
        "preferredWorkoutLocation"
      );
      if (!eventToJoin?.parentId) {
        // navigation.push("JoinBoat", {
        //   section: "teamName",
        //   gameId: game?.id,
        //   teamId: eventToJoin?.id,
        // });
      } else {
        // navigation.push("JoinBoat", {
        //   section: "join",
        //   teamId: eventToJoin?.id,
        //   gameId: game?.id,
        // });
      }
    }
  };

  // team name update
  const onTeamNameUpdate = (name: string) => {
    setTeamName(name);

    if (game?.id) {
    }
    // navigation.push("JoinBoat", {
    //   section: "join",
    //   gameId: game?.id,
    //   teamId: eventToJoin?.id,
    // });
    // navigation.push("JoinBoat", {
    //   section: "subscription",
    //   teamId: eventToJoin?.id,
    // });
  };

  return {
    section,
    onUserKeySave,
    onProfileUpdate,
    onFitnessGoalUpdate,
    onFitnessPaceUpdate,
    onPreferredLocationUpdate,
    onTeamNameUpdate,
    teamName,
    setTeamName,
    // onSubscribeCallback,
    // onNavOut,
    onJoin,
  };
};

export default useSection;

export const isProfileComplete = (
  name?: string,
  profileImage?: CloudinaryMedia | AWSMedia,
  email?: string,
  instagramLink?: string
) => {
  if (name && profileImage && email) {
    return true;
  }

  return false;
};
