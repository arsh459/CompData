import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { useState } from "react";
import MediaCard from "@components/MediaCard";
// import InfoBtn from "@components/InfoBtn";
import { Activity, reviewStatus } from "@models/Activities/Activity";
import { postTypes } from "@hooks/community/v2/useCommunityParamsV3";
import ReviewStatusComponent from "../ReviewStatusComponent";
import clsx from "clsx";
import Linkify from "react-linkify";
import ViewResult from "./ViewResult";

interface Props {
  postType?: postTypes;
  isActivity?: boolean;
  fitPoints: number;
  activityName: string;
  media: (CloudinaryMedia | AWSMedia)[];
  text: string | undefined;
  userLevel: number | undefined;
  onPostClick: () => void;
  isPostClick?: boolean;
  iButtonVisible: boolean;
  isUserActivity: boolean;
  reviewStatus?: reviewStatus;
  activity?: Activity;
  totalFitPoints?: number;
  tryAgainURL: string;
  signedInUID: string;
  teamKey: string;
  eventKey: string;
}

const CardMedia: React.FC<Props> = ({
  postType,
  // isActivity,
  fitPoints,
  activityName,
  media,
  text,
  userLevel,
  onPostClick,
  isPostClick,
  iButtonVisible,
  // isUserActivity,
  activity,
  totalFitPoints,
  tryAgainURL,
  signedInUID,
  teamKey,
  eventKey,
  // eventKey,
  // teamKey,
  // reviewStatus,
}) => {
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const [lines, setLines] = useState<boolean>(false);

  const lineClamped = text && text?.length > 100;
  // console.log("lineClamped", lineClamped);

  return (
    <>
      <p
        className={clsx(
          lines ? "line-clamp-3" : "",
          "px-4 py-2 text-[#203C51] whitespace-pre-wrap prose break-words"
        )}
      >
        <Linkify>{text}</Linkify>
      </p>
      {lineClamped ? (
        <div className="px-4 pb-2 flex justify-end">
          <p
            className="text-xs iphoneX:text-sm prose cursor-pointer text-blue-500"
            onClick={() => setLines((prev) => !prev)}
          >
            {lines ? "Show More" : "Show less"}
          </p>
        </div>
      ) : null}
      <Swiper
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="activitySwiper"
      >
        {media.map((each) => (
          <SwiperSlide
            key={each.id}
            className="w-full bg-[#C0D1DD] flex justify-center items-center"
          >
            <MediaCard
              media={each}
              setIsPaused={(val) => setIsPaused(val)}
              HWClassStr="h-full w-fit rounded-2xl"
              heightString={isPostClick ? "max-h-[80vh]" : "max-h-[60vh]"}
              webEngageEventname="gameCommunity_postMediaPlay"
            />
          </SwiperSlide>
        ))}
        {activity && !isPostClick && postType !== "announcement" && isPaused ? (
          <>
            <div
              className={clsx(
                "absolute top-0 left-0 right-0 h-1/5 z-10",
                "bg-gradient-to-b from-black/80 to-transparent",
                "flex justify-between items-start p-2.5 iphoneX:p-4"
              )}
            >
              <p className="flex-1 text-white text-lg iphoneX:text-2xl italic font-bold capitalize line-clamp-1">
                {activityName === "Post"
                  ? ""
                  : activityName === "Terra"
                  ? "Custom Workout"
                  : activityName}
              </p>
              {iButtonVisible ? <ViewResult onClick={onPostClick} /> : null}
            </div>
          </>
        ) : null}
        {activity &&
        // && !isPostClick
        postType !== "announcement" &&
        isPaused ? (
          <>
            <ReviewStatusComponent
              teamKey={teamKey}
              eventKey={eventKey}
              pointsSeen={activity.pointsSeen}
              taskId={activity.taskId}
              reviewStatus={activity.reviewStatus}
              totalFitPoints={totalFitPoints}
              // activityName={activityName}
              fitPoints={fitPoints}
              activeMessage={activity.activeMessage}
              tryAgainURL={tryAgainURL}
              authorId={activity.authorUID}
              signedInUID={signedInUID}
              activity={activity}
              activityId={activity.id ? activity.id : activity.postId}
            />
            <div
              className={clsx(
                "absolute bottom-0 left-0 right-0 h-1/5 z-10",
                "bg-gradient-to-t from-black/80 to-transparent",
                "flex justify-end items-end pointer-events-none",
                "p-2.5 iphoneX:p-4 text-white text-lg iphoneX:text-2xl italic font-bold"
              )}
            >
              <div className="flex items-center">
                <img
                  src={`https://ik.imagekit.io/socialboat/Ellipse_178_fH10R76Qkq.png?ik-sdk-version=javascript-1.4.3&updatedAt=1650984146252`}
                  alt="media title"
                  className="w-4 iphoneX:w-6"
                />
                <p className="pl-2">lvl {userLevel ? userLevel : 0}</p>
              </div>
            </div>
          </>
        ) : null}
      </Swiper>
    </>
  );
};

export default CardMedia;
