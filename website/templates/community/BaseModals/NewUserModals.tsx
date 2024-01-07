import { UserInterface } from "@models/User/User";
import { dashVisible } from "@templates/apply/Form/utils";
import { RecaptchaVerifier } from "@firebase/auth";
import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import WelcomeModal from "./WelcomeModal";
import CreateModal from "../Program/CreateModal/CreateModal";
import PhoneForm from "@templates/apply/Form/PhoneForm";
import { useEffect } from "react";
// import { updateSocialBoatCommunityUser } from "@models/User/createUtils";
// import PostCreateModalContent from "../Program/Post/PostCreateModalContent";
import { modalStateType } from "@layouts/CommunityLayout";
// import { modalStateType } from "pages/[userKey]";

interface Props {
  modalState: modalStateType;
  setModalState: (state: modalStateType) => void;
  user?: UserInterface;
  loadComplete?: boolean;
  communityId: string;
  recaptcha?: RecaptchaVerifier;
  hidePost: () => void;
  leader?: LeaderBoard;
  eId?: string;
  eIdToCheck?: string;
  cId?: string;
  eventKey: string;
}

const NewUserModals: React.FC<Props> = ({
  eId,
  cId,
  user,
  loadComplete,
  eventKey,
  eIdToCheck,
  modalState,
  setModalState,
  recaptcha,
  leader,
  hidePost,
  communityId,
}) => {
  // console.log("modal", modalState);
  // const [modalState, setModalState] = useState<"welcome" | "post" | "none">(
  //   "none"
  // );

  // console.log("mod", modalState);

  const onFinal = async () => {
    console.log("user", user);
    // if (user?.uid && leader?.uid) {

    // }

    // if (user?.enrolledCommunities?.includes(communityId)) {
    setModalState("welcome");
    // }
  };

  const onClose = () => {
    setModalState("none");
    // hideAuth(false);
    // hidePost();
  };

  // const onHidePost = () => {
  //   setModalState("none");
  //   hidePost();
  // };

  useEffect(() => {
    const updateCommunity = async () => {
      if (
        user?.uid &&
        leader?.uid &&
        modalState === "auth" &&
        ((eId && !user?.enrolledEvents?.includes(eId)) ||
          (cId && !user?.enrolledCohorts?.includes(cId)))
      ) {
        // console.log(
        //   "eId not present",
        //   eId ? !user?.enrolledEvents?.includes(eId) : "no eId"
        // );
        // console.log(
        //   "cId not present status",
        //   cId ? !user?.enrolledCohorts?.includes(cId) : "no cId"
        // );
        // console.log("in here");
      }
    };

    updateCommunity();
  }, [
    user?.uid,
    leader?.uid,
    eId,
    cId,
    modalState,
    user?.enrolledEvents,
    user?.enrolledCohorts,
  ]);

  // console.log("eId", eId);

  if (loadComplete)
    return (
      <CreateModal
        isOpen={
          modalState === "post" ||
          modalState === "welcome" ||
          // modalState === "auth"
          (modalState === "auth" && recaptcha ? true : false)
        }
        onBackdrop={() => {}}
        onCloseModal={() => {}}
        heading=""
        onButtonPress={() => {}}
      >
        {recaptcha && !dashVisible(user) && modalState === "auth" ? (
          <PhoneForm
            mobileInteractive={false}
            user={user}
            bgSmoke={true}
            brandName={leader?.name}
            recaptcha={recaptcha}
            onClose={onClose}
            onFinal={onFinal}
          />
        ) : modalState === "welcome" ||
          (modalState === "auth" && user?.name && user?.email) ? (
          <WelcomeModal
            state={
              eIdToCheck && user?.enrolledEvents?.includes(eIdToCheck)
                ? "welcome"
                : "not-welcome"
            }
            eventKey={eventKey}
            leaderKey={leader?.userKey}
            communityName={leader?.name ? leader.name : "Creator"}
            onIntroduce={() => setModalState("post")}
            onCloseModal={onClose}
          />
        ) : modalState === "post" && user?.name && leader?.uid && eId ? (
          <></>
        ) : // <PostCreateModalContent
        //   isOpen={true}
        //   onClose={onHidePost}
        //   eventId={eId}
        //   cohortId={cId}
        //   communityId={leader?.uid}
        //   authorName={user?.name}
        //   authorImage={user?.profileImage}
        //   authorUID={user?.uid}
        //   initalSessionType="post"
        //   liveAbsent={true}
        //   heading={`Introduce yourself to ${
        //     leader.name ? `${leader.name} & ` : "the"
        //   } Community ...`}
        // />
        null}
      </CreateModal>
    );
  else {
    return <div />;
  }
};

export default NewUserModals;
