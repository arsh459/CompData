import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { LiveClass } from "@models/Workouts/LiveClass";
import { NutritionPlan } from "@models/Workouts/NutritionPlan";
import { WorkoutSeries } from "@models/Workouts/Series";
import { Workout } from "@models/Workouts/Workout";
import { getHeight } from "@templates/community/Program/getAspectRatio";
import MediaTile from "@templates/listing/HeaderImage/MediaTile";
import NumberedList from "@templates/listing/NumberedList/NumberedList";
import { getBullet } from "./premUtils";

interface Props {
  name: string;
  series?: WorkoutSeries;
  dayActs: { [serId: string]: (Workout | NutritionPlan | LiveClass)[] };
  dayLives: { [serId: string]: (Workout | NutritionPlan | LiveClass)[] };
  dayNutrition: { [serId: string]: (Workout | NutritionPlan | LiveClass)[] };
  //   eventId: string;
}

const placeholderMedia = {
  width: 7072,
  height: 4720,
  resource_type: "image",
  public_id: "v1643009146/pexels-li-sun-2294361_wixzkg",
  path: "v1643009146/pexels-li-sun-2294361_wixzkg.jpg",
} as CloudinaryMedia;

const Premium: React.FC<Props> = ({
  name,
  series,
  dayActs,
  dayLives,
  dayNutrition,
}) => {
  return (
    <div className="overflow-y-scroll">
      {series?.thumbnail ? (
        <div className="pb-2">
          <MediaTile
            roundedString="md:rounded-lg"
            media={series.thumbnail}
            width={400}
            // heightString="max-h-48"
            height={getHeight(series.thumbnail, 400)}
            alt="media"
          />
        </div>
      ) : (
        <div className="pb-2">
          <MediaTile
            roundedString="md:rounded-lg"
            media={placeholderMedia}
            width={400}
            // heightString="max-h-48"
            height={getHeight(placeholderMedia, 400)}
            alt="media"
          />
        </div>
      )}
      <p className="text-gray-700 text-4xl md:text-2xl text-center font-bold italic">
        {series ? "PREMIUM ACCESS" : "JOIN THE GAME"}
      </p>
      <p className="text-gray-500 text-4xl md:text-2xl text-center italic font-medium">
        {name.toUpperCase()}
      </p>
      <div className="pt-4 px-2">
        <NumberedList
          heading=""
          paddingString="pb-4 md:pb-0"
          headingSeparateLine={true}
          listItems={getBullet(series, name, dayActs, dayLives, dayNutrition)}
          vertical={true}
          separator="none"
        />
      </div>
    </div>
  );
};

export default Premium;

// paid plan
