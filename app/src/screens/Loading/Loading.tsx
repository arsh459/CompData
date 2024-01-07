// import { UserProvider } from "@providers/user/UserProvider";
// import JoinBoatMain from "@modules/JoinBoatMain";
// import { sectionTypes } from "@modules/JoinBoatMain/hooks/useSection";
// import { GameProvider } from "@providers/game/GameProvider";
// import { useRoute } from "@react-navigation/native";
// import { TeamProvider } from "@providers/team/TeamProvider";
// import { SubscriptionProvider } from "@providers/subscription/SubscriptionProvider";
// import Header from "@modules/Header";
// import { useAuthContext } from "@providers/auth/AuthProvider";
// import { Text, View } from "react-native";
// import { useEffect } from "react";
// import { UserProvider } from "@providers/user/UserProvider";
import LoadingRouter from "@modules/LoadingRouter/LoadingRouter";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";

const LoadingScreen = () => {
  useScreenTrack();
  return (
    <>
      <LoadingRouter />
    </>
  );
};

export default LoadingScreen;
