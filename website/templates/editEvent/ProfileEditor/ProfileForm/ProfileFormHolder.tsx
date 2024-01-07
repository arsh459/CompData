import { formLabelValues } from "@components/drawers/constants";
import { useUserKey } from "@hooks/user/useUserKey";
// import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";
// import {
//   removeCoverMedia,
//   removeProfileImage,
//   updateCoverMedia,
//   updateProfileImage,
// } from "@models/User/updateUtils";
// import { updateEventStringValue } from "@models/Event/createUtils";
// import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { UserInterface } from "@models/User/User";
import { generateFormattedKey } from "@models/User/userKey";
import BreadCrumps from "@templates/editEvent/Form/BreadCrumps/BreadCrumps";
// import CloudinaryWidget from "@templates/editEvent/Form/CloudinaryWidget";
import SocialLinkInput from "@templates/editEvent/Form/SocialMedia/SocialLinkInput";
import TextEntry from "@templates/editEvent/Form/TextEntry";
import {
  getCrumpHeading,
  getNavLevel,
  isProfileLive,
} from "@templates/editEvent/Form/utils";
import Welcome from "@templates/editEvent/Form/Welcome";
// import { useCallback } from "react";
// import BreadCrumps from "./BreadCrumps/BreadCrumps";
// import CloudinaryWidget from "./CloudinaryWidget";
// import CollectPrice from "./CollectPrice";
// import TextEntry from "./TextEntry";
// import Welcome from "./Welcome";

interface Props {
  currentVisible: formLabelValues;
  localUser: UserInterface;
  setLocalUser: any;
  onBack?: () => void;
  onButtonPress: (
    key: formLabelValues,
    value: string | undefined,
    insta?: string | undefined,
    fb?: string | undefined,
    youtube?: string | undefined,
    linkedIn?: string | undefined,
    external?: string | undefined
  ) => void;
  userKey: string | undefined;
  setForm: (key: formLabelValues) => void;
  noBreadcrump?: boolean;
  eventId?: string;
  teamEventId?: string;
  // previousUserKey?: string;
  onSave?: () => void;
  // onLivePress?: () => void;
}

