import ImageWithURL from "@components/ImageWithURL";
import {
  greenThinTick,
  roundWhiteBlackLock,
  streakCompleteTick,
} from "@constants/imageKitURL";
import { View, Text } from "react-native";

type itemStatus = "Unlocked" | "Current" | "Locked";
interface Props {
  lastItem?: boolean;
  firstItem?: boolean;
  itemText: string;
  itemStatus: itemStatus;
}

const StreakGoalListItem: React.FC<Props> = ({
  lastItem,
  firstItem,
  itemText,
  itemStatus,
}) => {
  return (
    <View
      className={` ${lastItem && "rounded-b-lg"} 
      ${firstItem && " rounded-t-lg border-t"} 
      ${
        itemStatus === "Current"
          ? " bg-[#312E50] rounded-xl border border-[#F4B73F]"
          : " border-x border-b border-[#FFFFFF33]"
      }
      ${itemStatus === "Unlocked" && "bg-[#2E503D] "}
      p-4 flex flex-row justify-between`}
    >
      <Text
        className={`${
          itemStatus === "Unlocked"
            ? " text-[#3FF45C66] line-through bg-[#2E503D] "
            : "text-white"
        } font-bold`}
      >
        {itemText}
      </Text>
      <View className=" w-4 h-4">
        {itemStatus === "Locked" ? (
          <ImageWithURL
            resizeMode="contain"
            source={{ uri: roundWhiteBlackLock }}
          />
        ) : itemStatus === "Current" ? (
          <ImageWithURL
            resizeMode="contain"
            source={{ uri: streakCompleteTick }}
          />
        ) : (
          <ImageWithURL resizeMode="contain" source={{ uri: greenThinTick }} />
        )}
      </View>
    </View>
  );
};

export default StreakGoalListItem;
