// import { UserProvider } from "@providers/user/UserProvider";
// import { GameProvider } from "@providers/game/GameProvider";
// import { useAuthContext } from "@providers/auth/AuthProvider";
import ShopMain from "@modules/ShopMain";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import { useRoute } from "@react-navigation/native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

export interface ShopScreenParams {
  padding?: number;
}

const ShopScreen = () => {
  // const { state } = useAuthContext();
  useScreenTrack();

  const route = useRoute();

  const params = route.params as ShopScreenParams;

  let bottom: number = 0;
  if (typeof params?.padding == "number") {
    bottom = params.padding;
  } else {
    bottom = useBottomTabBarHeight();
  }

  return (
    // <GameProvider selectedGameId={state.gameId}>
    // <UserProvider>
    <ShopMain tabBarHeight={bottom} />
    // </UserProvider>
    // </GameProvider>
  );
};

export default ShopScreen;
