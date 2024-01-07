import { View, Text } from "react-native";

import { listCardV3 } from "../utils";
import FeatureListCardV3 from "../FeatureListCardV3";
import { useUserContext } from "@providers/user/UserProvider";

const FetauresWillGet = () => {
  const { user } = useUserContext();
  return (
    <View className="  rounded-[35px] flex-1">
      <View className="">
        <Text
          className="text-sm iphoneX:text-base py-4 pl-5 text-white"
          style={{ fontFamily: "Nunito-Bold" }}
        >
          What will I get?
        </Text>
      </View>
      {listCardV3.map((plan, index) => (
        <FeatureListCardV3
          heading={plan.heading}
          navTo={plan.navTo}
          iconImg={plan.iconUri}
          mainText={plan.mainText || ""}
          key={`${plan.heading}-${index}`}
          highlightFirstItem={
            plan?.isHighlighted && user?.onboardingCallStatus !== "DONE"
          }
        />
      ))}
    </View>
  );
};

export default FetauresWillGet;
