import { View, Text, useWindowDimensions, Pressable } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { format } from "date-fns";
import { StepsDoc } from "@models/User/StepsDoc";
interface Props {
  item: StepsDoc;
}
const HistoryCard: React.FC<Props> = ({ item }) => {
  const { width } = useWindowDimensions();
  return (
    <Pressable className="">
      <LinearGradient
        colors={["#00A9A6", "#296999"]}
        className=" flex items-center ml-4 mt-4   aspect-[155/119] rounded-2xl"
        start={[0, 1]}
        end={[1, 0]}
        style={{ width: (width - 48) / 2 }}
      >
        <View className=" flex justify-evenly  flex-1">
          <View className="">
            <Text className="text-[#FFFFFF] text-3xl  text-center">
              {item?.steps}
            </Text>
            <Text className="text-[#F1F1F1B2] text-xs  text-center ">
              Steps Taken
            </Text>
          </View>
          <View>
            <View
              className="h-px bg-[#FFFFFF4D] "
              style={{ width: width / 3 }}
            />
            <Text className="pt-2 text-[#F1F1F1] text-sm text-center">
              {item?.unix ? format(new Date(item?.unix), " dd MMM") : null}
            </Text>
          </View>
        </View>
      </LinearGradient>
    </Pressable>
  );
};

export default HistoryCard;
