import Loading from "@components/loading/Loading";
import { useAuth } from "@hooks/auth/useAuth";
import { useLocalUser } from "@hooks/auth/useLocalUser";
import { useRecapcha } from "@hooks/auth/useRecapcha";
import { getQueryParamsForUserOnboard } from "@hooks/drawer/utils";
import { EventInterface } from "@models/Event/Event";
import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import {
  // updateSocialBoatCommunityUser,
  updateSocialBoatCourseUser,
  // updateSocialBoatUser,
} from "@models/User/createUtils";
import {
  removeProfileImage,
  updateProfileImage,
  updateUserFitnessGoalObj,
  updateUserGender,
  updateUserNumberFields,
  updateUserTextFields,
} from "@models/User/updateUtils";
import { fitnessGoalObj, genderType } from "@models/User/User";
import AuthForm from "@templates/editEvent/ProfileEditor/AuthForm";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import OnboardForm from "./OnboardForm";
import { getNextUserOnboardRoute } from "./utils";

interface Props {
  leader: LeaderBoard;
  event: EventInterface;
}

export interface onboardUserQuery {
  section?: onboardUserSections;
  liveKey?: string;
  seriesKey?: string;
  videoKey?: string;
}

export type onboardUserSections =
  | "name"
  | "instagramHandle"
  | "picture"
  | "height"
  | "weight"
  | "gender"
  | "age"
  | "fitnessGoals"
  | "fitnessGoalText"
  | "join"
  | "subscription"
  | "bmi";

export type onboardUserQueryKeys = "section";

