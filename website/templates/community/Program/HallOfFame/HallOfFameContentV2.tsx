import { Prize } from "@models/Prizes/Prize";
import PrizeBadge from "@templates/community/PersonalKPIs/PrizeBadge";
import NextButton from "../NextButton";
// import { formatWithCommas } from "@utils/number";
import { getPrizeImgData } from "./utils";

interface Props {
  prizes: Prize[];
  nextExists: boolean;
  onNext: () => void;
  live: boolean;
}

const HallOfFameContentV2: React.FC<Props> = ({
  prizes,
  nextExists,
  onNext,
  live,
}) => {
  return (
    <div>
      <div className="p-2 bg-white rounded-lg shadow-sm">
        <div className="flex justify-center items-center">
          <p className="text-center text-lg text-gray-700 font-semibold">
            Hall of fame
          </p>

          {live ? (
            <div className="pl-2">
              <div className="px-2 py-1 bg-green-500 rounded-lg shadow-sm">
                <p className="text-sm text-white">Live</p>
              </div>
            </div>
          ) : null}
        </div>

        <div className="flex flex-wrap justify-evenly pt-4 overflow-x-auto hide-scrollbar">
          {prizes.map((item) => {
            const response = getPrizeImgData(
              item.prizeType,
              item.rank,
              item.awardedToName,
              item.isTeamAward
            );

            if (response)
              return (
                <div key={item.id} className="pb-8">
                  <PrizeBadge
                    img={response.img}
                    isAtStake={item.isAtStake}
                    text={response.name}
                    subtext={response.subtext ? response.subtext : ""}
                  />
                </div>
              );
          })}
        </div>

        {nextExists ? (
          <div className="bg-white w-full pb-4 md:pb-0">
            <NextButton onClick={onNext} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default HallOfFameContentV2;
