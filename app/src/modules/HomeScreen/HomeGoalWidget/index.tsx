import { EventInterface } from "@models/Event/Event";
import GoalProgramContainer from "@modules/Workout/ProgramHome/GoalProgramContainer";
import GoalWidgetWorkout from "@modules/Workout/ProgramHome/GoalWidget/GoalWidgetWorkout";
import { GameProvider } from "@providers/game/GameProvider";
import { TeamProvider } from "@providers/team/TeamProvider";
import { useState } from "react";
import { View } from "react-native";

interface Props {
  gamesObj: { [gameId: string]: EventInterface };
  userEvents: EventInterface[];
}

const HomeGoalWidget: React.FC<Props> = ({ gamesObj, userEvents }) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const onLeft = () => setSelectedIndex((p) => (p ? p - 1 : 0));
  const onRight = () =>
    setSelectedIndex((p) =>
      p === userEvents.length - 1 ? userEvents.length - 1 : p + 1
    );

  const selectedEvent = userEvents.length
    ? userEvents[selectedIndex]
    : undefined;

  const game = selectedEvent?.parentId
    ? gamesObj[selectedEvent.parentId]
    : undefined;

  return (
    <View className="flex-1">
      {userEvents.length ? (
        <GoalProgramContainer
          onLeft={onLeft}
          heading={game?.name}
          onRight={onRight}
          index={selectedIndex}
          total={userEvents.length}
        >
          <GameProvider selectedGameId={game ? game.id : ""}>
            <TeamProvider
              selectedTeamId={selectedEvent ? selectedEvent.id : ""}
              initTeamMembers={3}
            >
              <GoalWidgetWorkout
                navItems={["goal", "prizes", "team"]}
                bottomButtons={true}
              />
            </TeamProvider>
          </GameProvider>
        </GoalProgramContainer>
      ) : null}
    </View>
  );
};
export default HomeGoalWidget;
