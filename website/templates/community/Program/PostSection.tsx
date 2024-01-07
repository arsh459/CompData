import Submit from "./Submit";
import Divider from "@components/divider/Divider";
import clsx from "clsx";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { saveNewClap } from "@models/Posts/createUtils";
import { Link } from "@mui/material";
import { DocumentReference } from "@firebase/firestore";
import { clapClick, replyClick } from "@analytics/click/wrappers";

export type postButtonLabels = "clap" | "dm" | "checkIn" | "join";

export interface PostButton {
  text: string;
  icon: string;
  selectedIcon: string;
  selected: boolean;
  selectedText?: string;
  key: postButtonLabels;
}

interface Props {
  postRef?: DocumentReference;
  viewerUID?: string;
  viewerName?: string;
  viewerImg?: CloudinaryMedia | AWSMedia;

  authorUID: string;
  authorName?: string;
  authorImg?: CloudinaryMedia | AWSMedia;
  justifySettings: "justify-between" | "justify-evenly";
  postButtons: PostButton[];
  communityId?: string;
  joinURL: string;
  checkedIns?: number;
  clapsByViewer?: number;
  setAuthIsVisible: () => void;
  onJoinRequest: () => void;

  onPostClick: () => void;
  isMember: boolean;
}

const PostSection: React.FC<Props> = ({
  postRef,
  clapsByViewer,
  authorUID,
  postButtons,
  justifySettings,
  viewerUID,
  viewerImg,
  viewerName,
  authorName,
  authorImg,
  communityId,
  joinURL,
  checkedIns,
  onPostClick,
  setAuthIsVisible,
  onJoinRequest,
  isMember,
}) => {
  const onClick = async (newPostLabel: postButtonLabels) => {
    if (!viewerUID) {
      setAuthIsVisible();
    } else if (!isMember) {
      // console.log("heere");
      onJoinRequest();
    } else if (newPostLabel === "clap" && viewerUID && postRef) {
      // console.log("here");
      await saveNewClap(
        postRef,
        viewerUID,
        communityId,
        authorUID,
        viewerName,
        viewerImg,
        authorName,
        authorImg
      );

      clapClick();
    } else if (newPostLabel === "checkIn") {
      onPostClick();
      replyClick();
    }
  };

  return (
    <>
      <div className="">
        <Divider />

        <div className={clsx(justifySettings, "flex items-center pt-2 pb-2")}>
          {postButtons.map((button) => {
            if (button.key === "join" && joinURL && viewerUID) {
              return (
                <Link href={joinURL} target="_blank" key={button.key}>
                  <div key={button.text}>
                    <Submit
                      icon={button.selected ? button.selectedIcon : button.icon}
                      text={button.text}
                      selectedIcon={button.selectedIcon}
                      selected={button.selected}
                      selectedText={button.selectedText}
                    />
                  </div>
                </Link>
              );
            } else if (button.key === "join" && !joinURL) {
              return null;
            } else {
              return (
                <div key={button.text} onClick={() => onClick(button.key)}>
                  <Submit
                    icon={button.selected ? button.selectedIcon : button.icon}
                    text={button.text}
                    selectedText={button.selectedText}
                    selectedIcon={button.selectedIcon}
                    selected={
                      button.key === "checkIn" && checkedIns
                        ? true
                        : button.selected
                    }
                    kpi={
                      button.key === "clap"
                        ? clapsByViewer
                        : button.key === "checkIn"
                        ? checkedIns
                        : 0
                    }
                  />
                </div>
              );
            }
          })}
        </div>
      </div>
    </>
  );
};

export default PostSection;
