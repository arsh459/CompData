// import { useAuthContext } from "@providers/auth/AuthProvider";
import { useGameContext } from "@providers/game/GameProvider";
// import { useSubscriptionContext } from "@providers/subscription/SubscriptionProvider";
import { useUserContext } from "@providers/user/UserProvider";
import { useNavigation } from "@react-navigation/native";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { useState } from "react";
import {
  createNewTeam,
  // sectionBeforeSubscription,
  userHasTeam,
} from "../utils/teamUtils";

export type teamCreateSection =
  // | "welcomeAnimation"
  // | "explainer"
  "teamName" | "invite";

export const useTeamCreate = () => {
  const navigation = useNavigation();
  const [section, setSection] = useState<teamCreateSection>("teamName");
  const [teamName, setTeamName] = useState<string>("");
  const [teamId, setTeamId] = useState<string>("");

  const { game } = useGameContext();
  const { user } = useUserContext();

  const teamPresent = userHasTeam(
    user?.enrolledEvents,
    user?.participatingInGameWithTeam,
    game ? game.id : ""
  );

  const onClose = () => {
    weEventTrack("teamCreate_goBack", {});
    navigation.goBack();
  };

  const onTeamCreate = async () => {
    if (user && game && teamPresent === "NEEDS_TEAM") {
      const newTeam = await createNewTeam(
        game,
        user,
        "",
        teamName,
        user.name,
        user.profileImage,
        user.uid
      );

      weEventTrack("teamCreate_clickNext", {});

      setTeamId(newTeam.id);
      setSection("invite");
    } else {
      setSection("invite");

      weEventTrack("teamCreate_clickNext", {});
      // onClose();
    }
  };

  return {
    section,
    teamName,
    setTeamName,
    onTeamCreate,
    onClose,
    teamId,
  };
};
