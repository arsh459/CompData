import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
// import TaskCard from "./TaskCard";
import { Task } from "@models/Tasks/Task";
import Loading from "@components/loading/Loading";
import { EventInterface } from "@models/Event/Event";
// import { useLeaderboard } from "@hooks/user/useLeaderboard";
// import { useParentEvent } from "@hooks/community/v2/useParentEvent";
// import { getGameNameReadable } from "@templates/TaskTemplate/utils";
import SuggestedTaskCard from "./SuggestedTaskCard";

interface Props {
  suggestedTasks: Task[];
  // suggestedTasksParentEvent?: EventInterface;
  loading: boolean;
  gameTeams: { [gameId: string]: EventInterface };
}

const SuggestedTask: React.FC<Props> = ({
  suggestedTasks,
  // suggestedTasksParentEvent,
  loading,
  gameTeams,
}) => {
  // const { parentEvent } = useParentEvent(suggestedTasksParentEvent?.parentId);
  // const { leader } = useLeaderboard(suggestedTasksParentEvent?.ownerUID);

  // console.log("loading", loading);

  return (
    <>
      {suggestedTasks.length > 0 ? (
        <h3 className="px-4  text-xl iphoneX:text-2xl font-extrabold">
          Workouts for you
        </h3>
      ) : null}
      {loading ? (
        <div className="w-full h-60 flex justify-center items-center">
          <Loading fill="#ff735c" width={50} height={50} />
        </div>
      ) : (
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={10}
          className="suggestedTaskCardSwiper"
          style={{ width: "100%", height: "100%" }}
        >
          {suggestedTasks.map((task) => (
            <SwiperSlide
              key={task.id}
              className="max-w-[180px] iphoneX:max-w-[200px] bg-[#6e6e6e] rounded-xl"
            >
              <SuggestedTaskCard gameTeams={gameTeams} task={task} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
};

export default SuggestedTask;
