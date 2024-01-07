// import { useChallengeSeriesOnly } from "@hooks/workouts/useChallengeSeriesOnly";
import ExerciseHolder from "@templates/community/workouts/ExerciseHolder";

interface Props {
  //   eventId: string;
  eventSeriesIds: string[];
  onPreviewClick: () => void;
  leaderKey: string;
  eventKey: string;
}

const SeriesPreview: React.FC<Props> = ({
  eventSeriesIds,
  onPreviewClick,
  leaderKey,
  eventKey,
}) => {
  //   const { eventSeriesIds } = useChallengeSeriesOnly(eventId);

  //   const { listItems } = useSeriesCombined(seriesId);

  // const { workouts } = useSeriesWorkouts(seriesId);
  // const {nutritionPlans} = useSeriesNutritionPlans(seriesId);

  // console.log("workouts", workouts);

  return (
    <div className=" pt-0 shadow-sm">
      {eventSeriesIds.length > 0 ? (
        <ExerciseHolder
          seriesId={eventSeriesIds[0]}
          seriesKey=""
          enrolled={false}
          authRequest={() => {}}
          preview={true}
          onPreviewClick={onPreviewClick}
          leaderKey={leaderKey}
          eventKey={eventKey}
        />
      ) : null}
    </div>
  );
};

export default SeriesPreview;
