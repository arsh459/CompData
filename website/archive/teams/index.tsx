import { useAuth } from "@hooks/auth/useAuth";
import DefaultLayout from "@layouts/DefaultLayout";
// import TeamsHomeTemplate from "@templates/teamsHome/TeamsHomeTemplate";
import { teamsSEO } from "@constants/seo";
import { useRecapcha } from "@hooks/auth/useRecapcha";
import { useState } from "react";
import NewUserModalsV2 from "@templates/community/BaseModals/NewUserModalsV2";
import TeamsHomeTemplateV2 from "@templates/teamsHome/TeamsHomeTemplateV2";

interface Props {}

// export type modalStateType = "none" | "auth" | "welcome" | "post";

const TeamHome: React.FC<Props> = ({}) => {
  const { user, authStatus, hideRecapcha } = useAuth();
  const [modalState, setModalState] = useState<"none" | "auth">("none");
  const { element, recaptcha } = useRecapcha(
    authStatus === "FAILED" && modalState === "auth"
  );
  // console.log("auth", authStatus, modalState);
  return (
    <DefaultLayout
      // favIcon={favIcon}
      // siteName={site_name}
      title={teamsSEO.title}
      description={teamsSEO.description}
      link={teamsSEO.link}
      canonical={teamsSEO.link}
      noIndex={false}
      img={teamsSEO.img}
    >
      {/* <TeamsHomeTemplate
        setAuthIsVisible={() => setModalState("auth")}
        signedInUser={user}
        authStatus={authStatus}
      /> */}

      <TeamsHomeTemplateV2
        setAuthIsVisible={() => setModalState("auth")}
        signedInUser={user}
        authStatus={authStatus}
      />

      <div
        id="recaptcha-container"
        ref={element}
        className={hideRecapcha || modalState !== "auth" ? "hidden" : ""}
      />

      <NewUserModalsV2
        modalState={modalState}
        setModalState={setModalState}
        user={user}
        loadComplete={true}
        recaptcha={recaptcha}
      />
    </DefaultLayout>
  );
};
export default TeamHome;
