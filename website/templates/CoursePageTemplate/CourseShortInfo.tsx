import {
  paceIconWhiteFrame16,
  springIconWhiteFrame16,
} from "@constants/icons/iconURLs";
import { Badge } from "@models/Prizes/PrizeV2";
import IconAndText from "./IconAndText";

interface Props {
  badge?: Badge;
}
const CourseShortInfo: React.FC<Props> = ({ badge }) => {
  const fpTotal = badge?.workoutLevels?.reduce((acc, a) => {
    if (a.nbFitpoints) {
      acc += a.nbFitpoints;
    }
    return acc;
  }, 0);

  const wkts = badge?.workoutLevels?.reduce((acc, a) => {
    if (a.nbWorkouts) {
      acc += a.nbWorkouts;
    }
    return acc;
  }, 0);

  return (
    <div className="grid grid-cols-3 lg:grid-cols-6 px-4">
      <IconAndText imgUrl={springIconWhiteFrame16} text={`${fpTotal} FP`} />

      {badge?.difficulty ? (
        <IconAndText level={badge?.difficulty} text={badge?.difficulty} />
      ) : null}

      <IconAndText imgUrl={paceIconWhiteFrame16} text={`${wkts} Workouts`} />

      {badge?.constraints?.map((item, index) => {
        return (
          <IconAndText
            imgUrl={item.icon}
            text={item.text}
            key={`${item.text}_${index}`}
          />
        );
      })}
    </div>
  );
};

export default CourseShortInfo;
