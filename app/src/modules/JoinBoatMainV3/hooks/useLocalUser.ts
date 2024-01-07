import { BodyTypesId } from "@constants/Avatar/utils";
import {
  cycleLengthTyps,
  diagnosedPeriodType,
  difficulty,
  fitnessGoalTypes,
  genderType,
  pcosSymptoms,
  UserInterface,
  workoutFrequencyTypes,
} from "@models/User/User";
import { useCallback, useEffect, useState } from "react";
import { LocalUser, numberFieldKeyType } from "../interface/localuser";

export const useLocalUser = (user?: UserInterface) => {
  const [localUser, setLocalUser] = useState<LocalUser>();

  useEffect(() => {
    setLocalUser((prev) => {
      return {
        ...prev,
        uid: user?.uid,
        name: user?.name,
        gender: user?.gender,
        fitnessGoal: user?.fitnessGoal,
        diagnosedPeriod: user?.diagnosedPeriod,
        age: user?.age,
        height: user?.height,
        weight: user?.weight,

        desiredWeight: user?.desiredWeight,
        cycleLength: user?.cycleLength,
        pcosSymptoms: user?.pcosSymptoms,
        workoutFrequency: user?.workoutFrequency,
        currentBodyType: user?.currentBodyType,
        desiredBodyType: user?.desiredBodyType,
        dailyFPTarget: user?.dailyFPTarget,
        badgeId: user?.badgeId,
        phone: user?.phone,
        onboarded: user?.onboarded,
        periodTrackerObj: {
          inputCycleLength: user?.periodTrackerObj?.inputCycleLength,
          inputPeriodLength: user?.periodTrackerObj?.inputPeriodLength,
          cycleRegularity: user?.periodTrackerObj?.cycleRegularity,
        },
        sleepQuality: user?.sleepQuality,
      };
    });
  }, [
    user?.uid,
    user?.name,
    user?.gender,
    user?.fitnessGoal,
    user?.diagnosedPeriod,
    user?.age,
    user?.height,
    user?.weight,
    user?.desiredWeight,
    user?.cycleLength,
    user?.pcosSymptoms,
    user?.workoutFrequency,
    user?.currentBodyType,
    user?.desiredBodyType,
    user?.dailyFPTarget,
    user?.badgeId,
    user?.phone,
    user?.onboarded,
    user?.periodTrackerObj?.inputCycleLength,
    user?.periodTrackerObj?.inputPeriodLength,
    user?.periodTrackerObj?.cycleRegularity,
    user?.sleepQuality,
  ]);

  const onNameUpdate = (newName: string) => {
    setLocalUser((prev) => {
      if (prev && typeof newName === "string") {
        return { ...prev, name: newName };
      }
    });
  };

  const onGenderUpdate = (gender: genderType) => {
    setLocalUser((prev) => {
      if (prev) {
        return { ...prev, gender };
      }
    });
  };

  const onGoalUpdate = (newVal: fitnessGoalTypes) => {
    setLocalUser((prev) => {
      if (prev) {
        return { ...prev, fitnessGoal: [newVal] };
      }
    });
  };

  const onDiagnosedPeriodUpdate = (newVal: diagnosedPeriodType) => {
    setLocalUser((prev) => {
      if (prev) {
        return { ...prev, diagnosedPeriod: newVal };
      }
    });
  };

  const onNumberFieldsUpdate = (newVal: number, key: numberFieldKeyType) => {
    setLocalUser((prev) => {
      if (prev && key === "cycleLengthAverage") {
        return {
          ...prev,
          periodTrackerObj: {
            ...(prev.periodTrackerObj ? prev.periodTrackerObj : {}),
            inputCycleLength: newVal,
          },
        };
      } else if (prev && key === "lastPeriodLength") {
        return {
          ...prev,
          periodTrackerObj: {
            ...(prev.periodTrackerObj ? prev.periodTrackerObj : {}),
            inputPeriodLength: newVal,
          },
        };
      } else {
        return { ...prev, [key]: newVal };
      }
    });
  };

  const onCycleLengthUpdate = (newVal: cycleLengthTyps) => {
    setLocalUser((prev) => {
      if (prev) {
        return { ...prev, cycleLength: newVal };
      }
    });
  };

  const onPcosSymptomsUpdate = (newVal: pcosSymptoms) => {
    setLocalUser((prev) => {
      if (prev) {
        const { pcosSymptoms, ...rest } = prev;
        const isPresent = pcosSymptoms?.includes(newVal);

        if (isPresent) {
          let remotePcosSymptoms = pcosSymptoms?.filter(
            (each) => each !== newVal
          );
          if (remotePcosSymptoms?.length) {
            return { ...rest, pcosSymptoms: remotePcosSymptoms };
          } else {
            return { ...rest };
          }
        } else {
          if (pcosSymptoms?.length) {
            return { ...rest, pcosSymptoms: [...pcosSymptoms, newVal] };
          } else {
            return { ...rest, pcosSymptoms: [newVal] };
          }
        }
      }
    });
  };

  const onWorkoutFrequencyUpdate = (newVal: workoutFrequencyTypes) => {
    setLocalUser((prev) => {
      if (prev) {
        return { ...prev, workoutFrequency: newVal };
      }
    });
  };

  const onCurrentBodyTypeUpdate = useCallback((value: BodyTypesId) => {
    setLocalUser((prev) => {
      if (prev)
        return {
          ...prev,
          currentBodyType: value,
          desiredBodyType:
            prev?.currentBodyType === value ? prev.desiredBodyType : undefined,
        };
    });
  }, []);

  const onDesiredBodyTypeUpdate = useCallback(
    (id: BodyTypesId, level: difficulty, pace: number) => {
      setLocalUser((prev) => {
        if (prev)
          return {
            ...prev,
            desiredBodyType: id,
            difficulty: level,
            paceOfAchievementInMonth: pace,
          };
      });
    },
    []
  );

  return {
    localUser,
    onNameUpdate,
    onGenderUpdate,
    onGoalUpdate,
    onDiagnosedPeriodUpdate,
    onNumberFieldsUpdate,
    onCycleLengthUpdate,
    onPcosSymptomsUpdate,
    onWorkoutFrequencyUpdate,
    onCurrentBodyTypeUpdate,
    onDesiredBodyTypeUpdate,
  };
};
