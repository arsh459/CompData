// import { useRegistrationsV2 } from "@hooks/registrations/useRegistrationsV2";
import { formLabelValues } from "@components/drawers/constants";
import { useUserEvents } from "@hooks/editEvent/useUserEvents";
import { useEditProfile } from "@hooks/editProfile/useEditProfile";
import {
  updateSocialMediaFields,
  updateUserTextFields,
} from "@models/User/updateUtils";
import { UserInterface } from "@models/User/User";
import { useRouter } from "next/router";
// import clsx from "clsx";
import { useState } from "react";
import EditingLayout from "../EventCreator/EditingLayout";
import ProfileFormHolder from "./ProfileForm/ProfileFormHolder";
import { getNextProfileRoute } from "./utils";
// import { MessageInterface } from "./Message/DashboardMessage";

interface Props {
  user: UserInterface;
  selectedFormValue: formLabelValues;
  setForm: (val: formLabelValues) => void;
  setDrawerElements: any;
}

const ProfileEditor: React.FC<Props> = ({
  user,
  setDrawerElements,
  selectedFormValue,
  setForm,
}) => {
  const { localUser, setLocalUser } = useEditProfile(user, setDrawerElements);
  const [viewState, setViewState] = useState<"edit" | "live">("edit");

  const { userEvents } = useUserEvents(user.uid);

  const onButtonPress = (
    key: formLabelValues,
    value: string | undefined,
    insta?: string | undefined,
    fb?: string | undefined,
    youtube?: string | undefined,
    linkedIn?: string | undefined,
    external?: string | undefined
  ) => {
    // console.log("insta", insta);

    if (key === "your-name" && typeof value === "string") {
      updateUserTextFields(user.uid, "name", value);
    } else if (key === "your-handle" && typeof value === "string") {
      updateUserTextFields(user.uid, "userKey", value);
    } else if (key === "about-me" && typeof value === "string") {
      updateUserTextFields(user.uid, "bio", value);
    } else if (key === "social-media-links") {
      updateSocialMediaFields(user.uid, insta, fb, linkedIn, youtube, external);
    }

    const { nextRoute } = getNextProfileRoute(key);
    setForm(nextRoute);
  };

  const router = useRouter();

  const onBack = () => {
    router.back();
  };

  return (
    <EditingLayout
      viewState={viewState}
      setViewState={setViewState}
      onBack={onBack}
      navVisible={true}
      mobileViewProps={{
        size: "responsive",
        screen: "home-template",
        profilePropsV1: {
          onSectionClick: setForm,
          events: userEvents,
          live: false,
          editingSection: selectedFormValue,
          coverVideo: user.coverCloudinary ? user.coverCloudinary : [],
          profileImg: user.profileImage,
          profileName: localUser.name,
          userKey: localUser.userKey,
          socialMediaLinks: {
            linkedIn: localUser.linkedInLink,
            facebook: localUser.facebookProfile,
            instagram: localUser.instagramLink,
            youtube: localUser.youtubeLink,
            external: localUser.externalLink,
          },
          uid: user.uid,
          editing: selectedFormValue !== "profile",
          aboutMe: localUser.bio,
        },
      }}
    >
      {localUser ? (
        <ProfileFormHolder
          currentVisible={selectedFormValue}
          onButtonPress={onButtonPress}
          userKey=""
          setForm={setForm}
          localUser={localUser}
          setLocalUser={setLocalUser}
        />
      ) : null}
    </EditingLayout>
  );
};

export default ProfileEditor;

// Ragini
// Ragini
// Dancer to entrepreneur
// Ragini
// Girl who rededined dance
//
//
