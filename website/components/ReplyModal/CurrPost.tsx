import { Post } from "@models/Posts/Post";
import UserImage from "@templates/listing/Header/UserImage";
import { Swiper, SwiperSlide } from "swiper/react";
import MediaCard from "@components/MediaCard";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import clsx from "clsx";
import { saveNewClap } from "@models/Posts/createUtils";
import { DocumentReference } from "firebase/firestore";
import { formatDistanceToNow } from "date-fns";
import Linkify from "react-linkify";
import PrivateMedia from "@components/PrivateMedia";

interface Props {
  currentPost: Post;
  postRef: DocumentReference;
  signedInUserId?: string;
  viewLevel: "session" | "post" | "postReply";
  targetViewLevel: "session" | "post" | "postReply";
  setTargetPost: (val: Post) => void;
  setTargetPostRef: (val: DocumentReference) => void;
  setTargetViewLevel: (val: "session" | "post" | "postReply") => void;
}

const CurrPost: React.FC<Props> = ({
  currentPost,
  signedInUserId,
  postRef,
  viewLevel,
  targetViewLevel,
  setTargetPost,
  setTargetPostRef,
  setTargetViewLevel,
}) => {
  const handleClap = () => {
    if (signedInUserId && currentPost && postRef) {
      // console.log("currentPost", currentPost);
      saveNewClap(
        postRef,
        signedInUserId,
        currentPost.communityId,
        currentPost.creatorId
      );
    }
  };

  const handleReply = () => {
    setTargetPost(currentPost);
    setTargetPostRef(postRef);
    setTargetViewLevel(viewLevel);
  };

  return (
    <div
      className={clsx(
        "flex flex-col",
        viewLevel === "post" ? "bg-[#E6E6EB]" : ""
      )}
    >
      <div
        className={clsx(
          "grid gap-x-4 gap-y-2 py-2 text-[#203C51]",
          viewLevel === "session"
            ? "px-4"
            : viewLevel === "post"
            ? "px-8"
            : "px-12"
        )}
        style={{ gridTemplateColumns: "max-content auto" }}
      >
        <UserImage
          image={currentPost.creatorImg}
          name={currentPost.creatorName}
          pointer="cursor-default"
          boxWidth={
            viewLevel === "session"
              ? "w-10 iphoneX:w-11"
              : viewLevel === "post"
              ? "w-8 iphoneX:w-9"
              : "w-6 iphoneX:w-7"
          }
          boxHeight={
            viewLevel === "session"
              ? "h-10 iphoneX:h-11"
              : viewLevel === "post"
              ? "h-8 iphoneX:h-9"
              : "h-6 iphoneX:h-7"
          }
        />
        <div
          className={clsx(viewLevel === "session" ? "" : "flex items-center")}
        >
          <h3
            className={clsx(
              "font-extrabold line-clamp-1",
              viewLevel === "session"
                ? "text-lg iphoneX:text-2xl"
                : viewLevel === "post"
                ? "iphoneX:text-xl"
                : "text-sm iphoneX:text-lg"
            )}
          >
            {currentPost.creatorName}
          </h3>
          <p
            className={clsx(
              "opacity-70",
              viewLevel === "session"
                ? "text-xs iphoneX:text-sm"
                : "text-[10px] text- iphoneX:iphoneX:text-xs px-4"
            )}
          >
            {formatDistanceToNow(currentPost.updatedOn)} ago
          </p>
        </div>
        <div />
        <p
          className={clsx(
            "text-[#203C51] prose break-words whitespace-pre-wrap",
            viewLevel === "session"
              ? "text-base iphoneX:text-lg"
              : viewLevel === "post"
              ? "text-sm iphoneX:text-base"
              : "text-xs iphoneX:text-sm"
          )}
        >
          <Linkify>{currentPost.text}</Linkify>
        </p>
      </div>
      {viewLevel === "session" ? (
        <>
          {currentPost.view === "private" &&
          signedInUserId !== currentPost.creatorId ? (
            <PrivateMedia />
          ) : (
            <Swiper
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              modules={[Pagination]}
              className="activitySwiper w-full bg-[#C0D1DD] flex justify-center items-center"
            >
              {currentPost.media.map((each) => (
                <SwiperSlide key={each.id}>
                  <MediaCard
                    media={each}
                    HWClassStr="h-full w-fit mx-auto"
                    heightString="max-h-80"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </>
      ) : null}
      {viewLevel === "session" ? (
        <div className="flex items-center text-lg iphoneX:text-2xl px-4 py-2 bg-[#F2F2F7]">
          <img
            src={`https://ik.imagekit.io/socialboat/Vector_qKsbpfH0k.png?ik-sdk-version=javascript-1.4.3&updatedAt=1650984148032`}
            alt="Replies icon"
            className="w-4 iphoneX:w-6"
          />
          <p className="pl-2.5 iphoneX:pl-4">Replies</p>
        </div>
      ) : null}
      {viewLevel === targetViewLevel ? null : (
        <div className="flex justify-center items-center text-[10px] iphoneX:text-sm mb-2">
          <div
            className="w-24 iphoneX:w-28 flex justify-center items-center cursor-pointer bg-[#F2F2F7] border border-[#E9E9E9] rounded-full py-1.5 iphoneX:py-2 mx-2"
            onClick={handleClap}
          >
            <img
              className="w-3 iphoneX:w-4 h-3 iphoneX:h-4"
              src={`https://ik.imagekit.io/socialboat/Group_1_ednlY3ZF9.png?ik-sdk-version=javascript-1.4.3&updatedAt=1650984148049`}
              alt="Clap Icon"
            />
            <p className="pl-2 text-[10px] iphoneX:text-xs">
              {currentPost?.numClaps ? currentPost?.numClaps : "Clap"}
            </p>
          </div>
          {viewLevel === "postReply" ? null : (
            <div
              className="w-24 iphoneX:w-28 flex justify-center items-center cursor-pointer bg-[#F2F2F7] border border-[#E9E9E9] rounded-full py-1.5 iphoneX:py-2 mx-2"
              onClick={handleReply}
            >
              <img
                className="w-3 iphoneX:w-4 h-3 iphoneX:h-4"
                src={`https://ik.imagekit.io/socialboat/Vector_qKsbpfH0k.png?ik-sdk-version=javascript-1.4.3&updatedAt=1650984148032`}
                alt="Comment Icon"
              />
              <p className="pl-2 text-[10px] iphoneX:text-xs">
                {currentPost?.numCheckins
                  ? `${currentPost?.numCheckins} replies`
                  : "Reply"}
              </p>
            </div>
          )}
        </div>
      )}
      {viewLevel === "session" ? null : <div className="h-px bg-[#E9E9E9]" />}
    </div>
  );
};

export default CurrPost;
