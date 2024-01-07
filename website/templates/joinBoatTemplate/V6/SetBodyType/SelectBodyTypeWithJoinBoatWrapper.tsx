import {
  CurrentBodyTypeArr,
  BodyTypeData,
  getEvolutionBodyType,
} from "@constants/Avatar/BodyTypeData";
import { BodyTypesId, EvolutionBodyType } from "@constants/Avatar/utils";
import { difficulty } from "@models/User/User";
import { useEffect, useState } from "react";
import JoinBoatWrapper from "../JoinBoatWrapper";
import SelectBodyType from "@templates/joinBoatTemplate/V5/Components/BodyType/SelectBodyType";

export interface OnSaveBodyTypeProps {
  newBodyType?: BodyTypesId;
  level?: difficulty;
  pace?: number;
}

interface Props {
  currentBodyTypeDB?: BodyTypesId;
  desiredBodyTypeDB?: BodyTypesId;
  onBodyTypeSave: (val: OnSaveBodyTypeProps) => void;
  title?: string;
  progress: number;
  target: "currentBodyType" | "desiredBodyType";
}

const SelectBodyTypeWithJoinBoatWrapper: React.FC<Props> = ({
  currentBodyTypeDB,
  desiredBodyTypeDB,
  onBodyTypeSave,
  title,
  progress,
  target,
}) => {
  const [targetBodyTypeArr, setTargetBodyTypeArr] =
    useState<EvolutionBodyType[]>();
  const [currentActiveIndex, setCurrentActiveIndex] = useState<number>(0);
  const [bodyType, setBodyType] = useState<BodyTypesId>();

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

  const onSave = () => {
    if (target === "currentBodyType") {
      onBodyTypeSave({
        newBodyType: bodyType,
      });
    } else if (target === "desiredBodyType") {
      onBodyTypeSave({
        newBodyType: bodyType,
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
          gender="female"
          targetBodyTypeArr={targetBodyTypeArr}
          onCurrentIndexChange={setCurrentActiveIndex}
          currentActiveIndex={currentActiveIndex}
        />
      ) : null}
    </JoinBoatWrapper>
  );
};

export default SelectBodyTypeWithJoinBoatWrapper;
