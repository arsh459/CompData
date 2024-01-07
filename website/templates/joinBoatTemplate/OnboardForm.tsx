// import { formLabelValues } from "@components/drawers/constants";
// import { useUserKey } from "@hooks/user/useUserKey";
import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import Script from "next/script";
// import {
//   removeCoverMedia,
//   removeProfileImage,
//   updateCoverMedia,
//   updateProfileImage,
// } from "@models/User/updateUtils";
// import { updateEventStringValue } from "@models/Event/createUtils";
// import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import {
  fitnessGoalObj,
  // FitnessGoalSelect,
  genderType,
  UserInterface,
} from "@models/User/User";
// import { generateFormattedKey } from "@models/User/userKey";
// import BreadCrumps from "@templates/editEvent/Form/BreadCrumps/BreadCrumps";
// import CloudinaryWidget from "@templates/editEvent/Form/CloudinaryWidget";
// import CollectPrice from "@templates/editEvent/Form/CollectPrice";
// import SocialLinkInput from "@templates/editEvent/Form/SocialMedia/SocialLinkInput";
// import TextEntry from "@templates/editEvent/Form/TextEntry";
import Welcome from "@templates/editEvent/Form/Welcome";
// import BMI from "./BMI";
// import {
//   getCrumpHeading,
//   getNavLevel,
//   isProfileLive,
// } from "@templates/editEvent/Form/utils";
// import Welcome from "@templates/editEvent/Form/Welcome";
// import { useCallback } from "react";
import { onboardUserSections } from "./JoinBoatTemplate";
// import RadioInput, { SelectItem } from "./RadioInput";
import Subscription from "./Subscription";
// import TakeHeightWidget from "./TakeHeightWidget";
import UserProfileEditor from "./UserProfileEditor";
// import BreadCrumps from "./BreadCrumps/BreadCrumps";
// import CloudinaryWidget from "./CloudinaryWidget";
// import CollectPrice from "./CollectPrice";
// import TextEntry from "./TextEntry";
// import Welcome from "./Welcome";

interface Props {
  currentVisible: onboardUserSections;
  localUser: UserInterface;
  eventName: string;
  onUpdate: (
    cur: onboardUserSections,
    value: string | fitnessGoalObj | undefined | genderType | number
  ) => void;
  onBack?: () => void;
  onSaveAndNext: (
    cur: onboardUserSections,
    value: string | fitnessGoalObj | undefined | genderType | number
  ) => void;
  onNext: (cur: onboardUserSections, override?: onboardUserSections) => void;
  // userKey: string | undefined;
  // setForm: (key: formLabelValues) => void;
  // noBreadcrump?: boolean;
  // eventId?: string;
  // teamEventId?: string;
  name: string;
  onUpdateHeight: (ht: number, inch: number) => void;
  uploadProfileImg: (newFile: CloudinaryMedia) => void;
  removeProfileImg: () => void;
  leaderKey?: string;
  leaderUID: string;
  eventId: string;
  onSignFree: () => Promise<void>;
  freeOptionHidden?: boolean;
  onPaidSeries: (seriesId: string) => Promise<void>;
  // previousUserKey?: string;
  // onSave?: () => void;
  // onLivePress?: () => void;
}

const OnboardForm: React.FC<Props> = ({
  currentVisible,
  localUser,
  onUpdate,
  eventName,
  leaderKey,
  leaderUID,
  freeOptionHidden,
  // setForm,
  onNext,
  onSaveAndNext,
  onUpdateHeight,
  onSignFree,
  // noBreadcrump,
  onBack,
  eventId,
  name,
  // eventId,
  // teamEventId,
  uploadProfileImg,
  // onSave,
  removeProfileImg,
  onPaidSeries,
  // onLivePress,
}) => {
  //   const { keyValid } = useUserKey(localUser?.userKey, localUser?.uid);

  // console.log("local", localUser);

  return (
    <div className="">
      <Script
        type="text/javascript"
        strategy="lazyOnload"
        src="https://widget.cloudinary.com/v2.0/global/all.js"
      />
      <div className="">
        {currentVisible !== "join" && currentVisible !== "subscription" ? (
          <UserProfileEditor
            currentVisible={currentVisible}
            localUser={localUser}
            onUpdate={onUpdate}
            onNext={onNext}
            onSaveAndNext={onSaveAndNext}
            onUpdateHeight={onUpdateHeight}
            onBack={onBack}
            uploadProfileImg={uploadProfileImg}
            removeProfileImg={removeProfileImg}
          />
        ) : currentVisible === "join" ? (
          <div className="px-8 max-w-lg">
            <Welcome
              live={true}
              liveHeading={`Welcome to ${eventName}`}
              inDraftHeading=""
              center={true}
              liveHelperText=""
              inDraftHelperText=""
              subtitle="Complete your fitness profile & get a FREE personal workout and nutrition advice from your coach"
              buttonText=""
              leftButtonText="Go to challenge"
              leftType="control"
              rightType="contained"
              urlPath="url"
              hideURL={true}
              rightButtonText="Next"
              onLeftButtonPress={() => onNext("join")}
              onButtonPress={() => onNext("join", "gender")}
              buttonPath={`/${leaderKey}?eventId=${eventId}&nav=program`}
            />
          </div>
        ) : currentVisible === "subscription" ? (
          <div className="max-w-lg">
            <Subscription
              onSignFree={onSignFree}
              onPaidSeries={onPaidSeries}
              userEmail={localUser.email}
              userPhone={localUser.phone}
              ownerUID={leaderUID}
              uid={localUser.uid}
              name={name}
              eventId={eventId}
              freeOptionHidden={freeOptionHidden}
            />
          </div>
        ) : null}
      </div>
      <div className="" />
    </div>
  );
};

export default OnboardForm;

// Take event name
// Add event description
// Add event media
// Add event cost
// Done
