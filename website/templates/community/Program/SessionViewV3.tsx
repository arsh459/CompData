// import { useSessionV3 } from "@hooks/community/useSessionV3";
import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { Post } from "@models/Posts/Post";
// import clsx from "clsx";
// import ClapSection from "./ClapSection";
// import PostContentWrapper from "./Post/Content/PostContentWrapper";
// import TopPostHeader from "./Post/TopHeader/TopHeader";
// import { getPaddingLeftForPost } from "./Post/utils";
// import PostSection from "./PostSection";
// import { getPostIcons } from "./utils/utils";

interface Props {
  eventId: string;
  postId?: string;
  parentPostId?: string;
  rounded: boolean;
  onClick: () => void;
  viewerUID?: string;
  viewerName?: string;
  viewerImg?: CloudinaryMedia;
  authorUID: string;
  authorName?: string;
  authorImage?: CloudinaryMedia;
  day?: number;
  sessionName?: string;
  text?: string;
  live?: boolean;
  media?: CloudinaryMedia[];
  superParentPostId?: string;
  onSubPostClick: (pinnedPost: Post) => void;
  pin?: boolean;
  viewLevel: "session" | "post" | "postReply";
  numClaps?: number;
  numReviews?: number;
  hidePostSection?: boolean;
  lineClamp?: number;
  updatedOn?: number;
  communityId: string;
  selectedCohortId: string;
  joinURL: string;
  setAuthIsVisible: () => void;
}

const SessionViewV3: React.FC<Props> = ({
  authorName,
  authorImage,
  day,
  sessionName,
  text,
  live,
  media,
  eventId,
  authorUID,
  onClick,
  rounded,
  lineClamp,
  onSubPostClick,
  superParentPostId,
  pin,
  postId,
  parentPostId,
  viewLevel,
  viewerUID,
  viewerImg,
  viewerName,
  numClaps,
  numReviews,
  hidePostSection,
  communityId,
  selectedCohortId,
  joinURL,
  setAuthIsVisible,
  updatedOn,
}) => {
  // const { postReviews, clapper, checkedIns } = useSessionV3(
  //   eventId,
  //   postId,
  //   viewLevel,
  //   parentPostId,
  //   viewerUID
  // );
  return <div />;

  // return (
  //   <>
  //     <div
  //       className={clsx(
  //         rounded ? "rounded-t-lg" : "",
  //         viewLevel === "postReply" ? "" : "border-t",
  //         "hover:shadow-sm  bg-white p-4 pb-0"
  //       )}
  //     >
  //       <TopPostHeader
  //         viewerUID={viewerUID}
  //         authorUID={authorUID}
  //         authorName={authorName}
  //         authorImage={authorImage}
  //         viewLevel={viewLevel}
  //         updatedOn={updatedOn}
  //         communityId={communityId}
  //       />
  //       <PostContentWrapper
  //         onClick={onClick}
  //         day={day}
  //         sessionName={sessionName}
  //         text={text}
  //         live={live}
  //         media={media}
  //         pin={pin}
  //         viewLevel={viewLevel}
  //         lineClamp={lineClamp}
  //       />
  //     </div>

  //     {hidePostSection ? null : (
  //       <div
  //         className={clsx(
  //           "pt-2 bg-white",
  //           rounded ? "rounded-b-lg" : "",
  //           viewLevel === "postReply" ? "" : "border-b",
  //           pin ? "" : viewLevel === "postReply" ? "pl-14" : "pl-16",
  //           "p-4 pb-0"
  //         )}
  //       >
  //         <div className={clsx(getPaddingLeftForPost(pin, viewLevel))}>
  //           <div className="pb-1">
  //             <ClapSection
  //               numClaps={numClaps}
  //               numCheckins={numReviews}
  //               checkinClick={onClick}
  //               eventId={eventId}
  //               postId={postId}
  //               parentPostId={parentPostId}
  //             />
  //           </div>
  //           <PostSection
  //             clapsByViewer={clapper?.numClaps}
  //             checkedIns={checkedIns}
  //             justifySettings="justify-evenly"
  //             postButtons={getPostIcons(live, pin, viewLevel)}
  //             parentPostId={parentPostId}
  //             authorUID={authorUID}
  //             superParentPostId={superParentPostId}
  //             eventId={eventId}
  //             postId={postId}
  //             viewerUID={viewerUID}
  //             viewerImg={viewerImg}
  //             viewerName={viewerName}
  //             authorName={authorName}
  //             authorImg={authorImage}
  //             text={text}
  //             createdOn={1}
  //             dayNumber={day}
  //             sessionName={sessionName}
  //             communityId={communityId}
  //             selectedCohortId={selectedCohortId}
  //             joinURL={joinURL}
  //             setAuthIsVisible={setAuthIsVisible}
  //           />
  //         </div>
  //       </div>
  //     )}

  //     <div className="pl-8 bg-gray-100">
  //       {postReviews &&
  //         postReviews.map((item) => {
  //           return (
  //             <div key={item.id}>
  //               <SessionViewV3
  //                 rounded={false}
  //                 eventId={eventId}
  //                 joinURL={joinURL}
  //                 authorUID={item.creatorId}
  //                 viewLevel="postReply"
  //                 authorName={item.creatorName}
  //                 authorImage={item.creatorImg}
  //                 text={item.text}
  //                 media={item.media}
  //                 onClick={() => onSubPostClick(item)}
  //                 superParentPostId={superParentPostId}
  //                 parentPostId={postId}
  //                 onSubPostClick={onSubPostClick}
  //                 setAuthIsVisible={setAuthIsVisible}
  //                 updatedOn={item.updatedOn}
  //                 postId={item.id}
  //                 viewerUID={viewerUID}
  //                 viewerImg={viewerImg}
  //                 viewerName={viewerName}
  //                 numClaps={item.numClaps}
  //                 numReviews={item.numCheckins}
  //                 communityId={communityId}
  //                 selectedCohortId={selectedCohortId}
  //               />
  //             </div>
  //           );
  //         })}
  //     </div>
  //   </>
  // );
};

export default SessionViewV3;
