import { UserInterface } from "@models/User/User";
// import { dashVisible } from "@templates/apply/Form/utils";
import { RecaptchaVerifier } from "@firebase/auth";
// import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
// import WelcomeModal from "./WelcomeModal";
import CreateModal from "../Program/CreateModal/CreateModal";
import PhoneForm from "@templates/apply/Form/PhoneForm";
import { useEffect } from "react";
// import { modalStateType } from "pages/teams";
// import { useEffect } from "react";
// import { updateSocialBoatCommunityUser } from "@models/User/createUtils";
// import PostCreateModalContent from "../Program/Post/PostCreateModalContent";
// import { modalStateType } from "pages/[userKey]";

interface Props {
  modalState: "none" | "auth";
  setModalState: (state: "none" | "auth") => void;
  user?: UserInterface;
  loadComplete?: boolean;
  //   communityId: string;
  recaptcha?: RecaptchaVerifier;
  //   hidePost: () => void;
  //   leader?: LeaderBoard;
  //   eId?: string;
  //   eIdToCheck?: string;
  //   cId?: string;
  //   eventKey: string;
}

const NewUserModalsV2: React.FC<Props> = ({
  //   eId,
  //   cId,
  user,
  loadComplete,
  //   eventKey,
  //   eIdToCheck,
  modalState,
  setModalState,
  recaptcha,
  //   leader,
  //   hidePost,
  //   communityId,
}) => {
  // console.log("modal", modalState);
  // const [modalState, setModalState] = useState<"welcome" | "post" | "none">(
  //   "none"
  // );

  // console.log("mod", modalState);
  useEffect(() => {
    if (user?.uid) {
      setModalState("none");
    }
  }, [user?.uid, setModalState]);

  //   const onFinal = async () => {
  //     console.log("user", user);
  //     // if (user?.uid && leader?.uid) {

  //     // }

  //     // if (user?.enrolledCommunities?.includes(communityId)) {
  //     setModalState("welcome");
  //     // }
  //   };

  const onClose = () => {
    setModalState("none");
    // hideAuth(false);
    // hidePost();
  };

  //   const onHidePost = () => {
  //     setModalState("none");
  //     hidePost();
  //   };

  // console.log("user", user);

  if (loadComplete)
    return (
      <CreateModal
        isOpen={modalState === "auth" && recaptcha ? true : false}
        onBackdrop={() => {}}
        onCloseModal={() => {}}
        heading=""
        onButtonPress={() => {}}
      >
        {recaptcha && modalState === "auth" ? (
          <PhoneForm
            mobileInteractive={false}
            user={user}
            bgSmoke={true}
            recaptcha={recaptcha}
            onClose={onClose}
          />
        ) : null}
      </CreateModal>
    );
  else {
    return <div />;
  }
};

export default NewUserModalsV2;
