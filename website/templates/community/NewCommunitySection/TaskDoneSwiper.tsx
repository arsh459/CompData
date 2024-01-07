import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import TaskDoneMedia from "./TaskDoneMedia";
import { TaskDoneType } from "@hooks/community/useTaskDoneLists";
import { communityQueryV3 } from "@hooks/community/v2/useCommunityParamsV3";
import { weEventTrack } from "@analytics/webengage/user/userLog";

interface Props {
  taskDoneLists?: TaskDoneType[];
  urlState: communityQueryV3;
  onQueryChange: (
    querry: communityQueryV3,
    replace?: true,
    merge?: boolean
  ) => void;
  // setIsPostClickOpen: (val: boolean) => void;
}

const TaskDoneSwiper: React.FC<Props> = ({
  taskDoneLists,
  urlState,
  onQueryChange,
  // setIsPostClickOpen,
}) => {
  const handleQueryChange = (postId: string) => {
    // console.log("postId", postId);
    const query: communityQueryV3 = {};
    query.nav = urlState.nav;
    query.post = urlState.post;
    query.postId = postId;
    // query.mpost = "true";
    onQueryChange(query, true);
    document
      .getElementById("postClickEle")
      ?.scrollTo({ top: 0, behavior: "smooth" });
    weEventTrack("gameCommunityPost_topEffortsClick", { postId });
  };

  return (
    <div className="bg-gradient-to-b from-[#003743] to-[#002743] my-4 py-4">
      <div className="text-white font-bold text-lg iphoneX:text-2xl text-center italic">
        Top efforts by athletes
      </div>
      <div className="py-4 iphoneX:py-8">
        <Swiper
          slidesPerView={"auto"}
          centeredSlides={true}
          spaceBetween={30}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          className="w-full h-full"
        >
          {taskDoneLists?.map((item) => (
            <SwiperSlide
              key={item.id}
              className="max-w-[150px] iphoneX:max-w-[180px]"
            >
              <TaskDoneMedia
                item={item}
                handleQueryChange={handleQueryChange}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TaskDoneSwiper;
