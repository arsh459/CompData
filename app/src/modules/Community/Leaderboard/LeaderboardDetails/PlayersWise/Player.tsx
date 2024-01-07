import UserProfile from "@components/UserProfile";
import {
  baseImageKit,
  fPointsWhite,
  personReachingLeg,
} from "@constants/imageKitURL";
import { useUserV2 } from "@hooks/auth/useUserV2";
import { UserRank } from "@models/Activity/Activity";
import { getCurrentPlayerPts } from "@modules/HomeScreen/NewHome/utils";
import { getDateStrings } from "@utils/leaderboard/utils";
import clsx from "clsx";
import { View, Text, Image } from "react-native";
import { getBorderColor } from "../../utils";
import ArrowV2 from "../../V2/ArrowV2";

interface Props {
  each: UserRank;
  rank: number;
  isMe?: boolean;
  currentSprint?: string;
}

const Player: React.FC<Props> = ({ each, isMe, rank, currentSprint }) => {
  const userData = getCurrentPlayerPts(each, currentSprint);
  const { yesterday, dayBefore } = getDateStrings();
  const { user } = useUserV2(each.uid);

  return (
    <View
      className={clsx(
        "flex flex-row items-center p-4 my-1",
        isMe ? "bg-[#413E5EDB]" : "border rounded-xl bg-[#292832] mx-4"
      )}
      style={{ borderColor: getBorderColor(rank) }}
    >
      <View className="flex items-center mr-3">
        <ArrowV2
          isTop={true}
          each={each}
          yesterday={yesterday}
          dayBefore={dayBefore}
        />
        <Text
          className="text-white font-medium text-sm"
          style={{ fontFamily: "BaiJamjuree-Bold" }}
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

      <UserProfile user={user} size={40} />
      <View className="px-3 flex-1 ">
        <View className="flex flex-row items-center">
          <Text
            style={{ fontFamily: "BaiJamjuree-Medium" }}
            numberOfLines={1}
            className="text-white font-medium text-base"
          >
            {each.authorName}
          </Text>
        </View>
        <Text
          style={{ fontFamily: "BaiJamjuree-Regular" }}
          numberOfLines={1}
          className="text-xs text-white"
        >
          @{each.teamName}
        </Text>
      </View>
      <View className="flex flex-row">
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
            {userData.nbWorkouts}
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
            {userData.fps} FP
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Player;