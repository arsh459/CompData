import { useEffect, useState } from "react";
import { getIntialHeight, getIntialWeight } from "./utils2";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";
import JoinBoatWrapper from "./JoinBoatWrapper";
import SetHeight from "./SetHeight";

interface Props {
  onHeightSave: (height?: number, weight?: number) => void;
  nextBtnText: string;
  progress?: number;
}

const SetHeightWithJoinBoatWrapper: React.FC<Props> = ({
  onHeightSave,
  nextBtnText,
  progress,
}) => {
  // console.log("RenderTest SetHeightWithJoinBoatWrapper");
  const [userHeight, onHeightUpdate] = useState<number>();

  const { weightDB, heightDB, genderDB, fitnessGoalDB } = useUserStore(
    (state) => {
      return {
        weightDB: state.user?.weight,
        heightDB: state.user?.height,
        genderDB: state.user?.gender,
        fitnessGoalDB: state.user?.fitnessGoal,
      };
    },
    shallow
  );

  useEffect(() => {
    onHeightUpdate(getIntialHeight(heightDB, genderDB));
  }, [heightDB, genderDB]);

  const handleSave = () => {
    onHeightSave(
      userHeight,
      getIntialWeight(weightDB, userHeight, genderDB, fitnessGoalDB)
    );
  };

  return (
    <JoinBoatWrapper
      nextBtnText={nextBtnText}
      title="What is your Current Height?"
      onNext={handleSave}
      disabled={!userHeight}
      progress={progress}
    >
      {typeof userHeight === "number" ? (
        <SetHeight
          initialValue={userHeight}
          onNumberFieldsUpdate={onHeightUpdate}
          gender={genderDB}
        />
      ) : null}
    </JoinBoatWrapper>
  );
};

export default SetHeightWithJoinBoatWrapper;
