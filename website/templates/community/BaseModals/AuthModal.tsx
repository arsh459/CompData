import { UserInterface } from "@models/User/User";
import { dashVisible } from "@templates/apply/Form/utils";
// import CreateModal from "../Program/CreateModal/CreateModal";
// import AuthModal from "./AuthModal";
import { RecaptchaVerifier } from "@firebase/auth";
import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
// import WelcomeModal from "./WelcomeModal";
import CreateModal from "../Program/CreateModal/CreateModal";
import PhoneForm from "@templates/apply/Form/PhoneForm";
// import { useEffect } from "react";
import { seriesModal } from "archive/workout/[workoutKey]";
import PrebuyModal from "./PrebuyModal";
// import { useEffect } from "react";
// import { updateSocialBoatCommunityUser } from "@models/User/createUtils";
// import PostCreateModalContent from "../Program/Post/PostCreateModalContent";
// import { modalStateType } from "pages/[userKey]";

interface Props {
  modalState: seriesModal;
  setModalState: (state: seriesModal) => void;
  user?: UserInterface;
  loadComplete?: boolean;
  enrolled?: boolean;
  cost?: number;
  seriesKey: string;
  // isAuthVisible?: boolean;
  // postVisible?: boolean;
  recaptcha?: RecaptchaVerifier;
  // hideAuth: (newState: boolean) => void;
  //   hidePost: () => void;
  leader?: LeaderBoard;
  //   eId?: string;
  //   cId?: string;
}

const AuthModal: React.FC<Props> = ({
  //   eId,
  //   cId,
  user,
  loadComplete,
  enrolled,
  // isAuthVisible,
  // postVisible,
  seriesKey,
  modalState,
  setModalState,
  recaptcha,
  leader,
  cost,
  //   hidePost,
  // element,
}) => {
  const onClose = () => {
    setModalState("none");
  };

  // useEffect(() => {
  //   if (user?.uid && user?.name && user?.email && user?.instagramHandle) {
  //     setModalState("none");
  //   }
  // }, [
  //   user?.uid,
  //   user?.name,
  //   user?.email,
  //   user?.instagramHandle,
  //   setModalState,
  // ]);

  // console.log("modalState", modalState);

  if (loadComplete)
    return (
      <CreateModal
        isOpen={modalState !== "none" ? true : false}
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
            onFinal={onClose}
          />
        ) : modalState === "prebuy" ||
          (modalState === "auth" && user?.name && user?.email) ? (
          <PrebuyModal
            enrolled={enrolled}
            cost={cost}
            seriesKey={seriesKey}
            // communityName=""
            onCloseModal={() => setModalState("none")}
            onIntroduce={() => {}}
          />
        ) : null}
      </CreateModal>
    );
  else {
    return <div />;
  }
};

export default AuthModal;
