import { useAuth } from "@hooks/auth/useAuth";
import { useRecapcha } from "@hooks/auth/useRecapcha";
// import DefaultLayout from "@layouts/DefaultLayout";
import { EventInterface } from "@models/Event/Event";
// import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import { GetStaticProps, GetStaticPaths } from "next";
// import { useUserSEOData } from "@hooks/event/useUserSEOData";
import { useState } from "react";
// import NewUserModals from "@templates/community/BaseModals/NewUserModals";
// import CommunityTemplateV3 from "@templates/community/CommunityTemplateV3";
import { UserInterface } from "@models/User/User";
// import TeamTemplate from "@templates/teamTemplate";
import CommunityLayout from "@layouts/CommunityLayout";
import TeamTemplateV2 from "@templates/teamTemplate/TeamTemplateV2";
import { getGamePageSEO } from "@layouts/CommunityLayout/utils";

interface Props {
  leader: UserInterface | null;
  celebLeaderObj: UserInterface | null;
  selectedEvent: EventInterface | null;
  parentEvent: EventInterface | null;
}

// export type modalStateType = "none" | "auth" | "welcome" | "post";

const TeamPage: React.FC<Props> = ({
  leader,
  selectedEvent,
  parentEvent,
  celebLeaderObj,
}) => {
  // const { title, desc, img, site_name, favIcon, link, canonical } =
  //   useUserSEOData(leader);

  const [modalState, setModalState] = useState<"none" | "auth">("none");

  const { user, loadComplete, hideRecapcha, authStatus, signOut } =
    useAuth(undefined);

  const { recaptcha, element } = useRecapcha(
    authStatus === "FAILED" && modalState === "auth"
    // showAuthModal
  );

  const authRequest = () => {
    setModalState("auth");
  };

  const { teamName, gameDesc, gameImg, gameName } = getGamePageSEO(
    selectedEvent,
    parentEvent
  );

  // console.log("recaptcha", recaptcha);
  // console.log("authStatus", authStatus === "FAILED" && modalState === "auth");

  return (
    <>
      <CommunityLayout
        user={user}
        hideRecapcha={hideRecapcha}
        modalState={modalState}
        recaptcha={recaptcha}
        setModalState={setModalState}
        element={element}
        link={`https://socialboat.live/teams/${selectedEvent?.eventKey}`}
        loadComplete={loadComplete}
        leader={leader}
        teamName={teamName}
        gameName={gameName}
        gameDesc={gameDesc}
        gameImg={gameImg}
      >
        {leader && selectedEvent ? (
          <div className=" relative bg-white">
            <TeamTemplateV2
              signedInUser={user}
              authStatus={authStatus}
              signOut={signOut}
              authRequest={authRequest}
              leader={leader}
              celebLeaderObj={celebLeaderObj ? celebLeaderObj : undefined}
              selectedEvent={selectedEvent}
              parentEvent={parentEvent}
            />
            {/* <TeamTemplate
              signedInUser={user}
              authStatus={authStatus}
              signOut={signOut}
              authRequest={authRequest}
              leader={leader}
              selectedEvent={selectedEvent}
              parentEvent={parentEvent}
            /> */}
          </div>
        ) : null}
      </CommunityLayout>
    </>
  );
};
export default TeamPage;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          // userKey: "yourcoachabhi",
          eventKey: "Spartans% Ready to Run-14294",
        },
      },
    ],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const eventKey = params ? params.eventKey : "";
  // const userKey = params ? params.userKey : "";

  try {
    if (typeof eventKey === "string" && eventKey) {
      //   const userKey = stripSubDomain(host);
      // console.log("userKey", userKey);
      // console.log("userKey", userKey);

      const firebase = (await import("@config/adminFire")).default;
      const db = firebase.firestore();

      // console.log("firebase", firebase.projectManagement.name);

      const eventDocs = await db
        .collection("sbEvents")
        .where("eventKey", "==", eventKey)
        .get();

      if (eventDocs.docs.length > 0 && eventDocs.docs[0].exists) {
        const selectedEvent = eventDocs.docs[0].data() as EventInterface;

        const ownerUID = selectedEvent.ownerUID;
        const parentId = selectedEvent.parentId;

        if (ownerUID && parentId) {
          const [leader, parentEvent] = await Promise.all([
            db.collection("users").doc(ownerUID).get(),

            db.collection("sbEvents").doc(parentId).get(),
          ]);

          if (leader.exists && parentEvent.exists) {
            const leaderObj = leader.data() as UserInterface;
            const parentObj = parentEvent.data() as EventInterface;

            const celebrityId = parentObj.celebrityId;

            const celebLeader = await db
              .collection("users")
              .doc(celebrityId ? celebrityId : ownerUID)
              .get();

            const celebLeaderObj = celebLeader.exists
              ? (celebLeader.data() as UserInterface)
              : null;

            return {
              revalidate: 1,
              props: {
                leader: leaderObj,
                selectedEvent,
                parentEvent: parentObj,
                celebLeaderObj: celebLeaderObj,
              },
            };
          }
        } else if (ownerUID) {
          const leader = await db.collection("users").doc(ownerUID).get();

          const celebrityId = selectedEvent.celebrityId;
          const celebLeader = await db
            .collection("users")
            .doc(celebrityId ? celebrityId : ownerUID)
            .get();

          if (leader.exists) {
            const leaderObj = leader.data() as UserInterface;
            const celebLeaderObj = celebLeader.exists
              ? (celebLeader.data() as UserInterface)
              : null;

            return {
              revalidate: 1,
              props: {
                leader: leaderObj,
                selectedEvent,
                celebLeaderObj: celebLeaderObj,
                parentEvent: null,
              },
            };
          }
        }
      }
    }
  } catch (error) {
    console.log("error in index", error);
  }

  return {
    revalidate: 1,
    props: {
      leader: null,
      selectedEvent: null,
      parentEvent: null,
      celebLeaderObj: null,
    },
  };
};
