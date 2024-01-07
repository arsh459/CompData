import { formLabelValues, pinValues } from "@components/drawers/constants";
import { useRouter } from "next/router";
import { dashboardQuery } from "./interface";
import { getQueryParams } from "./utils";

export const useDashboardQuery = () => {
  const router = useRouter();
  const dQuery = router.query as dashboardQuery;

  const updateEventId = (newId: string) => {
    dQuery.eventId = newId;
    router.push(getQueryParams(dQuery), undefined, { shallow: true });
  };

  const onBack = () => {
    router.back();
  };

  const onEventClick_route = (
    eventId: string,
    pinValue: pinValues,
    formValue: formLabelValues
  ) => {
    dQuery.eventId = eventId;
    dQuery.pinLevel = pinValue;
    dQuery.formLevel = formValue;
    router.push(getQueryParams(dQuery), undefined, { shallow: true });
  };

  const onDrawerElementClick_route = (
    newValue: formLabelValues,
    divId?: string
  ) => {
    if (
      newValue === "all-events" ||
      newValue === "profile" ||
      newValue === "current-event" ||
      newValue === "registrations"
    ) {
      dQuery.pinLevel = newValue;
    }

    dQuery.formLevel = newValue;
    router.push(getQueryParams(dQuery), undefined, { shallow: true });

    if (divId && document) {
      setTimeout(() => {
        document
          .querySelector("#" + divId)
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 600);
    }
  };

  //   const updatePinLevel = (pinValue: pinValues) => {
  //     dQuery.pinLevel = pinValue;
  //     router.push(getQueryParams(dQuery), undefined, { shallow: true });
  //   };

  //   const updateFormLevel = (formValue: formLabelValues) => {
  //     dQuery.formLevel = formValue;
  //     router.push(getQueryParams(dQuery), undefined, { shallow: true });
  //   };

  return {
    ...dQuery,
    updateEventId,
    onDrawerElementClick_route,
    onEventClick_route,
    onBack,
    // updatePinLevel,
    // updateFormLevel,
  };
};
