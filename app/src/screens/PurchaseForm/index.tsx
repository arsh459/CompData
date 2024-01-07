// import { UserProvider } from "@providers/user/UserProvider";
// import { GameProvider } from "@providers/game/GameProvider";
// import { useAuthContext } from "@providers/auth/AuthProvider";
import { InteractionProvider } from "@providers/InteractionProvider/InteractionProvider";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import PersonalDetails from "@modules/ShopMain/PurchaseFormMainV2/stageModule/PersonalDetails";

export interface PurchaseFormParams {
  voucherId: string;
}

const PurchaseForm = () => {
  useScreenTrack();
  // const { state } = useAuthContext();

  return (
    // <GameProvider selectedGameId={state.gameId}>
    <InteractionProvider>
      {/* <UserProvider> */}
      <PersonalDetails />
      {/* <PurchaseFormMain voucherId={voucherId} /> */}
      {/* </UserProvider> */}
    </InteractionProvider>
    // </GameProvider>
  );
};

export default PurchaseForm;
