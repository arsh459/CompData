import {
  baseImageKit,
  // finaleImage,
  liveRedCircle,
  // runImage,
  lockedIconNoKeyHole,
  playButtonBlue,
  reminderIconRed,
} from "@constants/icons/iconURLs";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { Task } from "@models/Tasks/Task";
// import { UserInterface } from "@models/User/User";
import MediaTile from "@templates/listing/HeaderImage/MediaTile";
import clsx from "clsx";
// import { format } from "date-fns";
import React from "react";
interface Props {
  task?: Task;
  isFinale?: boolean;
  unlocksNext?: number;
  earnedFP?: number;
}

/**
 * 
 * isLocked, available // useIsTaskLockedV2() -> taskStatus
 * 
<Container> // style by top to bottom gradeint, rounded, p-4, 
<div className="relative">
<MediaElement />
<Overlay /> absolute position
</div>
<div className="flex justify-between">
<LeftComponent /> flex-2
<RightComponent /> flex-1


</div>

</Container>



 */

const GrandFinaleCard: React.FC<Props> = ({
  task,
  isFinale,
  unlocksNext,
  earnedFP,
}) => {
  const media = task?.thumbnails as CloudinaryMedia | AWSMedia;
  const isLocked = isFinale;
  return (
    <div className="min-h-[381px]">
      <div
        // className=" flex flex-col gap-2 items-center rounded-3xl px-6"
        className="p-4 rounded-2xl"
        style={{
          background: `linear-gradient(180deg, #404040 0%, #080808 100%)`,
        }}
      >
        <div className="">
          <div className=" relative overflow-hidden  rounded-lg ">
            {media ? (
              <MediaTile
                media={media}
                alt="goal-task"
                height={179}
                width={353}
                rounded={true}
                roundedString="rounded-xl"

                //   thumbnail={user?.profileImage}
                // setIsPaused={() => {}}
                //   HWClassStr="max-h-[102px] max-w-[159]   rounded-xl"
                //   heightString="h-[102px] "
              />
            ) : (
              <div />
            )}

            {isLocked ? (
              <div className="absolute flex flex-col text-white items-center justify-center inset-0 rounded-lg bg-[#1C1C1C]/20 backdrop-blur-xl z-10 border   border-[#A4A4A4]">
                <img
                  src={`${baseImageKit}/tr:w-28,c-maintain_ratio/${lockedIconNoKeyHole}`}
                />
                <p className="border-b border-white pb-1.5 my-1.5">
                  Unvieling on {unlocksNext}
                </p>
                {/* <div className="h-px bg-white w-1/2"></div> */}
                <p>Earn {earnedFP} Fitpoints</p>
              </div>
            ) : (
              <>
                <div
                  className="text-white text-xl italic flex justify-between items-center h-25 absolute w-full bottom-0 right-0 left-0 "
                  style={{
                    background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%)`,
                  }}
                >
                  <div className="flex justify-between absolute bottom-2">
                    <p className="line-clamp-1">{task?.name}</p>
                    <p>{task?.fitPoints}FP</p>
                  </div>
                </div>
                <div
                  className="text-white text-xl italic  absolute w-full top-0 right-0 left-0 h-24 "
                  style={{
                    background: `linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, #000000 100%)`,
                  }}
                >
                  <div className="flex items-center absolute top-2 left-2">
                    <img src={liveRedCircle} alt="liveRedCircle" />
                    <span className="flex-1 pl-2">Going Live in 30 mins</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center  pt-2 ">
          <div className="text-white">
            <p className=" font-extrabold text-xl iphoneX:text-2xl italic  text-transparent bg-clip-text bg-gradient-to-b from-[#FFE497] via-[#D1B76E] to-[#9F894C] tracking-wider whitespace-nowrap">
              Grand Finale
            </p>
            <p className="text font-semibold text-xl italic line-clamp-1  text-transparent bg-clip-text bg-gradient-to-b from-white via-white/70 to-black ">
              {task?.name}
            </p>
          </div>
          <button className="flex  items-center justify-center px-5 py-3 rounded-lg bg-white cursor-pointer mt-5">
            <img
              src={`${baseImageKit}/tr:w-14,c-maintain_ratio/${
                isLocked ? reminderIconRed : playButtonBlue
              }`}
              alt="play"
              className="mr-2"
            />
            <span
              className={clsx(
                "  text-sm leading-3 font-medium  whitespace-nowrap  ",
                isLocked ? "text-[#FF5C5C]" : "text-[#0085E0]"
              )}
            >
              {isLocked ? "Remind Me" : "Start Now"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GrandFinaleCard;
