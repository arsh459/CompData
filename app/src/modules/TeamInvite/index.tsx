import { View, Text } from "react-native";

import ButtonWithIcon from "./ButtonWithIcon";
import { soloPlayIconBlack } from "@constants/imageKitURL";
import TeamInviteCard from "./TeamInviteCard";
import { useNavigation } from "@react-navigation/native";
import { getTeamId } from "@utils/utills";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";

interface Props {
  inviteTeamId: string;
  gameId: string;
}

const TeamInvite: React.FC<Props> = ({ inviteTeamId, gameId }) => {
  const navigation = useNavigation();

  const { onboarded, participatingInGameWithTeam } = useUserStore(
    ({ user }) => {
      return {
        onboarded: user?.onboarded,
        participatingInGameWithTeam: user?.participatingInGameWithTeam,
      };
    },
    shallow
  );

  const onJoinSolo = () => {
    if (onboarded) {
      navigation.navigate("Home");
    } else {
      navigation.navigate("JoinBoat", { section: "welcome" });
    }
  };

  const userCurrentTeamId = getTeamId(participatingInGameWithTeam, gameId);

  return (
    <View className="px-4 bg-[#100F1A] flex-1 pt-20">
      {inviteTeamId ? (
        <>
          <View className="pt-12 pb-10">
            <TeamInviteCard inviteTeamId={inviteTeamId} gameId={gameId} />
          </View>
          {userCurrentTeamId ? null : (
            <Text
              className="text-white text-center text-xl pb-8"
              style={{ fontFamily: "BaiJamjuree-Bold" }}
            >
              Or
            </Text>
          )}
        </>
      ) : (
        <View className="pb-8" />
      )}
      {userCurrentTeamId ? null : (
        <ButtonWithIcon
          iconUrl={soloPlayIconBlack}
          onPress={onJoinSolo}
          title="Play Solo"
          textColor="text-black"
          textStyle="pl-2 text-xl iphoneX:text-[22px] "
          roundedStr="rounded-lg p-2"
          iconStyle="w-2 h-5"
          layoutStyle={{
            paddingLeft: 16,
            paddingRight: 16,
            justifyContent: "center",
            backgroundColor: "#FFFFFF",
          }}
        />
      )}
    </View>
  );
};

export default TeamInvite;
