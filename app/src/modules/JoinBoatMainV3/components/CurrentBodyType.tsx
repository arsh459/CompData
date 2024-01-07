import {
  CurrentBodyTypeArr,
  getEvolutionBodyType,
} from "@constants/Avatar/BodyTypeData";
import { BodyTypesId } from "@constants/Avatar/utils";
import SelectBodyType from "@modules/JoinBoatMainV2/Components/BodyType/SelectBodyType";
import { useEffect, useState } from "react";
import { LocalUser } from "../interface/localuser";
import JoinBoatWrapper from "./JoinBoatWrapper";

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
  onCurrentBodyTypeSave: (val?: BodyTypesId) => void;
  title?: string;
  progress: number;
  isSame?: boolean;
}

const CurrentBodyType: React.FC<Props> = ({
  localUser,
  onCurrentBodyTypeUpdate,
  onCurrentBodyTypeSave,
  title,
  progress,
  isSame,
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

  const onSave = () => {
    const type = targetBodyTypeArr[currentActiveIndex].id;
    onCurrentBodyTypeSave(type);
  };

  return (
    <JoinBoatWrapper title={title} onNext={onSave} progress={progress}>
      {targetBodyTypeArr.length ? (
        <SelectBodyType
          gender={localUser?.gender}
          targetBodyTypeArr={targetBodyTypeArr}
          onCurrentIndexChange={setCurrentActiveIndex}
          currentActiveIndex={currentActiveIndex}
        />
      ) : null}
    </JoinBoatWrapper>
  );
};

export default CurrentBodyType;