const ProfileFormHolder: React.FC<Props> = ({
  currentVisible,
  localUser,
  setLocalUser,
  setForm,
  onButtonPress,
  noBreadcrump,
  onBack,
  eventId,
  teamEventId,
  // previousUserKey,
  onSave,
  // onLivePress,
}) => {
  // const uploadMedia = useCallback(
  //   async (newFile: CloudinaryMedia) => {
  //     await updateCoverMedia(localUser.uid, [newFile]);
  //   },
  //   [localUser.uid]
  // );

  // const deleteMedia = async () => {
  //   await removeCoverMedia(localUser.uid);
  // };

  // const uploadProfileImg = useCallback(
  //   async (newFile: CloudinaryMedia) => {
  //     await updateProfileImage(localUser.uid, newFile);
  //   },
  //   [localUser.uid]
  // );

  // const removeProfileImg = async () => {
  //   await removeProfileImage(localUser.uid);
  // };

  const { keyValid } = useUserKey(localUser?.userKey, localUser?.uid);

  const onKeyChange = (newText: string) => {
    // console.log("new text", newText);
    const newKey = generateFormattedKey(newText);
    // console.log("new newKey", newKey);
    setLocalUser((prev: UserInterface) => ({
      ...prev,
      userKey: newKey,
    }));
  };

  const onSocialMediaChange = (
    handle:
      | "instagramLink"
      | "facebookProfile"
      | "youtubeLink"
      | "linkedInLink"
      | "externalLink",
    value: string
  ) => {
    if (typeof value === "string") {
      setLocalUser((prevUser: UserInterface) => ({
        ...prevUser,
        [handle]: value,
      }));
    }
  };

  // console.log("bio", localUser?.bio);

  return (
    <div className="justify-around w-full">
      <div className="pb-4">
        {noBreadcrump ? (
          <div></div>
        ) : (
          <BreadCrumps
            breadCrumps={[
              {
                heading: "Profile",
                next: true,
                onClick: () => setForm("profile"),
              },
              {
                heading: "Your profile",
                truncate: true,
                next: getCrumpHeading(currentVisible) ? true : false,
                onClick: () => setForm("profile"),
              },
              getNavLevel(currentVisible),
            ]}
          />
        )}
      </div>
      <div className="">
        {currentVisible === "your-name" ? (
          <TextEntry
            inputMode="text"
            heading="What's your name?"
            placeholder="Type here"
            helperText={`*This will be your brand identity`}
            value={localUser?.name}
            onChangeText={(newVal: string) =>
              setLocalUser((prev: UserInterface) => ({ ...prev, name: newVal }))
            }
            buttonText="Next"
            onButtonPress={() => onButtonPress("your-name", localUser?.name)}
          />
        ) : currentVisible === "profile" && onSave ? (
          <Welcome
            live={isProfileLive(localUser)}
            urlPath={`/`}
            onLeftButtonPress={onSave}
            hideURL={true}
            // buttonPath={`/${previousUserKey}?eventId=${eventId}`}
            liveHeading="Click join to start"
            subtitle="Your team is ready. Join by clicking below"
            center={noBreadcrump}
            subdomain={localUser.userKey}
            inDraftHeading="Create your home page now"
            liveHelperText="Start competing & transform lives"
            inDraftHelperText="A page which showcases your talent & content"
            onButtonPress={() => onButtonPress("profile", "")}
            buttonText="Start now"
            leftButtonText="Go to Challenge"
            rightButtonText="Edit Team"
          />
        ) : currentVisible === "profile" ? (
          <Welcome
            live={isProfileLive(localUser)}
            urlPath={localUser.userKey ? `/` : ""}
            buttonPath={`/${localUser.userKey}`}
            liveHeading="Congratulations!"
            hideURL={true}
            subtitle="Your community is live"
            center={noBreadcrump}
            subdomain={localUser.userKey}
            inDraftHeading="Create your home page now"
            liveHelperText="Share & grow your boat"
            inDraftHelperText="A page which showcases your talent & content"
            onButtonPress={() => onButtonPress("profile", "")}
            buttonText="Start now"
            leftButtonText="View live page"
            rightButtonText="Edit page"
          />
        ) : currentVisible === "about-me" ? (
          <TextEntry
            inputMode="text"
            heading="Add a short description"
            placeholder="Type here"
            helperText={`*Make this something unique that makes you stand out`}
            value={localUser?.bio}
            onChangeText={(newVal: string) =>
              setLocalUser((prev: UserInterface) => ({ ...prev, bio: newVal }))
            }
            buttonText="Next"
            multiline={true}
            onButtonPress={() => onButtonPress("about-me", localUser?.bio)}
            leftButtonText="Back"
            leftButtonOnPress={onBack}
          />
        ) : currentVisible === "social-media-links" ? (
          <SocialLinkInput
            heading="Connect your social media"
            helperText="Build your portfolio with your existing content"
            buttonText="Next"
            onButtonPress={() =>
              onButtonPress(
                "social-media-links",
                "",
                localUser.instagramLink,
                localUser.facebookProfile,
                localUser.youtubeLink,
                localUser.linkedInLink,
                localUser.externalLink
              )
            }
            instagramLink={localUser.instagramLink}
            linkedInLink={localUser.linkedInLink}
            facebookProfile={localUser.facebookProfile}
            youtubeLink={localUser.youtubeLink}
            externalLink={localUser.externalLink}
            onSocialMediaChange={onSocialMediaChange}
            leftButtonText="Back"
            leftButtonOnPress={onBack}
          />
        ) : currentVisible === "cover-video" ? (
          <>
            {/* <CloudinaryWidget
              maxFiles={1}
              multiple={false}
              heading="Add a cover video"
              helperText="Make a short pitch your viewers about what is the page about"
              onUpload={uploadMedia}
              onDelete={deleteMedia}
              media={localUser.coverCloudinary ? localUser.coverCloudinary : []}
              onNext={() => onButtonPress("cover-video", "")}
              backButtonText="Back"
              backButtonPress={onBack}
            /> */}
          </>
        ) : currentVisible === "profile-img" ? (
          <>
            {/* <CloudinaryWidget
              heading="Add a profile image"
              helperText="This image would be visible on your every event"
              onUpload={uploadProfileImg}
              onDelete={removeProfileImg}
              media={localUser.profileImage ? [localUser.profileImage] : []}
              onNext={() => onButtonPress("profile-img", "")}
              maxFiles={1}
              multiple={false}
              backButtonText="Back"
              backButtonPress={onBack}
            /> */}
          </>
        ) : currentVisible === "your-handle" ? (
          <TextEntry
            inputMode="text"
            heading="Create a unique handle"
            placeholder="Type here"
            warning={!keyValid}
            helperText={
              keyValid
                ? `*This needs to be unique and cannot have special characters`
                : "This handle already exists. Please try something else"
            }
            value={localUser?.userKey ? localUser.userKey : ""}
            onChangeText={onKeyChange}
            buttonText="Next"
            leftButtonText="Back"
            leftButtonOnPress={onBack}
            onButtonPress={() => {
              if (keyValid) {
                onButtonPress("your-handle", localUser?.userKey);
              }
            }}
          >
            {/* <div className="flex pb-1">
              <p className="pr-1 text-gray-500">Link: </p>
              <p className="underline text-gray-500">
                https://socialboat.live/
              </p>
              <p className="underline text-gray-700 font-medium">
                {localUser.userKey ? localUser.userKey : "your-handle"}
              </p>
            </div> */}
          </TextEntry>
        ) : null}
      </div>
      <div className="" />
    </div>
  );
};

export default ProfileFormHolder;

// Take event name
// Add event description
// Add event media
// Add event cost
// Done
