import { View, Text, Image } from "react-native";

import clsx from "clsx";
// import ArrowV2 from "@modules/Community/Leaderboard/V2/ArrowV2";
// import { getDateStrings } from "@utils/leaderboard/utils";
import {
  groupIconWhite,
  inviteMsgIconWhite,
  // plusSignWhite,
} from "@constants/imageKitURL";
import ButtonWithIcon from "./ButtonWithIcon";
// import { useDNContext } from "@providers/dnLinks/DNProvider";
// import { useNavigation } from "@react-navigation/native";
import { useSelectedTeam } from "@providers/team/hooks/useSelectedTeam";
import { useCoachRank } from "@hooks/rank/useCoachRank";
import { useTeamRanks } from "@providers/teamProgress/hooks/useTeamRanks";
import { getPointsToShow, getRank } from "@utils/rank/utils";
import { useSelectedGame } from "@providers/game/hooks/useSelectedGame";
import { getDateStrings } from "@utils/leaderboard/utils";
import ArrowV2 from "@modules/Community/Leaderboard/V2/ArrowV2";
import JoinButtonHolder from "@modules/TeamMain/JoinButtonHolder";
// import { CoachRank } from "@models/Activity/Activity";
// import ArrowV2 from "@modules/Community/Leaderboard/V2/ArrowV2";
// import { useTeamContext } from "@providers/team/TeamProvider";
// import { useNavigation } from "@react-navigation/native";
interface Props {
  inviteTeamId: string;
  gameId: string;
}
const TeamInviteCard: React.FC<Props> = ({ inviteTeamId, gameId }) => {
  // const { inviteTeamId } = useDNContext();

  // const navigation = useNavigation();
  const { yesterday, dayBefore } = getDateStrings();

  // const onJoinTeam = () =>

  const { team } = useSelectedTeam(inviteTeamId);
  const { gameParams } = useSelectedGame(gameId);
  const { myCoachRank } = useCoachRank(gameId, team?.ownerUID);
  const { rankMembers } = useTeamRanks(gameId, team?.ownerUID);
  const rank = getRank(myCoachRank, "overall", gameParams?.currentSprint?.id);
  const pts =
    myCoachRank &&
    getPointsToShow(myCoachRank, "overall", gameParams?.currentSprint?.id);

  return (
    <View className="rounded-lg   bg-[#3D3B4A] m-1">
      <ButtonWithIcon
        iconUrl={inviteMsgIconWhite}
        title="Your Invitation link"
        textColor="text-[#fff] "
        textStyle="pl-2 text-sm iphoneX:text-base"
        roundedStr="rounded-lg p-2"
        iconStyle="w-[18px] aspect-square "
        fontFamily="BaiJamjuree-SemiBold"
        layoutStyle={{ backgroundColor: "#FF556C" }}
      />

      <View
        className={clsx("flex flex-row items-center   p-4 border-b-[#14131E]")}
        style={{ borderColor: "#5A5A5A", borderBottomWidth: 1 }}
      >
        <View className="flex   items-center">
          {myCoachRank ? (
            <ArrowV2
              isTop={true}
              each={myCoachRank}
              yesterday={yesterday}
              dayBefore={dayBefore}
            />
          ) : null}
          <Text
            className="text-white text-sm iphoneX:text-base"
            style={{ fontFamily: "BaiJamjuree-Bold" }}
          >
            {rank}
          </Text>
          {myCoachRank ? (
            <ArrowV2
              isTop={false}
              each={myCoachRank}
              yesterday={yesterday}
              dayBefore={dayBefore}
            />
          ) : null}
        </View>

        <View className="px-3 flex-1 ">
          <View className="flex flex-row items-center">
            <Text
              style={{ fontFamily: "BaiJamjuree-SemiBold" }}
              numberOfLines={1}
              className="text-white font-medium text-base"
            >
              {team?.name
                ? team.name
                : myCoachRank?.authorName
                ? `${myCoachRank?.authorName}'s team`
                : `Game team`}
            </Text>
          </View>
          <Text
            style={{ fontFamily: "BaiJamjuree-SemiBold" }}
            numberOfLines={1}
            className="text-[10px] iphoneX:text-xs text-[#D1D5FFA6]"
          >
            Leader : {myCoachRank?.authorName}
          </Text>
        </View>
        <View className="flex flex-row">
          {/* <UserImage image={img} name={name} /> */}
          <View className=" pl-1 flex flex-row justify-between items-center">
            <Text
              style={{ fontFamily: "BaiJamjuree-SemiBold" }}
              className="text-white text-center text-xl iphoneX:text-2xl pr-4"
            >
              {myCoachRank ? pts : 0} FP
            </Text>
          </View>
        </View>
      </View>
      <View className="bg-[#3D3B4A] py-2  pl-4 pr-2 flex flex-row rounded-b-lg justify-between flex-1 ">
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
            {rankMembers.length === 1
              ? `1 member`
              : rankMembers.length > 1
              ? `${rankMembers.length} members`
              : `${rankMembers.length - 1} member`}
          </Text>
        </View>
        <View className=" flex-1 flex-shrink-0 ">
          {team && gameId ? (
            <JoinButtonHolder
              byInvite={true}
              teamId={team?.id}
              teamSize={team.enrolledUserUIDs?.length}
              teamOwnerUID={team?.ownerUID}
              gameId={gameId}
            />
          ) : null}
          {/* <ButtonWithIcon
            iconUrl={plusSignWhite}
            title="Join This Team"
            textColor="text-[#fff]"
            textStyle="pl-2 text-[11px] iphoneX:text-[13px]"
            roundedStr="rounded-[5px] "
            bgColor=" flex-1"
            iconStyle="w-[12px] aspect-square"
            fontFamily="BaiJamjuree-SemiBold"
            onPress={onJoinTeam}
            layoutStyle={{
              paddingTop: 8,
              paddingBottom: 8,
              justifyContent: "center",
              backgroundColor: "#2AA9FF",
            }}
          /> */}
        </View>
      </View>
    </View>
  );
};

export default TeamInviteCard;
