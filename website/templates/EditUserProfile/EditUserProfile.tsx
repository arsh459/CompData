import Loading from "@components/loading/Loading";
import { useAuth } from "@hooks/auth/useAuth";
import { useLocalUser } from "@hooks/auth/useLocalUser";
import { useRecapcha } from "@hooks/auth/useRecapcha";
import { getQueryParamsForEditProfile } from "@hooks/drawer/utils";
// import { EventInterface } from "@models/Event/Event";
// import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import {
  removeProfileImage,
  updateProfileImage,
  updateUserFitnessGoalObj,
  updateUserGender,
  updateUserNumberFields,
  updateUserTextFields,
} from "@models/User/updateUtils";
import { fitnessGoalObj, genderType, UserInterface } from "@models/User/User";
import AuthForm from "@templates/editEvent/ProfileEditor/AuthForm";
import { onboardUserSections } from "@templates/joinBoatTemplate/JoinBoatTemplate";
import UserProfileEditor from "@templates/joinBoatTemplate/UserProfileEditor";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { getNextRouteForUserProfile } from "./utils";
// import OnboardForm from "./OnboardForm";
// import { getNextUserOnboardRoute } from "./utils";

interface Props {
  leader: UserInterface;
  //   event: EventInterface;
}

export interface editUserProfileQuery {
  section?: editUserProfileSections;
  leaderKey?: string;
}

export type editUserProfileSections =
  | "name"
  | "instagramHandle"
  | "picture"
  | "height"
  | "weight"
  | "gender"
  | "age"
  | "fitnessGoals"
  | "fitnessGoalText"
  | "bmi";

export type editUserQueryKeys = "section";

const EditUserProfileTemplate: React.FC<Props> = ({ leader }) => {
  const { user, hideRecapcha, authStatus } = useAuth();
  const { localUser, onUpdate, onUpdateHeight } = useLocalUser(user);
  const { element, recaptcha } = useRecapcha(authStatus === "FAILED");
  const [selectedFormValue, setForm] =
    useState<editUserProfileSections>("name");
  const [loading, setLoading] = useState<boolean>(false);
  const [leaderKey, setLeaderKey] = useState<string>("");
  // const [userChecked, setUserChecked] = useState<boolean>(false);

  const router = useRouter();
  const q = router.query as editUserProfileQuery;

  useEffect(() => {
    if (router.isReady) {
      if (q.section) {
        setForm(q.section as editUserProfileSections);
        setLeaderKey(q.leaderKey ? q.leaderKey : "");
      } else {
        q.section = "name";
        router.push(getQueryParamsForEditProfile(q), undefined, {
          shallow: true,
        });
      }
    }
  }, [router, q]);

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

  const onNext = (
    cur: editUserProfileSections | onboardUserSections,
    override?: editUserProfileSections | onboardUserSections
  ) => {
    const { nextRoute } = getNextRouteForUserProfile(cur, override);
    q.section = nextRoute;
    router.push(getQueryParamsForEditProfile(q), undefined, {
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

  const onSaveAndNext = async (
    cur: editUserProfileSections | onboardUserSections,
    value: string | fitnessGoalObj | undefined | genderType | number
  ) => {
    if (
      user &&
      typeof value === "string" &&
      (cur === "name" || cur === "instagramHandle")
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
    } else if (user && typeof value === "string" && cur === "fitnessGoalText") {
      setLoading(true);
      router.push(`/${leaderKey}`);
    }

    // go next if a value exists
    if (value && cur !== "fitnessGoalText") {
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
        <UserProfileEditor
          onNext={onNext}
          onSaveAndNext={onSaveAndNext}
          onUpdate={onUpdate}
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

export default EditUserProfileTemplate;
