import { sectionTypes } from "../hooks/useSection";
import JoinBoatWrapper from "./JoinBoatWrapper";
import OnboardPeriodClaender from "./OnboardPeriodCalender";
import { usePeriodCycles } from "@providers/period/hooks/usePeriodCycles";
import { usePeriodDatesForUser } from "@providers/period/hooks/usePeriodDatesForUser";
import OnboardPeriodSave from "./OnboardPeriodSave";
import { ColorValue, Text } from "react-native";

interface Props {
  onSkip?: () => void;
  onSaveAndNext: (
    sec: sectionTypes,
    periodLength?: number,
    cycleLength?: number,
    sleepLength?: number
  ) => Promise<void>;
  title: string;
  highlightedTitle: string;
  highlightedColor: ColorValue;
  progress: number;
  target: "markLastPeriod" | "markBeforeLastPeriod";
}

const PeriodCalenderWithJoinBoatWrapper: React.FC<Props> = ({
  onSkip,
  onSaveAndNext,
  title,
  highlightedTitle,
  highlightedColor,
  progress,
  target,
}) => {
  usePeriodCycles();
  usePeriodDatesForUser();
  const splidedTitle = `__${title}__`.split(highlightedTitle);

  return (
    <JoinBoatWrapper key="markLastPeriod" progress={progress} onSkip={onSkip}>
      <Text
        className="text-[#F1F1F1] text-xl px-4"
        style={{ fontFamily: "Nunito-Bold" }}
      >
        {splidedTitle[0].replaceAll("__", "")}
        <Text style={{ color: highlightedColor }}>
          {` ${highlightedTitle} `}
        </Text>
        {splidedTitle[1].replaceAll("__", "")}
      </Text>

      <OnboardPeriodClaender
        beforeLastPeriod={target === "markBeforeLastPeriod"}
        highlightedColor={highlightedColor}
      />

      <OnboardPeriodSave
        target={target}
        onSaveAndNext={onSaveAndNext}
        noteText={
          target === "markLastPeriod"
            ? "Add atleast one period date to proceed further"
            : "Add one more period dates from your last period to proceed further"
        }
        noteTextColor={highlightedColor}
      />
    </JoinBoatWrapper>
  );
};

export default PeriodCalenderWithJoinBoatWrapper;
