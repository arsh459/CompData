import { viewTypes } from "@hooks/community/v2/useCommunityParamsV3";
import InfoBtn from "@components/InfoBtn";
import clsx from "clsx";
import CloseBtn from "../Program/Feed/CloseBtn";
// import { UserRank } from "@models/Activities/Activity";
import { getProgressParams } from "./utils";

interface Props {
  viewType?: viewTypes;
  openModal?: () => void;
  onCloseModal?: () => void;
  // myUserRank?: UserRank;
  // currentRank?: number;
  activeRank?: number | string;
  activeTeamRank?: number | string;
  comptitionRank?: number | string;
  myPoints?: number;
  teamPts?: number;
  competitionPts?: number;
}

const LevelUp: React.FC<Props> = ({
  viewType,
  openModal,
  onCloseModal,
  activeRank,
  activeTeamRank,
  comptitionRank,
  myPoints,
  teamPts,
  competitionPts,
}) => {
  const { start, diff, percent } = getProgressParams(
    viewType,
    activeRank,
    activeTeamRank,
    myPoints,
    teamPts,
    competitionPts
  );

  return (
    <>
      <div
        className={clsx(
          "text-white px-4 py-2.5 rounded-2xl",
          viewType === "players"
            ? "bg-gradient-to-b from-[#0A568C] to-[#002D4D]"
            : "bg-gradient-to-b from-[#B54963] to-[#5C0014]"
        )}
      >
        <div className="flex justify-between items-center">
          <h4 className="text-lg iphoneX:text-2xl font-extrabold">
            How can I win?
          </h4>
          {openModal ? <InfoBtn onClick={openModal} /> : null}
          {onCloseModal ? <CloseBtn onCloseModal={onCloseModal} /> : null}
        </div>
        {diff >= 0 ? (
          <>
            <div className="border border-white p-0.5 rounded-full my-8 relative">
              <div
                className="h-1.5 bg-white rounded-full"
                style={{ width: `${percent * 100}%` }}
              />
              <div className="absolute top-full left-0 right-0 flex justify-between items-center pt-1 iphoneX:text-lg font-extrabold">
                <span>#{start}</span>
                <span>#{comptitionRank}</span>
              </div>
            </div>
            <p className="text-center text-[10px] iphoneX:text-sm">
              Earn {diff} FP more to rank up
            </p>
          </>
        ) : (
          <div className="py-4">
            <p className="text-center text-xl">You have won a previous round</p>
            <p className="text-center text-gray-50 text-sm">
              Click on i button to play for the season
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default LevelUp;
