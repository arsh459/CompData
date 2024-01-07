import UseModal from "@components/UseModal";
import { CoachRank, UserRank } from "@models/Activity/Activity";
import { SprintObject } from "@models/Event/Event";
import { useGameContext } from "@providers/game/GameProvider";
import { TeamProvider } from "@providers/team/TeamProvider";
import { SafeAreaView } from "react-native";
import ChallangePointsDetails from "./ChallangePointsDetails";
import CoachDetails from "./CoachDetails";
import PlayerDetail from "./PlayerDetail";

interface Props {
  isOpen: boolean;
  onCloseModal: () => void;
  rankObj: UserRank | CoachRank;
  gameStarts?: number;
  blurAmount?: number;
  sprints?: SprintObject[];
}

const DetailsModal: React.FC<Props> = ({
  isOpen,
  onCloseModal,
  rankObj,
  gameStarts,
  sprints,
  blurAmount,
}) => {
  const { params } = useGameContext();
  const leaderboardMonth = params?.currentSprint?.id;

  return (
    <UseModal
      visible={isOpen}
      onClose={onCloseModal}
      width="w-full"
      height="h-full"
      blurAmount={blurAmount}
      fallbackColor="#100F1A"
      tone="dark"
    >
      <SafeAreaView className="flex-1 flex justify-center m-8">
        {"communityRank" in rankObj ? (
          <PlayerDetail userRank={rankObj} onCloseModal={onCloseModal} />
        ) : (
          <TeamProvider
            selectedTeamId={rankObj.coachEventId}
            initTeamMembers={3}
          >
            <CoachDetails coachRank={rankObj} onCloseModal={onCloseModal} />
          </TeamProvider>
        )}
        <ChallangePointsDetails
          name={rankObj.authorName}
          dayPointObj={rankObj.dayPointObj}
          leaderboardMonth={leaderboardMonth}
          sprints={sprints}
          gameStarts={gameStarts}
        />
      </SafeAreaView>
    </UseModal>
  );
};

export default DetailsModal;
