import CloseBtn from "@components/Buttons/CloseBtn";
import Header from "@modules/Header";
import { getEndingIn } from "@modules/HomeScreen/BadgeScroll/utils";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { useGameContext } from "@providers/game/GameProvider";
import { TeamProvider } from "@providers/team/TeamProvider";
import { useNavigation } from "@react-navigation/native";
import { getTeamId } from "@utils/utills";
import { View, Text, TouchableOpacity } from "react-native";
import MyTeamMembers from "./MyTeamMembers";
import { getSprintIdToUse } from "./utils";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";

interface Props {
  teamId: string;
  sprintId?: string;
}

const ProgressState: React.FC<Props> = ({ teamId, sprintId }) => {
  const navigation = useNavigation();
  const { state } = useAuthContext();
  const { weekParams, params } = useGameContext();

  const participatingInGameWithTeam = useUserStore(
    ({ user }) => user?.participatingInGameWithTeam,
    shallow
  );

  const myTeamId = getTeamId(participatingInGameWithTeam, state?.gameId);

  const spId = getSprintIdToUse(sprintId, params?.currentSprint);

  const { timeStr } = getEndingIn(
    weekParams?.roundId,
    weekParams?.roundEndUnix,
    params?.currentRound ? [params.currentRound.id] : []
  );

  const onBack = () => navigation.goBack();

  return (
    <TeamProvider selectedTeamId={teamId}>
      <Header headerColor="#100F1A" tone="dark" />
      <View className="flex-1 flex bg-[#100F1A]">
        <View className="flex flex-row items-center justify-between px-4 py-2">
          <View className="rounded-full flex flex-row items-center justify-between">
            <Text
              className="text-[#F4F4F4] text-xs iphoneX:text-sm"
              style={{ fontFamily: "BaiJamjuree-SemiBold" }}
            >
              Ending in <Text className="text-[#FF586F]">{timeStr}</Text>
            </Text>
          </View>
          <TouchableOpacity
            className="bg-[#EDEDED26]/20 rounded-full p-2"
            onPress={onBack}
          >
            <CloseBtn onClose={onBack} />
          </TouchableOpacity>
        </View>

        {spId ? (
          <MyTeamMembers myTeam={myTeamId === teamId} sprintId={spId} />
        ) : null}
      </View>
    </TeamProvider>
  );
};

export default ProgressState;
