import { View } from "react-native";

import IconAndText from "./IconAndText";
import {
  paceIconWhiteFrame16,
  springIconWhiteFrame16,
} from "@constants/imageKitURL";
import { Badge } from "@models/Prizes/Prizes";
interface Props {
  badge?: Badge;
  type: "workout" | "nutrition";
}
const CourseShortInfo: React.FC<Props> = ({ badge, type }) => {
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
    <View className="flex flex-row flex-wrap px-2 py-4">
      <IconAndText imgUrl={springIconWhiteFrame16} text={`${fpTotal} FP`} />

      {badge?.difficulty ? (
        <IconAndText level={badge?.difficulty} text={badge?.difficulty} />
      ) : null}

      <IconAndText
        imgUrl={paceIconWhiteFrame16}
        text={`${wkts} ${type === "nutrition" ? "Meals" : "Workouts"}`}
      />

      {badge?.constraints?.map((item, index) => {
        return (
          <IconAndText
            imgUrl={item.icon}
            text={item.text}
            key={`${item.text}_${index}`}
          />
        );
      })}
    </View>
  );
};

export default CourseShortInfo;
