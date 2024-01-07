import MediaTile from "@components/MediaCard/MediaTile";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";
import { View, Text, TouchableOpacity } from "react-native";
import { LevelInterface } from "@models/Level/interface";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { useNavigation } from "@react-navigation/native";
import { getLeagueText } from "./utils";
interface Props {
  level: LevelInterface;
}
const LeagueImageSelectorComp: React.FC<Props> = ({ level }) => {
  const { userLevel } = useUserStore((state) => {
    return {
      userLevel: state.user?.userLevelV2 ? state.user?.userLevelV2 : 1,
    };
  }, shallow);

  const navigation = useNavigation();

  const onLevelIButton = () => {
    navigation.navigate("LevelDetailScreen", {
      lvlNumber: level.lvlNumber,
    });
    weEventTrack("leaderboard_levelClick", {});
  };

  const text = getLeagueText(level, userLevel);

  return (
    <View className="flex flex-row  ">
      <View className="flex items-center justify-center">
        <View className=" w-20 h-20 m-2">
          {level.earnedImg && level.lockedImg ? (
            <>
              <MediaTile
                media={
                  userLevel >= level.lvlNumber
                    ? level.earnedImg
                    : level.lockedImg
                }
                fluid={true}
              />
            </>
          ) : (
            <View>
              <MediaTile fluid={true} />
            </View>
          )}
        </View>
      </View>
      <View className=" flex-1 justify-center  ">
        <View className="flex flex-row items-center mb-1">
          <Text
            className="text-white text-lg leading-normal"
            style={{ fontFamily: "Nunito-Bold" }}
          >
            {level.title ? level.title : ""}
          </Text>
          <TouchableOpacity
            onPress={onLevelIButton}
            className="w-4 h-4 bg-[#ffffff26] rounded-full ml-2 flex items-center justify-center "
          >
            <Text className="text-center m-0 p-0 text-[10px] font-semibold text-white">
              i
            </Text>
          </TouchableOpacity>
        </View>
        <View className=" flex justify-center">
          <Text
            className="text-white/70 text-xs leading-4"
            style={{ fontFamily: "Nunito-Medium" }}
          >
            {text}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default LeagueImageSelectorComp;
