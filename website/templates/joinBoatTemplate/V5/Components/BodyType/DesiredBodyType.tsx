import {
  BodyTypeData,
  getEvolutionBodyType,
} from "@constants/Avatar/BodyTypeData";
import {
  BodyTypesId,
  EvolutionBodyType,
  evolutionType,
} from "@constants/Avatar/utils";
import { LocalUser } from "@models/User/User";
import { useEffect, useState } from "react";
import JoinBoatWrapperV2 from "../../JoinBoatWrapper";
import { difficulty } from "../SetPace";
import SelectBodyType from "./SelectBodyType";

interface Props {
  localUser: LocalUser | undefined;
  onDesiredBodyTypeUpdate: (
    id: BodyTypesId,
    level: difficulty,
    pace: number
  ) => void;
  onNext?: () => void;
  title?: string;
  current: number;
}

const DesiredBodyType: React.FC<Props> = ({
  localUser,
  onDesiredBodyTypeUpdate,
  onNext,
  title,
  current,
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

  return (
    <JoinBoatWrapperV2
      headText="Fitness scan"
      title={title}
      current={current}
      onNext={onNext}
      noSpace={true}
    >
      {targetBodyTypeArr.length && init ? (
        <SelectBodyType
          gender={localUser?.gender}
          targetBodyTypeArr={targetBodyTypeArr}
          onCurrentIndexChange={setCurrentActiveIndex}
          currentActiveIndex={currentActiveIndex}
          isDesired={true}
        />
      ) : null}
    </JoinBoatWrapperV2>
  );
};

export default DesiredBodyType;