const JoinBoatTemplate: React.FC<Props> = ({ leader, event }) => {
  const { user, hideRecapcha, authStatus } = useAuth();
  const { localUser, onUpdate, onUpdateHeight } = useLocalUser(user);
  const { element, recaptcha } = useRecapcha(authStatus === "FAILED");
  const [selectedFormValue, setForm] = useState<onboardUserSections>("name");
  const [loading, setLoading] = useState<boolean>(false);
  const [userChecked, setUserChecked] = useState<boolean>(false);

  const [liveKeyToGo, setLiveKeyToGo] = useState<string>("");
  const [videoKeyToGo, setVideoKeyToGo] = useState<string>("");
  const [seriesKeyToGo, setSeriesKeyToGo] = useState<string>("");

  const router = useRouter();
  const q = router.query as onboardUserQuery;

  useEffect(() => {
    if (router.isReady) {
      if (q.section) {
        setForm(q.section as onboardUserSections);
        setLiveKeyToGo(q.liveKey ? q.liveKey : "");
        setSeriesKeyToGo(q.seriesKey ? q.seriesKey : "");
        setVideoKeyToGo(q.videoKey ? q.videoKey : "");
      } else {
        q.section = "name";
        router.push(getQueryParamsForUserOnboard(q), undefined, {
          shallow: true,
        });
      }
    }
  }, [router, q]);

  useEffect(() => {
    if (!userChecked && user?.uid) {
      if (user.enrolledEvents?.includes(event.id) && !seriesKeyToGo) {
        setLoading(true);
        router.push(`/${leader.userKey}/?eventId=${event.id}&nav=program`);
      }

      if (user.enrolledEvents?.includes(event.id) && seriesKeyToGo) {
        q.section = "subscription";
        router.push(getQueryParamsForUserOnboard(q), undefined, {
          shallow: true,
        });
      }

      setUserChecked(true);
    }
  }, [
    userChecked,
    event.id,
    user?.uid,
    user?.enrolledEvents,
    q,
    seriesKeyToGo,
    leader?.userKey,
    router,
  ]);

  // console.log(
  //   "user.enrolledEvents?.includes(event.id)",
  //   user?.enrolledEvents?.includes(event.id),
  //   userChecked
  // );

  // useEffect(() => {
  //   if (user?.uid && event.id && !userChecked) {
  //     if (user.enrolledEvents?.includes(event.id)) {
  //       setLoading(true);
  //       router.push(
  //         `https://${leader.userKey}.socialboat.live/?eventId=${event.id}&nav=program`
  //       );
  //     } else {
  //       setUserChecked(true);
  //     }
  //   }
  // }, [
  //   user?.uid,
  //   user?.enrolledEvents,
  //   event.id,
  //   userChecked,
  //   leader.userKey,
  //   router,
  // ]);

  const onNext = (cur: onboardUserSections, override?: onboardUserSections) => {
    const { nextRoute } = getNextUserOnboardRoute(cur, override);
    q.section = nextRoute;
    router.push(getQueryParamsForUserOnboard(q), undefined, {
      shallow: true,
    });
  };

  const uploadProfileImg = useCallback(
    async (newFile: CloudinaryMedia) => {
      if (user?.uid) await updateProfileImage(user?.uid, newFile);
    },
    [user?.uid]
  );

  const removeProfileImg = async () => {
    if (user?.uid) await removeProfileImage(user.uid);
  };

  const onBack = () => router.back();

  const onSignFree = async () => {
    // console.log("free sign up");
    if (user) {
      setLoading(true);

      onNavOut();
    }
  };

  const onNavOut = () => {
    if (seriesKeyToGo && liveKeyToGo) {
      router.push(`/workout/${seriesKeyToGo}/live/${liveKeyToGo}`);
    } else if (seriesKeyToGo && videoKeyToGo) {
      router.push(`/workout/${seriesKeyToGo}/live/${videoKeyToGo}`);
    } else {
      router.push(`/${leader.userKey}/?eventId=${event.id}&nav=program`);
    }
  };

  const onPaidSeries = async (seriesId: string) => {
    if (user) {
      setLoading(true);

      await updateSocialBoatCourseUser(
        user.uid,
        leader.uid,
        seriesId,
        event.id
      );
      onNavOut();
    }
  };

  const onSaveAndNext = async (
    cur: onboardUserSections,
    value: string | fitnessGoalObj | undefined | genderType | number
  ) => {
    if (
      user &&
      typeof value === "string" &&
      (cur === "name" || cur === "instagramHandle" || cur === "fitnessGoalText")
    ) {
      await updateUserTextFields(user.uid, cur, value);
    } else if (
      user &&
      typeof value === "number" &&
      (cur === "age" || cur === "height" || cur === "weight")
    ) {
      await updateUserNumberFields(user.uid, cur, value);
    } else if (user && cur === "gender" && value) {
      await updateUserGender(user.uid, value as genderType);
    } else if (user && cur === "fitnessGoals") {
      await updateUserFitnessGoalObj(user.uid, value as fitnessGoalObj);
    }

    // else if (user && typeof value === "string" && cur === "fitnessGoalText") {

    // }

    // go next if a value exists
    if (value) {
      onNext(cur);
    }
  };

  //   console.log("selectedFormValue", selectedFormValue);

  return (
    <div className="h-[100vh] flex justify-center items-center">
      {authStatus === "PENDING" || loading ? (
        <div className="flex justify-center items-center">
          <Loading fill="#ff735c" width={48} height={48} />
        </div>
      ) : localUser && localUser.email ? (
        <OnboardForm
          onNext={onNext}
          freeOptionHidden={seriesKeyToGo ? true : false}
          eventId={event.id}
          name={leader.name ? leader.name : "Influencer"}
          onSaveAndNext={onSaveAndNext}
          onUpdate={onUpdate}
          eventName={event.name}
          leaderKey={leader.userKey}
          onSignFree={onSignFree}
          onPaidSeries={onPaidSeries}
          leaderUID={leader.uid}
          onBack={onBack}
          localUser={localUser}
          currentVisible={selectedFormValue}
          uploadProfileImg={uploadProfileImg}
          removeProfileImg={removeProfileImg}
          onUpdateHeight={onUpdateHeight}
        />
      ) : (
        <AuthForm user={user} brandName={leader.name} recaptcha={recaptcha} />
      )}

      <div
        id="recaptcha-container"
        ref={element}
        className={hideRecapcha ? "hidden" : ""}
      />
    </div>
  );
};

export default JoinBoatTemplate;
