// import { useAuth } from "@hooks/auth/useAuth";
// import { useRecapcha } from "@hooks/auth/useRecapcha";
import DefaultLayout from "@layouts/DefaultLayout";
// import { EventInterface } from "@models/Event/Event";
import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
// import { GetStaticProps, GetStaticPaths } from "next";
// import { useUserSEOData } from "@hooks/event/useUserSEOData";
import { RefObject } from "react";
// import NewUserModals from "@templates/community/BaseModals/NewUserModals";
// import CommunityTemplateV3 from "@templates/community/CommunityTemplateV3";
// import { UserInterface } from "@models/User/User";
import NewUserModalsV2 from "@templates/community/BaseModals/NewUserModalsV2";
import { UserInterface } from "@models/User/User";
import { RecaptchaVerifier } from "firebase/auth";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { useTeamSEOData } from "@hooks/event/useTeamSEOData";

interface Props {
  leader: LeaderBoard | UserInterface | null;
  user?: UserInterface;
  loadComplete: boolean;
  hideRecapcha: boolean;
  recaptcha: RecaptchaVerifier | undefined;
  modalState: "none" | "auth";
  setModalState: (newState: "none" | "auth") => void;
  element: RefObject<HTMLDivElement>;
  link: string;
  teamName?: string;
  gameName?: string;
  gameDesc?: string;
  gameImg?: AWSMedia | CloudinaryMedia;
  //   selectedEvent: EventInterface | null;
  //   parentEvent: EventInterface | null;
}

export type modalStateType = "none" | "auth" | "welcome" | "post";

const CommunityLayout: React.FC<Props> = ({
  leader,
  user,
  loadComplete,
  children,
  recaptcha,
  element,
  link,
  hideRecapcha,
  modalState,
  setModalState,
  teamName,
  gameName,
  gameDesc,
  gameImg,
}) => {
  const { title, desc, img, site_name, favIcon } = useTeamSEOData(
    leader,
    teamName,
    gameName,
    gameDesc,
    gameImg
  );

  // const [modalState, setModalState] = useState<modalStateType>("none");

  //   const { user, loadComplete, hideRecapcha, authStatus } = useAuth(undefined);

  //   const setAuthIsVisible = () => {
  //     setModalState("auth");
  //   };

  return (
    <>
      <DefaultLayout
        favIcon={favIcon}
        siteName={site_name}
        title={
          teamName && gameName
            ? `${gameName}: ${teamName}`
            : gameName
            ? gameName
            : `${title}`
        }
        description={desc}
        link={link}
        canonical={link}
        noIndex={false}
        img={img}
      >
        {children}

        <div
          id="recaptcha-container"
          ref={element}
          className={hideRecapcha || modalState !== "auth" ? "hidden" : ""}
        />

        <NewUserModalsV2
          modalState={modalState}
          setModalState={setModalState}
          user={user}
          loadComplete={loadComplete}
          recaptcha={recaptcha}
        />
      </DefaultLayout>
    </>
  );
};
export default CommunityLayout;
