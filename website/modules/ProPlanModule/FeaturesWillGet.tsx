import React from "react";

import { UserInterface } from "@models/User/User";
import FeatureListCardV3 from "./FeatureListCardV3";
import { listCardV3 } from "./utils";
interface Props {
  user: UserInterface;
}
const FetauresWillGet: React.FC<Props> = ({ user }) => {
  return (
    <div className="rounded-[35px] flex-1">
      <div className="py-4">
        <p className="text-sm iphoneX:text-base md:text-3xl font-nunitoB py-4 text-white">
          What I will get
        </p>
        <div className="bg-[#FFFFFF1A] h-[.5px] m-1" />
      </div>
      {listCardV3.map((plan, index) => (
        <React.Fragment key={`${plan.heading}-${index}`}>
          <FeatureListCardV3
            heading={plan.heading}
            iconImg={plan.iconUri}
            mainText={plan.mainText || ""}
            highlightFirstItem={
              plan?.isHighlighted && user?.onboardingCallStatus !== "DONE"
            }
            inApp={plan?.inApp ? true : false}
          />
          <div className="bg-[#FFFFFF1A] h-[.5px] my-4" />
        </React.Fragment>
      ))}
    </div>
  );
};

export default FetauresWillGet;
