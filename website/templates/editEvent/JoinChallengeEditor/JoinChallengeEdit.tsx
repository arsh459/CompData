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
import { useEffect, useState } from "react";
import EditingLayout from "../EventCreator/EditingLayout";
import { getQueryParamsForOnboard } from "@hooks/drawer/utils";
import AuthForm from "../ProfileEditor/AuthForm";
import EditChallenge from "../ProfileEditor/EditChallenge/EditChallenge";
import { getNextJoinRoute, isEventEditor } from "../ProfileEditor/utils";
import ProfileFormHolder from "../ProfileEditor/ProfileForm/ProfileFormHolder";
import { useEventTopCopy } from "@hooks/editEvent/useEventToCopy";
// import { createNewPost } from "@models/Posts/createUtils";
// import { saveCopiedChallenge } from "@models/Event/challengeInvite";
// import { addMembersToEvent } from "@models/Event/inviteMembers";
import Loading from "@components/loading/Loading";
import DialogBox from "@components/dialog/Dialog";
import { whatsappMessageWarning } from "../Form/MemberAdder/AddMembers";
import WhatsAppButton from "@templates/listing/WhatsappButton/WhatsAppButton";
import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";

interface Props {}

export interface editorQuery {
  section?: string;
  eventId?: string;
  // leaderKey?: string;
  action?: "copyEvent";
}

export type editorQueryKeys = "section" | "eventId" | "leaderKey" | "action";

