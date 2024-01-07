// import { useAuthContext } from "@providers/auth/AuthProvider";
// import { useGameContext } from "@providers/game/GameProvider";
// import { useSubscriptionContext } from "@providers/subscription/SubscriptionProvider";
// import { useUserContext } from "@providers/user/UserProvider";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";

export type teamExplainerSection = "welcomeAnimation" | "explainer";

export const useTeamExplainer = (goBack?: boolean) => {
  const navigation = useNavigation();
  const [section, setSection] =
    useState<teamExplainerSection>("welcomeAnimation");
  //   const [teamName, setTeamName] = useState<string>("");

  //   const { game } = useGameContext();
  //   const { user } = useUserContext();

  useEffect(() => {
    const timer = setTimeout(() => setSection("explainer"), 2500);

    return () => clearTimeout(timer);
  }, []);

  const onGetStarted = () => {
    goBack
      ? navigation.goBack()
      : navigation.navigate("CreateTeamEnterNameScreen");
  };

  return {
    section,
    // teamName,
    // setTeamName,
    onGetStarted,
    // onTeamCreate,
    // onClose,
  };
};
