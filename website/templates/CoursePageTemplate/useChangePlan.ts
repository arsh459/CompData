import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ConfirmationProps } from "./ChangePlanModalComp/Confirmation";

export type sectionTypes =
  | "unknown"
  | "changeProgram"
  | "dateOfStartProgram"
  | "preferWorkoutDays";

export interface paramQuery {
  section?: sectionTypes;
  noModal?: "true";
}

export type paramQueryKeysV6 = "section";

export const getQueryParams = (query: paramQuery) => {
  return `?${Object.keys(query)
    .map((key) => key + "=" + query[key as paramQueryKeysV6])
    .join("&")}`;
};

export const useChangePlan = () => {
  const router = useRouter();
  const q = router.query as paramQuery;
  const [section, setSection] = useState<sectionTypes>("unknown");
  const [modalProps, setModalProps] = useState<ConfirmationProps>();

  useEffect(() => {
    if (router.isReady) {
      if (q.section) {
        setSection(q.section);
      } else {
        setSection("unknown");
      }
    }
  }, [q, router]);

  const onGoToSection = (sec: sectionTypes) => {
    q.section = sec;
    router.push(getQueryParams(q), undefined, { shallow: true });
  };

  const onSetUnknown = () => {
    setSection("unknown");
    setModalProps(undefined);
    delete q.section;
    router.push(getQueryParams(q), undefined, { shallow: true });
  };

  return {
    noModal: q.noModal ? true : false,
    section,
    onSetUnknown,
    onGoToSection,
    modalProps,
    setModalProps,
  };
};