const JoinChallengeEdit: React.FC<Props> = ({}) => {
  const router = useRouter();
  const q = router.query as editorQuery;
  const [selectedFormValue, setForm] = useState<formLabelValues>("your-name");

  // console.log("q.event", q.eventId);

  //   const { localUser, setLocalUser } = useEditProfile(user, setDrawerElements);
  const [viewState, setViewState] = useState<"edit" | "live">("edit");
  const [whatsappWarning, showWhatsappWarning] = useState<boolean>(false);
  const [interimMembers, setInterimMembers] = useState<{
    [memberId: string]: boolean;
  }>({});

  const { user, hideRecapcha, authStatus } = useAuth();
  const { element, recaptcha } = useRecapcha(authStatus === "FAILED");

  const [localUser, setLocalUser] = useState<UserInterface | undefined>(
    () => user
  );

  const { toCopyEvent, setToCopyEvent, remoteEvent } = useEventTopCopy(
    user?.uid
  );

  const [userChecked, setUserChecked] = useState<boolean>(false);

  useEffect(() => {
    // console.log("userChecked", userChecked, user?.uid, user?.userKey);
    if (router.isReady) {
      if (q.section) {
        setForm(q.section as formLabelValues);
      } else {
        if (!userChecked && user?.uid && user?.userKey) {
          q.section = "name";
          setUserChecked(true);
          router.push(getQueryParamsForOnboard(q), undefined, {
            shallow: true,
          });
        } else if (user?.uid && !user.userKey) {
          q.section = "your-name";
          router.push(getQueryParamsForOnboard(q), undefined, {
            shallow: true,
          });
        }
      }
    }
  }, [router.isReady, q, router, user?.userKey, userChecked, user?.uid]);

  // useEffect(() => {
  //   if (!userChecked && user?.uid && user?.userKey) {
  //     setForm("name");
  //     setUserChecked(true);
  //   } else if (!userChecked && user?.uid && !user?.userKey) {
  //     setUserChecked(true);
  //   }
  // }, [user?.userKey, userChecked, user?.uid]);

  // const { teamEvent } = useEditEventExists(remoteEvent?.id, user?.uid);

  const [loading] = useState<boolean>(false);
  // useEffect(() => {}, [user?.userKey]);

  // console.log(teamEvent);

  useEffect(() => {
    // setLoading(false);
    setLocalUser(user);
  }, [user]);

  const onSaveEventRequest = async (newMembers: { [uid: string]: boolean }) => {
    if (Object.keys(newMembers).length === 0) {
      await onSaveEvent(newMembers);
    } else {
      showWhatsappWarning(true);
      setInterimMembers(newMembers);
    }
  };

  const onSendInvites = async () => {
    showWhatsappWarning(false);
    await onSaveEvent(interimMembers);
  };

  const onSaveEvent = async (newMembers: { [uid: string]: boolean }) => {
    if (user && toCopyEvent && remoteEvent) {
      // setLoading(true);
      // const newPost = createNewPost(
      //   user.uid,
      //   toCopyEvent.id,
      //   user.uid,
      //   "public",
      //   undefined,
      //   user.name,
      //   user.profileImage,
      //   true,
      //   undefined,
      //   undefined,
      //   "post"
      // );
      // try {
      //   await saveCopiedChallenge(remoteEvent.ownerUID, toCopyEvent, {
      //     ...newPost,
      //     text: toCopyEvent.description,
      //     media: toCopyEvent.media,
      //   });
      //   await addMembersToEvent(
      //     toCopyEvent.ownerUID,
      //     newMembers,
      //     toCopyEvent.id
      //   );
      //   router.push(`/${user.userKey}/?eventId=${toCopyEvent.id}&nav=program`);
      // } catch (error) {
      //   console.log("error", error);
      //   setLoading(false);
      // }
      // router.push(
      //   `https://${user.userKey}.socialboat.live/?eventId=${toCopyEvent.id}&nav=program`
      // );
    }
  };

  const onButtonPress = (
    key: formLabelValues,
    value: string | undefined | number | CloudinaryMedia[],
    insta?: string | undefined,
    fb?: string | undefined,
    youtube?: string | undefined,
    linkedIn?: string | undefined,
    external?: string | undefined
  ) => {
    if (user && key === "your-name" && typeof value === "string") {
      updateUserTextFields(user.uid, "name", value);
    } else if (user && key === "your-handle" && typeof value === "string") {
      updateUserTextFields(user.uid, "userKey", value);
    } else if (user && key === "about-me" && typeof value === "string") {
      updateUserTextFields(user && user.uid, "bio", value);
    } else if (user && key === "social-media-links") {
      updateSocialMediaFields(user.uid, insta, fb, linkedIn, youtube, external);
    }

    if ((key === "name" || key === "description") && !value) {
      return;
    } else if (
      key === "media" &&
      typeof value === "object" &&
      value.length === 0
    ) {
      return;
    }

    const { nextRoute } = getNextJoinRoute(key);

    q.section = nextRoute;
    router.push(getQueryParamsForOnboard(q), undefined, { shallow: true });
  };

  const onBack = () => {
    router.back();
  };

  const eventEditor = isEventEditor(selectedFormValue);
  const onClose = () => {
    showWhatsappWarning(false);
  };

  return (
    <EditingLayout
      viewState={viewState}
      hideMobile={eventEditor}
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
          userKey: user?.userKey,
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
      <DialogBox
        heading="Are you sure?"
        explainer={whatsappMessageWarning}
        buttonLeftText="Add members"
        buttonRightText="Cancel"
        leftClick={onSendInvites}
        rightClick={onClose}
        isOpen={whatsappWarning}
        closeModal={onClose}
      />

      <Script
        type="text/javascript"
        strategy="lazyOnload"
        src="https://widget.cloudinary.com/v2.0/global/all.js"
      />
      {loading ? (
        <div className="flex items-center justify-center">
          <Loading fill="#ff735c" width={48} height={48} />
        </div>
      ) : // : teamEvent ? (
      //   <Welcome
      //     live={true}
      //     //TODO
      //     hideURL={true}
      //     urlPath={`/${user?.userKey}/?eventId=${teamEvent.id}`}
      //     liveHeading="Click join to start"
      //     subtitle="Your team is ready. Join by clicking below"
      //     center={true}
      //     subdomain={user?.userKey}
      //     inDraftHeading="Create your home page now"
      //     liveHelperText="Start competing & transform lives"
      //     inDraftHelperText="A page which showcases your talent & content"
      //     onButtonPress={() => onButtonPress("profile", "")}
      //     buttonText="Start now"
      //     leftButtonText="Join the challenge"
      //     rightButtonText="Edit Team"
      //   />
      // )

      localUser && localUser.email && !eventEditor ? (
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
        />
      ) : localUser && localUser.email ? (
        <EditChallenge
          uid={localUser.uid}
          currentVisible={selectedFormValue}
          toCopyEvent={toCopyEvent}
          setToCopyEvent={setToCopyEvent}
          onButtonPress={onButtonPress}
          onBack={onBack}
          onSave={onSaveEventRequest}
        />
      ) : (
        <AuthForm
          user={user}
          //   brandName="Soc"
          recaptcha={recaptcha}
        />
      )}

      <div className="absolute bottom-8 right-4">
        <WhatsAppButton />
      </div>

      <div
        id="recaptcha-container"
        ref={element}
        className={hideRecapcha ? "hidden" : ""}
      />
    </EditingLayout>
  );
};

export default JoinChallengeEdit;
