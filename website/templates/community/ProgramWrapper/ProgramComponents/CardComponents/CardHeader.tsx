import { postTypes } from "@hooks/community/v2/useCommunityParamsV3";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import UserImage from "@templates/listing/Header/UserImage";
// import { reviewStatus } from "@models/Activities/Activity";
// import ModerationModal from "../ModerationModal";
import { format } from "date-fns";
import clsx from "clsx";
import { weEventTrack } from "@analytics/webengage/user/userLog";
// import PlayerDetailsModal from "@templates/community/LeaderboardWrapper/PlayerDetailsModal";
// import { useState } from "react";
// import { useUserRank } from "@hooks/activities/userUserRank";

interface Props {
  updatedOn: number;
  // gameId: string;
  // creatorId: string;
  creatorName?: string;
  creatorImg?: CloudinaryMedia | AWSMedia;
  postType?: postTypes;
  teamName?: string;
  dotsVisible?: boolean;
  // isPostClick?: boolean;
  // reviewStatus?: reviewStatus;
  // isUserActivity: boolean;
  // signedInUID: string;
  // actId?: string;
  onNameClick: () => void;
  onDotsClick?: () => void;
}

const CardHeader: React.FC<Props> = ({
  updatedOn,
  // gameId,
  // creatorId,
  creatorName,
  creatorImg,
  postType,
  teamName,
  onNameClick,
  onDotsClick,
  dotsVisible,
  // isPostClick,
  // reviewStatus,
  // isUserActivity,
  // signedInUID,
  // actId,
}) => {
  // const [isOpen, setIsOpen] = useState<boolean>(false);
  // const { myUserRank } = useUserRank(gameId, creatorId);

  return (
    <div className="flex  justify-between px-4 text-[#203C51]">
      <div className="flex items-center">
        <div onClick={onNameClick}>
          <UserImage
            image={creatorImg}
            name={creatorName}
            boxHeight="h-10 iphoneX:h-12"
            boxWidth="w-10 iphoneX:w-12"
          />
        </div>
        <div className="flex-1 pl-4">
          <div className="flex items-center">
            <h3
              className="font-extrabold text-lg iphoneX:text-2xl line-clamp-1"
              onClick={onNameClick}
            >
              {creatorName}
            </h3>
            {postType ? (
              <div
                className={clsx(
                  "flex-1 flex items-center",
                  postType === "spotlight" ? "justify-between" : "justify-end"
                )}
              >
                <img
                  src={
                    postType === "spotlight"
                      ? `https://ik.imagekit.io/socialboat/Vector__2__8NH3ZFIdM.png?ik-sdk-version=javascript-1.4.3&updatedAt=1650984145830`
                      : `https://ik.imagekit.io/socialboat/Group_76_fFHt9xxoh.png?ik-sdk-version=javascript-1.4.3&updatedAt=1650984145765`
                  }
                  alt="icon"
                  className="px-4 w-5 iphoneX:w-8"
                />
                {postType === "spotlight" ? null : (
                  <p className="text-[10px] iphoneX:text-sm opacity-70">
                    Anouncement
                  </p>
                )}
              </div>
            ) : null}
          </div>
          <div className="flex items-center">
            <p className="text-[10px] iphoneX:text-sm text-[#0085E0]">
              @
              {teamName && teamName?.length > 22
                ? `${teamName?.slice(0, 22)}..`
                : teamName}
            </p>
            <p className="px-1">·</p>
            <p className="text-[10px] iphoneX:text-sm opacity-70 ">
              {format(new Date(updatedOn), "hh:mmaaa dd MMM")}
            </p>
          </div>
        </div>
      </div>
      {onDotsClick && dotsVisible ? (
        <div>
          <img
            src={`https://ik.imagekit.io/socialboat/Vector__2__vrH8RrpLW.png?ik-sdk-version=javascript-1.4.3&updatedAt=1653737909556`}
            alt="more icon"
            className="ml-1 mt-1 cursor-pointer w-1 iphoneX:w-2"
            onClick={() => {
              onDotsClick();
              weEventTrack("gameCommunityPost_moreDotClick", {});
            }}
          />
        </div>
      ) : null}
    </div>
  );
};

export default CardHeader;
