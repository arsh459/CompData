import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";
// import PostIcons from "./PostIcons";
import PostCreateModal from "./PostCreateModal";
// import { useState } from "react";
// import { sessionTypes } from "@models/Event/Event";
// import { navLevels } from "@hooks/community/useCommunityParams";
import { navLevelsV2 } from "@hooks/community/v2/useCommunityParamsV2";

interface Props {
  authorImg?: CloudinaryMedia;
  authourUID: string;
  authorName: string;
  eventId: string;
  communityId: string;
  cohortId?: string;
  // postRequest: number;
  navState: navLevelsV2;
  onNavChange: (newLevel: navLevelsV2) => void;
  gameId: string;
}

const PostCreatorV2: React.FC<Props> = ({
  eventId,
  authourUID,
  authorImg,
  cohortId,
  authorName,
  communityId,
  // postRequest,
  navState,
  onNavChange,
  gameId,
}) => {
  // const [isOpen, setIsOpen] = useState<boolean>(false);
  // const [postStyle, setPostStyle] = useState<sessionTypes>("post");

  const onClose = () => {
    // setIsOpen(false);
    onNavChange("program");
  };

  // const onOpen = (newKey: sessionTypes) => {
  //   setPostStyle(newKey);
  //   setIsOpen(true);
  // };

  // useEffect(() => {
  //   if (navState === "compose") {
  //     // setPostStyle("post");
  //     setIsOpen(true);
  //   } else {
  //     setIsOpen(false);
  //   }
  // }, [navState]);
  // console.log("isOpen", isOpen, navState);

  return (
    <>
      <PostCreateModal
        eventId={eventId}
        cohortId={cohortId}
        authorImage={authorImg}
        initalSessionType={"post"}
        authorUID={authourUID}
        communityId={communityId}
        authorName={authorName}
        gameId={gameId}
        isOpen={navState === "compose"}
        onBackdrop={onClose}
        onClose={onClose}
      />
      <div className="">
        {/* <div className="pt-0">
          <PostIcons onButtonPress={onOpen} />
        </div> */}
      </div>
    </>
  );
};

export default PostCreatorV2;
