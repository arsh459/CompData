import { useMyPrizes } from "@hooks/activities/useMyPrizes";
// import { UserRank } from "@models/Activities/Activity";
import { getPrizeImgData } from "../Program/HallOfFame/utils";
import NextButton from "../Program/NextButton";
import PrizeBadge from "./PrizeBadge";
// import { getPrizeImage } from "./utils";

interface Props {
  uid: string;
  noHeading?: boolean;
}

const PrizesCarousel: React.FC<Props> = ({ uid, noHeading }) => {
  const { prizes, nextExists, onNext } = useMyPrizes(uid);

  // console.log("prizes", prizes);

  return (
    <div>
      {noHeading ? null : (
        <div className="">
          <p className="text-center text-gray-700 text-2xl font-medium">
            Awards
          </p>
        </div>
      )}
      <div>
        {prizes.length === 0 ? (
          <div className="flex flex-col justify-center items-center pt-8">
            <img
              src="https://img.icons8.com/color/96/000000/lazy.png"
              className="w-36 h-46 object-cover"
            />
            <p className="text-center text-xl text-gray-700">
              There are no prizes as of now
            </p>
            <p className="text-center text-base text-gray-500">
              Come back after some time!
            </p>
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
              <div key={item.id} className="pb-4">
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
        <div className="px-8 w-full">
          <div className="bg-white">
            <NextButton onClick={onNext} />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default PrizesCarousel;
