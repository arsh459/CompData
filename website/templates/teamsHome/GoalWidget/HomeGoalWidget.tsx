import { useCoachRank } from "@hooks/activities/useCoachRank";
import { useUserRank } from "@hooks/activities/userUserRank";

import {
  getCurrentMonthV3,
  getCurrentWeekV3,
} from "@hooks/community/challengeWeekUtils/utils";
import { useLeaderboard } from "@hooks/user/useLeaderboard";
import { EventInterface } from "@models/Event/Event";
import { UserInterface } from "@models/User/User";
import GoalProgramContainer from "@modules/WorkoutsV3/GoalProgramContainer/GoalProgramContainer";
import GoalWidgetWorkout from "@modules/WorkoutsV3/GoalProgramContainer/GoalWidgetWorkout";
import { useState } from "react";

interface Props {
  user: UserInterface;
  gameTeams: { [gameId: string]: EventInterface };
  allGames: EventInterface[];
  gamesObj: { [gameId: string]: EventInterface };
  userEvents: EventInterface[];
}

export const HomeGoalWidget: React.FC<Props> = ({
  gamesObj,
  user,
  userEvents,
}) => {
  // console.log("u", userEvents);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const onLeft = () => setSelectedIndex((p) => (p ? p - 1 : 0));
  const onRight = () =>
    setSelectedIndex((p) =>
      p === userEvents.length - 1 ? userEvents.length - 1 : p + 1
    );

  const selectedEvent = userEvents.length
    ? userEvents[selectedIndex]
    : undefined;
  //   console.log("selectedEvent", selectedEvent, selectedIndex, userEvents);
  const game = selectedEvent?.parentId
    ? gamesObj[selectedEvent.parentId]
    : undefined;

  const { sprintId, lastSprintId } = getCurrentMonthV3(
    game?.configuration?.sprints,
    game?.configuration?.starts,
    game?.configuration?.challengeLength,
    game?.configuration?.rounds
  );

  const { roundId } = getCurrentWeekV3(
    game?.configuration?.rounds,
    game?.configuration?.starts,
    game?.configuration?.challengeLength
  );

  const { myUserRank } = useUserRank(game?.id, user.uid);
  const { myCoachRank } = useCoachRank(
    game?.id,
    game?.configuration?.gameType === "team"
      ? selectedEvent?.ownerUID
      : undefined
  );
  const { leader } = useLeaderboard(selectedEvent?.ownerUID);

  // console.log("s", sprintId);

  return (
    <div className="w-full">
      {userEvents.length ? (
        <div>
          <GoalProgramContainer
            onLeft={onLeft}
            heading={game?.name}
            onRight={onRight}
            index={selectedIndex}
            total={userEvents.length}
          >
            {selectedEvent?.id &&
            game?.id &&
            selectedEvent.eventKey &&
            leader?.userKey ? (
              <GoalWidgetWorkout
                uid={user.uid}
                teamId={selectedEvent?.id}
                // gameTasks={game?.configuration?.goals}
                kpis={game.configuration?.kpis ? game.configuration.kpis : []}
                gameId={game?.id}
                sprintId={sprintId}
                lastSprintId={lastSprintId}
                roundId={roundId}
                myUserRank={myUserRank}
                coachUID={selectedEvent?.ownerUID}
                eventKey={selectedEvent?.eventKey}
                user={user}
                gameType={game.configuration?.gameType}
                myCoachRank={myCoachRank}
                leaderKey={leader?.userKey}
                navItems={["goal", "prizes", "team"]}
                bottomButtons={true}
                leftLink={`/${leader?.userKey}/${
                  selectedEvent?.eventKey
                }?nav=leaderboard&period=week&view=${
                  game.configuration?.gameType === "team" ? "teams" : "players"
                }`}
                rightLink={`/${leader?.userKey}/${selectedEvent?.eventKey}/workout`}
              />
            ) : (
              <div />
            )}
          </GoalProgramContainer>
        </div>
      ) : null}
    </div>
  );
};

export default HomeGoalWidget;
