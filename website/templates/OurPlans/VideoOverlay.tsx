import { UserInterface } from "@models/User/User";
import { currency } from "./Plan";
import { useState } from "react";
import { weEventTrack } from "@analytics/webengage/user/userLog";
import { deviceTypes } from "@templates/PaymentTemplate/SelectDevice";
import { SbPlans } from "@models/SbPlans/interface";
import DesktopSubscription from "./DesktopSubscription";
import MobileSubscription from "./MobileSubscription";

export const gradients: { [key: number]: string } = {
  30: "from-[#39AAD7] to-[#2CD8B0]",
  90: "from-[#FF6C77] to-[#FFAB70]",
  365: "from-[#E376FF] to-[#FF57A2]",
};

interface Props {
  user?: UserInterface;
  deviceType?: deviceTypes;
  coachRef: string;
  allSbPlan: SbPlans[];
}

const VideoOverlay: React.FC<Props> = ({ coachRef, allSbPlan }) => {
  const [currency, setCurrency] = useState<currency>("INR");

  const onSinglePayRequest = async (plan: SbPlans) => {
    weEventTrack("paywall_clickPlan", {});

    weEventTrack("ProScreen_clickPlan", {});
  };

  return (
    <div className="w-full h-full relative z-0">
      <DesktopSubscription
        allSbPlan={allSbPlan}
        coachRef={coachRef}
        currency={currency}
        onSinglePayRequest={onSinglePayRequest}
        setCurrency={setCurrency}
      />

      <MobileSubscription
        allSbPlan={allSbPlan}
        coachRef={coachRef}
        currency={currency}
        onSinglePayRequest={onSinglePayRequest}
        setCurrency={setCurrency}
      />

      <img
        className="block sm:hidden absolute inset-0 h-screen object-cover -z-10"
        src="https://ik.imagekit.io/socialboat/SB%20main%20website%2069%20(1)_uNGIxWF-v.png?updatedAt=1690196291824"
        alt="plan background women image "
      />
    </div>
  );
};

export default VideoOverlay;
