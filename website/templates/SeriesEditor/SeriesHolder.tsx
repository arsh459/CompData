import Button from "@components/button";
import { WorkoutSeries } from "@models/Workouts/Series";
import SeriesCard from "./SeriesCard";

interface Props {
  series: WorkoutSeries[];
  onEdit: (newSeries: WorkoutSeries | undefined) => void;
  onDelete: (newSeries: WorkoutSeries) => void;
}

const SeriesHolder: React.FC<Props> = ({ series, onEdit, onDelete }) => {
  return (
    <div>
      <p className="text-3xl text-gray-700 font-semibold">Workout library</p>

      <div className="flex  pt-4">
        <Button
          onClick={() => onEdit(undefined)}
          className=""
          appearance="contained"
        >
          <p className="text-lg font-semibold text-white">New Series</p>
        </Button>
      </div>

      <div className="pt-8 flex-wrap flex">
        {series.map((item) => {
          return (
            <div key={item.id} className="pb-8 sm:pr-4 w-full sm:w-[240px]">
              <SeriesCard
                series={item}
                onEdit={() => onEdit(item)}
                onDelete={() => onDelete(item)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SeriesHolder;
