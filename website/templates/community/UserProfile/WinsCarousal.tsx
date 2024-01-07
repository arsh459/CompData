import { useMyPrizes } from "@hooks/activities/useMyPrizes";
import PrizeBadge from "../PersonalKPIs/PrizeBadge";
import { getPrizeImgData } from "../Program/HallOfFame/utils";

interface Props {
  uid: string;
  color: string;
}

const WinsCarousal: React.FC<Props> = ({ uid, color }) => {
  const { prizes, nextExists, onNext, loading } = useMyPrizes(uid);

  //   console.log("prizes", prizes);

  return (
    <>
      {loading ? null : (
        <div className="p-4">
          <div className="pb-4">
            {prizes.length === 0 ? (
              <div className="flex flex-col justify-center items-center pt-8">
                <img
                  src="https://img.icons8.com/color/96/000000/lazy.png"
                  className="w-36 h-46 object-cover"
                />
                <p className="text-center text-xl text-gray-500">
                  There are no prizes as of now
                </p>
                <p className="text-center text-base text-gray-400">
                  Come back after some time!
                </p>
              </div>
            ) : null}
          </div>

          <div className="flex flex-wrap justify-evenly py-4 overflow-x-auto hide-scrollbar">
            {prizes.map((item) => {
              const response = getPrizeImgData(
                item.prizeType,
                item.rank,
                item.awardedToName,
                item.isTeamAward
              );

              //   console.log("res", response);

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
            <button
              onClick={onNext}
              className="w-full py-2 rounded-lg text-white"
              style={{ backgroundColor: color }}
            >
              Show More
            </button>
          ) : null}
        </div>
      )}
    </>
  );
};

export default WinsCarousal;
