import MediaTile from "@components/MediaCard/MediaTile";
import HeartIcon from "@components/SvgIcons/HeartIcon";
import { Clapper } from "@models/Post/Post";
import { useNavigation } from "@react-navigation/native";
import { ListRenderItemInfo } from "@shopify/flash-list";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { format } from "date-fns";
import { TouchableOpacity } from "react-native";
import { View, Text } from "react-native";
import { likeElementHeight } from ".";

const FeedLikeRenderComp: React.FC<ListRenderItemInfo<Clapper>> = ({
  item,
}) => {
  const navigation = useNavigation();

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("User", { userId: item.clapperId });
          weEventTrack("Feedlikes_clickProfile", {});
        }}
        style={{ height: likeElementHeight }}
        className="bg-[#343150] px-4 py-3 rounded-2xl flex flex-row "
      >
        <View className="flex items-center justify-center">
          <View className="w-8 aspect-square rounded-full overflow-hidden">
            <MediaTile fluid={true} media={item.clapperImage} />
          </View>
        </View>
        <View className="flex-1 flex flex-row pl-2 justify-between items-center">
          <View className="flex">
            <Text
              className="text-[#fff] text-sm "
              style={{ fontFamily: "Nunito-Semibold" }}
            >
              {item.clapperName}
            </Text>
            <Text
              className="text-[#AEADB9] text-[10px]"
              style={{ fontFamily: "Nunito-Light" }}
            >
              {format(new Date(item.lastClapped), "do MMM, hh:mm a")}
            </Text>
          </View>
          <View className="flex items-center justify-center">
            <View className="w-6 aspect-square">
              <HeartIcon color={"#FF3FBE"} fill={true} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default FeedLikeRenderComp;
