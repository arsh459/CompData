import PrivateMedia from "@components/PrivateMedia";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { playbackId } from "@models/Posts/Post";
import { ListItem } from "@templates/listing/NumberedList/NumberedList";
import clsx from "clsx";
import LeaderboardPost from "../LeaderboardPost";
import MainContent from "./MainContent";
import SessionName from "./SessionName";

interface Props {
  onClick: () => void;
  day?: number;
  sessionName?: string;
  text?: string;
  live?: boolean;
  media?: (CloudinaryMedia | AWSMedia)[];
  antMedia?: AWSMedia[];
  playbackIds?: { [streamId: string]: playbackId[] };
  muxStreamIds?: string[];
  pin?: boolean;
  viewLevel: "session" | "post" | "postReply";
  lineClamp?: number;

  parentId?: string;
  communityId?: string;
  postContent?: "leaderboard";
  prizes?: ListItem[];

  postView: "public" | "private";
  isViewerOwner: boolean;
}

const PostContentWrapper: React.FC<Props> = ({
  day,
  sessionName,
  text,
  live,
  media,
  lineClamp,
  pin,
  viewLevel,
  onClick,
  postContent,
  communityId,
  parentId,
  prizes,
  postView,
  isViewerOwner,
  muxStreamIds,
  playbackIds,
  antMedia,
}) => {
  // console.log("m", media, postView);
  return (
    <div
      className={clsx(
        "pt-2 ",
        // "bg-green-50",
        pin ? "" : viewLevel === "post" ? "pl-14" : "pl-14"
      )}
      // onClick={onClick}
    >
      <div className="">
        <div>
          <SessionName
            day={day}
            pin={pin}
            sessionName={sessionName}
            lineClamp={lineClamp}
          />

          {communityId && parentId && postContent === "leaderboard" ? (
            <div className="pt-2">
              <LeaderboardPost
                prizes={prizes}
                parentId={parentId}
                communityId={communityId}
              />
            </div>
          ) : (
            <>
              {postView === "private" && !isViewerOwner ? (
                <PrivateMedia />
              ) : (
                <MainContent
                  text={text}
                  live={live}
                  lineClamp={lineClamp}
                  pin={pin}
                  media={antMedia && media ? [...antMedia, ...media] : media}
                  playbackIds={playbackIds}
                  muxStreamIds={muxStreamIds}
                  onClick={onClick}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostContentWrapper;
