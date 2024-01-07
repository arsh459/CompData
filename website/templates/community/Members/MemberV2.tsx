// import Divider from "@components/divider/Divider";
import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import clsx from "clsx";
import UserPhoto from "../Program/Feed/PostView/UserPhoto";
// import { Link } from "@mui/material";
// import { getCalString } from "./utils";
import { Link } from "@mui/material";
import ArrowUpDown from "./ArrowUpDown";
import MemberDetails from "./MemberDetails";
import { useState } from "react";
import CalDetails from "./CalDetails";
import { leaderboardKPIs } from "@models/Event/Event";
import { getRank } from "./utils";
import SpeedDetails from "./SpeedDetails";
import DistanceDetails from "./DistanceDetails";
import { Prize } from "@models/Prizes/Prize";
import PrizeDetails from "./PrizeDetails";
// import { leaderboardWeekTypes } from "@hooks/community/useCommunityParams";

interface Props {
  name?: string;
  profileImage?: CloudinaryMedia;
  rank?: number;
  avgSpeedRank?: number;
  streakRank?: number;
  avgSpeed?: number;
  distance?: number;
  distanceRank?: number;
  numStreaks?: number;
  scoreMinCal?: number;
  calories?: number;
  lastTotalCalories?: number;
  activities?: number;
  coachKey?: string;
  coachEventId?: string;
  coachCohortId?: string;
  numTransformations?: number;
  type?: "coach";
  onStreak?: boolean;
  dayCalObj?: { [day: string]: number };
  savedList: string[];
  selectedLeaderboard?: leaderboardKPIs;
  // onProfileNameClick: (uid: string) => void;
  uid: string;
  highlighted?: boolean;
  // globalPrizes?: Prize[];
  weeklyPrizes?: Prize[];
  // leaderboardWeek?: leaderboardWeekTypes;
  // visibleState: "calories" | "minCalScore";
}

const MemberV2: React.FC<Props> = ({
  name,
  profileImage,
  rank,
  calories,
  numStreaks,
  lastTotalCalories,
  selectedLeaderboard,
  highlighted,
  scoreMinCal,
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
  streakRank,
  distanceRank,
  // onProfileNameClick,
  uid,
  // onStreak,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const onHide = () => setIsVisible(false);
  const onShow = () => {
    if (calories && savedList.length) {
      setIsVisible((prev) => !prev);
    }
  };

  // console.log("highlighted", highlighted);

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
            <p className="text-gray-500 text-xl font-bold">
              {getRank(
                selectedLeaderboard ? selectedLeaderboard : "calories",
                rank,
                avgSpeedRank,
                streakRank,
                distanceRank
              )}
            </p>
          </div>

          <div className="pl-2">
            {name ? (
              <div className="flex">
                <div className="flex-none hidden pixelXl:block">
                  <Link href={`/p/${uid}`}>
                    <UserPhoto
                      nameInvisible={true}
                      onImgClick={() => {}}
                      // onImgClick={() => onProfileNameClick(uid)}
                      img={profileImage}
                      name={name}
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
                      {name}
                    </p>
                  </Link>

                  <Link
                    href={`/${coachKey}`}

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
                      {coachKey}
                    </p>
                  </Link>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <div className="pl-2 flex flex-col justify-center items-center">
          {/* {typeof numTransformations === "number" ? (
            <p
              className={clsx(
                "text-orange-500 text-center",
                "text-xs sm:text-sm"
              )}
            >
              {`${numTransformations ? numTransformations : 0} ${
                numTransformations > 1 ? "finishes" : "finish"
              }`}
            </p>
          ) : null} */}
          {selectedLeaderboard === "avgSpeed" ? (
            <SpeedDetails speed={avgSpeed} />
          ) : selectedLeaderboard === "distance" ? (
            <DistanceDetails distance={distance} />
          ) : selectedLeaderboard === "streak" ? (
            <>
              <CalDetails
                onShow={onShow}
                streaks={numStreaks}
                isVisible={isVisible}
                isExpandable={true}
                // visibleType={visibleState}
              />
              <ArrowUpDown
                calories={calories}
                lastTotalCalories={lastTotalCalories}
                // lastTotalCalories={34}
              />
            </>
          ) : (
            <>
              <CalDetails
                onShow={onShow}
                calories={calories}
                scoreMinCal={
                  numTransformations ? numTransformations : scoreMinCal
                }
                isVisible={isVisible}
                // visibleType={visibleState}
                isExpandable={
                  calories && calories > 0 && savedList.length ? true : false
                }
              />
              <ArrowUpDown
                calories={calories}
                // lastTotalCalories={344}
                lastTotalCalories={lastTotalCalories}
              />
            </>
          )}
        </div>
      </div>

      <div className="pt-2">
        <PrizeDetails weeklyPrizes={weeklyPrizes} />
      </div>

      {/**SHUBHAM - TO DO MARCH 7th */}
      {isVisible ? (
        <div className="pt-2">
          <MemberDetails
            // isVisble={true}

            onHide={onHide}
            savedList={savedList}
            dayCalObj={dayCalObj}
          />
        </div>
      ) : null}

      {/* <div className="py-2">
        <Divider />
      </div> */}
    </div>
  );
};

export default MemberV2;

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
