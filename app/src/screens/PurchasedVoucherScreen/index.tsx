// import { UserProvider } from "@providers/user/UserProvider";
// import { GameProvider } from "@providers/game/GameProvider";
// import { useAuthContext } from "@providers/auth/AuthProvider";
import { useRoute } from "@react-navigation/native";
import PurchasedVoucherMain from "@modules/ShopMain/PurchasedVoucherMain";
import { InteractionProvider } from "@providers/InteractionProvider/InteractionProvider";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";

export interface PurchasedVoucherScreenParams {
  voucherId: string;
}

const PurchasedVoucherScreen = () => {
  const route = useRoute();
  // const { state } = useAuthContext();
  useScreenTrack();
  const { voucherId } = route.params as PurchasedVoucherScreenParams;

  return (
    // <GameProvider selectedGameId={state.gameId}>
    <InteractionProvider>
      {/* <UserProvider> */}
      <PurchasedVoucherMain voucherId={voucherId} />
      {/* </UserProvider> */}
    </InteractionProvider>
    // </GameProvider>
  );
};

export default PurchasedVoucherScreen;
