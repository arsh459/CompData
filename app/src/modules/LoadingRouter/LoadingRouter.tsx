// import { UserProvider } from "@providers/user/UserProvider";
// import JoinBoatMain from "@modules/JoinBoatMain";
import { sectionTypes } from "@modules/JoinBoatMain/hooks/useSection";
// import { GameProvider } from "@providers/game/GameProvider";
import { CommonActions, useNavigation } from "@react-navigation/native";
// import { TeamProvider } from "@providers/team/TeamProvider";
// import { SubscriptionProvider } from "@providers/subscription/SubscriptionProvider";
// import Header from "@modules/Header";
import { useAuthContext } from "@providers/auth/AuthProvider";

import { useEffect, useState } from "react";
import { useUserContext } from "@providers/user/UserProvider";
import { RootStackParamList } from "@routes/MainStack";
import { useDNContext } from "@providers/dnLinks/DNProvider";
// import { handleNavigationOnLoading } from "@providers/dnLinks/hooks/handleLink";
import LoadingSection from "./LoadingSection";
// import { STUDENT_OLYMPICS, TEAM_ALPHABET_GAME } from "@constants/gameStats";
// import { useDNContext } from "@providers/dnLinks/DNProvider";

export interface JoinBoatParams {
  section: sectionTypes;
  // gameId?: string;
  teamId?: string;
}

const LoadingRouter = () => {
  const { onChangeGameId } = useAuthContext();
  const { user } = useUserContext();
  const { dnResult, setDNResult } = useDNContext();
  const [routed, setRoute] = useState<boolean>(false);

  const navigation = useNavigation();

  useEffect(() => {
    if (!routed && user?.uid) {
      let navTo: keyof RootStackParamList = "JoinBoat";
      if (user.lastGameId) {
        onChangeGameId(user.lastGameId);
        // navTo = "Home";
      }

      // if (user.showPro) {
      // if (user.onboarded){
      // navTo:
      // }

      // sendToProScreen, params: {navTo: "JoinBoat" | "Home"}
      // }

      if (user.onboarded) {
        navTo = "Home";
      }

      navigation.dispatch((state) => {
        const routes = state.routes.filter((r) => r.name !== "Loading");
        routes.push({
          key: `${navTo}-${Math.round(Math.random() * 1000)}`,
          name: navTo,
        });

        return CommonActions.reset({
          ...state,
          routes,
          index: routes.length - 1,
        });
      });

      setRoute(true);
      // }
    }
  }, [
    navigation,
    user?.uid,
    // user?.participatingInGameWithTeam,
    // state.gameId,
    routed,
    dnResult,
    setDNResult,
    user?.lastGameId,
    user?.onboarded,
    // inviteTeamId,
    user?.flags?.seenWelcomePro,
  ]);

  return <LoadingSection />;
};

export default LoadingRouter;
