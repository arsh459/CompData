// import { weEventTrack } from "@analytics/webengage/user/userLog";
import { SBPrize } from "@models/Prizes/PrizeV2";
import MediaTile from "@templates/listing/HeaderImage/MediaTile";
import clsx from "clsx";
import { useState } from "react";
import { getHeight } from "../../getAspectRatio";
import PrizesModal from "./PrizesModal";

interface Props {
  prizes: SBPrize[];
  badgeName: string;
  isGoalWidget?: boolean;
}

const AllPrizes: React.FC<Props> = ({ prizes, badgeName, isGoalWidget }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <div
        className={clsx(
          isGoalWidget ? "p-1 iphoneX:p-2" : "p-2 iphoneX:p-4",
          "min-h-[80px] iphoneX:min-h-[100px] flex justify-evenly items-center rounded-xl bg-gradient-to-b from-[#242424] via-[#262626] to-[#1A1A1A] overflow-hidden relative z-0"
        )}
      >
        {prizes.map((each, index) => (
          <div
            key={`${each.name}-${index}`}
            className={clsx(
              prizes.length === 1
                ? "flex items-center justify-between w-full"
                : ""
            )}
          >
            <div
              className={clsx(
                isGoalWidget
                  ? "max-w-[60px] iphoneX:max-w-[80px] m-1"
                  : "max-w-[80px] iphoneX:max-w-[100px] m-2",
                "relative z-0"
              )}
            >
              <MediaTile
                media={each.media}
                alt="media"
                width={400}
                height={getHeight(each.media, 400)}
                rounded
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#6AA0D1] to-[#5FABC2] blur-lg" />
            </div>
            {prizes.length === 1 ? (
              <div className="flex-1 ml-4 text-sm iphoneX:text-base">
                <p className="text-white font-medium">{each.name}</p>
                <p className="text-gray-50">{each.description}</p>
              </div>
            ) : null}
          </div>
        ))}
        {prizes.length > 1 ? (
          <div className="absolute inset-0 z-10 flex bg-gradient-to-b from-[#242424]/25 via-[#262626]/25 to-[#1A1A1A]/25 backdrop-blur justify-center items-center">
            <button
              className={clsx(
                "bg-gradient-to-r from-[#6AA0D1]/75 to-[#5FABC2]/75 rounded-md",
                isGoalWidget
                  ? "text-[10px] xs:text-xs iphoneX:text-sm px-2.5 py-1"
                  : "text-sm iphoneX:text-base px-4 py-2"
              )}
              onClick={() => setIsOpen(true)}
            >
              View All Rewards
            </button>
          </div>
        ) : null}
      </div>
      <PrizesModal isOpen={isOpen} setIsOpen={setIsOpen} prizes={prizes} />
    </>
  );
};

export default AllPrizes;
