// import { UserProvider } from "@providers/user/UserProvider";
import { GameProvider } from "@providers/game/GameProvider";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { useRoute } from "@react-navigation/native";
import PurchaserScreenMain from "@modules/ShopMain/PurchaserScreenMain";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import { InteractionProvider } from "@providers/InteractionProvider/InteractionProvider";

export interface PurchaserScreenParams {
  voucherId: string;
}

const PurchaserScreen = () => {
  const route = useRoute();
  const { state } = useAuthContext();
  useScreenTrack();
  const { voucherId } = route.params as PurchaserScreenParams;

  return (
    <GameProvider selectedGameId={state.gameId}>
      {/* <UserProvider> */}
      <InteractionProvider>
        <PurchaserScreenMain voucherId={voucherId} />
      </InteractionProvider>
      {/* </UserProvider> */}
    </GameProvider>
  );
};

export default PurchaserScreen;
