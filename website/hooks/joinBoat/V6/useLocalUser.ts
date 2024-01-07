import { BodyTypesId } from "@constants/Avatar/utils";
import {
  cycleLengthTyps,
  CycleRegularityTypes,
  diagnosedPeriodType,
  fitnessGoalTypes,
  genderType,
  pcosSymptoms,
  UserInterface,
  workoutFrequencyTypes,
  workoutStyleTypes,
} from "@models/User/User";
import { difficulty } from "@templates/joinBoatTemplate/V5/Components/SetPace";
import { useCallback, useEffect, useState } from "react";
import { LocalUser, numberFieldKeyType } from "./interface";
import { symptomId } from "@models/User/symptom";

export const useLocalUser = (user?: UserInterface) => {
  const [localUser, setLocalUser] = useState<LocalUser>();

  useEffect(() => {
    setLocalUser((prev) => {
      return {
        ...prev,
        uid: user?.uid,
        name: user?.name,
        email: user?.email,
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
          symptomsDuringPeriod: user?.periodTrackerObj?.symptomsDuringPeriod,
          symptomsBeforePeriod: user?.periodTrackerObj?.symptomsBeforePeriod,
        },
        sleepQulity: user?.sleepQuality,
        workoutStyle: user?.workoutStyle,
      };
    });
  }, [
    user?.uid,
    user?.periodTrackerObj?.inputCycleLength,
    user?.periodTrackerObj?.inputPeriodLength,
    user?.periodTrackerObj?.cycleRegularity,
    user?.periodTrackerObj?.symptomsDuringPeriod,
    user?.periodTrackerObj?.symptomsBeforePeriod,
    user?.name,
    user?.email,
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
    user?.sleepQuality,
    user?.workoutStyle,
  ]);

  const onNameUpdate = useCallback((newName: string) => {
    setLocalUser((prev) => {
      if (prev && typeof newName === "string") {
        return { ...prev, name: newName };
      }
    });
  }, []);

  const onEmailUpdate = useCallback((newEmail: string) => {
    setLocalUser((prev) => {
      if (prev && typeof newEmail === "string") {
        return { ...prev, email: newEmail };
      }
    });
  }, []);

  const onGenderUpdate = useCallback((gender: genderType) => {
    setLocalUser((prev) => {
      if (prev) {
        return { ...prev, gender };
      }
    });
  }, []);

  const onGoalUpdate = useCallback((newVal: fitnessGoalTypes) => {
    setLocalUser((prev) => {
      if (prev) {
        return { ...prev, fitnessGoal: [newVal] };
      }
    });
  }, []);

  const onDiagnosedPeriodUpdate = useCallback((newVal: diagnosedPeriodType) => {
    setLocalUser((prev) => {
      if (prev) {
        return { ...prev, diagnosedPeriod: newVal };
      }
    });
  }, []);

  const onNumberFieldsUpdate = useCallback(
    (newVal: number, key: numberFieldKeyType) => {
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
    },
    []
  );

  const onCycleLengthUpdate = useCallback((newVal: cycleLengthTyps) => {
    setLocalUser((prev) => {
      if (prev) {
        return { ...prev, cycleLength: newVal };
      }
    });
  }, []);

  const onPcosSymptomsUpdate = useCallback((newVal: pcosSymptoms) => {
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
  }, []);

  const onWorkoutFrequencyUpdate = useCallback(
    (newVal: workoutFrequencyTypes) => {
      setLocalUser((prev) => {
        if (prev) {
          return { ...prev, workoutFrequency: newVal };
        }
      });
    },
    []
  );

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

  const onCycleRegularityUpdate = useCallback(
    (cycleRegularity?: CycleRegularityTypes) => {
      setLocalUser((prev) => {
        if (prev) {
          const { periodTrackerObj, ...rest } = prev;
          return {
            ...rest,
            periodTrackerObj: { ...periodTrackerObj, cycleRegularity },
          };
        }
      });
    },
    []
  );

  const onWorkoutStyleUpdate = useCallback((newVal: workoutStyleTypes) => {
    setLocalUser((prev) => {
      if (prev) {
        return { ...prev, workoutStyle: newVal };
      }
    });
  }, []);

  const onPeriodSymptomsUpdate = useCallback(
    (
      newVal: symptomId,
      target: "symptomsBeforePeriod" | "symptomsDuringPeriod"
    ) => {
      setLocalUser((prev) => {
        if (prev) {
          const { periodTrackerObj, ...rest } = prev;
          const targetArr = periodTrackerObj && periodTrackerObj[target];
          periodTrackerObj && delete periodTrackerObj[target];

          if (targetArr?.includes(newVal)) {
            return {
              ...rest,
              periodTrackerObj: {
                ...periodTrackerObj,
                [target]: targetArr.filter((each) => each !== newVal),
              },
            };
          } else {
            const remoteTargetArr =
              targetArr && newVal !== "no_symptom"
                ? [...targetArr.filter((each) => each !== "no_symptom"), newVal]
                : [newVal];
            return {
              ...rest,
              periodTrackerObj: {
                ...periodTrackerObj,
                [target]: remoteTargetArr,
              },
            };
          }
        }
      });
    },
    []
  );

  return {
    localUser,
    onNameUpdate,
    onEmailUpdate,
    onGenderUpdate,
    onGoalUpdate,
    onDiagnosedPeriodUpdate,
    onNumberFieldsUpdate,
    onCycleLengthUpdate,
    onPcosSymptomsUpdate,
    onWorkoutFrequencyUpdate,
    onCurrentBodyTypeUpdate,
    onDesiredBodyTypeUpdate,
    onCycleRegularityUpdate,
    onPeriodSymptomsUpdate,
    onWorkoutStyleUpdate,
  };
};
