// import { UserProvider } from "@providers/user/UserProvider";
// import { GameProvider } from "@providers/game/GameProvider";
// import { useAuthContext } from "@providers/auth/AuthProvider";
import GetAccessMain from "@modules/ProScreenMain/GetAccessMain";
// import { SubscriptionProvider } from "@providers/subscription/SubscriptionProvider";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";

import GetAccessMainInApp from "@modules/ProScreenMain/GetAccessMain/GetAccessMainInApp";
import { PAYMENTS_BY } from "@constants/gameStats";

const GetAccessScreen = () => {
  // const { state } = useAuthContext();
  useScreenTrack();

  if (PAYMENTS_BY === "RAZORPAY") {
    return <GetAccessMain />;
  } else {
    return <GetAccessMainInApp />;
  }
};

export default GetAccessScreen;
