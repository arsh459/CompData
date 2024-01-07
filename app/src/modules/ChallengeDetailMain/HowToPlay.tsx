import { View, Text, ScrollView } from "react-native";
import { BenefitInterface } from "@models/Rounds/interface";
import HowToPlayCard from "./HowToPlayCard";
interface Props {
  howToPlay?: BenefitInterface[];
}
const HowToPlay: React.FC<Props> = ({ howToPlay }) => {
  return (
    <View className="">
      {howToPlay ? (
        <Text
          className="text-base iphoneX:text-base text-white"
          style={{
            fontFamily: "BaiJamjuree-SemiBold",
          }}
        >
          How to Participate
        </Text>
      ) : null}
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        className=" flex flex-row pt-2"
      >
        {howToPlay?.map((item, index) => (
          <View key={`${item.text}_${index}`} className="pr-4">
            <HowToPlayCard index={index} item={item} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default HowToPlay;
