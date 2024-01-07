import {
  CurrentBodyTypeArr,
  BodyTypeData,
  getEvolutionBodyType,
} from "@constants/Avatar/BodyTypeData";
import { BodyTypesId, EvolutionBodyType } from "@constants/Avatar/utils";
import SelectBodyType from "@modules/JoinBoatMainV3/components/SelectBodyType";
import { useEffect, useState } from "react";
import JoinBoatWrapper from "./JoinBoatWrapper";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";
import { difficulty } from "@models/User/User";

export interface OnSaveBodyTypeProps {
  prevBodyType?: BodyTypesId;
  currBodyType?: BodyTypesId;
  level?: difficulty;
  pace?: number;
}

interface Props {
  onBodyTypeSave: (val: OnSaveBodyTypeProps) => void;
  title?: string;
  progress: number;
  target: "currentBodyType" | "desiredBodyType";
}

const SelectBodyTypeWithJoinBoatWrapper: React.FC<Props> = ({
  onBodyTypeSave,
  title,
  progress,
  target,
}) => {
  const [targetBodyTypeArr, setTargetBodyTypeArr] =
    useState<EvolutionBodyType[]>();
  const [currentActiveIndex, setCurrentActiveIndex] = useState<number>(0);
  const [bodyType, setBodyType] = useState<BodyTypesId>();

  const { currentBodyTypeDB, desiredBodyTypeDB, genderDB } = useUserStore(
    (state) => {
      return {
        currentBodyTypeDB: state.user && state.user.currentBodyType,
        desiredBodyTypeDB: state.user && state.user.desiredBodyType,
        genderDB: state.user?.gender,
      };
    },
    shallow
  );

  // console.log("currentBodyTypeDB", currentBodyTypeDB);

  useEffect(() => {
    let remoteBodyTypeArr: EvolutionBodyType[] | undefined = undefined;
    let remoteBodyType: BodyTypesId | undefined = undefined;

    if (target === "currentBodyType") {
      remoteBodyTypeArr = CurrentBodyTypeArr.map((each: BodyTypesId) =>
        getEvolutionBodyType(each, {
          level: "Medium",
          duration: 6,
          achievementBodyType: "fit",
        })
      );
      if (currentBodyTypeDB) {
        remoteBodyType = currentBodyTypeDB;
      }
    } else if (target === "desiredBodyType") {
      remoteBodyTypeArr = BodyTypeData[
        currentBodyTypeDB || "mesomorph"
      ].evolution.map((each) =>
        getEvolutionBodyType(each.achievementBodyType, each)
      );
      if (desiredBodyTypeDB) {
        remoteBodyType = desiredBodyTypeDB;
      }
    }

    if (remoteBodyTypeArr?.length) {
      setTargetBodyTypeArr(remoteBodyTypeArr);

      if (remoteBodyType) {
        const selected = remoteBodyTypeArr.findIndex(
          (each) => remoteBodyType === each.id
        );

        setCurrentActiveIndex(selected && selected !== -1 ? selected : 0);
        setBodyType(remoteBodyType);
      }
    }
  }, [currentBodyTypeDB, desiredBodyTypeDB, target]);

  useEffect(() => {
    if (targetBodyTypeArr && targetBodyTypeArr[currentActiveIndex])
      setBodyType(
        targetBodyTypeArr && targetBodyTypeArr[currentActiveIndex].id
      );
  }, [currentActiveIndex, targetBodyTypeArr]);

  // console.log("currentBodyTypeDB", currentBodyTypeDB);
  // console.log("bodyType", bodyType);

  const onSave = () => {
    if (target === "currentBodyType") {
      onBodyTypeSave({
        prevBodyType: currentBodyTypeDB,
        currBodyType: bodyType,
      });
    } else if (target === "desiredBodyType") {
      onBodyTypeSave({
        prevBodyType: desiredBodyTypeDB,
        currBodyType: bodyType,
        level: targetBodyTypeArr && targetBodyTypeArr[currentActiveIndex].level,
        pace:
          targetBodyTypeArr && targetBodyTypeArr[currentActiveIndex].duration,
      });
    }
  };

  return (
    <JoinBoatWrapper title={title} onNext={onSave} progress={progress}>
      {targetBodyTypeArr?.length ? (
        <SelectBodyType
          gender={genderDB}
          targetBodyTypeArr={targetBodyTypeArr}
          onCurrentIndexChange={setCurrentActiveIndex}
          currentActiveIndex={currentActiveIndex}
        />
      ) : null}
    </JoinBoatWrapper>
  );
};

export default SelectBodyTypeWithJoinBoatWrapper;
