import {
  BodyTypeData,
  getEvolutionBodyType,
} from "@constants/Avatar/BodyTypeData";
import {
  BodyTypesId,
  EvolutionBodyType,
  evolutionType,
} from "@constants/Avatar/utils";
import { LocalUser } from "@hooks/user/useLocalUserV2";
import JoinBoatWrapper from "@modules/JoinBoatMainV2/JoinBoatWrapper";
import { useEffect, useState } from "react";
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
  backOnDone?: boolean;
  title?: string;
  current: number;
}

const DesiredBodyType: React.FC<Props> = ({
  localUser,
  onDesiredBodyTypeUpdate,
  onNext,
  backOnDone,
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
    <JoinBoatWrapper
      headText="Fitness scan"
      title={title}
      current={current}
      onNext={onNext}
      backOnDone={backOnDone}
      disabled={!init}
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
    </JoinBoatWrapper>
  );
};

export default DesiredBodyType;
