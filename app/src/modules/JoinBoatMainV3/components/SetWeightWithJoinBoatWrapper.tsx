import JoinBoatWrapper from "./JoinBoatWrapper";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";
import {
  getEstimatedDesiredWeight,
  getIntialWeight,
} from "@modules/JoinBoatMainV3/components/utils2";
import { fitnessGoalTypes } from "@models/User/User";
import { useEffect, useState } from "react";
import SetWeightNew from "./SetWeightNew";

export interface WeightSaveInterface {
  weight?: number;
  goals?: fitnessGoalTypes[];
  desiredWeight?: number;
  cycleLength?: number;
}

interface Props {
  onWeightSave: (props: WeightSaveInterface) => void;
  title: string;
  nextBtnText: string;
  progress?: number;
  target: "weight" | "desiredWeight";
}

export const SetWeightWithJoinBoatWrapper: React.FC<Props> = ({
  onWeightSave,
  title,
  nextBtnText,
  progress,
  target,
}) => {
  // console.log("RenderTest SetWeightWithJoinBoatWrapper");
  const [weight, onWeightUpdate] = useState<number>();

  const { weightDB, fitnessGoalDB, heightDB, genderDB, cycleLengthDB } =
    useUserStore((state) => {
      return {
        weightDB: state.user && state.user[target],
        fitnessGoalDB: state.user?.fitnessGoal,
        heightDB: state.user?.height,
        genderDB: state.user?.gender,
        cycleLengthDB: state.user?.periodTrackerObj?.inputCycleLength,
      };
    }, shallow);

  useEffect(() => {
    onWeightUpdate(
      getIntialWeight(weightDB, heightDB, genderDB, fitnessGoalDB)
    );
  }, [weightDB, heightDB, genderDB, fitnessGoalDB]);

  const handleSave = () => {
    if (weight) {
      if (target === "weight") {
        onWeightSave({
          weight,
          goals: fitnessGoalDB,
          desiredWeight: getEstimatedDesiredWeight(weight, heightDB, genderDB),
          cycleLength: cycleLengthDB || 28,
        });
      } else {
        onWeightSave({ weight, goals: fitnessGoalDB });
      }
    }
  };

  // console.log("weight", weight);

  return (
    <JoinBoatWrapper
      nextBtnText={nextBtnText}
      title={title}
      onNext={handleSave}
      disabled={!weight}
      progress={progress}
    >
      {typeof weight === "number" ? (
        <SetWeightNew
          initialValue={weight}
          onNumberFieldsUpdate={onWeightUpdate}
          target={target}
        />
      ) : null}
    </JoinBoatWrapper>
  );
};

export default SetWeightWithJoinBoatWrapper;
