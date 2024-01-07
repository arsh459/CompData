import {
  BodyTypeData,
  getEvolutionBodyType,
} from "@constants/Avatar/BodyTypeData";
import {
  BodyTypesId,
  EvolutionBodyType,
  evolutionType,
} from "@constants/Avatar/utils";
import SelectBodyType from "@modules/JoinBoatMainV2/Components/BodyType/SelectBodyType";
import { difficulty } from "@modules/JoinBoatMainV2/Components/SetPace";
import { useEffect, useState } from "react";
import { LocalUser } from "../interface/localuser";
import JoinBoatWrapper from "./JoinBoatWrapper";

interface Props {
  localUser: LocalUser | undefined;
  onDesiredBodyTypeUpdate: (
    id: BodyTypesId,
    level: difficulty,
    pace: number
  ) => void;
  onDesiredBodyTypeSave: (
    id?: BodyTypesId,
    level?: difficulty,
    pace?: number
  ) => void;
  title?: string;
  progress: number;
}

const DesiredBodyType: React.FC<Props> = ({
  localUser,
  onDesiredBodyTypeUpdate,
  onDesiredBodyTypeSave,
  title,
  progress,
}) => {
  const [init, setInit] = useState<boolean>(false);
  const [targetBodyTypeArr, setTargetBodyTypeArr] = useState<
    EvolutionBodyType[]
  >([]);
  const [currentActiveIndex, setCurrentActiveIndex] = useState<number>(0);

  useEffect(() => {
    if (localUser?.currentBodyType) {
      setTargetBodyTypeArr(
        BodyTypeData[localUser.currentBodyType].evolution.map(
          (each: evolutionType) =>
            getEvolutionBodyType(each.achievementBodyType, each)
        )
      );
    }
  }, [localUser?.currentBodyType]);

  useEffect(() => {
    if (!init && targetBodyTypeArr.length) {
      const selected = targetBodyTypeArr.findIndex(
        (each) => localUser?.desiredBodyType === each.id
      );
      setCurrentActiveIndex(() => {
        setInit(true);
        return selected !== -1 ? selected : 0;
      });
    }
  }, [localUser?.desiredBodyType, targetBodyTypeArr, init]);

  useEffect(() => {
    if (targetBodyTypeArr.length && init) {
      onDesiredBodyTypeUpdate(
        targetBodyTypeArr[currentActiveIndex].id,
        targetBodyTypeArr[currentActiveIndex].level,
        targetBodyTypeArr[currentActiveIndex].duration
      );
    }
  }, [init, currentActiveIndex, targetBodyTypeArr, onDesiredBodyTypeUpdate]);

  const onSave = () => {
    onDesiredBodyTypeSave(
      targetBodyTypeArr[currentActiveIndex].id,
      targetBodyTypeArr[currentActiveIndex].level,
      targetBodyTypeArr[currentActiveIndex].duration
    );
  };

  return (
    <JoinBoatWrapper title={title} onNext={onSave} progress={progress}>
      {targetBodyTypeArr.length && init ? (
        <SelectBodyType
          gender={localUser?.gender}
          targetBodyTypeArr={targetBodyTypeArr}
          onCurrentIndexChange={setCurrentActiveIndex}
          currentActiveIndex={currentActiveIndex}
          isDesired={true}
        />
      ) : null}
    </JoinBoatWrapper>
  );
};

export default DesiredBodyType;
