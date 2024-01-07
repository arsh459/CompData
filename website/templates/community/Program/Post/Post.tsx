import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";
// import PostCreateModal from "./PostCreateModal";
import { navLevels } from "@hooks/community/useCommunityParams";

interface Props {
  authorImg?: CloudinaryMedia;
  authourUID: string;
  authorName: string;
  eventId: string;
  communityId: string;
  cohortId: string;
  postRequest: number;
  navState: navLevels;
  onNavChange: (newLevel: navLevels) => void;
}

const PostCreator: React.FC<Props> = ({
  eventId,
  authourUID,
  authorImg,
  cohortId,
  authorName,
  communityId,
  // postRequest,
  navState,
  onNavChange,
}) => {
  // const onClose = () => {
  //   // setIsOpen(false);
  //   onNavChange("program");
  // };

  return (
    <>
      {/* <PostCreateModal
        eventId={eventId}
        cohortId={cohortId}
        authorImage={authorImg}
        initalSessionType={"post"}
        authorUID={authourUID}
        communityId={communityId}
        authorName={authorName}
        isOpen={navState === "compose"}
        onBackdrop={onClose}
        onClose={onClose}
      /> */}
      <div className="">
        {/* <div className="pt-0">
          <PostIcons onButtonPress={onOpen} />
        </div> */}
      </div>
    </>
  );
};

export default PostCreator;
