// import Button from "@components/button";
import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
// import {
//   getAspectRatio,
//   getHeight,
// } from "@templates/community/Program/getAspectRatio";
// import { cloudinaryBaseURL } from "@models/Media/cloudinaryUpload";
// import MediaCarousel from "@templates/listing/HeaderImage/MediaCarousel";
import MediaTile from "@templates/listing/HeaderImage/MediaTile";
// import ProfileHeaderV1 from "@templates/profile/ProfileHeader/ProfileHeaderV1";
import SocialMediaHeaderV1 from "@templates/profile/SocialMediaHeader/SocialMediaHeaderV1";
// import clsx from "clsx";
import Link from "next/link";
// import KPISection from "./KPISection";

interface Props {
  boatData: LeaderBoard;
  paused: boolean;
}

const Boat2: React.FC<Props> = ({ boatData }) => {
  return (
    <>
      <Link href={`/${boatData.userKey}`} legacyBehavior>
        <a target="_blank">
          <div className="rounded-lg">
            {boatData.profileImage ? (
              <div className="h-80 w-56 shadow-lg hover:shadow-xl rounded-lg">
                <MediaTile
                  media={boatData.profileImage}
                  width={300}
                  height={400}
                  rounded
                  alt="img"
                />
              </div>
            ) : (
              <div className="bg-gray-100 h-80 w-56 rounded-lg flex items-center justify-center">
                <p className="text-gray-500 font-semibold">
                  Creator in stealth
                </p>
              </div>
            )}
            <div className="p-2">
              <p className="text-gray-700 text-center text-lg font-semibold">
                {boatData.name}
              </p>
            </div>
          </div>
        </a>
      </Link>
      <div className="flex justify-center">
        <SocialMediaHeaderV1
          size="sm"
          live={true}
          linksLive={true}
          socialMediaIcons={{
            linkedIn: boatData.linkedInLink,
            facebook: boatData.facebookProfile,
            instagram: boatData.instagramLink,
            youtube: boatData.youtubeLink,
            external: boatData.externalLink,
          }}
          editing={false}
          active={true}
        />
      </div>
    </>
  );
};

export default Boat2;
