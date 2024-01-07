import { View, Text } from "react-native";

import { bonusListCardV2 } from "../utils";
import BonusListCard from "../BonusListCard";

interface Props {
  disabled?: boolean;
}

const BonusAccess: React.FC<Props> = ({ disabled }) => {
  return (
    <View className="   mt-0 rounded-[35px] ">
      <View className="">
        <Text
          className="text-sm iphoneX:text-base pt-4 pl-5 text-white"
          style={{ fontFamily: "Nunito-Bold" }}
        >
          Bonus Access
        </Text>
      </View>
      {bonusListCardV2.map((plan, index) => (
        <BonusListCard
          key={`${plan.mainText}-${index}`}
          plan={plan}
          disabled={disabled}
          headingColor="text-[#FFFFFFB2]"
        />
      ))}
    </View>
  );
};

export default BonusAccess;
