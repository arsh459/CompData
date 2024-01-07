import { View } from "react-native";

import { CheckIn } from "@hooks/healthcheckins";
import { formatUnixTimestamp } from "./utils";
import TextBetween from "@components/TextBetween/TextBetween";
interface Props {
  item: CheckIn;
  index: number;
}
const CheckInCard: React.FC<Props> = ({ item, index }) => {
  const { formattedTime, formattedDate } = formatUnixTimestamp(item.unixStart);

  return (
    <View className="bg-[#343150]  rounded-[20px] py-2 mb-2">
      <TextBetween textLeft={`Week ${index + 1}`} />
      <View className="h-px w-full bg-[#FFFFFF29]" />
      <TextBetween textLeft="Time" textRight={`${formattedTime}`} />
      <TextBetween textLeft="Date" textRight={`${formattedDate}`} />
    </View>
  );
};

export default CheckInCard;
