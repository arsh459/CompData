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
// import { useUserSEOData } from "@hooks/event/useUserSEOData";
// import HomeTemplateV2 from "@templates/home/HomeTemplateV2";
import { useState } from "react";
// import NewUserModals from "@templates/community/BaseModals/NewUserModals";
// import CommunityTemplateV2 from "@templates/community/CommunityTemplateV2";
import UserTemplate from "@templates/community/UserTemplate/UserTemplate";
import { UserInterface } from "@models/User/User";
// import router from "next/router";
import Loading from "@components/loading/Loading";

interface Props {
  leader: UserInterface | null;
}

const UserPage: React.FC<Props> = ({ leader }) => {
  const [modalState, setModalState] = useState<"none" | "auth">("none");

  // useEffect(() => {
  //   if (!leader) {
  //     router.push("/");
  //   }
  // }, [leader]);

  // console.log("leader", leader);

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
      recaptcha={recaptcha}
      setModalState={setModalState}
      element={element}
      loadComplete={loadComplete}
      leader={leader}
      link={`https://socialboat.live/pr/${leader?.userKey}`}
    >
      {leader ? (
        <UserTemplate
          leader={leader}
          signedInUser={user}
          onSignOut={signOut}
          authStatus={authStatus}
          setAuthIsVisible={setAuthIsVisible}
        />
      ) : (
        <div className="h-screen w-full flex justify-center items-center">
          <div>
            <Loading fill="#ff735c" width={48} height={48} />
          </div>
        </div>
      )}
    </CommunityLayout>
  );
};

export default UserPage;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { userKey: "yourcoachabhi" } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const host = params ? params.userKey : "";
  // console.log("host", host);

  if (host && typeof host === "string") {
    const firebase = (await import("@config/adminFire")).default;
    const db = firebase.firestore();

    const profileLeader = await db
      .collection("users")
      .where("userKey", "==", host)
      .get();

    // console.log("profileLeader", profileLeader.docs[0].data());

    if (profileLeader.docs.length > 0 && profileLeader.docs[0].exists) {
      const leaderObj = profileLeader.docs[0].data() as UserInterface;

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
