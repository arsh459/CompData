import { UserInterface } from "@models/User/User";
import { WorkoutSeries } from "@models/Workouts/Series";
import { seriesModal } from "archive/workout/[workoutKey]";
import { useState } from "react";
import { useAuth } from "./useAuth";
import { useRecapcha } from "./useRecapcha";

const isEnrolled = (user?: UserInterface, series?: WorkoutSeries) => {
  if (user && series?.id && user?.enrolledCourses?.includes(series.id)) {
    return true;
  }

  if (user && user.uid === series?.ownerUID) {
    return true;
  }

  return false;
};

export const useSeriesAuth = (selectedSeries?: WorkoutSeries) => {
  const [modalState, setModalState] = useState<seriesModal>("none");
  const { user, loadComplete, hideRecapcha, authStatus, signOut } =
    useAuth(undefined);

  const { recaptcha, element } = useRecapcha(
    authStatus === "FAILED" && modalState === "auth"
    // showAuthModal
  );

  const authRequest = () => {
    setModalState("auth");
  };

  const enrolled = isEnrolled(user, selectedSeries);

  return {
    modalState,
    setModalState,
    user,
    loadComplete,
    hideRecapcha,
    authStatus,
    signOut,
    recaptcha,
    element,
    authRequest,
    enrolled,
  };
};
