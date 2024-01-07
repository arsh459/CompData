import { View, Text, Image } from "react-native";
import ButtonWithIcon from "@modules/TeamInvite/ButtonWithIcon";
import { fitPointsBlack } from "@constants/imageKitURL";
import { useTeamContext } from "@providers/team/TeamProvider";
import { useNavigation } from "@react-navigation/native";
import HeaderProgress from "./HeaderProgress";
import MembersImageV2 from "@components/MembersImage/MembersImageV2";
import JoinButtonHolder from "./JoinButtonHolder";

interface Props {
  rank?: number;
  fitPoint?: number;
  headerHeight: number;
  selectedView: "Team Activites" | "Team Badges";
}
const TeamHeader: React.FC<Props> = ({
  fitPoint,
  rank,
  headerHeight,
  selectedView,
}) => {
  const { team } = useTeamContext();
  const navigation = useNavigation();

  return (
    <View className="relative flex justify-center items-center">
      <Image
        source={{
          uri: "https://ik.imagekit.io/socialboat/gradient_V74cdokmLu.png?ik-sdk-version=javascript-1.4.3&updatedAt=1662106886959",
        }}
        className="absolute left-0 right-0 top-0 bottom-0"
      />
      <View
        className="w-4/5 bg-black/50 mb-8 p-4 flex items-center rounded-2xl border border-white/50"
        style={{ marginTop: headerHeight }}
      >
        {team?.enrolledUserUIDs ? (
          <MembersImageV2
            members={team?.enrolledUserUIDs}
            numOfMembers={4}
            hidePlusOthers={true}
            ring={true}
            dark={true}
          />
        ) : null}
        <View className="flex flex-row py-4 items-center">
          <Text
            className="text-base iphoneX:text-lg text-white text-center pl-2"
            style={{ fontFamily: "BaiJamjuree-Medium" }}
          >
            #{rank}
          </Text>
          <Text
            className="text-base iphoneX:text-lg  text-white  pl-2"
            style={{ fontFamily: "BaiJamjuree-Medium" }}
          >
            {team?.name}
          </Text>
        </View>
        <View className="flex flex-row">
          <View className="min-w-[120px]">
            <ButtonWithIcon
              iconUrl={fitPointsBlack}
              title={`${fitPoint ? fitPoint : 0} FP`}
              textColor="text-[#040406]"
              textStyle="pl-2 text-[11px] iphoneX:text-[13px]"
              roundedStr="rounded-lg"
              bgColor="flex-1"
              iconStyle="w-[11px] aspect-square"
              onPress={() =>
                navigation.navigate("TeamFitPoint", {
                  teamId: team?.id ? team.id : "",
                })
              }
              layoutStyle={{
                padding: 8,
                justifyContent: "center",
                backgroundColor: "#FFFFFF",
              }}
            />
          </View>
          <View className="w-2" />
          {team && team.parentId ? (
            <View className="min-w-[120px]">
              <JoinButtonHolder
                teamId={team?.id}
                teamOwnerUID={team?.ownerUID}
                gameId={team.parentId}
              />
            </View>
          ) : null}
        </View>
      </View>
      <HeaderProgress showDetailBtn={selectedView === "Team Activites"} />
    </View>
  );
};

export default TeamHeader;
