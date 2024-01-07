import { View, Text, Image, TouchableOpacity } from "react-native";
import {
  baseImageKit,
  fPointsWhite,
  personReachingLeg,
} from "@constants/imageKitURL";
import { CoachRank, UserRank } from "@models/Activity/Activity";
import clsx from "clsx";
import UserImage from "@components/UserImage";
import {
  getCurrentPlayerPts,
  getCurrentTeamPts,
  // getPlayerPts,
} from "@modules/HomeScreen/NewHome/utils";
import { getDateStrings } from "@utils/leaderboard/utils";
import ArrowV2 from "@modules/Community/Leaderboard/V2/ArrowV2";
// import { useGameContext } from "@providers/game/GameProvider";

interface Props {
  coachRank?: CoachRank;
  userRank?: UserRank;
  onPress?: () => void;
  isContribution?: boolean;
  currentSprintId?: string;
  showTeamRank?: boolean;
  rankIndex?: number;
}

const DetailCard: React.FC<Props> = ({
  coachRank,
  userRank,
  onPress,
  isContribution,
  currentSprintId,
  showTeamRank,
  rankIndex,
}) => {
  // const { params } = useGameContext();

  // const currentSprintId = params?.currentSprint?.id;
  const { yesterday, dayBefore } = getDateStrings();
  const coachData = getCurrentTeamPts(coachRank, currentSprintId);
  const userData = getCurrentPlayerPts(userRank, currentSprintId);

  return (
    <TouchableOpacity
      disabled={onPress ? false : true}
      onPress={onPress}
      className={clsx(
        "flex flex-row justify-between items-center rounded-xl pr-4 py-3",
        !isContribution
          ? coachRank
            ? "bg-white/25 pl-4 my-2"
            : "bg-white/10 pl-3 my-2"
          : "pl-4"
      )}
    >
      {userRank && showTeamRank && typeof rankIndex === "number" ? (
        <View className="flex items-center mr-3">
          <ArrowV2
            isTop={true}
            each={userRank}
            yesterday={yesterday}
            dayBefore={dayBefore}
          />
          <Text
            className="text-white font-medium text-sm"
            style={{ fontFamily: "BaiJamjuree-Bold" }}
          >
            {rankIndex + 1}
          </Text>
          <ArrowV2
            isTop={false}
            each={userRank}
            yesterday={yesterday}
            dayBefore={dayBefore}
          />
        </View>
      ) : null}
      {userRank ? (
        <View
          className={clsx(
            " aspect-square bg-[#FF5970] p-px rounded-full mr-4",
            showTeamRank ? "w-6" : "w-12"
          )}
        >
          <UserImage
            image={userRank?.authorImg}
            name={userRank?.authorName}
            width="w-full"
            height="h-full"
          />
        </View>
      ) : (
        <View className="h-8" />
      )}
      <Text
        className="flex-1 text-base text-white"
        numberOfLines={1}
        style={{ fontFamily: "BaiJamjuree-SemiBold" }}
      >
        {`${coachRank ? coachRank?.rank + "    " : ""}${
          coachRank?.teamName
            ? coachRank?.teamName
            : coachRank?.authorName
            ? `${coachRank?.authorName}'s team`
            : userRank?.authorName
            ? userRank?.authorName
            : ""
        }`}
      </Text>
      <View className="flex flex-row items-center px-4">
        <Image
          source={{ uri: `${baseImageKit}/${fPointsWhite}` }}
          className="w-4 aspect-square mr-2"
          resizeMode="contain"
        />
        <Text
          className="text-white text-base"
          style={{ fontFamily: "BaiJamjuree-SemiBold" }}
        >
          {coachRank ? coachData.fps : userData.fps}
        </Text>
      </View>
      <View className="flex flex-row items-center">
        <Image
          source={{ uri: personReachingLeg }}
          className="w-5 aspect-square mr-2"
          resizeMode="contain"
        />
        <Text
          className="text-white text-base"
          style={{ fontFamily: "BaiJamjuree-SemiBold" }}
        >
          {coachRank ? coachData.nbWorkouts : userData.nbWorkouts}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default DetailCard;
