import { useTeamProgressContext } from "@providers/teamProgress/TeamProgressProvider";
import TwoOrLessPlayers from "./TwoOrLessPlayers";
import MultiplePlayers from "./MultiplePlayers";
import { shareNatively } from "@components/ShareWrapper";
import { createTeamInviteLinkV2 } from "@utils/dynamicLinks/inviteLink";
import { useUserContext } from "@providers/user/UserProvider";
import { useRoute } from "@react-navigation/native";
// import { useGameContext } from "@providers/game/GameProvider";

const TeamContribution = () => {
  const route = useRoute();
  const { user } = useUserContext();
  // const { game } = useGameContext();
  const { userRanks } = useTeamProgressContext();

  const handleInvite = async () => {
    if (user?.uid) {
      const remoteSHareURL = await createTeamInviteLinkV2(
        user?.uid,
        user?.userKey ? user?.userKey : ""
      );
      shareNatively(remoteSHareURL, route.name);
    }
  };

  return userRanks.length ? (
    <>
      {userRanks.length <= 2 ? (
        <TwoOrLessPlayers handleInvite={handleInvite} />
      ) : (
        <MultiplePlayers handleInvite={handleInvite} />
      )}
    </>
  ) : null;
};

export default TeamContribution;
