import { useEffect, useState } from "react";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";
import JoinBoatWrapper from "./JoinBoatWrapper";
import SetSleep from "./SetSleep";

interface Props {
  onSleepSave: (val?: number) => void;
  nextBtnText: string;
  progress?: number;
}

const SetSleepWithJoinBoatWrapper: React.FC<Props> = ({
  onSleepSave,
  nextBtnText,
  progress,
}) => {
  // console.log("RenderTest SetSleepWithJoinBoatWrapper");
  const [sleepQuality, onSleepQualityUpdate] = useState<number>();

  const sleepQualityDB = useUserStore(
    (state) => state.user?.sleepQuality,
    shallow
  );

  useEffect(() => {
    onSleepQualityUpdate(sleepQualityDB || 7);
  }, [sleepQualityDB]);

  return (
    <JoinBoatWrapper
      onNext={() => onSleepSave(sleepQuality)}
      title="How many hours do you sleep in a day?"
      disabled={!sleepQuality}
      nextBtnText={nextBtnText}
      progress={progress}
    >
      {sleepQuality ? (
        <SetSleep target={sleepQuality} onChange={onSleepQualityUpdate} />
      ) : null}
    </JoinBoatWrapper>
  );
};

export default SetSleepWithJoinBoatWrapper;
