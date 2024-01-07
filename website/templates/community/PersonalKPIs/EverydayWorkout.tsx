import { useCalendarView } from "@hooks/activities/useCalendarView";
import { UserRank } from "@models/Activities/Activity";
import { useState } from "react";
import NextButton from "../Program/NextButton";
import ActivityHolder from "./ActivityHolder";

interface Props {
  // activities: number[];
  myUserRank?: UserRank;
  savedList: string[];
  challengeLength?: number;
  after?: number;
}

const EverydayWorkout: React.FC<Props> = ({
  // activities,
  myUserRank,
  challengeLength,
  after,
}) => {
  const { savedList } = useCalendarView();
  const [viewable, setViewable] = useState<number>(9);
  const [nextExists, setNextExists] = useState<boolean>(true);

  const onNext = () => {
    if (viewable < savedList.length) {
      setViewable((prev) => prev + 9);
    } else {
      setNextExists(false);
    }
  };
  return (
    <div className="flex justify-evenly items-center flex-wrap">
      {savedList.map((item, index) => {
        if (index < viewable)
          return (
            <ActivityHolder
              day={index + 1}
              dateString={item.label}
              cal={myUserRank?.dayCalObj ? myUserRank?.dayCalObj[item.key] : 0}
              key={`kpi-${index}`}
            />
          );
      })}

      {nextExists ? (
        <div className="bg-white w-full pb-4 md:pb-0">
          <NextButton onClick={onNext} />
        </div>
      ) : null}
    </div>
  );
};

export default EverydayWorkout;
