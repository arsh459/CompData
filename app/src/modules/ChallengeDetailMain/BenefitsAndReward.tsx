import { View, Text } from "react-native";
import { BenefitInterface } from "@models/Rounds/interface";
import BenfitsAndRewardCard from "./BenfitsAndRewardCard";
interface Props {
  benefits?: BenefitInterface[];
}
const BenefitsAndReward: React.FC<Props> = ({ benefits }) => {
  return (
    <View className="">
      {benefits ? (
        <Text
          className="text-base iphoneX:text-base text-white"
          style={{
            fontFamily: "BaiJamjuree-SemiBold",
          }}
        >
          Benefits and Rewards
        </Text>
      ) : null}
      <View className="flex flex-wrap flex-row justify-between pt-2">
        {benefits?.map((item, index) => (
          <View
            key={`${item.text}_${index}`}
            className="flex flex-row w-[30%] pb-4"
          >
            <BenfitsAndRewardCard imgUrl={item.img} text={item.text} />
          </View>
        ))}
      </View>
    </View>
  );
};

export default BenefitsAndReward;
