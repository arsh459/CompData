import clsx from "clsx";
import { viewTypes } from "@hooks/community/v2/useCommunityParamsV3";
import CreateModal from "@templates/community/Program/CreateModal/CreateModal";
import LevelUp from "./LevelUp";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import TaskSwiper from "./TaskSwiper";
import { UserRank } from "@models/Activities/Activity";
import { Task } from "@models/Tasks/Task";
import Link from "next/link";
import Loading from "@components/loading/Loading";

interface Props {
  viewType?: viewTypes;
  isOpen: boolean;
  onCloseModal: () => void;
  myUserRank?: UserRank;
  suggestedTasks: Task[];
  baseShareURL: string;
  loading: boolean;

  activeRank?: number | string;
  activeTeamRank?: number | string;
  comptitionRank?: number | string;
  myPoints?: number;
  teamPts?: number;
  competitionPts?: number;
}

const LevelUpModal: React.FC<Props> = ({
  viewType,
  isOpen,
  onCloseModal,
  myUserRank,
  suggestedTasks,
  baseShareURL,
  loading,

  activeRank,
  activeTeamRank,
  comptitionRank,
  myPoints,
  teamPts,
  competitionPts,
}) => {
  return (
    <CreateModal
      onBackdrop={onCloseModal}
      onButtonPress={onCloseModal}
      isOpen={isOpen}
      heading=""
      onCloseModal={onCloseModal}
      bgData="bg-gradient-to-b from-white/40 to-[#C8C8C8]/40 backdrop-blur-2xl fixed inset-0 z-50 w-full h-full mx-auto"
    >
      <div className="w-full h-full flex flex-col justify-center">
        <div className="p-4">
          <LevelUp
            viewType={viewType}
            onCloseModal={onCloseModal}
            activeRank={activeRank}
            activeTeamRank={activeTeamRank}
            teamPts={teamPts}
            competitionPts={competitionPts}
            comptitionRank={comptitionRank}
            myPoints={myPoints}
          />
        </div>
        <div
          className={clsx(
            "text-white py-4",
            viewType === "players"
              ? "bg-gradient-to-b from-[#0A568C] to-[#002D4D]"
              : "bg-gradient-to-b from-[#B54963] to-[#5C0014]"
          )}
        >
          <h2 className="text-center text-lg iphoneX:text-2xl font-extrabold">
            Suggested Tasks
          </h2>
          {loading ? (
            <div className="w-full h-[30vh] flex justify-center items-center">
              <Loading fill="#ff735c" width={48} height={48} />
            </div>
          ) : (
            <>
              <div className="flex justify-end items-center p-4 underline text-sm iphoneX:text-base">
                <Link href={`${baseShareURL}/workout`}>See All</Link>
              </div>
              <Swiper
                slidesPerView={"auto"}
                centeredSlides={true}
                spaceBetween={30}
                pagination={{
                  clickable: true,
                  dynamicBullets: true,
                }}
                className="mb-4 iphoneX:mb-8"
              >
                {suggestedTasks.map((task) => (
                  <SwiperSlide
                    key={task.id}
                    className="max-w-[150px] iphoneX:max-w-[180px]"
                  >
                    <TaskSwiper task={task} baseShareURL={baseShareURL} />
                  </SwiperSlide>
                ))}
              </Swiper>
              <p className="text-center text-xs iphoneX:text-sm">
                Complete these tasks in order to increase your Rank
              </p>
            </>
          )}
        </div>
      </div>
    </CreateModal>
  );
};

export default LevelUpModal;
