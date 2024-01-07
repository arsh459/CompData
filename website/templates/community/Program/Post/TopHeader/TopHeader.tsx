import { profileClick } from "@analytics/click/wrappers";
import { Link } from "@mui/material";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import EditButton from "../../EditButton";
import UserPhoto from "../../Feed/PostView/UserPhoto";

interface Props {
  viewerUID?: string;
  authorUID: string;
  authorName?: string;
  authorImage?: CloudinaryMedia | AWSMedia;
  viewLevel: "session" | "post" | "postReply";
  updatedOn?: number;
  communityId?: string;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
  onCommentClick: () => void;
  showReplyCTA?: boolean;
  teamName?: string;
  isAdmin?: boolean;
  // authorKey?: string;
  // onProfileNameClick: (uid: string) => void;
}

const TopPostHeader: React.FC<Props> = ({
  authorName,
  authorImage,
  authorUID,
  viewLevel,
  viewerUID,
  communityId,
  updatedOn,
  onEditClick,
  onDeleteClick,
  onCommentClick,
  showReplyCTA,
  teamName,
  isAdmin,
  // authorKey,
  // onProfileNameClick,
}) => {
  return (
    <>
      {viewLevel === "session" ? null : (
        <div className="pb-2 pl-1 flex items-center">
          <p className="text-xl">👇</p>
          {showReplyCTA ? (
            <div onClick={onCommentClick}>
              <p className="text-sm text-gray-600 pl-4 underline cursor-pointer">
                Top Replies
              </p>
            </div>
          ) : null}
        </div>
      )}

      <div className="flex justify-between">
        <div className="flex">
          <Link href={`/p/${authorUID}`}>
            <UserPhoto
              size={viewLevel === "session" ? undefined : "small"}
              isCoach={communityId === authorUID}
              name={authorName}
              img={authorImage}
              teamName={teamName}
              placeholderName="Coach"
              onImgClick={() => {
                profileClick();
              }}
              // onImgClick={() => onProfileNameClick(authorUID)}
              updatedOn={updatedOn}
            />
          </Link>
        </div>
        <div className="flex cursor-pointer" onClick={onCommentClick} />
        {// authorUID === viewerUID ||
        isAdmin &&
        onEditClick &&
        onDeleteClick ? (
          <div className="flex-none">
            <EditButton onEdit={onEditClick} onDelete={onDeleteClick} />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default TopPostHeader;
