// import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import TaskCard from "./TaskCard";
import { Task } from "@models/Tasks/Task";
// import Loading from "@components/loading/Loading";
import { EventInterface } from "@models/Event/Event";
import { useLeaderboard } from "@hooks/user/useLeaderboard";
// import { useParentEvent } from "@hooks/community/v2/useParentEvent";
import { getGameNameReadable } from "@templates/TaskTemplate/utils";

interface Props {
  task: Task;
  //   suggestedTasksParentEvent?: EventInterface;
  //   loading: boolean;
  gameTeams: { [gameId: string]: EventInterface };
}

const SuggestedTaskCard: React.FC<Props> = ({
  task,
  //   suggestedTasksParentEvent,
  //   loading,
  gameTeams,
}) => {
  // const { parentEvent } = useParentEvent(suggestedTasksParentEvent?.parentId);
  const gameId = task?.games?.length ? task.games[0] : "";

  const team = gameTeams[gameId];

  const { leader } = useLeaderboard(team?.ownerUID);

  return (
    <TaskCard
      task={task}
      challengeName={getGameNameReadable(
        gameId
        // suggestedTasksParentEvent?.parentId
      )}
      userKey={encodeURI(leader?.userKey ? leader.userKey : "")}
      eventKey={encodeURI(team?.eventKey ? team.eventKey : "")}
    />
  );
};

export default SuggestedTaskCard;
