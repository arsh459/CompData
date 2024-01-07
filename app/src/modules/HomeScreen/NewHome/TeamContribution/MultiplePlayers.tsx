import ProgressBar from "@components/ProgressBar";
import SvgIcons from "@components/SvgIcons";
import UserImage from "@components/UserImage";
import { useGameContext } from "@providers/game/GameProvider";
import { useTeamProgressContext } from "@providers/teamProgress/TeamProgressProvider";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  useWindowDimensions,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { getFPsToDisplayInt, getPlayerPts } from "../utils";

interface Props {
  handleInvite: () => void;
}

const MultiplePlayers: React.FC<Props> = ({ handleInvite }) => {
  const { params } = useGameContext();
  const { coachRank, userRanks } = useTeamProgressContext();
  const currentSprintId = params?.currentSprint?.id;
  const fps = getFPsToDisplayInt(coachRank, currentSprintId);
  const { width } = useWindowDimensions();

  const isEven = userRanks.length % 2 === 0;

  const handleViewTeam = () => {
    coachRank?.coachEventId
      ? navigation.navigate("TeamScreen", { teamId: coachRank.coachEventId })
      : null;
  };

  const navigation = useNavigation();
  const onPlayerPress = (uid: string) =>
    navigation.navigate("User", { userId: uid });

  return (
    <View className="bg-[#FFFFFF17] rounded-xl ">
      <Pressable
        onPress={handleViewTeam}
        className="flex flex-row items-center px-4 bg-zinc-700 rounded-lg"
        style={{
          shadowColor: "#000000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.8,
          shadowRadius: 12,
        }}
      >
        <Text
          style={{ fontFamily: "BaiJamjuree-Bold" }}
          className="text-white font-medium text-lg"
        >
          {coachRank?.rank}
        </Text>
        <View className="flex-1 p-4 border-r border-black mr-4">
          <Text
            style={{ fontFamily: "BaiJamjuree-Bold" }}
            numberOfLines={1}
            className="text-white text-lg"
          >
            {coachRank?.teamName}
          </Text>
        </View>
        <Text
          style={{ fontFamily: "BaiJamjuree-Bold" }}
          className="text-white  font-medium text-right text-lg"
        >
          {fps} FP
        </Text>
      </Pressable>
      <View className="flex flex-row flex-wrap p-2">
        {userRanks.map((each) => {
          const fitpoints = getPlayerPts(each, currentSprintId);
          const progress =
            fitpoints && fps ? Math.round((fitpoints / fps) * 100) : 0;
          return (
            <TouchableOpacity
              key={each.uid}
              onPress={() => onPlayerPress(each.uid)}
            >
              <View
                className="bg-[#17161D] rounded-lg overflow-hidden flex justify-center items-center p-4 m-2"
                style={{ width: (width - 80) / 2, aspectRatio: 0.75 }}
              >
                <View
                  className="w-16 aspect-square rounded-full"
                  style={{ backgroundColor: "#FF5970", padding: 1 }}
                >
                  <UserImage
                    image={each.authorImg}
                    name={each.authorName}
                    width="w-full"
                    height="h-full"
                    color="#2F2F2F"
                  />
                </View>
                <View className="py-4">
                  <Text
                    className="text-white text-center text-base"
                    style={{ fontFamily: "BaiJamjuree-Bold" }}
                  >
                    {fitpoints} FP
                  </Text>
                  <Text
                    numberOfLines={1}
                    className="text-white text-center text-base"
                    style={{ fontFamily: "BaiJamjuree-Regular" }}
                  >
                    {each.authorName}
                  </Text>
                </View>
                <ProgressBar
                  height={2}
                  progress={progress}
                  borderWidth={0.5}
                  borderColor="#48485B"
                  activeColor="#FF556C"
                  inActiveColor="#26252F"
                  textColor="#FF556C"
                  showLable="above"
                  lableText={`${progress}%`}
                  hideArrow={true}
                />
              </View>
            </TouchableOpacity>
          );
        })}
        <TouchableOpacity onPress={handleInvite}>
          <View
            className="bg-[#17161D] rounded-lg overflow-hidden flex justify-center items-center p-4 m-2"
            style={{
              width: isEven ? width - 64 : (width - 80) / 2,
              aspectRatio: isEven ? undefined : 0.75,
              flexDirection: isEven ? "row" : "column",
            }}
          >
            <View className="w-16 aspect-square flex justify-center items-center rounded-full bg-[#393939] border border-[#A6A6A6]">
              <View className="w-8 aspect-square">
                <SvgIcons iconType="add" />
              </View>
            </View>
            <View
              style={{
                flex: isEven ? undefined : 1,
                paddingVertical: 16,
                paddingLeft: isEven ? 16 : undefined,
              }}
            >
              <Text
                className="text-white text-center text-base"
                style={{ fontFamily: "BaiJamjuree-Regular" }}
              >
                Add A New Player
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleViewTeam}>
        <View
          className="flex flex-row justify-center items-center mx-4 mb-4 px-4 py-3 bg-zinc-700 rounded-lg"
          style={{
            shadowColor: "#000000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.5,
            shadowRadius: 7,
          }}
        >
          <View className="w-4 iphoneX:w-5 aspect-square mr-4">
            <SvgIcons iconType="team" />
          </View>
          <Text
            className="text-white text-center text-base"
            style={{ fontFamily: "BaiJamjuree-Bold" }}
          >
            View Team Profile
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default MultiplePlayers;
