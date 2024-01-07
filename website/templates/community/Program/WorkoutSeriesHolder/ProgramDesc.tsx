import { WorkoutSeries } from "@models/Workouts/Series";
import { Link } from "@mui/material";
import MoreText from "@components/MoreText/MoreText";

interface Props {
  currSeries: WorkoutSeries;
  enrolled?: boolean;
  isOwner?: boolean;
}

const ProgramDesc: React.FC<Props> = ({ currSeries, enrolled, isOwner }) => {
  return (
    <div>
      {!enrolled && currSeries.cost > 0 ? (
        <div className="flex">
          <Link href={`/workout/${currSeries.seriesKey}`}>
            <div className="flex items-center cursor-pointer">
              <div className="pr-1">
                <p className="text-sm text-gray-700 underline">Buy for</p>
              </div>

              <p className="text-orange-500 text-sm font-semibold underline">
                ₹{currSeries.cost}
              </p>
              <p className="text-sm text-gray-700 font-semibold px-1 underline">
                / program
              </p>
            </div>
          </Link>
        </div>
      ) : null}

      <div>
        <MoreText text={currSeries.description} numChars={120} />
        {/* <p className="text-gray-500 text-sm line-clamp-3">
          {currSeries.description}
        </p> */}
        {/* {isOwner ? (
          <div className="flex">
            <Link href={`/createSeries?id=${currSeries?.id}`}>
              <p className="text-sm font-semibold text-orange-500 underline cursor-pointer">
                Edit Program
              </p>
            </Link>
          </div>
        ) : null} */}
      </div>
    </div>
  );
};

export default ProgramDesc;
