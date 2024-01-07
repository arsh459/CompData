// import SelectWorkout from "@modules/WorkoutsV3/SelectWorkout";
import { UserInterface } from "@models/User/User";
// import { workoutTypes } from "@hooks/tasks/useWorkoutV3Params";
// import ComponentWrapper from "./ComponentWrapper";
// import CreateYourOwnTask from "./CreateYourOwnTask";
// import ConnectWearables from "./ConnectWearables";
// import WearableInfo from "./WearableInfo";
// import ConnectYourWearable from "./ConnectYourWearable";
// import WearableConnected from "./WearableConnected";
// import PreviewWorkout from "./PreviewWorkout";
// import TaskPreview from "./TaskPreview";
// import PostWorkout from "./PostWorkout";
// import { labelType } from "@models/Tasks/Task";
import { EventInterface } from "@models/Event/Event";
// import Header from "../Header";
import GameProgram from "../GameProgram/GameProgram";
// import GoalWidget from "./GoalWidget";
import GoalProgramContainer from "../GoalProgramContainer/GoalProgramContainer";
// import GoalWidgetHome from "./GoalProgramContainer/GoalWidgetHome";
import GoalWidgetWorkout from "../GoalProgramContainer/GoalWidgetWorkout";
import {
  getCurrentMonthV3,
  getCurrentWeekV3,
} from "@hooks/community/challengeWeekUtils/utils";
import { useUserRank } from "@hooks/activities/userUserRank";
import HeaderProgram from "./HeaderProgram";
// import mixpanel from "@config/mixpanel";

interface Props {
  user: UserInterface;
  //   activeTab: workoutTypes;
  //   taskId: string;
  onBack: () => void;
  onWorkoutClick: (id: string) => void;
  //   summaryType?: labelType;
  //   onSummaryClick: (summaryType: labelType) => void;
  //   onGoToTeam: () => void;
  //   onNavChange: (newNav: workoutTypes, replace?: boolean) => void;
  //   onNavReplace: (newNav: workoutTypes) => void;
  //   onTerraWorkout: () => void;
  //   gameId: string;
  leaderKey: string;
  coachUID: string;
  eventKey: string;
  teamId: string;
  //   eventId: string;
  game: EventInterface;
  //   postId?: string;
}

const ProgramHome: React.FC<Props> = ({
  user,
  onBack,
  leaderKey,
  eventKey,
  game,
  onWorkoutClick,

  coachUID,
  teamId,
}) => {
  const { rangeDate, sprintId, nowObj, defaultObj } = getCurrentMonthV3(
    game.configuration?.sprints,
    game.configuration?.starts,
    game.configuration?.challengeLength,
    game.configuration?.rounds
  );

  // console.log("sprintId", nowObj);

  const { roundEndUnix, roundStartUnix, isFinale, roundId } = getCurrentWeekV3(
    game?.configuration?.rounds,
    game?.configuration?.starts,
    game?.configuration?.challengeLength
  );

  const { myUserRank } = useUserRank(game.id, user.uid);
  const userRank =
    myUserRank?.monthlyRank && sprintId
      ? myUserRank?.monthlyRank[sprintId]
      : -1;
  return (
    <>
      <HeaderProgram onBack={onBack} heading={game.name} />
      {/* <div>
        <Header
          onBack={onBack}
          title="Workout"
          headingCenter={true}
          color="#335E7D"
          classStr="py-8"
        />
      </div> */}
      <div className="px-4">
        <GoalProgramContainer
          total={1}
          topRightText={`Lvl ${user.userLevelV2 ? user.userLevelV2 : 0}`}
        >
          <GoalWidgetWorkout
            uid={user.uid}
            teamId={teamId}
            // gameTasks={game.configuration?.goals}
            kpis={game.configuration?.kpis ? game.configuration.kpis : []}
            gameId={game.id}
            sprintId={sprintId}
            roundId={roundId}
            myUserRank={myUserRank}
            leaderKey={leaderKey}
            coachUID={coachUID}
            eventKey={eventKey}
            user={user}
            navItems={
              game.configuration?.topNav
                ? game.configuration.topNav
                : ["goal", "Track Goal", "team"]
            }
            bottomButtons={false}
            hidePlayNow={true}
            // roundStartUnix={roundStartUnix}
          />
        </GoalProgramContainer>
      </div>

      <GameProgram
        user={user}
        game={game}
        myUserRank={myUserRank}
        roundEndUnix={roundEndUnix}
        roundStartUnix={roundStartUnix}
        isFinale={isFinale}
        teamId={teamId}
        userRank={userRank}
        rangeDate={rangeDate}
        nowObj={nowObj}
        defaultObj={defaultObj}
        sprintId={sprintId}
        onTaskClick={onWorkoutClick}
      />
    </>
  );
};

export default ProgramHome;
