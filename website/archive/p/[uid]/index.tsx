import { useAuth } from "@hooks/auth/useAuth";
import { useRecapcha } from "@hooks/auth/useRecapcha";
// import DefaultLayout from "@layouts/DefaultLayout";
// import { Cohort, EventInterface } from "@models/Event/Event";
// import {
// getUserEventCohorts_server,
// getUserEvents,
// } from "@models/Event/getAllEvents";
import CommunityLayout from "@layouts/CommunityLayout";
// import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
// import { stripSubDomain } from "@utils/subdomain/utils";
import { GetStaticProps, GetStaticPaths } from "next";
import { useState } from "react";
import UserTemplate from "@templates/community/UserTemplate/UserTemplate";
import { UserInterface } from "@models/User/User";

interface Props {
  leader: UserInterface | null;
}

const UserPage: React.FC<Props> = ({ leader }) => {
  const [modalState, setModalState] = useState<"none" | "auth">("none");

  const { user, loadComplete, hideRecapcha, authStatus, signOut } =
    useAuth(undefined);

  const { recaptcha, element } = useRecapcha(
    authStatus === "FAILED" && modalState === "auth"
  );

  const setAuthIsVisible = () => {
    setModalState("auth");
  };
  // console.log("leader", leader);
  return (
    <CommunityLayout
      user={user}
      hideRecapcha={hideRecapcha}
      modalState={modalState}
      setModalState={setModalState}
      recaptcha={recaptcha}
      element={element}
      loadComplete={loadComplete}
      leader={leader}
      link={`https://socialboat.live/p/${leader?.uid}`}
    >
      {leader ? (
        <UserTemplate
          leader={leader}
          signedInUser={user}
          onSignOut={signOut}
          authStatus={authStatus}
          setAuthIsVisible={setAuthIsVisible}
        />
      ) : null}
    </CommunityLayout>
  );
};

export default UserPage;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { uid: "yourcoachabhi" } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const host = params ? params.uid : "";
  if (host && typeof host === "string") {
    const firebase = (await import("@config/adminFire")).default;
    const db = firebase.firestore();

    const profileLeader = await db.collection("users").doc(host).get();

    if (profileLeader.exists) {
      const leaderObj = profileLeader.data() as UserInterface;

      // const allEvents = await getUserEvents(db, leaderObj.uid);

      // const allEventCohorts: {
      // [eId: string]: { [cohortId: string]: Cohort };
      // } = {};
      return {
        revalidate: 1,
        props: {
          leader: leaderObj,
        },
      };
    }
  }

  return {
    revalidate: 1,
    props: {
      leader: null,
    },
  };
};
