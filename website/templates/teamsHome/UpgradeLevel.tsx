import BadgeSelector from "@templates/community/Program/Prizes/PrizesV2/Badges/BadgeSelector";
import { badgeTypes } from "@models/Prizes/PrizeV2";
import clsx from "clsx";
import { useState } from "react";
import {
  POINTS_LEVEL_FIVE,
  POINTS_LEVEL_FOUR,
  POINTS_LEVEL_ONE,
  POINTS_LEVEL_THREE,
  POINTS_LEVEL_TWO,
} from "@constants/gameStats";
const levels: { [key: string]: number } = {
  level_1: 1,
  level_2: 2,
  level_3: 3,
  level_4: 4,
  level_5: 5,
};

const pointCalculations = (prop: number, activeFitPointsV2: number) => {
  const points: { [key: string]: number } = {
    1: POINTS_LEVEL_ONE,
    2: POINTS_LEVEL_TWO,

    3: POINTS_LEVEL_THREE,
    4: POINTS_LEVEL_FOUR,
    5: POINTS_LEVEL_FIVE,
  };

  const isCompleted = activeFitPointsV2 >= points[prop];
  const pointsToReachNextLevel = points[prop]
    ? points[prop] - activeFitPointsV2
    : 400;

  const result = {
    minimumPointsForSelectedLevel: points[prop],
    isCompleted,
    pointsToReachNextLevel,
  };

  return result;
};

interface Props {
  userLevelV2: number;

  activeFitPointsV2: number;
}

