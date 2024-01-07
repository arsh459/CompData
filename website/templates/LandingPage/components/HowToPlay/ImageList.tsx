import clsx from "clsx";
import React from "react";
import {
  LandingLeaderboard,
  //   LeaderBoard,
} from "@models/LeaderBoard/Leaderboard";
// import Profile from "../InfluencerProfile";
// import RippleButton from "../RippleButton";
// import { cloudinaryBaseURL } from "@models/Media/cloudinaryUpload";
import LeaderImageHover from "../LedarImageHover";
// import classes from "./InfluencerList.module.css";
// const { influencerContainer } = classes;
import { getLevelColor } from "@templates/LandingPage/levelColor";
import { getURLToFetch } from "@templates/listing/HeaderImage/utils";

interface Props {
  ml?: boolean;
  leaders: LandingLeaderboard[];
  onClick: (leader: LandingLeaderboard) => void;
}

const ImageList: React.FC<Props> = ({ ml, leaders, onClick }) => {
  //   const [showProfile, setProfile] = useState(false);
  //   console.log("leaders", leaders);

  return (
    <div
      className={clsx(
        ml ? "ml-6 sm:ml-7 md:ml-8 lg:ml-10 2xl:ml-12" : "",
        "flex pb-4"
      )}
    >
      {leaders.map((image) => (
        <div
          key={image.id}
          className={clsx(
            "targetBox group cursor-pointer relative grid place-content-center",
            "w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 2xl:w-24 2xl:h-24 mr-2 md:mr-4 flex-none rounded-full"
          )}
          onClick={() => onClick(image)}
        >
          <LeaderImageHover
            color={
              getLevelColor(image.userLevel ? image.userLevel : 0).colorPrimary
            }
          />
          <img
            className={clsx(
              "absolute inset-0 rounded-full object-cover bg-white"
            )}
            alt="socailBoat"
            src={
              image.media && image.media.length
                ? getURLToFetch(image.media[0], 400, 400)
                : // `${cloudinaryBaseURL}/${image.media[0].resource_type}/upload/w_400,h_400,c_fill/${image.media[0].public_id}.jpg`
                  `https://avatars.dicebear.com/api/initials/${image.name}.svg`
            }
          />
        </div>
      ))}
    </div>
  );
};

export default ImageList;
