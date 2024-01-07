import { View, Text, Image, TouchableOpacity } from "react-native";
import { browseTeamIcon, redPlaneIcon } from "@constants/imageKitURL";
import { useTeamProgressContext } from "@providers/teamProgress/TeamProgressProvider";
import { useGameContext } from "@providers/game/GameProvider";
import { UserRank } from "@models/Activity/Activity";
import { getPlayerProgress } from "../utils";
import UserImage from "@components/UserImage";
import clsx from "clsx";
import ProgressSection from "../ProgressSection";
import { useNavigation } from "@react-navigation/native";

interface Props {
  handleInvite: () => void;
}

const TwoOrLessPlayers: React.FC<Props> = ({ handleInvite }) => {
  const { params } = useGameContext();
  const currentSprintId = params?.currentSprint?.id;
  const { userRanks } = useTeamProgressContext();

  const { p1Pts, p2Pts, playerOneProgress } = getPlayerProgress(
    userRanks[0],
    userRanks[1],
    currentSprintId
  );

  const navigation = useNavigation();
  const onPlayerPress = (uid?: string) => {
    uid ? navigation.navigate("User", { userId: uid }) : null;
  };

  const playerOne = userRanks[0] as UserRank | undefined;
  const playerTwo = userRanks[1] as UserRank | undefined;

  const onTeamPress = () => {
    playerOne?.coachEventId
      ? navigation.navigate("TeamScreen", { teamId: playerOne.coachEventId })
      : null;
  };

  return (
    <View className="bg-[#FFFFFF17] rounded-xl">
      <TouchableOpacity onPress={onTeamPress}>
        {playerOne?.teamName ? (
          <Text
            style={{ fontFamily: "BaiJamjuree-Bold" }}
            className="underline py-3 px-4 text-xl font-semibold leading-tight text-white"
          >
            {playerOne.teamName}
          </Text>
        ) : (
          <Text
            style={{ fontFamily: "BaiJamjuree-Bold" }}
            className=" py-2 px-4 text-xl font-semibold leading-tight text-white"
          >
            Team Contribution
          </Text>
        )}
      </TouchableOpacity>
      <View className="bg-[#100F1A] h-0.5 " />
      <View
        className={clsx(
          "flex flex-row justify-between rounded-xl px-4 py-4",
          playerTwo ? "" : "pb-0"
        )}
      >
        <TouchableOpacity onPress={() => onPlayerPress(playerOne?.uid)}>
          <View className="">
            <UserImage
              image={playerOne?.authorImg}
              name={playerOne?.authorName}
              width="w-12"
              height="h-12"
            />
          </View>
        </TouchableOpacity>
        <View className=" flex flex-col flex-1 justify-between">
          <TouchableOpacity onPress={() => onPlayerPress(playerOne?.uid)}>
            <View className="">
              <Text
                style={{ fontFamily: "BaiJamjuree-Bold" }}
                className="text-white text-base font-semibold px-2"
              >
                {playerOne?.authorName}
              </Text>
              <View />
            </View>
          </TouchableOpacity>
          <View className="px-2 py-1">
            <ProgressSection
              playerOneProg={playerOneProgress}
              notStarted={p1Pts === p2Pts && p1Pts === 0}
              split={playerTwo ? true : false}
              p1Color="#0085E0"
              p2Color="#FF5970"
            />
          </View>

          <View className=" flex items-end">
            <TouchableOpacity onPress={() => onPlayerPress(playerTwo?.uid)}>
              <Text
                style={{ fontFamily: "BaiJamjuree-Bold" }}
                className="text-white text-base font-semibold px-2"
              >
                {playerTwo?.authorName}
              </Text>
              <View />
            </TouchableOpacity>
          </View>
        </View>
        <View className="">
          <View className="pt-8">
            {playerTwo ? (
              <TouchableOpacity onPress={() => onPlayerPress(playerTwo?.uid)}>
                <UserImage
                  image={playerTwo?.authorImg}
                  name={playerTwo?.authorName}
                  width="w-12"
                  height="h-12"
                />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </View>

      <View className="">
        {p1Pts === p2Pts && p1Pts === 0 ? (
          <View className="pb-2">
            <Text
              style={{ fontFamily: "BaiJamjuree-Bold" }}
              className="text-white text-lg text-center"
            >
              Start Workout to Fill the bar
            </Text>
          </View>
        ) : null}
      </View>
      <View className="bg-[#100F1A] h-0.5 " />

      {true ? (
        <View className="flex flex-row justify-evenly px-4 ">
          <TouchableOpacity
            onPress={() => navigation.navigate("TeamBrowseScreen")}
          >
            <View className="py-3 flex flex-row items-center">
              <Image
                source={{ uri: browseTeamIcon }}
                className="w-4 aspect-square "
              />
              <Text
                style={{ fontFamily: "BaiJamjuree-Bold" }}
                className="  pl-2 text-base font-semibold leading-tight  text-[#5BFFE8]"
              >
                Browse Teams
              </Text>
            </View>
          </TouchableOpacity>

          {/* <View className="py-3">
            <Text
              style={{ fontFamily: "BaiJamjuree-Bold" }}
              className="  pl-2 text-xs iphoneX:text-base font-semibold leading-tight  text-[#FF5B72]"
            >
              Browse Teams
            </Text>
          </View> */}
          <View className="bg-[#100F1A]  w-0.5 mx-4" />

          <TouchableOpacity
            onPress={handleInvite}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 12,
            }}
          >
            <Image source={{ uri: redPlaneIcon }} className="h-4 w-4" />
            <Text
              style={{ fontFamily: "BaiJamjuree-Bold" }}
              className="text-center  pl-2 text-base font-semibold leading-tight  text-[#FF5B72]"
            >
              Send Invite
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

export default TwoOrLessPlayers;
