// import Divider from "@components/divider/Divider";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import clsx from "clsx";
import UserPhoto from "../Program/Feed/PostView/UserPhoto";
// import { Link } from "@mui/material";
// import { getCalString } from "./utils";
import { Link } from "@mui/material";
// import ArrowUpDown from "./ArrowUpDown";
import MemberDetails from "./MemberDetails";
import { useState } from "react";
// import CalDetails from "./CalDetails";
// import { leaderboardKPIs } from "@models/Event/Event";
// import { getRank } from "./utils";
// import SpeedDetails from "./SpeedDetails";
// import DistanceDetails from "./DistanceDetails";
import { Prize } from "@models/Prizes/Prize";
// import PrizeDetails from "./PrizeDetails";
import PointsDetails from "./PointsDetails";
import { profileClick } from "@analytics/click/wrappers";
// import { leaderboardWeekTypes } from "@hooks/community/useCommunityParams";

interface Props {
  name?: string;

  profileImage?: CloudinaryMedia | AWSMedia;
  rank?: number;
  avgSpeedRank?: number;
  streakRank?: number;
  avgSpeed?: number;
  distance?: number;
  distanceRank?: number;
  numStreaks?: number;
  // scoreMinCal?: number;
  // calories?: number;

  fitPointsV2: number;
  userKey?: string;
  userLevel?: number;

  teamName?: string;
  teamKey?: string;

  // lastTotalCalories?: number;
  activities?: number;
  coachKey?: string;
  coachEventId?: string;
  coachCohortId?: string;
  numTransformations?: number;
  type?: "coach";
  onStreak?: boolean;
  dayCalObj?: { [day: string]: number };
  dayPointObj?: { [day: string]: number };
  savedList: string[];
  // selectedLeaderboard?: leaderboardKPIs;
  // onProfileNameClick: (uid: string) => void;
  uid: string;
  highlighted?: boolean;
  // globalPrizes?: Prize[];
  weeklyPrizes?: Prize[];
  // leaderboardWeek?: leaderboardWeekTypes;
  // visibleState: "calories" | "minCalScore";
}

const MemberV3: React.FC<Props> = ({
  name,
  profileImage,
  rank,
  // calories,
  userKey,
  numStreaks,
  // lastTotalCalories,
  // selectedLeaderboard,
  highlighted,
  // scoreMinCal,
  coachKey,
  coachEventId,
  coachCohortId,
  numTransformations,
  // globalPrizes,
  weeklyPrizes,
  dayCalObj,
  savedList,
  avgSpeedRank,
  avgSpeed,
  distance,
  userLevel,
  streakRank,
  distanceRank,
  fitPointsV2,
  dayPointObj,
  teamName,
  teamKey,
  // onProfileNameClick,
  uid,
  // onStreak,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const onHide = () => setIsVisible(false);
  const onShow = () => {
    if (fitPointsV2 && savedList.length) {
      setIsVisible((prev) => !prev);
    }
  };

  // console.log("day", coachKey, teamName);

  return (
    <div
      className={clsx(
        highlighted
          ? "bg-white shadow-xl border-2 border-blue-500 rounded-md"
          : "shadow-sm hover:shadow-md bg-gray-50 border",
        "px-4 py-4"
      )}
    >
      <div className={clsx("flex items-center w-full justify-between")}>
        <div className="flex items-start">
          <div className="pr-0">
            <p className="text-gray-500 text-xl font-bold">{rank}</p>
          </div>

          <div className="pl-2">
            <div className="flex">
              <div className="flex-none hidden pixelXl:block">
                <Link href={`/p/${uid}`}>
                  <UserPhoto
                    nameInvisible={true}
                    onImgClick={() => {
                      profileClick();
                    }}
                    // onImgClick={() => onProfileNameClick(uid)}
                    img={profileImage}
                    name={name ? name : userKey ? userKey : "Un named"}
                    size={"small"}
                  />
                </Link>
              </div>
              <div className="pl-2">
                <Link href={`/p/${uid}`}>
                  <p
                    // onClick={() => onProfileNameClick(uid)}
                    className={clsx(
                      "text-gray-700 text-left",
                      "text-xs sm:text-sm ",
                      "font-semibold",
                      "cursor-pointer",
                      "underline"
                      // size ? "text-xs line-clamp-1" : ""
                    )}
                  >
                    {name ? name : userKey ? userKey : "Unnamed"}
                  </p>
                </Link>

                <Link
                  href={
                    coachKey && teamKey
                      ? `/${coachKey}/${teamKey}`
                      : coachKey
                      ? `/pr/${coachKey}`
                      : `/pr/${teamKey}`
                  }

                  // ?eventId=${coachEventId}&cohortId=${
                  // coachCohortId ? coachCohortId : ""
                  // }`}
                >
                  <p
                    className={clsx(
                      "text-blue-500 text-left",
                      "text-xs font-normal underline"
                      // size ? "text-xs line-clamp-1" : ""
                    )}
                  >
                    {teamName ? teamName : coachKey}
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="pl-2 flex flex-col justify-center items-center">
          <PointsDetails
            onShow={onShow}
            userLevel={userLevel}
            points={fitPointsV2}
            // scoreMinCal={
            //   numTransformations ? numTransformations : scoreMinCal
            // }
            isVisible={isVisible}
            // visibleType={visibleState}
            isExpandable={
              fitPointsV2 && fitPointsV2 > 0 && savedList.length ? true : false
            }
          />
          {/* <ArrowUpDown
            calories={calories}
            lastTotalCalories={lastTotalCalories}
          /> */}
        </div>
      </div>

      {/* <div className="pt-2">
        <PrizeDetails weeklyPrizes={weeklyPrizes} />
      </div> */}

      {/**SHUBHAM - TO DO MARCH 7th */}
      {isVisible ? (
        <div className="pt-2">
          <MemberDetails
            // isVisble={true}
            // userLevel={userLevel}
            onHide={onHide}
            savedList={savedList}
            dayCalObj={dayPointObj}
          />
        </div>
      ) : null}

      {/* <div className="py-2">
        <Divider />
      </div> */}
    </div>
  );
};

export default MemberV3;

/*
users -> activities

sortOn createdOn "desc"
limit = 6
Activity {
  calories
  fitpoints
  createdOn

  taskId
  streamId
  postRef
}

Promise.all()

-> Task, Post

Task {
  name
  taskBy: // Add to form
}



*/
