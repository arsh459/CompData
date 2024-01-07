import {
  CurrentBodyTypeArr,
  getEvolutionBodyType,
} from "@constants/Avatar/BodyTypeData";
import { BodyTypesId } from "@constants/Avatar/utils";
import { LocalUser } from "@models/User/User";
import { useEffect, useState } from "react";
import JoinBoatWrapperV2 from "../../JoinBoatWrapper";
import SelectBodyType from "./SelectBodyType";

const targetBodyTypeArr = CurrentBodyTypeArr.map((each: BodyTypesId) =>
  getEvolutionBodyType(each, {
    level: "Medium",
    duration: 6,
    achievementBodyType: "fit",
  })
);

interface Props {
  localUser: LocalUser | undefined;
  onCurrentBodyTypeUpdate: (val: BodyTypesId) => void;
  onNext?: () => void;
  title?: string;
  current: number;
}

const CurrentBodyType: React.FC<Props> = ({
  localUser,
  onCurrentBodyTypeUpdate,
  onNext,
  title,
  current,
}) => {
  const [currentActiveIndex, setCurrentActiveIndex] = useState<number>(() => {
    const selected = targetBodyTypeArr.findIndex(
      (each) => localUser?.currentBodyType === each.id
    );
    return selected !== -1 ? selected : 0;
  });

  useEffect(
    () => onCurrentBodyTypeUpdate(targetBodyTypeArr[currentActiveIndex].id),
    [currentActiveIndex, onCurrentBodyTypeUpdate]
  );

  return (
    <JoinBoatWrapperV2
      headText="Fitness scan"
      title={title}
      current={current}
      onNext={onNext}
      noSpace={true}
    >
      {targetBodyTypeArr.length ? (
        <SelectBodyType
          gender={localUser?.gender}
          targetBodyTypeArr={targetBodyTypeArr}
          onCurrentIndexChange={setCurrentActiveIndex}
          currentActiveIndex={currentActiveIndex}
        />
      ) : null}
    </JoinBoatWrapperV2>
  );
};

export default CurrentBodyType;
