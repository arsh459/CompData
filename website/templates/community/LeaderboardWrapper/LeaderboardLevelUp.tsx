import { viewTypes } from "@hooks/community/v2/useCommunityParamsV3";
import LevelUp from "./LevelUp";
import LevelUpModal from "./LevelUpModal";
import { UserRank } from "@models/Activities/Activity";
// import axios from "axios";
// import { Task } from "@models/Tasks/Task";
import { useState } from "react";
import { useSuggestedTasks } from "@hooks/community/useSuggestedTasks";
import { weEventTrack } from "@analytics/webengage/user/userLog";

interface Props {
  viewType?: viewTypes;
  myUserRank?: UserRank;
  signedInUserId?: string;
  baseShareURL: string;
  gameId: string;
  activeRank?: number | string;
  activeTeamRank?: number | string;
  comptitionRank?: number | string;
  myPoints?: number;
  teamPts?: number;
  competitionPts?: number;
  // level: number;
}

const LeaderboardLevelUp: React.FC<Props> = ({
  viewType,
  myUserRank,
  signedInUserId,
  baseShareURL,
  gameId,
  activeRank,
  activeTeamRank,
  competitionPts,
  comptitionRank,
  teamPts,
  myPoints,
  // level,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { loading, suggestedTasks } = useSuggestedTasks(
    isOpen,
    gameId,
    signedInUserId,
    myUserRank?.userLevelV2
  );

  return (
    <>
      <LevelUp
        viewType={viewType}
        openModal={() => {
          setIsOpen(true);
          weEventTrack("gameLeaderboard_howToWinIClick", {});
        }}
        activeRank={activeRank}
        activeTeamRank={activeTeamRank}
        teamPts={teamPts}
        competitionPts={competitionPts}
        comptitionRank={comptitionRank}
        myPoints={myPoints}
      />

      <LevelUpModal
        viewType={viewType}
        isOpen={isOpen}
        loading={loading}
        onCloseModal={() => setIsOpen(false)}
        myUserRank={myUserRank}
        suggestedTasks={suggestedTasks}
        baseShareURL={baseShareURL}
        activeRank={activeRank}
        activeTeamRank={activeTeamRank}
        teamPts={teamPts}
        competitionPts={competitionPts}
        comptitionRank={comptitionRank}
        myPoints={myPoints}
      />
    </>
  );
};

export default LeaderboardLevelUp;
