import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useSuggestedTasks } from "@hooks/community/useSuggestedTasks";
import TaskSwiper from "@templates/community/LeaderboardWrapper/TaskSwiper";
import Loading from "@components/loading/Loading";

interface Props {
  gameId: string;
  userId: string;
  userLevel: number;
  baseShareURL: string;
}

const SimilerTasks: React.FC<Props> = ({
  gameId,
  userId,
  userLevel,
  baseShareURL,
}) => {
  const { loading, suggestedTasks } = useSuggestedTasks(
    true,
    gameId,
    userId,
    userLevel
  );

  return loading ? (
    <div className="mx-auto w-60 h-60 flex justify-center items-center">
      <Loading fill="#ff735c" width={50} height={50} />
    </div>
  ) : suggestedTasks.length ? (
    <div className="py-8">
      <h2 className="text-2xl font-bold text-[#335E7D] py-4">Similar Tasks</h2>
      <Swiper slidesPerView={"auto"} spaceBetween={10}>
        {suggestedTasks.map((task) => (
          <SwiperSlide
            key={task.id}
            className="max-w-[150px] iphoneX:max-w-[180px]"
          >
            <TaskSwiper task={task} baseShareURL={baseShareURL} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  ) : null;
};

export default SimilerTasks;
