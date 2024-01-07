import {
  baseImageKit,
  fPointsWhite,
  personReachingLeg,
} from "@constants/imageKitURL";
import { CoachRank } from "@models/Activity/Activity";
import { getCurrentTeamPts } from "@modules/HomeScreen/NewHome/utils";
import { getDateStrings } from "@utils/leaderboard/utils";
import clsx from "clsx";
import { View, Text, Image } from "react-native";
import { getBorderColor } from "../../utils";
import ArrowV2 from "../../V2/ArrowV2";

interface Props {
  each: CoachRank;
  rank: number;
  isMe?: boolean;
  currentSprint?: string;
}

const Teams: React.FC<Props> = ({ each, isMe, rank, currentSprint }) => {
  const { yesterday, dayBefore } = getDateStrings();
  const coachData = getCurrentTeamPts(each, currentSprint);

  return (
    <View
      className={clsx(
        "flex flex-row items-center p-4 my-1 ",
        isMe ? "bg-[#64435DDB]" : "border rounded-xl bg-[#292832] mx-4"
      )}
      style={{ borderColor: getBorderColor(rank) }}
    >
      <View className="flex   items-center">
        <ArrowV2
          isTop={true}
          each={each}
          yesterday={yesterday}
          dayBefore={dayBefore}
        />
        <Text
          style={{ fontFamily: "BaiJamjuree-Bold" }}
          className="text-white font-medium text-lg"
        >
          {rank}
        </Text>
        <ArrowV2
          isTop={false}
          each={each}
          yesterday={yesterday}
          dayBefore={dayBefore}
        />
      </View>
      <View className="px-3  flex-1 flex flex-row">
        <Text
          style={{ fontFamily: "BaiJamjuree-Medium" }}
          numberOfLines={1}
          className="text-white text-base"
        >
          {each.teamName ? each.teamName : each.authorName}
        </Text>
      </View>
      <View className="flex flex-row items-center">
        <Image
          source={{ uri: personReachingLeg }}
          className="w-5 aspect-square mr-1"
          resizeMode="contain"
        />
        <Text
          className="text-white text-base"
          style={{ fontFamily: "BaiJamjuree-SemiBold" }}
        >
          {coachData.nbWorkouts}
        </Text>
      </View>
      <View className="w-4 iphoneX:w-6" />
      <View className="flex flex-row items-center">
        <Image
          source={{ uri: `${baseImageKit}/${fPointsWhite}` }}
          className="w-4 aspect-square mr-1"
          resizeMode="contain"
        />
        <Text
          style={{ fontFamily: "BaiJamjuree-SemiBold" }}
          className="text-white text-base"
        >
          {coachData.fps} FP
        </Text>
      </View>
    </View>
  );
};

export default Teams;
