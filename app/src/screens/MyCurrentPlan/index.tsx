import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import CurrentPlan from "@modules/CurrentPlan";
// import { GameProvider } from "@providers/game/GameProvider";
// import { SubscriptionProvider } from "@providers/subscription/SubscriptionProvider";
// import { UserProvider } from "@providers/user/UserProvider";

const MyCurrentPlan = () => {
  useScreenTrack();
  return (
    <>
      {/* <GameProvider selectedGameId="nogame"> */}
      {/* <SubscriptionProvider> */}
      <CurrentPlan />
      {/* </SubscriptionProvider> */}
      {/* </GameProvider> */}
    </>
  );
};

export default MyCurrentPlan;
