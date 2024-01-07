import { useEffect, useState } from "react";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";
import JoinBoatWrapper from "./JoinBoatWrapper";
import SetLength from "./SetLength";
import { ColorValue } from "react-native";

interface Props {
  onLengthSave: (val1?: number, val2?: number) => void;
  nextBtnText: string;
  progress?: number;
  title: string;
  highlightedTitle: string;
  highlightedColor: ColorValue;
  currentText: string;
  isCycle?: boolean;
  isIrregulerCycle?: boolean;
}

const SetLengthWithJoinBoatWrapper: React.FC<Props> = ({
  onLengthSave,
  nextBtnText,
  progress,
  title,
  highlightedTitle,
  highlightedColor,
  currentText,
  isCycle,
  isIrregulerCycle,
}) => {
  // console.log("RenderTest SetLengthWithJoinBoatWrapper");
  const [length, onLengthChange] = useState<number>();

  const { cycleLengthDB, periodLengthDB, sleepQualityDB } = useUserStore(
    (state) => {
      return {
        cycleLengthDB: state.user?.periodTrackerObj?.inputCycleLength,
        periodLengthDB: state.user?.periodTrackerObj?.inputPeriodLength,
        sleepQualityDB: state.user?.sleepQuality,
      };
    },
    shallow
  );

  // console.log("length", length);

  useEffect(() => {
    if (isCycle) {
      onLengthChange(cycleLengthDB || 28);
    } else {
      onLengthChange(periodLengthDB || 5);
    }
  }, [cycleLengthDB, periodLengthDB, isCycle]);

  const handleSave = () => {
    if (isCycle) {
      onLengthSave(length, periodLengthDB || 5);
    } else {
      onLengthSave(length, sleepQualityDB || 7);
    }
  };

  return (
    <JoinBoatWrapper
      nextBtnText={nextBtnText}
      onNext={handleSave}
      disabled={!length}
      progress={progress}
    >
      {typeof length === "number" ? (
        <SetLength
          target={length}
          onChange={onLengthChange}
          title={title}
          highlightedTitle={highlightedTitle}
          highlightedColor={highlightedColor}
          currentText={currentText}
          isCycle={isCycle}
          isIrregulerCycle={isIrregulerCycle}
        />
      ) : null}
    </JoinBoatWrapper>
  );
};

export default SetLengthWithJoinBoatWrapper;