const UpgradeLevel: React.FC<Props> = ({
  userLevelV2,

  activeFitPointsV2,
}) => {
  const [selctedLvl, setSelctedLvl] = useState<number>(
    userLevelV2 !== 5 ? userLevelV2 + 1 : 5
  );
  const { minimumPointsForSelectedLevel, isCompleted, pointsToReachNextLevel } =
    pointCalculations(selctedLvl, activeFitPointsV2);

  const getWidthValue = (
    isCompleted: boolean,
    selctedLvl: number,
    userLevelV2: number,
    activeFitPointsV2: number,
    minimumPointsForSelectedLevel: number
  ) => {
    if (isCompleted) return 100;
    else {
      return (activeFitPointsV2 / minimumPointsForSelectedLevel) * 100;
    }
    // if (!isCompleted && selctedLvl === userLevelV2 + 1) {
    //   return (activeFitPointsV2 / minimumPointsForSelectedLevel) * 100;
    // }
    // if (!isCompleted && selctedLvl !== userLevelV2 + 1) {
    //   return 0;
    // }
  };
  return (
    <div className="rounded-xl border border-[#797979] my-6">
      <div className="flex items-center ml-4">
        {!isCompleted && selctedLvl !== userLevelV2 + 1 && (
          <img
            src="https://ik.imagekit.io/socialboat/level-lock_4nzgEf8YK.png?ik-sdk-version=javascript-1.4.3&updatedAt=1655752334299"
            alt="level-lock"
          />
        )}
        <h5 className="p-4 pl-2 text-[#DBDBDB] text-xl font-bold italic text-left">
          {isCompleted && `Your progress on level ${selctedLvl}`}
          {!isCompleted &&
            selctedLvl !== userLevelV2 + 1 &&
            ` Your level ${selctedLvl} is Locked`}
          {!isCompleted &&
            selctedLvl === userLevelV2 + 1 &&
            ` How to upgrade to level ${userLevelV2 + 1}`}
        </h5>
      </div>
      <div className="h-px bg-[#797979]" />
      {isCompleted && (
        <div className="flex p-4">
          <div className="rounded-xl w-20 font-extrabold text-2xl text-[#FAFAFA] bg-[#D9D9D9]/20 border border-[#797979] p-2">
            <h6 className="px-3 text-center">
              {isCompleted ? minimumPointsForSelectedLevel : activeFitPointsV2}
            </h6>
            <div className="my-1.5 h-px bg-[#797979]" />
            <h6 className="px-3 text-center">
              {minimumPointsForSelectedLevel}
            </h6>
          </div>
          <p className="flex-1 pl-4 text-lg text-white">
            You have successfully upgraded to level {selctedLvl}.
          </p>
        </div>
      )}
      {/* {!isCompleted && selctedLvl !== userLevelV2 + 1 && (
        <div className="flex items-center p-4">
          <p className="flex-1 pl-4 text-lg text-white">
            Complete Level {userLevelV2} progress to upgrade to level{" "}
            {selctedLvl} . Earn More than {pointsToReachNextLevel} Fitpoints to
            Unlock Level {selctedLvl}
          </p>
        </div>
      )} */}
      {!isCompleted && (
        <div className="flex p-4">
          <div className="rounded-xl w-20 font-extrabold text-2xl text-[#FAFAFA] bg-[#D9D9D9]/20 border border-[#797979] p-2">
            <h6 className="px-3 text-center">{activeFitPointsV2}</h6>
            <div className="my-1.5 h-px bg-[#797979]" />
            <h6 className="px-3 text-center">
              {minimumPointsForSelectedLevel}
            </h6>
          </div>
          <p className="flex-1 pl-4 text-lg text-white">
            You need {pointsToReachNextLevel} fitpoints to upgrade to next
            level. Do tasks in game to unlock it.
          </p>
        </div>
      )}
      <div className="px-4 py-2">
        <div className="rounded-full h-2 bg-[#494949] flex items-center">
          <div
            className="rounded-full h-1.5"
            style={{
              width: `${getWidthValue(
                isCompleted,
                selctedLvl,
                userLevelV2,
                activeFitPointsV2,
                minimumPointsForSelectedLevel
              )}%`,
              background: `linear-gradient(180deg, #F19C3A 0%, #CCAA33 100%)`,
            }}
          />
        </div>
        {isCompleted ? (
          <span className="text-[#C7C7C7] text-xs py-1.5 flex justify-end items-center">
            Completed
          </span>
        ) : (
          <p className="text-[#C7C7C7] text-xs py-1.5 flex justify-between items-center">
            {/* <p className="text-[#C7C7C7] text-xs py-1.5 "> */}
            <span>
              Lvl {userLevelV2 >= selctedLvl ? selctedLvl : userLevelV2}
            </span>
            {/* <span className="flex justify-center text-center">locked</span> */}
            <span>Lvl {selctedLvl}</span>
          </p>
        )}
        {/* {!isCompleted && selctedLvl !== userLevelV2 + 1 && (
          
          <p className="text-[#C7C7C7] text-xs py-1.5 ">
            
            <span className="flex justify-center text-center">
              Lvl is Locked
            </span>
            
          </p>
        )}
        {!isCompleted && selctedLvl === userLevelV2 + 1 && (
          <p className="text-[#C7C7C7] text-xs py-1.5 flex justify-between items-center">
            
            <span>Lvl {selctedLvl}</span>
            
            <span>Lvl {selctedLvl !== 5 && selctedLvl + 1}</span>
          </p>
        )} */}
      </div>
      <div className="bg-[#1F1F1F] rounded-xl flex justify-evenly items-center m-2 p-2">
        {Object.keys(levels).map((key) => {
          const temp = key as badgeTypes;
          return (
            <div
              key={key}
              className="flex flex-col items-center justify-center cursor-pointer"
              onClick={() => setSelctedLvl(levels[temp])}
            >
              <div
                className={clsx(
                  "p-1 relative z-0",
                  levels[temp] === selctedLvl ? "scale-125" : ""
                )}
              >
                <BadgeSelector
                  badgeType={temp}
                  effect={levels[temp] === selctedLvl ? "glow" : undefined}
                />

                {/* {levels[temp] > userLevelV2 + 1 ? (
                  <div className="absolute inset-0 z-10 bg-[#222222]/80 flex justify-center items-center">
                    <img
                      src={`https://ik.imagekit.io/socialboat/Vector_nnH-xeI9o.png?ik-sdk-version=javascript-1.4.3&updatedAt=1655298082436`}
                      className="w-3"
                      alt="lock icon"
                    />
                  </div>
                ) : null} */}
              </div>
              <span
                className={clsx(
                  "capitalize text-[10px] text-[#6B6B6B]",
                  levels[temp] === selctedLvl ? "pt-2" : ""
                )}
              >
                Level {levels[temp]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UpgradeLevel;
