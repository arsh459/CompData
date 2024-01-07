import { View, Text, Image } from "react-native";

import {
  arrowDailyOnboard,
  batterDailyOnboard,
  greatMoodEmoji,
} from "@constants/imageKitURL";
import { typePropTypes } from "@modules/JourneyLogHome/utils";
interface Props {
  type: typePropTypes;
  text: string;
  color: string;
}
const DailyOnboard: React.FC<Props> = ({ type, color, text }) => {
  const uri = type === "mood" ? greatMoodEmoji : batterDailyOnboard;
  return (
    <View className="flex-1 flex items-center justify-end ">
      <View className="flex w-4/5 flex-row items-center justify-between ">
        <Image source={{ uri: uri }} className="w-1/4  aspect-square " />

        <Text
          className="ml-4 text-white text-xl flex-1"
          style={{ fontFamily: "Nunito-Bold" }}
        >
          Start your healthy Journey by{" "}
          <Text className="" style={{ color }}>
            {text}
          </Text>
        </Text>
      </View>
      <Image
        source={{ uri: arrowDailyOnboard }}
        className="w-3/5 aspect-square"
      />
    </View>
  );
};

export default DailyOnboard;
