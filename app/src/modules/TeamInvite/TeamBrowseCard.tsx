import { View, Text, Image } from "react-native";

import clsx from "clsx";
import { getDateStrings } from "@utils/leaderboard/utils";
import { eyeIconWhite, groupIconWhite } from "@constants/imageKitURL";
import ButtonWithIcon from "./ButtonWithIcon";
import { CoachRank } from "@models/Activity/Activity";
import ArrowV2 from "@modules/Community/Leaderboard/V2/ArrowV2";
import { useTeamContext } from "@providers/team/TeamProvider";
import { useNavigation } from "@react-navigation/native";
import { useGameContext } from "@providers/game/GameProvider";
import { getPointsToShow, getRank } from "@utils/rank/utils";
interface Props {
  rankCoaches: CoachRank;
}
const TeamBrowseCard: React.FC<Props> = ({ rankCoaches }) => {
  const { yesterday, dayBefore } = getDateStrings();
  const { team } = useTeamContext();
  const { params } = useGameContext();
  const rank = getRank(rankCoaches, "overall", params?.currentSprint?.id);
  const pts = getPointsToShow(
    rankCoaches,
    "overall",
    params?.currentSprint?.id
  );

  const navigation = useNavigation();

  return (
    <View className="rounded-lg   bg-[#3D3B4A] mb-5">
      <View
        className={clsx("flex flex-row items-center  p-4 border-b-[#14131E]")}
        style={{ borderBottomWidth: 1 }}
      >
        <View className="flex   items-center">
          <ArrowV2
            isTop={true}
            each={rankCoaches}
            yesterday={yesterday}
            dayBefore={dayBefore}
          />
          <Text
            className="text-white text-sm iphoneX:text-base"
            style={{ fontFamily: "BaiJamjuree-Bold" }}
          >
            {/* {rankCoaches.rank} */}
            {rank}
          </Text>
          <ArrowV2
            isTop={false}
            each={rankCoaches}
            yesterday={yesterday}
            dayBefore={dayBefore}
          />
        </View>

        <View className="px-3 flex-1 ">
          <View className="flex flex-row items-center">
            <Text
              style={{ fontFamily: "BaiJamjuree-SemiBold" }}
              numberOfLines={1}
              className="text-white font-medium text-base"
            >
              {rankCoaches.teamName
                ? rankCoaches.teamName
                : rankCoaches.authorName}
            </Text>
          </View>
          <Text
            style={{ fontFamily: "BaiJamjuree-SemiBold" }}
            numberOfLines={1}
            className="text-[10px] iphoneX:text-xs text-[#D1D5FFA6]"
          >
            Leader : {rankCoaches.authorName}
          </Text>
        </View>
        <View className="flex flex-row">
          {/* <UserImage image={img} name={name} /> */}
          <View className=" pl-1 flex flex-row justify-between items-center">
            <Text
              style={{ fontFamily: "BaiJamjuree-SemiBold" }}
              className="text-white text-center text-xl iphoneX:text-2xl pr-4"
            >
              {pts} FP
            </Text>
          </View>
        </View>
      </View>
      <View className="bg-[#3D3B4A] py-2  pl-4 pr-2 flex flex-row rounded-b-lg justify-between flex-1 ">
        {team?.enrolledUserUIDs ? (
          <View className="flex flex-row items-center flex-1 ">
            <Image
              source={{
                uri: groupIconWhite,
              }}
              className="w-[14px] aspect-square "
              resizeMode="contain"
            />
            <Text
              className="text-[13px] iphoneX:text-[15px] text-white flex-1 pl-2"
              style={{ fontFamily: "BaiJamjuree-Medium" }}
            >
              {`${team.enrolledUserUIDs.length} ${
                team.enrolledUserUIDs.length === 1 ? "member" : "members"
              }`}
            </Text>
          </View>
        ) : null}
        <View className=" flex-1 flex-shrink-0 ">
          <ButtonWithIcon
            iconUrl={eyeIconWhite}
            title="View team Details"
            textColor="text-[#fff]"
            textStyle="pl-2 text-[11px] iphoneX:text-[13px]"
            roundedStr="rounded-[5px] "
            bgColor="flex-1"
            iconStyle="w-[12px] aspect-square"
            fontFamily="BaiJamjuree-SemiBold"
            onPress={() =>
              navigation.navigate("TeamScreen", {
                // teamId: rankCoaches.coachEventId,
                teamId: team?.id ? team.id : rankCoaches.coachEventId,
              })
            }
            layoutStyle={{
              paddingTop: 8,
              paddingBottom: 8,
              justifyContent: "center",
              backgroundColor: "#8D94E7",
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default TeamBrowseCard;
