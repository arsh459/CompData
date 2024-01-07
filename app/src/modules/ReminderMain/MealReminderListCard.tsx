import { View, Text } from "react-native";

import TextBetween from "@components/TextBetween/TextBetween";
interface Props {
  icon: string;
  textLeft: string;
  textRight: string;
}
const MealReminderListCard: React.FC<Props> = ({
  icon,
  textLeft,
  textRight,
}) => (
  <View className="flex  flex-row items-center justify-between ">
    <TextBetween
      textLeft={textLeft}
      imgStr={icon}
      containerStyle="flex-row-reverse px-0 "
      textLeftStyle=""
    />

    <View className="bg-[#474276] rounded-lg px-4 py-1">
      <Text
        className="text-sm  text-[#F1F1F1]  iphoneX:text-base"
        style={{ fontFamily: "Nunito-Bold" }}
      >
        {textRight}
      </Text>
    </View>
  </View>
);

export default MealReminderListCard;
