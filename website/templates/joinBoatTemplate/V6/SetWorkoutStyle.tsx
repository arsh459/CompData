import { workoutStyleTypes } from "@models/User/User";
import TickIcon from "@components/SvgIcons/TickIcon";

export const workoutStylesObject: Record<
  workoutStyleTypes,
  { key: workoutStyleTypes; text: string; img: string }
> = {
  Yoga: {
    key: "Yoga",
    text: "A mindful practice with body movements",
    img: "https://ik.imagekit.io/socialboat/Group%201000001147_gO1XMufas.png?updatedAt=1693044485786",
  },
  HIIT: {
    key: "HIIT",
    text: "An  Intense, efficient workouts with quick bursts of effort",
    img: "https://ik.imagekit.io/socialboat/Group%201000001149_PCEcykGX2.png?updatedAt=1693044485854",
  },
  Running: {
    key: "Running",
    text: "Helps increasing stamina and speed",
    img: "https://ik.imagekit.io/socialboat/Group%201000001151_H-XJqCq6d.png?updatedAt=1693044485819",
  },
};

interface Props {
  workoutStyle?: workoutStyleTypes;
  onWorkoutStyleClick: (val: workoutStyleTypes) => void;
}

const SetWorkoutStyle: React.FC<Props> = ({
  workoutStyle,
  onWorkoutStyleClick,
}) => {
  return (
    <div className="flex-1 sflex px-6">
      {Object.values(workoutStylesObject).map((each) => (
        <button
          key={each.key}
          onClick={() => onWorkoutStyleClick(each.key)}
          className="relative z-0 my-4"
        >
          <img
            src={each.img}
            className="w-full aspect-[305/320] object-contain"
          />

          <div className="absolute left-0 right-0 top-0 p-8">
            <p
              className="text-[#343150] text-base iphoneX:text-lg"
              style={{ fontFamily: "Nunito-SemiBold" }}
            >
              {each.key}
            </p>
            <div className="w-2 aspect-1" />
            <p
              className="text-[#343150] text-sm iphoneX:text-base"
              style={{ fontFamily: "Nunito-Regular" }}
            >
              {each.text}
            </p>
          </div>

          {workoutStyle === each.key ? (
            <div className="absolute -top-2 -right-2 w-8 aspect-1 bg-[#8F75FF] rounded-full">
              <TickIcon color="#FFFFFF" />
            </div>
          ) : null}
        </button>
      ))}
    </div>
  );
};

export default SetWorkoutStyle;
