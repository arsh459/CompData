import ImageWithURL from "@components/ImageWithURL";
import ArrowIcon from "@components/SvgIcons/ArrowIcon";
import { AutoRoomIDs } from "@models/ChatBot/insights";
import { useCurrentPeriodStore } from "@providers/period/periodStore";
import { useNavigation } from "@react-navigation/native";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import {
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { shallow } from "zustand/shallow";

const constants: { [key in AutoRoomIDs]: { emoji: string; action: string } } = {
  YOGA: {
    emoji:
      "https://ik.imagekit.io/socialboat/___%EF%B8%8F__A-_tViYK.png?updatedAt=1683961992007",
    action: "Yoga Practice",
  },
  DIET: {
    emoji:
      "https://ik.imagekit.io/socialboat/__l0UKFlLaxY.png?updatedAt=1683961991729",
    action: "Diet to Follow",
  },
};

const ListItem = ({
  periodDateId,
  type,
  // item,
  itemBGColor,
}: {
  periodDateId: string;
  type: AutoRoomIDs;
  // item: EmojiItem;
  itemBGColor?: string;
}) => {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();

  const item = useCurrentPeriodStore((state) => {
    const dp = state.periodDateObjStore[state.currentlySelected];

    if (dp?.recommendations && dp.recommendations[type]) {
      return { ...dp.recommendations[type], fetchingState: "COMPLETED" };
    }

    return state.insights[type][state.currentlySelected]
      ? state.insights[type][state.currentlySelected]
      : undefined;
  }, shallow);

  const onPress = () => {
    navigation.navigate("InsightDetail", { periodDateId, type });

    weEventTrack(`period_click${type}Insight`, {});
  };

  if (!item) {
    return null;
  }

  const isDisabled =
    item.fetchingState === "FETCHING" || item.fetchingState === "FAILED";

  if (item.fetchingState === "FAILED") {
    return null;
  }

  return (
    <TouchableOpacity
      disabled={isDisabled}
      onPress={onPress}
      style={{
        width: width * 0.8,
        backgroundColor: itemBGColor ? itemBGColor : "#343150",
      }}
      className="flex-1 flex flex-row justify-between items-center p-4 rounded-2xl"
    >
      <ImageWithURL
        source={{ uri: constants[type].emoji }}
        className="w-1/4 aspect-square mr-3"
        resizeMode="contain"
      />
      <View className="flex-1">
        {item.name ? (
          <Text
            numberOfLines={1}
            className={`text-sm  text-white`}
            style={{ fontFamily: "Nunito-Bold" }}
          >
            {item.name}
          </Text>
        ) : null}
        <Text
          numberOfLines={4}
          className={`text-xs  text-white/90`}
          style={{ fontFamily: "Nunito-Light" }}
        >
          {item.reason}
        </Text>
        <View className="flex-1 flex flex-row justify-between items-end mt-2">
          <Text
            numberOfLines={4}
            className={`text-xs  text-white bg-[#5E5B7D] px-3 py-0.5 rounded-lg`}
            style={{ fontFamily: "Nunito-Light" }}
          >
            {constants[type].action}
          </Text>
          {isDisabled ? null : (
            <View className="w-3 aspect-square">
              <ArrowIcon color="#FFFFFF" direction="right" />
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ListItem;
