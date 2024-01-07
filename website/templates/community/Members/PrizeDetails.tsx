import { Prize } from "@models/Prizes/Prize";
import Medal from "./Medal";
import { getWeekString } from "./utils";

interface Props {
  //   globalPrizes?: Prize[];
  weeklyPrizes?: Prize[];
}

const PrizeDetails: React.FC<Props> = ({ weeklyPrizes }) => {
  // console.log("weeklyPrizes", weeklyPrizes);
  return (
    <div className="flex">
      {/* {globalPrizes?.map((item) => {
        return (
          <div key={item.id} className="pr-4">
            <Medal position={item.rank} text={"overall"} />
          </div>
        );
      })} */}
      {weeklyPrizes?.map((item) => {
        if (!item.isTeamAward)
          return (
            <div key={item.id}>
              <Medal
                position={item.rank}
                text={item.week ? `${getWeekString(item.week)}` : ""}
              />
            </div>
          );
      })}
    </div>
  );
};

export default PrizeDetails;
