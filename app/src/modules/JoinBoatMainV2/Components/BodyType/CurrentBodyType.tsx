import { BodyTypesId } from "@constants/Avatar/utils";
import { LocalUser } from "@hooks/user/useLocalUserV2";
import JoinBoatWrapper from "@modules/JoinBoatMainV2/JoinBoatWrapper";
import { useInteractionManager } from "@providers/InteractionProvider/hooks/useInteractionManager";
import { useEffect, useState } from "react";
import {
  CurrentBodyTypeArr,
  getEvolutionBodyType,
} from "../../../../constants/Avatar/BodyTypeData";
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
  backOnDone?: boolean;
  title?: string;
  current: number;
}

const CurrentBodyType: React.FC<Props> = ({
  localUser,
  onCurrentBodyTypeUpdate,
  onNext,
  backOnDone,
  title,
  current,
}) => {
  const [init, setInit] = useState<boolean>(false);
  const { interactionStatus } = useInteractionManager(0);
  const [currentActiveIndex, setCurrentActiveIndex] = useState<number>(-1);

  useEffect(() => {
    if (!init && targetBodyTypeArr.length && interactionStatus) {
      const selected = targetBodyTypeArr.findIndex(
        (each) => localUser?.currentBodyType === each.id
      );
      setCurrentActiveIndex(() => {
        return selected !== -1 ? selected : 0;
      });

      setInit(true);

      // set localUser
      // onCurrentBodyTypeUpdate(targetBodyTypeArr[selected].id);
    }
  }, [localUser?.currentBodyType, interactionStatus, init]);

  // for swiper
  useEffect(() => {
    if (interactionStatus && targetBodyTypeArr[currentActiveIndex])
      onCurrentBodyTypeUpdate(targetBodyTypeArr[currentActiveIndex].id);
  }, [interactionStatus, currentActiveIndex, onCurrentBodyTypeUpdate]);

  return (
    <JoinBoatWrapper
      headText="Fitness scan"
      title={title}
      current={current}
      onNext={onNext}
      backOnDone={backOnDone}
      disabled={!interactionStatus}
    >
      {targetBodyTypeArr.length && init ? (
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
