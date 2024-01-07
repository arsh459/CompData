import { useAuth } from "@hooks/auth/useAuth";
import { useRecapcha } from "@hooks/auth/useRecapcha";
import { EventInterface } from "@models/Event/Event";
import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import { GetStaticProps, GetStaticPaths } from "next";
import { useState } from "react";
// import CommunityTemplateV3 from "@templates/community/CommunityTemplateV3";
import CommunityTemplateV4 from "@templates/community/CommunityTemplateV4";
import { UserInterface } from "@models/User/User";
import CommunityLayout from "@layouts/CommunityLayout";
// import { getCurrentMonthV3 } from "@hooks/community/challengeWeekUtils/utils";
import { getGamePageSEO } from "@layouts/CommunityLayout/utils";
// import UppyWidget from "@components/Uppy/index";

interface Props {
  leader: LeaderBoard | null;
  selectedEvent: EventInterface | null;
  parentEvent: EventInterface | null;
  // sprintId: string | null;
  // currentDay: number;
}

// export type modalStateType = "none" | "auth" | "welcome" | "post";

const TeamPage: React.FC<Props> = ({
  leader,
  selectedEvent,
  parentEvent,
  // sprintId,
  // currentDay,
}) => {
  // const { title, desc, img, site_name, favIcon, link, canonical } =
  //   useUserSEOData(leader);

  const [modalState, setModalState] = useState<"none" | "auth">("none");

  const { user, loadComplete, hideRecapcha, authStatus } = useAuth(undefined);

  const { recaptcha, element } = useRecapcha(
    authStatus === "FAILED" && modalState === "auth"
  );

  const setAuthIsVisible = () => {
    setModalState("auth");
  };

  const { teamName, gameDesc, gameImg, gameName } = getGamePageSEO(
    selectedEvent,
    parentEvent
  );

  // console.log("selectedEvent", selectedEvent?.eventStarts);

  return (
    <CommunityLayout
      user={user}
      hideRecapcha={hideRecapcha}
      setModalState={setModalState}
      modalState={modalState}
      recaptcha={recaptcha}
      element={element}
      loadComplete={loadComplete}
      leader={leader}
      teamName={teamName}
      gameName={gameName}
      gameDesc={gameDesc}
      gameImg={gameImg}
      link={`https://socialboat.live/${leader?.userKey}/${selectedEvent?.eventKey}`}
    >
      {leader && selectedEvent ? (
        <div className=" relative bg-white">
          {/* <CommunityTemplateV3
            signedInUser={user}
            authStatus={authStatus}
            leader={leader}
            selectedEvent={selectedEvent}
            parentEvent={parentEvent}
            setAuthIsVisible={setAuthIsVisible}
          /> */}
          <CommunityTemplateV4
            signedInUser={user}
            authStatus={authStatus}
            leader={leader}
            selectedEvent={selectedEvent}
            parentEvent={parentEvent}
            // sprintId={sprintId ? sprintId : ""}
            setAuthIsVisible={setAuthIsVisible}
            // currentDay={currentDay}
          />
        </div>
      ) : null}
    </CommunityLayout>
  );
};
export default TeamPage;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          userKey: "yourcoachabhi",
          eventKey: "fat-burner-challenge-work-from-home-764",
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

            // const { sprintId, nowObj } = getCurrentMonthV3(
            //   parentObj.configuration?.sprints,
            //   parentObj.configuration?.starts,
            //   parentObj.configuration?.challengeLength,
            //   parentObj.configuration?.rounds
            // );

            // console.log("n", nowObj);

            return {
              revalidate: 1,
              props: {
                leader: leaderObj,
                selectedEvent,
                parentEvent: parentObj,
                // sprintId: sprintId ? sprintId : "",
                // currentDay:
                //   typeof nowObj?.dayNumber === "number"
                //     ? nowObj?.dayNumber
                //     : -1,
              },
            };
          }
        } else if (ownerUID) {
          const leader = await db.collection("users").doc(ownerUID).get();

          if (leader.exists) {
            const leaderObj = leader.data() as UserInterface;

            // const { sprintId, nowObj } = getCurrentMonthV3(
            //   selectedEvent.configuration?.sprints,
            //   selectedEvent.configuration?.starts,
            //   selectedEvent.configuration?.challengeLength,
            //   selectedEvent.configuration?.rounds
            // );

            // console.log("n", nowObj);

            return {
              revalidate: 1,
              props: {
                leader: leaderObj,
                selectedEvent,
                parentEvent: selectedEvent,
                // sprintId: sprintId ? sprintId : "",
                // currentDay:
                //   typeof nowObj?.dayNumber === "number"
                //     ? nowObj?.dayNumber
                //     : -1,
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
      // sprintId: "",
      // currentDay: -1,
    },
  };
};
