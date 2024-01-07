// import { UserProvider } from "@providers/user/UserProvider";
// import { GameProvider } from "@providers/game/GameProvider";
// import { useAuthContext } from "@providers/auth/AuthProvider";
// import { Voucher } from "@models/Voucher/interface";
import VoucherPurchaseMain from "@modules/ShopMain/VoucherPurchaseMain";
import { useRoute } from "@react-navigation/native";
import { InteractionProvider } from "@providers/InteractionProvider/InteractionProvider";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";

export interface VoucherPurchaseParams {
  // voucher: Voucher;
  voucherId: string;
}

const VoucherPurchaseScreen = () => {
  const route = useRoute();
  useScreenTrack();
  // const { state } = useAuthContext();
  const { voucherId } = route.params as VoucherPurchaseParams;

  return (
    // <GameProvider selectedGameId={state.gameId}>
    <InteractionProvider>
      {/* <UserProvider> */}
      <VoucherPurchaseMain voucherId={voucherId} />
      {/* </UserProvider> */}
      {/* // </GameProvider> */}
    </InteractionProvider>
  );
};

export default VoucherPurchaseScreen;
