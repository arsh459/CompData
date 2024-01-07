import { formLabelValues } from "@components/drawers/constants";
import { homeYogaProfileData } from "@constants/landing/home";
import { useAuth } from "@hooks/auth/useAuth";
import { useRecapcha } from "@hooks/auth/useRecapcha";
import Script from "next/script";
import {
  updateSocialMediaFields,
  updateUserTextFields,
} from "@models/User/updateUtils";
import { UserInterface } from "@models/User/User";
import { useRouter } from "next/router";
// import clsx from "clsx";
import { useEffect, useState } from "react";
import EditingLayout from "../EventCreator/EditingLayout";
import AuthForm from "./AuthForm";
import ProfileFormHolder from "./ProfileForm/ProfileFormHolder";
import { getNextProfileRoute } from "./utils";
import { getQueryParamsForOnboard } from "@hooks/drawer/utils";

interface Props {}

export interface editorQuery {
  section?: string;
  eventId?: string;
  leaderKey?: string;
  action?: "copyEvent";
}

export type editorQueryKeys = "section" | "eventId" | "leaderKey" | "action";

const ProfileEditorV2: React.FC<Props> = ({}) => {
  const router = useRouter();
  const q = router.query as editorQuery;
  const [selectedFormValue, setForm] = useState<formLabelValues>("your-name");
  // const [eventId, setEventId] = useState<string>("");
  useEffect(() => {
    if (router.isReady && q.section) {
      setForm(q.section as formLabelValues);
    } else {
      setForm("your-name");
    }
  }, [router.isReady, q.section]);

  // console.log("q.event", q.eventId);

  //   const { localUser, setLocalUser } = useEditProfile(user, setDrawerElements);
  const [viewState, setViewState] = useState<"edit" | "live">("edit");

  const { user, hideRecapcha, authStatus } = useAuth();
  const { element, recaptcha } = useRecapcha(authStatus === "FAILED");

  const [localUser, setLocalUser] = useState<UserInterface | undefined>(
    () => user
  );

  useEffect(() => {
    setLocalUser(user);
  }, [user]);

  const onButtonPress = (
    key: formLabelValues,
    value: string | undefined,
    insta?: string | undefined,
    fb?: string | undefined,
    youtube?: string | undefined,
    linkedIn?: string | undefined,
    external?: string | undefined
  ) => {
    // console.log(user, "here", key, value);
    if (user && key === "your-name" && typeof value === "string") {
      updateUserTextFields(user.uid, "name", value);
    } else if (user && key === "your-handle" && typeof value === "string") {
      updateUserTextFields(user.uid, "userKey", value);
    } else if (user && key === "about-me" && typeof value === "string") {
      updateUserTextFields(user && user.uid, "bio", value);
    } else if (user && key === "social-media-links") {
      updateSocialMediaFields(user.uid, insta, fb, linkedIn, youtube, external);
    }

    const { nextRoute } = getNextProfileRoute(key);
    q.section = nextRoute;
    router.push(getQueryParamsForOnboard(q), undefined, { shallow: true });
  };

  const onBack = () => {
    router.back();
  };

  return (
    <EditingLayout
      viewState={viewState}
      setViewState={setViewState}
      onBack={onBack}
      noBack={true}
      navVisible={false}
      mobileViewProps={{
        size: "responsive",
        screen: user && user.email ? "home-template" : "home",
        profileProps: homeYogaProfileData,
        profilePropsV1: {
          onSectionClick: setForm,
          events: [],
          live: false,
          editingSection: selectedFormValue,
          coverVideo: user?.coverCloudinary ? user.coverCloudinary : [],
          profileImg: user?.profileImage,
          profileName: localUser?.name,
          userKey: localUser?.userKey,
          socialMediaLinks: {
            linkedIn: localUser?.linkedInLink,
            facebook: localUser?.facebookProfile,
            instagram: localUser?.instagramLink,
            youtube: localUser?.youtubeLink,
            external: localUser?.externalLink,
          },
          uid: user?.uid ? user.uid : "",
          editing: selectedFormValue !== "profile",
          aboutMe: localUser?.bio,
        },
      }}
    >
      <Script
        type="text/javascript"
        strategy="lazyOnload"
        src="https://widget.cloudinary.com/v2.0/global/all.js"
      />
      {localUser && localUser.email ? (
        <ProfileFormHolder
          noBreadcrump={true}
          currentVisible={selectedFormValue}
          onButtonPress={onButtonPress}
          onBack={onBack}
          userKey=""
          eventId={q.eventId}
          setForm={setForm}
          localUser={localUser}
          setLocalUser={setLocalUser}
          // previousUserKey={q.leaderKey}
        />
      ) : (
        <AuthForm
          user={user}
          //   brandName="Soc"
          recaptcha={recaptcha}
        />
      )}
      <div
        id="recaptcha-container"
        ref={element}
        className={hideRecapcha ? "hidden" : ""}
      />
    </EditingLayout>
  );
};

export default ProfileEditorV2;
