import { LocalCohort, LocalSession } from "@models/Event/Event";
import { useState } from "react";
import {
  createCohort,
  deleteCohort,
  //   pinCohort,
  saveCohort,
  updateCohortDateValue,
  // updateCohortSessionValue,
  updateCohortTextValue,
} from "@models/Event/createUtils";
import { formLabelValues } from "@components/drawers/constants";
import { parseCohort } from "@models/Event/parse";
import {
  getNextRoute,
  // getNextRouteV2,
} from "@templates/editEvent/EventCreator/utils";

export const useEditingCohort = (
  selectedCohort: LocalCohort | undefined,
  eventId: string,
  cohorts: LocalCohort[],
  uid: string,
  setForm: (key: formLabelValues) => void
) => {
  const [editingCohort, setEditingCohort] = useState<LocalCohort | undefined>(
    () => selectedCohort
  );

  const newCohort = async () => {
    const newCohort = createCohort(
      5,
      `cohort-${cohorts.length + 1}`,
      uid,
      cohorts.length === 0
    );
    await saveCohort(eventId, newCohort);
    setEditingCohort(parseCohort(newCohort));
  };

  const onCohortSelect = (id: string) => {
    const cohortsToEdit = cohorts.filter((item) => item.id === id);

    if (cohortsToEdit.length > 0) {
      //   setCurrentCohortId(id);
      setEditingCohort(cohortsToEdit[0]);
    }
    // setForm("cohortSize");
  };

  const onCohortSave = async (
    key: formLabelValues,
    value?: number | string,
    dateValue?: Date | null,
    sessions?: LocalSession[]
  ) => {
    if (editingCohort) {
      if ((key === "cohortSize" || key === "cohortJoinURL") && value) {
        await updateCohortTextValue(eventId, editingCohort.id, key, value);
      } else if (
        (key === "registerBy" || key === "cohortStarts") &&
        dateValue
      ) {
        await updateCohortDateValue(eventId, editingCohort.id, key, dateValue);
      }
      // } else if (key === "sessions") {
      //   await updateCohortSessionValue(eventId, editingCohort.id, sessions);
      // }
    }
  };

  const onNext = (key: formLabelValues) => {
    const { nextRoute } = getNextRoute(key);
    setForm(nextRoute);
  };

  const onCohortUpdate = async (
    key: formLabelValues,
    value?: number | string,
    dateValue?: Date | null,
    sessions?: LocalSession[]
  ) => {
    await onCohortSave(key, value, dateValue, sessions);
    onNext(key);
  };

  const removeCohort = async (cohortId: string) => {
    await deleteCohort(eventId, cohortId);

    if (editingCohort?.id === cohortId) {
      const otherCohorts = cohorts.filter(
        (cohort) => cohort.id !== editingCohort.id
      );
      if (otherCohorts.length > 0) {
        setEditingCohort(otherCohorts[0]);
      } else {
        setEditingCohort(undefined);
      }
    }
  };

  // const removeCohort = async (cohortId: string) => {
  //   await deleteCohort(eventId, cohortId);
  // };

  return {
    onCohortSave,
    onCohortUpdate,
    onNext,
    onCohortSelect,
    newCohort,
    setEditingCohort,
    editingCohort,
    removeCohort,
  };
};
