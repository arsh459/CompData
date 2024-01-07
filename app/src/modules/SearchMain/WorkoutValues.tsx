import TextBetween from "@components/TextBetween/TextBetween";
import {
  dumbbellIcon,
  forkIconWhiteFrame16,
  springIconWhiteFrame16,
  timeIconWhiteFrame16,
} from "@constants/imageKitURL";
import { cardTypeSearch } from "./TaskCard";
interface Props {
  equipmentNeeded?: string;
  kcal?: number;
  fitpoints?: number;
  durationMinutes?: number;
  cardType?: cardTypeSearch;
}
const WorkoutValues: React.FC<Props> = ({
  equipmentNeeded,
  kcal,
  fitpoints,
  durationMinutes,
  cardType,
}) => {
  return (
    <>
      {cardType === "workout" ? (
        <>
          {equipmentNeeded ? (
            <TextBetween
              imgStr={dumbbellIcon}
              textRight={equipmentNeeded}
              imgStyle={{ imgStyle: "w-3 aspect-square" }}
              containerStyle="flex-row-reverse justify-start items-center  self-start p-0 "
              textRightStyle="text-white text-xs iphoneX:text-sm leading-4 pt-1 pl-1.5"
            />
          ) : null}
          <TextBetween
            imgStr={springIconWhiteFrame16}
            textRight={`${fitpoints ? fitpoints : 0} Fp`}
            imgStyle={{ imgStyle: "w-3 aspect-square" }}
            containerStyle="flex-row-reverse justify-start items-center  self-start p-0 "
            textRightStyle="text-white text-xs iphoneX:text-sm leading-4 pt-1 pl-1.5"
          />
        </>
      ) : null}
      {cardType === "nutrition" ? (
        <TextBetween
          imgStr={forkIconWhiteFrame16}
          textRight={`${kcal ? kcal : 0} kcal`}
          imgStyle={{ imgStyle: "w-3 aspect-square" }}
          containerStyle="flex-row-reverse justify-start items-center  self-start p-0 "
          textRightStyle="text-white text-xs iphoneX:text-sm leading-4 pt-1 pl-1.5"
        />
      ) : null}
      <TextBetween
        imgStr={timeIconWhiteFrame16}
        textRight={`${durationMinutes ? durationMinutes : "0"} min`}
        imgStyle={{ imgStyle: "w-3 aspect-square" }}
        containerStyle="flex-row-reverse justify-start items-center  self-start p-0 "
        textRightStyle="text-white text-xs iphoneX:text-sm leading-4 pt-1 pl-1.5"
      />
    </>
  );
};

export default WorkoutValues;
