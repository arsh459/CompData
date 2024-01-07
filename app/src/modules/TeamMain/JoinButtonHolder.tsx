import ButtonWithIcon from "@modules/TeamInvite/ButtonWithIcon";
import { doubleTickWhite, timerIcon } from "@constants/imageKitURL";
import { getTeamId } from "@utils/utills";
import { useTeamJoinRequest } from "@hooks/joinRequests/useTeamJoinRequest";
import { askToJoinTeam } from "./utils";
import { useNavigation } from "@react-navigation/native";
import JoinTeamWarning from "./JoinTeamWarning";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";

interface Props {
  teamId: string;
  teamOwnerUID: string;
  gameId: string;
  byInvite?: boolean;
  teamSize?: number;
}
const JoinButtonHolder: React.FC<Props> = ({
  teamId,
  gameId,
  teamOwnerUID,
  byInvite,
  teamSize,
}) => {
  const { uid, participatingInGameWithTeam } = useUserStore(({ user }) => {
    return {
      uid: user?.uid,
      participatingInGameWithTeam: user?.participatingInGameWithTeam,
    };
  }, shallow);

  const userTeam = getTeamId(participatingInGameWithTeam, gameId);

  const canNotJoin = userTeam === teamId;

  const { myRequests } = useTeamJoinRequest(gameId, uid, teamId);
  const navigation = useNavigation();

  const joinEventFunc = (eventName: string) => {
    weEventTrack(eventName, {
      teamId: teamId,
      userId: uid || "no_userId",
      gameId,
    });
  };

  const joinRequest = async () => {
    if (byInvite) {
      navigation.navigate("JoinBoat", {
        section: "welcome",
        teamId: teamId,
      });
    } else if (teamId && uid) {
      await askToJoinTeam(teamId, teamOwnerUID, uid, gameId);
      joinEventFunc("TeamScreen_clickAskToJoinTeam");
    }
  };

  const goHome = () => {
    if (byInvite) {
      navigation.navigate("Home");
    }
  };

  return (
    <>
      {canNotJoin ? (
        <ButtonWithIcon
          iconUrl={doubleTickWhite}
          onPress={goHome}
          title="My Team"
          textColor="text-[#fff]"
          textStyle="pl-2 text-[11px] iphoneX:text-[13px]"
          roundedStr="rounded-lg "
          bgColor="flex-1"
          iconStyle="w-[11px] aspect-square"
          layoutStyle={{
            padding: 8,
            justifyContent: "center",
            backgroundColor: "#2AA9FF80",
          }}
        />
      ) : userTeam && byInvite ? (
        <ButtonWithIcon
          iconUrl={doubleTickWhite}
          onPress={goHome}
          title={userTeam === teamId ? "Go to team" : "Already have a team"}
          textColor="text-[#fff]"
          textStyle="pl-2 text-[11px] iphoneX:text-[13px]"
          roundedStr="rounded-lg "
          bgColor="flex-1"
          iconStyle="w-[11px] aspect-square"
          layoutStyle={{
            padding: 8,
            justifyContent: "center",
            backgroundColor: "#2AA9FF80",
          }}
        />
      ) : myRequests.length ? (
        <ButtonWithIcon
          iconUrl={timerIcon}
          title="Request Sent"
          textColor="text-[#fff]"
          textStyle="pl-2 text-[11px] iphoneX:text-[13px]"
          roundedStr="rounded-lg "
          bgColor="flex-1"
          iconStyle="w-[11px] aspect-square"
          layoutStyle={{
            padding: 8,
            justifyContent: "center",
            backgroundColor: "#2AA9FF80",
          }}
          disabled={true}
        />
      ) : (
        <JoinTeamWarning
          joinRequest={joinRequest}
          joinEventFunc={joinEventFunc}
        />
      )}
    </>
  );
};

export default JoinButtonHolder;
