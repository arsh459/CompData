import Button from "@components/button";
import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import {
  getAspectRatio,
  getHeight,
} from "@templates/community/Program/getAspectRatio";
// import { cloudinaryBaseURL } from "@models/Media/cloudinaryUpload";
// import MediaCarousel from "@templates/listing/HeaderImage/MediaCarousel";
import MediaTile from "@templates/listing/HeaderImage/MediaTile";
import ProfileHeaderV1 from "@templates/profile/ProfileHeader/ProfileHeaderV1";
import clsx from "clsx";
import Link from "next/link";
// import KPISection from "./KPISection";

interface Props {
  boatData: LeaderBoard;
  paused: boolean;
}

const Boat: React.FC<Props> = ({ boatData, paused }) => {
  // console.log("bo", boatData);
  return (
    <div className="relative group">
      <div
        className={clsx(
          "bg-gradient-to-b from-blue-200 to-blue-400",
          "absolute -inset-0 opacity-25 rounded-lg blur-xl",
          "group-hover:opacity-50 transition duration-1000 group-hover:duration-200"
        )}
      />
      <div
        className={clsx(
          "relative bg-gradient-to-b from-white to-white w-56 rounded-xl p-3",
          "shadow-md group-hover:shadow-xl transition duration-1000 group-hover:duration-200"
        )}
      >
        <div className="">
          <ProfileHeaderV1
            vertical={true}
            editing={false}
            profileImg={boatData.profileImage}
            profileName={boatData.name}
            editingSection={undefined}
            socialMediaIcons={{
              linkedIn: boatData.linkedInLink,
              facebook: boatData.facebookProfile,
              instagram: boatData.instagramLink,
              youtube: boatData.youtubeLink,
              external: boatData.externalLink,
            }}
            userKey={boatData.userKey}
            onEditingClick={() => {}}
            live={false}
            linksLive={true}
          />
        </div>

        {/**
        <div className="pb-2 pt-2">
          <KPISection
            sbEvents={boatData.sbEvents}
            sbStudents={boatData.sbStudents}
          />
        </div>
         */}

        {/* <div>
          <p className="text-sm text-gray-500 line-clamp-2 break-all">
            {boatData.bio}
          </p>
        </div> */}

        {boatData.coverCloudinary && boatData.coverCloudinary.length > 0 ? (
          <div>
            <p className="pb-1 text-sm text-center text-gray-500">
              - Glimpse in the boat -
            </p>

            <div className={getAspectRatio(boatData.coverCloudinary[0])}>
              <MediaTile
                media={boatData.coverCloudinary[0]}
                width={900}
                height={getHeight(boatData.coverCloudinary[0], 900)}
                paused={true}
                rounded={true}
                alt="boat-img"
              />
            </div>

            {/* <MediaCarousel
              media={boatData.coverCloudinary}
              paused={paused}
              size="card"
              rounded
            /> */}
          </div>
        ) : null}

        <div className="pt-2">
          <Link legacyBehavior href={`/${boatData.userKey}`}>
            <a target="_blank">
              <Button appearance="contained" size="small">
                <p className="">Visit Boat</p>
              </Button>
            </a>
          </Link>
        </div>

        {/* <div className="h-16" /> */}
      </div>
    </div>
  );
};

export default Boat;
